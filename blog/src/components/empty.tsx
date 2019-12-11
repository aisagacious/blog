import * as React from 'react'
import { Empty } from 'antd'

// 数据为空
const EmptyPage = (props?: any): any => {
  return (
    <div className="empty">
      <Empty description={props.name || '开发中...'} />
    </div>
  )
}

export default EmptyPage
