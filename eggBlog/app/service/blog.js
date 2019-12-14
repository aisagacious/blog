'use strict'
const Service = require('egg').Service
const sd = require('silly-datetime')

class BlogService extends Service {
  async addBlog (params) {
    const obj = {
      title: params.title,
      content: params.content,
      status: params.status,
      id: params.id
    }
    const tag = params.tag
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      const jxArr = JSON.parse(tag)
      const jxStr = jxArr.reduce(function (str, item, index, arr) {
        return index === arr.length - 1 ? str += `('${params.id}','${item}')` : str += `('${params.id}','${item}'),`
      }, '')
      await conn.insert('article', obj)
      await conn.query(`INSERT INTO article_tag (relation_id, tag_id) VALUES ${jxStr}`)
      return { success: true }
    }, this.ctx)
    return result
  }

  async updateBlog (params) {
    const obj = {
      id: params.id,
      title: params.title,
      content: params.content,
      status: params.status,
      update_time: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    }
    const tag = params.tag
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      const jxArr = JSON.parse(tag)
      const jxStr = jxArr.reduce(function (str, item, index, arr) {
        return index === arr.length - 1 ? str += `('${params.id}','${item}')` : str += `('${params.id}','${item}'),`
      }, '')
      await conn.delete('article_tag', { relation_id: obj.id })
      await conn.update('article', obj)
      await conn.query(`INSERT INTO article_tag (relation_id, tag_id) VALUES ${jxStr}`)
      return { success: true }
    }, this.ctx)
    return result
  }

  async queryBlog (params) {
    const obj = {
      pageNo: Number(params.pageNo),
      pageSize: Number(params.pageSize),
      title: params.title,
      createTime: params.createTime,
      status: params.status
    }
    // 模糊查询 date_format(转换日期查询)
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      const search = obj.title && obj.createTime ? [obj.status, obj.title + '%', obj.createTime] : obj.title ? [obj.status, obj.title + '%'] : obj.createTime ? [obj.status, obj.createTime] : [obj.status]
      const query = await conn.query(`select * from article where del_flag = 'Y' and status = ? ${obj.title ? 'and title like ?' : ''} ${obj.createTime ? 'and date_format(create_time, "%Y-%m-%d") <= ?' : ''} ORDER BY create_time DESC LIMIT ${(obj.pageNo - 1) * obj.pageSize},${obj.pageSize}`, search)
      const dataTotal = await conn.query(`select COUNT(*) AS total from article where del_flag = 'Y' and status = ? ${obj.title ? 'and title like ?' : ''} ${obj.createTime ? 'and date_format(create_time, "%Y-%m-%d") <= ?' : ''}`, search)
      return {
        rows: query,
        total: Object.values(dataTotal)[0].total
      }
    }, this.ctx)
    return result
  }

  async queryIdBlog (params) {
    const obj = {
      id: params.id
    }
    // 查询博客内容及标签分类
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      const idQuery = await conn.get('article', obj)
      const tag = await conn.query(`select t3.tag_id from article t1 left join article_tag t2 on t1.id = t2.relation_id left join tag t3 on t2.tag_id = t3.tag_id where t1.id = ?`, [obj.id])
      let jxTag = JSON.parse(JSON.stringify(tag)).map(item => {
        return item.tag_id
      })
      return Object.assign({}, idQuery, { tag: jxTag })
    }, this.ctx)
    return result
  }

  async deleteBlog (params) {
    const obj = {
      id: params.id,
      del_flag: 'N',
      update_time: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    }
    const id = await this.app.mysql.update('article', obj)
    // 判断更新成功
    const updateSuccess = id.affectedRows === 1 ? id : null
    return updateSuccess
  }

  async updateReading (params) {
    const { ctx } = this
    const obj = {
      id: params.id
    }
    let saveBlogId = [] // 保存博客id
    let sessionBlogId = ctx.session.blog
    let result
    if (sessionBlogId) {
      if (!sessionBlogId.includes(obj.id)) {
        result = await this.app.mysql.beginTransactionScope(async conn => {
          await conn.query('update article set read_count=read_count+1 where id like ?', [obj.id])
          const idQuery = await conn.get('article', obj)
          const tag = await conn.query(`select t3.tag_name,t3.tag_id from article t1 left join article_tag t2 on t1.id = t2.relation_id left join tag t3 on t2.tag_id = t3.tag_id where t1.id = ?`, [obj.id])
          let jxTag = JSON.stringify(tag)
          saveBlogId = saveBlogId.concat(sessionBlogId)
          saveBlogId.push(obj.id)
          ctx.session.blog = saveBlogId
          return Object.assign({}, idQuery, { tag: JSON.parse(jxTag) })
        }, ctx)
      } else {
        result = await this.app.mysql.beginTransactionScope(async conn => {
          const idQuery = await conn.get('article', obj)
          const tag = await conn.query(`select t3.tag_name,t3.tag_id from article t1 left join article_tag t2 on t1.id = t2.relation_id left join tag t3 on t2.tag_id = t3.tag_id where t1.id = ?`, [obj.id])
          let jxTag = JSON.stringify(tag)
          return Object.assign({}, idQuery, { tag: JSON.parse(jxTag) })
        }, ctx)
      }
    } else {
      result = await this.app.mysql.beginTransactionScope(async conn => {
        await conn.query('update article set read_count=read_count+1 where id like ?', [obj.id])
        const idQuery = await conn.get('article', obj)
        const tag = await conn.query(`select t3.tag_name,t3.tag_id from article t1 left join article_tag t2 on t1.id = t2.relation_id left join tag t3 on t2.tag_id = t3.tag_id where t1.id = ?`, [obj.id])
        let jxTag = JSON.stringify(tag)
        saveBlogId.push(obj.id)
        ctx.session.blog = saveBlogId

        return Object.assign({}, idQuery, { tag: JSON.parse(jxTag) })
      }, ctx)
    }
    return result
  }
}

module.exports = BlogService