var ajax = require('../util/ajax.js');
/* leaveMessage.js 留言 */
(function (window, $, undefined) {
  var LEAVEMESSAGE = function (options) {
    this.defaults = {
      Alert: null,
      messageDisplay: [],
      messageContent: '',
      messageTypeList: [],
      title: '请留言',
      bottom: "<div class='bottom'><div class='cancel'>取消</div><div class='submit'>确定</div></div>",
      generate: function (combo) {

      },
      reset: function (arg) {

      },
      warn: function (el, text) {

      }
    }, this.options = $.extend({}, this.defaults, options)
  }
  var keySort = function (arr, fn) {
    var array = arr
    var fn = fn ||
      function (a, b) {
        return b > a
      }
    for (var i = 1, len = array.length; i < len; i++) {
      var key = array[i]
      var j = i - 1
      while (j >= 0 && fn(array[j], key)) {
        array[j + 1] = array[j]
        j--
      }
      array[j + 1] = key
    }
    return array
  }

  function keysrt (key, desc) {
    return function (a, b) {
      return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key])
    }
  }
  LEAVEMESSAGE.prototype = {
    hasCreate: false,
    init: function () {
      var LM = this
      if (LM.options.messageDisplay.length > 0) {
        LM.options.messageDisplay = keySort(LM.options.messageDisplay, keysrt('sort', false))
        LM.createView()
        LM.hasCreate = true
      }
    },
    check: function (displayname) {
      var LM = this
      $('.leaveMessageView .col').removeClass('warn')
      var can = true
      $('.leaveMessageView .col').each(function (index, el) {
        var $this = $(this)
        if (can == false) return
        if (!!displayname && $this.data('displayname') != displayname) return
        if ($this.data('displayname') == 'company') {
          if ($this.data('require') == 1 && $this.find('input').val() == '') {
            LM.options.warn($this, '公司名称不能为空')
            $this.addClass('warn')
            can = false
            return
          } else if ($this.find('input').val().length > 30) {
            LM.options.warn($this, '公司名称最大长度为30字符')
            $this.addClass('warn')
            can = false
            return
          }
        }
        if ($this.data('displayname') == 'name') {
          if ($this.data('require') == 1 && $this.find('input').val() == '') {
            LM.options.warn($this, '姓名不能为空')
            $this.addClass('warn')
            can = false
            return
          } else if ($this.find('input').val().length > 20) {
            LM.options.warn($this, '姓名最大长度为20字符')
            $this.addClass('warn')
            can = false
            return
          }
        }
        if ($this.data('displayname') == 'telephone') {
          if ($this.data('require') == 1 && $this.find('input').val() == '') {
            LM.options.warn($this, '电话不能为空')
            $this.addClass('warn')
            can = false
            return
          }
          if ($this.find('input').val() == '') return
          var re = new RegExp(/^[1][0-9]{1}[0-9]{9}$/)
          if (!re.test($this.find('input').val())) {
            LM.options.warn($this, '请填写正确的电话')
            $this.addClass('warn')
            can = false
            return
          }
        }
        if ($this.data('displayname') == 'email') {
          if ($this.data('require') == 1 && $this.find('input').val() == '') {
            LM.options.warn($this, '电子邮件不能为空')
            $this.addClass('warn')
            can = false
            return
          }
          if ($this.find('input').val() == '') return
          var reg = new RegExp(/^[\-\._A-Za-z0-9]+@([_A-Za-z0-9\-]+\.)+[A-Za-z0-9]{2,3}$/)
          if (!reg.test($this.find('input').val())) {
            LM.options.warn($this, '请填写正确的电子邮件')
            $this.addClass('warn')
            can = false
            return
          } else if ($this.find('input').val().length > 50) {
            LM.options.warn($this, '电子邮件最大长度为50字符')
            $this.addClass('warn')
            can = false
            return
          }
        }
        if ($this.data('displayname') == 'title') {
          if ($this.data('require') == 1 && $this.find('input').val() == '') {
            LM.options.warn($this, '主题不能为空')
            $this.addClass('warn')
            can = false
            return
          } else if ($this.find('input').val().length > 50) {
            LM.options.warn($this, '主题最大长度为50字符')
            $this.addClass('warn')
            can = false
            return
          }
        }
        if ($this.data('displayname') == 'content') {
          if ($this.data('require') == 1 && $this.find('textarea').val() == '') {
            LM.options.warn($this, '内容不能为空')
            $this.addClass('warn')
            can = false
          } else if ($this.find('textarea').val().length > 1000) {
            LM.options.warn($this, '内容最大长度为1000字符')
            $this.addClass('warn')
            can = false
          }
        }
      })
      return can
    },
    cancel: function () {
      this.hide()
    },
    createView: function () {
      var LM = this
      if ($('.leaveMessageView').length > 0) {
        $('.leaveMessageView').remove()
      }
      var str = "<div class='leaveMessageView view'><div class='board'></div></div>"
      $('body').append(str)
      var html = "<div class='title'>" + LM.options.title + "<span class='cross'><img src='" + require('../../images/shut.png') + "'></span></div>"
      html += "<div class='body'>"
      if (LM.options.messageContent) {
        html += "<div class='top'>" + LM.options.messageContent + '</div>'
      }
      var colStr = "<div class='col' data-type='$0' data-require='$1' data-name='$2' data-markedwords='$3' data-displayname='$4' ></div>"
      for (var i in LM.options.messageDisplay) {
        var item = LM.options.messageDisplay[i]
        if (item.display == 1 && item.displayName == 'messageTypePk') {
          html += colStr.replace(/\$0/g, item.judgeDisplay).replace(/\$1/g, item.required).replace(/\$2/g, item.name).replace(/\$3/g, item.markedWords).replace(/\$4/g, item.displayName)
        }
      }
      for (var i in LM.options.messageDisplay) {
        var item = LM.options.messageDisplay[i]
        if (item.display == 1 && item.displayName != 'messageTypePk') {
          html += colStr.replace(/\$0/g, item.judgeDisplay).replace(/\$1/g, item.required).replace(/\$2/g, item.name).replace(/\$3/g, item.markedWords).replace(/\$4/g, item.displayName)
        }
      }
      html += '</div>'
      html += this.options.bottom
      $('.leaveMessageView .board').html(html)
      this.hide()
      this.options.generate(LM.options.messageTypeList)
    },
    submit: function (json) {
      var LM = this
      var Alert = LM.options.Alert
      if (!LM.check()) return false
      if (!json.messageTypePk) {
        LM.options.warn($(".leaveMessageView [data-displayname='messageTypePk']"), '请选择留言分类')
        $(".leaveMessageView [data-displayname='messageTypePk']").addClass('warn')
        can = false
        return
      }
      ajax.saveMessageBox(json)
        .done(function (dataObj) {
          if (dataObj.success == true) {
            Alert.show(dataObj.msg)
            LM.reset()
            LM.hide()
          } else {
            Alert.show(dataObj.msg)
          }
        })
      LM.hide()
    },
    reset: function (argument) {
      this.options.reset
    },
    show: function () {
      if (this.hasCreate) {
        $('.leaveMessageView').show()
        //        $('.leaveMessageView input,.leaveMessageView textarea').addClass("hasplaceholder");
        $('.leaveMessageView .board').css({
          marginTop: -$('.leaveMessageView .board').height() / 2
        })
        $('.leaveMessageView input,.leaveMessageView textarea').not('.hasplaceholder').placeholder()
      }
    },
    hide: function () {
      $('.leaveMessageView').hide()
    },
    expand: function (json) {
      var w = this
      this.options = $.extend({}, this.options, json)
    }
  }
  $.leaveMessage = function (options) {
    var leaveMessage = new LEAVEMESSAGE(options)
    leaveMessage.init()
    return leaveMessage
  }
})(window, jQuery)
