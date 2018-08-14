(function (window, $, undefined) {
  var SCREENCAPTURE = function (options) {
    this.defaults = {
      os: {},
      draw: function (data) {

      },
      download: function () {

      }
    }, this.options = $.extend({}, this.defaults, options)
  }
  SCREENCAPTURE.prototype = {
    outTime: 1000 * 60,
    startTime: 0,
    using: false,
    failOp: 0,
    scinterval: null,
    os: null,
    title: '',
    type: 1,
    http: 'http://local.any800.com:20201/',
    https: 'https://local.any800.com:20202/',
    url: '',
    onClick:false,
    init: function () {
      this.title = $('title').html()
      this.os = this.options.os
      var ishttps = document.location.protocol == 'https:'
      if (ishttps) {
        this.url = this.https
      } else {
        this.url = this.http
      }
      $('.screenCaptureCheckBox .checked').toggleClass('active', !!datas.get('screenCapture'))
      this.getBrowserName()
    },
    use: function () {
      if (this.onClick) return
      this.onClick = true
      this.type = !datas.get('screenCapture')
      var isshown = Number(!!this.type)
      var browserName = this.browserName
      $('title').html(this.title + '-截屏中')
      $('iframe.screenCapture').remove()
      $('html').append("<iframe class='screenCapture' style='position:absolute;visibility:hiddentop:0;left:0;'  src='" + ('hfxyz:\\\\' + (isshown ? 'show' : ('hidden?pn=' + browserName + '&title=' + encodeURIComponent(this.title)))) + "' frameborder='0'></iframe>")
      this.startTime = new Date().getTime()
      this.using = false
      this.failOp = 0
      this.startCheck()
    },
    getBrowserName: function () {
      var browserName = this.os.browserName
      switch (browserName) {
        case 'msie':
          browserName = 'iexplore'
          break
        case 'metasr':
          browserName = 'SogouExplorer'
          break
        case 'qqbrowser':
          browserName = 'QQBrowser'
          break
        case 'firefox':
          browserName = 'firefox'
          break
        case 'chrome':
          browserName = 'chrome'
          break
        case 'msie':
          browserName = 'iexplore'
          break
      }
      if (browserName == 'chrome') {
        var desc = navigator.mimeTypes['application/vnd.chromium.remoting-viewer']
        if (desc) {
          browserName = '360se'
        }
      }
      this.browserName = browserName
    },
    startCheck: function () {
      var sc = this
      //            if(sc.os.browserName=="msie"){
      //              sc.checkIE();
      //            }
      if (this.scinterval) {
        clearInterval(this.scinterval)
      }
      if (new Date().getTime() - this.startTime > this.outTime) {
        return
      }
      this.scinterval = setInterval(function () {
        $.ajax({url: sc.url + 'index.html', dataType: 'jsonp', jsonpCallback: 'success_jsonpCallback' })
          .done(function (e) {
            sc.failOp = 0
            if (e.test == true && !!e.data) {
              sc.using = true
              sc.options.draw(e.data)
              sc.close()
            } else if (e.test == false) {
              sc.close()
            }
          })
        if(sc.failOp>10){
          sc.download()
        }
        sc.failOp++
      }, 500)
    },
    close: function () {
      if (this.scinterval) {
        clearInterval(this.scinterval)
      }
      this.onClick = false
      $('title').html(this.title)
      $('iframe.screenCapture').remove()
      $('html').append("<iframe class='screenCapture' style='position:absolute;visibility:hidden'  src='" + this.url + "close.html' frameborder='0'></iframe>")
    },
    download: function () {
      if (this.scinterval) {
        clearInterval(this.scinterval)
      }
      this.onClick = false
      if (window.ScreenCapture) {
        return
      }
      if (this.hasDownload) {
        return
      }
      this.hasDownload = true
      this.options.download()
    },
    checkIE: function () {
      var obj = $('.screenCaptureIframe')
      if (obj.length < 1) {
        $('body').append('<div class="screenCaptureIframe" style="height:0px;width:0px;"></div>')
        obj = $('.screenCaptureIframe')
      }
      obj.html('')
      obj.html('<object id="capture" type="application/x-hfxyz2" width="0" height="0"><param name="onerror" value="onerrorHandler" /><param name="onload" value="onloadHandler" /></object>')
    }
  }
  $.screenCapture = function (options) {
    var screenCapture = new SCREENCAPTURE(options)
    screenCapture.init()
    return screenCapture
  }
})(window, $)
