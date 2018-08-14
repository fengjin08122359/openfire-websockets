var ajax = require('../util/ajax.js')
/* dialogue.js 对话主进程 */
;(function (window, $, undefined) {
  var DIALOGUE = function (options) {
    this.defaults = {
      webSocket: null,
      timeStr: '<p class="dialogue-date">$1</p>',
      resendStr: '<div class="msg_sending" ><img src="' + require('../../images/sending.gif') + '"></div>',
      callbackStr: '<div class="msg_repeat" ><img src="' + require('../../images/repeat.png') + '"></div>',
			msgEle: '#message',
      visitorId: '',
      historyEle: '#historyChat',
      textEle: '.dialogue-area-write',
      storage: null,
      browserId: '',
      limitReceiveTime: 60,
      changeFaceFun: null,
      chatId: '',
      detectWeb: null,
      userDatas: null,
      msgList: {
        reconnectSuc: '重连服务器成功！',
        reconnectFail: '网络异常，系统正尝试重连服务器！'
      },
      closeStrList: [
        ['对话出现异常，对话结束.', '對話出現異常，對話結束.', 'Dialogue is abnormal, the dialogue.'],
        ['对话结束，客服离开对话.', '對話結束，客服離開對話。', 'End of the conversation, customer service left the conversation.'],
        ['对话超时，对话结束。', '對話超時，對話結束。', 'Dialogue timeout, the end of the conversation.Dialogue timeout, the end of the conversation.'],
        ['您好，为了保证服务质量，我们已经结束了对话，期待再次为您服务。', '對話關閉，客服結束對話', 'dialog closes, end customer dialogue.'],
        ['响应超时，对话结束。', '響應超時，對話結束。', 'Response timeout, end of the conversation.'],
        ['您结束了对话。', '您結束了對話。', 'You end the conversation.'],
        ["网络中断，如需继续对话，请<a href='javascript:void(0)' class='reconnectID'>点击此处</a>重新发起对话", '網絡斷開，對話結束。', 'Network disconnection,end of the conversation.'],
        ["客服网络中断，当前对话结束，如需继续对话，请<a href='javascript:void(0)' onclick=''  class='reconnectID'>点击此处</a>重新接入。", '客服网络中断，当前对话结束，如需继续对话，请重新接入。', "Customer's Network has bean interrupted ,end of the conversation."],
        ["网络异常，当前对话结束，如需继续对话，<a href='javascript:void(0)' onclick=''  class='reconnectID'>请重新接入</a>。", '客服网络中断，当前对话结束，如需继续对话，请重新接入。', 'Network has bean interrupted ,end of the conversation.']
      ],
      showSysMsgFun: function (html) {},
      getReceivedFun: function (msgId) {},
      msgReplace: function (type) {},
      startChat: function () {},
      endChat: function () {},
      sendMessageFun: function (id, txt) {},
      msgFun: function (json) {},
      closeTool: function () {},
      openTool: function () {},
      confirmSend: function (id, flag) {},
      specialFun: function (type, arg) {},
      endChatFun: function () {}
    }
    this.options = $.extend({}, this.defaults, options)
  }
  DIALOGUE.prototype = {
    msgPair: {},
    diaCount: 0,
    isSpeech: false,
    lastSend: '',
    diaList: new Object(),
    readMessageTimeout: null,
    readMessageInterval: null,
    prevTextInterval: null,
    time: new Date().getTime(),
    attr: {
      langType: 0,
      islive: false,
      operatorName: '',
      remoteUrl: '',
      _workGroupName: ''
    },
    getAttr: function (key) {
      return typeof key !== 'undefined' ? this.attr[key] : ''
    },
    setAttr: function (key, value) {
      this.attr[key] = value
    },
    islive: function () {
      return this.getAttr('islive')
    },
    showMsg: function (json) {
      var msgid = json.msgid ? json.msgid : '',
        date = json.date ? json.date : '',
        content = json.content,
        from = json.from ? json.from : 'client',
        status = json.status ? json.status : 0
      var userDatas = this.options.userDatas
      var str = this.options.msgReplace(from)
      var isClient = (from == 'client')
      var name = isClient ? this.getAttr('operatorName') : (from == 'robot') ? (this.islive() ? this.getAttr('operatorName') : '客服') : userDatas.getJsonStr().visitorName ? userDatas.getJsonStr().visitorName : '访客'

      if (!content || content == 'undefined' || content == 'null') return
      var reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/
      var httpUrl = $('<div>' + content + '</div>').text()
      if (from == 'client' && reg.test(httpUrl) && content.indexOf('audio') < 0) {
        var open = '<a href=' + httpUrl + " target='_blank'>" + httpUrl + '</a>'
        content = open
        this.options.specialFun('openWin', open)
      }
      content = this.messageChange(content)
      content = this.options.changeFaceFun.imgToIco(content)
      content = this.options.changeFaceFun.icoToImg(content)
      str = str.replace(/\$name/g, name).replace(/\$content/g, content).replace(/\$msgid/g, msgid).replace(/\$msgResend/g, (from == "visitor") ? (this.options.resendStr + this.options.callbackStr) : "");

      if (status == 0 || !status) {
        if (!date) {
          date = new Date().getTime()
        }
        var timeStr = this.options.timeStr.replace(/\$1/g, new Date(date).Format('hh:mm:ss'))
        $(this.options.msgEle).append(timeStr)
        $(this.options.msgEle).append(str)
      } else {
        if (!date) {
          date = new Date().getTime()
        }
        var timeStr = this.options.timeStr.replace(/\$1/g, new Date(date).Format('yyyy-MM-dd hh:mm:ss'))

        $(this.options.historyEle).prepend(str)
        $(this.options.historyEle).prepend(timeStr)
      }
      this.options.msgFun(json)
    },
    messageChange: function (content) {
      var contentText = content
      try {
        contentText = JSON.parse($('<div>' + content + '</div>').text())
        if (contentText.msgType == 'news') {
          var json = {
            title: contentText.articles[0].title,
            summary: contentText.articles[0].summary,
            url: contentText.articles[0].url,
            img: contentText.articles[0].picUrl
          }
          contentText = '<div class="message_news" data-url="' + json.url + '" ><div class="title">' + json.title + '</div><div class="content"><div class="summary">' + json.summary + '</div><div class="img"><img src="' + json.img + '"/></div></div></div>'
        } else if (contentText.type == 'IDCard') {
          // {"summaryStr":"个人名片","operatorPK":"ff8080815fe3e1d6015ffb77dcaa0011","headURL":"","nickname":"Bulin","companyPk":"ff8080815faad965015fb3541ef6008c","type":"IDCard","detailURL":"http:\/\/ronghe.any800.com \/scrm\/app\/namecard\/detail?staffId=ff8080815fe3e1d6015ffb77dcaa0011"}
          var json = {
            title: contentText.nickname,
            summary: contentText.summaryStr,
            url: contentText.detailURL,
            img: contentText.headURL ? contentText.headURL : './bootstrapUI/any800/images/client.png'
          }
          contentText = '<div class="message_news IDCard" data-url="' + json.url + '" ><div class="img"><img src="' + json.img + '"/></div><div class="content"><div class="title">' + json.title + '</div><div class="summary">' + json.summary + '</div></div></div>'
        } else if (contentText.type == 'knowledgeCard') {
          // {"coverUrl":"","title":"测试插件","companyPk":"ff8080815faad965015fb3541ef6008c","type":"knowledgeCard","description":"随便写","url":"https:\/\/www.baidu.com "}
          var json = {
            title: contentText.title,
            summary: contentText.description,
            url: contentText.url,
            img: contentText.coverUrl ? contentText.coverUrl : './bootstrapUI/any800/images/client.png'
          }
          contentText = '<div class="message_news knowledgeCard" data-url="' + json.url + '" ><div class="content"><div class="title">' + json.title + '</div><div class="summary">' + json.summary + '</div><div class="img"><img src="' + json.img + '"/></div></div></div>'
        } else {
          contentText = content
        }
      } catch (e) {}
      return contentText
    },
    showSysMsg: function (html, hidden) {
      if (!html || html == 'undefined' || html == 'null') return
      this.options.showSysMsgFun(html, hidden)
    },
    start: function () {
      var dia = this
      dia.setAttr('islive', true)
      dia.options.storage.set('browserId', dia.options.browserId)
      if (!!dia.options.webSocket && dia.options.webSocket.isWork) {
        // dia.options.webSocket.connect();
        dia.prevTextInterval = window.setInterval(function () {
          dia.preVstText()
        }, 2000)
      } else {
        dia.startReadMessageTimeout()
        clearInterval(dia.prevTextInterval)
        clearInterval(dia.readMessageInterval)
        dia.readMessageInterval = window.setInterval(function () {
          if (new Date().getTime() - dia.time > 10 * 1000) {
            dia.startReadMessageTimeout()
          }
        }, 10 * 1000)
        dia.prevTextInterval = window.setInterval(function () {
          dia.preVstText()
        }, 2000)
      }
      dia.toolFun(true)
      dia.options.startChat()
    },
    startReadMessageTimeout: function () {
      var dia = this
      dia.time = new Date().getTime()
      if (dia.readMessageTimeout) {
        clearTimeout(dia.readMessageTimeout)
      }
      dia.readMessageTimeout = window.setTimeout(function () {
        dia.readMessage()
      }, 1000)
    },
    end: function (type) {
      var dia = this
      if (!dia.islive()) return
      dia.setAttr('islive', false)
      if (!!dia.options.webSocket && dia.options.webSocket.isWork) {
        // dia.options.webSocket.close();
      } else {
        if (dia.readMessageTimeout) {
          clearTimeout(dia.readMessageTimeout)
        }
        dia.readMessageTimeout = null
        clearInterval(dia.readMessageInterval)
        dia.readMessageInterval = null
        clearInterval(dia.prevTextInterval)
        dia.prevTextInterval = null
      }
      dia.toolFun(false)
      if (typeof type === 'number') {
        dia.options.storage.set('browserId', '')
        dia.showSysMsg(this.options.closeStrList[type][dia.getAttr('langType')], true)
        dia.options.endChat()
      }
      dia.options.endChatFun()
    },
    readMessage: function () {
      var dia = this
      var detectWeb = dia.options.detectWeb
      if (!dia.getAttr('remoteUrl')) {
        return
      }
      ajax.readMessage(dia.options.chatId, dia.getAttr('remoteUrl'))
        .done(function (data) {
          dia.startReadMessageTimeout()
          try {
            if (detectWeb.getIsInitiate()) {
              dia.showSysMsg(dia.options.msgList.reconnectSuc)
            }
            dia.messageDeal(data)
            if (detectWeb.getIsInitiate()) {
              dia.toolFun(true)
              detectWeb.checkedSuccess()
            }
          } catch (e) {}
        }).fail(function (data) {
          dia.startReadMessageTimeout()
          if (!detectWeb.getIsInitiate()) {
            dia.toolFun(false)
            dia.showSysMsg(dia.options.msgList.reconnectFail)
            detectWeb.checkedFail()
          }
        })
    },
    messageDeal: function (result) {
      var dia = this
      var detectWeb = dia.options.detectWeb
      if (result && result.root) {
        if (result.root.length == 0) {
          return false
        }
        for (var i = 0; i < result.root.length; i++) {
          var textSW = result.root[i].type.text
          if (textSW == '200') { // 普通对话
            if (result.root[i].from && result.root[i].date != '') {
              if (result.root[i].langType > 0 && result.root[i].langKey > 0) {

              } else {
                var json = JSON.parse(result.root[i].text)
                dia.addDiaList(json.messageId, new Date().getTime(), json.content, 0, 'client')
                if (typeof json.content === 'object') {
                  json.content = JSON.stringify(json.content)
                }
                json.content = json.content.replace(/\n/ig, '<br>')
                dia.showMsg({
                  msgid: json.messageId,
                  date: new Date().getTime(),
                  content: json.content,
                  from: 'client',
                  status: 0
                })
                dia.options.specialFun('200', {
                  msgid: json.messageId,
                  content: json.content,
                  time: new Date().getTime()
                })
                detectWeb.msgPush('customer', json.content)
              }
            }
          } else if (textSW == '700') { // 满意度、发送文件等.
            dia.options.specialFun('700', result.root[i])
          } else if (textSW == '900') { // 对话出现异常，对话结束.
            if (detectWeb.getIsInitiate()) {
              dia.end(6)
            } else {
              dia.end(2)
            }
            dia.options.specialFun('900', '')
          } else if (textSW == '901') { // 对话结束，客服退出对话.
            dia.end(3)
            dia.options.specialFun('901', '')
          } else if (textSW == '110') { // 坐席网络中断
            dia.end(7)
            dia.options.specialFun('110', '')
          } else if (textSW == '111') { // 真正的接通了一个客服的标识 @Elijah
            dia.toolFun(true)
            dia.showMsg({
              msgid: '',
              date: new Date().getTime(),
              content: JSON.parse(result.root[i].text).content,
              from: 'client',
              status: 0,
              saveIn: 1
            })
            // TODO 如果是当前对话是重连的则这里调用发消息的接口将
            // 5通对话带入到新的坐席上 2015/06/24
            if (detectWeb.getIsReconnection()) {
              var txt = '[' + detectWeb.getMsgs(5).join(',') + ']' // 取5条数据
              dia.sendMessage(txt, 'offLineMessage')
            }
            dia.options.specialFun('111', result.root[i])
          } else if (textSW == '112') { // 坐席已经邀请不进来了 @Elijah
            dia.showMsg({
              msgid: '',
              date: new Date().getTime(),
              content: JSON.parse(result.root[i].text).content,
              from: 'client',
              status: 0
            })

            dia.end(0) //
            dia.options.specialFun('112', result.root[i])
          } else if (textSW == '113') {
            dia.options.specialFun('113', result.root[i].text)
          } else if (textSW == '114') { // 切换窗口
            dia.options.specialFun('114', result.root[i].text)
          } else if (textSW == '902') { // 对话超时，对话结束.
            if (dia.islive()) {
              dia.options.specialFun('902', result.root[i].text)
              dia.end(2)
            }
          }
        }
      }
    },
    addDiaList: function (msgId, time, content, status, from) {
      if (!msgId) {
        msgId = 'Other' + new Date().getTime()
        this.diaCount++
      }
      this.diaList[msgId] = {
        time: time,
        from: from,
        content: content,
        status: status,
        isReceived: from == 'client' ? 1 : 0,
        receivedTime: 0 // 0未读,1已读,2未读超时
      }
      return msgId
    },
    getReceived: function () {
      var dia = this
      var diaList = this.diaList,
        box = []
      for (var i in diaList) {
        if (diaList[i].isReceived == 0) {
          box.push(i)
        }
      }
      for (var k in box) {
        if (!isNaN(Number(k))) {
          ajax.getReceivedMID(dia.msgPair[box[k]], this.getAttr('_workGroupName'))
            .done(function (data) {
              dia.options.getReceivedFun(box[k])
              dia.diaList[box[k]].isReceived = 1
              dia.options.confirmSend(box[k])
              if (data.success) {

              } else {
                if (dia.diaList[box[k]].receivedTime >= dia.options.limitReceiveTime) {
                  dia.diaList[box[k]].isReceived = 2
                } else {
                  dia.diaList[box[k]].receivedTime++
                }
              }
            })
        }
      }
    },
    preVstText: function () {
      var lastSend = this.lastSend
      var txtContent = $(this.options.textEle).text().replace(/\s+/g, '')
      if (this.lastSend != txtContent) {
        this.lastSend = txtContent
        if (txtContent) {
          this.sendMessage(txtContent, 'foreknowledge')
        } else {
          this.sendMessage(' ', 'foreknowledge')
        }
      }
    },
    sendMessage: function (txt, code, allowSend) {
      var dia = this
      var arrEntities = {
        'lt': '<',
        'gt': '>',
        // 'nbsp': ' ',
        'amp': '&',
        'quot': '"'
      }
      txt = txt.replace(/&(lt|gt|amp|quot);/ig, function (all, t) {
        return arrEntities[t]
      })

      if (code == 'acceptRq') {
        this.isSpeech = true
      }
      if (code == 'offLineMessage') { // 将断线重连的离线消息带入到坐席
      } else if (code != 'send_file') {} else {
        code = ''
      }
      txt = txt.replace(/<a/g, "<a target='_blank'") // 给所有链接添加"<a
      // target='_blank'
      var msgId = dia.addDiaList('', new Date().getTime(), txt, 0, 'visitor')
      var time = new Date().getTime()
      if (!code && !allowSend) {
        dia.showMsg({
          msgid: msgId,
          date: time,
          content: txt,
          from: 'visitor',
          status: 0
        })

        dia.options.sendMessageFun(msgId, txt)
      }
      if (!!dia.options.webSocket && dia.options.webSocket.isWork && !code) {
        dia.options.webSocket.send({
          date: time,
          message: txt,
          chatID: dia.options.chatId
        })
        return
      }
      ajax.sendMessage(dia.options.chatId, txt, code || '', dia.getAttr('remoteUrl'), dia.options.visitorId)
        .done(function (data) {
          if (data.success == true) {
            var id = data.messageId
            if (data.message == 'back') {
              dia.options.confirmSend(id) // ios,直接隐藏
            } else {
              dia.options.confirmSend(id, 'add')
            }
            dia.msgPair[msgId] = id
            dia.callbackFun(msgId, id)
          }
        })
    },
    callbackFun: function (msgId, id) {
      var dia = this
      setTimeout(function () {
        if (!dia.diaList[msgId].isReceived) {
          $('[name=' + msgId + '] .msg_').html(dia.options.callbackStr)
        }
      }, 60 * 1000)
    },
    toolFun: function (type) {
      if (type) { // 开启
        this.options.openTool()
      } else { // 关闭
        this.options.closeTool()
      }
    },
    expand: function (json) {
      var w = this
      this.options = $.extend({}, this.options, json)
    }
  }
  $.dialogue = function (options) {
    var dialogue = new DIALOGUE(options)
    return dialogue
  }
})(window, jQuery)
