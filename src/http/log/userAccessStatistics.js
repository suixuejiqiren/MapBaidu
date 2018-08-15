/**
 * Created by 方国良 on 2018/5/30.
 * 用户访问查询接口层
 */

export default{

  //输入时间段查询用户数据
  countByUserDate: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("api/customerUseLog/countByUserDate",{params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //输入时间段查询区域数据
  countByRegionDate: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("api/customerUseLog/countByRegionDate",{params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //输入时间段查询角色数据
  countByRoleDate: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("api/customerUseLog/countByRoleDate",{params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //输入时间段查询用户组数据
  countByGroupDate: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("api/customerUseLog/countByGroupDate",{params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //点击查询出来的数据，展示用户数据详细信息
  selectLogInfoByUserIdDate: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("api/customerUseLog/selectLogInfoByUserIdDate",{params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //点击查询出来的数据，展示区域数据详细信息
  selectLogInfoByRegionIdDate: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("api/customerUseLog/selectLogInfoByRegionIdDate",{params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //点击查询出来的数据，展示角色数据详细信息
  selectByRoleDate: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("api/customerUseLog/selectByRoleDate",{params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },

  //点击查询出来的数据，展示用户组数据详细信息
  selectByGroupDate: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("api/customerUseLog/selectByGroupDate",{params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }
}
