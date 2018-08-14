var ajax = require('../util/ajax.js');
/* queue.js 队列 */
(function (window, $, undefined) {
  var QUEUE = function (options) {
    this.defaults = {
      chatID: '',
      companyPk: '',
      langPk: 0,
      message: {},
      IpStr: '',
      always: function (result) {

      },
      success: function (result) {

      },
      fail: function (result) {

      },
      leave: function () {

      },
      continueque: function () {

      }
    }, this.options = $.extend({}, this.defaults, options)
  }
  QUEUE.prototype = {
    businessId: '',
    businessName: '',
    isTimeOut: false,
    index: 1,
    failTime: 0,
    start: function (businessId, businessName) {
      var que = this
      ajax.inQueue(que.options.message, que.options.IpStr)
        .done(function (result) {
          if (result) {
            if (result.success == true) {
            // que.options.always(result);
              que.options.success(result)
            } else {
              if (result.inqueue == true) {
                que.getInfo(businessId, 0, false)
                que.options.always(result)
              } else if (result.errorCode == false) {
                que.getInfo(businessId, 0, false)
              } else if (result.server == false) {
                que.options.fail(result)
              } else {
                que.options.leave(result)
              }
            }
          }
          que.failTime = 0;
        })
        .fail(function (result) {
          que.failTime = que.failTime || new Date().getTime();
          if(new Date().getTime() - que.failTime > 9*1000){
            que.options.fail({msg:'网络问题,您已离开'});
          }else{
            setTimeout(function() {
              que.start(businessId, businessName)
            }, 1000);
          }
        })
    },
    getInfo: function (businessId, index, isTimeOut) {
      var que = this
      ajax.getBusinessQueue(que.options.message, businessId, index, isTimeOut)
        .done(function (result) {
          if (result) {
            if (result.success == true) {
              if (que.index != result.index) {
                que.index = result.index
                que.options.always(result)
              }
              if (result.workgroupName) {
                if (result.url) {
                  que.options.success(result)
                }
              } else if (result.inqueue == true) {
                setTimeout(function () {
                  que.options.always(result)
                  que.getInfo(businessId, result.index, false)
                }, 1000)
              } else {
                setTimeout(function () {
                  que.getInfo(businessId, result.index, false)
                }, 2000)
              }
            } else {
              if (result.over == false) {
                que.isTimeOut = true
                que.options.fail(result)
                setTimeout(function () {
                  if (que.isTimeOut == true) {
                    que.getInfo(businessId, result.index, true)
                  }
                }, 10000)
              } else if (result.server == false) {
                que.options.fail(result)
              } else {
                que.options.fail(result)
              }
            }
          }
          que.failTime = 0;
        }).fail(function (result) {
          que.failTime = que.failTime || new Date().getTime();
          if(new Date().getTime() - que.failTime > 9*1000){
            que.options.fail({msg:'网络问题,您已离开'});
          }else{
            setTimeout(function() {
              que.getInfo(businessId, que.index, false)
            }, 1000);
          }
        })
    },
    continueque: function (companyPk, langPk, businessId) {
      var que = this
      ajax.continueBusinessQueue(businessId)
        .done(function (result) {
          que.istimeout = false
          que.getInfo(businessId, 0, false)
          que.options.continueque(result)
        })
    },
    expand: function (json) {
      var w = this
      this.options = $.extend({}, this.options, json)
    }
  }
  $.queueManager = function (options) {
    var queueManager = new QUEUE(options)
    return queueManager
  }
})(window, jQuery)
