const Mock = require('mockjs')

//初始化界面信息
Mock.mock($web.$conf.webServer + '/ModuleManager/getModuleByName?name=&pageIndex=1&pageSize=20', 'get', (options) => {
  return{
    "total": 4,
    "record": [
      {
        "resourceList": [
          {
            "parentMenuId": 0,
            "resourceValue": "阿狸",
            "imageSource": "sdddd",
            "resourceTitle": "星星",
            "resourceId": 1,
            "resourceName": "资源1",
            "moduleId": 111111,
            "isAvailable": 1,
            "orderNo": 1
          }
        ],
        "moduleId": 111111,
        "moduleName": "test00000",
        "moduleDescription": "ceshi"
      },
      {
        "resourceList": [],
        "moduleId": 123456,
        "moduleName": "系统日志模块"
      },
      {
        "resourceList": [],
        "moduleId": 789123,
        "moduleName": "系统日志模块1"
      },
      {
        "resourceList": [],
        "moduleId": 123789,
        "moduleName": "系统日志模块2"
      }
    ]
  }
})

//删除功能
Mock.mock($web.$conf.webServer + '/ModuleManager/deleteModule?moduleId=111111', 'get', (options) => {
  return{

  }
})
