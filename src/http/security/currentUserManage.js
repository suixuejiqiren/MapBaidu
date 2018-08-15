export default{

  //初始化页面信息
  getCurrentUsers: () => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("api/sso/getCurrentUser")
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //保存修改的信息
  updateCurrentUser: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("/UserManager/updateCurrentUser",{params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //提交修改的密码
  updatePwd: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.post("/UserManager/updatePwd",$web.$axios.stringify(params))
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }
}

