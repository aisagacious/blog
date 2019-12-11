## React 

1. react+ts搭建
   create-react-app blog --scripts-version=react-scripts-ts

2. 本人项目目录结构 (删除不必要的文件)
  cd src
  mkdir assets && mkdir components && mkdir views && mkdir utils && mkdir config

  assets  // 项目静态资源
  components  // 公共组件
  views  // 视图
  utils // 工具类
  config // 公共配置

3. 集成(ui) antd
  cnpm i antd -S

  使用antd组件错误 (Import sources within a group must be alphabetized)

  修改：tslint.json中添加(解决)
  ```
    "rules": {
      "ordered-imports": false
    }
  ```

4. 按需引入 antd (参考: https://ant.design/docs/react/use-in-typescript-cn)
  cnpm i react-app-rewired customize-cra --save-dev

  默认的: 
    "start": "react-scripts-ts start",
    "build": "react-scripts-ts build",
    "test": "react-scripts-ts test --env=jsdom",
    "eject": "react-scripts-ts eject"

  修改后:
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test"
  
  启动项目: 
    错误1: Cannot find module 'react-scripts/package.json' 
    找不到模块--> 重新安装一下
      cnpm i react-scripts -S
    错误2: @0.1.0 start: `react-app-rewired start`
    网上推荐降级处理 
      cnpm i react-app-rewired@2.0.2-next.0 --S-D

    再次运行 npm run start 访问成功(按需加载ok)

#### 项目运行
npm start