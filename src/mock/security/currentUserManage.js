const Mock = require('mockjs')

//这里模拟需要调试一下
Mock.mock($web.$conf.webServer + '/currentUserManage/getCurrentUsers?userId=123456', 'get', (options) => {
  return{
    "message":"ok",
    "data":{
      "data": {
        "userName": "liyadong",
        "displayName": "李亚东",
        "userPhone": "13721043272",
        "userMail": "13721043272@139.com"
      }
    }
  }
})
