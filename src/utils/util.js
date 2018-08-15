window.$web = {}
window.$web.$util = {
  title (strTitle) {
    window.document.title = strTitle ? strTitle : 'no title'
  },
  toJson: function (strObj) {
    return JSON.parse(strObj)
  },
  jsonToString: function (obj) {
    return JSON.stringify(obj)
  }
}

export default {
  install (Vue, options) {
    Vue.prototype.$util = $web.$util
  }
}
