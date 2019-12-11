'use strict'
const Controller = require('egg').Controller

class FileController extends Controller {
  async create() {
    const { ctx } = this
    const url = await ctx.service.file.uploadFile()
    if (url) {
      ctx.helper.success(ctx, '上传成功', url)
    } else {
      ctx.helper.fail(ctx, '上传失败', null)
    }
  }
}

module.exports = FileController