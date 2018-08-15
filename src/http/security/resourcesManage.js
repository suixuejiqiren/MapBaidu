export default {

  //初始化页面信息
  getModuleByName: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/ModuleManager/getModuleByName', {params})
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  //删除某个系统
  deleteModule: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/ModuleManager/deleteModule', {params})
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  //添加系统
  addModule: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.post('/ModuleManager/addModule', $web.$axios.stringify(params))
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  //获取application下拉框
  getApplicationName: () => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/ResourceManager/getApplicationName')
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  //根据applicationName来获取子菜单信息
  getMenuByName: (applicationName) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/ResourceManager/getMenuByName', {
        params: {
          name: applicationName
        }
      })
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  //编辑系统
  updateModule: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.post('/ModuleManager/updateModule', $web.$axios.stringify(params))
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })

    })
  },

  //刷新
  updateMenu: () => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/ResourceManager/updateMenu')
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  //展示子菜单
  showMenu: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get('/ModuleManager/updateModule', params)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
