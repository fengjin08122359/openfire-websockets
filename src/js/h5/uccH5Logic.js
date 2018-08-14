var ucc = require('../util/uccData.js')
var ajax = require('../util/ajax.js');
(function (window, $, undefined) {
  var UCCH5LOGIC = function (options) {
    this.defaults = {},
    this.options = $.extend({}, this.defaults, options)
  }
  UCCH5LOGIC.prototype = {
    blistNum: 1,
    showBusinessList: function (businessPk) {
      var ev = this
      if (dialogue.islive()) return
      var bs = ''
      if (!datas.get('iswork')) return
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
            if (result.name) {
              var type = '离线'
              bs += '<span><a class="onlineCls" data-online="' + type + '" data-num="' + ev.blistNum + '" name="' + result.name + '" data-pk="' + result.pk + '">' + ev.blistNum + '.' + result.name + '【' + type + '】' + '</a></span><br>'
            } else {
              langTip.show('1', '1'); // 欢迎语1
              langTip.show('1', '2'); // 欢迎语2
              $('#fangke-liuyan').click(function () {
                leaveMessage.show()
              })
              return
            }
          }
        } else {
          var list = result.list
          for (var i = 0; i < list.length; i++) {
            var l = list[i]
            var type = l.type == 'online' ? '在线' : '离线'
            bs += '<span><a class="onlineCls" data-online="' + type + '" data-num="' + ev.blistNum + '" name="' + l.item.name + '" data-pk="' + l.item.pk + '">' + ev.blistNum + '.' + l.item.name + '【' + type + '】' + '</a></span><br>'
            ev.blistNum++
          }
        }
      }
      return bs
    },
    loadScheme: function () {
      uccH5Event.showVisitorInfo()
      ajax.getDepartment().done(function () {
        bList = $.businessList({
          businessList: ucc.businessList,
          aDset: ucc.aDset
        })
        langTip.show(1, 1)
      })
    },
    viewFunc: function () {
      if ($('.leaveMessageView').length > 0) {
        document.querySelector('.leaveMessageView').addEventListener('touchmove', function (evt) {
          evt._isScroller = true
        })
        $('.leaveMessageView textarea').on('focus', function () {
          document.querySelector('.leaveMessageView .body').scrollTop = document.querySelector('.leaveMessageView .body').scrollHeight
        })
      }
      if ($('.satisfactionView').length > 0) {
        document.querySelector('.satisfactionView').addEventListener('touchmove', function (evt) {
          evt._isScroller = true
        })
        $('.satisfactionView textarea').on('focus', function () {
          document.querySelector('.satisfactionView .body').scrollTop = document.querySelector('.satisfactionView .body').scrollHeight
        })
      }
      if ($('.visitorInformationView').length > 0) {
        document.querySelector('.visitorInformationView').addEventListener('touchmove', function (evt) {
          evt._isScroller = true
        })
        $('.visitorInformationView textarea').on('focus', function () {
          document.querySelector('.visitorInformationView .body').scrollTop = document.querySelector('.visitorInformationView .body').scrollHeight
        })
      }
    },
    initFace: function () {
      $('.footer-face span img').click(function () {
        $('#dialogue-footer-text').append($.clone(this))
        $('#dialogue-send').show()
        $('#dialogue-add').hide()
        uccH5Event.checkHeight(4)
      })
    },
    addmonitorJs: function () {
      setTimeout(function () {
        if(!dialogue.islive()){
          monitor = $.monitor({storage: storage, companyPk: ucc.companyPk, userDatas: userDatas})
        }
      }, 3000)
    }
  }
  $.uccH5Logic = function (options) {
    var uccH5Logic = new UCCH5LOGIC(options)
    return uccH5Logic
  }
})(window, jQuery)
