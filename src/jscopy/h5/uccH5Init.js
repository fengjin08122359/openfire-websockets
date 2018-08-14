var ajax = require('../util/ajax.js')
var ucc = require('../util/uccData.js')
var baseUrl = ucc.baseUrl

;
(function (window, $, undefined) {
  var UCCH5INIT = function (options) {
    this.defaults = {},
    this.options = $.extend({}, this.defaults, options)
  }
  UCCH5INIT.prototype = {
    initBasic: function () {
      Alert = $.Alert()
      showBigImgFun = $.showBigImg()
      showBigImgFun.init()
      storage = $.storage({companyPk: ucc.companyPk})
      msgdb = $.msgdb()
      datas = $.db({storage: storage})
      localHistory = $.localHistory({
        storage: storage,
        loadMore: function (items) {
          for (var i = 0, len = items.length; i < len; i++) {
            if (items[i].type != 'date') {
              dialogue.showMsg({
                date: items[i].time,
                from: items[i].from,
                content: items[i].content,
                status: 1
              })
            }
          }
          if ($('#getMore').length > 0) {
            $('#getMore').remove()
          }
          $('#leaveHistory').prepend('<span id="getMore"><span class="c">点此查看历史记录</span><span class="l"></span></span>')
          if (localHistory.lastChat == -1) {
            $('#getMore').hide()
          }
        }
      })
      localHistory.init()
      userDatas = $.userDatas({
        param: params,
        storage: storage,
        storageVisitor: 'visitor',
        storageIpStr: 'ipStr',
        storageChatNum: 'chatNum',
        companyPk: ucc.companyPk,
        aDset: ucc.aDset,
        businessId: '',
        businessName: ''
      })
      visitLimit = $.visitLimit({
        open: params['vl'] ? params['vl'] : 1,
        storage: storage
      })
      visitLimit.init()
      bList = $.businessList({
        businessList: ucc.businessList,
        aDset: ucc.aDset
      })
      workTime = $.workTime({
        BasicSetting: ucc.BasicSetting,
        ExtraSetting: ucc.ExtraSetting,
        show: function (msg) {
          if (msg) {
            $('.dialogue-footer-cover').show()
            if ($('.pop_bg').length == 0) {
              var noticeHtml = '<div class="dialogue-in"><div class="dialogue-pic"><img src="/any800/style/images/mobileImages/newImages/server.png"></div><div class="dialogue-c"><span class="dialogue-dot1"><img src="/any800/style/images/mobileImages/newImages/dialogue_dot1.png"></span><p class="pop_bg"><p class = "pop_msg">' + msg + '</p></p></div></div><div class="clearboth"></div>'
              $('#message').html(noticeHtml)
              $('.fanke-liuyan').on('click', function (event) {
                leaveMessage.show()
              })
              datas.set('iswork', false)
              setTimeout(function () {
                $('.pop_msg').slideDown('slow')
              }, 3e2)
            }
          }
        }
      })
      sensitive = $.sensitive({
        vocabulary: ucc.vocabulary
      })
      changeFaceFun = $.changeFace({
        after: function () {
          var items = this.imgIco
          var html = ''
          for (var i = 0, len = items.length; i < len; i++) {
            var img = items[i][0]
            html += '<span>' + img + '</span>'
          }
          $('.dialogue-footer-face .footer-face').html(html)
        }
      })
    },
    initData: function () {
      var defered = new $.Deferred()
      // 生成chatId
      /* --工作时间显示-- */
      datas.set('iswork', true)
      $('.close').hide()
      datas.set('hasInQueue', false)
      ajax.initChatId(userDatas.getVisitorInfo().visitorId)
        .done(function (e) {
          ucc.chatID = e.chatID
          ucc.browserId = new Date().getTime()
          if (storage.get('oldChatId') != e.chatID) {
            if (storage.get('msgObjCurrentChat')) {
              ajax.closeEchat(storage.get('oldChatId'), storage.get('msgObjCurrentChat').url, datas.get('opName') ? datas.get('opName') : '')
            }
            uccH5Logic.addmonitorJs()
            localHistory.saveCurrent()
            storage.set('oldChatId', e.chatID)
            // 在关闭对话,并且用户有过一次以上留言打开满意度
            datas.set('openSatisfactionAfterCloseChat', false)
            // 已打开满意度将不再打开
            datas.set('hasSatisfaction', false)
            // 保存坐席账号
            datas.set('_workGroupName', '')
            // 取得连接远程服务器的地址.
            datas.set('remoteUrl', '')
            datas.set('opShow', '')
            datas.set('opName', '')
            datas.set('operatorId', '')
          } else if (e.state == 'connnected') {
            storage.set('offChat', ucc.browserId)
            storage.set('browserId', ucc.browserId)
          }
        })
      webSocket = $.webSocket({
        path: '/any800/UccWebSocket/',
        isWs: ucc.isWs,
        visitorId: userDatas.getVisitorInfo().visitorId,
        message: function (chatId, content, messageId) {
          if (chatId == ucc.chatID) {
            if (typeof content === 'object') {
              content = JSON.stringify(content)
            }
            dialogue.showMsg({
              msgid: messageId,
              date: new Date().getTime(),
              content: content,
              from: 'client'
            })
            detectWeb.msgPush('customer', content)
            TimeoutList.startALLTimeout()
          }
        },
        deal: function (type, chatId, json) {
          if (chatId != ucc.chatID) return
          if (type == 'CUTOMER_IS_INVITED') {
            dialogue.toolFun(true)
            dialogue.showMsg({
              msgid: '',
              date: new Date().getTime(),
              content: json,
              from: 'client',
              saveIn: 1
            })
            if (detectWeb.getIsReconnection()) {
              var txt = '[' + detectWeb.getMsgs(5).join(',') + ']' // 取5条数据
              dialogue.sendMessage(txt, 'offLineMessage')
            }
            TimeoutList.startALLTimeout()
          } else if (type == 'CLOSE') {
            if (detectWeb.getIsInitiate()) {
              dialogue.end(6)
            } else {
              dialogue.end(2)
            }
          } else if (type == 'CLOSE_CUSTOMER') {
            dialogue.end(3)
          } else if (type == 'CLOSE_VISITOR') {
            if (dialogue.islive()) {
              langTip.show(langTip.type.system, langTip.key.no_answer_close)
              dialogue.end(2)
            }
          } else if (type == 'OPERATION_TIPS') {
            if (json.params.opType == 'pushsatisfaction') {
              if (satisfaction.hasSat) {
                satisfaction.show()
              }
            } else if (json.params.opType == 'getinfo') {
              visitorInformation.show()
            } else if (json.params.opType == 'uploadfile') {
              dialogue.showMsg({
                msgid: '',
                date: new Date().getTime(),
                content: json.content,
                from: 'client',
                status: 0
              })
            }
          } else if (type == 'CUSTOMER_NETWORK_INTERRUPT') {
            dialogue.end(7)
          } else if (type == 'CUTOMER_ISNOT_INVITED') {
            dialogue.showMsg({
              msgid: '',
              date: new Date().getTime(),
              content: json,
              from: 'client',
              status: 0
            })
            dialogue.end(0)
          } else if (type == 'CUTOMER_REVOKE') {
            msgdb.set(json, 'isRevoke', true)
            if (changeWindow) changeWindow.change()
            localHistory.setCurrent(msgdb.db)
            var $messageHide = $('div[name=' + json + ']')
            if ($messageHide.css('display') != 'none') {
              $messageHide.hide()
              if ($messageHide.prev().hasClass("time")) {
                $messageHide.prev().hide();
              }
              $('#message').append("<div class='msg_back_success'>" + dialogue.getAttr('operatorName') + '已撤回一条消息</div>')
            }
          } else if (type == 'RECEIPT') {
            msgdb.set(json, "checkSend", 1);
            $("div[name="+json+"] .msg_sending").hide()
            $("div[name="+json+"] .msg_repeat").hide()
            if ( changeWindow) changeWindow.change();
            localHistory.setCurrent(msgdb.db);
          }
        },
        connect: function (isConnect) {
          if (dialogue.islive()) {
            if (isConnect) {
              if (detectWeb.getIsInitiate()) {
                systemInfo.show(dialogue.options.msgList.reconnectSuc)
              }
              if (detectWeb.getIsInitiate()) {
                dialogue.toolFun(true)
                detectWeb.checkedSuccess()
              }
            } else {
              if (!detectWeb.getIsInitiate()) {
                dialogue.toolFun(false)
                systemInfo.show(dialogue.options.msgList.reconnectFail)
                detectWeb.checkedFail()
              }
            }
          }
        },
        confirmSend: function (messageId) {
          setTimeout(function () {
            if(msg && msg.checkSend==0){
              $("div[name="+messageId+"] .msg_sending").show()
            }
          },600)
          setTimeout(function(){
            var msg = msgdb.get(messageId);
            if(msg && msg.checkSend==0){
              $("div[name="+messageId+"] .msg_sending").hide()
              $("div[name="+messageId+"] .msg_repeat").show()
              msgdb.set(messageId, "checkSend", 2);
              if ( changeWindow) changeWindow.change();
              localHistory.setCurrent(msgdb.db);
            }
          }, 3000)
        },
        leaveCover: function () {
          uccH5Event.leaveCover()
        },
        open: function () {
          uccH5Event.openCover()
        }
      })
      $("#message").delegate(".msg_repeat","click",function(){
        var item = $(this).parents(".contentMessage");
        if(item.attr("name") && dialogue.islive()){
          var msgid = item.attr("name");
          if (item.prev().hasClass("time")) {
            item.prev().hide();
          }
          item.hide();
          var msg = changeFaceFun.imgToIco(item.find("span.content").html());
          dialogue.sendMessage(msg)
        }
      })
      webSocket.init().done(function () {
        return defered.resolve()
      })
      confirmBox = $.confirm()
      return defered.promise()
    },
    initFunc: function () {
      systemInfo = $('#message').systemInfo()
      mobileInput = $.mobileInput()
      mobileInput.init()
      //      heartBeat = $.heartBeat({detectWeb:function(){
      //      if (!detectWeb.getIsInitiate()) {
      //        dialogue.toolFun(false);
      //        dialogue.showSysMsg(dialogue.options.msgList.reconnectFail);
      //        detectWeb.checkedFail();
      //      }
      //    }});
      detectWeb = $.detectWeb({
        period: 30,
        after: function () {
          dialogue.end(6)
        }
      })
      TimeoutList = $.TimeoutList({
        msgdb: msgdb,
        ops: ucc.OperatorBasicSettings,
        startFun: function () {
          if (dialogue.islive()) {
            if (TimeoutList.isVisitorHalfTimeout()) {
              langTip.show(
                langTip.type.system,
                langTip.key.no_answer_hint
              )
              if (changeWindow)changeWindow.change()
            }
            if (TimeoutList.isVisitorTimeout()) {
              langTip.show(
                langTip.type.system,
                langTip.key.no_answer_close
              )
              dialogue.end(2)
            }
            if (TimeoutList.isClientBusy()) {
              langTip.show(
                langTip.type.system,
                langTip.key.cs_busy
              )
              if (changeWindow)changeWindow.change()
            }
          }
        }
      })

      userDatas.options.chatID = ucc.chatID
      userDatas.options.businessId = ''
      userDatas.options.businessName = ''

      queue = $.queueManager({
        companyPk: ucc.companyPk,
        chatID: ucc.chatID,
        langPk: ucc.defaultLangPk,
        message: JSON.stringify(userDatas.getJsonStr()),
        IpStr: JSON.stringify(userDatas.getIpStr()),
        success: function (result) {
          msgdb.clear()
          changeWindow.clear()
          langTip.show('1', '7')
          langTip.show('1', '9')
          datas.set('remoteUrl', result.url)
          datas.set('opShow', result.opShow)
          datas.set('opName', result.workgroupName)
          datas.set('_workGroupName', result.workgroupName)
          var wname = result.workgroupName.split('-')
          dialogue.setAttr('operatorName', result.opShow ? result.opShow : wname[1])
          dialogue.setAttr('_workGroupName', result.workgroupName)
          dialogue.setAttr('remoteUrl', result.url)
          changeWindow.setMsgObj(result)
          datas.set('hasInQueue', false)
          // queue.reqStartChat(result);
          systemInfo.hide()
          if (result.success == true) {
            // 请求对话成功，开始对话.
            storage.set('chatNum', (storage.get('chatNum') ? storage.get('chatNum') : 0) + 1)
            dialogue.start()
            if (JSON.stringify(userDatas.getJsonStr())) {
              if (ucc.BasicSetting.need == 1) {
                dialogue.sendMessage(JSON.stringify(userDatas.getJsonStr()), 'getinfo')
              }
            }
            return true // 增加返回值 john
            // 20150804
          } else {
            langTip.show(data.langType, data.langKey)
            // 请求对话失败，服务器返回无法接通客服.
            return false // 添加返回值 john
            // 20150804
          }
        },
        fail: function (result) {
          systemInfo.show(decodeURIComponent(decodeURIComponent(result.msg)))
          $('.systemInfromBox #liveMessageId').click(function () {
            leaveMessage.show() // 提示留言;
          })
          $('.systemInfromBox #continueId').click(function () {
            ajax.continueBusinessQueue(userDatas.getJsonStr().businessId)
              .done(function (data) {
                if (data.success == false) {
                  systemInfo.show(data.msg)
                  $('#liveMessageId').click(function () {
                    leaveMessage.show() // 提示留言;
                  })
                } else {
                  queue.index = -1
                  queue.isTimeOut = false
                  queue.getInfo(userDatas.getJsonStr().businessId, 1, false)
                }
              }).fail(function (e) {
                dialogue.showSysMsg('网络异常，请确保网络正常后再重新连接！')
              })
            var $this = $(this)
            $this.unbind('click')
          })
        },
        leave: function (result) {
          systemInfo.show(result.msg)
          $('#liveMessageId').click(function () {
            leaveMessage.show()
          })
        },
        continueque: function (result) {
          systemInfo.show(result.msg)
        },
        always: function (result) {
          systemInfo.show(result.msg)
        }
      })

      queue.reqStartQueue = function (businessId, businessName) { // 排队开始
        if (datas.get('hasInQueue')) return
        datas.set('hasInQueue', true)
        ajax.getDepartment().done(function () {
          bList = $.businessList({
            businessList: ucc.businessList,
            aDset: ucc.aDset
          })
          if (bList.getItemOnline(businessId)) {
            userDatas.options.businessId = businessId
            userDatas.options.businessName = businessName
            userDatas.options.storageOldService = storage.get('oldService')
            var json = userDatas.getJsonStr()
            json.isWs = webSocket.isWork
            queue.options.message = JSON.stringify(json)
            queue.options.IpStr = JSON.stringify(userDatas.getIpStr())
            queue.start(businessId, businessName)
            storage.set('businessId', businessId)
            storage.set('businessName', businessName)
          } else {
            datas.set('hasInQueue', false)
            if($(".onlineCls[data-num]").length==0){
              var b = uccH5Logic.showBusinessList(bList.getParentPk(businessId));
              dialogue.showMsg({
                from: "client",
                content: b,
                saveIn:1
              })
            }
            $(".onlineCls[data-pk='" + businessId + "']").last().click()
          }
        })
      }
      webSocket.connect()
      dialogue = $.dialogue({
        webSocket: webSocket,
        TimeoutList: TimeoutList,
        timeStr: '<div class="time">$1</div>',
        msgEle: '#message',
        visitorId: userDatas.getVisitorInfo().visitorId,
        historyEle: '#leaveHistory',
        textEle: '.dialogue-footer-text',
        storage: storage,
        browserId: ucc.browserId,
        changeFaceFun: changeFaceFun,
        limitReceiveTime: 60,
        chatId: ucc.chatID,
        detectWeb: detectWeb,
        userDatas: userDatas,
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
          ["客服网络中断，当前对话结束，如需继续对话，请<a  href='javascript:void(0)' class='reconnectID'>点击此处</a>重新接入。", '客服网络中断，当前对话结束，如需继续对话，请重新接入。', "Customer's Network has bean interrupted ,end of the conversation."],
          ["网络异常，当前对话结束，如需继续对话，<a href='javascript:void(0)'  class='reconnectID'>请重新接入</a>。", '客服网络中断，当前对话结束，如需继续对话，请重新接入。', 'Network has bean interrupted ,end of the conversation.']
        ],
        showSysMsgFun: function (html) {
          var msgstr = '<center class="systemInfromBox"><span class="systemInfrom">' + html + '</span></center>'
          $('#message').append(msgstr)
          uccH5Event.scrollToBottom()
          msgdb.add({
            type: 'system',
            content: html
          })
          if (changeWindow)changeWindow.change()
        },
        getReceivedFun: function (msgId) {
          /* TimeoutList.addDiaList(msgId, "visitor", new Date().getTime());
          TimeoutList.startALLTimeout(); */
        },
        msgReplace: function (type) {
          var str = '<div class="$1 contentMessage" name="$msgid"><div class="dialogue-pic"><img src="$2"></div>'
          if (type != 'visitor') {
            str += '<div class="dialogue-name">$name</div>'
          }
          str += '<div class="dialogue-c"><span class="$4"><img src="$3"></span><span class="content">$content</span>$msgResend</div></div><div class="clearboth"></div>';
          var typelist = {
            'client': {
              $1: 'dialogue-in',
              $2: appearance.options.clientIco || (baseUrl + '/style/images/mobileImages/newImages/server.png'),
              $3: baseUrl + '/style/images/mobileImages/newImages/dialogue_dot1.png',
              $4: 'dialogue-dot1'
            },
            'visitor': {
              $1: 'dialogue-me',
              $2: appearance.options.visitorIco || (baseUrl + '/style/images/mobileImages/newImages/victors.png'),
              $3: baseUrl + '/style/images/mobileImages/newImages/dialogue_dot2.png',
              $4: 'dialogue-dot2'
            },
            'robot': {
              $1: 'dialogue-in',
              $2: appearance.options.robotIco || (baseUrl + '/style/images/mobileImages/newImages/server.png'),
              $3: baseUrl + '/style/images/mobileImages/newImages/dialogue_dot1.png',
              $4: 'dialogue-dot1'
            }
          }
          var i = typelist[type]
          return str.replace(/\$1/g, i.$1).replace(/\$2/g, i.$2).replace(/\$3/g, i.$3).replace(/\$4/g, i.$4)
        },
        startChat: function () {
          uccH5Init.initSatifaction()
          $('.satisfied').show()
          webSocket.startTimeout()
          storage.set('browserId', ucc.browserId)
          //          heartBeat.init({
          //            businessId: storage.get("businessId"),
          //            chatId: ucc.chatID
          //          });
          $('.close').show()
        },
        endChat: function () {
          datas.set('hasInQueue', false)
          localHistory.saveCurrent()
          ajax.closeEchat(ucc.chatID, dialogue.getAttr('remoteUrl'), dialogue.getAttr('operatroName') ? dialogue.getAttr('operatroName') : '')
          var dia = this
          if (ucc.BasicSetting.jump == 1) {
            if (satisfaction.hasSat && datas.get('openSatisfactionAfterCloseChat') && !datas.get('hasSatisfaction')) {
              var _time = new Date().getTime()
              dialogue.showMsg({
                from: 'client',
                content: "为了提高我们的服务质量,   请点击<span class = 'spans v_info satisfaction' id = 'satisfaction" + _time + "'>填写满意度</span><br>",
                saveIn: 1
              })
            }
          }
          $('.onlineCls[data-num]').removeClass('onlineCls')
          uccH5Logic.blistNum = 1
          ajax.initChatId(userDatas.getVisitorInfo().visitorId)
            .done(function (e) {
              try {
                ucc.chatID = e.chatID
                storage.set('oldChatId', e.chatID)
                ucc.browserId = new Date().getTime()
                storage.set('oldChatId', e.chatID)
                // 在关闭对话,并且用户有过一次以上留言打开满意度
                datas.set('openSatisfactionAfterCloseChat', false)
                // 已打开满意度将不再打开
                datas.set('hasSatisfaction', false)
                var jsonStr = userDatas.getJsonStr()
                uccH5Init.initFunc()
                uccH5Logic.addmonitorJs()
              } catch (e) {
              // console.log(e);
              }
            })
        },
        endChatFun: function () {
          webSocket.endTimeout()
          //            heartBeat.end();
          changeWindow.stopCheck()
        },
        msgFun: function (json) {
          if (json.from == 'visitor' || json.from == 'client') {
            TimeoutList.reset()
          }
          msgdb.add({
            date: json.date,
            msgId: json.msgid,
            type: json.from,
            content: json.content,
            saveIn: json.saveIn ? json.saveIn : 0,
            hasChecked: json.hasChecked
          })
          uccH5Event.showAudio()
          if (json.status == 1) {
            uccH5Event.scrollToTop()
          } else {
            uccH5Event.scrollToBottom()
          }
          if (changeWindow)changeWindow.change()
          if (dialogue.islive())localHistory.setCurrent(msgdb.db)
        },
        sendMessageFun: function (id, txt) {
          TimeoutList.startALLTimeout()
          datas.set('openSatisfactionAfterCloseChat', true)
        },
        closeTool: function () {
          $('.close').hide()
          $('#dialogue-footer-text').blur()
          $('.dialogue-footer-text').html('')
          //          $(".dialogue-footer-text").attr("contenteditable", "false");
          $('#dialogue-send').attr('disabled', 'disabled')
          $('.onlineCls').attr('disabled', 'disabled')
          uccH5Event.checkHeight(4)
          $('#dialogue-biaoqing').attr('disabled', 'disabled')
          $('.dialogue-footer-face').hide()
          $('.fileup input').attr('disabled', true)
        },
        openTool: function () {
          $('.close').show()
          $('#dialogue-send').removeAttr('disabled')
          $('.onlineCls').removeAttr('disabled')
          $('#dialogue-biaoqing').removeAttr('disabled')
          $('.dialogue-footer-text').attr('contenteditable', 'true')
          $('.fileup input').attr('disabled', false)
        },
        confirmSend: function (id, flag) {
          if (flag == 'add' && id) {
            $(".contentMessage[name='']:last").attr('name', id)
          } else if (id) {
            $('.contentMessage[name=' + id + '] ._msg').hide()
          }
        },
        specialFun: function (type, arg) {
          switch (type) {
            case '200':
              TimeoutList.startALLTimeout()
              break
            case '700':
              if (arg.code == 'pushsatisfaction') {
                if (satisfaction.hasSat) {
                  var _time = new Date().getTime()
                  dialogue.showMsg({
                    from: 'client',
                    content: "为了提高我们的服务质量,   请点击<span class = 'spans v_info satisfaction' id = 'satisfaction" + _time + "'>填写满意度</span><br>",
                    saveIn: 1
                  })
                }
              } else if (arg.code == 'getinfo') {
                visitorInformation.show()
              } else if (arg.code == 'uploadfile') {
                dialogue.showMsg({
                  from: 'client',
                  content: JSON.parse(arg.text).content
                })
              }
              break
            case '900': // 对话出现异常，对话结束.
              break
            case '901': // 对话结束，客服退出对话.
              break
            case '110': // 坐席网络终端
              break
            case '111': // 真正的接通了一个客服的标识 @Elijah
              TimeoutList.startALLTimeout()
              break
            case '112': // 坐席已经邀请不进来了 @Elijah
              break
            case '113':
              var json = JSON.parse(arg)
              msgdb.set(json.messageId, 'isRevoke', true)
              if (changeWindow)changeWindow.change()
              localHistory.setCurrent(msgdb.db)
              var $messageHide = $('div[name=' + json.messageId + ']')
              if ($messageHide.css('display') != 'none') {
                $messageHide.hide()
                if ($messageHide.prev().hasClass('dialogue-date')) {
                  $messageHide.prev().hide()
                }
                $('#message').append("<div class='msg_back_success'>" + dialogue.getAttr('operatorName') + '已撤回一条消息</div>')
              }
              break
            case '114': // 切换窗口
              var json = JSON.parse(arg)
              // storage.set("browserId", json.browserId);
              break
            case '902': // 对话超时，对话结束.
              langTip.show(
                langTip.type.system,
                langTip.key.no_answer_close
              )
              break
            default:
              break
          }
        }
      })
      robot = $.robot({
        visitorId: storage.get("visitor").visitorId,
        visitorName: storage.get('visitor').visitorName,
        dialogue: dialogue,
        robotSetting: ucc.BasicSetting.robotSetting,
        companyPk: ucc.companyPk,
        chatId: ucc.chatID,
        ecselfList: ucc.ecselfList,
        langPk: ucc.defaultLangPk,
        changeToNormal: function (argument) {
          //ajax.keepTenQA(ucc.chatID)
          robot.isUse = false
          workTime.iswork()
          if (workTime.type == 0) {
            uccH5Logic.loadScheme() // 加载样式方案
          } else {
            workTime.show()
          }
          dialogue.toolFun(false)
        }
      })
      $("body").delegate(".robotResp","click",function(){
				if(robot.isUse && !dialogue.islive()){
          robot.options.changeToNormal();
        }
			})
			$("body").delegate(".robotSuggsetion","click",function(){
				if(robot.isUse && !dialogue.islive()){
          robot.check($(this).text());
        }
			})
      robot.check()
      if (robot.isUse) {

      }
      langTip = $.langTip({
        companyPk: ucc.companyPk,
        langMap: ucc.langMap,
        defaultLangPk: ucc.defaultLangPk,
        show: function (json) {
          var reg = new RegExp('&quot;', 'g')
          switch (json.langKey) {
            case 1:
              var LS = uccH5Logic.showBusinessList(-1)
              if (!!LS && !!datas.get('iswork')) {
                dialogue.showMsg({
                  from: 'robot',
                  content: json.content.replace(reg, '"') + "<br>请<span class='spans'>输入数字</span>或者<span class='spans'>点击</span>选择相应的业务类型:<br>" + LS,
                  saveIn: 1
                })
              }
              break
            case 2:
              dialogue.showMsg({
                from: 'robot',
                content: json.content.replace(reg, '"'),
                saveIn: 1
              })
              break
            case 3:
              dialogue.showMsg({
                from: 'robot',
                content: json.content.replace(reg, '"'),
                saveIn: 1
              })
              break
            case 4:
              dialogue.showMsg({
                from: 'robot',
                content: json.content.replace(reg, '"'),
                saveIn: 1
              })
              break
            case 5:
              dialogue.showMsg({
                from: 'robot',
                content: json.content.replace(reg, '"'),
                saveIn: 1
              })
              break
            case 6:
              dialogue.showMsg({
                from: 'robot',
                content: json.content.replace(reg, '"'),
                saveIn: 1
              })
              break
            case 7:
              dialogue.showMsg({
                from: 'robot',
                content: json.content.replace(reg, '"'),
                saveIn: 1
              })
              break
            case 9:
              dialogue.showMsg({
                from: 'robot',
                content: json.content.replace(reg, '"'),
                saveIn: 1
              })
              break
            default:
              dialogue.showMsg({
                from: 'robot',
                content: json.content ? json.content.replace(reg, '"') : json.conntent.replace(reg, '"'),
                saveIn: 1
              })
              break
          }
        }
      })

      leaveMessage = $.leaveMessage({
        Alert: Alert,
        messageDisplay: ucc.messageDisplay,
        messageContent: ucc.messageContent,
        messageTypeList: ucc.messageTypeList,
        companyPk: ucc.companyPk,
        generate: function (combo) {
          $('.leaveMessageView .title .cross img,.leaveMessageView .bottom .cancel').on('click', function () {
            leaveMessage.cancel()
          })
          $('.leaveMessageView .col').each(function (index, el) {
            var $this = $(this)
            if ($this.data('type') == 'textarea') {
              $this.append('<textarea  placeholder="' + $this.data('markedwords') + '" ></textarea>')
              return
            }
            $this.append('<div class="colBack"><span class="name">' + $this.data('name') + '</span><span class="input"></span><span class="warning"></span></div>')
            if ($this.data('type') == 'combox') {
              $this.find('.input').append('<span class="names">请选择</span><span class="option"><img class="link" src="/any800/style/images/mobileImages/newImages/link.png"></span><div class="radiocover">留言分类选择</div>')
              for (var i in combo) {
                if (combo[i] && combo[i].pk) {
                  $this.find('.radiocover').append('<div class="sel" data-key="' + combo[i].pk + '"><span class="name">' + combo[i].name + '</span><span class="option"><img class="ok" src="/any800/style/images/mobileImages/newImages/ok.png"></span></div>')
                }
              }
              var item = $this.find('.radiocover .sel').first()
              item.addClass('selected')
              $this.find('.input>.names').html(item.text())
              $this.find('.input>.names').data('key', item.data('key'))
            } else {
              $this.find('.input').append('<input type="text" placeholder="' + $this.data('markedwords') + '" >')
            }
          })
          $(".leaveMessageView [data-type='combox'] .colBack>.input>.names,.leaveMessageView [data-type='combox'] .colBack>.input>.option").on('click', function (event) {
            $('.leaveMessageView .radiocover').show()
          })
          $('.leaveMessageView .radiocover .sel').on('click', function (event) {
            var item = $(this)
            $('.leaveMessageView .radiocover .sel').removeClass('selected')
            item.addClass('selected')
            $(".leaveMessageView [data-type='combox'] .input>.names").html(item.text())
            $(".leaveMessageView [data-type='combox'] .input>.names").data('key', item.data('key'))
            $('.radiocover').hide()
          })
          $('.leaveMessageView .bottom .submit').on('click', function () {
            leaveMessage.submit({
              messageTypePk: $(".leaveMessageView [data-type='combox'] .input>.names").data('key'),
              name: $(".leaveMessageView .board [data-displayname='name']").length > 0 ? $(".leaveMessageView .board [data-displayname='name'] input").val() : '',
              telephone: $(".leaveMessageView .board [data-displayname='telephone']").length > 0 ? $(".leaveMessageView .board [data-displayname='telephone'] input").val() : '',
              email: $(".leaveMessageView .board [data-displayname='email']").length > 0 ? $(".leaveMessageView .board [data-displayname='email'] input").val() : '',
              title: $(".leaveMessageView .board [data-displayname='title']").length > 0 ? $(".leaveMessageView .board [data-displayname='title'] input").val() : '',
              content: $(".leaveMessageView .board [data-displayname='content']").length > 0 ? $(".leaveMessageView .board [data-displayname='content'] textarea").val() : '',
              company: $(".leaveMessageView .board [data-displayname='company']").length > 0 ? $(".leaveMessageView .board [data-displayname='company'] input").val() : '',
              brand: $(".leaveMessageView .board [data-displayname='brand']").length > 0 ? $(".leaveMessageView .board [data-displayname='brand'] input").val() : ''
            })
          })
        },
        reset: function (arg) {
          $(".leaveMessageView .board [data-displayname='messageTypePk'] select").val()
          $(".leaveMessageView .board [data-displayname='name'] input").val('')
          $(".leaveMessageView .board [data-displayname='telephone'] input").val('')
          $(".leaveMessageView .board [data-displayname='email'] input").val('')
          $(".leaveMessageView .board [data-displayname='title'] input").val('')
          $(".leaveMessageView .board [data-displayname='content'] textarea").val('')
          $(".leaveMessageView .board [data-displayname='company'] input").val('')
          $(".leaveMessageView .board [data-displayname='brand'] input").val('')
        },
        warn: function (el, text) {
          Alert.show(text)
          // el.find(".warning").html(text);
        }
      })
      visitorInformation = $.visitorInformation({
        storage: storage,
        Alert: Alert,
        storageVisitor: 'visitor',
        generate: function (combo) {
          $('.visitorInformationView .body .col').each(function (index, el) {
            var $this = $(this)
            $this.append('<div class="colBack"><span class="name">' + $this.data('name') + '</span><span class="input"></span><span class="warning"></span></div>')
            if ($this.data('type') == 'radio') {
              $this.find('.input').append('<span class="name"></span><span class="option"><img class="link" src="/any800/style/images/mobileImages/newImages/link.png"></span><div class="radiocover">性别选择<div class="sel" data-key="1"><span class="name">男</span><span class="option"><img class="ok" src="/any800/style/images/mobileImages/newImages/ok.png"></span></div><div class="sel" data-key="2"><span class="name">女</span><span class="option"><img class="ok" src="/any800/style/images/mobileImages/newImages/ok.png"></span></div><div class="sel" data-key="0"><span class="name">保密</span><span class="option"><img class="ok" src="/any800/style/images/mobileImages/newImages/ok.png"></span></div></div>')
              var value = $this.data('markedwords') ? $this.data('markedwords') : '2'
              var item = $this.find(".input .radiocover .sel[data-key='" + value + "']")
              item.addClass('selected')
              $this.find('.input>.name').html(item.text())
              $this.find('.input>.name').data('key', item.data('key'))
            } else {
              $this.find('.input').append('<input type="text" placeholder="' + ($this.data('placeholder') ? $this.data('placeholder') : '') + '" value="' + ($this.data('markedwords') ? $this.data('markedwords') : '') + '" >')
            }
          })
          $(".visitorInformationView [data-type='radio'] .colBack>.input>.name,.visitorInformationView [data-type='radio'] .colBack>.input>.option").on('click', function (event) {
            $('.visitorInformationView .radiocover').show()
          })
          $('.visitorInformationView .radiocover .sel').on('click', function (event) {
            var item = $(this)
            $('.visitorInformationView .radiocover .sel').removeClass('selected')
            item.addClass('selected')
            $(".visitorInformationView [data-type='radio'] .input>.name").html(item.text())
            $(".visitorInformationView [data-type='radio'] .input>.name").data('key', item.data('key'))
            $('.radiocover').hide()
          })
          $('.visitorInformationView .title .cross img,.visitorInformationView .bottom .cancel').on('click', function () {
            visitorInformation.cancel()
          })
          $('.visitorInformationView .board .input').focus(function (event) {
            visitorInformation.check()
          })
          $('.visitorInformationView .bottom .submit').on('click', function (event) {
            visitorInformation.submit({
              visitorName: $(".visitorInformationView .board [data-displayname='visitorName'] input").val(),
              sex: $(".visitorInformationView [data-type='radio'] .input>.name").data('key'),
              realName: $(".visitorInformationView .board [data-displayname='realName'] input").val(),
              mobile: $(".visitorInformationView .board [data-displayname='phone'] input").val(),
              email: $(".visitorInformationView .board [data-displayname='email'] input").val(),
              QQ: $(".visitorInformationView .board [data-displayname='QQ'] input").val(),
              address: $(".visitorInformationView .board [data-displayname='address'] input").val(),
              company: $(".visitorInformationView .board [data-displayname='company'] input").val()
            })
          })
        },
        warn: function (el, text) {
          Alert.show(text)
        },
        submitFun: function () {
          // if (dialogue.islive()) {
          dialogue.sendMessage(JSON.stringify(userDatas.getJsonStr()), 'getinfo')
          dialogue.showSysMsg('信息提交成功！')
          // }
        },
        cancelFun: function () {
          if (dialogue.islive()) {
            dialogue.sendMessage('访客取消了访客信息收集', 'cancelVisitorInformation')
          }
        }
      })
      if (changeWindow) {
        clearInterval(changeWindow.browserInterval)
      }
      changeWindow = $.changeWindow({
        msgdb: msgdb,
        open: true,
        storage: storage,
        chatId: ucc.chatID,
        browserId: ucc.browserId,
        dialogue: dialogue,
        TimeoutList: TimeoutList,
        data: datas,
        start: function () {
          $('.satisfied').show()
          $('#message').html('')
          $('.leaveMessage').remove()
          $('#fangkexinxi').hide()
          ucc.BasicSetting.need = 0
        },
        end: function () {
          $('.satisfied').hide()
          $('.reminder').hide()
          uccH5Event.leaveCover()
        }
      })
      changeWindow.init()
    },
    initSatifaction: function () {
      satisfaction = $.satisfaction({
        dialogue: dialogue,
        companyPk: ucc.companyPk,
        langPk: ucc.defaultLangPk,
        chatId: ucc.chatID,
        generate: function () {
          $('#message').delegate('.satisfaction', 'click', function () {
            if (satisfaction.hasSat) {
              satisfaction.show()
            }
          })
          if (satisfaction.hasSat) {
            $('.dialogue-footer').append("<div class='satisfied'><img src='/any800/style/images/echat/satisfied.png'></div>")
            $('.satisfied').css({
              position: 'absolute',
              top: -60,
              right: 11,
              'z-index': 99
            }).on('click', function () {
              satisfaction.show()
            })
          }
          $('.satisfied img').css('width', '46px')
          $('.satisfied').hide()
          $('#satisfactionid').hide()
          $('.satisfactionView .fr').each(function (index, el) {
            var $this = $(this)
            var btn = ''
            if (satisfaction.getElementByParent($this.data('pk')).length <= 0) {
              btn = '<img class="ok" src="/any800/style/images/mobileImages/newImages/ok.png">'
            } else {
              btn = '<img class="link" src="/any800/style/images/mobileImages/newImages/link.png">'
            }
            $this.append('<div class="sel"><span class="name">' + $this.data('name') + '</span><span  class="option">' + btn + '</span></div>')
          })
          $('.satisfactionView .sr').each(function (index, el) {
            var $this = $(this)
            $this.append('<div class="sel"><span class="name">' + $this.data('name') + '</span><span  class="option"><img class="ok" src="/any800/style/images/mobileImages/newImages/ok.png"></span></div>')
          })
          $('.satisfactionView .sr').hide()
          $('.satisfactionView .fr').click(function () {
            var $this = $(this)
            $('.satisfactionView .fr').removeClass('selected')
            $this.addClass('selected')
            if ($this.find('.link').length > 0) {
              $('.satisfactionView .fr ').hide()
              $('.satisfactionView .sr ').hide()
              $('.satisfactionView .sr[data-parent ="' + $this.data('pk') + '"]').show()
            }
          })
          $('.satisfactionView .sr').click(function () {
            var $this = $(this)
            $this.toggleClass('selected')
          })
          $('.satisfactionView .bottom .cancel').on('click', function () {
            if ($('.satisfactionView .fr').css('display') == 'none') {
              $('.satisfactionView .fr').show()
              $('.satisfactionView .sr').hide().removeClass('selected')
            } else {
              satisfaction.cancel()
            }
          })
          $('.satisfactionView .title .cross img').on('click', function () {
            satisfaction.cancel()
            $('.satisfactionView .fr').show()
            $('.satisfactionView .sr').hide().removeClass('selected')
          })
          $('.satisfactionView .bottom .submit').on('click', function () {
            if ($('.satisfactionView .fr.selected').length == 0) {
              Alert.show('请选择满意度评价！')
              return
            }
            var pk = $('.satisfactionView .fr.selected').data('pk')
            var opPk = $('.satisfactionView .fr.selected').data('parent')
            var nextSat = ''
            if (satisfaction.getElementByParent(pk).length > 0) {
              if ($('.satisfactionView .sr.selected').length == 0) {
                Alert.show('请选择原因！')
                return
              } else {
                $('.satisfactionView .sr.selected').each(function () {
                  var $this = $(this)
                  nextSat += $this.data('pk') + ','
                })
              }
            }
            datas.set('hasSatisfaction', true)
            satisfaction.submit({
              satisfactionPk: opPk,
              optionPk: pk,
              satisfactionMemo: $('.satisfactionView .mome textarea').val() ? $('.satisfactionView .mome textarea').val() : '',
              nextSatisfactionPk: nextSat
            })
          })
        }
      })
      satisfaction.init()
    },
    initHistory: function () {
      History = $.history({
        visitorId: userDatas.getVisitorInfo().visitorId,
        companyPk: ucc.companyPk,
        dialogue: dialogue,
        generation: function () {
          if (dialogue.islive()) return
          History.getLeaveChat()
          History.showLeaveChat()
          History.check()
          $('#leaveHistory').delegate('#getMore .c', 'click', function (event) {
            History.check()
          })
        },
        checkFun: function (argument) {
          $('#leaveHistory #getMore').remove()
          $('#leaveHistory').prepend('<span id="getMore"><span class="c">点此查看历史记录</span><span class="l"></span></span>')
          $('#leaveHistory #getMore').toggle(History.more)
        }
      })
      History.init()
    },
    initLocalHistory: function () {
      History = $.history({
        show: false,
        visitorId: userDatas.getVisitorInfo().visitorId,
        companyPk: ucc.companyPk,
        dialogue: dialogue,
        generation: function () {
          if (dialogue.islive()) return
          History.getLeaveChat()
          History.showLeaveChat()
          if (localHistory.history.length > 0) {
            localHistory.loadMore()
            $('body').delegate('#getMore', 'click', function () {
              localHistory.loadMore()
            })
          }
        },
        checkFun: function () {}
      })
      History.init()
    }
  }
  $.uccH5Init = function (options) {
    var uccH5Init = new UCCH5INIT(options)
    return uccH5Init
  }
})(window, jQuery)
