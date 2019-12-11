'use strict'
const uuid = require('uuid')

// 下划线转换驼峰
const toHump = (name) => {
  return name.replace(/\_(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
}

// 驼峰转换下划线
const toLine = (name) => {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

module.exports = {
  /**
   * 调用正常情况的返回数据封装
   * @param {Object} ctx - context
   * @param {*} msg  - message
   * @param {*} data - 数据
   */
  success (ctx, msg, data) {
    ctx.body = {
      code: 'success',
      msg,
      data
    }
    ctx.status = 200
  },
  /**
   * 处理失败，处理传入的失败原因
   * @param {Object} ctx - context
   * @param {*} msg  - message
   * @param {*} data - 数据
   */
  fail (ctx, msg, data) {
    ctx.body = {
      code: 'error',
      msg: msg,
      data: data
    }
    ctx.status = 200
  },
  timeOut (ctx) {
    ctx.body = {
      code: 'timeOut',
      msg: '登录超时',
      data: null
    }
    ctx.status = 200
  },
  // 生成uuid
  uuid () {
    return uuid.v1()
  },
  /**
   * @param {Array} arr 数据
   * @param {Array} trans 那些数据需要转换格式
   * @param {string} [type='hump'] hump=> 驼峰 line=> 下划线
   */
  formatConversion (arr, type = 'hump', trans = []) {
    let newArr = arr.map((item) => {
      let obj = {}
      for (const key in item) {
        const jxKey = type === 'hump' ? toHump(key) : toLine(key)
        if (trans.includes(jxKey)) {
          obj[jxKey] = JSON.parse(item[key])
        } else {
          obj[jxKey] = item[key]
        }
      }
      return obj
    })
    return newArr
  }
}