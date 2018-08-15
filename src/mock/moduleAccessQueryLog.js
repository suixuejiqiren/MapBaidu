const Mock = require('mockjs')

//模拟查询接口
Mock.mock($web.$conf.webServer + '/customerUseLog/countByModuleDate?start=2018-01-01&end=2018-05-09&pageNum=1&pageSize=20', 'get', (options) => {
  return{
    "status": 0,
    "message": "ok",
    "data": {
      "pageNum": 1,
      "pageSize": 30,
      "size": 4,
      "startRow": 1,
      "endRow": 4,
      "total": 4,
      "pages": 1,
      "list": [{
        "indexs": 1,
        "moduleId": "123456",
        "moduleName": "系统日志模块",
        "counts": 9
      }, {
        "indexs": 2,
        "moduleId": "123789",
        "moduleName": "系统日志模块2",
        "counts": 1
      }, {
        "indexs": 2,
        "moduleId": "789123",
        "moduleName": "系统日志模块1",
        "counts": 1
      }, {
        "indexs": 3,
        "moduleId": "111111",
        "moduleName": "231231",
        "counts": 0
      }],
      "prePage": 0,
      "nextPage": 0,
      "isFirstPage": true,
      "isLastPage": true,
      "hasPreviousPage": false,
      "hasNextPage": false,
      "navigatePages": 8,
      "navigatepageNums": [1],
      "navigateFirstPage": 1,
      "navigateLastPage": 1
    }
  }
})

//点击单行获取详细信息
Mock.mock($web.$conf.webServer + '/customerUseLog/selectLogInfoByModuleIdDate?start=2018-01-01&end=2018-05-09&pageNum=1&pageSize=20&moduleId=123456', 'get', (options) => {
  return{
    "status": 0,
    "message": "ok",
    "data": {
      "pageNum": 1,
      "pageSize": 30,
      "size": 4,
      "startRow": 1,
      "endRow": 4,
      "total": 4,
      "pages": 1,
      "list": [{
        "indexs": 1,
        "moduleId": "123456",
        "moduleName": "系统日志模块",
        "counts": 9
      }, {
        "indexs": 2,
        "moduleId": "123789",
        "moduleName": "系统日志模块2",
        "counts": 1
      }, {
        "indexs": 2,
        "moduleId": "789123",
        "moduleName": "系统日志模块1",
        "counts": 1
      }, {
        "indexs": 3,
        "moduleId": "111111",
        "moduleName": "231231",
        "counts": 0
      }],
      "prePage": 0,
      "nextPage": 0,
      "isFirstPage": true,
      "isLastPage": true,
      "hasPreviousPage": false,
      "hasNextPage": false,
      "navigatePages": 8,
      "navigatepageNums": [1],
      "navigateFirstPage": 1,
      "navigateLastPage": 1
    }
  }
})



