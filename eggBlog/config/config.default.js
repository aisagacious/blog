/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1575250795233_6089';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // errorHandler 只在/api上生效
  config.errorHandler = {
    match: '/api',
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['*']
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  config.session = {
    key: 'blog_session',
    maxAge: 30 * 60 * 1000, // 1day 24 * 3600 * 1000
    httpOnly: true,
    encrypt: true,
    renew: true // 延长会话有效期
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '',
      // 数据库名
      database: '',
      // mysql 和node时区不同
      timezone: '08:00'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }

  // 配置上传
  config.multipart = {
    fileSize: '50mb',
    mode: 'stream',
    // fileExtensions: ['.xls', '.txt'], // 扩展几种上传的文件格式
  };

  // 由于项目每次需要部署 图片放在项目中容易误删 把存储图片放在项目外部
  config.static = {
    prefix: '/api', 
    dir: path.join(appInfo.baseDir, '../blogFile'), 
    maxAge: 31536000,
  }

  return config

  // return { // node 8.x不支持 ...
  //   ...config,
  //   ...userConfig
  // };
};
