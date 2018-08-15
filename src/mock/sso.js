// 引入mockjs
const Mock = require('mockjs')

const users = [
  {
    name: '超级管理员',
    userName: 'admin',
    userPwd: 'Boco1234'
  }, {
    name: '郭建锋',
    userName: 'guojianfeng',
    userPwd: 'Boco1234'
  }
]

// 获取所有菜单
Mock.mock($web.$conf.webServer + '/sso/getMenus', 'get', (options) => {
  return getData()
})

//获取三级菜单
/*Mock.mock($web.$conf.webServer + '/sso/login', 'get', (options) => {
  console.log(options)
  let jsonBody = $web.$util.toJson(options.body)
  let loginUser = undefined

  for (let user of users) {
    if (user.userName == jsonBody.userName && user.userPwd == jsonBody.userPwd) {
      loginUser = user
      break
    }
  }

  if (loginUser) {
    return {
      status: 0,
      message: 'ok',
      data: loginUser
    }
  }
  else {
    return {
      status: -1,
      message: '用户名或密码错误',
      data: undefined
    }
  }
})*/

//获取三级菜单
Mock.mock($web.$conf.webServer + '/sso/login', 'post', (options) => {
  return{
    status: 0,
    message: 'ok',
    data:
    {
      name: '郭建锋',
      userName: 'guojianfeng',
      userPwd: 'Boco1234'
    }
  }
})
