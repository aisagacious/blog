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
  const [path, setPage] = useState<string>(props.to.location.pathname)

  // 路由跳转
  const toPage = (item: SideBar): void => {
    setPage(item.path)
    sessionStorage.removeItem('range')
    sessionStorage.removeItem('page')
    to.history.push(item.path)
  }

  const toLogin = (): void => {
    if (!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
      to.history.push('/mLogin')
    }
  }
  
  return (
    <div className="user-select">
      <div className="avatar" onClick={toLogin}>
        <img src={info.avatar} alt="" />
      </div>
      <div>
        <p className="user-title center">{info.title}</p>
        <p className="desc center">{info.desc}</p>
      </div>
      <div className="aside">
        <ul>
          {sideBar.map((item: SideBar, index: number): any => {
            return <li style={{ 'color': item.path === (path === '/' ? '/home' : path) ? '#1890ff' : '#fff' }} key={index} onClick={() => toPage(item)}>
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
  const [foldFlag, setFlodFlag] = useState<boolean>(true)
  const isFlod: boolean = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
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
    isFlod && setFlodFlag(!foldFlag)
  }, [])

  // 默认跳转主页
  const initPage = (props: any): void => {
    // if (window.location.pathname === '/') {
      props.location.pathname === '/' && props.history.push('/home')
    // }
  }

  return (
    <Layout className="dashboard">
      <Sider width={foldFlag ? '200px' : '40px'} style={{ 'display': (accessRights.indexOf(props.location.pathname) !== -1) ? 'inherit' : 'none' }}>
        <div className="icon-fold" style={{ 'display': isFlod ? 'inherit' : 'none' }}>
          <Icon type={foldFlag ? 'menu-fold' : 'menu-unfold'} onClick={() => setFlodFlag(!foldFlag)} />
        </div>
        <div style={{ 'display': foldFlag ? 'inherit' : 'none' }}>
          <Navigation info={info} sideBar={sideBar} to={props} />
          <div className="social-contact">
            <p><a href="https://github.com/aisagacious" target="_slef"><Icon type="github" /></a></p>
            <p className="put-on-file"><a href="http://www.beian.miit.gov.cn/">蜀ICP备17026786号-1</a></p>
          </div>
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
