import * as React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import http from '../../api'

const { useEffect, useCallback } = React

// 登录组件
const Login = (props: any): any => {
  const { getFieldDecorator } = props.form

  // 校验是否登录过
  const checkLogin = useCallback((): any => {
    const user = sessionStorage.getItem('user')
    if (user) {
      props.history.push('/pc/blogIndex')
    }
  }, [props])

  // 提交信息
  const submit = (e: any): void => {
    e.preventDefault()
    props.form.validateFields((err: string, values: any): any => {
      if (!err) {
        http.login(values).then((res: any): void => {
          sessionStorage.setItem('user', JSON.stringify(res.data))
          props.history.push('/pc/blogIndex')
          // 强刷一下页面 不让login数据存储
          window.location.reload()
        })
      }
    })
  }

  useEffect(() => {
    checkLogin()
  }, [checkLogin])

  return (
    <div className="login ant-layout">
      <div className="login-block">
        <p className="center title">博客后台系统</p>
        <Form onSubmit={(e) => submit(e)} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入账号' }],
              initialValue: 'admin'
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入账号"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
              initialValue: '123456'
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

const LoginForm = Form.create({ name: '' })(Login)

export default LoginForm
