
(function (window, $, undefined) {
  var pictureRatio = 0,
    screenRatio = 0
  var SHOWBIGIMG = function (options) {
    this.defaults = {
      picStr: "<img id='showpic' src='$1'/>",
      bgColor: 'rgba(0,0,0,0.5)'
    }, this.options = $.extend({}, this.defaults, options)
  }
  SHOWBIGIMG.prototype = {
    init: function () {
      var picItem = this
      picItem.getScreenRatio()
      if ($('.showPicture').length > 0) {

      } else {
        $('body').append('<div class="showPicture"></div>')
        $('.showPicture').css({
          position: 'fixed',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          background: picItem.options.bgColor,
          display: 'none',
          zIndex: '1001'
        })
      }
    },
    showPic: function (imgUrl) {
      var picItem = this
      picItem.init()
      $('.showPicture').html('').append(this.options.picStr.replace(/\$1/g, imgUrl))
      $('.showPicture').show()
      var showpic = document.getElementById('showpic')
      if (showpic.complete) {
        pictureRatio = $('.showPicture img').width() / $('.showPicture img').height()
        picItem.getShowPic()
      } else {
        showpic.onload = function () {
          pictureRatio = $('.showPicture img').width() / $('.showPicture img').height()
          picItem.getShowPic()
        }
      }
      $('.showPicture').unbind().on('click', function (event) {
        $('.showPicture').hide()
      })
    },
    getShowPic: function () {
      if (!!screenRatio && !!pictureRatio) {
        if (screenRatio > pictureRatio) {
          if ($('.showPicture img').height() >= $(window).height()) {
            $('.showPicture img').css({
              width: 'auto',
              height: '98%',
              padding: ' 1% 0',
              display: 'block',
              margin: '0 auto',
              position: 'initial',
              top: '0'
            })
          } else {
            $('.showPicture img').css({
              display: 'block',
              margin: '0 auto',
              position: 'relative',
              top: ($(window).height() - $('.showPicture img').height()) / 2 + 'px'
            })
          }
        } else {
          if ($('.showPicture img').width() >= $(window).width()) {
            $('.showPicture img').css({
              display: 'initial',
              width: '98%',
              padding: '0 1%',
              height: 'auto',
              position: 'fixed',
              top: '50%'
            })
            $('.showPicture img').css({
              marginTop: -$('.showPicture img').height() / 2
            })
          } else {
            $('.showPicture img').css({
              display: 'initial',
              left: '50%',
              position: 'fixed',
              top: '50%',
              padding: '1% 1%'
            })
            $('.showPicture img').css({
              marginTop: -$('.showPicture img').height() / 2,
              marginLeft: -$('.showPicture img').width() / 2
            })
          }
        }
      }
    },
    getScreenRatio: function () {
      screenRatio = ($(window).width()) / ($(window).height())
    }
  }
  $.showBigImg = function (options) {
    var showBigImg = new SHOWBIGIMG(options)
    showBigImg.init()
    return showBigImg
  }
})(window, jQuery)
