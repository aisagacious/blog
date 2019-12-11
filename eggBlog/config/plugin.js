'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  security: { // 关闭csrf验证
    csrf: {
      enable: false,
    }
  },
  cors: {
    enable: true,
    // credentials: true,
    package: 'egg-cors'
  }
};
