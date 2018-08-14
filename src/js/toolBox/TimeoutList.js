
(function (window, $, undefined) {
  var TIMEOUTLIST = function (options) {
    this.defaults = {
      msgdb: null,
      clientEndtime: 480,
      clientBusytime: 240,
      visitorEndTime: 240,
      visitorHalfTime: 120,
      ops: {},
      // OperatorBasicSettings包括customerFroVisitors,customerBusy,customerFroVisitors
      startFun: function () {}
    }, this.options = $.extend({}, this.defaults, options)
  }
  TIMEOUTLIST.prototype = {
    diaList: new Object(),
    timeout: null,
    hasVisitorHalfTimeout: false,
    hasVisitorTimeout: false,
    hasClientBusy: false,
    hasClientEnd: false,
    init: function () {
      this.setTime()
    },
    setTime: function () {
      var ops = this.options.ops
      this.options.clientEndtime = ops.customerFroVisitors ? ops.customerFroVisitors : this.options.clientEndtime
      this.options.clientBusytime = ops.customerBusy ? ops.customerBusy : this.options.clientBusytime
      // this.options.clientBusytime = this.options.clientBusytime<240?this.options.clientBusytime/2:this.options.clientBusytime-120;
      this.options.visitorEndTime = ops.customerFroVisitors ? ops.customerFroVisitors : this.options.visitorEndTime
      this.options.visitorHalfTime = this.options.visitorEndTime <= this.options.visitorHalfTime * 2 ? this.options.visitorEndTime / 2 : this.options.visitorEndTime - this.options.visitorHalfTime
    },
    startALLTimeout: function () {
      var t = this
      clearInterval(this.timeout)
      this.timeout = setInterval(function () {
        t.options.startFun()
      }, 1000)
    },
    endChat: function () {
      this.hasVisitorHalfTimeout = true
      this.hasVisitorTimeout = true
      this.hasClientBusy = true
      this.hasClientEnd = true
    },
    reset: function () {
      // this.diaList[name] = [user, time];
      this.hasVisitorHalfTimeout = false
      this.hasVisitorTimeout = false
      this.hasClientBusy = false
      this.hasClientEnd = false
    },
    removeDiaList: function (name) {
      delete this.diaList[name]
    },
    diaListLast: function () {
      var msgdb = this.options.msgdb
      var last
      for (var i in msgdb.db) {
        if (msgdb.db[i] && (msgdb.db[i].type != 'robot' && msgdb.db[i].type != 'system' && !msgdb.db[i].isRevoke)) {
          if (!last || !((msgdb.db[i].type == 'visitor' && msgdb.db[last].type == 'visitor') || (msgdb.db[i].type == 'client' && msgdb.db[last].type == 'client'))) { // 第一个
            last = i
          }
        }
      }
      return last
    },
    isVisitorHalfTimeout: function () {
      var msgdb = this.options.msgdb
      var t = this
      var dlast = msgdb.db[t.diaListLast()]
      if (!t.hasVisitorHalfTimeout && !!dlast && dlast.type == 'client') {
        var now = new Date().getTime()
        if (now - dlast.time >= t.options.visitorHalfTime * 1000 && !dlast.hasChecked) {
          msgdb.db[t.diaListLast()].hasChecked = true
          t.hasVisitorHalfTimeout = true
          return true
        }
      }
      return false
    },
    isVisitorTimeout: function () {
      var msgdb = this.options.msgdb
      var t = this
      var dlast = msgdb.db[t.diaListLast()]
      if (!t.hasVisitorTimeout && !!dlast && dlast.type == 'client') {
        var now = new Date().getTime()
        if (now - dlast.time >= t.options.visitorEndTime * 1000) {
          t.hasVisitorTimeout = true
          return true
        }
      }
      return false
    },
    isClientBusy: function () {
      var msgdb = this.options.msgdb
      var t = this
      var ops = this.options.ops
      var dlast = msgdb.db[t.diaListLast()]
      if (ops.customerBusy == 0) return false
      if (!t.hasClientBusy && !!dlast && dlast.type == 'visitor') {
        var now = new Date().getTime()
        if (now - dlast.time >= t.options.clientBusytime * 1000 && !dlast.hasChecked) {
          msgdb.db[t.diaListLast()].hasChecked = true
          t.hasClientBusy = true
          return true
        }
      }
      //      //检查相邻访客与坐席的时间大于坐席等待时间的显示提示
      //      var fkNoTip = {};
      //      for (var i in msgdb.db) {
      //        var d = msgdb.db[i];
      //        if (fkNoTip.length != 0) {
      //          if (!d.isRevoke) {
      //
      //            if (d.type == "client") {
      //              if (d.time - fkNoTip.time >= t.options.clientBusytime * 1000 && !fkNoTip.hasChecked) {
      //                fkNoTip.hasChecked = true;
      //                return true;
      //              } else {
      //                fkNoTip = {};
      //              }
      //            }
      //          }
      //        }
      //        if (d.type == "visitor") {
      //          fkNoTip = d;
      //        }
      //      }
      return false
    },
    isClientEnd: function () {
      var msgdb = this.options.msgdb
      var t = this
      var dlast = msgdb.db[t.diaListLast()]
      var now = new Date().getTime()
      if (now - dlast.time >= t.options.clientEndtime * 1000 && !t.hasClientEnd && dlast.hasChecked) {
        msgdb.db[t.diaListLast()].hasChecked = true
        t.hasClientEnd = true
        return true
      }
      return false
    }
  }
  $.TimeoutList = function (options) {
    var TimeoutList = new TIMEOUTLIST(options)
    TimeoutList.init()
    return TimeoutList
  }
})(window, jQuery)
