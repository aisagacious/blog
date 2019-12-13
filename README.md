## 个人博客搭建

### 前言
----
> 项目预览  http://lurenhong.top/
1. 登录页 (个人使用暂时未开发注册功能)
![](https://user-gold-cdn.xitu.io/2019/12/11/16ef4cb3b3b76230?w=1307&h=946&f=png&s=276646)
2. 添加标签（方便后期条件查询）
![](https://user-gold-cdn.xitu.io/2019/12/11/16ef4cdf5f7d9b3c?w=1307&h=896&f=png&s=11981)
3. 添加博客内容以及标签选择 （草稿/发布）
![](https://user-gold-cdn.xitu.io/2019/12/11/16ef4cf6164147cc?w=1307&h=896&f=png&s=27999)

4. 展示博客列表（编辑/删除/条件查询及分页）
![](https://user-gold-cdn.xitu.io/2019/12/11/16ef4d057d2840df?w=1307&h=896&f=png&s=8833)
5. 博客展示首页（后台添加博客不对外开放）
![](https://user-gold-cdn.xitu.io/2019/12/11/16ef4d24f1bac6c6?w=1307&h=896&f=png&s=22264)
6. 博客详情页查看（目前已完成阅读量/评论功能开发中）
![](https://user-gold-cdn.xitu.io/2019/12/11/16ef4d3f0a01a4f6?w=1307&h=896&f=png&s=25956)
7. 分类查询
![](https://user-gold-cdn.xitu.io/2019/12/11/16ef4d4c9373b7d9?w=1307&h=896&f=png&s=22403)
8. 后续功能更新中...
### 搭建个人博客方式
----
**1. 使用第三方工具生成博客系统**
>优点 搭建简单(可直接部署在github)静态访问、不用考虑服务器配置
+ hexo https://hexo.io/zh-cn/
+ hugo https://www.gohugo.org/
>缺点 需要自己编写Markdown 然后部署到github,不便于操作

**2. 自己实现一个博客**

### 博客搭建
----
1.  尽量长话短说、git clone 项目有问题联系我（暂时支持PC-后期支持响应式）
      * 开发环境
        + mac、window
        + node 8.x+
        + mysql 5.6.44(目前版本) 项目启动-->请安装mysql（可视化工具推荐navicat）
      * 使用技术
        + 前端： React+Hooks+TypeScript
        + 后台：Egg+Mysql(实现增删改查)
        + 觉得项目ok 留下你的 star

2. 项目地址： git clone https://github.com/aisagacious/blog.git

3. 项目总体模块分为**3**部分
![](https://user-gold-cdn.xitu.io/2019/12/11/16ef4505797ee7aa?w=906&h=422&f=png&s=55055)

4. 项目启动与运行（假设当前在**blog**目录下）

    cd blog && npm i && npm run start 启动项目
    
    启动eggBlog项目 按照操作步骤来
    
   1. 新建一个数据库（表创建好后）进入eggBlog/config/config.default.js 中配置数据库信息
    
    ![](https://user-gold-cdn.xitu.io/2019/12/11/16ef4edd07716aa2?w=448&h=524&f=png&s=12701)

    ![](https://user-gold-cdn.xitu.io/2019/12/11/16ef4f3d803c4521?w=507&h=859&f=png&s=49445)

    
   2. 以上操作都完成后（执行下面命令->eggBlog项目即可启动）
    
      cd eggBlog && npm i && npm run dev 启动服务(默认端口 7001)

5. 项目中有注释、项目跑起来看一遍就理解了

### 项目功能点
* 之前使用Koa2开发项目中、插件集成工作量太大了各种配置
* 此处使用Egg开发项目结构比较完善清晰、mysql也封装一层、简单逻辑更方便
* 谈谈此次功能点

    + 登录使用session验证、设置了默认时间为半小时、可通过接口调用更新session过期时间
    + 图片上传（由于没开通OSS）这里我把图片上传到服务器 在blogFile下（这就是为什么我没把图片放在项目下、部署有可能会误删图片、图片上传生成水印）
    + 其他的功能点都是增删改查
    + 对于这个项目设计点比较多我就不一一讲解（项目搭建->开发完成->项目部署）、从中设计到React+Hooks+TypeScript+Egg（node封装的）+mysql 部署使用nginx配置代理（博客搭建比较简单 **勿喷**）
    
### 完结
    

