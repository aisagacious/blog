import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './router'

// 加载css
import './assets/css/reset.css'
import './assets/css/markdown.css'
import './assets/css/base.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Router>
    {renderRoutes(routes.routes)}
  </Router>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
