var ucc = require('../util/uccData.js')
var baseUrl = ucc.baseUrl
/* visitorRobot.js 智能推荐 */
var VISITORROBOT = function (options) {
  this.defaults = {
    companyPk: '',
    after: function (json) {},
    init: function () {},
    hide: function () {}
  }, this.options = $.extend({}, this.defaults, options)
}
VISITORROBOT.prototype = {
  msg: '',
  ok: true,
  init: function () {
    this.options.init()
  },
  check: function(msg) {
    this.checkNew(msg)
  },
  checkOld: function (msg) {
    var VR = this
    if (!VR.ok || !msg) {
      VR.options.hide()
    }
    if (msg == VR.msg || !VR.ok || !msg) return
    VR.msg = msg
    $.ajax({
      type: 'post',
      url: './qaInterface.do',
      data: {
        method: 'searchForQuestionByKeywords',
        companyPk: VR.options.companyPk,
        question: msg
      },
      dataType: 'json',
      async: false
    }).done(function (e) {
      if (e.success != false) {
        VR.options.after(e)
      } else {
        VR.ok = false
      }
    }).fail(function () {
      VR.ok = false
    })
  },
  checkNew: function(msg) {
    var VR = this;
    if(!VR.ok || !msg){
      VR.options.hide();
    }
    if (msg == VR.msg || !VR.ok || !msg) return;
    VR.msg = msg;
    $.ajax({
      type: "POST",
      url: baseUrl+"/echatManager.do",
      data: {
        method: "getSimilarQuestions",
        companyPk: VR.options.companyPk,
        visitorId:VR.options.visitorId,
        chatId:VR.options.chatId,
        channel:"web",
        question:msg,
        top:3
      },
      dataType: "json",
      async: false
    }).done(function(e) {
      if (e) {
        VR.options.newAfter(e);
      } else {
        //VR.ok = false;
      }
    }).fail(function() {
      VR.ok = false;
    })
  },
  hide: function () {
    this.options.hide()
  },
  expand: function (json) {
    var w = this
    this.options = $.extend({}, this.options, json)
  }
}
var visitorRobotFun = function (options) {
  var visitorRobot = new VISITORROBOT(options)
  return visitorRobot
}
$.visitorRobot = function (options) {
  var visitorRobot = new VISITORROBOT(options)
  return visitorRobot
}
