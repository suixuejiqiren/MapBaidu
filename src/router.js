import Vue from 'vue'
import Router from 'vue-router'
import Util from '@/utils/util.js'
import { Loading } from 'element-ui'
import userManage from '@/views/security/userManage'
import currentUserManage from '@/views/security/currentUserManage'

Vue.use(Router)

const routers = [
  {
    path: '*',
    component: (resolve) => require(['@/views/error/404.vue'], resolve)
  },
  {
    path: '/',
    meta: {
      title: '登录'
    },
    component: (resolve) => require(['./map'], resolve)
  },
]

const router = new Router(
  {
    mode: 'hash',
    base: '/',
    routes: routers
  }
)
export default router
