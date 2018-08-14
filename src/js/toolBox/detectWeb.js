(function (window, $, undefined) {
  String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '')
  }
  var WEB = function (options) {
    this.defaults = {
      'period': 30,
      after: function () {}
    }, this.options = $.extend({}, this.defaults, options)
  }
  WEB.prototype = {
    isInitiate: false,
    isReconnection: false,
    checkeTimeout: null,
    msgs: [],
    period: 0,
    getIsInitiate: function () {
      return this.isInitiate
    },
    getIsReconnection: function () {
      return this.isReconnection
    },
    getMsgs: function (lastIndexOf) {
      if (this.msgs.length > lastIndexOf) {
        return this.msgs.slice(this.msgs.length - lastIndexOf, this.msgs.length)
      }
      return this.msgs
    },
    check: function () {
      this.period--
      if (this.period <= 0) {
        this.options.after()
        clearInterval(this.checkeTimeout)
        this.checkeTimeout = null
        this.isInitiate = false
        this.period = this.options.period
      }
    },
    checkedSuccess: function () {
      clearInterval(this.checkeTimeout)
      this.checkeTimeout = null
      this.period = this.options.period
      this.isInitiate = false
    },
    setInitiate: function (value) {
      this.isInitiate = value
    },
    setIsReconnection: function (value) {
      this.isReconnection = value
    },
    checkedFail: function () {
      var item = this
      item.checkeTimeout = setInterval(function () {
        item.check()
      }, 1e3)
      this.isInitiate = true
    },
    msgPush: function (op, resultStr) {
      this.msgs.push('{"' + op + '":\"' + resultStr + '\"}')
    }
  }
  $.detectWeb = function (options) {
    var web = new WEB(options)
    web.period = web.options.period
    return web
  }
})(window, jQuery)
