var ucc = require('./uccData.js')
var params = require('../util/getParameter.js')
var baseUrl = ucc.baseUrl
var messageAdapterUrl = '/httpTransport'

function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

var ajax = function (options, callback) {
  var dfd = new $.Deferred()
  var defaults = {
    url: '',
    dataType: 'json',
    type: 'POST',
    data: {},
    async: true,
    cache: true,
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  var json = $.extend({}, defaults, options)
  if (json.data) {
    json.data = filterNull(json.data)
  }
  if (json.contentType.indexOf('application/json') > -1) {
    json.data = JSON.stringify(json.data)
  }
  if (!callback) {
    callback = function (data) {
      return data
    }
  }
  $.ajax(json)
    .done(function (data) {
      dfd.resolve(callback(data, 'done'))
    })
    .fail(function (data) {
      dfd.reject(callback(data, 'fail'))
    })
    .always(function (data) {
      dfd.reject(callback(data, 'always'))
    })
  return dfd.promise()
}
exports.ajax = ajax
exports.getLangAndMessageSettings = function () {
  return ajax({
    url: baseUrl + '/echatManager.do',
    data: {
      method: 'getLangAndMessageSettings',
      companyPk: ucc.companyPk
    }
  }, function (e, status) {
    if (status === 'done') {
      ucc.defaultLangPk = e.lang.langPk
      ucc.messageDisplay = e.messageSettings.messageDisply
      ucc.messageContent = e.messageSettings.messageLang ? e.messageSettings.messageLang.content : ''
      ucc.messageTypeList = e.messageSettings.messageTypeList
      ucc.langMap = e.langMap
    } else if (status === 'fail') {
      ucc.defaultLangPk = ''
      ucc.messageDisplay = ''
      ucc.messageContent = ''
      ucc.messageTypeList = ''
      ucc.langMap = {

      }
    }
    return e
  })
}
exports.getSettingsAndService = function () {
  return ajax({
    url: baseUrl + '/echatManager.do',
    data: {
      method: 'getSettingsAndService',
      companyPk: ucc.companyPk,
      codeKey: ucc.codeKey,
      type: ucc.type
    }
  }, function (e, status) {
    if (status === 'done') {
      ucc.ecselfList = e.selfService
      ucc.BasicSetting = e.basiceSetting.BasicSetting
      ucc.ExtraSetting = e.basiceSetting.ExtraSetting
      ucc.OperatorBasicSettings = e.operatorSetting
      ucc.vocabulary = e.vocabulary
      ucc.period = 30
      ucc.isWs = e.isWs
    } else if (status === 'fail') {
      ucc.ecselfList = ''
      ucc.BasicSetting = ''
      ucc.ExtraSetting = ''
      ucc.OperatorBasicSettings = ''
      ucc.vocabulary = ''
      ucc.period = 30
      ucc.isWs = false
    }
    return e
  })
}
exports.getDepartment = function () {
  return ajax({
    url: baseUrl + '/echatManager.do',
    data: {
      method: 'getDepartment',
      companyPk: ucc.companyPk,
      codeKey: ucc.codeKey,
      type: ucc.type
    }
  }, function (e, status) {
    if (status === 'done') {
      ucc.businessList = e
    } else if (status === 'fail') {
      ucc.businessList = []
    }
    return e
  })
}
exports.getVisitosDisplay = function () {
  return ajax({
    url: baseUrl + '/echatManager.do',
    data: {
      method: 'getVisitosDisplay',
      companyPk: ucc.companyPk
    }
  }, function (e, status) {
    if (status === 'done') {
      ucc.tabList = e.tabLists
      ucc.buttonList = e.buttonListJson
      ucc.advertisement = e.advertisement
    } else if (status === 'fail') {
      ucc.tabList = []
      ucc.buttonList = []
      ucc.advertisement = ''
    }
    return e
  })
}
exports.getTmpCode = function () {
  return ajax({
    url: baseUrl + '/echatManager.do',
    data: {
      method: 'getTmpCode',
      companyPk: ucc.companyPk,
      codeKey: ucc.codeKey
    }
  }, function (e, status) {
    if (status === 'done') {
      ucc.aDset = e.aDset
    } else if (status === 'fail') {
      ucc.aDset = {}
    }
    return e
  })
}
exports.initChatId = function (visitorId) {
  return ajax({
    url: baseUrl + '/echatManager.do',
    data: {
      method: 'initChatId',
      companyPk: ucc.companyPk,
      vid: visitorId,
      hjUserData: params['hjUserData'],
      visitorInfo: params['visitorInfo']
    },
    async: false,
    cache: false
  }, function (e, status) {
    if (status === 'done') {

    } else if (status === 'fail') {

    }
    return e
  })
}
exports.getIp = function () {
  return ajax({
    url: baseUrl + '/echatManager.do',
    data: {
      method: 'getIp'
    },
    dataType: 'jsonp',
    async: false
  }, function (e, status) {
    return (typeof returnCitySN === 'object') ? returnCitySN : {
      'cip': '0.0.0.0',
      'cid': '0',
      'cname': '未知地区'
    }
  })
}
exports.generationVisitorsID = function () {
  return ajax({
    url: baseUrl + '/echatManager.do',
    data: {
      method: 'generationVisitorsID',
      companyPk: ucc.companyPk
    },
    async: false
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  })
}
exports.getVisitorsName = function (vid) {
  return ajax({
    url: baseUrl + '/echatManager.do',
    data: {
      method: 'getVisitorsName',
      visitorId: vid
    },
    async: false
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  })
}
exports.closeEchat = function (chatID, url, opname) {
  return ajax({
    url: messageAdapterUrl + '/onHttpMessage',
    data: {
      'fromType': 'visitor',
      'messageType': 'endChat',
      chatId: chatID
    },
    contentType: 'application/json;charset=utf-8'
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return e
    }
  })
  /* return ajax({
    url: baseUrl + '/echat.do',
    data: {
      method: 'closeEchat',
      chatID: chatID,
      url: url,
      opname: opname
    },
    async: false
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  }) */
}
exports.inQueue = function (message, IpStr) {
  return ajax({
    url: messageAdapterUrl + '/onHttpMessage',
    data: {
      'fromType': 'visitor',
      'messageType': 'startChat',
      'message': message,
      'body': '',
      'companyPk': ucc.companyPk,
      'langPk': ucc.defaultLangPk,
      'chatId': ucc.chatID
    },
    contentType: 'application/json;charset=utf-8'
  }, function (e, status) {
    if (status === 'done') {
      return $.parseJSON(e.message)
    } else if (status === 'fail') {
      return e
    }
  })
  /* return ajax({
    url: baseUrl + '/queue.do',
    data: {
      method: 'inQueue',
      chatID: ucc.chatID,
      companyPk: ucc.companyPk,
      langPk: ucc.defaultLangPk,
      message: message,
      IpStr: IpStr
    }
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return e
    }
  }) */
}
exports.getBusinessQueue = function (message, businessId, index, isTimeOut) {
  var body = JSON.stringify({businessId: businessId, index: index, isouttimes: isTimeOut})
  return ajax({
    url: messageAdapterUrl + '/onHttpMessage',
    data: {
      'fromType': 'visitor',
      messageType: 'getBusinessQueue',
      chatId: ucc.chatID,
      companyPk: ucc.companyPk,
      langPk: ucc.defaultLangPk,
      message: message,
      body: body
    },
    contentType: 'application/json;charset=utf-8'
  }, function (e, status) {
    if (status === 'done') {
      return $.parseJSON(e.message)
    } else if (status === 'fail') {
      return e
    }
  })
  /* return ajax({
    url: baseUrl + '/queue.do',
    data: {
      method: 'getBusinessQueue',
      chatID: ucc.chatID,
      companyPk: ucc.companyPk,
      langPk: ucc.defaultLangPk,
      message: message,
      businessId: businessId,
      index: index,
      isouttimes: isTimeOut
    }
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return e
    }
  }) */
}
exports.continueBusinessQueue = function (businessId) {
  var body = JSON.stringify({businessId: businessId})
  return ajax({
    url: messageAdapterUrl + '/onHttpMessage',
    data: {
      'fromType': 'visitor',
      messageType: 'continueQueue',
      chatId: ucc.chatID,
      companyPk: ucc.companyPk,
      langPk: ucc.defaultLangPk,
      body: body
    },
    contentType: 'application/json;charset=utf-8'
  }, function (e, status) {
    if (status === 'done') {
      return $.parseJSON(e.message)
    } else if (status === 'fail') {
      return e
    }
  })
  /* return ajax({
    url: baseUrl + '/queue.do',
    data: {
      method: 'continueBusinessQueue',
      chatID: ucc.chatID,
      companyPk: ucc.companyPk,
      langPk: ucc.defaultLangPk,
      businessId: businessId
    },
    async: false
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  }) */
}
exports.readMessage = function (chatId, url) {
  return ajax({
    url: messageAdapterUrl + '/onHttpMessage',
    data: {
      'fromType': 'visitor',
      chatId: chatId,
      messageType: 'readMessage'
    },
    contentType: 'application/json;charset=utf-8'
  }, function (e, status) {
    var root = {
      root: []
    }
    if (status === 'done') {
      if (e && e.body) {
        e.body = $.parseJSON(e.body)
        for (var i = 0, len = e.body.length; i < len; i++) {
          var item = e.body[i]
          root.root.push({date: new Date().getTime(), code: item.message, from: item.from, text: item.body, type: {text: item.messageType, value: item.messageType}})
        }
      }
      return root
    } else if (status === 'fail') {
      return root
    }
  })
  /* return ajax({
    url: baseUrl + '/echat.do',
    data: {
      method: 'readMessage',
      chatID: chatId,
      url: url
    },
    async: false,
    cache: false
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  }) */
}
exports.getReceivedMID = function (messageId, workGroupName) {
  return ajax({
    url: baseUrl + '/echat.do',
    data: {
      method: 'getReceivedMID',
      'messageId': messageId,
      'workGroupName': workGroupName
    },
    async: false
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  })
}
exports.sendMessage = function (chatId, txt, code, url, visitorId) {
  return ajax({
    url: messageAdapterUrl + '/onHttpMessage',
    data: {
      'fromType': 'visitor',
      chatId: chatId,
      body: txt,
      messageType: code || 'record',
      visitorId: visitorId
    },
    contentType: 'application/json;charset=utf-8'
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return e
    }
  })
  /* return ajax({
    url: baseUrl + '/echat.do',
    data: {
      method: 'sendMessage',
      chatID: chatId,
      message: txt,
      code: code,
      url: url,
      visitorId: visitorId
    },
    async: false
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  }) */
}
exports.getLangList = function () {
  return ajax({
    url: baseUrl + '/echatManager.do',
    data: {
      method: 'getLangList',
      companyPk: ucc.companyPk,
      langPk: ucc.defaultLangPk
    },
    async: false
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  })
}
exports.getLangListByPk = function (langType, langKey) {
  return ajax({
    url: baseUrl + '/echatManager.do',
    data: {
      method: 'getLangListByPk',
      companyPk: ucc.companyPk,
      langPk: ucc.defaultLangPk,
      langType: langType,
      langKey: langKey
    },
    async: false
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  })
}
exports.saveMessageBox = function (json) {
  var contentencode = json.content
  try {
    contentencode = encodeURIComponent(encodeURIComponent(contentencode))
  } catch (e) {}
  return ajax({
    url: baseUrl + '/echatManager.do',
    data: {
      method: 'saveMessageBox',
      messageTypePk: json.messageTypePk,
      companyPk: ucc.companyPk,
      name: json.name,
      telephone: json.telephone,
      email: json.email,
      title: json.title,
      content: json.content,
      company: json.company,
      brand: json.brand,
      contentencode: contentencode
    }
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  })
}
exports.setVisitorMonitor = function (monitorInfo) {
  var info = monitorInfo
  try {
    info = encodeURIComponent(JSON.stringify(monitorInfo))
  } catch (e) {}
  return ajax({
    url: baseUrl + '/visitorMonitor.do',
    data: {
      method: 'setVisitorMonitor',
      monitorInfo: info
    }
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  })
}
exports.getHistoryDialogue = function (page, visitorId) {
  return ajax({
    url: baseUrl + '/historyOperator.do',
    async: false,
    data: {
      method: 'getHistoryDialogue',
      page: page,
      visitorId: visitorId,
      companyPk: ucc.companyPk
    }
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  })
}
exports.getLeaveChat = function (visitorId) {
  return ajax({
    url: baseUrl + '/historyOperator.do',
    async: false,
    data: {
      method: 'getLeaveChat',
      visitorId: visitorId
    }
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  })
}

exports.getSatisfaction = function (chatId) {
  return ajax({
    url: baseUrl + '/echatManager.do',
    async: false,
    data: {
      method: 'getSatisfaction',
      companyPk: ucc.companyPk,
      langPk: ucc.defaultLangPk,
      chatID: chatId
    }
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  })
}

exports.saveSatisfaction = function (chatId, json) {
  return ajax({
    url: baseUrl + '/echatManager.do',
    async: false,
    data: {
      method: 'saveSatisfaction',
      companyPk: ucc.companyPk,
      chatID: chatId,
      satisfactionPk: json.satisfactionPk,
      optionPk: json.optionPk,
      satisfactionMemo: json.satisfactionMemo,
      nextSatisfactionPk: json.nextSatisfactionPk,
      rndVar: new Date().getTime()
    }
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  })
}
exports.getScreenshotSrc = function (msgStr) {
  return ajax({
    url: baseUrl + '/echatManager.do',
    async: false,
    data: {
      method: 'getScreenshotSrc',
      'sendMsg': msgStr
    },
    dataType: 'text'
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  })
}
exports.keepTenQA = function (chatID) {
  return ajax({
    url: baseUrl + '/echatManager.do',
    data: {
      method: 'keepTenQA',
      chatId: ucc.chatID
    }
  }, function (e, status) {
    if (status === 'done') {
      return ''
    } else if (status === 'fail') {
      return ''
    }
  })
}
exports.getConfig = function () {
  var dfd = new $.Deferred()
  return dfd.resolve({
    robot: false,
    businessList: [],
    visiotInformation: false,
    leaveMessage: false,
    satisfaction: false,
    satisfactionType: [],
    workTime: false,
    adv: false,
    normalQuestion: []
  })
}
exports.getPcAppearance = function () {
  var dfd = new $.Deferred()
  return dfd.resolve({
    title: 'Any800',
    titleLink: 'http://www.baidu.com',
    logo: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg',
    selectColor: 'blue',
    langType: '1',
    visitorIco: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg',
    clientIco: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg',
    robotIco: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg',
    backgroundImg: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg',
    toolsSelect: [],
    tabConfig: {
      type: 'web',
      link: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg',
      name: 'web'
    },
    tabConfig: {
      type: 'swiper',
      name: 'swiper',
      list: [{
        index: 0,
        url: '',
        link: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg'
      }, {
        index: 1,
        url: '',
        link: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg'
      }, {
        index: 2,
        url: '',
        link: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg'
      }]
    }
  })
}
exports.getH5Appearance = function () {
  var dfd = new $.Deferred()
  return dfd.resolve({
    title: 'Any800',
    selectColor: 'blue',
    langType: '1',
    visitorIco: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg',
    clientIco: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg',
    robotIco: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg',
    backgroundImg: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg'
  })
}
exports.getAnswer = function (visitorId, question) {
  return ajax({
    url: messageAdapterUrl + '/onHttpMessage',
    data: {
      'fromType': 'visitor',
      chatId: ucc.chatID,
      body: question,
      messageType: 'record',
      visitorId: visitorId
    },
    contentType: 'application/json;charset=utf-8'
  }, function (e, status) {
    if (status === 'done') {
      if (e.messageType == "humanService") {
        return "jumpToNormal"
      }
      return $.parseJSON(e.body)
    } else if (status === 'fail') {
      return e
    }
  })
  /*return ajax({
    url: baseUrl + '/echatManager.do',
    data: {
      method: 'getAnswer',
      companyPk: ucc.companyPk,
      visitorId: visitorId,
      chatId: ucc.chatID,
      channel: 'web',
      question: question
    },
    async: false
  }, function (e, status) {
    if (status === 'done') {
      return e
    } else if (status === 'fail') {
      return ''
    }
  })*/
}
exports.getSimilarQuestions = function (visitorId, question) {
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
  })
  return ajax({
    url: messageAdapterUrl + '/onHttpMessage',
    data: {
      'fromType': 'visitor',
      chatId: ucc.chatID,
      body: question,
      messageType: 'record',
      visitorId: visitorId
    },
    contentType: 'application/json;charset=utf-8'
  }, function (e, status) {
    if (status === 'done') {
      if (e.messageType == "humanService") {
        return "jumpToNormal"
      }
      return $.parseJSON(e.body)
    } else if (status === 'fail') {
      return e
    }
  })
}

