import axios from 'axios'
import store from '@/store/store'
import router from '@/router'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 20000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' //'application/json'
//axios.defaults.headers.common['sso_token'] = store.state.user.token // 'bearer ' + localStorage.getItem('sso_token')
//axios.defaults.baseURL = $web.$conf.webServer
axios.defaults.withCredentials = true

// 请求拦截器
axios.interceptors.request.use(function (config) {
  console.log(config)
  if (config.url.indexOf('static/conf.json') >= 0) {
    config.baseURL = ''
  }
  else {
    config.baseURL = $web.$conf.webServer
  }

  if (config.headers && store.state.session.token && store.state.session.token != null) {
    config.headers.sso_token = store.state.session.token
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit('users/clearUser')
          router.replace({
            path: '/',
            query: {redirect: router.currentRoute.fullPath}
          })
          break
        case 403:
          // 403 无权限，跳转到首页
          router.replace({
            path: '/base/welcome',
            query: {redirect: router.currentRoute.fullPath}
          })
          break
      }
    }

    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    /* return Promise.reject(error.response.data) */
    let message = error.message
    if (error.response) {
      message = '系统异常，请联系管理员！详细内容：status=' + error.response.status + ' statusText='
        + error.response.statusText + ' response=' + JSON.stringify(error.response.data)
    }
    return Promise.reject({
      status: 1,
      message: message,
      data: error
    })
  })

axios.stringify = function (jsonObj) {
  return qs.stringify(jsonObj)
}

axios.parse = function (jsonStr) {
  return qs.parse(jsonStr)
}

export default {
  install (Vue, options) {
    Vue.prototype.$axios = axios
    window.$web.$axios = axios
  }
}
