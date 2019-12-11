'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  // 登录接口
  router.post('/api/login', controller.user.login)

  // 退出登录 清除session
  router.get('/api/loginOut', controller.user.loginOut)

  // 新增博客
  router.post('/api/user/addOrUpdateBlog', controller.blog.addOrUpdateBlog)

  // 查询博客
  router.get('/api/user/queryBlog', controller.blog.queryBlog)

  // 根据id查询当前博客内容
  router.get('/api/user/queryIdBlog', controller.blog.queryIdBlog)

  // 查询分类
  router.get('/api/user/queryTags', controller.tag.queryTags)

  // 添加分类
  router.post('/api/user/addTags', controller.tag.addTags)

  // 删除分类
  router.get('/api/user/deleteTags', controller.tag.deleteTags)

  // 删除博客--> 改变delFlag 状态
  router.get('/api/user/deleteBlog', controller.blog.deleteBlog)


  // 以下接口不在session校验中 博客内容对外展示
  router.get('/api/foreign/queryBlog', controller.blog.queryBlog)

  router.get('/api/foreign/updateReading', controller.blog.updateReading)

  router.get('/api/foreign/queryTags', controller.tag.queryTags)

  // 标签分类查询
  router.get('/api/foreign/classifiedQuery', controller.tag.classifiedQuery)

  router.post('/api/file/uploadImg', controller.file.create)
}
