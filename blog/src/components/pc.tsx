import * as React from 'react'
import { renderRoutes } from 'react-router-config'
import { Layout, Menu, Icon, Modal, Avatar, Dropdown } from 'antd'
import http from '../api'

const { useState, useEffect, useCallback } = React

// PC后台界面公共组件
const Pc = (props: any): any => {
  const { Header, Content } = Layout
  const [visible, setVisible] = useState<boolean>(false)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<any>({})

  // 校验是否登录过
  const checkLogin = useCallback((props: any): any => {
    const user: any = sessionStorage.getItem('user')
    const pathname: string = props.location.pathname
    if (!user) {
      props.history.push('/mLogin')
    } else {
      setUserInfo(JSON.parse(user))
      if (pathname === '/pc') {
        props.history.push(`${pathname}/blogIndex`)
        window.location.reload()
      }
    }
  }, [])

  // 退出登录
  const loginOut = (): void => {
    http.loginOut().then((): any => {
      sessionStorage.clear()
      props.history.push('/mLogin')
    })
  }

  useEffect(() => {
    checkLogin(props)
  }, [checkLogin, props])

  // 操作菜单
  const menu = (
    <Menu>
      <Menu.Item disabled>
        <p className="user-loginout">修改密码</p>
      </Menu.Item>
      <Menu.Item>
        <p className="user-loginout" onClick={() => setVisible(true)}>退出登录</p>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="ant-layout">
      <Layout className="pc">
        <Header>
          <p onClick={() => setCollapsed(!collapsed)}>博客后台系统</p>
          <div className="user">
            <p className="user-name" onClick={() => props.history.push('/')}>{userInfo && userInfo.name}</p>
            <Dropdown overlay={menu} placement="bottomCenter">
              <Avatar src={require('../assets/img/avatar.jpeg')} />
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Content>
            <PcMenu props={props} collapsed={collapsed} />
            {renderRoutes(props.route.routes)}
          </Content>
        </Layout>
      </Layout>
      <Modal
        title="提示"
        width="300px"
        bodyStyle={{
          textAlign: 'center'
        }}
        visible={visible}
        centered={true}
        closable={false}
        maskClosable={false}
        cancelText="取消"
        okText="确定"
        onOk={loginOut}
        onCancel={() => setVisible(false)}
      >
        <p>是否退出登录？</p>
      </Modal>
    </div>
  )
}

// 左侧侧边栏
const PcMenu = (props: any): any => {
  return (
    <div>
      <Menu
        defaultSelectedKeys={[props.props.location.pathname]}
        selectedKeys={[props.props.location.pathname]}
        mode="inline"
        theme="light"
        inlineCollapsed={props.collapsed}
        onClick={(e) => props.props.history.push(e.key)}
      >
        {
          props.props.route.routes.map((item: any, index: number): any => {
            return <Menu.Item key={item.path}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Menu.Item>
          })
        }
      </Menu>
    </div>
  )
}

export default Pc
