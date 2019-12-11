import Dashboard from '../views/Dashboard'
import Home from '../views/Home'
import Classify from '../views/Classify'
import Life from '../views/Life'
import About from '../views/About'
import Error from '../views/error'
import Details from '../views/Details'

// PC端
import Login from '../views/Login'
import Pc from '../components/pc'
import BlogIndex from '../views/Login/blogIndex'
import Blog from '../views/Login/blog'
import Tag from '../views/Login/tag'

// type->true博客展示 type->false PC后台管理权限
export default {
  component: Dashboard,
  routes: [
    {
      path: '/',
      component: Dashboard,
      routes: [ // 嵌套路由
        {
          path: '/home',
          exact: true,
          type: true,
          component: Home
        },
        {
          path: '/classify',
          exact: true,
          type: true,
          component: Classify
        },
        {
          path: '/life',
          exact: true,
          type: true,
          component: Life
        },
        {
          path: '/about',
          exact: true,
          type: true,
          component: About
        },
        {
          path: '/details',
          exact: true,
          type: true,
          component: Details
        },
        {
          path: '/mLogin',
          exact: true,
          type: false,
          component: Login
        },
        {
          path: '/pc',
          type: false,
          component: Pc,
          routes: [
            {
              path: '/pc/blogIndex',
              exact: true,
              type: false,
              title: '首页',
              icon: 'home',
              component: BlogIndex
            },
            {
              path: '/pc/blog',
              exact: true,
              type: false,
              title: '博客',
              icon: 'diff',
              component: Blog
            },
            {
              path: '/pc/tag',
              exact: true,
              type: false,
              title: '标签',
              icon: 'tags',
              component: Tag
            }
          ]
        },
        {
          path: '/error',
          exact: true,
          type: false,
          component: Error
        }
      ]
    }
  ]
}