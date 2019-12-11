import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

axios.defaults.baseURL = '/api' // api的base_url
axios.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

let loadingFlag: any = null
let isMore: number = 0

// 显示loading
const showLoading = (): any => {
  if (isMore === 0 && !loadingFlag) {
    loadingFlag = message.loading('努力加载中...', 0)
  }
  isMore++
}

// 隐藏loading
const closeLoading = (): any => {
  isMore--
  if (isMore === 0) {
    setTimeout(() => {
      setTimeout(loadingFlag, 0)
      loadingFlag = null
    }, 100)
  }
}

// Add a request interceptor
axios.interceptors.request.use((config): any => {
  // Do something before request is sent
  // POST传参序列化
  if (config.method === 'post' && !(config.url && config.url.indexOf('file') !== -1)) {
    config.data = qs.stringify(config.data)
  }

  // if(!(config.url && config.url.indexOf('foreign') !== -1)) {
  //   showLoading()
  // }
  showLoading()
  return config
}, (error): any => {
  closeLoading()
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use((response): any => {
  // Do something with response data
  closeLoading()
  return response
}, (error): any => {
  closeLoading()
  // Do something with response error
  return Promise.reject(error)
})

const config = {
  headers: { 'Content-Type': 'multipart/form-data' }
}

const http = (type: string, api: string, data?: any, file?: string): any => {
  return new Promise((resolve: any, rejects: any): void => {
    axios[type](type === 'get' ? `${api}?timer=${+new Date()}` : api, type === 'post' ? data : { params: data }, file ? config : '').then((res: any): any => {
      const result = res.data
      if (result.code === 'success') {
        resolve(result)
      } else if (result.code === 'timeOut') {
        sessionStorage.clear()
        message.error(result.msg)
        window.location.href = '/mLogin'
      } else {
        message.error(result.msg)
      }
    }).catch((err: any): any => {
      rejects(err.data)
    })
  })
}

export default http