export default {
  'data': [
    {
      'id': '1',
      'order': 80,
      'text': '首页',
      'imageName': '/static/images/menuIcons/dh_gk.png',
      'url': 'http://boco.com.cn',
      'moduleId': 888888
      //"menus":[]
    },
    {
      'id': '2',
      'order': 80,
      'text': '数据检索',
      'imageName': '/static/images/menuIcons/dh_sjjs1.png',
      'url': '',
      'moduleId': 888888,
      'menus': [
        {
          'id': '2-1',
          'order': 80,
          'text': '数据检索',
          'imageName': '/static/images/menuIcons/dh_sjjs2.png',
          'url': '/ds/index',
          'moduleId': 888888,
          'menus': []
        },
        {
          'id': '2-2',
          'order': 80,
          'text': '自定义查询',
          'imageName': '/static/images/menuIcons/dh_sjjs3.png',
          'url': '/ds/query',
          'moduleId': 888888,
          'menus': []
        },
        {
          'id': '2-3',
          'order': 80,
          'text': '指标修改',
          'imageName': '/static/images/menuIcons/dh_sjjs4.png',
          'url': '/ds/kpiedit',
          'moduleId': 888888,
          'menus': []
        },
        {
          'id': '2-4',
          'order': 80,
          'text': '互操作参数',
          'imageName': '/static/images/menuIcons/dh_sjjs4.png',
          'url': 'http://element-cn.eleme.io/#/zh-CN/component/form',
          'moduleId': 888888,
          'menus': [
            {
              'id': '2-4-1',
              'order': 80,
              'text': 'CSFB核查',
              'imageName': '/static/images/menuIcons/l3_3_jd2.png',
              'url': 'http://element-cn.eleme.io/#/zh-CN/component/form',
              'moduleId': 888888,
              'menus': []
            },
            {
              'id': '2-4-2',
              'order': 80,
              'text': '3G漏配4G邻区',
              'imageName': '/static/images/menuIcons/l3_3Glp4Glq.png',
              'url': 'http://element-cn.eleme.io/#/zh-CN/component/form',
              'moduleId': 888888,
              'menus': []
            },
            {
              'id': '2-4-3',
              'order': 80,
              'text': '桥接返回核查',
              'imageName': '/static/images/menuIcons/l3_3_jd1.png',
              'url': 'http://element-cn.eleme.io/#/zh-CN/component/form',
              'moduleId': 888888,
              'menus': []
            },
            {
              'id': '2-4-4',
              'order': 80,
              'text': 'LTE PCI复用核查',
              'imageName': '/static/images/menuIcons/l3_3_yh1.png',
              'url': 'http://element-cn.eleme.io/#/zh-CN/component/form',
              'moduleId': 888888,
              'menus': []
            },
            {
              'id': '2-4-5',
              'order': 80,
              'text': '4G漏配3G邻区',
              'imageName': '/static/images/menuIcons/l3_4Glp3Glq.png',
              'url': 'http://element-cn.eleme.io/#/zh-CN/component/form',
              'moduleId': 888888,
              'menus': []
            },
            {
              'id': '2-4-6',
              'order': 80,
              'text': '3G漏配4G邻区',
              'imageName': '/static/images/menuIcons/l3_3_gt.png',
              'url': 'http://element-cn.eleme.io/#/zh-CN/component/form',
              'moduleId': 888888,
              'menus': []
            }
          ]
        }
      ]
    },
    {
      'id': '3',
      'order': 80,
      'text': '集中参数',
      'imageName': '/static/images/menuIcons/dh_gk.png',
      'url': '/ss/d',
      'moduleId': 888888,
      'menus': []
    },
    {
      'id': '4',
      'order': 80,
      'text': '系统管理',
      'imageName': '/static/images/menuIcons/dh_xtgl.png',
      'url': '',
      'moduleId': 888888,
      'menus': [
        {
          'id': '4-5',
          'order': 80,
          'text': '当前用户',
          'imageName': '/static/images/menuIcons/dh_gyxt.png',
          'url': '/security/currentUserManage',
          'moduleId': 888888,
          'menus': []
        },
        {
          'id': '4-1',
          'order': 80,
          'text': '作业调度',
          'imageName': '/static/images/menuIcons/dh_gyxt.png',
          'url': '',
          'moduleId': 888888,
          'menus': []
        },
        {
          'id': '4-2',
          'order': 80,
          'text': '日志管理',
          'imageName': '/static/images/menuIcons/dh_gyxt.png',
          'url': '',
          'moduleId': 888888,
          'menus': [
            {
              'id': '4-2-2',
              'order': 80,
              'text': '用户访问统计',
              'imageName': '/static/images/menuIcons/l3_3_dt.png',
              'url': '/log/userAccessStatistics',
              'moduleId': 888888,
              'menus': []
            },
            {
              'id': '4-2-3',
              'order': 80,
              'text': '模块访问查询',
              'imageName': '/static/images/menuIcons/l3_3_dt.png',
              'url': '/log/moduleAccessQueryLog',
              'moduleId': 888888,
              'menus': []
            },
            {
              'id': '4-2-4',
              'order': 80,
              'text': '异常日志查询',
              'imageName': '/static/images/menuIcons/l3_3_dt.png',
              'url': '/log/exceptionLogQuery',
              'moduleId': 888888,
              'menus': []
            },
          ]
        },
        {
          'id': '4-3',
          'order': 80,
          'text': '配置管理',
          'imageName': '/static/images/menuIcons/dh_gyxt.png',
          'url': '/config/configManage',
          'moduleId': 888888,
          'menus': []
        },
        {
          'id': '4-4',
          'order': 80,
          'text': '权限管理',
          'imageName': '/static/images/menuIcons/dh_gyxt.png',
          'url': '',
          'moduleId': 888888,
          'menus': [
            {
              'id': '4-4',
              'order': 80,
              'text': '用户管理',
              'imageName': '/static/images/menuIcons/l3_3_dt.png',
              'url': '/security/userManage',
              'moduleId': 888888,
              'menus': []
            },
            {
              'id': '4-7',
              'order': 80,
              'text': '资源管理',
              'imageName': '/static/images/menuIcons/l3_3_dt.png',
              'url': '/security/resourcesManage',
              'moduleId': 888888,
              'menus': []
            },
            {
              'id': '5',
              'order': 80,
              'text': '角色管理',
              'imageName': '/static/images/menuIcons/l3_3_dt.png',
              'url': '/security/role',
              'moduleId': 888888,
              'menus': []
            }]
        }
      ]
    },

    {
      'id': '7',
      'order': 80,
      'text': 'GIS',
      'imageName': '/static/images/menuIcons/dh_gk.png',
      'url': '/GIS',
      'moduleId': 888888,
      'menus': []
    },

  ]
}
