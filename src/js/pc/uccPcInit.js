var ajax = require('../util/ajax.js')
var ucc = require('../util/uccData.js')
var baseUrl = ucc.baseUrl
;
(function (window, $, undefined) {
  var UCCPCINIT = function (options) {
    this.defaults = {}, this.options = $.extend({}, this.defaults, options)
  }
  UCCPCINIT.prototype = {
    initBasic: function () {
      Alert = $.Alert()
      showBigImgFun = $.showBigImg()
      showBigImgFun.init()
      storage = $.storage({companyPk: ucc.companyPk})
      msgdb = $.msgdb()
      datas = $.db({
        storage: storage
      })
      localHistory = $.localHistory({
        storage: storage
      })
      localHistory.init()
      systemInfo = $('#sysmsg').systemInfo()
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
      skin = $.setSkin({
        aDset: ucc.aDset
      })
      visitLimit = $.visitLimit({
        open: params['vl'] ? params['vl'] : 1,
        storage: storage
      })
      visitLimit.init()
      fontStyle = $.fontStyle({
        storage: storage
      })
      workTime = $.workTime({
        BasicSetting: ucc.BasicSetting,
        ExtraSetting: ucc.ExtraSetting,
        show: function (msg) {
          if (msg) {
            if ($('.pop_bg').length == 0) {
              var noticeHtml = '<div class="dialogue-in"><p class="dialogue-pic"><img src="/any800/style/css/images/service.png"></p><div class="dialogue-in-r"><p class="in-name">客服</p><div class="dialogue-in-c"><span class="d-dot1"><img src="/any800/style/css/images/d-dot1.png"></span><p><span>' + msg + '</span></p></div></div></div>'
              $('#message').html(noticeHtml)
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
            html += "<p><span class='face-pic'>" + img + '</span></p>'
          }
          $('.face-c').html(html)
          // 表情弹出
          $('.face-pic').hover(function () {
            $(this).addClass('hover')
            $(this).siblings('.face-text').show()
          }, function () {
            $(this).removeClass('hover')
            $(this).siblings('.face-text').hide()
          })
          // 点击表情，将表情放到输入框
          $('.face-pic').click(function () {
            $('.tool3').removeClass('click')
            $('.face-c').hide()
            var img = $(this).find('img').clone()
            // $(img).css({'max-width':'28px','max-height':'28px'});
            $('.dialogue-area-write').append(img)
          })
        }
      })
    },
    initData: function () {
      var defered = new $.Deferred()
      datas.set('canSend', true)
      // 是否在工作时间内
      datas.set('iswork', true)
      datas.set('hasInQueue', false)
      ucc.sendKey = storage.get('sendKey') ? storage.get('sendKey') : 0
      // 生成chatId
      ajax.initChatId(userDatas.getVisitorInfo().visitorId)
        .done(function (e) {
          ucc.chatID = e.chatID
          ucc.browserId = new Date().getTime()
          if (storage.get('oldChatId') != e.chatID) {
            if (storage.get('msgObjCurrentChat')) {
              ajax.closeEchat(storage.get('oldChatId'), storage.get('msgObjCurrentChat').url, datas.get('opName') ? datas.get('opName') : '')
            }
            uccPcLogic.addmonitorJs() // 浏览轨迹
            localHistory.saveCurrent()
            storage.set('oldChatId', e.chatID)
            // 在关闭对话,并且用户有过一次以上留言打开满意度
            datas.set('openSatisfactionAfterCloseChat', false)
            // 已打开满意度将不再打开
            datas.set('hasSatisfaction', false)
            // 是否已经发送广告
            datas.set('adv', false)
          } else if (e.state == 'connnected') {
            storage.set('offChat', ucc.browserId)
            storage.set('browserId', ucc.browserId)
          }
        })
      webSocket = $.webSocket({
        path: '/any800/UccWebSocket/',
        isWs: ucc.isWs,
        visitorId: userDatas.getVisitorInfo().visitorId + '?' + ucc.browserId,
        message: function (chatId, content, messageId) {
          if (chatId == ucc.chatID) {
            if (typeof content === 'object') {
              content = JSON.stringify(content)
            }
            if (!msgdb.get(messageId)) {
              dialogue.showMsg({
                msgid: messageId,
                date: new Date().getTime(),
                content: content,
                from: 'client'
              })
              detectWeb.msgPush('customer', content)
              uccPcEvent.titleGlitter() // 消息闪烁
              TimeoutList.startALLTimeout()
            }
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
            $('#face_08').css('display', 'none')
            $('.sendFile').hide() // 上传按钮
          } else if (type == 'CLOSE_CUSTOMER') {
            dialogue.end(3)
            $('#face_08').css('display', 'none')
            $('.sendFile').hide() // 上传按钮
          } else if (type == 'CLOSE_VISITOR') {
            if (dialogue.islive()) {
              langTip.show(langTip.type.system, langTip.key.no_answer_close)
              $('#face_08').css('display', 'none')
              $('.sendFile').hide()
            }
          } else if (type == 'OPERATION_TIPS') {
            if (json.params.opType == 'pushsatisfaction') {
              satisfaction.show()
            } else if (json.params.opType == 'sendFileEntry') {
              uccPcEvent.showFile(json.params.flag)
            } else if (json.params.opType == 'getinfo') {
              visitorInformation.show()
            } else if (json.params.opType == 'foreknowledge') {
              var rd = $('.reminder').length
              if (rd != 0) {
                if (json.content == '1') {
                  $('.reminder').show()
                } else {
                  $('.reminder').hide()
                }
              } else {
                var reminder = '<div class= "reminder"><div class="rp"></div>对方正在输入...</div>'
                $('body').append(reminder)
                $('.reminder').css({
                  position: 'absolute',
                  bottom: '164px',
                  left: '5px'
                })
              }
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
            $('#face_08').css('display', 'none')
            $('.sendFile').hide() // 上传按钮
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
              if ($messageHide.prev().hasClass('dialogue-date')) {
                $messageHide.prev().hide()
              }
              $('#message').append('<p class="dialogue-date">' + new Date().Format('hh:mm:ss') + '</p>' + "<div class='msg_back_success'>" + dialogue.getAttr('operatorName') + '已撤回一条消息</div>')
            }
          } else if (type == 'RECEIPT') {
            msgdb.set(json, "checkSend", 1);
						$("div[name="+json+"] .msg_sending").hide()
						$("div[name="+json+"] .msg_repeat").hide()
						if ( changeWindow) changeWindow.change();
						localHistory.setCurrent(msgdb.db);
          } else if (type == 'VS_QUEUE_INDEX') {
            var result = json
            if (result) {
              if (result.success == true) {
                // que.options.always(result);
                queue.options.success(result)
              } else {
                if (result.inqueue == true) {
                  queue.options.always(result)
                } else if (result.errorCode == false) {
                  queue.options.fail(result)
                } else if (result.server == false) {
                  queue.options.fail(result)
                } else if (result.inqueue == true) {
                  queue.options.always(json)
                } else {
                  queue.options.leave(result)
                }
              }
            }
          }
        },
        connect: function (isConnect) {
          if (dialogue.islive()) {
            if (isConnect) {
              if (detectWeb.getIsInitiate()) {
                dialogue.showSysMsg(dialogue.options.msgList.reconnectSuc, true)
              }
              if (detectWeb.getIsInitiate()) {
                dialogue.toolFun(true)
                detectWeb.checkedSuccess()
              }
            } else {
              if (!detectWeb.getIsInitiate()) {
                dialogue.toolFun(false)
                dialogue.showSysMsg(dialogue.options.msgList.reconnectFail, true)
                detectWeb.checkedFail()
              }
            }
          }
        },
        confirmSend: function (messageId) {
          setTimeout(function(){
						var msg = msgdb.get(messageId);
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
					},3000)
        },
        leaveCover: function () {
          uccPcEvent.leaveCover()
        },
        open: function () {
          uccPcEvent.openCover()
        }
      })
      $("#message").delegate(".msg_repeat","click",function(){
				var item = $(this).parents(".contentMessage");
				if(item.attr("name") && dialogue.islive()){
					var msgid = item.attr("name");
					if (item.prev().hasClass("dialogue-date")) {
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
      return defered.promise()
    },
    initSatifaction: function () {
      satisfaction = $.satisfaction({
        dialogue: dialogue,
        companyPk: ucc.companyPk,
        langPk: ucc.defaultLangPk,
        chatId: ucc.chatID,
        generate: function () {
          $('.satisfactionView .fr').each(function (index, el) {
            var $this = $(this)
            $this.append('<input type="radio" name="fr"><span>' + $this.attr('data-name') + '</span>')
          })
          $('.satisfactionView .sr').each(function (index, el) {
            var $this = $(this)
            $this.append('<input type="checkbox" class="srCheck" name="' + $this.data('parent') + '"><span>' + $this.attr('data-name') + '</span>')
          })
          $('.satisfactionView .sr').hide()
          $('.satisfactionView .fr input[name = "fr"]').click(function () {
            var $this = $(this)
            $('.satisfactionView .sr ').hide()
            $('.satisfactionView .sr input[name ="' + $this.parents('.fr').data('pk') + '"]').parents('.sr').css('display', 'inline')
          })
          $('.satisfactionView .fr input[type=radio]').first().click()
          $('.satisfactionView .title .cross img,.satisfactionView .bottom .cancel').on('click', function () {
            satisfaction.cancel()
          })
          $('.satisfactionView .bottom .submit').on('click', function () {
            var selected = $('.satisfactionView .fr input[name = "fr"]').filter(':checked')
            if (selected.length == 0) {
              Alert.show('请选择满意度评价！')
              return
            }
            var pk = selected.parents('.fr').data('pk')
            var nextSat = ''
            if (satisfaction.getElementByParent(pk).length > 0) {
              if ($('.satisfactionView .sr input[name = "' + pk + '"]').filter(':checked').length == 0) {
                Alert.show('请选择原因！')
                return
              } else {
                $('.satisfactionView .sr input[name = "' + pk + '"]').filter(':checked').each(function () {
                  var $this = $(this)
                  nextSat += $this.parents('.sr').data('pk') + ','
                })
              }
            }
            datas.set('hasSatisfaction', true)
            satisfaction.submit({
              satisfactionPk: selected.parents('.fr').data('parent'),
              optionPk: selected.parents('.fr').data('pk'),
              satisfactionMemo: $('.satisfactionView .mome textarea').val() ? $('.satisfactionView .mome textarea').val() : '',
              nextSatisfactionPk: nextSat
            })
          })
        }
      })
      satisfaction.init()
      if (!satisfaction.hasSat) {
        $('.tool6').hide()
      }
    },
    initFunc: function () {
      visitorRobot = $.visitorRobot({
        companyPk: ucc.companyPk,
        visitorId: storage.get("visitor").visitorId,
        chatId: ucc.chatID,
        newAfter:function(json){
					var html = '';
					for (var i in json) {
						if (!isNaN(Number(i))) {
							var j = json[i];
							html += '<div class="item" data-question="' + j + '">' + j + '</div>';
						}
					}
					html = '<div class="visitorRobot">' + html + '</div>';
					$(".visitorRobot").remove();
					$(".dialogue-area").append(html);
					$(".visitorRobot .item").on("click", function() {
						robot.click = true;
						$(".dialogue-area-write").html($(this).data("question"));
						$(".send").click();
						$(".visitorRobot").hide();
					})
				},
        after: function (json) {
          var html = ''
          for (var i in json) {
            if (!isNaN(Number(i))) {
              var j = json[i]
              var str = j.question
              var hl = j.highlightedArray
              hl = hl.insertSort(function (a, b) {
                return a < b
              })
              for (var p = 0, len = hl.length; p < len; p++) {
                str = str.substring(0, hl[p], len) + "<div class='red'>" + str.charAt(hl[p]) + '</div>' + str.substring(hl[p] + 1, str.length)
              }
              html += '<div class="item" data-question="' + j.question + '">' + str + '</div>'
            }
          }
          html = '<div class="visitorRobot">' + html + '</div>'
          $('.visitorRobot').remove()
          $('.dialogue-area').append(html)
          $('.visitorRobot .item').on('click', function () {
            robot.click = true
            $('.dialogue-area-write').html($(this).data('question'))
            $('.send').click()
            $('.visitorRobot').hide()
          })
        },
        init: function () {
          var DOMCheck = null
          $('.dialogue-area-write').on('focus', function () {
            if (visitorRobot.ok) {
              if (DOMCheck) {
                window.clearInterval(DOMCheck)
                DOMCheck = null
              }
              DOMCheck = setInterval(function () {
                if (visitorRobot.ok) {
                  visitorRobot.check($('.dialogue-area-write').text())
                } else {
                  if (DOMCheck) {
                    window.clearInterval(DOMCheck)
                    DOMCheck = null
                  }
                }
              }, 1000)
            }
          }).on('blur', function () {
            if (DOMCheck) {
              window.clearInterval(DOMCheck)
              DOMCheck = null
            }
          })
        },
        hide: function () {
          $('.visitorRobot').remove()
        }
      })
      visitorRobot.init()
      //      heartBeat = $.heartBeat({detectWeb:function(){
      //        if (!detectWeb.getIsInitiate()) {
      //          dialogue.toolFun(false);
      //          dialogue.showSysMsg(dialogue.options.msgList.reconnectFail);
      //          detectWeb.checkedFail();
      //        }
      //      }});

      detectWeb = $.detectWeb({
        period: 30,
        after: function () {
          dialogue.end(6)
          //          closeMediaChat();
          $('#face_08').css('display', 'none')
          $('.sendFile').hide() // 上传按钮
        }
      })

      TimeoutList = $.TimeoutList({
        msgdb: msgdb,
        ops: ucc.OperatorBasicSettings,
        startFun: function () {
          if (dialogue.islive()) {
            if (TimeoutList.isVisitorHalfTimeout()) {
              langTip.show(
                langTip.type.system, langTip.key.no_answer_hint)
              if (changeWindow) changeWindow.change()
            }
            if (TimeoutList.isVisitorTimeout()) {
              langTip.show(
                langTip.type.system, langTip.key.no_answer_close)
            }
            if (TimeoutList.isClientBusy()) {
              langTip.show(
                langTip.type.system, langTip.key.cs_busy)
              if (changeWindow) changeWindow.change()
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
          $('.service-info p:gt(1)').remove()
          $('#sysmsg').html('')
          datas.set('reconnectData', result)
          datas.set('opName', result.workgroupName)
          datas.set('_workGroupName', result.workgroupName)
          dialogue.setAttr('_workGroupName', result.workgroupName)
          dialogue.setAttr('remoteUrl', result.url)
          var wname = result.workgroupName.split('-')
          dialogue.setAttr('operatorName', result.opShow ? result.opShow : wname[1])
          datas.set('hasInQueue', false)
          var recored = robot.recored
          var recoreds = ''
          if (recored.length > 0) {
            //            recored = recored.slice(recored.length > 10 ? recored.length - 10 : 0, recored.length);
            for (var i in recored) {
              dialogue.showMsg(recored[i])
              if (recored[i].from == 'visitor') {
                recoreds += "<div class='robotmsg' data-time='" + recored[i].date + "' data-from='" + recored[i].from + "'  data-content='" + recored[i].content + "'  >访客问:<div>" + recored[i].content + '</div></div>'
              } else if (recored[i].from == 'robot') {
                recoreds += "<div class='robotmsg' data-time='" + recored[i].date + "' data-from='" + recored[i].from + "'  data-content='" + recored[i].content + "' >机器人答:<div>" + recored[i].content + '</div></div>'
              }
            }
          }
          robot.recored = []
          langTip.show('1', '7')
          langTip.show('1', '9')

          storage.set('canSendFile', false)
          storage.set('oldService', result.workgroupName) // 保存当前接入的坐席名称
          // queue.reqStartChat(result); // 对话开始，邀请客服
          changeWindow.setMsgObj(result)
          // 将这里的逻辑移动到真正邀请了客服再开始做
          if (result.success == true) {
            // 请求对话成功，开始对话.
            dialogue.start()
            // 对话次数
            storage.set('chatNum', Number(userDatas.getJsonStr().chatNum) + 1)
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
          systemInfo.show(decodeURIComponent(decodeURIComponent(result.msg)).replace(/\+/g, ' '))
          $('#liveMessageId').click(function () {
            leaveMessage.show() // 提示留言;
          })
          $('#continueId').click(function () {
            ajax.continueBusinessQueue(userDatas.getJsonStr().businessId)
              .done(function (data) {
                if (data.success == false) {
                  systemInfo.show(data.msg)
                  $('#bl').remove()
                  $('#liveMessageId').click(function () {
                    leaveMessage.show() // 提示留言;
                  })
                } else {
                  queue.index = -1
                  systemInfo.show(data.msg)
                  queue.isTimeOut = false
                  queue.getInfo(userDatas.getJsonStr().businessId, 1, false)
                }
              }).fail(function (e) {
                systemInfo.show('网络异常，请确保网络正常后再重新连接！')
              })
          })
        },
        leave: function (result) {
          systemInfo.show(result.msg)
          $('#bl').remove()
          $('#liveMessageId').click(function () {
            leaveMessage.show() // 提示留言;
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
            storage.set('businessId', businessId)
            storage.set('businessName', businessName)
            $('.service-info p:gt(1)').remove()
            $('#sysmsg').html('')
            queue.start(businessId, businessName)
          } else {
            datas.set('hasInQueue', false)
            uccPcLogic.showBusinessList(bList.getParentPk(businessId))
            $(".service-info a[data-pk='" + businessId + "']").click()
            leaveMessage.show()
          }
        })
      }
      webSocket.connect()
      dialogue = $.dialogue({
        webSocket: webSocket,
        TimeoutList: TimeoutList,
        timeStr: '<p class="dialogue-date">$1</p>',
        msgEle: '#message',
        visitorId: userDatas.getVisitorInfo().visitorId,
        historyEle: '#historyChat',
        textEle: '.dialogue-area-write',
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
          ["网络中断，如需继续对话，请<a class='reconnectID'>点击此处</a>重新发起对话", '網絡斷開，對話結束。', 'Network disconnection,end of the conversation.'],
          ["客服网络中断，当前对话结束，如需继续对话，请<a  class='reconnectID'>点击此处</a>重新接入。", '客服网络中断，当前对话结束，如需继续对话，请重新接入。', "Customer's Network has bean interrupted ,end of the conversation."],
          ["网络异常，当前对话结束，如需继续对话，<a  class='reconnectID'>请重新接入</a>。", '客服网络中断，当前对话结束，如需继续对话，请重新接入。', 'Network has bean interrupted ,end of the conversation.']
        ],
        showSysMsgFun: function (html, hidden) {
          var msgstr = '<div style="margin:15px 20px"><span class="font">' + html + '</span></div>'
          $('#message').append(msgstr)

          if (!hidden) {
            msgdb.add({
              type: 'system',
              content: html
            })
          }
          uccPcEvent.scrollTop()
          if (changeWindow) changeWindow.change()
          localHistory.setCurrent(msgdb.db)
        },
        getReceivedFun: function (msgId) { /* TimeoutList.startALLTimeout(); */
        },
        msgReplace: function (type) {
          // 预留$content,$msgid,$name,$msgResend
          var str = '<div class="$1 contentMessage" name="$msgid"><p class="dialogue-pic"><img src="$2"></p><div class="dialogue-in-r"><p class="in-name">$name</p><div class="dialogue-in-c"><span class="$4"><img src="$3"></span><span class="content">$content</span>$msgResend</div></div></div><div class="clearboth"></div>'
          var typelist = {
            'client': {
              $1: 'dialogue-in',
              $2: appearance.options.clientIco || (baseUrl + '/style/css/images/service.png'),
              $3: baseUrl + '/style/css/images/d-dot1.png',
              $4: 'd-dot1'
            },
            'visitor': {
              $1: 'dialogue-me',
              $2: appearance.options.visitorIco || (baseUrl + '/style/css/images/me.png'),
              $3: baseUrl + '/style/css/images/d-dot2.png',
              $4: 'd-dot2'
            },
            'robot': {
              $1: 'dialogue-in',
              $2: appearance.options.robotIco || (baseUrl + '/style/css/images/robot.png'),
              $3: baseUrl + '/style/css/images/d-dot1.png',
              $4: 'd-dot1'
            }
          }
          if (fontStyle.isShow() && type == 'visitor') {
            var msgStr = '<span style="font-size:' + fontStyle.get('fontSize') + ';color:' + fontStyle.get('color') + ';font-weight:' + fontStyle.get('fontWeight') + ';font-style:' + fontStyle.get('fontStyle') + ';text-decoration:' + fontStyle.get('textDecoration') + ';line-height:' + fontStyle.get('lineHeight') + ';font-family:' + fontStyle.get('fontFamily') + '">$content</span>'
            str = str.replace(/\$content/g, msgStr)
          }
          var i = typelist[type]
          return str.replace(/\$1/g, i.$1).replace(/\$2/g, i.$2).replace(/\$3/g, i.$3).replace(/\$4/g, i.$4)
        },
        startChat: function () {
          visitorRobot.ok = false
          uccPcInit.initSatifaction()
          storage.set('offChat', ucc.browserId)
          datas.set('canSend', true)
          storage.set('browserId', ucc.browserId)
          //          heartBeat.init({
          //            businessId: storage.get("businessId"),
          //            chatId: ucc.chatID
          //          });
          $('.tool5').toggle(storage.get('canSendFile') == true)
          var content = ucc.advertisement.content.replace(/<[^<]+>/g, '')
          if (!datas.get('adv') && (parseInt(ucc.advertisement.accessDisplay) == 2 || parseInt(ucc.advertisement.accessDisplay) == 1) && ucc.advertisement.isVisable == 1 && ucc.advertisement.content != 'null' && content != '') {
            uccPcEvent.showAdvertisement()
            datas.set('adv', true)
          }
        },
        endChat: function () {
          datas.set('hasInQueue', false)
          localHistory.saveCurrent()
          uccPcEvent.closeChatSatisfaction()
          ajax.closeEchat(ucc.chatID, dialogue.getAttr('remoteUrl'), dialogue.getAttr('operatroName') ? dialogue.getAttr('operatroName') : '')
          dialogue.sendMessage(' ', 'foreknowledge')
        },
        endChatFun: function () {
          visitorRobot.ok = true
          storage.set('offChat', true)
          // heartBeat.end();
          changeWindow.stopCheck()
          $('.tool2-c').hide()
          $('.face-c').hide()
          $('#face_08').css('display', 'none')
          $('.sendFile').hide() // 上传按钮
          $('.reminder').hide()
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
          if (changeWindow) changeWindow.change()
          if (visitorRobot) visitorRobot.hide()
          localHistory.setCurrent(msgdb.db)
          uccPcEvent.showAudio()
          uccPcEvent.scrollTop()
          //          uccPcEvent.repaceImg();
        },
        sendMessageFun: function (id, txt) {
          datas.set('openSatisfactionAfterCloseChat', true)
          TimeoutList.startALLTimeout()
        },
        closeTool: function () {
          $('.send').attr('disabled', 'disabled') // 关闭发送开关
          $('.dialogue-area-write').attr('contentEditable', 'false') // 关闭编辑窗口
          $('.dialogue-area-write').hide()
          $('#face_08').hide() // 工具栏关闭
          $('.sendFile').hide() // 上传按钮
          $('#close').hide()
          $('.ucc-logo-cancel').hide()
        },
        openTool: function () {
          $('.send').removeAttr('disabled') // 起开发送开关
          $('.dialogue-area-write').attr('contentEditable', 'true') // 开启编辑窗口
          $('.dialogue-area-write').show()
          $('.dialogue-area-write').focus()
          $('#face_08').show() // 工具栏开启
          $('#close').show()
          $('.ucc-logo-cancel').show()
          $('.tool5').toggle(storage.get('canSendFile') == true)
        },
        confirmSend: function (id, flag) {
          if (flag == 'add' && id) {
            $(".contentMessage[name='']:last").attr('name', id)
          } else if (id) {
            $('.contentMessage[name=' + id + '] ._msg').hide()
          }
        },
        specialFun: function (type, arg) {
          if (type == 'openWin') {
            uccPcEvent.openWin(arg)
          } else if (type == '200') {
            uccPcEvent.titleGlitter() // 消息闪烁
            TimeoutList.startALLTimeout()
          } else if (type == '700') {
            if (arg.code == 'pushsatisfaction') {
              satisfaction.show()
            } else if (arg.code == 'sendFile') {
              var alljson = JSON.parse(arg.text)
              uccPcEvent.showFile(alljson.content)
            } else if (arg.code == 'getinfo') {
              visitorInformation.show()
            } else if (arg.code == 'foreknowledge') {
              var rd = $('.reminder').length
              if (rd != 0) {
                if (JSON.parse(arg.text).content == '1') {
                  $('.reminder').show()
                } else {
                  $('.reminder').hide()
                }
              } else {
                var reminder = '<div class= "reminder"><div class="rp"></div>对方正在输入...</div>'
                $('body').append(reminder)
                $('.reminder').css({
                  position: 'absolute',
                  bottom: '164px',
                  left: '5px'
                })
              }
            } else if (arg.code == 'uploadfile') {
              dialogue.showMsg({
                msgid: '',
                date: new Date().getTime(),
                content: JSON.parse(arg.text).content,
                from: 'client',
                status: 0
              })
            } else if (arg.code == 'audio') {
              //              showMediaChat("clientSendRq");
            } else if (arg.code == 'rqAccept') {
              dialogue.showMsg({
                msgid: '',
                date: new Date().getTime(),
                content: JSON.parse(arg.text).content,
                from: 'client',
                status: 0
              })
              clientAccept()
            } else if (arg.code == 'ringOff') {
              dialogue.showMsg({
                msgid: '',
                date: new Date().getTime(),
                content: JSON.parse(arg.text).content + "<img src='/any800/assets/right.png'/>",
                from: 'client',
                status: 0
              })
              // add by john 20150821
              dialogue.sendMessage('ringOff', 'ringOff')
              //              closeMediaChat();
              uccPcEvent.saveTopicType('audio')
            } else if (arg.code == 'rqCancel' || arg.code == 'rqReject' || arg.code == 'rqTimeOut') {
              dialogue.showMsg({
                msgid: '',
                date: new Date().getTime(),
                content: JSON.parse(arg.text).content,
                from: 'client',
                status: 0
              })
              //              closeMediaChat();
            } else if (arg.code == 'micIsOccupy') {
              dialogue.showMsg({
                msgid: '',
                date: new Date().getTime(),
                content: JSON.parse(arg.text).content,
                from: 'client',
                status: 0
              })
              //              closeMediaChat();
            }
          } else if (type == '900') {
            //            closeMediaChat();
            $('#face_08').css('display', 'none')
            $('.sendFile').hide() // 上传按钮
          } else if (type == '901') {
            //            closeMediaChat();
            $('#face_08').css('display', 'none')
            $('.sendFile').hide() // 上传按钮
          } else if (type == '110') {
            //            closeMediaChat();
            $('#face_08').css('display', 'none')
            $('.sendFile').hide() // 上传按钮
          } else if (type == '111') {
            TimeoutList.startALLTimeout()
          } else if (type == '112') {
            //            closeMediaChat();
          } else if (type == '113') {
            var json = JSON.parse(arg)
            msgdb.set(json.messageId, 'isRevoke', true)
            if (changeWindow) changeWindow.change()
            localHistory.setCurrent(msgdb.db)
            var $messageHide = $('div[name=' + json.messageId + ']')
            if ($messageHide.css('display') != 'none') {
              $messageHide.hide()
              if ($messageHide.prev().hasClass('dialogue-date')) {
                $messageHide.prev().hide()
              }
              $('#message').append('<p class="dialogue-date">' + new Date().Format('hh:mm:ss') + '</p>' + "<div class='msg_back_success'>" + dialogue.getAttr('operatorName') + '已撤回一条消息</div>')
            }
          } else if (type == '114') {
            var json = JSON.parse(arg)
          } else if (type == '902') {
            langTip.show(
              langTip.type.system, langTip.key.no_answer_close)
            //            closeMediaChat();
            $('#face_08').css('display', 'none')
            $('.sendFile').hide() // 上传按钮
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
            var btn = $this.data('require') == 1 ? '<div class="ico">*</div>' : ''
            $this.append('<span class="name">' + $this.data('name') + btn + '</span><span class="input"></span><span class="warning"></span>')
            if ($this.data('type') == 'combox') {
              var html = '<select >'
              for (var i in combo) {
                if (combo[i].name) {
                  html += '<option value="' + combo[i].pk + '" >' + combo[i].name + '</option>'
                }
              }
              html += '</select>'
              $this.find('.input').append(html)
              $this.find('.input select option').first().attr('selected', 'selected')
            } else if ($this.data('type') == 'textarea') {
              $this.find('.input').append('<textarea  placeholder="' + $this.data('markedwords') + '" ></textarea>')
            } else {
              $this.find('.input').append('<input type="text" placeholder="' + $this.data('markedwords') + '" >')
            }
          })
          $(".leaveMessageView .board [data-displayname='content'] textarea").val('')
          $('.leaveMessageView .board .input,.leaveMessageView .board .textarea').focusin(function (event) {
            leaveMessage.check($(this).parents('.col').data('displayname'))
          })
          $('.leaveMessageView .bottom .submit').on('click', function () {
            leaveMessage.submit({
              messageTypePk: $(".leaveMessageView .board [data-displayname='messageTypePk']").length > 0 ? $(".leaveMessageView .board [data-displayname='messageTypePk'] select").val() : '',
              name: $(".leaveMessageView .board [data-displayname='name']").length > 0 ? $(".leaveMessageView .board [data-displayname='name'] input").val() : '',
              telephone: $(".leaveMessageView .board [data-displayname='telephone']").length > 0 ? $(".leaveMessageView .board [data-displayname='telephone'] input").val() : '',
              email: $(".leaveMessageView .board [data-displayname='email']").length > 0 ? $(".leaveMessageView .board [data-displayname='email'] input").val() : '',
              title: $(".leaveMessageView .board [data-displayname='title']").length > 0 ? $(".leaveMessageView .board [data-displayname='title'] input").val() : '',
              content: $(".leaveMessageView .board [data-displayname='content']").length > 0 ? $(".leaveMessageView .board [data-displayname='content'] textarea").val() : '',
              company: $(".leaveMessageView .board [data-displayname='company']").length > 0 ? $(".leaveMessageView .board [data-displayname='company'] input").val() : '',
              brand: $(".leaveMessageView .board [data-displayname='brand']").length > 0 ? $(".leaveMessageView .board [data-displayname='brand'] input").val() : ''
            })
          })
          $('input, textarea').placeholder()
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
          el.find('.warning').html(text)
        }
      })
      leaveMessage.init()
      visitorInformation = $.visitorInformation({
        storage: storage,
        Alert: Alert,
        storageVisitor: 'visitor',
        generate: function (combo) {
          $('.visitorInformationView .body .col').each(function (index, el) {
            var $this = $(this)
            var btn = $this.data('require') == 1 ? '<div class="ico">*</div>' : ''
            $this.append('<span class="name">' + $this.data('name') + btn + '</span><span class="input"></span><span class="warning"></span>')
            if ($this.data('type') == 'radio') {
              var html = '<span class="radio"><input type="radio" name="sex" value="1" >男</span><span class="radio"><input type="radio" name="sex" value="2" checked="checked">女</span>'
              $this.find('.input').append(html)
            } else {
              $this.find('.input').append('<input type="text" placeholder="' + ($this.data('placeholder') ? $this.data('placeholder') : '') + '" value="' + ($this.data('markedwords') ? $this.data('markedwords') : '') + '" >')
            }
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
              sex: $('.visitorInformationView input[name=sex]').filter(':checked').val(),
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
          el.find('.warning').html(text)
        },
        submitFun: function (visitor) {
          // sara说在接入对话之前也要收集访客信息，所以注释掉以下判断, bulin, 2017-4-10
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
          $('#message>*').not('#historyChat,#moreHistory,.service-info').remove()
          langTip.show('1', '1') // 欢迎语1
          langTip.show('1', '2') // 欢迎语2
          visitorRobot.ok = false
          robot.isUse = false
          workTime.iswork()
          if (workTime.type == 0) {
            uccPcLogic.loadScheme() // 加载样式方案
          } else {
            workTime.show()
          }
          dialogue.toolFun(false)
          $('.accept').css('display', 'block')
          $('#autoReply').css('display', 'none')
          $('.centerTime').remove()
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
        $('.send').removeAttr('disabled') // 起开发送开关
        $('.dialogue-area-write').attr('contentEditable', 'true') // 开启编辑窗口
        $('.dialogue-area-write').show()
      } else {
        visitorRobot.ok = false
      }
      langTip = $.langTip({
        companyPk: ucc.companyPk,
        defaultLangPk: ucc.defaultLangPk,
        langMap: ucc.langMap,
        show: function (json) {
          var reg = new RegExp('&quot;', 'g')
          switch (json.langKey) {
            case 1:
              $('#sysmsg').html(json.content ? json.content.replace(reg, '"') : '')
              break
            case 2:
              $('#welcome').html(json.content ? json.content.replace('留言', '<a href="javascript:void(0)" class="dialogue-a fanke-liuyan" >留言</a>').replace(reg, '"') : '')
              break
            case 3:
              dialogue.showMsg({
                content: json.content ? json.content.replace(reg, '"') : '',
                from: 'robot',
                saveIn: 1
              })
              break
            case 4:
              dialogue.showMsg({
                content: json.content ? json.content.replace(reg, '"') : '',
                from: 'robot',
                saveIn: 1
              })
              break
            case 5:
              dialogue.showMsg({
                content: json.content ? json.content.replace(reg, '"') : '',
                from: 'robot',
                saveIn: 1
              })
              dialogue.end(4)
              //              closeMediaChat();
              break
            case 6:
            // 访客超时提醒
              dialogue.showMsg({
                content: json.content ? json.content.replace(reg, '"') : '',
                from: 'robot',
                saveIn: 1
              })
              break
            case 7:
              dialogue.showSysMsg(json.content ? json.content.replace(reg, '"') : '', true)
              break
            case 9:
              dialogue.showMsg({
                content: json.content ? json.content.replace(reg, '"') : '',
                from: 'robot',
                saveIn: 1
              })
              break
            default:
              dialogue.showSysMsg(json.content ? json.content.replace(reg, '"') : json.conntent.replace(reg, '"'), true)
              break
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
        TimeoutList: TimeoutList,
        dialogue: dialogue,
        data: datas,
        start: function () {
          $('#message').html('')
          $('.leaveMessage').remove()
          visitorInformation.hide()
          ucc.BasicSetting.need = 0
        },
        end: function () {
          $('.visitorRobot').hide()
          $('.reminder').hide()
          uccPcEvent.leaveCover()
        }
      })
      changeWindow.init()
    },
    initHistory: function () {
      History = $.history({
        show: false,
        visitorId: userDatas.getVisitorInfo().visitorId,
        companyPk: ucc.companyPk,
        dialogue: dialogue,
        generation: function () {
          if (dialogue.islive()) return
          History.getLeaveChat()
          History.showLeaveChat()
          History.check()
          if (History.getSum() > 0) {
            if ($('#moreHistory').length <= 0) $('#message').prepend("<div id='moreHistory'>点击查看历史记录</div>")
            $('#moreHistory').on('click', function () {
              var url = 'historyOperator.do?method=moreHistoryDialogue&visitorId=' + userDatas.getVisitorInfo().visitorId + '&companyPk=' + ucc.companyPk
              var title = '消息记录'
              tab.add(title, title, url)
            })
          }
        },
        checkFun: function () {}
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
            if ($('#moreHistory').length <= 0) $('#message').prepend("<div style='cursor:pointer;text-align:center;color:#666;margin-top:10px;' id='moreHistory'>点击查看历史记录</div>")
            $('#moreHistory').on('click', function () {
              var url = 'historyOperator.do?method=moreHistoryDialogue&visitorId=' + userDatas.getVisitorInfo().visitorId + '&companyPk=' + ucc.companyPk
              var title = '消息记录'
              tab.add(title, title, url)
            })
          }
        },
        checkFun: function () {}
      })
      History.init()
    }
  }
  $.uccPcInit = function (options) {
    var uccPcInit = new UCCPCINIT(options)
    return uccPcInit
  }
})(window, jQuery)
