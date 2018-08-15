// 引入mockjs
const Mock = require('mockjs')

$web.$mock = Mock;
//console.log(Mock)

//首页数据模拟
import "./index/mock.js";

//登录
import "./sso.js";

// role
import './role'

//用户管理
import "./security/userManage.js";

//用户管理
import "./security/currentUserManage.js";

//配置管理
import "./config/configManage.js";

//模块访问查询
import "./moduleAccessQueryLog.js";





