'use strict'
const Controller = require('egg').Controller
const utility = require('utility') // 密码加密

// 定义请求参数的验证规则
const userRule = {
  username: {
    type: 'string',
    required: true,
    min: 5
  },
  password: {
    type: 'string',
    required: true,
    min: 32
  }
}

class UserController extends Controller {
  async login() {
    const { ctx } = this
    const user = Object.assign({}, ctx.request.body, { password: utility.sha1(ctx.request.body.password) })
    // 参数校验 ctx.query
    ctx.validate(userRule, user)
    const userInfo = await ctx.service.user.login(user)
    if (userInfo) {
      ctx.session.userInfo = userInfo
      ctx.helper.success(ctx, '登录成功', Object.assign({}, userInfo, { password: '******' }))
    } else {
      ctx.helper.fail(ctx, '账号或密码错误', userInfo)
    }
  }

  async loginOut() {
    const { ctx } = this
    ctx.session.userInfo = null
    ctx.helper.success(ctx, '退出登录', null)
  }
}

module.exports = UserController