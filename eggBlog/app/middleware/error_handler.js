'use strict'
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      if(ctx.originalUrl.includes('/user')) {
        if(ctx.session.userInfo) {
          await next()
        }else {
          ctx.helper.timeOut(ctx)
        }
      }else {
        await next()
      }
    } catch (err) {
      // 控制台输出
      console.error('MiddleWare errorHandler', err)
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx)
      // status 如果没有,则统一为500
      const status = err.status || 500
      // 如果是500错误，且是生产环境，则统一显示“Internal Server Error”
      const error = status === 500 && ctx.app.config.env === 'prod' ? 'Internal Server Error' : err
      // 改变上下文状态代码
      ctx.status = status
      // 从 error 对象上读出各个属性，设置到响应中

      ctx.body = {
        error
      }
    }
  }
}