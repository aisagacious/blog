import * as React from 'react'
import { Layout, Tabs } from 'antd';
import http from '../../api'
import BlogList from '../../components/blogList'

const { useState, useEffect, useCallback, useRef } = React
const { Header, Content } = Layout
const { TabPane } = Tabs

interface TagRule {
  tagName: string;
  tagId: string;
  createTime: string;
  delFlag: string;
}

const Classify = (props: any): any => {
  const homeRef = useRef<any>(null)
  const [tagList, setTagList] = useState<TagRule[]>([])
  const [articleList, setArticleList] = useState<any>()
  const [total, setTotal] = useState<number>(0)
  const [search, setSearch] = useState<any>({
    pageNo: 1,
    pageSize: 10,
    tagId: '',
    defaultKey: '0'
  })

  // 查询标签
  const queryForeignTags = useCallback((search: any): void => {
    http.queryForeignTags().then((res: any): void => {
      setTagList(res.data)
      const beforePage = sessionStorage.getItem('page')
      if (!beforePage) {
        classifiedQuery(Object.assign({}, search, { tagId: res.data[0].tagId }))
      } else {
        setSearch(Object.assign({}, search, JSON.parse(beforePage)))
        classifiedQuery(Object.assign({}, search, JSON.parse(beforePage), { tagId: JSON.parse(beforePage).tagId }))
      }
    })
  }, [])

  const classifiedQuery = (obj: any): any => {
    http.classifiedQuery(obj).then((res: any): void => {
      setArticleList(res.data.rows)
      setTotal(res.data.total)
      setTimeout(() => {
        homeRef.current.scrollTop = 0
      }, 0)
    })
  }

  const sizeChange = (e: number): void => {
    sessionStorage.removeItem('range')
    const jxPage = Object.assign({}, search, { pageNo: e })
    setSearch(jxPage)
    classifiedQuery(jxPage)
  }

  const callback = (str: string): any => {
    const query = Object.assign({}, search, { tagId: tagList && tagList[str].tagId, pageNo: 1, defaultKey: str })
    sessionStorage.setItem('page', JSON.stringify(query))
    setSearch(query)
    classifiedQuery(query)
  }

  useEffect(() => {
    const page = sessionStorage.getItem('page')
    if (page) {
      queryForeignTags(JSON.parse(page))
    } else {
      queryForeignTags(search)
    }
  }, [])

  return (
    <div className="classify">
      <Header style={{ position: 'fixed', top: 0, zIndex: 1, width: '100%' }}>
        <Tabs activeKey={search.defaultKey} onChange={callback}>
          {
            tagList && tagList.map((item: TagRule, i: number): any => {
              return (
                <TabPane tab={item.tagName} key={i.toString()}>
                </TabPane>
              )
            })
          }
        </Tabs>
      </Header>
      <Content style={{ paddingTop: 44, height: '100%' }}>
        <div className="home" ref={homeRef}>
          <BlogList props={props} search={search} total={total} articleList={articleList} blog={sizeChange}></BlogList>
        </div>
      </Content>
    </div>
  )
}

export default Classify
