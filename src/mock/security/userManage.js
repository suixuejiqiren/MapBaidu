const Mock = require('mockjs')

//模拟获取所有用户
Mock.mock($web.$conf.webServer + '/UserManager/getAllUsers?pageIndex=1&pageSize=20&name=', 'get', (options) => {
  return{
    "status": 0,
    "message": "ok",
    "data": {
      "total": 444,
      "record": [
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "李亚东",
          "islocked": 0,
          "regionId": -1,
          "departmentName": "省公司网络部",
          "userId": "7b9e352a-048f-4a0e-9809-d565a9761251",
          "userName": "liyadong",
          "departmentId": "52097e7d-4d5b-45a7-a7bd-f1df607715fe",
          "userMail": "13721043272@139.com",
          "userPhone": "13721043272",
          "createTime": "May 15, 2014 4:31:10 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Sep 19, 2017 8:32:15 PM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "陈育良",
          "islocked": 1,
          "regionId": 0,
          "departmentName": "安庆运行维护部",
          "userId": "9d871a03-abe9-44e2-9372-cc9f3eabda70",
          "userName": "chenyuliang",
          "departmentId": "682cc6e0-9d90-499f-8153-f1ab0e46c125",
          "userMail": "chenyuliang@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 3:16:48 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Jan 4, 2017 7:30:39 PM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "冯明明",
          "islocked": 0,
          "regionId": -1885611012,
          "departmentName": "蚌埠运行维护部",
          "userId": "747dec95-b124-4a36-b740-f7aac623b289",
          "userName": "fengmingming",
          "departmentId": "e58e26b3-9032-4ce3-ab3f-376b14ef22ba",
          "userMail": "fengmingming@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 3:19:11 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Dec 3, 2014 3:30:34 PM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "宋健",
          "islocked": 0,
          "regionId": -1885611012,
          "departmentName": "蚌埠运行维护部",
          "userId": "a1d3fffc-af99-489b-b6e7-b03b8accc493",
          "userName": "songjian",
          "departmentId": "e58e26b3-9032-4ce3-ab3f-376b14ef22ba",
          "userMail": "songjianbb@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 3:21:22 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Mar 8, 2017 10:09:09 PM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "李月奎",
          "islocked": 0,
          "regionId": -249357804,
          "departmentName": "亳州运行维护部",
          "userId": "aa29e501-417d-4a10-a866-aab71818ba15",
          "userName": "liyuekui",
          "departmentId": "960dd3fd-ce8c-49a0-8200-5702e6ffa48e",
          "userMail": "liyuekui@ahmobile.com",
          "userPhone": "13856819427",
          "createTime": "May 20, 2014 3:23:01 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Jan 1, 0001 12:00:00 AM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "李良",
          "islocked": 0,
          "regionId": -249357804,
          "departmentName": "亳州运行维护部",
          "userId": "66f6f3c5-47ae-4f3b-a42a-80d5ca7187a0",
          "userName": "liliang",
          "departmentId": "960dd3fd-ce8c-49a0-8200-5702e6ffa48e",
          "userMail": "liliangbz@ahmobile.com",
          "userPhone": "15856762943",
          "createTime": "May 20, 2014 3:24:47 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Jan 1, 0001 12:00:00 AM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "高松",
          "islocked": 0,
          "regionId": 1262043503,
          "departmentName": "池州运行维护部",
          "userId": "a8470cfd-0055-4c1b-a3ef-b3112c4e4d18",
          "userName": "gaosong",
          "departmentId": "59cca490-a0fd-4a10-a84d-c75b2210e927",
          "userMail": "gaosongciz@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 3:26:05 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Oct 10, 2017 11:07:55 AM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "huliangyong",
          "islocked": 0,
          "regionId": -1,
          "departmentName": "省公司网络部",
          "userId": "21be1fa5-a993-4a50-a49c-e20ddf0dd10b",
          "userName": "huliangyong",
          "departmentId": "52097e7d-4d5b-45a7-a7bd-f1df607715fe",
          "userMail": "huliangyong@ah.chinamobile.com",
          "userPhone": "13966771938",
          "createTime": "Nov 11, 2014 11:38:34 AM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Jan 9, 2015 8:46:14 PM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "郑彩明",
          "islocked": 1,
          "regionId": 0,
          "departmentName": "池州运行维护部",
          "userId": "5f468e27-8f96-43d6-9ce4-8cac4e9cab51",
          "userName": "zhengcaiming",
          "departmentId": "59cca490-a0fd-4a10-a84d-c75b2210e927",
          "userMail": "zhengcaiming@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 3:27:26 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Jan 1, 0001 12:00:00 AM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "盛启东",
          "islocked": 0,
          "regionId": -1167913982,
          "departmentName": "滁州运行维护部",
          "userId": "d1e7a421-1f89-425d-8726-aaa93d3bda89",
          "userName": "shengqidong",
          "departmentId": "10d2f34a-ced9-4ef4-aa2f-75bf35c4a010",
          "userMail": "shengqidong@ahmobile.com",
          "userPhone": "18855009987",
          "createTime": "May 20, 2014 3:46:57 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Mar 9, 2017 10:53:52 AM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "王刚",
          "islocked": 0,
          "regionId": 0,
          "departmentName": "滁州运行维护部",
          "userId": "cd4b1f63-21e0-4f19-ac8f-36ee407e012c",
          "userName": "wanggang",
          "departmentId": "10d2f34a-ced9-4ef4-aa2f-75bf35c4a010",
          "userMail": "wanggangcuz@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 3:48:11 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Jan 1, 0001 12:00:00 AM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "安珂",
          "islocked": 0,
          "regionId": 1439486031,
          "departmentName": "阜阳运行维护部",
          "userId": "add254b1-853c-4a60-a92d-068b2d156c99",
          "userName": "anke",
          "departmentId": "1574b6aa-1680-4a41-bd57-8c82c084f221",
          "userMail": "anke@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 3:49:42 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Jul 6, 2017 2:13:21 PM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "范晓慧",
          "islocked": 0,
          "regionId": 1439486031,
          "departmentName": "阜阳运行维护部",
          "userId": "80d68e15-9973-470e-8268-679bc670ffed",
          "userName": "fanxiaohui",
          "departmentId": "1574b6aa-1680-4a41-bd57-8c82c084f221",
          "userMail": "fanxiaohui@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 3:51:08 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Mar 8, 2017 10:09:09 PM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "徐元庆",
          "islocked": 1,
          "regionId": -518079985,
          "departmentName": "合肥运行维护部",
          "userId": "27afd69b-935c-4903-afcd-36c8be33310b",
          "userName": "xuyuanqing",
          "departmentId": "af507ff4-b17c-4af4-a775-6d887dd91a64",
          "userMail": "xuyuanqinghf@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 3:52:33 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Jan 1, 0001 12:00:00 AM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "王战礼",
          "islocked": 1,
          "regionId": 0,
          "departmentName": "淮北运行维护部",
          "userId": "8664d0c5-42e4-4591-ab62-1efae2268a5f",
          "userName": "wangzhanli",
          "departmentId": "4639ef7b-9a2a-4058-9789-cd66d6041d96",
          "userMail": "wangzhanli@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 3:55:38 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Mar 8, 2017 9:46:34 PM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "唐贺嘉",
          "islocked": 0,
          "regionId": -620661267,
          "departmentName": "淮南运行维护部",
          "userId": "1c5050d6-9249-4e17-91ce-37546235e8aa",
          "userName": "tanghejia",
          "departmentId": "9ec16e06-bd7b-4313-908a-f196c7015026",
          "userMail": "tanghejia@ahmobile.com",
          "userPhone": "18755468877",
          "createTime": "May 20, 2014 3:56:50 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Jan 1, 0001 12:00:00 AM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "洪志伟",
          "islocked": 0,
          "regionId": -518079985,
          "departmentName": "黄山运行维护部",
          "userId": "ab27285d-4a5c-4df3-b3ea-1b28886815f5",
          "userName": "hongzhiwei",
          "departmentId": "eb810008-8f1f-4002-9c6b-e6625d3d2f11",
          "userMail": "hongzhiwei@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 3:59:36 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Apr 26, 2017 8:47:46 PM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "胡健",
          "islocked": 0,
          "regionId": -518079985,
          "departmentName": "黄山运行维护部",
          "userId": "e4a13d6e-a627-4cf7-a6ef-3bb9609baca3",
          "userName": "hujian",
          "departmentId": "eb810008-8f1f-4002-9c6b-e6625d3d2f11",
          "userMail": "hujian1@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 4:05:58 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "May 8, 2017 7:55:21 PM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "梁潇",
          "islocked": 0,
          "regionId": 155838833,
          "departmentName": "六安运行维护部",
          "userId": "26b5c133-b18c-474c-841d-6b6f2d56e916",
          "userName": "liangxiao",
          "departmentId": "4bb478a2-b036-4e93-8885-d676a0e7b7bf",
          "userMail": "liangxiao@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 4:07:09 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Mar 10, 2017 8:55:22 AM",
          "failedLoginCount": 0
        },
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "褚乾超",
          "islocked": 0,
          "regionId": 155838833,
          "departmentName": "六安运行维护部",
          "userId": "a58a3022-dc25-482d-bf77-bdfb23826dd1",
          "userName": "chuqianchao",
          "departmentId": "4bb478a2-b036-4e93-8885-d676a0e7b7bf",
          "userMail": "chuqianchao@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 4:08:14 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Nov 3, 2016 6:21:35 PM",
          "failedLoginCount": 0
        }
      ]
    }
  }
})

//模拟查询某个用户（模拟只能查询chenyuliang）
Mock.mock($web.$conf.webServer + '/UserManager/getAllUsers?pageIndex=1&pageSize=20&name=chenyuliang', 'get', (options) => {
  return{
    "status": 0,
    "message": "ok",
    "data": {
      "total": 1,
      "record": [
        {
          "password": "STAsdfzvEHiiCS1swM7iepNXySU=",
          "displayName": "陈育良",
          "islocked": 1,
          "regionId": 0,
          "departmentName": "安庆运行维护部",
          "userId": "9d871a03-abe9-44e2-9372-cc9f3eabda70",
          "userName": "chenyuliang",
          "departmentId": "682cc6e0-9d90-499f-8153-f1ab0e46c125",
          "userMail": "chenyuliang@ahmobile.com",
          "userPhone": "11111111111",
          "createTime": "May 20, 2014 3:16:48 PM",
          "passwordCreateTime": "Dec 25, 2014 3:27:04 PM",
          "lastLoginTime": "Jan 4, 2017 7:30:39 PM",
          "failedLoginCount": 0
        }
      ]
    }
  }
})

//模拟获取所有地市
Mock.mock($web.$conf.webServer + '/UserManager/getAllRegion', 'get', (options) => {
  return{
    "status": 0,
    "message": "ok",
    "data": [
      {
        "id": "155838833",
        "regionName": "六安市"
      },
      {
        "id": "-620661267",
        "regionName": "淮南市"
      },
      {
        "id": "-1150999981",
        "regionName": "宿州市"
      },
      {
        "id": "1657936635",
        "regionName": "铜陵市"
      },
      {
        "id": "-1069156405",
        "regionName": "芜湖市"
      },
      {
        "id": "-1721641732",
        "regionName": "宣城市"
      },
      {
        "id": "-249357804",
        "regionName": "亳州市"
      },
      {
        "id": "372778969",
        "regionName": "安庆"
      },
      {
        "id": "-1885611012",
        "regionName": "蚌埠市"
      },
      {
        "id": "1262043503",
        "regionName": "池州市"
      },
      {
        "id": "-1167913982",
        "regionName": "滁州市"
      },
      {
        "id": "1439486031",
        "regionName": "阜阳市"
      },
      {
        "id": "-518079985",
        "regionName": "合肥市"
      },
      {
        "id": "-644915175",
        "regionName": "淮北市"
      },
      {
        "id": "-2122726025",
        "regionName": "马鞍山市"
      }
    ]
  }
})

//模拟所有所属部门数据
Mock.mock($web.$conf.webServer + '/UserManager/getAllDepartment', 'get', (options) => {
  return{
    "status": 0,
    "message": "ok",
    "data": [
      {
        "ID": "52097e7d-4d5b-45a7-a7bd-f1df607715fe",
        "departmentName": "省公司网络部"
      },
      {
        "ID": "eb810008-8f1f-4002-9c6b-e6625d3d2f11",
        "departmentName": "黄山运行维护部"
      },
      {
        "ID": "af507ff4-b17c-4af4-a775-6d887dd91a64",
        "departmentName": "合肥运行维护部"
      },
      {
        "ID": "4639ef7b-9a2a-4058-9789-cd66d6041d96",
        "departmentName": "淮北运行维护部"
      },
      {
        "ID": "903f090e-44da-48c9-b1be-e642552b7d0d",
        "departmentName": "芜湖运行维护部"
      },
      {
        "ID": "682cc6e0-9d90-499f-8153-f1ab0e46c125",
        "departmentName": "安庆运行维护部"
      },
      {
        "ID": "9ec16e06-bd7b-4313-908a-f196c7015026",
        "departmentName": "淮南运行维护部"
      },
      {
        "ID": "4bb478a2-b036-4e93-8885-d676a0e7b7bf",
        "departmentName": "六安运行维护部"
      },
      {
        "ID": "960dd3fd-ce8c-49a0-8200-5702e6ffa48e",
        "departmentName": "亳州运行维护部"
      },
      {
        "ID": "3b6baf69-e908-4924-8c55-e9ccda1624c6",
        "departmentName": "铜陵运行维护部"
      },
      {
        "ID": "caf825a0-eb1b-455e-b6a3-d52728d9473a",
        "departmentName": "宣城运行维护部"
      },
      {
        "ID": "b78ba427-7496-4e1a-a2fd-a155c38ba648",
        "departmentName": "马鞍山运行维护部"
      },
      {
        "ID": "59cca490-a0fd-4a10-a84d-c75b2210e927",
        "departmentName": "池州运行维护部"
      },
      {
        "ID": "1574b6aa-1680-4a41-bd57-8c82c084f221",
        "departmentName": "阜阳运行维护部"
      },
      {
        "ID": "f60d621d-3007-4e55-a64d-8883fb1170ef",
        "departmentName": "宿州运行维护部"
      },
      {
        "ID": "e58e26b3-9032-4ce3-ab3f-376b14ef22ba",
        "departmentName": "蚌埠运行维护部"
      },
      {
        "ID": "10d2f34a-ced9-4ef4-aa2f-75bf35c4a010",
        "departmentName": "滁州运行维护部"
      },
      {
        "ID": "80e79c67-c43e-4a11-9cbf-ae5c21332669",
        "departmentName": "网络部领导"
      },
      {
        "ID": "bc9e91ef-f336-4453-a28f-aaf29420e4f1",
        "departmentName": "UnitTest"
      }
    ]
  }
})

//模拟所有所属角色数据
Mock.mock($web.$conf.webServer + '/UserManager/getAllRoles', 'get', (options) => {
  return{
    "status": 0,
    "message": "ok",
    "data": [
      {
        "roleType": "REGADMIN",
        "roleId": "5bad6180-695e-40b5-bcc3-347a8eb9bf48",
        "roleName": "合肥角色",
        "regionId": -518079985
      },
      {
        "roleType": "REGADMIN",
        "roleId": "fc26d2af-b2d0-421f-8f17-4f594246d250",
        "roleName": "池州角色",
        "regionId": 1262043503
      },
      {
        "roleType": "PROUSER",
        "roleId": "77e32ea2-a1cc-4f1c-b5c4-cf10ab624d57",
        "roleName": "新建角色",
        "regionId": -1
      },
      {
        "roleType": "PROADMIN",
        "roleDescription": "新加角色",
        "roleId": "965632fb-40f7-4ff3-b361-8b76bbcdda2d",
        "roleName": "0213",
        "regionId": -1
      },
      {
        "roleType": "REGADMIN",
        "roleId": "56605631-36ae-45d4-a5f5-4d2abadd477e",
        "roleName": "安庆角色",
        "regionId": 372778969
      },
      {
        "roleType": "REGADMIN",
        "roleId": "7143c2fb-ed77-4679-8310-9154be84ac12",
        "roleName": "亳州角色",
        "regionId": -249357804
      },
      {
        "roleType": "REGADMIN",
        "roleId": "7c4d4629-14b7-4be6-b3f8-6dc243a5589e",
        "roleName": "阜阳角色",
        "regionId": 1439486031
      },
      {
        "roleType": "REGADMIN",
        "roleId": "a0cc8a70-2e2b-40cd-a369-c3dc46902d51",
        "roleName": "anqing",
        "regionId": 372778969
      },
      {
        "roleType": "REGADMIN",
        "roleId": "3fe22e6c-85e7-464b-bcf8-83ba29aec839",
        "roleName": "tongling",
        "regionId": 1657936635
      },
      {
        "roleType": "REGADMIN",
        "roleId": "e0e8563f-4de8-4945-a207-35ffc96106d3",
        "roleName": "六安网络结构优化",
        "regionId": 155838833
      },
      {
        "roleType": "PROADMIN",
        "roleId": "5af0b3e1-6ba2-434f-9e10-6a9323f38c52",
        "roleName": "高级管理员",
        "regionId": -1
      },
      {
        "roleType": "REGADMIN",
        "roleId": "098e147c-3f95-43fe-b1f9-89958de6a4fc",
        "roleName": "fy_网络支撑",
        "regionId": 1439486031
      },
      {
        "roleType": "REGADMIN",
        "roleId": "285f8d0a-b792-4126-8ba2-f8fefde5d69b",
        "roleName": "huaibei",
        "regionId": -644915175
      },
      {
        "roleType": "PROUSER",
        "roleId": "cea4405f-fca1-4f0f-82d8-66e1cdcfd672",
        "roleName": "省级普通用户",
        "regionId": -1
      },
      {
        "roleType": "REGADMIN",
        "roleId": "7f429bff-2046-48c6-9c1f-14ba19e642bf",
        "roleName": "huangshan",
        "regionId": -49503583
      },
      {
        "roleType": "REGADMIN",
        "roleId": "e3af2afa-652e-4587-9da7-54c0b8d1a971",
        "roleName": "liuan",
        "regionId": 155838833
      },
      {
        "roleType": "REGADMIN",
        "roleId": "1fdf6235-a4e2-496f-a91e-0f1993cff464",
        "roleName": "maanshan",
        "regionId": -2122726025
      },
      {
        "roleType": "REGADMIN",
        "roleId": "adf7c440-c70e-49f9-a4c9-d5718a90a149",
        "roleName": "tongling1",
        "regionId": 1657936635
      },
      {
        "roleType": "REGADMIN",
        "roleId": "52bcc123-fb64-4eb1-a353-d8249feff7f3",
        "roleName": "wuhu",
        "regionId": -1069156405
      },
      {
        "roleType": "REGADMIN",
        "roleId": "a0b5daf7-73cb-4816-b456-71f90ce597eb",
        "roleName": "xuancheng",
        "regionId": -1721641732
      },
      {
        "roleType": "REGUSER",
        "roleId": "e943523e-d73d-4e7f-a0df-ad23f6198a0d",
        "roleName": "bozhou",
        "regionId": -249357804
      },
      {
        "roleType": "REGADMIN",
        "roleId": "21d0eb36-9396-4e81-8092-372c4d357f20",
        "roleName": "anqing1",
        "regionId": 372778969
      },
      {
        "roleType": "REGADMIN",
        "roleId": "2eaff173-afa7-497a-a241-2b65f36e89a9",
        "roleName": "bengbu",
        "regionId": -1885611012
      },
      {
        "roleType": "REGADMIN",
        "roleId": "18afa9e8-637b-434a-8455-d95ed4750514",
        "roleName": "cizhou",
        "regionId": 1262043503
      },
      {
        "roleType": "PROADMIN",
        "roleId": "b12635db-074f-4245-adf4-232c9ef40f1a",
        "roleName": "设计院用",
        "regionId": -1
      },
      {
        "roleType": "REGADMIN",
        "roleId": "535930fe-79e1-47e9-b424-ab582e0eb4cd",
        "roleName": "chuchou",
        "regionId": -1167913982
      },
      {
        "roleType": "REGADMIN",
        "roleId": "4f439325-5eed-41a0-a228-2b06a4288a2d",
        "roleName": "fuyang",
        "regionId": 1439486031
      },
      {
        "roleType": "REGADMIN",
        "roleId": "8a59fc6d-02d4-48d5-912b-eae4d92d1f3f",
        "roleName": "huainan",
        "regionId": -620661267
      },
      {
        "roleType": "SYSTEM",
        "roleDescription": "hehe",
        "roleId": "1cffbeaa-dda9-4619-b892-4f3241355187",
        "roleName": "超级管理员",
        "regionId": -1
      },
      {
        "roleType": "PROUSER",
        "roleId": "b75b314c-db4f-4b33-bd40-65475933ffd5",
        "roleName": "任务督办",
        "regionId": -1
      },
      {
        "roleType": "REGUSER",
        "roleDescription": "ddddvvv",
        "roleId": "147aac99-9caa-4da2-970b-775d3eeec2b4",
        "roleName": "演示角色",
        "regionId": -1
      },
      {
        "roleType": "PROUSER",
        "roleId": "cd8e76c9-06b6-45da-be92-a395ac4a1c4d",
        "roleName": "演示角色-001",
        "regionId": -1
      },
      {
        "roleType": "PROUSER",
        "roleId": "788bd828-eb02-4641-aed0-e938846d6ae8",
        "roleName": "演示角色2",
        "regionId": -1
      },
      {
        "roleType": "PROADMIN",
        "roleId": "9b5ebec5-ecd8-48c5-ab4e-36ba5b7ea6a7",
        "roleName": "省级管理员2",
        "regionId": -1
      },
      {
        "roleType": "REGUSER",
        "roleId": "67fc803f-dd21-49d6-a0d1-5f73e8249438",
        "roleName": "ff",
        "regionId": -49503583
      },
      {
        "roleType": "PROUSER",
        "roleDescription": "基础分析组",
        "roleId": "bcef0886-0bff-4807-b75e-4cb62d6d33bb",
        "roleName": "性能测试",
        "regionId": -1
      },
      {
        "roleType": "PROADMIN",
        "roleId": "aa732a8d-37bc-4d46-814f-65830db91318",
        "roleName": "性能测试-基础分析组",
        "regionId": -1
      },
      {
        "roleType": "PROUSER",
        "roleId": "2d8cb13e-8196-4a78-904b-e5d439cb7885",
        "roleName": "性能测试-片区分析T1",
        "regionId": -1
      },
      {
        "roleType": "REGUSER",
        "roleId": "cecbd880-cf22-45eb-89fc-fffa57366b93",
        "roleName": "性能测试-片区分析T2",
        "regionId": -1
      },
      {
        "roleType": "REGUSER",
        "roleId": "e6a68e05-b19e-42b9-a6b1-ad44d4824f1e",
        "roleName": "性能测试-地市处理",
        "regionId": -518079985
      },
      {
        "roleType": "REGUSER",
        "roleId": "d50d4617-93ad-4187-a9cc-2fadacd7a33f",
        "roleName": "性能测试-申述审核、挂起处理",
        "regionId": -1
      },
      {
        "roleType": "PROADMIN",
        "roleDescription": "角色描述RD20171206172953",
        "roleId": "RD20171206172953",
        "roleName": "RD20171206172953",
        "regionId": -1
      },
      {
        "roleType": "PROUSER",
        "roleDescription": "测试重新提交",
        "roleId": "50c01b38-5dc3-419f-a025-e7ab9bcb0448",
        "roleName": "测试重新提交",
        "regionId": -1
      },
      {
        "roleType": "PROADMIN",
        "roleDescription": "测试",
        "roleId": "dada8fd5-14b6-498c-850c-954d09174573",
        "roleName": "优化服务管理系统",
        "regionId": -1
      },
      {
        "roleType": "PROADMIN",
        "roleDescription": "角色描述RD20171206172732",
        "roleId": "RD20171206172732",
        "roleName": "RD20171206172807",
        "regionId": -1
      },
      {
        "roleType": "PROADMIN",
        "roleDescription": "MDT测试角色",
        "roleId": "67fc011e-1489-4ecd-88e2-f797ef70a67c",
        "roleName": "MDT",
        "regionId": -1
      },
      {
        "roleType": "PROADMIN",
        "roleId": "17924f09-b400-45b2-a480-f157301bea4a",
        "roleName": "admin",
        "regionId": -1
      },
      {
        "roleType": "REGUSER",
        "roleDescription": "p测试",
        "roleId": "8b25465e-f2d7-4f61-ac3f-0e490720581a",
        "roleName": "p测试",
        "regionId": -1
      },
      {
        "roleType": "REGADMIN",
        "roleDescription": "q测试",
        "roleId": "4aadb396-fdcb-482a-8fbd-a51fa2c3c74e",
        "roleName": "q测试",
        "regionId": -49503583
      },
      {
        "roleType": "PROUSER",
        "roleDescription": "r测试",
        "roleId": "f9ca4add-eb48-4af3-b7fd-27cc3a92f850",
        "roleName": "r测试",
        "regionId": -2122726025
      },
      {
        "roleType": "PROADMIN",
        "roleId": "fbc3066c-983f-4d33-bfc1-b37b9e0e77dd",
        "roleName": "天津测试",
        "regionId": -1
      },
      {
        "roleType": "SYSTEM",
        "roleDescription": "集中维护管理",
        "roleId": "d5f63565-1db1-481b-970f-3eb566017b4f",
        "roleName": "集中维护",
        "regionId": -1
      },
      {
        "roleType": "REGUSER",
        "roleDescription": "江苏预规划菜单",
        "roleId": "0457339d-b878-4cac-b244-a682653d0c25",
        "roleName": "江苏预规划测试",
        "regionId": -518079985
      },
      {
        "roleType": "REGUSER",
        "roleId": "afa97253-36ba-4fba-bffc-dae9e377ce3e",
        "roleName": "地市用户",
        "regionId": -518079985
      },
      {
        "roleType": "PROUSER",
        "roleDescription": "测试",
        "roleId": "ac89f71a-5c51-472f-b381-2374864c149e",
        "roleName": "测试-仅集中分析",
        "regionId": -1
      },
      {
        "roleType": "REGUSER",
        "roleDescription": "谭旭角色",
        "roleId": "1edb7813-66dd-49a4-9187-00f368fa247e",
        "roleName": "谭旭角色",
        "regionId": -1
      },
      {
        "roleType": "SYSTEM",
        "roleId": "7464ef95-0412-44c9-8313-713590177b01",
        "roleName": "集中投诉",
        "regionId": -1
      },
      {
        "roleType": "PROUSER",
        "roleId": "d519d370-3e5e-46c6-b31e-61aa1000dac1",
        "roleName": "test集中参数",
        "regionId": -1
      },
      {
        "roleType": "PROADMIN",
        "roleDescription": "海南数据中心测试角色",
        "roleId": "f08629bb-b485-49d2-8aeb-4be5b43c5196",
        "roleName": "测试海南数据中心",
        "regionId": -1
      },
      {
        "roleType": "PROADMIN",
        "roleId": "121d5b21-38df-4980-8dfe-bf6e76bb77ba",
        "roleName": "test1"
      }
    ]
  }
})

//编辑功能（模拟只能编辑陈玉良）
Mock.mock($web.$conf.webServer + '/UserManager/getUserById?userId=9d871a03-abe9-44e2-9372-cc9f3eabda70', 'get', (options) => {
  return{
    "status": 0,
    "message": "ok",
    "data": {
      "roles": [
        {
          "roleType": "REGADMIN",
          "createUserId": "63c26d7f-6e39-40b0-9526-94c58f2d77ca",
          "roleId": "56605631-36ae-45d4-a5f5-4d2abadd477e",
          "roleName": "安庆角色"
        }
      ],
      "displayName": "陈育良",
      "departmentName": "安庆运行维护部",
      "userId": "9d871a03-abe9-44e2-9372-cc9f3eabda70",
      "userName": "chenyuliang",
      "userMail": "chenyuliang@ahmobile.com",
      "userPhone": "11111111111",
      "createTime": "May 20, 2014 3:16:48 PM",
      "lastLoginTime": "Jan 4, 2017 7:30:39 PM"
    }
  }
})

//锁定功能（模拟只能锁定陈玉良）
Mock.mock($web.$conf.webServer + '/UserManager/lockUser?userId=9d871a03-abe9-44e2-9372-cc9f3eabda70', 'get', (options) => {
  return{
  }
})

//解锁功能（模拟只能解锁冯明明）
Mock.mock($web.$conf.webServer + '/UserManager/unlockUser?userId=9d871a03-abe9-44e2-9372-cc9f3eabda70', 'get', (options) => {
  return{
  }
})

//重置密码功能（模拟只能重置密码陈玉良）
Mock.mock($web.$conf.webServer + '/UserManager/resetPwd?userId=9d871a03-abe9-44e2-9372-cc9f3eabda70', 'get', (options) => {
  return{
  }
})

//删除这条用户功能（模拟只能删除陈玉良）(缺少当前用户Id)
Mock.mock($web.$conf.webServer + '/UserManager/deleteUserByID?userId=9d871a03-abe9-44e2-9372-cc9f3eabda70&selfId=123456', 'get', (options) => {
  return{
  }
})
