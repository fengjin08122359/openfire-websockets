var ajax = require('../util/ajax.js')
/* history.js 历史纪录及离线留言 */
var HISTORY = function (options) {
  this.defaults = {
    show: true,
    visitorId: '',
    companyPk: '',
    leavePre: '离线消息:',
    maxDia: 5,
    dialogue: null,
    generation: function () {},
    checkFun: function (argument) {}
  }
  this.options = $.extend({}, this.defaults, options)
}
HISTORY.prototype = {
  page: 1,
  historyDias: [],
  leaveDias: [],
  over: false,
  cur: 1,
  num: 0,
  more: true,
  showHistoryDia: function () {
    if (this.options.show == false) return
    var history = this
    var dialogue = this.options.dialogue
    for (var i in history.historyDias) {
      if (!isNaN(Number(i))) {
        for (var p in history.historyDias[i].content['dia']) {
          if (!isNaN(Number(i))) {
            var item = history.historyDias[i].content['dia'][p]
            if (!item.hasShown && item.num < history.cur * history.options.maxDia) {
              history.historyDias[i].content['dia'][p].hasShown = true
              dialogue.showMsg({
                date: Number(new Date(item.time.replace(/-/g, '/')).getTime()),
                from: item.from,
                content: item.content,
                status: 1
              })
            }
          }
        }
      }
    }
  },
  showLeaveChat: function (argument) {
    var history = this
    var dialogue = this.options.dialogue
    for (var i in history.leaveDias) {
      if (!isNaN(Number(i))) {
        dialogue.showMsg({
          from: history.leaveDias[i].from,
          content: history.leaveDias[i].content,
          status: 1,
          date: history.leaveDias[i].date
        })
      }
    }
  },
  init: function () {
    this.options.generation()
  },
  check: function (argument) {
    if (this.getSum() < this.cur * this.options.maxDia + 1 && !this.over) {
      this.getHistoryDialogue()
      this.check()
    } else {
      this.showHistoryDia()
      this.cur++
    }
    this.more = !this.over ? true : !(this.getSum() < this.cur * this.options.maxDia + 1)
    this.options.checkFun()
  },
  changeToContent: function (content) {
    var Hi = this
    var sum = 0
    var dia = []
    var dias = $('<div>' + content + '</div>').find('.sevice_chat,.me_chat,.robot_chat')
    for (var i = dias.length - 1; i >= 0; i--) {
      if ($(dias[i]).find('.msg_back_success').length == 0) {
        dia.push({
          from: dias[i].className == 'sevice_chat' ? 'client' : dias[i].className == 'robot_chat' ? 'robot' : 'visitor',
          content: $(dias[i]).find('content').html(),
          hasShown: false,
          num: Hi.num,
          time: $(dias[i]).find('time').html()
        })
        Hi.num++
        sum++
      }
    }
    return {
      sum: sum,
      dia: dia
    }
  },
  getSum: function () {
    var Hi = this
    var sum = 0
    for (var i in Hi.historyDias) {
      if (!isNaN(Number(i))) {
        sum += Hi.historyDias[i].content.sum
      }
    }
    return sum
  },
  getHistoryDialogue: function () {
    var Hi = this
    ajax.getHistoryDialogue(Hi.page, Hi.options.visitorId)
      .done(function (data) {
        if (!data || data.length == 0) {
          Hi.over = true
        } else {
          for (var i in data) {
            if (!isNaN(Number(i))) {
              var content = Hi.changeToContent(data[i].content, data[i].from)
              Hi.historyDias.push({
                time: new Date(data[i].leaveTime.replace(/-/g, '/')).getTime(),
                content: content
              })
            }
          }
          Hi.page++
        }
      }).fail(function () {
        Hi.over = true
      })
  },
  getLeaveChat: function () {
    var Hi = this
    ajax.getLeaveChat(Hi.options.visitorId)
      .done(function (data) {
        if (data.length == 0) {

        } else {
          data = data.reverse()
          for (var i in data) {
            if (!isNaN(Number(i))) {
              var content = data[i].content
              if (typeof content !== 'string') {
                try {
                  content = JSON.stringify(content)
                } catch (e) {

                }
              }
              content = dialogue.messageChange(content)
              Hi.leaveDias.push({
                content: Hi.options.leavePre + '' + content,
                from: 'client'
              })
            }
          }
        }
      })
  }
}
$.history = function (options) {
  var history = new HISTORY(options)
  return history
}
