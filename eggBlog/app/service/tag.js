'use strict'
const Service = require('egg').Service

class TagService extends Service {
  async addTags(params) {
    const obj = {
      tag_name: params.tagName,
      tag_id: params.tagId
    }
    const tag = await this.app.mysql.insert('tag', obj)
    return tag.affectedRows === 1 ? tag : null
  }

  async queryTags() {
    const tag = await this.app.mysql.select('tag', {
      where: { del_flag: 'Y' },
      orders: [['create_time', 'desc']] // 排序方式
    })
    return tag
  }

  async deleteTags(params) {
    // 这里没有设置主键id 所以通过id 去查找
    const tag = await this.app.mysql.update('tag', { del_flag: 'N' }, {
      where: { tag_id: params.tagId }
    })
    // 判断更新成功
    return tag.affectedRows === 1 ? tag : null
  }

  async classifiedQuery(params) {
    const obj = {
      tagId: params.tagId,
      pageNo: Number(params.pageNo),
      pageSize: Number(params.pageSize)
    }
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      const query = await conn.query(`select t1.* from article t1 left join article_tag t2 on t1.id = t2.relation_id
      left join tag t3 on t2.tag_id = t3.tag_id
      where t3.tag_id = ? and t1.del_flag = 'Y' and t1.status = '1' ORDER BY t1.create_time DESC LIMIT ${(obj.pageNo - 1) * obj.pageSize},${obj.pageSize}`, [obj.tagId])
      const dataTotal = await conn.query(`select COUNT(*) AS total from article t1 left join article_tag t2 on t1.id = t2.relation_id
      left join tag t3 on t2.tag_id = t3.tag_id
      where t3.tag_id = ? and t1.del_flag = 'Y' and t1.status = '1'`, [obj.tagId])
      return {
        rows: query,
        total: Object.values(dataTotal)[0].total
      }
    }, this.ctx)
    return result
  }
}

module.exports = TagService