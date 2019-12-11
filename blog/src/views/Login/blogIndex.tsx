import * as React from 'react'
import { Table, Input, DatePicker, Select, Button, Pagination, Popconfirm } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import http from '../../api'

const { useState, useEffect, useRef } = React
const { Option } = Select
const { Column } = Table

interface Status {
  status: string;
  name: string;
}

const BlogIndex = (props: any): any => {
  const [tableData, setTableData] = useState<any>()
  const [total, setTotal] = useState<number>(0)
  const [search, setSearch] = useState<any>({
    pageNo: 1,
    pageSize: 10,
    title: '',
    createTime: '',
    status: '1'
  })
  const statusList: Status[] = [{
    status: '0',
    name: '草稿'
  }, {
    status: '1',
    name: '发布'
  }]

  // 获取当前博客
  const queryBlog = (obj: any): void => {
    http.queryBlog(obj).then((res: any): any => {
      setTableData(res.data.rows)
      setTotal(res.data.total)
    })
  }

  // 公共更新params state状态
  const updateState = (item: any): void => {
    setSearch(Object.assign({}, search, item))
  }

  const nameChange = (e: any): void => {
    updateState({ title: e.target.value })
  }

  const dateChange = (date: any, dateString: string): void => {
    updateState({ createTime: dateString })
  }

  const searchData = (): void => {
    queryBlog(search)
  }

  const sizeChange = (e: number): void => {
    updateState({ pageNo: e })
    queryBlog(Object.assign({}, search, { pageNo: e }))
  }

  const statusChange = (status: string): void => {
    updateState({ status: Number(status) })
  }

  const disabledDateTime = (): any => { }

  // 子组件更新父组件数据
  const childUpdateData = (): any => {
    queryBlog(Object.assign({}, search, { pageNo: 1 }))
  }

  useEffect(() => {
    queryBlog(search)
  }, [])

  return (
    <div className="blog-index com-bg">
      <div className="search">
        <Input className="com-width com-rig" placeholder="请输入标题" allowClear onChange={nameChange} />
        {/* defaultValue */}
        <DatePicker className="com-rig" format="YYYY-MM-DD" placeholder="请选择开始日期" locale={locale} disabledTime={disabledDateTime} onChange={dateChange} />
        <Select
          className="com-width com-rig"
          placeholder="请选择状态"
          defaultValue={search.status}
          onChange={statusChange}
        >
          {
            statusList.map((item: Status, i: number): any => {
              return <Option key={i.toString() + i} value={item.status}>{item.name}</Option>
            })
          }
        </Select>
        <Button className="com-rig" type="primary" onClick={searchData}>查询</Button>
      </div>
      <ChildTable props={props} search={search} tableData={tableData} child={childUpdateData}></ChildTable>
      <Pagination
        className="ping"
        onChange={sizeChange}
        defaultCurrent={search.pageNo}
        total={total}
      />
    </div>
  )
}

const ChildTable = (props: any): any => {
  const tableRef = useRef<any>()
  const [y, setY] = useState<number>()

  const deleteBlog = (id: string): void => {
    http.deleteBlog({ id }).then((res: any): any => {
      props.child()
    })
  }

  useEffect(() => {
    setY(tableRef.current.offsetHeight)
    window.onresize = () => {
      setY(tableRef.current.offsetHeight)
    }
    return () => {
      window.onresize = null
    }
  }, [])

  return (
    <div className="table-child" ref={tableRef} >
      <Table dataSource={props.tableData} scroll={{ y: y }} pagination={false} size="small" rowKey="only" bordered>
        <Column align="center" title="创建时间" dataIndex="createTime" ellipsis={true} />
        <Column align="center" title="标题" dataIndex="title" ellipsis={true} />
        <Column align="center" title="阅读数" dataIndex="readCount" ellipsis={true} />
        <Column align="center" title="评论数" dataIndex="commentCount" ellipsis={true} />
        <Column align="center" title="更新时间" dataIndex="updateTime" ellipsis={true} />
        <Column
          align="center"
          title="操作"
          render={(record: any): any => (
            <div className="table-btn">
              <Button type="primary" onClick={() => props.props.history.push({ pathname: '/pc/blog', state: { id: record.id } })}>编辑</Button>
              <Popconfirm placement="right" title="是否确认删除？" okText="是" cancelText="否" onConfirm={() => deleteBlog(record.id)}>
                <Button type="danger">删除</Button>
              </Popconfirm>
            </div>
          )}
        />
      </Table>
    </div>
  )
}

export default BlogIndex
