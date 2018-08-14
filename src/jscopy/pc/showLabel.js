/* showLabel.js */
var SHOWLABEL = function ($this, options) {
  this.$el = $this
  this.defaults = {}, this.options = $.extend({}, this.defaults, options)
}
SHOWLABEL.prototype = {
  init: function () {
    var sl = this
    sl.$el.each(function (index, el) {
      sl.show($(this))
    })
  },
  show: function (el) {
    if (el.data('label')) {
      if (el.css('position') == 'static') {
        el.css('position', 'relative')
      }
      el.append('<div class="label">' + el.data('label') + '</div>')
      el.find('.label').width(12 * el.find('.label').text().length)
      el.hover(function () {
        el.find('.label').show()
      }, function () {
        el.find('.label').hide()
      })
    }
  }
}
$.fn.showLabel = function (options) {
  var showLabel = new SHOWLABEL($(this), options)
  showLabel.init()
  return showLabel
}
