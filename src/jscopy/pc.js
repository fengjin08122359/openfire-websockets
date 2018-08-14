/* http://www.9client.com/ 021-4008837939 */
var uccCss = require('../css/ucc.less')
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
require('./pc/colorPicker.js')
require('./pc/fontStyle.js')
require('./pc/screenCapture.js')
require('./pc/setSkin.js')
require('./pc/showLabel.js')
require('./pc/systemInfo.js')
require('./pc/tab.js')
require('./pc/visitorRobot.js')
require('./pc/pcAppearance.js')
;(function (window, $, undefined) {
  ajax.getPcAppearance().done(function (data) {
    appearance = $.pcAppearance(data)
    require('./pc/uccPcInit.js')
    require('./pc/uccPcEvent.js')
    require('./pc/uccPcLogic.js')
    $(document).ready(function () {
      $('body').css('visibility', 'visible')
      pageLoad.done(function () {
        ucc.sendKey = 0
        uccPcEvent = $.uccPcEvent()
        uccPcLogic = $.uccPcLogic()
        uccPcInit = $.uccPcInit()
        uccPcInit.initBasic()
        uccPcInit.initData().done(function () {
          uccPcInit.initFunc()
          if (!dialogue.islive()) {
            if (!robot.isUse) {
              workTime.show()
              uccPcLogic.loadScheme() // 加载样式方案
            } else {
              uccPcLogic.checkRobot()
            }
            uccPcLogic.initWelcome() // 加载欢迎语
          }
          uccPcEvent.addEvent() // 添加事件
          uccPcEvent.unload()
          uccPcEvent.messageChange()
          uccPcLogic.toggleV() // 弹出收集访客信息
          skin.setTab()
          uccPcEvent.initFaceJs()
          uccPcEvent.initPaste()
          uccPcEvent.screenCapture()
          uccPcLogic.initFont() // 设置输入框字体
          uccPcInit.initSatifaction()
          uccPcInit.initLocalHistory()
          $('input, textarea').placeholder()
        })
      })
    })
  })
})(window, jQuery)
/* http://www.9client.com/ 021-4008837939 */
