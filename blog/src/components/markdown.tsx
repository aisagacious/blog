import * as React from 'react'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const { useEffect } = React

interface Marked {
  renderer: any;
  gfm: boolean;
  pedantic: boolean,
  sanitize: boolean,
  tables: boolean,
  breaks: boolean,
  smartLists: boolean,
  smartypants: boolean,
  highlight: (code: any) => string
}

// Markdown组件
const Markdown = (props: any): any => {
  const markConfig: Marked = {
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    highlight: (code) => {
      return hljs.highlightAuto(code).value
    }
  }
  marked.setOptions(markConfig)

  useEffect(() => {
  }, [])

  return (
    <div className={props.flag ? 'markdown-body' : ''} dangerouslySetInnerHTML={{ __html: marked(props.content) }}></div>
  )
}

export default Markdown