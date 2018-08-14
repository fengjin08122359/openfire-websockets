/* http://www.9client.com/ 021-4008837939 */
var uccCss = require('../css/common.less')
require('./jquery-1.7.2.min.js')
require('./util/base.js')
var ajax = require('./util/ajax.js')
ucc = require('./util/uccData.js')
pageLoad = require('./util/pageLoad.js')
params = require('./util/getParameter.js')
require('./toolBox/Alert.js')
require('./toolBox/businesslist.js')
require('./toolBox/changeFace.js')
require('./toolBox/changeWindow.js')
require('./toolBox/data.js')
require('./toolBox/detectWeb.js')
require('./toolBox/dialogue.js')
require('./toolBox/history.js')
require('./toolBox/langTip.js')
require('./toolBox/leaveMessage.js')
require('./toolBox/localHistory.js')
require('./toolBox/monitor.js')
require('./toolBox/msgdb.js')
require('./toolBox/placeholder.js')
require('./toolBox/queue.js')
require('./toolBox/robot.js')
require('./toolBox/satisfaction.js')
require('./toolBox/sensitive.js')
require('./toolBox/showBigImg.js')
require('./toolBox/storage.js')
require('./toolBox/TimeoutList.js')
require('./toolBox/uploadFile.js')
require('./toolBox/userDatas.js')
require('./toolBox/visitLimit.js')
require('./toolBox/visitorInformation.js')
require('./toolBox/webSocket.js')
require('./toolBox/workTime.js')
require('./toolBox/confirmBox.js')
require('./h5/mobileInput.js')
require('./h5/systemInfo.js')
require('./h5/resetInterval.js')
require('./h5/h5Appearance.js')
;(function (window, $, undefined) {
  ajax.getH5Appearance().done(function (data) {
    appearance = $.h5Appearance(data)
    require('./h5/uccH5Init.js')
    require('./h5/uccH5Event.js')
    require('./h5/uccH5Logic.js')
    $(document).ready(function () {
      $('body').css('visibility', 'visible')
      pageLoad.done(function () {
        uccH5Event = $.uccH5Event()
        uccH5Logic = $.uccH5Logic()
        uccH5Init = $.uccH5Init()
        uccH5Init.initBasic()
        uccH5Init.initData().done(function () {
          uccH5Init.initFunc()
          if (!dialogue.islive()) {
            workTime.iswork()
            if (workTime.type == 0) {
              uccH5Logic.loadScheme() // 加载样式方案
            } else {
              workTime.show()
            }
          }
          uccH5Logic.initFace() // 设置输入框字体
          uccH5Event.binds()
          uccH5Logic.viewFunc() // 添加事件
          uccH5Init.initSatifaction()
          uccH5Init.initLocalHistory()
          uccH5Event.scrollToBottom()
          $('img[defsrc]').each(function (index, el) {
            $(this).attr('src', $(this).attr('defsrc'))
          })
        })
      })
    })
    setTimeout(function () {
      window.scrollTo(0, 1)
    }, 0)
  })
})(window, jQuery)
/* http://www.9client.com/ 021-4008837939 */
