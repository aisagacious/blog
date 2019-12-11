'use strict'
const Service = require('egg').Service

class UserService extends Service {
  async login(params) {
    // 取出指定参数 避免插入sql错误
    const obj = {
      username: params.username,
      password: params.password
    }
    const user = await this.app.mysql.get('user', obj)
    return user
  }
}

module.exports = UserService