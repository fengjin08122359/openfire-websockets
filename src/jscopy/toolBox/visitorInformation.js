/* visitorInformation.js 用户信息收集 */
(function (window, $, undefined) {
  var VISITORINFORMATION = function (options) {
    this.defaults = {
      storage: null,
      Alert: null,
      title: '请填写以下信息',
      storageVisitor: 'visitor',
      bottom: "<div class='bottom'><div class='cancel'>取消</div><div class='submit'>确定</div></div>",
      generate: function (combo) {},
      warn: function (el, text) {},
      submitFun: function () {},
      cancelFun: function () {}
    }, this.options = $.extend({}, this.defaults, options)
  }
  VISITORINFORMATION.prototype = {
    hasCreate: false,
    visitor: {
      'visitorId': '',
      'company': '',
      'visitorName': '',
      'sex': '0',
      'degree': '',
      'realName': '',
      'phone': '',
      'mobile': '',
      'email': '',
      'QQ': '',
      'MSN': '',
      'address': '',
      'extension': '',
      'memberId': ''
    },
    init: function () {
      var VI = this
      var storage = VI.options.storage
      if (storage.get(VI.options.storageVisitor)) {
        VI.visitor = storage.get(VI.options.storageVisitor)
      }
      VI.createView()
      VI.hasCreate = true
    },
    check: function () {
      var VI = this
      $('.visitorInformationView .col').removeClass('warn')
      var can = true
      $('.visitorInformationView .col').each(function (index, el) {
        var $this = $(this)
        if (can == false) return
        if ($this.data('displayname') == 'visitorName') {
          var reg = new RegExp((/^[a-zA-Z0-9\u4e00-\u9fa5]+(\s[a-zA-Z0-9\u4e00-\u9fa5]+|)$/))
          if ($this.data('require') == 1 && $this.find('input').val() == '') {
            VI.options.warn($this, '昵称不能为空')
            $this.addClass('warn')
            can = false
            return
          } else if ($this.find('input').val().length > 20) {
            VI.options.warn($this, '昵称最大长度为20字符')
            $this.addClass('warn')
            can = false
            return
          } else if (!reg.test($this.find('input').val())) {
            VI.options.warn($this, '请输入中文、英文和数字！')
            $this.addClass('warn')
            can = false
            return
          }
        }
        if ($this.data('displayname') == 'realName') {
          if ($this.find('input').val().length > 20) {
            VI.options.warn($this, '姓名最大长度为20字符')
            $this.addClass('warn')
            can = false
            return
          }
        }
        if ($this.data('displayname') == 'phone') {
          if ($this.find('input').val() == '') return
          var re = new RegExp(/^[1][0-9]{1}[0-9]{9}$/)
          if (!re.test($this.find('input').val())) {
            VI.options.warn($this, '请填写正确的手机号码')
            $this.addClass('warn')
            can = false
            return
          }
        }
        if ($this.data('displayname') == 'phone') {
          if ($this.find('input').val() == '') return
          var re = new RegExp(/^[1][0-9]{1}[0-9]{9}$/)
          if (!re.test($this.find('input').val())) {
            VI.options.warn($this, '请填写正确的手机号码')
            $this.addClass('warn')
            can = false
            return
          }
        }
        if ($this.data('displayname') == 'QQ') {
          if ($this.find('input').val().length > 20) {
            VI.options.warn($this, 'QQ最大长度为20字符')
            $this.addClass('warn')
            can = false
            return
          }
        }
        if ($this.data('displayname') == 'email') {
          if ($this.find('input').val() == '') return
          var reg = new RegExp(/^[\-\._A-Za-z0-9]+@([_A-Za-z0-9\-]+\.)+[A-Za-z0-9]{2,3}$/)
          if (!reg.test($this.find('input').val())) {
            VI.options.warn($this, '请填写正确的邮箱')
            $this.addClass('warn')
            can = false
            return
          } else if ($this.find('input').val().length > 50) {
            VI.options.warn($this, '邮箱最大长度为50字符')
            $this.addClass('warn')
            can = false
            return
          }
        }
        if ($this.data('displayname') == 'address') {
          if ($this.find('input').val().length > 50) {
            VI.options.warn($this, '地址最大长度为50字符')
            $this.addClass('warn')
            can = false
            return
          }
        }
        if ($this.data('displayname') == 'company') {
          if ($this.find('input').val().length > 50) {
            VI.options.warn($this, '公司名称最大长度为50字符')
            $this.addClass('warn')
            can = false
          }
        }
      })
      return can
    },
    cancel: function () {
      this.options.cancelFun()
      this.hide()
    },
    createView: function () {
      var VI = this
      if ($('.visitorInformationView').length > 0) {
        $('.visitorInformationView').remove()
      }
      var str = "<div class='visitorInformationView view'><div class='board'></div></div>"
      $('body').append(str)
      var html = "<div class='title'>" + VI.options.title + "<span class='cross'><img src='" + require('../../images/shut.png') + "'></span></div>"
      html += "<div class='body'>"
      html += "<div class='col' data-type='input' data-require='1' data-name='昵称' data-placeholder='请输入昵称' data-displayname='visitorName' ></div>"
      html += "<div class='col' data-type='radio' data-require='0' data-name='性别'  data-markedwords='" + (VI.visitor.sex ? VI.visitor.sex : '') + "' data-displayname='sex' ></div>"
      html += "<div class='col' data-type='input' data-require='0' data-name='姓名' data-placeholder='请输入姓名' data-markedwords='" + (VI.visitor.realName ? VI.visitor.realName : '') + "' data-displayname='realName' ></div>"
      html += "<div class='col' data-type='input' data-require='0' data-name='手机' data-placeholder='请输入手机号码' data-markedwords='" + (VI.visitor.phone ? VI.visitor.phone : '') + "' data-displayname='phone' ></div>"
      html += "<div class='col' data-type='input' data-require='0' data-name='QQ' data-placeholder='请输入QQ号码' data-markedwords='" + (VI.visitor.QQ ? VI.visitor.QQ : '') + "' data-displayname='QQ' ></div>"
      html += "<div class='col' data-type='input' data-require='0' data-name='邮箱' data-placeholder='请输入邮箱地址' data-markedwords='" + (VI.visitor.email ? VI.visitor.email : '') + "' data-displayname='email' ></div>"
      html += "<div class='col' data-type='input' data-require='0' data-name='地址' data-placeholder='请输入地址' data-markedwords='" + (VI.visitor.address ? VI.visitor.address : '') + "' data-displayname='address' ></div>"
      html += "<div class='col' data-type='input' data-require='0' data-name='公司' data-placeholder='请输入公司名称' data-markedwords='" + (VI.visitor.company ? VI.visitor.company : '') + "' data-displayname='company' ></div>"
      html += '</div>'
      html += this.options.bottom
      $('.visitorInformationView .board').html(html)
      this.hide()
      this.options.generate()
    },
    submit: function (json) {
      var VI = this
      var storage = VI.options.storage
      if (!VI.check()) return
      var visitor = storage.get(VI.options.storageVisitor)
      visitor = $.extend({}, visitor, json)
      storage.set(VI.options.storageVisitor, visitor)
      VI.visitor = visitor
      storage.set('isSave', 0)
      VI.options.submitFun(VI.visitor)
      VI.hide()
    },
    show: function () {
      if (this.hasCreate) {
        $('.visitorInformationView').show()
        $('.visitorInformationView .board').css({
          marginTop: -$('.visitorInformationView .board').height() / 2
        })
      }
    },
    hide: function () {
      $('.visitorInformationView').hide()
    }
  }
  $.visitorInformation = function (options) {
    var visitorInformation = new VISITORINFORMATION(options)
    visitorInformation.init()
    return visitorInformation
  }
})(window, jQuery)
