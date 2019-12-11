'use strict'
const Controller = require('egg').Controller

class TagController extends Controller {
  async addTags() {
    const { ctx } = this
    const tag = ctx.request.body
    // 定义请求参数的验证规则
    ctx.validate({
      tagName: 'string'
    }, tag)
    const result = await ctx.service.tag.addTags(Object.assign({}, tag, { tagId: ctx.helper.uuid() }))
    if (result) {
      ctx.helper.success(ctx, '添加成功', null)
    } else {
      ctx.helper.fail(ctx, '失败', null)
    }
  }

  async queryTags() {
    const { ctx } = this
    const tag = await ctx.service.tag.queryTags()
    if (tag) {
      ctx.helper.success(ctx, '成功', tag ? ctx.helper.formatConversion(tag) : tag)
    } else {
      ctx.helper.fail(ctx, '失败', null)
    }
  }

  async deleteTags() {
    const { ctx } = this
    ctx.validate({
      tagId: 'string'
    }, ctx.query)
    const tag = await ctx.service.tag.deleteTags(ctx.query)
    if (tag) {
      ctx.helper.success(ctx, '成功', null)
    } else {
      ctx.helper.fail(ctx, '失败', null)
    }
  }

  async classifiedQuery() {
    const { ctx } = this
    const tag = ctx.query
    // 定义请求参数的验证规则
    ctx.validate({
      tagId: 'string',
      pageNo: 'string',
      pageSize: 'string'
    }, tag)
    const result = await ctx.service.tag.classifiedQuery(tag)
    if (result) {
      ctx.helper.success(ctx, '查询成功', result ? Object.assign({}, result, { rows: ctx.helper.formatConversion(result.rows) }) : result)
    } else {
      ctx.helper.fail(ctx, '查询失败', null)
    }
  }
}

module.exports = TagController