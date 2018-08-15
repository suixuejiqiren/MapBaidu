// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const getData = function () {
  let res = require('./menus.js')
/*  if($web.$conf.mock&&$web.$conf.mock.menus){
    return $web.$conf.mock.menus;
  }*/

  return res.default.data
}

// 获取所有菜单
Mock.mock($web.$conf.webServer + '/sso/userRights', 'get', (options) => {
  return {
    status: 0,
    message: 'ok',
    data: getData()
  }
})

//获取三级菜单
Mock.mock($web.$conf.webServer + '/sso/getMenusByParentId', 'post', (options ) => {
  console.log(options)
  let jsonBody = $web.$util.toJson(options.body)
  let response = []
  let menus = getData()
  console.log('getMenusByParentId');
  console.log(menus.data)
  for (let menuL1 of menus) {
    if (menuL1.id == jsonBody.parentId) {
      response = menuL1.subMenuList
      break
    }

    if (menuL1.menus == undefined || menuL1.menus.length == 0) {
      continue
    }

    for (let menuL2 of menuL1.menus) {
      if (menuL2.id == jsonBody.parentId) {
        response = menuL2.menus
        break
      }
    }




  }

  return {
    status: 0,
    message: 'ok',
    data: response
  }
})

Mock.mock(process.env.web_server + '/api/', (req, res) => {
  return {
    data: {
      "total":10,
      "tableData": [
        {
          "roleName": "2016-05-02",
          "roleType": "王小虎",
          "roleCreator": "上海市普陀区金沙江路 1518 弄",
          "roleDescribe": "家"

        },   {
          "roleName": "2016-05-02",
          "roleType": "王小虎",
          "roleCreator": "上海市普陀区金沙江路 1518 弄",
          "roleDescribe": "家"

        },  {
          "roleName": "2016-05-02",
          "roleType": "王小虎",
          "roleCreator": "上海市普陀区金沙江路 1518 弄",
          "roleDescribe": "家"

        },  {
          "roleName": "2016-05-02",
          "roleType": "王小虎",
          "roleCreator": "上海市普陀区金沙江路 1518 弄",
          "roleDescribe": "家"

        },  {
          "roleName": "2016-05-02",
          "roleType": "王小虎",
          "roleCreator": "上海市普陀区金沙江路 1518 弄",
          "roleDescribe": "家"

        },  {
          "roleName": "2016-05-02",
          "roleType": "王小虎",
          "roleCreator": "上海市普陀区金沙江路 1518 弄",
          "roleDescribe": "家"

        },  {
          "roleName": "2016-05-02",
          "roleType": "王小虎",
          "roleCreator": "上海市普陀区金沙江路 1518 弄",
          "roleDescribe": "家"

        },  {
          "roleName": "2016-05-02",
          "roleType": "王小虎",
          "roleCreator": "上海市普陀区金沙江路 1518 弄",
          "roleDescribe": "家"

        },  {
          "roleName": "2016-05-02",
          "roleType": "王小虎",
          "roleCreator": "上海市普陀区金沙江路 1518 弄",
          "roleDescribe": "家"

        },  {
          "roleName": "2016-05-02",
          "roleType": "王小虎",
          "roleCreator": "上海市普陀区金沙江路 1518 弄",
          "roleDescribe": "家"

        }]
    }
  }
})
Mock.mock(process.env.web_server + '/api/a', (req, res) => {
  return {
    data: {
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
    }
  }
});
