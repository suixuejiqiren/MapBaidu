window.$web.$conf = require("../../static/conf.json")
export default {
  install (Vue, options) {
    Vue.prototype.$conf = $web.$conf
  }
}
