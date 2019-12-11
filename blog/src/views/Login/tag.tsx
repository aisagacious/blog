import * as React from 'react'
import { Input, message, Empty, List, Avatar } from 'antd'
import http from '../../api'

const { useState, useEffect, useRef } = React
const { Search } = Input

interface TagRule {
  tagName: string;
  tagId: string;
  createTime: string;
  delFlag: string;
}

const Tags = (props: any): any => {
  const searchRef: any = useRef(null)
  const [tagList, setTagList] = useState<TagRule[]>()

  // 添加标签
  const addTag = (val: string): any => {
    if (!val) return message.warning('请填写内容')
    http.addTags(Object.assign({}, { tagName: val })).then((): void => {
      searchRef.current.input.state.value = ''
      queryTags()
    })
  }

  // 查询标签
  const queryTags = (): void => {
    http.queryTags().then((res: any): void => {
      setTagList(res.data)
    })
  }

  // 删除标签
  const deleteTags = (item: TagRule): void => {
    const { tagId } = item
    http.deleteTags({ tagId }).then((): void => {
      queryTags()
    })
  }

  useEffect(() => {
    queryTags()
  }, [])

  return (
    <div className="tag">
      <Search
        ref={searchRef}
        className="search"
        placeholder="请输入要添加的标签"
        enterButton="添加标签"
        size="large"
        onSearch={addTag}
      />
      <div className="tag-list">
        {
          tagList ? <List
            loading={false}
            itemLayout="horizontal"
            dataSource={tagList}
            loadMore={true}
            renderItem={(item: TagRule): any => (
              // <p style={{ color: '#516CD9' }}>编辑</p>, 
              <List.Item actions={[<p style={{ color: 'red' }} onClick={() => deleteTags(item)}>删除</p>]}>
                <List.Item.Meta
                  avatar={<Avatar src={require('../../assets/img/avatar.jpeg')} />}
                  title={item.tagName}
                  description={item.createTime}
                />
              </List.Item>
            )}
          /> : <Empty description="暂无标签" />
        }
      </div>

    </div>
  )
}

export default Tags