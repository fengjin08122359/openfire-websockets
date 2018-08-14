/* localHistory.js 需要在生成chatId时使用 */
var HISTORY = function (options) {
  this.defaults = {
    storage: null,
    loadMore: function (array) {

    }
  }
  this.options = $.extend({}, this.defaults, options)
}
HISTORY.prototype = {
  current: [],
  history: [],
  time: 0,
  init: function () {
    this.current = this.options.storage.get('localCur') ? this.options.storage.get('localCur') : []
    this.history = this.options.storage.get('localHis') ? this.options.storage.get('localHis') : []
    this.time = this.options.storage.get('localTim') ? this.options.storage.get('localTim') : new Date().getTime()
    if (this.history.length > 0) {
      this.lastChat = this.history.length - 1
      this.lastId = this.history[this.lastChat].data.length - 1
    }
  },
  setCurrent: function (db) {
    var dia = []
    for (var i in db) {
      if (!isNaN(Number(i))) {
        var item = db[i]
        if (item.saveIn == 0 && !item.isRevoke && item.type != 'system' && item.status != 1) {
          var opName = item.type == 'client' ? dialogue.getAttr('operatorName') : item.type == 'visitor' ? userDatas.getVisitorInfo().visitorName : item.type == 'robot' ? '机器人' : ''
          dia.push({
            from: item.type,
            content: item.content,
            time: item.time,
            opName: opName
          })
        }
      }
    }
    this.options.storage.set('localTim', this.time)
    this.options.storage.set('localCur', dia)
    this.current = dia
  },
  saveCurrent: function () {
    if (this.current.length > 0) {
      this.history.push({
        data: this.current,
        time: this.time
      })
      this.current = []
      this.save()
    }
  },
  save: function () {
    this.options.storage.set('localCur', this.current)
    this.options.storage.set('localHis', this.history)
    this.options.storage.set('localTim', 0)
  },
  lastId: 0,
  lastChat: 0,
  page: 5,
  loadMore: function () {
    var array = [], i = 0, page = this.page
    while (i < page) {
      var item = this.preload(this.lastChat, this.lastId)
      if (item) {
        array.push(item)
        if (item.type != 'date') {
          i++
        }
      } else {
        break
      }
    }
    this.options.loadMore(array)
  },
  preload: function (lastChat, lastId) {
    if (lastChat == -1) {
      return ''
    }
    if (lastId == -1) {
      this.lastChat = lastChat - 1
      if (this.lastChat == -1) {
        return ''
      }
      this.lastId = this.history[this.lastChat].data.length - 1
      return {
        type: 'date',
        time: this.history[this.lastChat].time
      }
    }
    var msg = this.history[this.lastChat].data[this.lastId]
    this.lastId = this.lastId - 1
    return msg
  }
}
$.localHistory = function (options) {
  var history = new HISTORY(options)
  return history
}
