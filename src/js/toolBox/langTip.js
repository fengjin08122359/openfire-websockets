var ajax = require('../util/ajax.js')
/* langTip.js 提示语 */
var LANGTIP = function (options) {
  this.defaults = {
    companyPk: '',
    defaultLangPk: '',
    langMap: {},
    show: function (data) {}
  }, this.options = $.extend({}, this.defaults, options)
}
LANGTIP.prototype = {
  type: {
    system: 1,
    operator: 2
  },
  // one:系统提示语 two:自动应答
  key: {
    welcome_1: 1,
    welcome_2: 2,
    chat_ad: 3,
    cs_busy: 4,
    no_answer_close: 5,
    no_answer_hint: 6,
    dialog_start: 7
  },
  langMap: {},
  init: function () {
    var langTip = this
    if (Object.keys(langTip.options.langMap).length > 0) {
      langTip.langMap = langTip.options.langMap
      return
    }
    ajax.getLangList()
      .done(function (data) {
        if (!data) return
        langTip.langMap = data
      })
  },
  show: function (t, k) {
    var langTip = this
    if (t == 1) {
      if (langTip.langMap && langTip.langMap[k]) {
        langTip.options.show(langTip.langMap[k])
      }
    } else {
      ajax.getLangListByPk(t, k)
        .done(function (data) {
          if (!data) return
          langTip.options.show(data)
        })
    }
  }
}
$.langTip = function (options) {
  var langTip = new LANGTIP(options)
  langTip.init()
  return langTip
}
