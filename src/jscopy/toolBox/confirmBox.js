/* confirmBox.js */
var CONFIRMBOX = function (options) {
  this.defaults = {
  }
  this.options = $.extend({}, this.defaults, options)
}
CONFIRMBOX.prototype = {
  defered: null,
  init: function () {
    var c = this
    if ($('.confirmBox').length > 0) {
      return
    }
    $('body').append("<div class='confirmBox'><div class='body'><div class='title'></div><div class='rightBtn'></div><div class='wrongBtn'></div></div></div>")
    $('.confirmBox .rightBtn').on('click', function () {
      if (c.defered) {
        c.defered.resolve(true)
      }
      $('.confirmBox').hide()
      c.defered = null
    })
    $('.confirmBox .wrongBtn').on('click', function () {
      if (c.defered) {
        c.defered.resolve(false)
      }
      $('.confirmBox').hide()
      c.defered = null
    })
    $('.confirmBox').hide()
  },
  create: function (title, right, wrong) {
    var c = this
    right = right || '确定'
    wrong = wrong || '取消'
    $('.confirmBox').show()
    c.switchTitle(title, right, wrong)
    if (c.defered) {
      c.defered.resolve(false)
    }
    c.defered = new $.Deferred()
    return c.defered.promise()
  },
  switchTitle: function (title, right, wrong) {
    $('.confirmBox .title').html(title)
    $('.confirmBox .rightBtn').html(right)
    $('.confirmBox .wrongBtn').html(wrong)
    var h = $('.confirmBox').height() / 2 - $('.confirmBox .body').height() / 2
    $('.confirmBox .body').css({
      marginTop: h
    })
  }
}
$.confirm = function (options) {
  var confirmBox = new CONFIRMBOX(options)
  confirmBox.init()
  return confirmBox
}
