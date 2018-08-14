var ucc = require('../util/uccData.js')
var ajax = require('../util/ajax.js')
var appData = require('../util/appData.js')
var baseUrl = ucc.baseUrl
var audiojs = require('../audiojs/audio.min.js')
;
(function (window, $, undefined) {
  var UCCPCEVENT = function (options) {
    this.defaults = {}, this.options = $.extend({}, this.defaults, options)
  }
  UCCPCEVENT.prototype = {
    screenCapture: function () {
      screenCapture = $.screenCapture({
        os: userDatas.getOperatingSystem(),
        draw: function (data) {
          uccPcEvent.uploadImgFromPaste('data:image\/.png;base64,' + data, 'paste', false)
        },
        download: function () {
          Alert.show('请下载安装。')
          window.open('/any800/Any800Capture.html', 'Any800Capture')
        }
      })
    },
    leaveCover: function () {
      if ($('.leaveMessage').length == 0) {
        var str = webSocket.isWork?"点击此处继续对话":"已断开连接，请刷新重试";
        $('.dialogue-area').append("<div class='leaveMessage'>"+str+"</div>")
        $('.leaveMessage').css({
          position: 'absolute',
          bottom: '130px',
          left: '13px'
        })
        setInterval(function () {
          $('.leaveMessage').fadeIn(500).fadeOut(500)
        }, 1000)
        $(".dialogue-area .leaveMessage").unbind().click(function(){
          if(webSocket.isWork){
            webSocket.connect();
          }
        })
      }
    },
    openCover: function () {
      $('.leaveMessage').remove()
    },
    repaceImg: function () {
      var origin = $('.contentMessage').last().find('img[originsrc]')
      if (origin.length > 0) {
        origin.attr('src', origin.attr('originsrc'))
      }
    },
    rightClickOnImg: function () {
      $('.dialogue-record').delegate('.contentMessage .content img', 'mousedown', function (e) {
        if (!$(this).attr('emotions')) {
          if (e.which == 3) {
            uccPcEvent.rightClick(e.clientX, e.clientY, $(this).attr('originsrc') || $(this).attr('src'))
            e.preventDefault()
            return false
          }
        }
      })
      $('.dialogue-record').delegate('.contentMessage .content img', 'mouseup', function (e) {
        if (!$(this).attr('emotions')) {
          e.preventDefault()
          return false
        }
      })
      $('.dialogue-record-c').on('scroll', function () {
        $('.rightClick').remove()
      })
      $(window).resize(function (event) {
        $('.rightClick').remove()
      })
    },
    rightClick: function (x, y, url) {
      if ($('.rightClick').length == 0) {
        $('body').append("<div class='rightClick'>下载</div>")
        $('.rightClick')[0].oncontextmenu = function () {
          return false
        }
      }
      $('.rightClick').css('top', y - 2)
      $('.rightClick').css('left', x - 2)
      $('.rightClick').unbind().on('click', function () {
        uccPcEvent.downloadOrigin(url).done(function (src) {
          window.open(src)
        })
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
    },
    cacheImg: function (symbol, url, callback) {
      var img = new Image()
      img.src = url
      if (img.complete) {
        callback.call(img)
        return
      }
      img.onload = function () {
        callback.call(img)
      }
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
    addEvent: function () {
      var ev = this
      // 点击图片放大显示
      $('body').delegate('.fanke-liuyan', 'click', function () {
        leaveMessage.show() // 提示留言
      })
      $('#message').delegate('.dialogue-me .dialogue-in-c .content img,.dialogue-in .dialogue-in-c .content img', 'click', function () {
        if ($(this).attr('emotions') != 'true') {
          showBigImgFun.showPic($(this).attr('originsrc') || $(this).attr('src'))
        }
      })
      ev.toolsEvnt(ucc.buttonList)
      ev.rightClickOnImg()
      $('.send').click(function () {
        if (dialogue.islive() || !!robot.isUse) {
          ev.sendMsg()
        }
      })
      $('#close').click(function () {
        if (dialogue.islive()) {
          var cf = confirm('您确定要结束对话吗？')
          if (cf == true) {
            ev.closeChat()
            $('#close').css('cursor', '')
          }
        }
      })
      $('.ucc-logo-cancel').click(function () {
        if (dialogue.islive()) {
          var cf = confirm('您确定要结束对话吗？')
          if (cf == true) {
            ev.closeChat()
            $('#close').css('cursor', '')
          }
        } else {
          var cf = confirm('您确定要关闭对话框吗？')
          if (cf == true) {
            window.close()
          }
        }
      })
      $(document).keydown(function (event) {
        ev.glint.clear()
        if (dialogue.islive() || !!robot.isUse) { // 机器人允许回车键
          ev.sendKeyDown(event)
        }
      })
      $('body').click(function () {
        ev.glint.clear()
      })
    },
    toolsEvnt: function (_p) {
      var pEventM = this
      for (var i = 0; i < _p.length; i++) {
        switch (_p[i].type) {
          case 1:
          // FAQ
            $('.tool1').show()
            var a_Dset = ucc.aDset
            var faq_url = ucc.baseUrl + '/echatManager.do?method=showFaq&companyPk=' + ucc.companyPk + '&langPk=' + ucc.defaultLangPk + '&codeKey=' + a_Dset.vcwColor
            tab.add('1', '常见问题', faq_url)
            $('.tool1').click(function () { // 添加点击事件
              tab.add('1', '常见问题', faq_url)
            })
            break
          case 2:
          // FONF
            $('.tool2').show()
            break
          case 3:
          // FACE
            $('.tool3').show()
            break
          case 4:
          // SCREEN
            $('.tool4').show()
            $('.tool4 .screenCapture').click(function () { // 截屏显示，添加点击事件
              screenCapture.use()
              $('.screenCaptureCheckBox').hide()
            })
            $('.tool4 .screenCaptureCheck').click(function () { // 截屏显示，添加点击事件
              $('.screenCaptureCheckBox').toggle()
            })
            $('.screenCaptureCheckBox').click(function () { // 截屏显示，添加点击事件
              $('.screenCaptureCheckBox .checked').toggleClass('active')
              datas.set('screenCapture', $('.screenCaptureCheckBox .checked').hasClass('active'))
              $('.screenCaptureCheckBox').hide()
            })
            $(window).click(function(e){
              var _target = $(e.target);
              if (_target.closest($('.screenCaptureCheckBox')[0]).length == 0) {
                $('.screenCaptureCheckBox').hide();
              }
            })
            break
          case 5:
          // SAVE
            $('.tool9').show().click(function () { // 保存对话显示，添加点击事件
              pEventM.saveDialog()
            })
            break
          case 6:
          // LOVE
            $('.tool6').show().click(function () { // 满意度显示，添加点击事件
              satisfaction.show()
            })
            break
          case 7:
          // FILE
            $('.tool5').click(function () { // 上传文件显示，添加点击事件
              pEventM.createSendFile()
            })
            break
          case 8:
          // audio
            $('.tool7').show().click(function () { // 语音显示，添加点击事件
              pEventM.sendAudioRq()
            })
            break
          case 12:
          // 发送图片
            $('.tool10').show()
            pEventM.sendPicture()
            $('#picUpload>div').width(26).height(21)
            break
        }
      }
    },
    sendScreen: function () {
      screenCapture.use()
    },
    saveDialog: function () {
      var htmlChatContent = this.getChatContent()
      htmlChatContent = encodeURIComponent(htmlChatContent)
      var iframe // 生成iframe.
      if (window.frames && window.frames['downloadFrame']) {} else {
        try {
          iframe = document.createElement('<iframe name="downloadFrame" style="display:none;">')
        } catch (ex) {
          iframe = document.createElement('iframe')
          iframe.style = 'display:none;'
          iframe.setAttribute('style', 'display:none;')
        }
        iframe.id = 'downloadFrame'
        iframe.name = 'downloadFrame'
        iframe.width = 0
        iframe.height = 0
        iframe.marginHeight = 0
        iframe.marginWidth = 0

        var objBody = document.getElementsByTagName('body').item(0)
        objBody.insertBefore(iframe, objBody.firstChild)
      }
      var formObj
      if ($('#downloadForm').length > 0) {
        formObj = $('#downloadForm')[0]
      } else {
        formObj = document.createElement('form')
        var formMethod = 'post'
        formObj.setAttribute('method', formMethod)
        formObj.setAttribute('name', 'downloadForm')
        formObj.setAttribute('id', 'downloadForm')
        formObj.setAttribute('action', 'echat/downloadChat.jsp')
        formObj.setAttribute('target', 'downloadFrame')
      }
      var inputHiddenObj
      if ($('#htmlContent').length > 0) {
        inputHiddenObj = $('#htmlContent')[0]
      } else {
        inputHiddenObj = document.createElement('input')
        inputHiddenObj.setAttribute('type', 'hidden')
        inputHiddenObj.setAttribute('name', 'htmlContent')
        inputHiddenObj.setAttribute('id', 'htmlContent')
      }
      inputHiddenObj.setAttribute('value', htmlChatContent)
      formObj.appendChild(inputHiddenObj)
      var tmpObjBody = document.getElementsByTagName('body').item(0)
      tmpObjBody.insertBefore(formObj, tmpObjBody.firstChild)
      formObj.submit()
    },
    getChatContent: function () {
      var htmlChat = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>对话记录</title>'
      htmlChat += "<link type='text/css' rel='stylesheet' href='" + baseUrl + "/style/css/echat/ucc.css'/></head><body style='overflow:auto;visibility: visible;'>"
      var clone = $('#message').clone()
      clone.children('#historyChat,#moreHistory').remove()
      htmlChat += clone.html().replace(/\/any800\/style\/images/g, baseUrl + '/style/images')
      htmlChat += '</body></html>'
      return htmlChat
    },
    createSendFile: function () {
      var uccevent = this
      var sendFile = $('.label-pop .sendFile')
      if (sendFile.length == 0) {
        var sendHtml = "<div class='sendFile'><div class='name'></div><div class='ok'>浏览</div><div class='submit'>发送</div></div>"
        $('.label-pop').append(sendHtml)
        uccevent.uploader = $('.label-pop .sendFile .ok').uploadFile({
          size: 10 * 1024 * 1024,
          uploadType: 'all',
          other: function (up, name, time) {
            // $(".sendFile .fileup").hide();
            $('.label-pop .sendFile .name').html(name)
          },
          callback: function (url, time, key, originPath) {
            var fileUrl = url
            var txt = '访客发送了一个文件：<a class = "download" target="_blank" href="' + fileUrl + '">下载</a>'
            var imags = ['jpg', 'jpeg', 'bmp', 'gif', 'png']
            if (fileUrl.indexOf('.jpg') > -1 || fileUrl.indexOf('.bmp') > -1 || fileUrl.indexOf('.jpeg') > -1 || fileUrl.indexOf('.gif') > -1 || fileUrl.indexOf('.png') > -1) {
              txt = "<img id='img' " + (originPath ? "originsrc='" + originPath + "'" : '') + " data-symbol='" + time + "' src='" + fileUrl + "'>"
            }
            dialogue.sendMessage(txt, '')
            $('.label-pop .sendFile .name').html('')
            $('.sendFile').hide()
            $('.tool5').removeClass('click')
          },
          error: function (type) {
            if (type == 'type') {
              Alert.show('仅支持上传.gif\.jpg\.jpeg\.bmp\.png\.doc\.docx\.xls\.xlsx\.pdf\.txt格式的文件')
            } else if (type == 'size') {
              Alert.show('仅支持上传10M以内的文件')
            } else {
              Alert.show('上传文件错误')
            }
          }
        })
        $('.label-pop .sendFile .submit').on('click', function () {
          if ($('.label-pop .sendFile .name').html() != '') {
            uccevent.uploader.submit('')
          } else {
            Alert.show('请选择文件')
          }
        })
      } else {
        $('.sendFile').toggle()
        $('.label-pop .sendFile .name').html('')
        if (uccevent.uploader) {
          uccevent.uploader.create()
        }
      }
    },
    sendAudioRq: function () {
      //      showMediaChat("vistorSendRq");
      dialogue.sendMessage('vistorSendRq', 'vistorSendRq')
    },
    sendPicture: function () {
      $('#picUpload').uploadFile({
        size: 5 * 1024 * 1024,
        uploadType: 'image',
        other: function (up, name, time) {
          up.submit(time)
        },
        callback: function (url, time, key, originPath) {
          setTimeout(function () { /** 将图片发送至客服**/
            var imgstr = '<img ' + (originPath ? "originsrc='" + originPath + "'" : '') + " src='" + url + "'>"
            //            dialogue.sendMessage(imgstr, "");
            $('.dialogue-area-write').append(imgstr)
            /* $("#" + file.id).attr("src", msgs[1]);
                dialogue.sendMessage(imgstr, "", true); */
          }, 5e2)
        },
        error: function (type) {
          if (type == 'type') {
            Alert.show('仅支持上传.png\.jpeg\.bmp\.jpg格式的图片')
          } else if (type == 'size') {
            Alert.show('仅支持上传5M以内的图片')
          } else {
            Alert.show('上传图片错误')
          }
        }
      })
    },
    sendMsg: function () {
      var ev = this
      if (!datas.get('canSend')) return
      datas.set('canSend', false)
      var msgStr = ev.getMsgStr()
      if (msgStr == 'unable' || msgStr == '') {
        datas.set('canSend', true)
        return
      }

      var reg = new RegExp('<br>', 'g')
      if (msgStr.replace(reg, '')) {
        var regBase64 = /<img\s*src="data:image\/.{0,5};base64,/i
        if (dialogue.islive()) {
          if (regBase64.test(msgStr)) {
            ajax.getScreenshotSrc(msgStr)
              .done(function (result) {
                msgStr = result
                dialogue.sendMessage(msgStr)
                detectWeb.msgPush('visitor', msgStr) // 将发送的消息存放起来@Elijah
              })
          } else {
            dialogue.sendMessage(msgStr)
            detectWeb.msgPush('visitor', msgStr) // 将发送的消息存放起来@Elijah
          }
          datas.set('openSatisfactionAfterCloseChat', true)
        } else if (robot.isUse) {
          robot.check(msgStr.replace(/\&nbsp;/g, '').replace(/\s+/g, '').replace(/\<p><\/p>/g, '').replace(/\<br>/g, ''))
        } else {

        }
      }
      setTimeout(function () {
        ev.clearSend()
        datas.set('canSend', true)
      }, 1e1)
    },
    getMsgStr: function () {
      var sendMsgclone = $('.dialogue-area-write').clone()
      var sendMsg = $('.dialogue-area-write').html()

      sendMsg = changeFaceFun.imgToIco(sendMsgclone.html())
      // sendMsg = $("<div>" + sendMsg + "</div>").text();
      var regHref = /<a[^>]*href=['"]([^"]*)['"].*?[^>]*>(.*?)<\/a>/g
      var arrs = sendMsg.match(regHref)
      if (arrs) {
        for (i = 0; i < arrs.length; i++) {
          sendMsg = sendMsg.replace(arrs[i], RegExp.$2)
        }
      }
      sendMsg = sensitive.get(sendMsg)
      try {
        var tsm = sendMsg.replace(/\&nbsp;/g, '').replace(/\<p><\/p>/g, '')
        if (tsm.length == 0) {
          sendMsg = tsm
        }
      } catch (e) {}
      var regBase64 = /<img\s*src="data:image\/.{0,5};base64,/i // 判断是否有截图
      // 如有截图
      // 先吥显示访客的话
      var reg = new RegExp('<br>', 'g')
      sendMsg = sendMsg.replace(/<div\s*>|<\/div>|<span\s*>|<\/span>|<p\s*>|<\/p>/g, '').replace(/<\/?[p|P][^>]*>/g, '')
      if (!regBase64.test(sendMsg)) {
        if (sendMsg.replace(reg, '')) { // 输入栏没有内容则不操作
          if (sendMsg.length > 1000) {
            Alert.show('最大长度为1000个字符')
            return 'unable'
          }
          sendMsg = sendMsg.replace(/<\/?[p|P][^>]*>/g, '')
        }
      }

      if (sendMsg.replace(reg, '')) { // 输入栏没有内容则不操作
        sendMsgclone.find('p').each(function () {
          $(this).replaceWith($(this).html() + '<br/>')
          sendMsg = sendMsgclone.html()
        })
        sendMsgclone.find('img').each(function () {
          if ($(this).attr('name') == 'faceIco') {
            var imgFlg = this.id // "<img  src=\"" + this.src + "\" \>";
            $(this).replaceWith(imgFlg)
            sendMsg = sendMsgclone.html()
          }
        })
      }
      var ma = sendMsg.match(/<img.*?>/g)
      var msg
      if (ma && ma.length > 0) {
        for (var i in ma) {
          if (ma[i] && !isNaN(Number(i))) {
            sendMsg = sendMsg.replace(ma[i], '</span>' + ma[i] + '<span>')
          }
        }
        sendMsg = '<span>' + sendMsg + '</span>'
      }
      sendMsgclone = $('<div>' + sendMsg + '</div>')
      sendMsgclone.find('span').each(function () {
        $(this).replaceWith($(this).html().replace(/ /ig, '&nbsp;').replace(/\n/ig, '<br>'))
        sendMsg = sendMsgclone.html()
      })

      return sendMsgclone.html()
    },
    clearSend: function () {
      var ua = window.navigator.userAgent
      if (/MSIE 8/g.test(ua)) {
        $('.dialogue-area-write')[0].innerHTML = '&nbsp;'
      } else {
        $('.dialogue-area-write').html('')
      }
      $('.dialogue-area-write').focus()
    },
    closeChat: function () {
      if (dialogue.islive()) {
        if (ucc.BasicSetting.jump == 1) {
          if (datas.get('openSatisfactionAfterCloseChat') && !datas.get('hasSatisfaction')) {
            satisfaction.show()
          }
        }
        dialogue.end(5)
        $('#face_08').css('display', 'none')
        $('.sendFile').hide() // 上传按钮
      }
    },
    sendKeyDown: function (event) {
      var pEventM = this
      var event = arguments[0] || window.event || event
      var srcElement = event.target || window.event.srcElement
      if (event.keyCode == 88) { // 88是X键
        if (event.ctrlKey && event.shiftKey) {
          return false
        }
      }
      if (event.keyCode == 13 && ucc.sendKey == 0) { // 13是enter键，enter键发送
        if (event.ctrlKey || event.shiftKey) {
          try {
            var tR
            if (document.createRange) {
              tR = document.createRange()
            } else {
              tR = document.selection.createRange()
            }
            tR.text = '\r\n'
            tR.collapse(false)
            tR.select()
            return false
          } catch (e) {}
        } else {
          pEventM.sendMsg()
          return false
        }
      } else {
        if (event.keyCode == 13 && ucc.sendKey == 1) { // Ctrl+enter键发送
          if (event.ctrlKey || event.shiftKey) {
            pEventM.sendMsg()
            return false
          } else {
            try {
              var tR
              if (document.createRange) {
                tR = document.createRange()
              } else {
                tR = document.selection.createRange()
              }
              tR.text = '\r\n'
              tR.collapse(false)
              tR.select()
              return false
            } catch (e) {}
          }
        }
      }
    },
    glint: { // 标题闪烁
      time: 0,
      title: document.title,
      timer: null,
      titleGlitterFlag: 0,
      // 显示新消息提示
      show: function () {
        var glint = this
        var title = this.title.replace('【　　　】', '').replace('【新消息】', '')
        // 定时器，设置消息切换频率闪烁效果就此产生
        this.timer = setTimeout(function () {
          glint.time++
          glint.show()
          if (glint.time % 2 == 0) {
            document.title = '【新消息】' + title
          } else {
            document.title = '【　　　】' + title
          }
        }, 600)
        return [this.timer, this.title]
      },
      // 取消新消息提示
      clear: function () {
        clearTimeout(this.timer)
        document.title = this.title
        this.titleGlitterFlag = 0
      }
    },
    titleGlitter: function () {
      if (this.glint.titleGlitterFlag == 0) {
        this.glint.show()
      }
      this.glint.titleGlitterFlag = 1
    },
    closeChatSatisfaction: function () {
      if (ucc.BasicSetting.jump == 1) {
        if (datas.get('openSatisfactionAfterCloseChat') && !datas.get('hasSatisfaction')) {
          satisfaction.show()
        }
      }
    },
    scrollTop: function () {
      if ($('.dialogue-record-c')[0]) {
        $('.dialogue-record-c')[0].scrollTop = $('.dialogue-record-c')[0].scrollHeight
      }
    },
    showAdvertisement: function () { // 有插播时间限制 .
      var isVisable = parseInt(ucc.advertisement.isVisable)
      var accessDisplay = parseInt(ucc.advertisement.accessDisplay)
      var visitorWaiting = parseInt(ucc.advertisement.visitorWaiting)
      var beforeDisplayTime = parseInt(ucc.advertisement.beforeDisplayTime)
      if (isVisable == 1 && (accessDisplay == 2 || accessDisplay == 1)) {
        if (ucc.advertisement.startTime && ucc.advertisement.endTime) {
          var startTime = ucc.advertisement.startTime
          if (startTime.indexOf(':') > -1) {
            startTime = startTime.replace(':', '')
          }
          var endTime = ucc.advertisement.endTime
          if (endTime.indexOf(':') > -1) {
            endTime = endTime.replace(':', '')
          }
          var objDate = new Date()
          var currentHour = (objDate.getHours() < 10) ? ('0' + objDate.getHours()) : objDate.getHours()
          var currentMinutes = (objDate.getMinutes() < 10) ? ('0' + objDate.getMinutes()) : objDate.getMinutes()
          var currentTime = currentHour + '' + currentMinutes
        }
        var reg = new RegExp('&quot;', 'g')
        if (parseInt(startTime) <= parseInt(currentTime) && parseInt(currentTime) <= parseInt(endTime)) {
          if (visitorWaiting == 2) {
            setTimeout(function () {
              dialogue.showMsg({
                msgid: '',
                date: new Date().getTime(),
                content: ucc.advertisement.content.replace(reg, '"'),
                from: 'client',
                status: 0,
                saveIn: 1
              })
            }, beforeDisplayTime * 1e3)
          } else {
            dialogue.showMsg({
              msgid: '',
              date: new Date().getTime(),
              content: ucc.advertisement.content.replace(reg, '"'),
              from: 'client',
              status: 0
            })
          }
        }
      }
    },
    showFile: function (flag) { // 打开发送文件功能
      var file = $('.tool5')
      if (file.length != 0) {
        if (flag == 'on') {
          $('.tool5').show()
          storage.set('canSendFile', true)
          var _ms = '客服已经为您打开发送文件功能，要使用请点击面板上的按钮'
        } else {
          $('.tool5').hide()
          $('.sendFile').hide()
          var _ms = '客服已经关闭发送文件功能'
          storage.set('canSendFile', false)
        }
        dialogue.showSysMsg(_ms)
      }
    },
    openWin: function (message) {
      $('<div>' + message + '</div>').find('a').each(function () {
        var url = $(this).attr('href')
        var title = $(this).text()
        var isOpen = /^(下载|转人工)/.test(title)
        if (url && !isOpen) {
          tab.add(title, title, url, '1')
        }
      })
    },
    saveTopicType: function (type) {
      $.ajax({
        type: 'POST',
        url: 'echatManager.do',
        data: {
          method: 'saveTopicType',
          topicType: type,
          chatId: ucc.chatID,
          companyPk: ucc.companyPk
        },
        dataType: 'json'
      })
    },
    showAudio: function () {
      $('audio').each(function (index, el) {
        if (!$(el).parent().hasClass('audiojs')) {
          $this = $(this)
          audiojs.helpers.whenError = function () {
            var placeholder = $('.dialogue-in-c').find('a[placeholder]')
            placeholder.html('下载')
          }
          audiojs.create($this)
        }
      })
    },
    reconnectClick: false,
    initFaceJs: function () {
      $('.area-top-p span').showLabel()
      $('#font1').click(function () {
        if ($('#font1-c').is(':hidden')) {
          $('#font1-c').show()
        } else {
          $('#font1-c').hide()
        }
      })
      $('#font2').click(function () {
        if ($('#font2-c').is(':hidden')) {
          $('#font2-c').show()
        } else {
          $('#font2-c').hide()
        }
      })
      $('#font1-c span').click(function () {
        var font_text = $(this).text()
        $('#font1').text(font_text)
        $('#font1-c').hide()
        // 字体样式，宋体
        $('.dialogue-area-write').css('font-family', font_text)
        fontStyle.set('fontFamily', font_text)
      })
      $('#font2-c span').click(function () {
        var font_text2 = $(this).text()
        $('#font2').text(font_text2)
        $('#font2-c').hide()
        // 字体大小
        $('.dialogue-area-write').css('font-size', font_text2 + 'px')
        $('.dialogue-area-write').css('line-height', font_text2 + 'px')
        fontStyle.set('fontSize', font_text2 + 'px')
        fontStyle.set('lineHeight', font_text2 + 'px')
      })
      // 字体选择，粗体、斜体
      $('.dialogue-area-top .font').toggle(function () {
        $(this).addClass('font-current-click')
        var font = $(this).attr('id')
        updateCss(1, font)
      }, function () {
        $(this).removeClass('font-current-click')
        var font = $(this).attr('id')
        updateCss(2, font)
      })
      // 添加去掉样式

      function updateCss (type, value) {
        var fs = fontStyle
        if (type == 1) { // 添加
          if (value == 'weight') {
            $('.dialogue-area-write').css('fontWeight', 'bold')
            fontStyle.set('fontWeight', 'bold')
          } else if (value == 'em') {
            $('.dialogue-area-write').css('font-style', 'italic')
            fontStyle.set('fontStyle', 'italic')
          } else if (value == 'decoration') {
            $('.dialogue-area-write').css('text-decoration', 'underline')
            fontStyle.set('textDecoration', 'underline')
          }
        } else if (type == 2) { // 去掉
          if (value == 'weight') {
            $('.dialogue-area-write').css('fontWeight', 'normal')
            fontStyle.set('fontWeight', 'normal')
          } else if (value == 'em') {
            $('.dialogue-area-write').css('font-style', 'normal')
            fontStyle.set('fontStyle', 'normal')
          } else if (value == 'decoration') {
            $('.dialogue-area-write').css('text-decoration', 'none')
            fontStyle.set('textDecoration', 'none')
          }
        }
      }

      // 点击颜色应用
      $('#font-color').click(function () {
        var fs = fontStyle
        $('#color_picker').colorPicker({
          defaultColor: fontStyle.get('defaultColor') ? fontStyle.get('defaultColor') : 13,
          // index of the default
          // color
          columns: 14,
          // number of columns
          click: function (c, i) {
            $('.dialogue-area-write').css('color', c) // 输入框字体颜色
            $('#font-color').css('background-color', c)
            fontStyle.set('color', c)
            fontStyle.set('defaultColor', i)
          }
        }).toggle()
      })
      $('#font-color').click() // 加载后点击
      $('#color_picker').hide() // 加载后点击

      $('.tool4').toggle(function () {
        $(this).addClass('click')
      }, function () {
        $(this).removeClass('click')
      })
      $('.tool5').toggle(function () {
        $(this).addClass('click')
      }, function () {
        $(this).removeClass('click')
      })
      $('.tool7').toggle(function () {
        $(this).addClass('click')
      }, function () {
        $(this).removeClass('click')
      })

      // 发送的切换效果
      $('.send-key-c p').click(function () {
        $(this).children('.send-ok').addClass('send-ok-ok')
        // 获取发送键的值赋给ucc.sendkey
        ucc.sendKey = $(this).children('.send-ok').attr('data-send')
        storage.set('sendKey', ucc.sendKey)
        $(this).siblings('.send-key-c p').children('.send-ok').removeClass('send-ok-ok')
        $('.send-key').hide()
      })
      $(".send-key-c p .send-ok[data-send='" + storage.get('sendKey') + "']").click()
      // 弹出层，点击空白处，弹出层消失
      // 发送按钮
      $('.send-select').click(function (event) {
        var e = window.event || event
        if (e.stopPropagation) {
          e.stopPropagation()
        } else {
          e.cancelBubble = true
        }
        $('.send-key').show()
      })
      $('.send-key').click(function (event) {
        var e = window.event || event
        if (e.stopPropagation) {
          e.stopPropagation()
        } else {
          e.cancelBubble = true
        }
      })

      // 表情
      $('.tool3').click(function (event) {
        $('.tool2-c').hide()
        $('.tool2').removeClass('click')
        var e = window.event || event
        if (e.stopPropagation) {
          e.stopPropagation()
        } else {
          e.cancelBubble = true
        }
        if ($('.face-c').is(':hidden')) {
          $('.face-c').show()
          $(this).addClass('click')
        } else {
          $('.face-c').hide()
          $(this).removeClass('click')
        }
        $('.lable3').hide()
      })
      // 字体
      $('.tool2').click(function (event) {
        $('.face-c').hide()
        $('.tool3').removeClass('click')
        var e = window.event || event
        if (e.stopPropagation) {
          e.stopPropagation()
        } else {
          e.cancelBubble = true
        }
        if ($('.tool2-c').is(':hidden')) {
          $('.tool2-c').show()
          $(this).addClass('click')
        } else {
          $('.tool2-c').hide()
          $(this).removeClass('click')
        }

        $('.lable2').hide()
      })

      $('.face-c').click(function (event) {
        var e = window.event || event
        if (e.stopPropagation) {
          e.stopPropagation()
        } else {
          e.cancelBubble = true
        }
      })

      // 点击空白处弹框消失
      $(document).click(function () {
        $('.send-key').hide()
        $('.face-c').hide()
        $('.tool3').removeClass('click')
      })
      $('.messagerecord').click(function () {
        var url = ucc.baseUrl + '/historyOperator.do?method=moreHistoryDialogue&visitorId=' + userDatas.getVisitorInfo().visitorId + '&companyPk=' + ucc.companyPk
        var title = '消息记录'
        tab.add(title, title, url)
      })
      $('#tab_title li[index=1] a,#tab_title li[index=2] a').remove() // 隐藏前2个页签的关闭按钮
      // 修改留言的高度
      var inputs = $("#liuyan-c input[type='text']").length
      var textare = $('#liuyan-c textarea').length
      var h = $('#liuyan-content').height()
      h = h - (5 - inputs) * 48 - (1 - textare) * 90
      $('#liuyan-content').height(h + 'px')
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
                localHistory.saveCurrent()
                // 在关闭对话,并且用户有过一次以上留言打开满意度
                datas.set('openSatisfactionAfterCloseChat', false)
                // 已打开满意度将不再打开
                datas.set('hasSatisfaction', false)
                // 是否已经发送广告
                datas.set('adv', false)
                var jsonStr = userDatas.getJsonStr()
                uccPcInit.initFunc()
                uccPcLogic.addmonitorJs() // 浏览轨迹
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

      // 图片缓加载
      $('img[defsrc]').each(function (index, el) {
        $(this).attr('src', $(this).attr('defsrc'))
      })
    },
    initPaste: function () {
      var pc = this
      $.fn.pasteFun = function () {
        var obj1 = $(this)
        // if (navigator.appVersion.indexOf("MSIE") == -1) {
        try {
          obj1.designMode = 'On'
        } catch (e) {}
        obj1.bind({
          paste: function (e) {
            if (!dialogue.islive()) return
            var isChrome = false
            if (e.clipboardData || e.originalEvent) {
              var clipboardData = (e.clipboardData || e.originalEvent.clipboardData)
              if (clipboardData && clipboardData.items) {
                var items = clipboardData.items,
                  len = items.length,
                  blob = null
                isChrome = true
                for (var i = 0; i < len; i++) {
                  if (items[i].type.indexOf('image') !== -1) {
                    blob = items[i].getAsFile()
                  }
                }
                if (blob !== null) {
                  e.preventDefault()
                  var reader = new FileReader()
                  reader.onload = function (event) {
                    // event.target.result 即为图片的Base64编码字符串
                    var base64_str = event.target.result
                    // 可以在这里写上传逻辑 直接将base64编码的字符串上传（可以尝试传入blob对象，看看后台程序能否解析）
                    pc.uploadImgFromPaste(base64_str, 'paste', isChrome)
                  }
                  reader.readAsDataURL(blob)
                }
              } else {
                // for firefox
                setTimeout(function () {
                  // 设置setTimeout的原因是为了保证图片先插入到div里，然后去获取值
                  var imgList = obj1.find('img'),
                    len = imgList.length,
                    src_str = '',
                    i
                  for (i = 0; i < len; i++) {
                    if (imgList[i].id !== 'img' && imgList[i].src.length > 100) {
                      // 如果是截图那么src_str就是base64 如果是复制的其他网页图片那么src_str就是此图片在别人服务器的地址
                      src_str = imgList[i].src
                      $(imgList[i]).remove()
                    }
                  }
                  pc.uploadImgFromPaste(src_str, 'paste', isChrome)
                }, 1)
              }
            } else {
              // for ie11
              setTimeout(function () {
                var imgList = obj1.find('img'),
                  len = imgList.length,
                  src_str = '',
                  i
                for (i = 0; i < len; i++) {
                  if (imgList[i].id !== 'img' && imgList[i].src.length > 100) {
                    src_str = imgList[i].src
                    $(imgList[i]).remove()
                  }
                }
                pc.uploadImgFromPaste(src_str, 'paste', isChrome)
              }, 1)
            }
            setTimeout(function () {
              var sendMsg = $('.dialogue-area-write').html()
              sendMsg = changeFaceFun.imgToIco(sendMsg)
              sendMsg = $('<div>' + sendMsg + '</div>').text()
              sendMsg = changeFaceFun.icoToImg(sendMsg)
              $('.dialogue-area-write').html(sendMsg)
              moveToLast($('.dialogue-area-write')[0])
            }, 1)
          }
        })
        // }
      }
      var moveToLast = function (obj) {
        if (window.getSelection) { // ie11 10 9 ff safari
          obj.focus() // 解决ff不获取焦点无法定位问题
          var range = window.getSelection() // 创建range
          range.selectAllChildren(obj) // range 选择obj下所有子内容
          range.collapseToEnd() // 光标移至最后
        } else if (document.selection) { // ie10 9 8 7 6 5
          var range = document.selection.createRange() // 创建选择对象
          // var range = document.body.createTextRange();
          range.moveToElementText(obj) // range定位到obj
          range.collapse(false) // 光标移至最后
          range.select()
        }
      }
      if (!(navigator.appVersion.split(';')[1] && navigator.appVersion.split(';')[1].replace(/[ ]/g, '') == 'MSIE9.0')) {
        $('.dialogue-area-write').pasteFun()
      }
    },
    uploadImgFromPaste: function (file, type, isChrome) {
      var pc = this
      var msgStr = '<img src="' + file + '">'
      var regBase64 = /<img\s*src="data:image\/.{0,5};base64,/i
      if (regBase64.test(msgStr)) {
        ajax.getScreenshotSrc(msgStr)
          .done(function (data) {
            var img = $('<div>' + data + '</div>').find('img')
            var src = img.attr('src')
            pc.storeImg(src).done(function (url) {
              var i = '<img id="img" src="' + url + '">'
              $('.dialogue-area-write').append(i)
              //                dialogue.sendMessage(i, "");
            })
          })
      }
    },
    storeImg: function (src) {
      var defered = new $.Deferred()
      var img = new Image()
      img.src = src
      if (img.complete) {
        return defered.resolve(src)
      }
      img.onload = function () {
        return defered.resolve(src)
      }
      img.onerror = function () {
        return defered.resolve(src)
      }
      return defered.promise()
    }
  }
  $.uccPcEvent = function (options) {
    var uccPcEvent = new UCCPCEVENT(options)
    return uccPcEvent
  }
})(window, jQuery)
