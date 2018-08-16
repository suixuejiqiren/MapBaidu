// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import $ from './../static/scripts/jquery-1.10.2.min.js'

window.$ = $
window.jQuery = $
import Util from './utils/util'

import VueAxios from 'vue-axios'
import Axios from './http/axios'

Vue.use(VueAxios, Axios)
Vue.use(Axios)

import App from './App'
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'

Vue.use(ElementUI)
Vue.use(Util)

//import Conf from './utils/conf'
//Vue.use(Conf)
$web.$axios.get('/static/conf.json?r=' + Math.random())
  .then((res) => {
    console.log('url:' + location.href)
    console.log(res)
    $web.$conf = res.data
    Vue.prototype.$conf = $web.$conf
    Vue.config.productionTip = false
    //Vue.config.debug = true

    if ($web.$conf.NODE_ENV != 'prod') {
      require('./mock/mock.js')
    }

    $web.$store = store
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router: router,
      store: store,
      components: {App},
      template: '<App/>'
    })
  })
  .catch((error) => {
    console.log(error)
  })

/*
Vue.component('remote-script', {

  render: function (createElement) {
    var self = this;
    return createElement('script', {
      attrs: {
        type: 'text/javascript',
        src: this.src
      },
      on: {
        load: function (event) {
          self.$emit('load', event);
        },
        error: function (event) {
          self.$emit('error', event);
        },
        readystatechange: function (event) {
          if (this.readyState == 'complete') {
            self.$emit('load', event);
          }
        }
      }
    });
  },

  props: {
    src: {
      type: String,
      required: true
    }
  }
});*/
