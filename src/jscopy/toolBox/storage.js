/* storage.js 缓存机制 */

(function (window, $, undefined) {
  var ls
  var STORAGE = function (options) {
    this.defaults = {
      companyPk: ''
    }, this.options = $.extend({}, this.defaults, options)
  }
  STORAGE.prototype = {
    init: function () {
      if (window.localStorage) {
        ls = window.localStorage
      } else {
        ls = window.Storage
      }
      this.setVersion()
    },
    setVersion: function () {
      var l = this
      var version = l.get('version')
      // 保留jsonStr,visitor,localHis
      var jsonStr = l.get('jsonStr')
      var visitor = l.get('visitor')
      var localhis = l.get('localHis')
      if (!version || version != '8.0.1') {
        ls.clear()
        if (jsonStr) l.set('jsonStr', jsonStr)
        if (visitor) l.set('visitor', visitor)
        if (localhis) l.set('localHis', localhis)
        l.set('version', '8.0.1')
      }
    },
    get: function (key) {
      var value = null
      if (key != 'version') {
        key = 'c' + this.options.companyPk + '-' + key
      }
      if (ls) {
        value = ls[key]
        if (value) {
          value = decodeURIComponent(ls[key])
        }
      } else if ($.cookie) {
        value = decodeURIComponent($.cookie(key))
      }
      try {
        value = JSON.parse(value)
      } catch (e) {}
      return value
    },
    set: function (key, value) {
      if (key != 'version') {
        key = 'c' + this.options.companyPk + '-' + key
      }
      if (ls) {
        if (typeof (value) === 'object') {
          value = JSON.stringify(value)
        }
        ls[key] = encodeURIComponent(value)
      } else if ($.cookie) {
        $.cookie(key, encodeURIComponent(value))
      }
    },
    clear: function (key) {
      if (key != 'version') {
        key = 'c' + this.options.companyPk + '-' + key
      }
      if (ls) {
        ls.removeItem(key)
      }
    }
  }
  $.storage = function (options) {
    var storage = new STORAGE(options)
    storage.init()
    return storage
  }
})(window, jQuery)
