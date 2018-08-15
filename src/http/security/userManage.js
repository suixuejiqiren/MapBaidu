export default{

  //初始化页面信息
  getAllUsers: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("UserManager/getAllUsers", {params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //根据用户ID获取某个用户信息
  getUserById: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/UserManager/getUserById', {params}
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //获取所有地市名称
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

  //获取所有角色
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

  //获取所有部门
  getAllDepartment: () => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/UserManager/getAllDepartment'
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //锁定用户
  lockUser: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/UserManager/lockUser', {params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //解锁用户
  unlockUser: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/UserManager/unlockUser', {params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //重置密码
  resetPwd: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/UserManager/resetPwd', {params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //删除用户
  deleteUserByID: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/UserManager/deleteUserByUserId', {params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  /*let params = {
    userID: this.userMessage.userId,
    userName: this.userMessage.name,
    displayName: this.userMessage.displayName,
    userMail: this.userMessage.email,
    userPhone: this.userMessage.phone,
    departmentID: this.userMessage.departmentId,
    regionID: this.userMessage.belongCityId,
    roleID: this.userMessage.belongRoleId,
    userDescription: this.userMessage.userDescribe
  };*/
  //提交添加的用户信息
  addRnopUser: (userId,name,displayName,email,phone,departmentId,belongCityId,belongRoleId,userDescribe) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.post('/UserManager/addUser', $web.$axios.stringify({
          userID: userId,
          userName: name,
          displayName: displayName,
          userMail: email,
          userPhone: phone,
          departmentID: departmentId,
          regionID: belongCityId,
          roleID: belongRoleId,
          userDescription: userDescribe
      }))
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //提交编辑的用户信息
  updateUserByID: (userId,name,displayName,email,phone,departmentId,belongCityId,belongRoleId,userDescribe) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.post('/UserManager/updateUserByID', $web.$axios.stringify({
          userID: userId,
          userName: name,
          displayName: displayName,
          userMail: email,
          userPhone: phone,
          departmentID: departmentId,
          regionID: belongCityId,
          roleID: belongRoleId,
          userDescription: userDescribe
        }))
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }
}
