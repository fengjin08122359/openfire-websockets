(function (window, $, undefined) {
  var CHANGEWINDOW = function (options) {
    this.defaults = {
      open: false,
      msgdb: null,
      storage: null,
      chatId: '',
      browserId: '',
      dialogue: null,
      data: null,
      TimeoutList: null,
      start: function () {},
      end: function () {}
    }, this.options = $.extend({}, this.defaults, options)
  }
  CHANGEWINDOW.prototype = {
    isChanged: false,
    browserInterval: null,
    db: {},
    change: function () {
      var storage = this.options.storage
      var chatId = this.options.chatId
      var items = storage.get('currentChat') ? storage.get('currentChat') : []
      items = this.options.msgdb.getAll()
      if (!storage.get('currentChatId') || this.options.chatId != storage.get('currentChatId')) {
        items = []
      }
      storage.set('currentChatId', chatId)
      storage.set('currentChat', items)
    },
    clear: function () {
      var chatId = this.options.chatId
      // this.options.storage.clear("currentChat");
      // this.options.storage.clear("currentChatId");
    },
    check: function () {
      var chatId = this.options.chatId
      var storage = this.options.storage
      if (!!storage.get('currentChat') && !!storage.get('currentChatId') && storage.get('currentChatId') == chatId) {
        return storage.get('currentChat')
      }
      return false
    },
    setMsgObj: function (msgObj) {
      var chatId = this.options.chatId
      var storage = this.options.storage
      storage.set('msgObjCurrentChat', msgObj)
    },
    getMsgObj: function () {
      var storage = this.options.storage
      return storage.get('msgObjCurrentChat')
    },
    init: function () {
      var storage = this.options.storage
      var CW = this
      CW.db = this.options.storage.get('currentChat')
      if (!CW.options.open) return
      if (!!storage.get('browserId') && !!storage.get('currentChatId') && CW.options.chatId == storage.get('currentChatId')) {
        storage.set('browserId', CW.options.browserId)
      }
      CW.startcheck()
      if (CW.browserInterval != 'over') {
        CW.browserInterval = setInterval(function () {
          CW.startcheck()
        }, 1000)
      }
    },
    startcheck: function () {
      var CW = this
      var storage = this.options.storage
      var dialogue = this.options.dialogue
      var data = this.options.data
      var msgdb = this.options.msgdb
      if (!storage.get('browserId') || CW.options.chatId != storage.get('currentChatId')) {

      } else if (storage.get('offChat') != true && CW.options.browserId != storage.get('browserId')) {
        if (dialogue.islive() == true) {
          dialogue.end()
          // 显示离开
          CW.options.end()
        }
      } else if (CW.options.browserId == storage.get('browserId') && CW.getMsgObj()) {
        if (dialogue.islive() == false) {
          CW.isChanged = true
          storage.set('browserId', CW.options.browserId)
          storage.set('offChat', CW.options.browserId)
          msgdb.clear()
          CW.options.start()
          var msgObj = CW.getMsgObj()
          data.set('reconnectData', msgObj)
          dialogue.setAttr('remoteUrl', msgObj.url)
          dialogue.setAttr('_workGroupName', msgObj.workgroupName)
          dialogue.setAttr('operatorName', msgObj.opShow)
          data.set('opName', msgObj.workgroupName)
          data.set('_workGroupName', msgObj.workgroupName)
          dialogue.start()
          if (CW.db) {
            var items = CW.db
            for (var i in items) {
              var item = items[i]
              if (item && (item.type == 'visitor' || item.type == 'client' || item.type == 'robot')) {
                if (!!item.content && !item.isRevoke && item.status == 0 && item.checkSend != 2) {
                  dialogue.showMsg({
                    msgid: item.msgId,
                    date: item.time,
                    content: item.content,
                    from: item.type,
                    status: item.status,
                    hasChecked: item.hasChecked
                  })
                }
              } else if (item && item.type == 'system') {
                if (item.content) {
                  dialogue.showSysMsg(item.content)
                }
              }
              msgdb.id = parseInt(i) + 1
            }
            CW.options.TimeoutList.startALLTimeout()
            msgdb.db = CW.db
          }
        }
      }
    },
    stopCheck: function () {
      var CW = this
      clearInterval(CW.browserInterval)
      CW.browserInterval = 'over'
      CW.clear()
    }
  }
  $.changeWindow = function (options) {
    var changeWindow = new CHANGEWINDOW(options)
    return changeWindow
  }
})(window, jQuery)
