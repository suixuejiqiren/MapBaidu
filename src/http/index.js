var http = {
  //获取所有菜单
  getAllMenu: () => {
    return new Promise(function (resolve, reject) {
      if($web.$conf.mock.isMockMenu){
        resolve({
          data:{
            status:0,
            data:$web.$conf.mock.menus
          }
        });
        return;
      }

      $web.$axios.get("sso/userRights")
        .then((res) => {
            if(res.data.data.length==0){
              res.data.data = $web.$conf.mock.menus
            }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },
  //获取三级菜单
  getMenusByParentId: (parentId) => {
    return new Promise(function (resolve, reject) {
    http.getAllMenu().then((res) => {
      let childrenMenus = {};
      let menus = res.data.data
      for (let menuL1 of menus) {
        if (menuL1.resourceId == parentId) {
          childrenMenus = menuL1.subList;
          break
        }

        if (menuL1.subList == undefined || menuL1.subList.length == 0) {
          continue
        }

        for (let menuL2 of menuL1.subList) {
          if (menuL2.resourceId == parentId) {
            childrenMenus = menuL2.subList
            break
          }
        }
      }

      resolve({
        data:{
          status:0,
          message:'ok',
          data:childrenMenus
        }
      });
    }).catch((error) => {
      reject(error);
    })
   /* return new Promise(function (resolve, reject) {
      $web.$axios.post("sso/getMenusByParentId",{
        parentId: parentId
      })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });*/
  })
  },

  attachToken: (url) => {
    let href = url
    if (href.indexOf('sso_token') < 0) {
      href = href + (href.indexOf('?') > 0 ? '&' : '?') + 'sso_token=' + $web.$store.state.session.token
      console.log('href:' + href)
    }

    return url
  }
  //注销功能
  /*logout: (params) => {
    return new Promise(function (resolve, reject) {
      $web.$axios.get("/sso/logout",{params})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }*/
}

export default http;
