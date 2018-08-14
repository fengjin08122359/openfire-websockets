var ajax = require('../util/ajax.js')
/* monitor.js 访客监控 */
var MONITOR = function (options) {
  this.defaults = {
    userDatas: null,
    storage: null
  }, this.options = $.extend({}, this.defaults, options)
}
MONITOR.prototype = {
  init: function (msg) {
    var now = nowtime.getTime()
    var mo = this
    var storage = mo.options.storage
    var ncVisitor = storage.get('ncVisitor') ? storage.get('ncVisitor') : {}
    var t = mo.getTrace()
    var trace = t.result
    var info = mo.getInfo()
    storage.set('visitorId', info.visitorId)
    storage.set('visitorName', info.visitorName)
    info = mo.changeFirstTime(info, trace)
    ncVisitor['trace'] = trace
    ncVisitor['info'] = info
    storage.set('ncVisitor', ncVisitor)
    var i = info
    if (now - info.lastTime > 10 * 60 * 1000 || !t.hasVal) {
      i['trace'] = [t.item]
    } else {
      i['trace'] = []
    }
    ajax.setVisitorMonitor(i)
  },
  changeFirstTime: function (info, trace) {
    var item = info
    var firstTime = item.firstTime
    var time
    for (var i in trace) {
      if (!time || time > trace[i].firstInTime) {
        if (!time || new Date(trace[i].firstInTime).Format('yyyy-mm-dd') == nowtime.Format('yyyy-mm-dd')) {
          time = trace[i].firstInTime
        }
      }
    }
    item.firstTime = time || firstTime
    if (new Date(item.firstTime).Format('yyyy-mm-dd') != nowtime.Format('yyyy-mm-dd')) {
      item.firstTime = item.lastTime
    }
    return item
  },
  get: function () {
    var storage = mo.options.storage
    var route = storage.get('route')
    return route
  },
  getInfo: function () {
    var mo = this
    var storage = mo.options.storage
    var userDatas = mo.options.userDatas
    var info = userDatas.getJsonStr()
    var allTime = mo.getAllTime(info)
    info.firstTime = allTime.firstTime
    info.lastTime = allTime.lastTime
    info.status = 'broswer'
    return info
  },
  getAllTime: function (info) {
    var now = nowtime.getTime()
    return {
      firstTime: (!!info && !!info.firstTime) ? info.firstTime : now,
      lastTime: now
    }
  },
  getTrace: function () {
    var now = nowtime.getTime()
    var mo = this
    var storage = mo.options.storage
    var ncVisitor = storage.get('ncVisitor')
    var route = ncVisitor ? ncVisitor.trace : null
    var r = []
    var item = null
    var hasVal = false
    // 记录进入时间(第一次)去重
    if (!route) {
      item = {
        url: location.href,
        firstInTime: now,
        inTime: now,
        title: $('title').html()
      }
      r.push(item)
    } else {
      for (var i in route) {
        if (route[i]) {
          var items = route[i]
          if (decodeURIComponent(items.url) == location.href) {
            hasVal = true
            items.inTime = now
            item = items
          }
          r.push(items)
        }
      }
      if (!hasVal) {
        item = {
          url: location.href,
          firstInTime: now,
          inTime: now,
          title: $('title').html()
        }
        r.push(item)
      }
    }
    if (r.length > 10) {
      r = r.sort(function (a, b) {
        return a.inTime < b.inTime
      })
      r.pop()
    }
    r = r.sort(function (a, b) {
      return a.firstInTime < b.firstInTime
    })

    return {
      item: item,
      result: r,
      hasVal: hasVal
    }
  }
}
$.monitor = function (options) {
  var monitor = new MONITOR(options)
  monitor.init()
  return monitor
}
