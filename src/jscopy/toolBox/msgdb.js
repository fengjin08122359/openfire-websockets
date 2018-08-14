/* msgdb.js 所有信息的记录 langTip dialogue */
var MSGDB = function (options) {
  this.defaults = {}, this.options = $.extend({}, this.defaults, options)
}
MSGDB.prototype = {
  allDB: {},
  id: 0,
  db: {},
  add: function (json) {
    var md = this
    var item = {
      msgId: json.msgId ? json.msgId : '',
      type: json.type,
      /* type:"visitor","client","robot","system" */
      content: json.content,
      /* 内容 */
      time: json.date ? json.date : new Date().getTime(),
      isRevoke: json.isRevoke ? json.isRevoke : false,
      /* 是否已撤回 */
      hasChecked: json.hasChecked ? json.hasChecked : false,
      /* 是否经过超时判断 */
      status: json.status ? json.status : 0,
      /* 是否保存到历史记录 */
      saveIn: json.saveIn ? json.saveIn : 0,
      /* 是否是历史记录中的数据,0当前,1历史 */
      received: 0, /* 0未读,1已读,2未读超时 */
      checkSend: 0/* 0发送,1已发送,2未发送 */
      /* 是否经过超时判断 */
    }
    md.db[md.id] = item
    md.allDB[md.id] = item
    md.id++
  },
  clear: function () {
    var md = this
    md.db = {}
  },
  last: function () {
    var md = this
    var last = 0
    for (var i in md.db) {
      if (!isNaN(Number(i)) && Number(last) <= Number(i)) {
        last = i
      }
    }
    return last
  },
  setKey: function (iKey, key, value) {
    var md = this
    for (var i in md.db) {
      if (iKey == i) {
        md.db[i][key] = value
        md.allDB[i][key] = value
      }
    }
  },
  set: function (msgId, key, value) {
    var md = this
    for (var i in md.db) {
      if (md.db[i].msgId == msgId) {
        md.db[i][key] = value
        md.allDB[i][key] = value
      }
    }
  },
  get: function (msgId) {
    var md = this
    for (var i in md.db) {
      if (md.db[i].msgId == msgId) {
        return md.db[i]
      }
    }
  },
  getAll: function () {
    return this.db
  }
}
$.msgdb = function (options) {
  var msgdb = new MSGDB(options)
  return msgdb
}
