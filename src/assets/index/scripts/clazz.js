var factory = (function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    console.log("module.exports")
    module.exports = factory()
  }
  else {
    if (typeof define === 'function' && define.amd) {
      console.log("amd")
      define(factory)
    }
    else {
      console.log("global")
      console.log(global)
      global.polygon = factory()
    }
  }

  return factory;
  // typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.polygon = factory())
}(window, (function () {
  var polygon = function () {
    this.getCenter = function () {
      return 'haha'
    }
  }
  return polygon
})))

export default factory();
