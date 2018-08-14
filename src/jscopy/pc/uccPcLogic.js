var ajax = require('../util/ajax.js')
;
(function (window, $, undefined) {
  var UCCPCLOGIC = function (options) {
    this.defaults = {}, this.options = $.extend({}, this.defaults, options)
  }
  UCCPCLOGIC.prototype = {
    showBusinessList: function (businessPk) {
      var ev = this
      if (dialogue.islive()) return
      var bs = ''
      // 2015-11-4新增过滤掉有上级的分类
      $('#bl').html('')
      if (!datas.get('iswork')) {
        return
      }
      var result = bList.generate(businessPk)
      if (result) {
        if (result.access) {
          if (result.online) {
            bList.setSelect(result.pk, result.name)
            storage.set('businessId', result.pk)
            storage.set('businessName', result.name)
            queue.reqStartQueue(result.pk, result.name)
            return
          } else {
            $('#message').html("<div class='service-info'><div style='line-height:18px;'>您好!欢迎使用在线客服系统,很高兴为您服务!<br/><p id='bl'></p>如果客服忙或者客服不在线,请选择在线<span class='dialogue-a' id='fangke-liuyan'>留言</span></div></div>")
            $('#fangke-liuyan').click(function () {
              leaveMessage.show()
            })
            if (result.name) {
              var type = '离线'
              bs += '<p><a data-online="离线" name="' + result.name + '" data-pk="' + result.pk + '">' + result.name + '【离线】' + '</a></p>'
            } else {
              return
            }
          }
        } else {
          if (!result.root) {
            bs += '<p><a class="back" >返回上级</a></p>'
          }
          var list = result.list
          for (var i = 0; i < list.length; i++) {
            var l = list[i]
            var type = l.type == 'online' ? '在线' : '离线'
            bs += '<p><a data-online="' + type + '" name="' + l.item.name + '" data-pk="' + l.item.pk + '">' + l.item.name + '【' + type + '】' + '</a></p>'
          }
        }
      }
      $('#bl').html(bs)
      // 业务点击进入对话
      $('.service-info').find('.back').unbind().click(function () {
        ev.showBusinessList(bList.getParentPk(businessPk))
      })
      $('.service-info').find('a[name]').unbind().click(function () {
        var pk = $(this).data('pk')
        var name = $(this).attr('name')
        if (bList.hasList(pk).length > 0) {
          ev.showBusinessList(pk)
          return
        }
        workTime.show()
        var text = $(this).html()
        if ($(this).data('online') == '在线') {
          bList.setSelect(pk, name)
          queue.reqStartQueue(pk, name)
        } else { // 的业务类型跳留言
          leaveMessage.show() // 提示留言
        }
      })
      // 留言点击
      $('.service-info').find("a[class='dialogue-a']").click(function () {
        leaveMessage.show() // 提示留言
      })
    },
    loadScheme: function () {
      var ev = this
      ajax.getDepartment().done(function () {
        bList = $.businessList({
          businessList: ucc.businessList,
          aDset: ucc.aDset
        })
        ev.showBusinessList('-1')
      })
    },
    checkRobot: function () {
      $('.send').removeAttr('disabled') // 起开发送开关
      $('.dialogue-area-write').attr('contentEditable', 'true') // 开启编辑窗口
    },
    initWelcome: function () {
      if (!dialogue.islive()) {
        if (robot.isUse) {
          langTip.show('2', '1') // 自动应答欢迎语
        } else {
          langTip.show('1', '1') // 欢迎语1
          langTip.show('1', '2') // 欢迎语2
        }
      }
    },
    toggleV: function () {
      if (ucc.BasicSetting.need == 1) {
        var isSave = storage.get('isSave')
        if (isSave != 0) {
          visitorInformation.show()
        }
      }
    },
    initFont: function () {
      $('.dialogue-area-write').css('color', fontStyle.get('color'))
      $('.dialogue-area-write').css('font-weight', fontStyle.get('fontWeight'))
      $('.dialogue-area-write').css('font-style', fontStyle.get('fontStyle'))
      $('.dialogue-area-write').css('text-decoration', fontStyle.get('textDecoration'))
      $('.dialogue-area-write').css('font-size', fontStyle.get('fontSize'))
      $('.dialogue-area-write').css('line-height', fontStyle.get('lineHeight'))
      $('.dialogue-area-write').css('font-family', fontStyle.get('fontFamily'))
      $('.tool2-c #font1-c span').each(function (index, el) {
        if ($(this).text() == fontStyle.get('fontFamily')) {
          $(this).click()
        }
      })
      $('.tool2-c #font2-c span').each(function (index, el) {
        if ($(this).text() == fontStyle.get('fontSize')) {
          $(this).click()
        }
      })
      if (fontStyle.get('fontWeight') != 'normal') {
        $('.tool2-c .tool-font3 #weight').click()
      }
      if (fontStyle.get('fontStyle') != 'normal') {
        $('.tool2-c .tool-font3 #em').click()
      }
      if (fontStyle.get('textDecoration') != 'none') {
        $('.tool2-c .tool-font3 #decoration').click()
      }
      if (fontStyle.get('textDecoration') != 'none') {
        $('.tool2-c .tool-font3 #decoration').click()
      }
      if (fontStyle.get('color') != '#000000') {
        $('#font-color').css('background-color', fontStyle.get('color'))
      }
    },
    addmonitorJs: function () {
      setTimeout(function () {
        monitor = $.monitor({
          storage: storage,
          companyPk: ucc.companyPk,
          userDatas: userDatas
        })
      }, 3000)
    }
  }
  $.uccPcLogic = function (options) {
    var uccPcLogic = new UCCPCLOGIC(options)
    return uccPcLogic
  }
})(window, jQuery)
