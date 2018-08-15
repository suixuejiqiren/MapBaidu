export default {
  //获取用户列表
  getInfo: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/RoleManager/findRoleByName',{params}
      )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },


  //删除用户列表
  deleteInfo: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/RoleManager/deleteRoleById',{params}
      )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //编辑用户页面，根据id获取用户信息
  editInfo: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/RoleManager/findRoleById',{params}
      )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //弹窗，获取角色类型
  getAllRoles: () => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/UserManager/getAllRoles'
      )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //弹窗，获取城市信息
  getAllRegion: () => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/UserManager/getAllRegion'
      )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //获取权限列表
  getRoleAddList: () => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/getAllMenu')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //更新
  updateRole: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.post('/RoleManager/updateRoleById',params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    })},

  //新增
  addRole: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.post('/RoleManager/addRole',params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    })}


}


