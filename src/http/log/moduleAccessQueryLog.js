export default{

  //输入时间段查询数据
  countByModuleDate: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("api/customerUseLog/countByModuleDate",{params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //点击查询出来的数据，展示数据详细信息
  selectLogInfoByModuleIdDate: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("api/customerUseLog/selectLogInfoByModuleIdDate",{params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }
}
