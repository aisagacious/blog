import http from '../utils/axios'

export default {
  login(data: any): any { // 登录接口
    return http('post', '/login', data)
  },
  loginOut(): any { // 退出登录
    return http('get', '/loginOut')
  },
  addOrUpdateBlog(data: any): any { // blog发布与更新
    return http('post', '/user/addOrUpdateBlog', data)
  },
  queryBlog(data: any): any { // 查询博客
    return http('get', '/user/queryBlog', data)
  },
  queryIdBlog(id: any): any { // 根据id查询博客
    return http('get', '/user/queryIdBlog', id)
  },
  queryTags():any { // 获取分类标签
    return http('get', '/user/queryTags')
  },
  addTags(data: any):any { // 添加标签
    return http('post', '/user/addTags', data)
  },
  deleteTags(data: any):any { // 删除标签
    return http('get', '/user/deleteTags', data)
  },
  deleteBlog(data: any):any { // 删除Blog
    return http('get', '/user/deleteBlog', data)
  },
  // 接口不在session校验中
  queryForeignBlog(data: any): any { // 查询博客
    return http('get', '/foreign/queryBlog', data)
  },
  updateReading(id: any): any { // 更新博客阅读数量
    return http('get', '/foreign/updateReading', id)
  },
  queryForeignTags():any { // 获取分类标签
    return http('get', '/foreign/queryTags')
  },
  classifiedQuery(data: any): any { // 标签分类查询
    return http('get', '/foreign/classifiedQuery', data)
  },
  uploadImg(data: any): any { // 标签分类查询
    return http('post', '/file/uploadImg', data, 'file')
  }
}