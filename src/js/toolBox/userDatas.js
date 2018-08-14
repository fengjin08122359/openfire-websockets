var ajax = require('../util/ajax.js');
/* userDatas.js 数据信息 */
(function (window, $, undefined) {
  var mobile_type_arr = ['ipad', 'ipod', 'iphone', 'ios', 'ios', 'android', 'backerry', 'webos', 'symbian', 'windows phone', 'phone', 'blackberry'],
    mobile_pc_browser_json = {
      micromessenger: '微信浏览器',
      ucbrowser: 'UC浏览器',
      qqbrowser: 'QQ浏览器',
      opera: 'Opera浏览器',
      baidubrowser: '百度浏览器',
      firefox: '火狐浏览器',
      maxthon: '傲游浏览器',
      xiaomi: '小米手机浏览器',
      chrome: 'Chrome浏览器',
      android: 'android内置浏览器',
      iphone: 'iphone内置浏览器',
      ipod: 'opod内置浏览器',
      ipad: 'ipad内置浏览器'
    },
    pc_browser_json = {
      opera: 'Opera浏览器',
      maxthon: '傲游浏览器',
      tencenttraveler: 'TT浏览器',
      theworld: '天天浏览器',
      lbbrowser: '猎豹浏览器',
      chrome: 'Chrome浏览器',
      firefox: 'Firefox浏览器',
      msie: 'IE浏览器',
      safari: 'Safari浏览器',
			metasr:"搜狗浏览器"
    }
  var DATAS = function (options) {
    this.defaults = {
      param: null,
      storage: null,
      storageVisitor: 'visitor',
      storageIpStr: 'ipStr',
      storageChatNum: 'chatNum',
      companyPk: '',
      aDset: null,
      chatID: '',
      businessId: '',
      businessName: '',
      storageOldService: '',
      opShow: ''
    }, this.options = $.extend({}, this.defaults, options)
  }
  DATAS.prototype = {
    hasGetJson: false,
    hasGetVisitor: false,
    hasIpStr: false,
    getJsonStr: function () {
      var v = this
      var item = {}
      if (v.hasGetJson) v.options.param['mn'] = ''
      var visitorInfo = this.getVisitorInfo()
      var aDset = this.options.aDset
      var ipStr = this.getIpStr()
      if (!!v.options.param && !!v.options.param['mn']) {
        var param = JSON.parse(decodeURIComponent(v.options.param['mn']))
        item = {
          companyPk: v.options.companyPk,
          visitorId: visitorInfo.visitorId,
          visitorName: visitorInfo.visitorName,
          businessId: v.options.businessId,
          businessName: v.options.businessName,
          chatID: v.options.chatID,
          browsingNum: param.browsingNum,
          fromPage: param.fromPage ? param.fromPage : document.referrer.replace(/[&]/g, '%26') ? document.referrer.replace(/[&]/g, '%26') : '',
          title: '',
          ip: ipStr.cip,
          ipName: ipStr.cname,
          usersource: aDset ? aDset.scheme_Name : '',
          opShow: v.options.opShow,
          oldService: v.options.storageOldService,
          keyword: param.keyword,
          searchEngine: param.searchEngine,
          lastTime: Number(param.lastTime) ? param.lastTime : new Date(param.lastTime) == 'Invalid Date' ? '' : new Date(param.lastTime),
          firstTime: Number(param.firstTime) ? param.firstTime : new Date(param.firstTime) == 'Invalid Date' ? '' : new Date(param.firstTime),
          chatNum: v.getChatNum(),
          operatingSystem: v.getOperatingSystem(),
          visitor: visitorInfo,
          commodity: {
            'shopImgUrl': '',
            'shopName': '',
            'shopNum': '',
            'shopPrice': '',
            'shopUrl': ''
          }
        }
      } else {
        var old = v.options.storage.get('jsonStr')
        item = {
          visitorId: visitorInfo.visitorId,
          companyPk: v.options.companyPk,
          visitorName: visitorInfo.visitorName,
          businessId: v.options.businessId,
          businessName: v.options.businessName,
          chatID: v.options.chatID,
          browsingNum: old && old.browsingNum ? old.browsingNum : '',
          fromPage: old && old.fromPage ? old.fromPage : document.referrer.replace(/[&]/g, '%26') ? document.referrer.replace(/[&]/g, '%26') : '',
          title: old && old.title ? old.title : '',
          usersource: aDset ? aDset.scheme_Name : '',
          opShow: v.options.opShow,
          oldService: v.options.storageOldService,
          ip: ipStr.cip,
          ipName: ipStr.cname,
          keyword: old && old.keyword ? old.keyword : '',
          searchEngine: old && old.searchEngine ? old.searchEngine : '',
          lastTime: old && old.lastTime ? old.lastTime : '',
          firstTime: old && old.firstTime ? old.firstTime : '',
          chatNum: v.getChatNum(),
          operatingSystem: v.getOperatingSystem(),
          visitor: visitorInfo,
          commodity: {
            'shopImgUrl': '',
            'shopName': '',
            'shopNum': '',
            'shopPrice': '',
            'shopUrl': ''
          }
        }
      }

      if (!!v.options.param['pageInfo'] && !!v.options.param['isuse'] && v.options.param['isuse'] == 'true') {
        var pageInfo = decodeURIComponent(v.options.param['pageInfo'])
        var page = pageInfo.split('|')
        var fromPage = ''
        var title = ''
        if (page.length == 1) {
          title = page[0].trim()
          if (title == 'null') {
            title = ''
          }
        } else if (page.length >= 2) {
          title = page[0].trim()
          fromPage = page[1].trim()
          if (title == 'null') {
            title = ''
          }
          if (fromPage == 'null') {
            fromPage = ''
          }
        }
        item.title = encodeURIComponent(title)
        item.fromPage = encodeURIComponent(fromPage)
      } else {
        item.title = ''
        item.fromPage = ''
      }

      v.hasGetJson = true
      v.options.storage.set('jsonStr', item)
      return item
    },
    getChatNum: function () {
      if (!this.options.storage.get(this.options.storageChatNum)) {
        return 0
      }
      return this.options.storage.get(this.options.storageChatNum)
    },
    getOperatingSystem: function () {
      var p = this.options.param // 获取URL参数
      var s = 'pc'
      var userAgent = navigator.userAgent.toLowerCase()
      var reg_Exp = /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone|BlackBerry)/i
      if (userAgent.match(reg_Exp) != null) {
        s = 'mb'
      }
      if (!!p && !!p['qr']) {
        s = 'ma'
      }

      var sysResolution = window.screen.width + '×' + window.screen.height
      var language = navigator.systemLanguage ? navigator.systemLanguage : navigator.language ? navigator.language : ''
      var operatingSystem = {
        sysInfo: s,
        // 区分渠道
        browserName: this.getUserAgent().browser_name,
        browser: this.getUserAgent().browser_type,
        operatorSystem: this.getUserAgent().terminal_system,
        sysResolution: sysResolution,
        language: language
      }
      return operatingSystem
    },
    getUserAgent: function () {
      var userAgent_Data = {}
      var userAgent = navigator.userAgent.toLowerCase()
      var reg_Exp = /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone|BlackBerry)/i
      if (userAgent.match(reg_Exp) != null) {
        userAgent_Data['terminal_Type'] = '移动终端'
        for (var i = 0; i < mobile_type_arr.length; i++) {
          if (userAgent.indexOf(mobile_type_arr[i]) > -1) {
            userAgent_Data['terminal_system'] = mobile_type_arr[i]
            break
          }
        }
        if (userAgent_Data['terminal_system'] == null || userAgent_Data['terminal_system'] == '') {
          userAgent_Data['terminal_system'] = '未知'
        }
        for (var i in mobile_pc_browser_json) {
          if (userAgent.indexOf(i) > -1) {
            userAgent_Data['browser_type'] = mobile_pc_browser_json[i]
            userAgent_Data['browser_name'] = i
            break
          }
        }
        if (userAgent_Data['browser_type'] == null || userAgent_Data['browser_type'] == '') {
          userAgent_Data['browser_type'] = '未知'
          userAgent_Data['browser_name'] = '未知'
        }
      } else {
        userAgent_Data['terminal_Type'] = 'PC终端'
        var terminal_system = '未知'
        var isWin = (navigator.platform == 'Win32') || (navigator.platform == 'Windows')
        var isMac = (navigator.platform == 'Mac68K') || (navigator.platform == 'MacPPC') || (navigator.platform == 'Macintosh') || (navigator.platform == 'MacIntel')
        if (isMac) terminal_system = 'Mac'
        var isUnix = (navigator.platform == 'X11') && !isWin && !isMac
        if (isUnix) terminal_system = 'Unix'
        var isLinux = (String(navigator.platform).indexOf('Linux') > -1)
        if (isLinux) terminal_system = 'Linux'
        if (isWin) {
          var isWin2K = userAgent.indexOf('windows nt 5.0') > -1 || userAgent.indexOf('windows 2000') > -1
          if (isWin2K) terminal_system = 'Win2000'
          var isWinXP = userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows xp') > -1
          if (isWinXP) terminal_system = 'WinXP'
          var isWin2003 = userAgent.indexOf('windows nt 5.2') > -1 || userAgent.indexOf('windows 2003') > -1
          if (isWin2003) terminal_system = 'Win2003'
          var isWinVista = userAgent.indexOf('windows nt 6.0') > -1 || userAgent.indexOf('windows vista') > -1
          if (isWinVista) terminal_system = 'WinVista'
          var isWin7 = userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1
          if (isWin7) terminal_system = 'Win7'
          var isWin8 = userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 7') > -1
          if (isWin8) terminal_system = 'Win8'
          var isWin10 = userAgent.indexOf('windows nt 10.0') > -1 || userAgent.indexOf('windows 10') > -1
          if (isWin10) terminal_system = 'Win10'
          var isEdge = userAgent.indexOf('Edge') > -1
          if (isEdge) terminal_system = 'WinEdge'
        }
        userAgent_Data['terminal_system'] = terminal_system
        for (var i in pc_browser_json) {
          if (userAgent.indexOf(i) > -1) {
            userAgent_Data['browser_type'] = pc_browser_json[i]
            userAgent_Data['browser_name'] = i
            break
          }
        }
        if (userAgent_Data['browser_type'] == null || userAgent_Data['browser_type'] == '') {
          var isIE11 = terminal_system == 'Win10'
          var isEdge = terminal_system == 'WinEdge'
          if (isIE11 || isEdge) {
            userAgent_Data['browser_type'] = pc_browser_json['msie']
            userAgent_Data['browser_name'] = 'msie'
          } else {
            userAgent_Data['browser_type'] = '未知'
            userAgent_Data['browser_name'] = '未知'
          }
        }
      }
      userAgent_Data['flash_version'] = this.getFlash_version()
      return userAgent_Data
    },
    getFlash_version: function () {
      var f = '-',
        n = navigator
      if (n.plugins && n.plugins.length) {
        for (var ii = 0; ii < n.plugins.length; ii++) {
          if (n.plugins[ii].name.indexOf('Shockwave Flash') != -1) {
            f = n.plugins[ii].description.split('Shockwave Flash ')[1]
            break
          }
        }
      } else if (window.ActiveXObject) {
        for (var ii = 10; ii >= 2; ii--) {
          try {
            var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');")
            if (fl) {
              f = ii + '.0'
              break
            }
          } catch (e) {}
        }
      }
      return f
    },
    getIpStr: function () {
      var v = this
      if (v.hasGetIpStr) return v.options.storage.get(v.options.storageIpStr)
      var ipStr = null
      if (v.options.storage.get(v.options.storageIpStr)) ipStr = v.options.storage.get(v.options.storageIpStr)
      else {
        ajax.getIp()
          .done(function (e) {
            ipStr = e
          })
          .always(function (e) {
            ipStr = e
          })
          .fail(function (e) {
            ipStr = e
          })
      }
      v.hasGetIpStr = true
      v.options.storage.set(v.options.storageIpStr, ipStr)
      return ipStr
    },
    getVisitorInfo: function () {
      var v = this
      var item = {}
      if (!v.hasGetVisitor && !!v.options.param && !!v.options.param['mn']) {
        var param = JSON.parse(decodeURIComponent(v.options.param['mn']))
        item['visitorId'] = param.visitorId
        item['visitorName'] = param.visitorName

        if (v.options.param['hjUserData']) {
          // 姓名|性别|固定电话|手机|邮箱|地址|公司名|MSN|QQ|会员ID|
          // 会员等级|会员积分|会员订单（所有历史信息）
          var pDatas = decodeURIComponent(v.options.param['hjUserData'])
          var pData = pDatas.split('|')
          try {
            item['sex'] = pData[1]
            item['realName'] = pData[0]
            item['phone'] = pData[2]
            item['mobile'] = pData[3]
            item['email'] = pData[4]
            item['QQ'] = pData[8]
            item['MSN'] = pData[7]
            item['address'] = pData[5]
            item['company'] = pData[6]
            item['visitorId'] = pData[9]
            item['visitorName'] = pData[0]
          } catch (e) {}
        }
      } else if (!v.hasGetVisitor && !!v.options.param && !!v.options.param['memberPk']) {
        item['visitorId'] = v.options.param['memberPk']
      } else if (v.options.storage.get(v.options.storageVisitor)) {
        var data = v.options.storage.get(v.options.storageVisitor)
        item['visitorId'] = data.visitorId ? data.visitorId : ''
        if (item['visitorId'] == '') {
          ajax.generationVisitorsID()
            .done(function (dataObj) {
              if (dataObj) {
                item['visitorId'] = dataObj.visitorId
              }
            })
        }
        item['company'] = data.company ? data.company : ''
        item['visitorName'] = data.visitorName ? data.visitorName : '访客' + Number(item['visitorId'].substring(1))
        item['sex'] = !isNaN(Number(data.sex)) ? data.sex : 0
        item['degree'] = data.degree ? data.degree : ''
        item['realName'] = data.realName ? data.realName : ''
        item['phone'] = data.phone ? data.phone : ''
        item['mobile'] = data.mobile ? data.mobile : ''
        item['email'] = data.email ? data.email : ''
        item['QQ'] = data.QQ ? data.QQ : ''
        item['MSN'] = data.MSN ? data.MSN : ''
        item['address'] = data.address ? data.address : ''
        item['extension'] = data.extension ? data.extension : ''
        item['memberId'] = data.memberId ? data.memberId : ''
      }
      if (!item['visitorId']) {
        ajax.generationVisitorsID()
          .done(function (dataObj) {
            if (dataObj) {
              item['visitorId'] = dataObj.visitorId
              item['visitorName'] = '访客' + dataObj.showId
            }
          })
      }
      var vname = v.updateVisitorName(item, item['visitorId'])
      v.hasGetVisitor = true
      v.options.storage.set(v.options.storageVisitor, item)
      return item
    },
    updateVisitorName: function (item, vid) {
      var v = this
      if (!v.hasGetVisitor) {
        ajax.getVisitorsName(vid)
          .done(function (dataObj) {
            if (dataObj.success) {
              item['company'] = dataObj.company || item['company'] || ''
              item['visitorName'] = dataObj.name || item['visitorName'] || ''
              item['sex'] = !isNaN(Number(dataObj.sex)) ? dataObj.sex : item['sex'] ? item['sex'] : 0
              item['degree'] = dataObj.degree || item['degree'] || ''
              item['realName'] = dataObj.realName || item['realName'] || ''
              item['phone'] = dataObj.phone || item['phone'] || ''
              item['mobile'] = dataObj.mobile || item['mobile'] || ''
              item['email'] = dataObj.email || item['email'] || ''
              item['QQ'] = dataObj.QQ || item['QQ'] || ''
              item['MSN'] = dataObj.MSN || item['MSN'] || ''
              item['address'] = dataObj.address || item['address'] || ''
              item['extension'] = dataObj.extension || item['extension'] || ''
              item['memberId'] = dataObj.memberId || item['memberId'] || ''
            }
          })
      }
      return item
    }
  }
  $.userDatas = function (options) {
    var datas = new DATAS(options)
    return datas
  }
})(window, jQuery)
