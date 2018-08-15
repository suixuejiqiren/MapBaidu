export default{

  //初始化页面信息
  getSysPropertiesTreeData: () => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("sysProperties/getSysPropertiesTreeData")
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //保存修改的信息
  updateSysProperties: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.post("sysProperties/updateSysProperties",params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }
}

