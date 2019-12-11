import * as React from 'react'
import { Icon, Pagination } from 'antd'
import Markdown from './markdown'
import Empty from './empty'

// 博客列表
const BlogList = (props: any): any => {
  // 页码改变
  const sizeChange = (e: number): void => {
    sessionStorage.setItem('page', JSON.stringify(Object.assign({}, props.search, { pageNo: e })))
    props.blog(e)
  }

  const toPage = (id: string): any => {
    props.props.history.push({
      pathname: '/details', state: {
        id: id
      }
    })
  }

  return (
    <>
      <div className="list">
        <ul>
          {
            props.articleList && props.articleList.map((item: any, index: number): any => {
              return <li key={index} onClick={() => toPage(item.id)}>
                <p className="title">{item.title}</p>
                <div className="content">
                  <Markdown flag={false} content={item.content}></Markdown>
                </div>
                <div className="meta">
                  <p className="date">{item.createTime}</p>
                  <p className="count"><Icon type="read" />&nbsp;<span>{item.readCount}&nbsp;</span>&nbsp;|&nbsp;<span>{item.commentCount}&nbsp;</span>评论</p>
                </div>
              </li>
            })
          }
        </ul>
      </div>
      {
        props.articleList && !props.articleList.length ? <Empty name="暂无数据"></Empty> : ''
      }
      <Pagination
        className="ping"
        defaultPageSize={props.search.pageSize}
        onChange={sizeChange}
        defaultCurrent={props.search.pageNo}
        current={props.search.pageNo}
        hideOnSinglePage={true}
        total={props.total}
      />
    </>
  )
}

export default BlogList