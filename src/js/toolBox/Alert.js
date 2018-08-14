/* Alert.js 弹出框 */

(function (window, $, undefined) {
  var ALERT = function (options) {
    this.defaults = {
      bgColor: 'rgba(0,0,0,0.3)',
      time: 2
    }, this.options = $.extend({}, this.defaults, options)
  }
  ALERT.prototype = {
    isUse: false,
    init: function () {
      var alertItem = this
      $('body').append("<div class='alert'><div class='col'></div></div>")
      $('.alert').on('click', function (event) {
        alertItem.isUse = false
        $('.alert').hide()
      })
    },
    show: function (msg, type) {
      var alertItem = this
      if (alertItem.isUse == false) {
        alertItem.isUse = true
        if (!!type && type == 'error') {
          $('.alert .col').addClass('error')
        }
        $('.alert .col').html(msg)
        $('.alert').show()
        $('.alert .col').css({
          marginLeft: -$('.alert .col').width() / 2 - 20,
          marginTop: -$('.alert .col').height() - 10
        })
        setTimeout(function () {
          alertItem.isUse = false
          $('.alert').hide()
          $('.alert .col').removeClass('error')
        }, alertItem.options.time * 1000)
      }
    }
  }
  $.Alert = function (options) {
    var Alert = new ALERT(options)
    Alert.init()
    return Alert
  }
})(window, jQuery)
