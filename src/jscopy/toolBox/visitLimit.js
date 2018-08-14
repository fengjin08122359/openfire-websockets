var ucc = require('../util/uccData.js')
/* visitLimit.js 访问限制 */
var VISTILIMIT = function (options) {
  this.defaults = {
    open: '1',
    storage: null,
    time: 60 * 1000,
    num: 5,
    blockTime: 5 * 1000,
    url: ucc.baseUrl + '/overLoad.jsp'
  }, this.options = $.extend({}, this.defaults, options)
}
VISTILIMIT.prototype = {
  init: function () {
    if (this.options.open == '0') return
    var vl = this
    var storage = this.options.storage
    var visitLimit = storage.get('vLimit')
    var isLimit = storage.get('isLimit')
    var limitArray = []
    var now = new Date().getTime()
    if (visitLimit) {
      if (isLimit == 'islimited' && now - visitLimit[visitLimit.length - 1].time <= vl.options.blockTime) {
        window.location.href = vl.options.url
        return
      } else if (isLimit == 'islimited') {
        visitLimit = []
      }
      storage.set('isLimit', '')
      for (var i in visitLimit) {
        if (now - visitLimit[i].time < vl.options.time) {
          limitArray.push({
            time: visitLimit[i].time
          })
        }
      }
      limitArray.push({
        time: now
      })
      storage.set('vLimit', limitArray)
      if (limitArray.length > vl.options.num) {
        storage.set('isLimit', 'islimited')
        window.location.href = vl.options.url
      }
    } else {
      limitArray.push({
        time: now
      })
      storage.set('vLimit', limitArray)
    }
  }
}
$.visitLimit = function (options) {
  var visitLimit = new VISTILIMIT(options)
  return visitLimit
}
