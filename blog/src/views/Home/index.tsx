import * as React from 'react'
import { debounce } from 'lodash' // throttle
import http from '../../api'
import BlogList from '../../components/blogList'

const { useState, useEffect, useRef, useCallback } = React

// 首页
const Home = (props: any): any => {
  const homeRef = useRef<any>(null)
  const [back, setBack] = useState<boolean>(false)
  const [articleList, setArticleList] = useState<any>([])
  const [total, setTotal] = useState<number>(0)
  const [search, setSearch] = useState<any>({
    pageNo: 1,
    pageSize: 10,
    title: '',
    createTime: '',
    status: '1'
  })

  // 查询博客内容
  const queryBlog = useCallback((obj): void => {
    http.queryForeignBlog(obj).then((res: any): any => {
      setArticleList(res.data.rows)
      setTotal(res.data.total)
      setTimeout(() => {
        const curRange = sessionStorage.getItem('range')
        if (curRange) {
          homeRef.current.scrollTop = Number(curRange)
          Number(curRange) > 300 ? setBack(true) : setBack(false)
        }
      }, 0)
    })
  }, [])

  // 切换页码
  const sizeChange = (e: number): void => {
    sessionStorage.removeItem('range')
    const jxPage = Object.assign({}, search, { pageNo: e })
    setSearch(jxPage)
    queryBlog(jxPage)
  }

  // 监听滚动事件
  const onScroll = (event: any): void => {
    sessionStorage.setItem('range', event.target.scrollTop.toString())
    event.target.scrollTop > 300 ? setBack(true) : setBack(false)
  }

  const backTop = (): void => {
    // 使用平滑效果
    homeRef && homeRef.current.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const page = sessionStorage.getItem('page')
    if (page) {
      setSearch(Object.assign({}, search, JSON.parse(page)))
      queryBlog(JSON.parse(page))
    } else {
      queryBlog(search)
    }
    // 使用防抖处理 避免浏览器卡顿
    homeRef && homeRef.current.addEventListener('scroll', debounce(onScroll, 100))
    return () => {
      homeRef.current.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="home" ref={homeRef}>
      {
        back && <div className="back-top" onClick={backTop}>
          <img src={require('../../assets/img/back_top.png')} alt="" />
        </div>
      }
      <BlogList props={props} search={search} total={total} articleList={articleList} blog={sizeChange}></BlogList>
    </div>
  )
}

export default Home
