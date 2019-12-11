import * as React from 'react'
import { Layout, Icon } from 'antd'
import { renderRoutes } from 'react-router-config'

const { useState, useEffect } = React

interface Info {
  title: string;
  avatar: string;
  desc: string;
}

interface SideBar {
  name: string;
  path: string;
}

// 侧边导航内容
const Navigation = (props: any): any => {
  const { info, sideBar, to } = props
  const [path, setPage] = useState<string>('/home')

  // 路由跳转
  const toPage = (item: SideBar): void => {
    setPage(item.path)
    sessionStorage.removeItem('range')
    sessionStorage.removeItem('page')
    to.history.push(item.path)
  }

  useEffect(() => {
    setPage(props.to.location.pathname)
  }, [props])

  return (
    <div className="dashboard user-select">
      <div className="avatar" onClick={() => to.history.push('/mLogin')}>
        <img src={info.avatar} alt="" />
      </div>
      <div>
        <p className="title center">{info.title}</p>
        <p className="desc center">{info.desc}</p>
      </div>
      <div className="aside">
        <ul>
          {sideBar.map((item: SideBar, index: number): any => {
            return <li style={{ 'color': item.path === path ? '#1890ff' : '#fff' }} key={index} onClick={() => toPage(item)}>
              {item.name}
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}

const Dashboard = (props: any): any => {
  const { Sider, Content } = Layout
  const [info] = useState<Info>({
    title: '前端逐梦人',
    avatar: require('../assets/img/avatar.jpeg'),
    desc: '人生两大悲剧：一是万念俱灰，一是踌躇满志'
  })
  const [sideBar] = useState<SideBar[]>([
    {
      name: '首页',
      path: '/home'
    },
    {
      name: '分类',
      path: '/classify'
    },
    {
      name: '生活',
      path: '/life'
    },
    {
      name: '关于',
      path: '/about'
    }
  ])

  // Blog侧边菜单栏权限
  const accessRights: string[] = props.route.routes.map((item: any): string => {
    if (item.type) {
      return item.path
    }
    return ''
  })

  useEffect(() => {
    initPage(props)
  }, [props])

  // 默认跳转主页
  const initPage = (props: any): void => {
    props.location.pathname === '/' && props.history.push('/home')
    // 处理路由找不到 返回error
    const treeRoutes = (routes: any): string[] => {
      return routes.reduce((a: any, b: any): string => {
        return a.concat(Array.isArray(b.routes) ? treeRoutes(b.routes) : b.path)
      }, [])
    }
    // 处理错误页面
    const newRoutes: string[] = treeRoutes(props.route.routes)
    // 处理url带参数问题 进行过滤
    const path = props.location.pathname.replace(/^([^\?]*).*$/, ($all: string, $1: string): string => { return $1 })
    if (props.location.pathname !== '/' && ![...newRoutes, '/pc'].includes(path)) {
      props.history.push('/error')
    }
  }

  return (
    <Layout>
      <Sider width={230} style={{ 'display': (accessRights.indexOf(props.location.pathname) !== -1) ? 'inherit' : 'none' }}>
        <Navigation info={info} sideBar={sideBar} to={props} />
        <div className="social-contact">
          <p><a href="https://github.com/aisagacious" target="_slef"><Icon type="github" /></a></p>
          <p className="put-on-file"><a href="http://www.beian.miit.gov.cn/">蜀ICP备17026786号-1</a></p>
        </div>
      </Sider>
      <Layout>
        <Content>
          {renderRoutes(props.route.routes)}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Dashboard
