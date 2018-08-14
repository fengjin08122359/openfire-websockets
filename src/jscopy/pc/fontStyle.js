var FONTSTYLE = function (options) {
  this.defaults = {
    fs: {
      fontSize: '14px',
      color: '#000',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      lineHeight: '14px',
      fontFamily: '微软雅黑'
    },
    storage: null,
    initFun: function (fs) {

    }
  }
  this.options = $.extend({}, this.defaults, options)
}
FONTSTYLE.prototype = {
  fs: {
    fontSize: '14px',
    color: '#000',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    lineHeight: '14px',
    fontFamily: '微软雅黑'
  },
  init: function () {
    var storage = this.options.storage
    var fs = storage.get('fs')
    if (fs) {
      this.fs = fs
    }
    this.options.initFun(fs)
  },
  isShow: function () {
    if (this.options.fs == this.fs) {
      return false
    }
    return true
  },
  set: function (key, value) {
    var storage = this.options.storage
    this.fs[key] = value
    storage.set('fs', this.fs)
  },
  get: function (key) {
    var storage = this.options.storage
    return typeof key !== 'undefined' ? this.fs[key] : ''
  }
}
$.fontStyle = function (options) {
  var fontStyle = new FONTSTYLE(options)
  fontStyle.init()
  return fontStyle
}
