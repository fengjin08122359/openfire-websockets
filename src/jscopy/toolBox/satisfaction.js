var ajax = require('../util/ajax.js');
/* satisfaction.js 满意度 */
(function (window, $, undefined) {
  var SATISFACTION = function (options) {
    this.defaults = {
      dialogue: null,
      companyPk: '',
      langPk: '',
      chatId: '',
      title: '满意度调查',
      top: '您对本次服务满意吗？',
      bottom: "<div class='bottom'><div class='cancel'>取消</div><div class='submit'>确定</div></div>",
      generate: function () {}
    }, this.options = $.extend({}, this.defaults, options)
  }
  SATISFACTION.prototype = {
    hasSat: false,
    init: function () {
      var sat = this
      ajax.getSatisfaction(this.options.chatId)
        .done(function (result) {
          if (result) {
            sat.hasSat = true
            sat.createView(result)
          }
        })
    },
    check: function (arg) {

    },
    cancel: function () {
      this.options.dialogue.sendMessage('访客取消了满意度评价', 'cancelSatisfaction')
      this.hide()
    },
    createView: function (result) {
      if ($('.satisfactionView').length > 0) {
        $('.satisfactionView').remove()
      }
      var str = "<div class='satisfactionView view'><div class='board'></div></div>"
      var firstStr = "<div class='fr' data-pk='$1' data-parent='$2' data-name='$3'></div>"
      var secondStr = "<div class='sr' data-pk='$1' data-parent='$2' data-name='$3'></div>"

      $('body').append(str)
      var html = "<div class='title'>" + this.options.title + "<span class='cross'><img src='" + require('../../images/shut.png') + "'></span></div>"
      html += "<div class='body'><div class='top'>" + this.options.top + '</div>'
      for (var i = 0, len = result.length; i < len; i++) {
        var firstRank = result[i] // 第一级
        html += firstStr.replace(/\$1/g, firstRank.pk).replace(/\$2/g, firstRank.parentPk).replace(/\$3/g, firstRank.name)
        if (firstRank.children.length > 0) {
          for (var s = 0, slen = firstRank.children.length; s < slen; s++) {
            var secondRank = firstRank.children[s] // 第二级
            html += secondStr.replace(/\$1/g, secondRank.pk).replace(/\$2/g, secondRank.parentPk).replace(/\$3/g, secondRank.name)
          }
        }
      }
      html += "<div class='mome'><textarea placeholder='请输入详情'></textarea></div></div>"
      html += this.options.bottom
      $('.satisfactionView .board').html(html)
      this.hide()
      this.options.generate()
    },
    getElement: function (pk) {
      return $(".satisfactionView .board [data-pk='" + pk + "']")
    },
    getElementByParent: function (pk) {
      return $(".satisfactionView .board [data-parent='" + pk + "']")
    },
    submit: function (json) {
      // json{satisfactionPk,optionPk,satisfactionMemo,nextSatisfactionPk}
      var sat = this
      var dialogue = this.options.dialogue
      ajax.saveSatisfaction(sat.options.chatId, json)
        .done(function () {
          var reply = sat.getElement(json.optionPk).attr('data-name')
          var reasonStr = '，原因为：'
          var reason = ''
          if (json.nextSatisfactionPk) {
            var reasons = json.nextSatisfactionPk.split(',')
            for (var i in reasons) {
              if (!!reasons[i] && !!sat.getElement(reasons[i]).attr('data-name')) {
                reason += sat.getElement(reasons[i]).attr('data-name') + ','
              }
            }
          }
          if (reason.lastIndexOf(',') == reason.length - 1) {
            reason = reason.substring(0, reason.length - 1)
          }
          if (reason) {
            reason = reasonStr + reason
          }
          var message = '访客给您的满意度评价是：' + reply + reason
          dialogue.sendMessage(message, '', true)
          dialogue.showSysMsg('您给客服' + dialogue.getAttr('operatorName') + '的评价：' + reply + reason)
        })
      this.hide()
    },
    show: function () {
      if (this.hasSat) {
        $('.satisfactionView').show()
        //        $('.satisfactionView input,.satisfactionView textarea').addClass("hasplaceholder");
        $('.satisfactionView .board').css({
          marginTop: '-220px'
        })
        $('.satisfactionView textarea').focus().blur()
        $('.satisfactionView input,.satisfactionView textarea').not('.hasplaceholder').placeholder()
      }
    },
    hide: function () {
      $('.satisfactionView').hide()
    },
    expand: function (json) {
      var w = this
      this.options = $.extend({}, this.options, json)
    }
  }
  $.satisfaction = function (options) {
    var satisfaction = new SATISFACTION(options)
    return satisfaction
  }
})(window, jQuery)
