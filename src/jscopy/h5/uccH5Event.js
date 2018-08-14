/* uccH5Event.js UCCH5事件 */
var ucc = require('../util/uccData.js')
var ajax = require('../util/ajax.js')
var baseUrl = ucc.baseUrl
var audiojs = require('../audiojs/audio.min.js')

/* uccH5Event.js UCCH5事件 */
;
(function (window, $, undefined) {
  var UCCH5EVENT = function (options) {
    this.defaults = {},
    this.options = $.extend({}, this.defaults, options)
  }
  UCCH5EVENT.prototype = {
    DOMCheck: null,
    binds: function () {
      this.businessListBind()
      this.inputCheck()
      this.viewFix()
      this.bigImgBind()
      this.inputClickBind()
      this.faceBind()
      this.closeBind()
      this.uploadInit()
      this.initReconnect()
      this.unload()
      this.messageChange()
      if (!dialogue.islive()) {
        $('.fileup input').attr('disabled', true)
      }
    },
    leaveCover: function () {
      $('.dialogue-footer-search').append("<div class='leaveMessage'>已断开连接，请刷新重试</div><div class='leaveMessageCover'></div>")
      $('.leaveMessage').css({
        position: 'absolute',
        bottom: '50px',
        left: '13px'
      })
      setInterval(function () {
        $('.leaveMessage').fadeIn(500).fadeOut(500)
      }, 1000)
    },
    openCover: function () {
      $('.leaveMessage').remove()
    },
    showVisitorInfo: function () {
      dialogue.showMsg({
        from: 'client',
        content: "为了提高我们的服务质量,   请点击<span class = 'spans visitor_info' id = 'v_info'>完善客户信息</span><br>",
        saveIn: 1
      })
      $('.visitor_info').click(function () {
        visitorInformation.show()
      })
    },
    showAudio: function () {
      $('audio').each(function (index, el) {
        if (!$(el).parent().hasClass('audiojs')) {
          var $this = $(this)
          audiojs.helpers.whenError = function () {
            var placeholder = $('.dialogue-c').find('a[placeholder]')
            placeholder.html('下载')
          }
          audiojs.create($this)
        }
      })
    },
    scrollToBottom: function () {
      document.getElementById('message').scrollTop = document.getElementById('message').scrollHeight // 滚动条置底
    },
    scrollToTop: function () {
      document.getElementById('message').scrollTop = 0
    },
    businessListBind: function () {
      $('#message').delegate('.onlineCls', 'click', function () {
        if (!dialogue.islive()) {
          storage.set('businessId', $(this).data('pk'))
          storage.set('businessName', $(this).attr('name'))
          var businessId = $(this).data('pk')
          var businessName = $(this).attr('name')
          if (bList.hasList(businessId).length > 0) {
            var b = uccH5Logic.showBusinessList(businessId)
            dialogue.showMsg({
              from: 'client',
              content: b,
              saveIn: 1
            })
            return
          }
          var isLea = $(this).data('online') != '在线' // true代表离线
          if (isLea) { // 如果业务类型离线
            leaveMessage.show()
          } else {
            queue.reqStartQueue(businessId, businessName)
          }
        }
      })
    },
    viewFix: function () {
      // 微信下拉查看网址修复
      var overscroll = function (el) {
        el.addEventListener('touchstart', function () {
          var top = el.scrollTop,
            totalScroll = el.scrollHeight,
            currentScroll = top + el.offsetHeight
          if (top <= 0) {
            el.scrollTop = 1
          } else if (currentScroll >= totalScroll) {
            el.scrollTop = top - 1
          }
        })
        el.addEventListener('touchmove', function (evt) {
          if (el.offsetHeight < el.scrollHeight) { evt._isScroller = true }
        })
      }
      overscroll(document.querySelector('.dialogue'))
      document.querySelector('.dialogue-footer-text').addEventListener('touchmove', function (evt) {
        evt._isScroller = true
      })
      document.body.addEventListener('touchmove', function (evt) {
        if (!evt._isScroller) {
          evt.preventDefault()
        }
      })
    },
    inputCheck: function () {
      var ev = this
      $('.dialogue-footer-text').css('overflowY', 'auto')
      $('#dialogue-footer-text').on('focus', function () {
        $('.dialogue-footer-face').hide()
        $('.dialogue-footer').css({
          'position': 'absolute'
        })
        mobileInput.startCheck()
        if (ev.DOMCheck) {
          ev.DOMCheck = window.clearInterval(ev.DOMCheck)
        }
        ev.DOMCheck = setInterval(function () {
          if ($('#dialogue-footer-text').html().length > 0 && $('#dialogue-footer-text').html() != '<br>') {
            $('#dialogue-send').show()
            $('#dialogue-add').hide()
            $('#dialogue-footer-face').hide()
          } else {
            $('#dialogue-send').hide()
            $('#dialogue-add').show()
          }
          setTimeout(function () {
            ev.checkHeight(4)
          }, 300)
        }, 700)
      }).on('blur', function () {
        $('.dialogue-footer').css({
          'position': 'absolute'
        })
        ev.DOMCheck = window.clearInterval(ev.DOMCheck)
        setTimeout(function () {
          ev.checkHeight(4)
        }, 333)
        mobileInput.end()
      })
    },
    checkHeight: function (num) {
      var lineHeight = 24
      $('.dialogue-footer-text').css('line-height', lineHeight + 'px')
      var marginHeight = parseInt($('.dialogue-footer-text').css('marginBottom')) + parseInt($('.dialogue-footer-text').css('marginTop'))
      for (var i = 1; i <= num; i++) {
        if ($('.dialogue-footer-text')[0].scrollHeight >= i * lineHeight) {
          $('.dialogue-footer-search').height(i * lineHeight + marginHeight)
          $('.talk-btn').css('top', (i * lineHeight + marginHeight - $('#dialogue-send').height()) / 2)
        }
      }
      if ($('.dialogue-footer-text')[0].scrollHeight < 2 * lineHeight) {
        $('.dialogue-footer-search').height(34 + marginHeight)
        $('.dialogue-footer-text').css('line-height', '34px')
        $('.talk-btn').css('top', 0)
      }
      $('#message').css('bottom', $('.dialogue-footer').height())
    },
    bigImgBind: function () {
      $('#message').delegate('.dialogue-me .dialogue-c .content img,.dialogue-in .dialogue-c .content img', 'click', function () {
        if ($(this).attr('emotions') != 'true') {
          uccH5Event.downloadOrigin($(this).attr('src')).done(function (src) {
            showBigImgFun.showPic(src)
          })
        }
      })
    },
    inputClickBind: function () {
      $('#dialogue-send').unbind().click(function () {
        var sendMsgclone = $('#dialogue-footer-text').clone()
        var sendMsg = $('#dialogue-footer-text').html()
        sendMsg = sendMsg.replace(/\r|<br>|<div\s*>|<\/div>|<span\s*>|<\/span>|<p\s*>|<\/p>/g, '') // 去掉enter键换行
        sendMsg = sendMsg.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '') // 去除输入法自带的表情
        if (sendMsg) { // 输入栏没有内容则不操作
          sendMsg = changeFaceFun.imgToIco(sendMsgclone.html())
          sendMsgclone.html(changeFaceFun.imgToIco(sendMsgclone.html()))

          sendMsg = sensitive.get(sendMsg)
          if (sendMsg.length > 1000) {
            Alert.show('最大长度为1000个字符')
            return ''
          }
          detectWeb.msgPush('visitor', sendMsg)
          sendMsg = sendMsg.replace(/ /ig, '&nbsp;').replace(/\n/ig, '<br>')
          if (!dialogue.islive()) {
            var numberSendMsg = Number($('<div>' + sendMsg + '</div>').text())
            if (robot.isUse) {
              robot.check(sendMsg.replace(/\&nbsp;/g, '').replace(/\s+/g, '').replace(/\<p><\/p>/g, '').replace(/\<br>/g, ''))
            } else if (numberSendMsg) {
              dialogue.showMsg({
                from: 'visitor',
                content: sendMsg,
                saveIn: 1
              })
              if ($('.onlineCls[data-num]').length == 0) {
                ajax.getDepartment().done(function () {
                  bList = $.businessList({
                    businessList: ucc.businessList,
                    aDset: ucc.aDset
                  })
                  var b = uccH5Logic.showBusinessList(-1)
                  dialogue.showMsg({
                    from: 'client',
                    content: b,
                    saveIn: 1
                  })
                })
              }
              var it = $(".onlineCls[data-num='" + numberSendMsg + "']")
              if (it.length > 0) {
                $(it).click()
              } else {
                dialogue.showMsg({
                  from: 'robot',
                  content: '请输入业务类型前的数字或点击业务类型接入对话或留言。',
                  saveIn: 1
                })
              }
            } else {
              dialogue.showMsg({
                from: 'visitor',
                content: sendMsg,
                saveIn: 1
              })
              dialogue.showMsg({
                from: 'robot',
                content: '请输入业务类型前的数字或点击业务类型接入对话或留言。',
                saveIn: 1
              })
            }
          } else {
            dialogue.sendMessage(sendMsg)
          }
        }

        mobileInput.endScroll = false

        // 清空并聚焦输入框
        $('#dialogue-footer-text').text('').focus()
        uccH5Event.scrollToBottom()
        setTimeout(function () {
          if ($('#dialogue-footer-text').html().length > 0 && $('#dialogue-footer-text').html() != '<br>') {
            $('#dialogue-send').show()
            $('#dialogue-add').hide()
            $('#dialogue-footer-face').hide()
          } else {
            $('#dialogue-send').hide()
            $('#dialogue-add').show()
          }
        }, 1000)
      })
    },
    faceBind: function () {
      $('#dialogue-biaoqing').unbind().click(function () {
        if (!dialogue.islive()) return
        var isHidden = $('.dialogue-footer-face').is(':hidden') // 是否隐藏
        if (isHidden) {
          $('.dialogue-footer-face').show()
        } else {
          $('.dialogue-footer-face').hide()
        }
        $('.dialogue').css('bottom', $('.dialogue-footer').height())
      })
    },
    closeBind: function () {
      $('.close').click(function () {
        if (!dialogue.islive()) {
          confirmBox.create('您确定要关闭对话框吗？').done(function (click) {
            if (click) {
              window.close()
              if (typeof WeixinJSBridge) {
                WeixinJSBridge.call('closeWindow')
              }
            }
          })
        } else {
          confirmBox.create('您确定要结束对话吗？').done(function (click) {
            if (click) {
              dialogue.end(5)
              $('.close').hide()
            }
          })
        }
      })
    },
    uploadInit: function () {
      $('#dialogue-add').uploadFile({
        size: 5 * 1024 * 1024,
        uploadType: 'image',
        inputImage: true,
        other: function (up, name, time) {
          if (!dialogue.islive()) return
          dialogue.showMsg({

            from: 'visitor',
            content: '<img id="' + time + '" src="' + require('../../images/h5/loading.gif') + '">'
          })
          var key = msgdb.last()
          up.submit(time, key)
        },
        callback: function (url, time, key) {
          var imgstr = '<img  src="' + url + '">'
          $('#' + time).attr('src', url)
          dialogue.sendMessage(imgstr, '', true)
          msgdb.setKey(key, 'content', imgstr)
          if (changeWindow)changeWindow.change()
        },
        error: function (type) {
          if (type == 'type') {
            Alert.show('仅支持上传.png\.jpeg\.bmp\.jpg格式的图片')
          } else if (type == 'size') {
            Alert.show('仅支持上传5M以内的图片')
          } else {
            Alert.show('上传图片错误')
            $('#' + file.id + file.__hash).parents('.dialogue-me.contentMessage').hide()
          }
        }
      })
    },
    reconnectClick: false,
    initReconnect: function () {
      var ev = this
      $('#message').delegate('.reconnectID', 'click', function () {
        if (!dialogue.islive() && !datas.get('hasInQueue') && !ev.reconnectClick) {
          ev.reconnectClick = true
          ajax.closeEchat(ucc.chatID, dialogue.getAttr('remoteUrl'), dialogue.getAttr('operatroName') ? dialogue.getAttr('operatroName') : '')
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
                detectWeb.setIsReconnection(true)
                queue.reqStartQueue(storage.get('businessId'), storage.get('businessName'), detectWeb.getIsReconnection()) // @Elijah
                ev.reconnectClick = false
              } catch (e) {
                // console.log(e);
              }
            }).fail(function (e) {
              ev.reconnectClick = false
              dialogue.showSysMsg('网络异常，请确保网络正常后再重新连接！')
            })
        }
      })
    },
    unload: function () {
      $(window).unload(function () {
        if (storage.get('offChat') == ucc.browserId) {
          storage.set('offChat', true)
        }
        if (webSocket.isWork) {
          webSocket.websocket.close()
        }
      })
    },
    messageChange: function () {
      $('#message').delegate('.message_news', 'click', function () {
        if ($(this).data('url')) {
          window.open($(this).data('url'))
        }
      })
    },
    downloadOrigin: function (src) {
      var defered = new $.Deferred()
      var ext = src.substring(src.lastIndexOf('.'))
      var extName = ext.toLowerCase()
      var pre = src.substring(0, src.lastIndexOf('.'))
      if (pre.indexOf('origin') > -1) {
        return defered.resolve(src)
      }
      if ((extName) == '.jpg' || (extName) == '.jpeg' || (extName) == '.png' || (extName) == '.bmp') {
        var url = pre + 'origin' + ext
        var img = new Image()
        img.src = url
        if (img.complete) {
          return defered.resolve(url)
        }
        img.onload = function () {
          return defered.resolve(url)
        }
        img.onerror = function () {
          return defered.resolve(src)
        }
      }
      return defered.promise()
    }
  }
  $.uccH5Event = function (options) {
    var uccH5Event = new UCCH5EVENT(options)
    return uccH5Event
  }
})(window, jQuery)
