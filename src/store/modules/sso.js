import axios from 'axios'

export default {
  namespaced: true,
  state: {
    currentUser: {
      get UserName () {
        return localStorage.getItem('currentUser_name')
      },
      get UserToken () {
        return localStorage.getItem('currentUser_token')
      },
      get RefreshToken () {
        return localStorage.getItem('currentUser_refresh_token')
      }
    }
  },
  mutations: {
    setUser (state, {userName, userToken, refreshToken}) {
      // 在这里把用户名和token保存起来
      localStorage.setItem('currentUser_name', userName)
      localStorage.setItem('currentUser_token', userToken)
      localStorage.setItem('currentUser_refresh_token', refreshToken)
    },
    clearUser (state) {
      localStorage.clear()
    }
  },
  actions: {
    userLogin (context, {userName, userPassword, router}) {
      axios({
        method: 'post',
        url: '/oauth/token',
        params: {
          'username': userName,
          'password': userPassword,
          'grant_type': 'password',
          'scope': 'all'
        },
        auth: {
          username: 'client',
          password: 'secret'
        }
      }).then(function (response) {
        /* console.log(response.data); */
        context.commit('setUser', {
          'user_name': userName,
          'user_token': response.data.access_token,
          'refresh_token': response.data.refresh_token
        })
        /* router.push({path:"base"}); */
        axios.defaults.headers.common['Authorization'] = 'bearer ' + localStorage.getItem('currentUser_token')
        router.push({path: 'base/welcome'})
        context.commit('setSignFalse', null, {root: true})
        /* this.$route.router.push({ path: '/base' }); */
      }).catch(function (e) {
        /* iView.Message.error('用户名或密码错误！'); */
        context.commit('setSignTrue', null, {root: true})
      })
    },
    loginOUt (context, {router}) {
      router.push({path: '/'})
      context.commit('clearUser')
    }
  }
}
