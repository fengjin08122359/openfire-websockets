'use strict'
var SYSTEMINFO = function (el, options) {
  this.$el = el
  this.defaults = {}, this.options = $.extend({}, this.defaults, options)
}
SYSTEMINFO.prototype = {
  show: function (text) {
    if (!text || text == 'undefined' || text == 'null') return
    var el = this.$el
    el.find('.systemInfo').remove()
    el.append('<center class="systemInfromBox systemInfo"><span class="systemInfrom">' + text + '</span></center>')
    document.getElementById('message').scrollTop = document.getElementById('message').scrollHeight // 滚动条置底
  },
  hide: function () {
    var el = this.$el
    el.find('.systemInfo').remove()
  }
}
$.fn.systemInfo = function (options) {
  var systemInfo = new SYSTEMINFO($(this), options)
  return systemInfo
}
