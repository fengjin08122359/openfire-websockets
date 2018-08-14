/* systemInfo.js 系统消息 */
var SYSTEMINFO = function (el, options) {
  this.$el = el
  this.defaults = {}, this.options = $.extend({}, this.defaults, options)
}
SYSTEMINFO.prototype = {
  show: function (text) {
    if (!text || text == 'undefined' || text == 'null') return
    var el = this.$el
    el.html('')
    el.find('.systemInfo').remove()
    el.append('<div class="systemInfromBox systemInfo">' + text + '</div>')
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
