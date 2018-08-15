export default {

  //用户登录
  login: (userName, userPwd) => {
    return new Promise(function (resolve, reject) {
      let params = {
        userName: userName,
        userPwd: userPwd
      }
      $web.$axios.post('/sso/login', $web.$axios.stringify(params))
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //注销功能
  logout: (userName) => {
    return new Promise(function (resolve, reject) {
      let params = {
        userName: userName
      }
      $web.$axios.get("/sso/logout", {params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }
}
