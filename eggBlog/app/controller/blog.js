'use strict'
const Controller = require('egg').Controller

// 定义请求参数的验证规则
const blogRule = {
  id: 'string?',
  tag: 'string?',
  title: {
    type: 'string',
    required: true,
    max: 100
  },
  content: 'string',
  create_time: 'string?',
  update_time: 'string?',
  read_count: 'string?',
  comment_count: 'string?',
  status: 'string?',
  del_flag: 'string?',
  only: 'string?',
}

class BlogController extends Controller {

  async addOrUpdateBlog() {
    let blog
    const { ctx } = this
    const body = ctx.helper.formatConversion([ctx.request.body], 'line')[0]
    // 参数校验 ctx.query
    ctx.validate(blogRule, body)
    if (body.id) { // 如果id存在表示更新
      blog = await ctx.service.blog.updateBlog(body)
    } else {
      blog = await ctx.service.blog.addBlog(Object.assign({}, body, { id: ctx.helper.uuid() }))
    }
    if (blog) {
      ctx.helper.success(ctx, '发布成功', null)
    } else {
      ctx.helper.fail(ctx, '失败', null)
    }
  }

  async queryBlog() {
    const { ctx } = this
    ctx.validate({
      pageNo: 'string',
      pageSize: 'string',
      title: 'string?',
      createTime: 'string?',
      status: 'string?'
    }, ctx.query)
    const query = await ctx.service.blog.queryBlog(ctx.query)
    if (query) {
      ctx.helper.success(ctx, '查询成功', query ? Object.assign({}, query, { rows: ctx.helper.formatConversion(query.rows) }) : query)
    } else {
      ctx.helper.fail(ctx, '查询失败', null)
    }
  }

  async queryIdBlog() {
    const { ctx } = this
    ctx.validate({
      id: 'string'
    }, ctx.query)
    const id = await ctx.service.blog.queryIdBlog(ctx.query)
    if (id) {
      ctx.helper.success(ctx, '成功',  Object.assign({}, ctx.helper.formatConversion([id])[0], {tag: ctx.helper.formatConversion(id.tag)}))
    } else {
      ctx.helper.fail(ctx, '失败', null)
    }
  }

  async deleteBlog() {
    const { ctx } = this
    ctx.validate({ id: 'string' }, ctx.query)
    const id = await ctx.service.blog.deleteBlog(ctx.query)
    if (id) {
      ctx.helper.success(ctx, '删除成功', null)
    } else {
      ctx.helper.fail(ctx, '删除失败', null)
    }
  }

  async updateReading() {
    const { ctx } = this
    ctx.validate({
      id: 'string'
    }, ctx.query)
    const id = await ctx.service.blog.updateReading(ctx.query)
    if (id) {
      ctx.helper.success(ctx, '成功',  Object.assign({}, ctx.helper.formatConversion([id])[0], {tag: ctx.helper.formatConversion(id.tag)}))
    } else {
      ctx.helper.fail(ctx, '失败', null)
    }
  }
}

module.exports = BlogController