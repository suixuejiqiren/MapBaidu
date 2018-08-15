import Vuex from 'vuex'
import Vue from 'vue'
import sso from './modules/sso'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    sso: sso
  },
  state: {
    session: {
      get token () {
        return sessionStorage.getItem('token');
      },
      get user () {
        return $web.$util.toJson(sessionStorage.getItem('user'));
      }
    }
  },
  getters: {
/*    getToken: state => {
      return state.session.token
    },
    getUser: state => {
      return state.session.user
    }*/
  },
  mutations: {
    setSession (state, session) {
/*      this.state.session.token = session.token;
      this.state.session.user = session.user;*/
      console.log('set local session');
      sessionStorage.setItem('token', session.token);
      sessionStorage.setItem('user', $web.$util.jsonToString(session.user));
    },
    clearSession(state){
      console.log('clear local session');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
  },
  actions: {
    setSession (context, session) {
      context.commit('setSession', session)
    },

    clearSession (context) {
      context.commit('clearSession')
    }
  }
})
