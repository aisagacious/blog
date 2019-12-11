import * as React from 'react'
import Editor from 'for-editor'
import { Input, Button, message, Modal, Select } from 'antd'
import http from '../../api'

const { useState, useRef, useEffect, useCallback } = React
const { Option } = Select

interface Params {
  id?: string;
  tag: string[];
  title: string;
  content: string;
  create_time?: string;
  update_time?: string;
  read_count?: number;
  comment_count?: number;
  status?: string;
  del_flag?: string;
  only?: string;
}

interface TagRule {
  tagName: string;
  tagId: string;
  createTime: string;
  delFlag: string;
}

const Blog = (props: any): any => {
  const editor: any = useRef(null)
  const [count, setCount] = useState<number>(0)
  const [visible, setVisible] = useState<any>(false)
  const [tagList, setTagList] = useState<TagRule[]>()
  const [defaultTag, setDefaultTag] = useState<string[]>()
  const [params, setParams] = useState<Params>({
    tag: [],
    title: '',
    content: '',
    status: '0',
    id: ''
  })

  // 配置Editor
  const toolbar: any = {
    h1: true, // h1
    h2: true, // h2
    h3: true, // h3
    h4: true, // h4
    img: true, // 图片
    link: true, // 链接
    code: true, // 代码块
    preview: true, // 预览
    expand: true, // 全屏
    /* v0.0.9 */
    undo: true, // 撤销
    // redo: true, // 重做
    // save: true, // 保存
    /* v0.2.3 */
    subfield: true, // 单双栏模式
  }

  // 公共更新params state状态
  const updateState = (item: any): void => {
    setParams(Object.assign({}, params, item))
  }

  // 查询标签分类
  const queryTags = (): void => {
    http.queryTags().then((res: any): void => {
      setTagList(res.data)
    })
  }

  // 更新title内容
  const updateTitle = (e: any): void => {
    const value = e.target.value
    setCount(value.length)
    updateState({ title: value.trim() })
  }

  // 博客内容
  const blogValue = (val: any): void => {
    updateState({ content: val })
  }

  // 博客添加图片
  const addImg = (file: any): any => {
    const formData = new FormData()
    formData.append('fileName', 'blog')
    formData.append('file', file)
    http.uploadImg(formData).then((res: any): void => {
      editor.current.$img2Url(file.name, res.data)
    })
  }

  // 标签选择事件回调
  const tagChange = (value: any): any => {
    updateState({ tag: value })
  }

  // 保存或者发布
  const modalOk = (status: number): any => {
    if (!params.title) return message.error('请输入标题')
    if (!params.content.trim()) return message.error('请输入博客内容')
    if (params.tag && !params.tag.length) return message.error('请选择标签分类')
    const result = Object.assign({}, params, { status: status, tag: JSON.stringify(params.tag) })
    http.addOrUpdateBlog(result).then((res: any): any => {
      props.history.push('/pc/blogIndex')
      message.success(res.msg)
    })
  }

  // 查询博客
  const queryIdBlog = useCallback((props: any): void => {
    http.queryIdBlog(props.location.state).then((res: any): any => {
      setParams(res.data)
      const tags = res.data.tag.map((item: any): any => {
        return item.tagId
      })
      setDefaultTag(tags)
    })
  }, [])

  useEffect(() => {
    props.location.state && queryIdBlog(props)
    queryTags()
    return () => {
    }
  }, [queryIdBlog, props])

  return (
    <div className="editor">
      <div className="title">
        <Input size="large" placeholder="请输入标题" value={params.title} onChange={(e) => updateTitle(e)} />
        <p className="count">{count}/100</p>
        <Button type="primary" onClick={() => setVisible(true)}>发布博客</Button>
      </div>
      <Editor toolbar={toolbar} ref={editor} value={params.content} onChange={(val) => blogValue(val)} addImg={($file) => addImg($file)} />

      {/* 弹窗 */}
      <Modal
        title="发布"
        visible={visible}
        maskClosable={false}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            取消
            </Button>,
          <Button key="draft" type="dashed" onClick={() => modalOk(0)}>
            保存草稿
             </Button>,
          <Button key="release" type="primary" onClick={() => modalOk(1)}>
            发布
            </Button>
        ]}
      >
        <div className="select-tag">
          <p>添加标签</p>
          <Select
            className="com-width"
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请添加标签"
            defaultValue={defaultTag}
            onChange={tagChange}
          >
            {
              tagList && tagList.map((item: any): any => {
                return <Option key={item.tagId}>{item.tagName}</Option>
              })
            }
          </Select>
        </div>
      </Modal>
    </div>
  )
}

export default Blog
