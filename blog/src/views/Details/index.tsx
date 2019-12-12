import * as React from 'react'
import { PageHeader, Descriptions, Tag } from 'antd'
import http from '../../api'
import Markdown from '../../components/markdown'

const { useState, useEffect, useCallback } = React

const Details = (props: any): any => {
  const [blogObj, setBlogObj] = useState<any>()

  const queryIdBlog = useCallback((props: any): void => {
    const params: any = props.match.params
    if (!params) {
      props.history.push('/')
    } else {
      http.updateReading(params).then((res: any): any => {
        setBlogObj(res.data)
      })
    }
  }, [])

  useEffect(() => {
    queryIdBlog(props)
  }, [queryIdBlog, props])

  return (
    <div className="details">
      {
        blogObj &&
        <div
          className="details-item"
        >
          <PageHeader
            ghost={false}
            onBack={() => props.history.goBack()}
            title={blogObj.title}
            subTitle=""
            extra={[
              // <Button key="3">Operation</Button>
            ]}
          >
            <Descriptions size="small" column={1}>
              <Descriptions.Item label="">
                {
                  blogObj.tag && blogObj.tag.map((item: any, index: number): any => {
                    return <Tag color="geekblue" key={index}>{item.tagName}</Tag>
                  })
                }
              </Descriptions.Item>
            </Descriptions>
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="">{blogObj.createTime}</Descriptions.Item>
              <Descriptions.Item label="阅读数">
                {blogObj.readCount}
              </Descriptions.Item>
              <Descriptions.Item label="评论数">{blogObj.commentCount}</Descriptions.Item>
            </Descriptions>
          </PageHeader>
          <Markdown flag={true} content={blogObj.content}></Markdown>
        </div>
      }
    </div>
  )
}

export default Details