'use strict'
const Service = require('egg').Service
const fs = require('fs')
const path = require('path')
// 给图片添加水印
const images = require('images')
// 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write
// 管道读入一个虫洞
const sendToWormhole = require('stream-wormhole')
const dayjs = require('dayjs')

var website = images('../blogFile/website.jpg')

// 公共上传图片组件
class FileService extends Service {
  async uploadFile () {
    // 获取file信息
    const stream = await this.ctx.getFileStream()

    // 获取图片来源 存储图片文件夹 方便后期查找
    const category = stream.fields.fileName || ''

    // 把图片存放在项目外 防止部署项目删除文件
    const uplaodBasePath = '../blogFile'

    // 生成文件名
    const filename = `${Date.now()}${Number.parseInt(
      Math.random() * 1000,
    )}${path.extname(stream.filename).toLocaleLowerCase()}`

    // 生成文件夹
    const dirname = dayjs(Date.now()).format('YYYY-MM-DD')

    await this.mkdirsSync(path.join(uplaodBasePath, category, dirname))

    // 生成写入路径
    const target = path.join(uplaodBasePath, category, dirname, filename)
    // 写入流
    const writeStream = fs.createWriteStream(target)

    try {
      //异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream))
      const sourceImg = images(target)
      // if (category !== 'avatar') { // 如果上传不是头像 则添加水印
      //   images(sourceImg).draw(images(website), sourceImg.width() - website.width() - 1, sourceImg.height() - website.height() - 5).save(target, {               //保存当前图像至srcImg，图像质量100
      //     quality: 80
      //   })
      // }
    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream)
      return null
    }

    // 这里注意文件生成目录 window 生成目录返回路径为\
    const url = path.join('/api', category, dirname, filename)
    const filePath = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7001' : 'https://lurenhong.top'
    return `${filePath}${url}`
  }

  async mkdirsSync (dirname) {
    // 判断是否有文件夹 没有则创建
    if (fs.existsSync(dirname)) {
      return true
    } else {
      if (await this.mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname)
        return true
      }
    }
  }
}

module.exports = FileService