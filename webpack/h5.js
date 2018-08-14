/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var ucc = __webpack_require__(1);
var params = __webpack_require__ (3);
var baseUrl = ucc.baseUrl;
var ajax = function(options,callback){
	var dfd = new $.Deferred();
	var defaults = {
	  url: "",
	  dataType: "json",
	  type: "POST",
	  data: {},
	  async:true,
	  cache:true
	};
	var json = $.extend({}, defaults, options);
	if(!callback){
		callback = function(data){
			return data;
		}
	}
	$.ajax(json)
	.done(function(data){
		dfd.resolve(callback(data,"done"));
	})
	.fail(function(data){
		dfd.reject(callback(data,"fail"));
	})
	.always(function(data){
		dfd.reject(callback(data,"always"));
	})
	return dfd.promise();
};
exports.ajax = ajax;
exports.getLangAndMessageSettings = function(){
return ajax({
	url: baseUrl+"/echatManager.do",
	data: {
	  method: "getLangAndMessageSettings",
	  companyPk: ucc.companyPk
	},
},function(e,status){
	if(status=="done"){
		ucc.defaultLangPk = e.lang.langPk;
		ucc.messageDisplay = e.messageSettings.messageDisply;
		ucc.messageContent = e.messageSettings.messageLang?e.messageSettings.messageLang.content:"";
		ucc.messageTypeList = e.messageSettings.messageTypeList;
		ucc.langMap = e.langMap;
	}else if(status=="fail"){
		ucc.defaultLangPk = "";
		ucc.messageDisplay = "";
		ucc.messageContent = "";
		ucc.messageTypeList = "";
		ucc.langMap = {
		
		};
	}
	return e;
}) 
} 
exports.getSettingsAndService = function(){
return ajax({
	url: baseUrl+"/echatManager.do",
	data: {
	  method: "getSettingsAndService",
	  companyPk: ucc.companyPk,
	  codeKey: ucc.codeKey,
	  type:ucc.type
	},
},function(e,status){
	if(status=="done"){
		ucc.ecselfList = e.selfService
		ucc.BasicSetting = e.basiceSetting.BasicSetting;
		ucc.ExtraSetting = e.basiceSetting.ExtraSetting;
		ucc.OperatorBasicSettings = e.operatorSetting;
		ucc.vocabulary = e.vocabulary;
		ucc.period = 30;
		ucc.isWs = e.isWs;
	}else if(status=="fail"){
		ucc.ecselfList = ""
		ucc.BasicSetting = "";
		ucc.ExtraSetting = "";
		ucc.OperatorBasicSettings = "";
		ucc.vocabulary = "";
		ucc.period = 30;
		ucc.isWs = false;
	}
	return e;
})
}
exports.getDepartment = function(){
return ajax({
	url: baseUrl+"/echatManager.do",
	data: {
		method: "getDepartment",
		companyPk: ucc.companyPk,
		codeKey: ucc.codeKey,
		type:ucc.type
	},
},function(e,status){
	if(status=="done"){
		ucc.businessList = e;
	}else if(status=="fail"){
		ucc.businessList = [];
	}
	return e;
}) 
}
exports.getVisitosDisplay = function(){
return ajax({
	url: baseUrl+"/echatManager.do",
	data: {
		method: "getVisitosDisplay",
		companyPk: ucc.companyPk
	},
},function(e,status){
	if(status=="done"){
		ucc.tabList = e.tabLists;
		ucc.buttonList = e.buttonListJson;
		ucc.advertisement = e.advertisement;
	}else if(status=="fail"){
		ucc.tabList = [];
		ucc.buttonList = [];
		ucc.advertisement = "";
	}
	return e;
})  
}
exports.getTmpCode = function(){
return ajax({
	url: baseUrl+"/echatManager.do",
	data: {
		method: "getTmpCode",
		companyPk: ucc.companyPk,
		codeKey:ucc.codeKey
	},
},function(e,status){
	if(status=="done"){
		ucc.aDset = e.aDset;
	}else if(status=="fail"){
		ucc.aDset = {};
	}
	return e;
})
}
exports.initChatId = function(visitorId){
return ajax({
	url: baseUrl+"/echatManager.do",
	data: {
		method: "initChatId",
		companyPk: ucc.companyPk,
		vid: visitorId,
		hjUserData: params["hjUserData"],
		visitorInfo: params["visitorInfo"]
	},
	async: false,
	cache: false
},function(e,status){
	if(status=="done"){
		
	}else if(status=="fail"){
		
	}
	return e;
})
}
exports.getIp = function(){
	return ajax({
		url: baseUrl+"/echatManager.do",
		data: {
			method: "getIp"
		},
		dataType: "jsonp",
		async: false,
	},function(e,status){
		return (typeof returnCitySN == "object") ? returnCitySN :{
			"cip": "0.0.0.0",
			"cid": "0",
			"cname": "未知地区"
		};
	})
}
exports.generationVisitorsID = function(){
	return ajax({
		url: baseUrl+"/echatManager.do",
		data: {
			method: "generationVisitorsID",
			companyPk: ucc.companyPk
		},
		async: false,
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}
exports.getVisitorsName = function(vid){
	return ajax({
		url: baseUrl+"/echatManager.do",
		data: {
			method: "getVisitorsName",
			visitorId: vid
		},
		async: false
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}			
exports.closeEchat= function(chatID,url,opname){
	return ajax({
		url: baseUrl+"/echat.do",
		data: {
			method: "closeEchat",
			chatID: chatID,
			url: url,
			opname:opname
		},
		async: false
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}	
exports.inQueue= function(message,IpStr){
	return ajax({
		url: baseUrl+"/queue.do",
		data: {
			method: 'inQueue',
			chatID: ucc.chatID,
			companyPk: ucc.companyPk,
			langPk: ucc.defaultLangPk,
			message: message,
			IpStr: IpStr
		}
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return e;
		}
	})
}
exports.getBusinessQueue= function(message,businessId,index,isTimeOut){
	return ajax({
		url: baseUrl+"/queue.do",
		data: {
			method: 'getBusinessQueue',
			chatID: ucc.chatID,
			companyPk: ucc.companyPk,
			langPk: ucc.defaultLangPk,
			message: que.options.message,
			IpStr: que.options.IpStr
		}
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return e;
		}
	})
}
exports.continueBusinessQueue= function(businessId){
	return ajax({
		url: baseUrl+"/queue.do",
		data: {
			method: 'continueBusinessQueue',
			chatID: ucc.chatID,
			companyPk: ucc.companyPk,
			langPk: ucc.defaultLangPk,
			businessId: businessId
		},
		async: false
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}
exports.readMessage= function(chatId,url){
	return ajax({
		url: baseUrl+"/echat.do",
		data: {
			method: 'readMessage',
			chatID: chatId,
			url: url
		},
		async: false,
		cache: false
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}	
exports.getReceivedMID= function(messageId,workGroupName){
	return ajax({
		url: baseUrl+"/echat.do",
		data: {
			method: 'getReceivedMID',
			"messageId": messageId,
			"workGroupName": workGroupName
		},
		async: false
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}
exports.sendMessage= function(chatId,txt,code,url,visitorId){
	return ajax({
		url: baseUrl+"/echat.do",
		data: {
			method: 'sendMessage',
			chatID: chatId,
			message: txt,
			code: code,
			url: url,
			visitorId: visitorId
		},
		async: false
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}
exports.getLangList= function(){
	return ajax({
		url: baseUrl+"/echatManager.do",
		data: {
			method: 'getLangList',
			companyPk: ucc.companyPk,
			langPk: ucc.defaultLangPk
		},
		async: false
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}	
exports.getLangListByPk= function(langType,langKey){
	return ajax({
		url: baseUrl+"/echatManager.do",
		data: {
			method: 'getLangListByPk',
			companyPk: ucc.companyPk,
			langPk: ucc.defaultLangPk,
			langType: langType,
			langKey: langKey
		},
		async: false
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}
exports.saveMessageBox= function(json){
	var contentencode = json.content;
	try {
		contentencode = encodeURIComponent(encodeURIComponent(contentencode));
	} catch (e) {};
	return ajax({
		url: baseUrl+"/echatManager.do",
		data: {
			method: "saveMessageBox",
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
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}	
exports.setVisitorMonitor= function(monitorInfo){
	var info = monitorInfo;
	try {
		info = encodeURIComponent(JSON.stringify(monitorInfo));
	} catch (e) {};
	return ajax({
		url: baseUrl+"/visitorMonitor.do",
		data: {
			method: 'setVisitorMonitor',
			monitorInfo: info
		}
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}	
exports.getHistoryDialogue= function(page,visitorId){
	return ajax({
		url: baseUrl+"/historyOperator.do",
		async: false,
		data: {
			method: 'getHistoryDialogue',
			page: page,
			visitorId: visitorId,
			companyPk: ucc.companyPk
		}
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}	
exports.getLeaveChat= function(visitorId){
	return ajax({
		url: baseUrl+"/historyOperator.do",
		async: false,
		data: {
			method: 'getLeaveChat',
			visitorId: visitorId
		}
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}

exports.getSatisfaction= function(chatId){
	return ajax({
		url: baseUrl+"/echatManager.do",
		async: false,
		data: {
			method: 'getSatisfaction',
			companyPk: ucc.companyPk,
			langPk: ucc.defaultLangPk,
			chatID: chatId
		}
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}

exports.saveSatisfaction= function(chatId,json){
	return ajax({
		url: baseUrl+"/echatManager.do",
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
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}
exports.getScreenshotSrc= function(msgStr){
	return ajax({
		url: baseUrl+"/echatManager.do",
		async: false,
		data: {
			method: 'getScreenshotSrc',
			"sendMsg": msgStr
		},
		dataType: "text"
	},function(e,status){
		if(status=="done"){
			return e;
		}else if(status=="fail"){
			return "";
		}
	})
}
exports.keepTenQA= function(chatID){
	return ajax({
		url: baseUrl+"/echatManager.do",
		data: {
			method: 'keepTenQA',
			chatId: ucc.chatID
		}
	},function(e,status){
		if(status=="done"){
			return "";
		}else if(status=="fail"){
			return "";
		}
	})
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var baseUrl = document.location.protocol + "//" + location.host + "/any800";
var ucc = {
	companyPk :"ff808081612620ee016126a0c33f0003",
	codeKey:1,
	langPk:"",
	type:"",
	baseUrl:baseUrl
}
if(location.hash.slice(1)){
  var sp = location.hash.slice(1).split("/");
  if(sp[1]){
    ucc.companyPk = sp[1]
  }
  if(sp[2]){
    ucc.codeKey = sp[2]
  }
  if(sp[3]){
    ucc.langPk = sp[3]
  }
  
}

module.exports = ucc;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFREYwQkZEQTEyNUNFNTExQkZERkY4NDA3M0QyQjI2RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEODA3MEZFNzZFNTYxMUU1QTJFQzgyQzVDRTJDN0I3MSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEODA3MEZFNjZFNTYxMUU1QTJFQzgyQzVDRTJDN0I3MSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhDRjU0NENDOUQ2REU1MTE4QkVEREY3MTJGNjdFMzk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVERjBCRkRBMTI1Q0U1MTFCRkRGRjg0MDczRDJCMjZGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+exjVFgAAAHdJREFUeNp0kdENwCAIRFlBRmgnqOvrCrqN31RaSAg5SfhQ3p0CJCLPzraTdxLIYvWqhy5/DCAodq/RyYAJBBHUOrtDFlwZVC4+yQFYGcwwmeMKgjvWT80s1DT6wjTHkQUIZGAwfBoNNQME35yrLea0QfYNvgIMAFHxmoH1HK47AAAAAElFTkSuQmCC"

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*getParameter.js 参数信息*/
var getParameter = function() {
  var src = location.href;
  // 解析参数并存储到 settings 变量中
  var arg = src.indexOf('?') !== -1 ? src.split('?').pop() : '';
  var settings = {};
  arg.replace(/(\w+)(?:=([^&]*))?/g, function(a, key, value) {
    settings[key] = value;
  });
  return settings;
}
$.getParameter = getParameter;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var MOBILEINPUT = function(options) {
  this.defaults = {
      compantPk: "",
      codeKey: "",
      type: "",
    },
    this.options = $.extend({}, this.defaults, options);
}
MOBILEINPUT.prototype = {
width:0,
height:0,
checkInterval:null,
onCheck:false,
  init: function() {
    $("html").css({
      position: "absolute",
      top: 0,
      left: 0,
      width:"100%",
      height: "100%"
    });
    this.width = $("html").width();
  this.height = $("html").height();
  this.scrollTop = document.body.scrollTop;
  },
  startCheck:function(){
    var m = this;
    m.onCheck = true;

    if(navigator.userAgent.indexOf("iPhone")> -1   ){
      m.checkIphone();
    }else{
      m.checkNotIphone();
    }
  },
  checkIphone:function(){
    var m = this;
    if(m.checkInterval){
      clearInterval(m.checkInterval);
    }
      uccH5Event.scrollToBottom();
    m.checkInterval = setInterval(function(){
       m.checkIphoneFun();
    },300)
  },
  checkNotIphone:function(){
    var m = this;
    setTimeout(function() {
          if (window.scrollY < 100) {
             window.scrollTo(0, 99999);
          }
          uccH5Event.scrollToBottom();
          setTimeout(function() {
              if (window.scrollY < 100) {
                  window.scrollTo(0, 99999);
              }
              m.checkNotIphoneFun();
          }, 100);
        }, 500);
  },
  checkNotIphoneFun:function() {
    var m = this;
    if(m.endScroll){
      return;
    }
    if(this.scrollY()<document.body.scrollHeight && document.documentElement.scrollTop!=0){
      this.checkIphone()
    }else if(!(navigator.userAgent.indexOf("iPhone") > -1 && $("body").width()==320) ){//iphone5例外
      if (window.scrollY < 100) {
              window.scrollTo(0, 99999);
          }
        if(document.activeElement && document.activeElement.scrollIntoViewIfNeeded) {
          window.setTimeout(function() {
                 document.activeElement.scrollIntoViewIfNeeded();
             },0);
      }
        m.success();
    }
  },
  checkIphoneFunV2:function(){
    var m = this;

    if(m.endScroll){
      if(m.checkInterval){
        clearInterval(m.checkInterval);
      }
      return;
    }
    if(document.activeElement && document.activeElement.scrollIntoViewIfNeeded) {
      window.setTimeout(function() {
               document.activeElement.scrollIntoViewIfNeeded();
           },0);
  }
  document.body.scrollTop = 0;
    if (window.scrollY < 100) {
          window.scrollTo(0, 99999);
      }
    var scscrollHeight = document.body.scrollHeight;
    var height = $("html").height();
    var scscrollY = this.scrollY();
    console.log("scscrollHeight"+scscrollHeight);
    console.log("scscrollY"+scscrollY);
    console.log("height"+height);
    console.log("oldheight"+this.height);
    var a = Math.abs(scscrollHeight-this.height);//
    var b = scscrollY-this.height*2;//
    var c = height-this.height;
    var isScrollUsed = (scscrollY<this.height);
    var ppheight = scscrollHeight-scscrollY ;
  var sctop = -Math.abs(scscrollY);
  var h = Math.min(ppheight,this.height/2);
  h = Math.max(h,this.height/2-40);
  h = parseInt(h);
  if(c<-100){//高度不等
    console.log("type1");
    if(m.checkInterval){
        clearInterval(m.checkInterval);
      }
    m.success();
  }else if(a<10){//高度近似
      console.log("type2");
      if(b>0){
        console.log("type3");
        $("html").css({
          top:0,
          width:"100%",
          height:h
        });
      }else{
        console.log("type4");
        $("html").css({
          top:0,
          width:"100%",
          height:(this.height-40)
        });
         window.scrollTo(0, scscrollY);
      }
      if(m.checkInterval){
        clearInterval(m.checkInterval);
      }
    m.success();
    }else{
      console.log("type5");
      $("html").css({
      top:0,
      width:"100%",
      height:this.height-40
    });
      document.body.scrollTop = 0;
      if(m.checkInterval){
        clearInterval(m.checkInterval);
      }
    m.success();
    }
  },
  checkIphoneFunV3:function(){
    var m = this;
    if(m.endScroll){
      if(m.checkInterval){
        clearInterval(m.checkInterval);
      }
      return;
    }
    m.samples= [];
    m.getSample();
  },
  samples:[],
  getSample:function(){
    var m = this;
    if(m.endScroll){
      if(m.checkInterval){
        clearInterval(m.checkInterval);
      }
      return;
    }
    if(document.activeElement && document.activeElement.scrollIntoViewIfNeeded) {
      window.setTimeout(function() {
               document.activeElement.scrollIntoViewIfNeeded();
           },0);
  }
  if (window.scrollY < 100) {
          window.scrollTo(0, 99999);
      }
  if(m.checkInterval){
      clearInterval(m.checkInterval);
    }
  var scscrollHeight = document.body.scrollHeight;
    var height = $("html").height();
    var scscrollY = this.scrollY();
    m.samples.push({
      scHeight:scscrollHeight,
      scrollY:scscrollY,
      height:height
    });
    m.changeHeight();
    if(m.samples.length==1){
      window.setTimeout(function() {
        m.getSample();
          },500);
    }
  },
  changeHeight:function(){
    var m = this;
    console.log(JSON.stringify(m.samples));
    if(m.samples.length==1){
      var a = Math.abs(m.samples[0].scHeight-this.height);//
        var b = m.samples[0].scrollY-this.height*2;//
        var c = m.samples[0].height-this.height;
        var ppheight = m.samples[0].scHeight-m.samples[0].scrollY ;
      var sctop = -Math.abs(m.samples[0].scrollY);
      var h = Math.min(ppheight,this.height/2);
      h = Math.max(h,this.height/2-40);
      h = parseInt(h);
      if(c<-100){//高度不等
        m.samples[0].type=1;
      }else if(a<10){//高度近似
          if(b>0){
            m.samples[0].type=2;
            $("html").css({
              top:0,
              width:"100%",
              height:h
            });
          }else{
            m.samples[0].type=3;
            $("html").css({
              top:0,
              width:"100%",
              height:(this.height-40)
            });
             window.scrollTo(0, m.samples[0].scrollY);
          }
        }else{
          m.samples[0].type=4;
          $("html").css({
          top:0,
          width:"100%",
          height:this.height-40
        });
          document.body.scrollTop = 0;
        }
    }else if(m.samples.length==2){
      var ppheight = m.samples[1].scHeight-m.samples[1].scrollY ;
      var sctop = -Math.abs(m.samples[1].scrollY);
      var h = Math.min(ppheight,this.height/2);
      h = Math.max(h,this.height/2-40);
      h = parseInt(h);
      if(m.samples[0].scrollY==m.samples[1].scrollY&&m.samples[0].height==m.samples[1].height&&m.samples[0].scHeight==m.samples[1].scHeight){
        
      }else if(m.samples[0].scrollY!=m.samples[1].scrollY){
        var b = m.samples[1].scrollY-this.height*2;//
        if(b>0){
          m.samples[1].type=2;
            $("html").css({
              top:0,
              width:"100%",
              height:h
            });
            m.samples[0] = m.samples[1];
            m.samples.pop();
        }
      }
      m.success();
//    		else if(m.samples[0].height!=m.samples[1].height){
//    			//document.body.scrollTop = 0;
//    		}
    }
  },
  checkIphoneFun: function() {
    var m = this;
    console.log(m.endScroll);
    if(m.endScroll){
      if(m.checkInterval){
        clearInterval(m.checkInterval);
      }
      return;
    }
//    	if(params["debug"]==1){
      m.checkIphoneFunV3();
      return;
//    	}
  var scscrollY = this.scrollY();
  var scheight = this.height;
  var scscrollHeight = document.body.scrollHeight;
  var scscrollTop = document.body.scrollTop;
  var count = Math.abs((this.height -( document.body.scrollHeight-scscrollY)));
  if(document.activeElement && document.activeElement.scrollIntoViewIfNeeded) {
      window.setTimeout(function() {
               document.activeElement.scrollIntoViewIfNeeded();
           },0);
  }
  if (window.scrollY < 100) {
          window.scrollTo(0, 99999);
      }
  if(parseInt(count)>1 ){
    scscrollY = this.scrollY();
    var ppheight = scscrollHeight-scscrollY ;
    var sctop = -Math.abs(scscrollY);
    var h = Math.min(ppheight,scheight/2);
    h = Math.max(h,scheight/2-40);
    h = parseInt(h);
    if(ppheight<=scheight/2 && ppheight>=scheight/2-40){
      m.success();
    }else if(Math.abs($("html").height()-h)<1){
      if(m.checkInterval){
          clearInterval(m.checkInterval);
        }
      m.success();
    }
    $("html").css({
      top:0,
      width:"100%",
      height:h
    });
    m.success();
    document.body.scrollTop = 0;
  }
  },
  success:function(){
    uccH5Event.scrollToBottom();
    this.endScroll = true;
    $("#message").animate({scrollTop:document.getElementById('message').scrollHeight},1000);
},
  end: function() {
    var m = this;
    m.onCheck = false;
    setTimeout(function(){
      if(!m.onCheck){
        if(m.checkInterval){
          clearInterval(m.checkInterval);
        }
        m.endScroll = false;
        $("html").css({
              position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%"
        });
        $("html").animate({height:"100%"},"fast");
        document.body.scrollTop = m.scrollTop;
            uccH5Event.scrollToBottom();
      }
    },100);
  },
  scrollY:function(){
    return document.body.scrollTop + document.documentElement.scrollTop;
  }
}
$.mobileInput = function(options) {
  var mobileInput = new MOBILEINPUT(options);
  return mobileInput;
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

window.requestAnimFrame = (function () {
         return window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             function (callback) {
                 window.setTimeout(callback, 6000 / 60);
             };
  })();
  window.setTimeout=function(callback,delay){
   var dateNow=Date.now,
       requestAnimation=window.requestAnimFrame,
       start=dateNow(),
       stop,
       timeoutFunc=function(){
        dateNow()-start<delay?stop||requestAnimation(timeoutFunc):callback()
       };
   requestAnimation(timeoutFunc);
   return{
    clear:function(){stop=1}
   }
  }
  window.setInterval=function(callback,delay){
     var dateNow=Date.now,
         requestAnimation=window.requestAnimFrame,
         start=dateNow(),
         stop,
         intervalFunc=function(){
          dateNow()-start<delay||(start+=delay,callback());
          stop||requestAnimation(intervalFunc)
         }
     requestAnimation(intervalFunc);
     return{
      clear:function(){stop=1}
     }
    }
  window.clearTimeout = function(el){
    if(el && el.clear){
      el.clear();
    }
  }
  window.clearInterval = function(el){
    if(el && el.clear){
      el.clear();
    }
  }

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var SYSTEMINFO = function(el, options) {
  this.$el = el
  this.defaults = {}, this.options = $.extend({}, this.defaults, options)
}
SYSTEMINFO.prototype = {
  show: function(text) {
    if (!text || text == "undefined" || text == "null") return;
    var el = this.$el;
    el.find(".systemInfo").remove();
    el.append('<center class="systemInfromBox systemInfo"><span class="systemInfrom">' + text + '</span></center>')
    document.getElementById('message').scrollTop = document.getElementById('message').scrollHeight; // 滚动条置底
  },
  hide: function() {
    var el = this.$el;
    el.find(".systemInfo").remove();
  }
}
$.fn.systemInfo = function(options) {
  var systemInfo = new SYSTEMINFO($(this), options);
  return systemInfo;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*uccH5Event.js UCCH5事件*/
var ucc = __webpack_require__(1);
var ajax = __webpack_require__ (0);
var baseUrl = ucc.baseUrl;
var audiojs = __webpack_require__ (48);

/*uccH5Event.js UCCH5事件*/
;
(function(window, $, undefined) {
  var UCCH5EVENT = function(options) {
    this.defaults = {},
      this.options = $.extend({}, this.defaults, options);
  }
  UCCH5EVENT.prototype = {
    DOMCheck: null,
    binds: function() {
      this.businessListBind();
      this.inputCheck();
      this.viewFix();
      this.bigImgBind();
      this.inputClickBind();
      this.faceBind();
      this.closeBind();
      this.uploadInit();
      this.initReconnect();
      this.unload();
      this.messageChange();
      if(!dialogue.islive()){
    	  $(".fileup input").attr("disabled",true);
      }
    },
    leaveCover:function(){
      $(".dialogue-footer-search").append("<div class='leaveMessage'>已断开连接，请刷新重试</div><div class='leaveMessageCover'></div>");
        $(".leaveMessage").css({
        position: 'absolute',
        bottom: "50px",
        left: "13px"
        });
  //		  $(".leaveMessageCover").css({
  //				position: 'fixed',
  //				bottom: "0",
  //				left: "0",
  //				right:"0",
  //				top:"0",
  //				zIndex:1003
  //			});
        setInterval(function() {
        $(".leaveMessage").fadeIn(500).fadeOut(500)
        }, 1000)
    },
    openCover:function(){
      $(".leaveMessage").remove();
    },
      showVisitorInfo: function() {
        dialogue.showMsg({
          from: "client",
          content: "为了提高我们的服务质量,   请点击<span class = 'spans visitor_info' id = 'v_info'>完善客户信息</span><br>",
          saveIn:1
        })
        $(".visitor_info").click(function() {
          visitorInformation.show();
        });
      },
      showAudio: function() {
        $("audio").each(function(index, el) {
          if (!$(el).parent().hasClass('audiojs')) {
            $this = $(this);
            audiojs.helpers.whenError = function() {
              var placeholder = $(".dialogue-c").find("a[placeholder]")
              placeholder.html("下载");
            }
            audiojs.create($this);
          }
        });
      },
      scrollToBottom: function() {
        document.getElementById('message').scrollTop = document.getElementById('message').scrollHeight; // 滚动条置底
      },
      scrollToTop: function() {
        document.getElementById('message').scrollTop = 0;
      },
      businessListBind: function() {
        $("#message").delegate('.onlineCls', 'click', function() {
          if (!dialogue.islive()) {
            var num = $(this).data("num");
            storage.set("businessId", $(this).data("pk"));
            storage.set("businessName", $(this).attr("name"));
            var businessId = $(this).data("pk");
            var businessName = $(this).attr("name");
            if (bList.hasList(businessId).length > 0) {
              var b = uccH5Logic.showBusinessList(businessId);
              dialogue.showMsg({
                from: "client",
                content: b,
                saveIn:1
              })
              return;
            }
            var isLea = $(this).data("online") != "在线"; //true代表离线
            if (isLea) { //如果业务类型离线
              leaveMessage.show();
            } else {
              queue.reqStartQueue(businessId, businessName);
            }
          }
        });
      },
      viewFix: function() {
        //微信下拉查看网址修复
        var overscroll = function(el) {
          el.addEventListener('touchstart', function() {
            var top = el.scrollTop,
              totalScroll = el.scrollHeight,
              currentScroll = top + el.offsetHeight;
            if (top <= 0) {
              el.scrollTop = 1;
            } else if (currentScroll >= totalScroll) {
              el.scrollTop = top - 1;
            }
          });
          el.addEventListener('touchmove', function(evt) {
            if (el.offsetHeight < el.scrollHeight)
              evt._isScroller = true;
          });
        }
        overscroll(document.querySelector('.dialogue'));
        document.querySelector('.dialogue-footer-text').addEventListener('touchmove', function(evt) {
          evt._isScroller = true;
        });
        document.body.addEventListener('touchmove', function(evt) {
          if (!evt._isScroller) {
            evt.preventDefault();
          }
        });
      },
      inputCheck: function() {
        var ev = this;
        $(".dialogue-footer-text").css("overflowY", "auto");
        $("#dialogue-footer-text").on('focus', function() {
          $(".dialogue-footer-face").hide();
          $(".dialogue-footer").css({
            "position": "absolute",
          });
          mobileInput.startCheck();
          if (ev.DOMCheck) {
            ev.DOMCheck = window.clearInterval(ev.DOMCheck);
          }
          ev.DOMCheck = setInterval(function() {
            if ($("#dialogue-footer-text").html().length > 0 && $("#dialogue-footer-text").html() != "<br>") {
              $("#dialogue-send").show();
              $("#dialogue-add").hide();
              $("#dialogue-footer-face").hide();
              $(".dialogue").removeClass("dialogue-short");
              $(".dialogue-footer-select").hide();
            } else {
              $("#dialogue-send").hide();
              $("#dialogue-add").show();
            }
            setTimeout(function() {
              ev.checkHeight(4);
            }, 300);
          }, 700);
        }).on('blur', function() {
          $(".dialogue-footer").css({
            "position": "absolute"
          });
          ev.DOMCheck = window.clearInterval(ev.DOMCheck);
          setTimeout(function() {
            ev.checkHeight(4);
          }, 333);
        mobileInput.end();
        });
      },
      checkHeight: function(num) {
        var lineHeight = 24;
        $(".dialogue-footer-text").css("line-height", lineHeight + "px");
        var marginHeight = parseInt($(".dialogue-footer-text").css("marginBottom")) + parseInt($(".dialogue-footer-text").css("marginTop"));
        for (var i = 1; i <= num; i++) {
          if ($(".dialogue-footer-text")[0].scrollHeight >= i * lineHeight) {
            $(".dialogue-footer-search").height(i * lineHeight + marginHeight);
            $(".talk-btn").css("top", (i * lineHeight + marginHeight - $("#dialogue-send").height()) / 2);
          }
        }
        if ($(".dialogue-footer-text")[0].scrollHeight < 2 * lineHeight) {
          $(".dialogue-footer-search").height(34 + marginHeight)
          $(".dialogue-footer-text").css("line-height", "34px");
          $(".talk-btn").css("top", 0);
        }
        $("#message").css("bottom", $(".dialogue-footer").height());
      },
      bigImgBind: function() {
        $('#message').delegate('.dialogue-me .dialogue-c .content img,.dialogue-in .dialogue-c .content img', 'click', function() {
          if ($(this).attr("emotions") != "true"){
            uccH5Event.downloadOrigin($(this).attr("src")).done(function(src){
              showBigImgFun.showPic(src);
        })
          }
        });
      },
      inputClickBind: function() {
        $("#dialogue-send").unbind().click(function() {
          var sendMsgclone = $("#dialogue-footer-text").clone();
          var sendMsg = $("#dialogue-footer-text").html()
          sendMsg = sendMsg.replace(/\r|<br>|<div\s*>|<\/div>|<span\s*>|<\/span>|<p\s*>|<\/p>/g, ""); //去掉enter键换行
          sendMsg = sendMsg.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, ''); //去除输入法自带的表情
          if (sendMsg) { // 输入栏没有内容则不操作
            sendMsg = changeFaceFun.imgToIco(sendMsgclone.html());
            sendMsgclone.html(changeFaceFun.imgToIco(sendMsgclone.html()));
            
            sendMsg = sensitive.get(sendMsg);
            if (sendMsg.length > 1000) {
              Alert.show("最大长度为1000个字符");
              return "";
            }
            detectWeb.msgPush('visitor', sendMsg);
            sendMsg = sendMsg.replace(/ /ig,"&nbsp;").replace(/\n/ig,"<br>")
            if (!dialogue.islive()) {
              
              
              var numberSendMsg = Number($("<div>"+sendMsg+"</div>").text());
              if(robot.isUse){
                robot.check(sendMsg.replace(/\&nbsp;/g, "").replace(/\s+/g, "").replace(/\<p><\/p>/g, "").replace(/\<br>/g, ""));
              }else if (numberSendMsg) {
                dialogue.showMsg({
                      from: "visitor",
                      content: sendMsg,
                      saveIn:1
                    });
                if($(".onlineCls[data-num]").length==0){
                  ajax.getDepartment().done(function() {
                    bList = $.businessList({
                      businessList: ucc.businessList,
                      aDset: ucc.aDset
                    });
                    var b = uccH5Logic.showBusinessList(-1);
                    dialogue.showMsg({
                      from: "client",
                      content: b,
                      saveIn:1
                    })
                  });
                }
                var it = $(".onlineCls[data-num='" + numberSendMsg + "']");
                if (it.length > 0) {
                  $(it).click();
                } else {
                  dialogue.showMsg({
                    from: "robot",
                    content: "请输入业务类型前的数字或点击业务类型接入对话或留言。",
                    saveIn:1
                  });
                }
              } else {
                dialogue.showMsg({
                      from: "visitor",
                      content: sendMsg,
                      saveIn:1
                    });
                dialogue.showMsg({
                  from: "robot",
                  content: "请输入业务类型前的数字或点击业务类型接入对话或留言。",
                  saveIn:1
                });
              }
            } else {
              dialogue.sendMessage(sendMsg);
            }
          }

          mobileInput.endScroll = false;

          // 清空并聚焦输入框
          $('#dialogue-footer-text').text('').focus();
          uccH5Event.scrollToBottom();
          setTimeout(function() {
            if ($("#dialogue-footer-text").html().length > 0 && $("#dialogue-footer-text").html() != "<br>") {
                $("#dialogue-send").show();
                $("#dialogue-add").hide();
                $("#dialogue-footer-face").hide();
                $(".dialogue").removeClass("dialogue-short");
                $(".dialogue-footer-select").hide();
            }else {
                $("#dialogue-send").hide();
                $("#dialogue-add").show();
              }
          }, 1000);
        });
      },
      faceBind: function() {
        $("#dialogue-biaoqing").unbind().click(function() {
          if (!dialogue.islive()) return;
          var isHidden = $(".dialogue-footer-face").is(":hidden") //是否隐藏
          if (isHidden) {
            $(".dialogue-footer-face").show();
          } else {
            $(".dialogue-footer-face").hide();
          }
          $(".dialogue").css("bottom", $(".dialogue-footer").height());
        });
      },
      closeBind: function() {
        $(".close").click(function() {
          if (!dialogue.islive()) {
            confirmBox.create("您确定要关闭对话框吗？").done(function(click){
              if(click){
                window.close();
                      if (!!(typeof WeixinJSBridge)) {
                        WeixinJSBridge.call('closeWindow');
                      }
              }
            })
          } else {
            confirmBox.create("您确定要结束对话吗？").done(function(click){
              if(click){
                dialogue.end(5);
                  $(".close").hide();
              }
            })
          }
        });
      },
      uploadInit: function() {
        $("#dialogue-add").uploadFile({
          size:5 * 1024 * 1024,
          uploadType:"image",
          inputImage:true,
          other:function(up,name,time){
            if (!dialogue.islive()) return;
                dialogue.showMsg({
                  
                  from: "visitor",
                  content: '<img id="' + time + '" src="'+__webpack_require__(43)+'">'
                });
                var key = msgdb.last();
                up.submit(time,key);
          },
          callback:function(url,time,key){
              var imgstr = '<img  src="' + url + '">';
              $("#" + time).attr("src", url);
              dialogue.sendMessage(imgstr, "", true);
              msgdb.setKey(key,"content",imgstr);
              if(!!changeWindow)changeWindow.change();
          },
          error:function(type){
            if (type == "type") {
                Alert.show("仅支持上传.png\.jpeg\.bmp\.jpg格式的图片");
              } else if (type == "size") {
                Alert.show("仅支持上传5M以内的图片");
              } else {
                Alert.show("上传图片错误");
                $("#" + file.id+file.__hash).parents(".dialogue-me.contentMessage").hide();
              }
          }
        })
      },
      reconnectClick:false,
      initReconnect:function(){
        var ev = this;
        $("#message").delegate(".reconnectID","click",function() {
          if(!dialogue.islive() && !datas.get("hasInQueue") && !ev.reconnectClick){
            ev.reconnectClick = true;    
            ajax.closeEchat(ucc.chatID,dialogue.getAttr("remoteUrl"),dialogue.getAttr("operatroName") ? dialogue.getAttr("operatroName") : "");
            ajax.initChatId(userDatas.getVisitorInfo().visitorId)
            .done(function(e) {
              try {
                ucc.chatID = e.chatID;
                      storage.set("oldChatId",e.chatID);
                      ucc.browserId = new Date().getTime();
                    storage.set("oldChatId",e.chatID);
                    //在关闭对话,并且用户有过一次以上留言打开满意度
                        datas.set("openSatisfactionAfterCloseChat", false);
                        //已打开满意度将不再打开
                        datas.set("hasSatisfaction", false);
                        var jsonStr = userDatas.getJsonStr();
                        uccH5Init.initFunc();
                        uccH5Logic.addmonitorJs();
                detectWeb.setIsReconnection(true);
                          queue.reqStartQueue(storage.get("businessId"), storage.get("businessName"), detectWeb.getIsReconnection()); // @Elijah
                        ev.reconnectClick = false;
              } catch (e) {
                // console.log(e);
              }
            }).fail(function(e) {
              ev.reconnectClick = false;
              dialogue.showSysMsg("网络异常，请确保网络正常后再重新连接！");
              return;
            })
          }
        });
      },
      unload:function(){
      $(window).unload(function(){
        if(storage.get("offChat")==ucc.browserId){
          storage.set("offChat",true);
        }
        if(webSocket.isWork){
          webSocket.websocket.close();
        }
      });
    },
    messageChange:function(){
      $("#message").delegate(".message_news","click",function(){
        if($(this).data("url")){
          window.open($(this).data("url"));
        }
      })
    },	
    downloadOrigin:function(src){
      var defered = new $.Deferred();
      var ext = src.substring(src.lastIndexOf("."));
      var extName = ext.toLowerCase();
      var pre = src.substring(0,src.lastIndexOf("."))
      if(pre.indexOf("origin")>-1){
        return defered.resolve(src);
        return;
      }
      if(".jpg"==(extName)||".jpeg"==(extName)||".png"==(extName)||".bmp"==(extName)){
        var url = pre+"origin"+ext;
        var img = new Image();
        img.src = url;
        if (img.complete) {
          return defered.resolve(url);
        } 
        img.onload = function () {
          return defered.resolve(url);
        }; 
        img.onerror = function(){
          return defered.resolve(src);
        }
      }
      return defered.promise();
    }
  }
  $.uccH5Event = function(options) {
    var uccH5Event = new UCCH5EVENT(options);
    return uccH5Event;
  }
})(window, jQuery);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var ajax = __webpack_require__ (0);
var ucc = __webpack_require__(1);
var baseUrl = ucc.baseUrl;

;
(function(window, $, undefined) {
  var UCCH5INIT = function(options) {
    this.defaults = {},
      this.options = $.extend({}, this.defaults, options)
  }
  UCCH5INIT.prototype = {
    initBasic: function() {
      params = $.getParameter();
      Alert = $.Alert();
      showBigImgFun = $.showBigImg();
      showBigImgFun.init();
      storage = $.storage({companyPk:ucc.companyPk});
      msgdb = $.msgdb();
      datas = $.db({storage:storage});
      localHistory = $.localHistory({
    	  storage:storage,
    	  loadMore:function(items){
    		  for(var i=0,len=items.length;i<len;i++){
    			  if(items[i].type!="date"){
    				  dialogue.showMsg({
  						date: items[i].time,
  						from: items[i].from,
  						content: items[i].content,
  						status: 1
  					})  
    			  }
				}
    		  	if($("#getMore").length>0){
    		  		$("#getMore").remove();
    		  	}
				$("#leaveHistory").prepend('<span id="getMore"><span class="c">点此查看历史记录</span><span class="l"></span></span>');
				if(localHistory.lastChat==-1){
					$("#getMore").hide();
				}
		  }
	  });
      localHistory.init();
      userDatas = $.userDatas({
        param: params,
        storage: storage,
        storageVisitor: "visitor",
        storageIpStr: "ipStr",
        storageChatNum: "chatNum",
        companyPk: ucc.companyPk,
        aDset: ucc.aDset,
        businessId: "",
        businessName: "",
      });
      visitLimit = $.visitLimit({
        open: !!params["vl"] ? params["vl"] : 1,
        storage: storage
      })
      visitLimit.init();
      bList = $.businessList({
        businessList: ucc.businessList,
        aDset: ucc.aDset
      });
      workTime = $.workTime({
        BasicSetting: ucc.BasicSetting,
        ExtraSetting: ucc.ExtraSetting,
        show: function(msg) {
          if (!!msg) {
        	$(".dialogue-footer-cover").show();  
            if ($('.pop_bg').length == 0) {
              var noticeHtml = '<div class="dialogue-in"><div class="dialogue-pic"><img src="/any800/style/images/mobileImages/newImages/server.png"></div><div class="dialogue-c"><span class="dialogue-dot1"><img src="/any800/style/images/mobileImages/newImages/dialogue_dot1.png"></span><p class="pop_bg"><p class = "pop_msg">' + msg + '</p></p></div></div><div class="clearboth"></div>'
              $('#message').html(noticeHtml);
              $(".fanke-liuyan").on('click', function(event) {
                leaveMessage.show();
              });
              datas.set("iswork", false);
              setTimeout(function() {
                $('.pop_msg').slideDown('slow');
              }, 3e2);
            }
          }
        }
      });
      sensitive = $.sensitive({
        vocabulary: ucc.vocabulary
      })
      changeFaceFun = $.changeFace({
        after: function() {
          var items = this.imgIco;
          var html = "";
          for (var i = 0, len = items.length; i < len; i++) {
            var img = items[i][0];
            html += "<span>" + img + "</span>";
          }
          $(".dialogue-footer-face .footer-face").html(html);
        }
      });
    },
    initData: function() {
      var defered = new $.Deferred();
      //生成chatId
      /*--工作时间显示--*/
      datas.set("iswork", true);
      $(".close").hide();
      datas.set("hasInQueue", false);
      ajax.initChatId(userDatas.getVisitorInfo().visitorId)
      .done(function(e) {
        ucc.chatID = e.chatID;
        ucc.browserId = new Date().getTime();
        if(storage.get("oldChatId")!=e.chatID){
        	if(storage.get("msgObjCurrentChat")){
        		ajax.closeEchat(storage.get("oldChatId"),storage.get("msgObjCurrentChat").url,datas.get("opName") ? datas.get("opName") : "")
        	}
            uccH5Logic.addmonitorJs();
        	localHistory.saveCurrent();
        	storage.set("oldChatId",e.chatID);
        	//在关闭对话,并且用户有过一次以上留言打开满意度
          datas.set("openSatisfactionAfterCloseChat", false);
          //已打开满意度将不再打开
          datas.set("hasSatisfaction", false);
          //保存坐席账号
          datas.set("_workGroupName", "");
          // 取得连接远程服务器的地址.
          datas.set("remoteUrl", "");
          datas.set("opShow", "");
          datas.set("opName", "");
          datas.set("operatorId", "");
        }else if(e.state=="connnected"){
        	storage.set("offChat", ucc.browserId);
        	storage.set("browserId", ucc.browserId);
		}
      });
      webSocket = $.webSocket({
			path: "/any800/UccWebSocket/",
			isWs:ucc.isWs,
			visitorId: userDatas.getVisitorInfo().visitorId,
			message: function(chatId, content,messageId) {
				if (chatId == ucc.chatID) {
					if(typeof content =="object"){
						content = JSON.stringify(content);
					}
					dialogue.showMsg({
						msgid: messageId,
						date: new Date().getTime(),
						content: content,
						from: "client"
					});
					detectWeb.msgPush('customer', content);
					TimeoutList.startALLTimeout();
				}
			},
			deal: function(type, chatId, json) {
				if (chatId != ucc.chatID) return;
				if (type == "CUTOMER_IS_INVITED") {
					dialogue.toolFun(true);
					dialogue.showMsg({
						msgid: "",
						date: new Date().getTime(),
						content: json,
						from: "client",
						saveIn: 1
					});
					if (detectWeb.getIsReconnection()) {
						var txt = '[' + detectWeb.getMsgs(5).join(',') + ']'; // 取5条数据
						dialogue.sendMessage(txt, 'offLineMessage');
					}
					TimeoutList.startALLTimeout();
				} else if (type == "CLOSE") {
					if (detectWeb.getIsInitiate()) {
						dialogue.end(6);
					} else {
						dialogue.end(2);
					}
				} else if (type == "CLOSE_CUSTOMER") {
					dialogue.end(3);
				} else if (type == "CLOSE_VISITOR") {
					if(dialogue.islive()){
						langTip.show(langTip.type.system, langTip.key.no_answer_close);
						dialogue.end(2);
					}
				} else if (type == "OPERATION_TIPS") {
					if (json.params.opType == "pushsatisfaction") {
						if(satisfaction.hasSat){
							satisfaction.show();
						}
					}  else if (json.params.opType == "getinfo") {
						visitorInformation.show();
					} else if (json.params.opType == "uploadfile") {
						dialogue.showMsg({
							msgid: "",
							date: new Date().getTime(),
							content: json.content,
							from: "client",
							status: 0
						});
					}
				} else if (type == "CUSTOMER_NETWORK_INTERRUPT") {
					dialogue.end(7);
				} else if (type == "CUTOMER_ISNOT_INVITED") {
					dialogue.showMsg({
						msgid: "",
						date: new Date().getTime(),
						content: json,
						from: "client",
						status: 0
					});
					dialogue.end(0);
				} else if (type == "CUTOMER_REVOKE") {
					msgdb.set(json, "isRevoke", true);
					if ( !! changeWindow) changeWindow.change();
					localHistory.setCurrent(msgdb.db);
					var $messageHide = $("div[name=" + json + "]")
					if ($messageHide.css("display") != "none") {
						$messageHide.hide();
						if ($messageHide.prev().hasClass("dialogue-date")) {
						  $messageHide.prev().hide();
						}
						$("#message").append("<div class='msg_back_success'>" + dialogue.getAttr("operatorName") + "已撤回一条消息</div>")
					}
				}else if (type == "RECEIPT") {
					setTimeout(function(){
						msgdb.set(json, "checkSend", 1);
						if ( !! changeWindow) changeWindow.change();
						localHistory.setCurrent(msgdb.db);
					},1000)
				}
			},connect:function(isConnect){
				if(dialogue.islive()){
					if(isConnect){
						if (detectWeb.getIsInitiate()) {
							systemInfo.show(dialogue.options.msgList.reconnectSuc);
						}
						if (detectWeb.getIsInitiate()) {
							dialogue.toolFun(true);
							detectWeb.checkedSuccess();
						}
					}else{
						if (!detectWeb.getIsInitiate()) {
							dialogue.toolFun(false);
							systemInfo.show(dialogue.options.msgList.reconnectFail);
							detectWeb.checkedFail();
						}
					}	
				}
			},confirmSend:function(messageId){
				setTimeout(function(){
					var msg = msgdb.get(messageId);
					if(msg && msg.checkSend==0){
						msgdb.set(messageId, "checkSend", 2);
					}
				},3000)
			},leaveCover:function(){
				uccH5Event.leaveCover();
			},open:function(){
				uccH5Event.openCover();
			}
		});
		webSocket.init().done(function(){
			return defered.resolve();
		});
  	  confirmBox = $.confirm();
      return defered.promise();
    },
    initFunc: function() {
      systemInfo = $("#message").systemInfo();
      mobileInput = $.mobileInput();
      mobileInput.init();
//      heartBeat = $.heartBeat({detectWeb:function(){
//			if (!detectWeb.getIsInitiate()) {
//				dialogue.toolFun(false);
//				dialogue.showSysMsg(dialogue.options.msgList.reconnectFail);
//				detectWeb.checkedFail();
//			}
//		}});
      detectWeb = $.detectWeb({
        period: 30,
        after: function() {
          dialogue.end(6);
        }
      });
      TimeoutList = $.TimeoutList({
        msgdb: msgdb,
        ops: ucc.OperatorBasicSettings,
        startFun: function() {
          if (!!dialogue.islive()) {
            if (TimeoutList.isVisitorHalfTimeout()) {
              langTip.show(
                langTip.type.system,
                langTip.key.no_answer_hint
              );
              if(!!changeWindow)changeWindow.change();
            }
            if (TimeoutList.isVisitorTimeout()) {
              langTip.show(
                langTip.type.system,
                langTip.key.no_answer_close
              );
              dialogue.end(2);
            }
            if (TimeoutList.isClientBusy()) {
              langTip.show(
                langTip.type.system,
                langTip.key.cs_busy
              );
              if(!!changeWindow)changeWindow.change();
            }
          }
        }
      });

      userDatas.options.chatID = ucc.chatID;
      userDatas.options.businessId = "";
      userDatas.options.businessName = "";
      
      queue = $.queueManager({
        companyPk: ucc.companyPk,
        chatID: ucc.chatID,
        langPk: ucc.defaultLangPk,
        message: JSON.stringify(userDatas.getJsonStr()),
        IpStr: JSON.stringify(userDatas.getIpStr()),
        success: function(result) {
          msgdb.clear();
          changeWindow.clear();
          langTip.show("1", "7");
          langTip.show("1", "9");
          datas.set("remoteUrl", result.url);
          datas.set("opShow", result.opShow);
          datas.set("opName", result.workgroupName);
          datas.set("_workGroupName", result.workgroupName);
          var wname = result.workgroupName.split("-");
          dialogue.setAttr("operatorName", result.opShow ? result.opShow : wname[1]);
          dialogue.setAttr("_workGroupName", result.workgroupName);
          dialogue.setAttr("remoteUrl", result.url);
          changeWindow.setMsgObj(result);
          datas.set("hasInQueue", false);
          //queue.reqStartChat(result);
          systemInfo.hide();
          if (result.success == true) {
            // 请求对话成功，开始对话.
            storage.set("chatNum", (!!storage.get("chatNum") ? storage.get("chatNum") : 0) + 1);
            dialogue.start();
            if (JSON.stringify(userDatas.getJsonStr())) {
              if (ucc.BasicSetting.need == 1) {
                dialogue.sendMessage(JSON.stringify(userDatas.getJsonStr()), "getinfo");
              }
            }
            return true; // 增加返回值 john
            // 20150804
          } else {
            langTip.show(data.langType, data.langKey);
            // 请求对话失败，服务器返回无法接通客服.
            return false; // 添加返回值 john
            // 20150804
          }
        },
        fail: function(result) {
          systemInfo.show(decodeURIComponent(decodeURIComponent(result.msg)));
          $(".systemInfromBox #liveMessageId").click(function() {
              leaveMessage.show(); // 提示留言;
          });
          $(".systemInfromBox #continueId").click(function() {
            ajax.continueBusinessQueue(userDatas.getJsonStr().businessId)
            .done(function(data) {
              if (data.success == false) {
                systemInfo.show(data.msg);
                $("#liveMessageId").click(function() {
                  leaveMessage.show(); // 提示留言;
                });
              } else {
                queue.index = -1;
                queue.isTimeOut = false;
                queue.getInfo(userDatas.getJsonStr().businessId, 1, false);
              }
            }).fail(function(e) {
              dialogue.showSysMsg("网络异常，请确保网络正常后再重新连接！");
              return;
            })
            var $this = $(this);
            $this.unbind("click");
          });
        },
        leave: function(result) {
          systemInfo.show(result.msg);
          $("#liveMessageId").click(function() {
            leaveMessage.show();
          });
        },
        continueque: function(result) {
          systemInfo.show(result.msg);
        },
        always: function(result) {
          systemInfo.show(result.msg);
        }
      });

      queue.reqStartQueue = function(businessId, businessName) { // 排队开始
          if (datas.get("hasInQueue")) return;
          datas.set("hasInQueue", true);
          ajax.getDepartment().done(function() {
				bList = $.businessList({
					businessList: ucc.businessList,
					aDset: ucc.aDset
				});
				if(bList.getItemOnline(businessId)){
			          userDatas.options.businessId = businessId;
			          userDatas.options.businessName = businessName;
			          userDatas.options.storageOldService = storage.get("oldService");
			          var json = userDatas.getJsonStr();
					  json.isWs = webSocket.isWork;
					  queue.options.message = JSON.stringify(json);
			          queue.options.IpStr = JSON.stringify(userDatas.getIpStr());
			          queue.start(businessId, businessName);
			          storage.set("businessId", businessId);
			          storage.set("businessName", businessName);
				}else{
					datas.set("hasInQueue", false);
					$(".onlineCls[data-pk='"+ bList.getParentPk(businessId) +"']").last().click();
					$(".onlineCls[data-pk='"+ businessId +"']").last().click();
				}
			})
        };
        webSocket.connect();
      dialogue = $.dialogue({
    	webSocket:webSocket,
        TimeoutList: TimeoutList,
        timeStr: '<div class="time">$1</div>',
        resendStr: '<div class="msg_" ><img src="/any800/style/images/sending.gif"></div>',
        msgEle: '#message',
        visitorId: userDatas.getVisitorInfo().visitorId,
        historyEle: '#leaveHistory',
        textEle: '.dialogue-footer-text',
        storage: storage,
        browserId: ucc.browserId,
        changeFaceFun: changeFaceFun,
        limitReceiveTime: 60,
        chatId: ucc.chatID,
        detectWeb: detectWeb,
        userDatas: userDatas,
        msgList: {
          reconnectSuc: "重连服务器成功！",
          reconnectFail: "网络异常，系统正尝试重连服务器！"
        },
        closeStrList: [
          ["对话出现异常，对话结束.", "對話出現異常，對話結束.", "Dialogue is abnormal, the dialogue."],
          ["对话结束，客服离开对话.", "對話結束，客服離開對話。", "End of the conversation, customer service left the conversation."],
          ["对话超时，对话结束。", "對話超時，對話結束。", "Dialogue timeout, the end of the conversation.Dialogue timeout, the end of the conversation."],
          ["您好，为了保证服务质量，我们已经结束了对话，期待再次为您服务。", "對話關閉，客服結束對話", "dialog closes, end customer dialogue."],
          ["响应超时，对话结束。", "響應超時，對話結束。", "Response timeout, end of the conversation."],
          ["您结束了对话。", "您結束了對話。", "You end the conversation."],
          ["网络中断，如需继续对话，请<a href='javascript:void(0)' class='reconnectID'>点击此处</a>重新发起对话", "網絡斷開，對話結束。", "Network disconnection,end of the conversation."],
          ["客服网络中断，当前对话结束，如需继续对话，请<a  href='javascript:void(0)' class='reconnectID'>点击此处</a>重新接入。", "客服网络中断，当前对话结束，如需继续对话，请重新接入。", "Customer's Network has bean interrupted ,end of the conversation."],
          ["网络异常，当前对话结束，如需继续对话，<a href='javascript:void(0)'  class='reconnectID'>请重新接入</a>。", "客服网络中断，当前对话结束，如需继续对话，请重新接入。", "Network has bean interrupted ,end of the conversation."]
        ],
        showSysMsgFun: function(html) {
          var msgstr = '<center class="systemInfromBox"><span class="systemInfrom">' + html + '</span></center>'
          $('#message').append(msgstr);
          uccH5Event.scrollToBottom();
          msgdb.add({
            type: "system",
            content: html
          });
          if(!!changeWindow)changeWindow.change();
        },
        getReceivedFun: function(msgId) {
          /*TimeoutList.addDiaList(msgId, "visitor", new Date().getTime());
          TimeoutList.startALLTimeout();*/
        },
        msgReplace: function(type) {
          var str = '<div class="$1 contentMessage" name="$msgid"><div class="dialogue-pic"><img src="$2"></div>'
          if (type != "visitor") {
            str += '<div class="dialogue-name">$name</div>';
          }
          str += '<div class="dialogue-c"><span class="$4"><img src="$3"></span><span class="content">$content</span></div>$msgResend</div><div class="clearboth"></div>';
          var typelist = {
            "client": {
              $1: "dialogue-in",
              $2: baseUrl+"/style/images/mobileImages/newImages/server.png",
              $3: baseUrl+"/style/images/mobileImages/newImages/dialogue_dot1.png",
              $4: "dialogue-dot1"
            },
            "visitor": {
              $1: "dialogue-me",
              $2: baseUrl+"/style/images/mobileImages/newImages/victors.png",
              $3: baseUrl+"/style/images/mobileImages/newImages/dialogue_dot2.png",
              $4: "dialogue-dot2"
            },
            "robot": {
              $1: "dialogue-in",
              $2: baseUrl+"/style/images/mobileImages/newImages/server.png",
              $3: baseUrl+"/style/images/mobileImages/newImages/dialogue_dot1.png",
              $4: "dialogue-dot1"
            }
          }
          var i = typelist[type];
          return str.replace(/\$1/g, i.$1).replace(/\$2/g, i.$2).replace(/\$3/g, i.$3).replace(/\$4/g, i.$4);
        },
        startChat: function() {
        	uccH5Init.initSatifaction();
        	$(".satisfied").show();
        	webSocket.startTimeout();
          storage.set("browserId", ucc.browserId)
//          heartBeat.init({
//            businessId: storage.get("businessId"),
//            chatId: ucc.chatID
//          });
          $(".close").show();
        },
        endChat: function() {
          datas.set("hasInQueue", false);
          localHistory.saveCurrent();
          ajax.closeEchat(ucc.chatID,dialogue.getAttr("remoteUrl"),dialogue.getAttr("operatroName") ? dialogue.getAttr("operatroName") : "");
          var dia = this;
          if (ucc.BasicSetting.jump == 1) {
            if (satisfaction.hasSat && datas.get("openSatisfactionAfterCloseChat") && !datas.get("hasSatisfaction")) {
              var _time = new Date().getTime();
              dialogue.showMsg({
                from: "client",
                content: "为了提高我们的服务质量,   请点击<span class = 'spans v_info satisfaction' id = 'satisfaction" + _time + "'>填写满意度</span><br>",
                saveIn:1
              })
            }
          };
          $(".onlineCls[data-num]").removeClass("onlineCls");
          uccH5Logic.blistNum = 1;
          ajax.initChatId(userDatas.getVisitorInfo().visitorId)
          .done(function(e) {
            try {
            ucc.chatID = e.chatID;
            storage.set("oldChatId",e.chatID);
            ucc.browserId = new Date().getTime();
        	storage.set("oldChatId",e.chatID);
        	//在关闭对话,并且用户有过一次以上留言打开满意度
  	          datas.set("openSatisfactionAfterCloseChat", false);
  	          //已打开满意度将不再打开
  	          datas.set("hasSatisfaction", false);
              var jsonStr = userDatas.getJsonStr();
              uccH5Init.initFunc();
              uccH5Logic.addmonitorJs();
            } catch (e) {
              // console.log(e);
            }
          });
        },
        endChatFun:function(){
        	webSocket.endTimeout();
//            heartBeat.end();
            changeWindow.stopCheck();
        },
        msgFun: function(json) {
          if(json.from=="visitor"||json.from=="client"){
        		TimeoutList.reset();
        	}
          msgdb.add({
        	date:json.date,
            msgId: json.msgid,
            type: json.from,
            content: json.content,
            saveIn: json.saveIn?json.saveIn:0,
			hasChecked:json.hasChecked
          });
          uccH5Event.showAudio();
          if (json.status == 1) {
        	uccH5Event.scrollToTop();
          } else {
            uccH5Event.scrollToBottom();
          }
          if(!!changeWindow)changeWindow.change();
          if(dialogue.islive())localHistory.setCurrent(msgdb.db);
        },
        sendMessageFun: function(id, txt) {
          TimeoutList.startALLTimeout();
          datas.set("openSatisfactionAfterCloseChat", true);
        },
        closeTool: function() {
          $(".close").hide();
          $("#dialogue-footer-text").blur();
          $(".dialogue-footer-text").html('');
//          $(".dialogue-footer-text").attr("contenteditable", "false");
          $("#dialogue-send").attr("disabled", "disabled");
          $(".onlineCls").attr("disabled", "disabled");
          uccH5Event.checkHeight(4);
          $("#dialogue-biaoqing").attr("disabled", "disabled");
          $(".dialogue-footer-face").hide();
          $(".fileup input").attr("disabled",true);
        },
        openTool: function() {
        	$(".close").show();
          $("#dialogue-send").removeAttr("disabled");
          $(".onlineCls").removeAttr("disabled");
          $("#dialogue-biaoqing").removeAttr("disabled");
          $(".dialogue-footer-text").attr('contenteditable', 'true');
          $(".fileup input").attr("disabled",false);
        },
        confirmSend: function(id, flag) {
          if (flag == 'add' && id) {
            $(".contentMessage[name='']:last").attr("name", id);
          } else if (id) {
            $(".contentMessage[name=" + id + "] ._msg").hide();
          }
        },
        specialFun: function(type, arg) {
          switch (type) {
            case "200":
              TimeoutList.startALLTimeout();
              break;
            case "700":
              if (arg.code == "pushsatisfaction") {
                if (satisfaction.hasSat) {
                  var _time = new Date().getTime();
                  dialogue.showMsg({
                    from: "client",
                    content: "为了提高我们的服务质量,   请点击<span class = 'spans v_info satisfaction' id = 'satisfaction" + _time + "'>填写满意度</span><br>",
                    saveIn:1
                  });
                }
              } else if (arg.code == "getinfo") {
            	  visitorInformation.show();
              } else if (arg.code == "uploadfile") {
                dialogue.showMsg({
                  from: "client",
                  content: JSON.parse(arg.text).content
                })
              }
              break;
            case "900": // 对话出现异常，对话结束.
              break;
            case "901": // 对话结束，客服退出对话.
              break;
            case "110": // 坐席网络终端
              break;
            case "111": // 真正的接通了一个客服的标识 @Elijah
              TimeoutList.startALLTimeout();
              break;
            case "112": // 坐席已经邀请不进来了 @Elijah
              break;
            case "113":
              var json = JSON.parse(arg);
              msgdb.set(json.messageId, "isRevoke", true);
              if(!!changeWindow)changeWindow.change();
              localHistory.setCurrent(msgdb.db);
              var $messageHide = $("div[name=" + json.messageId + "]")
              if ($messageHide.css("display") != "none") {
                $messageHide.hide();
                if ($messageHide.prev().hasClass("dialogue-date")) {
                  $messageHide.prev().hide();
                }
                $("#message").append("<div class='msg_back_success'>" + dialogue.getAttr("operatorName") + "已撤回一条消息</div>")
              }
              break;
            case "114": //切换窗口
              var json = JSON.parse(arg);
              //storage.set("browserId", json.browserId);
              break;
            case "902": // 对话超时，对话结束.
              langTip.show(
                langTip.type.system,
                langTip.key.no_answer_close
              );
              break;
            default:
              break;
          }
        }
      });
      robot = $.robot({
			visitorName: storage.get("visitor").visitorName,
			dialogue: dialogue,
			robotSetting: ucc.BasicSetting.robotSetting,
			companyPk: ucc.companyPk,
			chatId: ucc.chatID,
			ecselfList: ucc.ecselfList,
			langPk: ucc.defaultLangPk,
			changeToNormal: function(argument) {
				ajax.keepTenQA(ucc.chatID);
				robot.isUse = false;
				workTime.iswork();
				if (workTime.type == 0) {
					uccH5Logic.loadScheme(); // 加载样式方案
				} else {
					workTime.show();
				}
				dialogue.toolFun(false);
			}
		});
		robot.check();
		if (robot.isUse) {
			
		};
      langTip = $.langTip({
        companyPk: ucc.companyPk,
        langMap:ucc.langMap,
        defaultLangPk: ucc.defaultLangPk,
        show: function(json) {
          var reg = new RegExp("&quot;", "g");
          switch (json.langKey) {
            case 1:
              {
                var LS = uccH5Logic.showBusinessList(-1);
                if (!!LS && !!datas.get("iswork")) {
                  dialogue.showMsg({
                    from: "robot",
                    content: json.content.replace(reg, '"') + "<br>请<span class='spans'>输入数字</span>或者<span class='spans'>点击</span>选择相应的业务类型:<br>" + LS,
                    saveIn:1
                  })
                }
              }
              break;
            case 2:
              dialogue.showMsg({
                from: "robot",
                content: json.content.replace(reg, '"'),
                saveIn:1
              })
              break;
            case 3:
              dialogue.showMsg({
                from: "robot",
                content: json.content.replace(reg, '"'),
                saveIn:1
              })
              break;
            case 4:
              dialogue.showMsg({
                from: "robot",
                content: json.content.replace(reg, '"'),
                saveIn:1
              })
              break;
            case 5:
              dialogue.showMsg({
                from: "robot",
                content: json.content.replace(reg, '"'),
                saveIn:1
              })
              break;
            case 6:
              dialogue.showMsg({
                from: "robot",
                content: json.content.replace(reg, '"'),
                saveIn:1
              })
              break;
            case 7:
              dialogue.showMsg({
                from: "robot",
                content: json.content.replace(reg, '"'),
                saveIn:1
              })
              break;
            case 9:
              dialogue.showMsg({
                from: "robot",
                content: json.content.replace(reg, '"'),
                saveIn:1
              })
              break;
            default:
            	dialogue.showMsg({
                    from: "robot",
                    content: !! json.content ? json.content.replace(reg, '"') : json.conntent.replace(reg, '"'),
                    saveIn:1
                  })
				break;
          }
        }
      });
      
      leaveMessage = $.leaveMessage({
          Alert: Alert,
          warn: ".warning",
          messageDisplay: ucc.messageDisplay,
          messageContent: ucc.messageContent,
          messageTypeList: ucc.messageTypeList,
          companyPk:ucc.companyPk,
          generate: function(combo) {
            $(".leaveMessageView .title .cross img,.leaveMessageView .bottom .cancel").on("click", function() {
              leaveMessage.cancel();
            })
            $(".leaveMessageView .col").each(function(index, el) {
              var $this = $(this);
              if($this.data("type") == "textarea"){
            	  $this.append('<textarea  placeholder="' + $this.data("markedwords") + '" ></textarea>')
            	  return;
              }
              $this.append('<div class="colBack"><span class="name">' + $this.data("name")  + '</span><span class="input"></span><span class="warning"></span></div>');
              if ($this.data("type") == "combox") {
            	  $this.find(".input").append('<span class="names">请选择</span><span class="option"><img class="link" src="/any800/style/images/mobileImages/newImages/link.png"></span><div class="radiocover">留言分类选择</div>');
            	  for (var i in combo) {
            		  if(combo[i] && combo[i].pk ){
            			  $this.find(".radiocover").append('<div class="sel" data-key="' + combo[i].pk + '"><span class="name">' + combo[i].name + '</span><span class="option"><img class="ok" src="/any800/style/images/mobileImages/newImages/ok.png"></span></div>')
            		  }
                  }
            	  var item = $this.find(".radiocover .sel").first();
            	  item.addClass("selected");
            	  $this.find(".input>.names").html(item.text());
            	  $this.find(".input>.names").data("key",item.data("key"));

              } else {
                $this.find(".input").append('<input type="text" placeholder="' + $this.data("markedwords") + '" >')
              }
            });
            $(".leaveMessageView [data-type='combox'] .colBack>.input>.names,.leaveMessageView [data-type='combox'] .colBack>.input>.option").on("click", function(event) {
            	$(".leaveMessageView .radiocover").show()
            })
            $(".leaveMessageView .radiocover .sel").on("click", function(event) {
            	var item = $(this);
            	$(".leaveMessageView .radiocover .sel").removeClass("selected");
            	item.addClass("selected");
          	  	$(".leaveMessageView [data-type='combox'] .input>.names").html(item.text());
          	  	$(".leaveMessageView [data-type='combox'] .input>.names").data("key",item.data("key"));
            	$(".radiocover").hide();
            })
            $(".leaveMessageView .bottom .submit").on("click", function() {
              leaveMessage.submit({
                messageTypePk: $(".leaveMessageView [data-type='combox'] .input>.names").data("key"),
                name: $(".leaveMessageView .board [data-displayname='name']").length > 0 ? $(".leaveMessageView .board [data-displayname='name'] input").val() : "",
                telephone: $(".leaveMessageView .board [data-displayname='telephone']").length > 0 ? $(".leaveMessageView .board [data-displayname='telephone'] input").val() : "",
                email: $(".leaveMessageView .board [data-displayname='email']").length > 0 ? $(".leaveMessageView .board [data-displayname='email'] input").val() : "",
                title: $(".leaveMessageView .board [data-displayname='title']").length > 0 ? $(".leaveMessageView .board [data-displayname='title'] input").val() : "",
                content: $(".leaveMessageView .board [data-displayname='content']").length > 0 ? $(".leaveMessageView .board [data-displayname='content'] textarea").val() : "",
                company: $(".leaveMessageView .board [data-displayname='company']").length > 0 ? $(".leaveMessageView .board [data-displayname='company'] input").val() : "",
                brand: $(".leaveMessageView .board [data-displayname='brand']").length > 0 ? $(".leaveMessageView .board [data-displayname='brand'] input").val() : ""
              })
            });
          },
          reset: function(arg) {
            $(".leaveMessageView .board [data-displayname='messageTypePk'] select").val();
            $(".leaveMessageView .board [data-displayname='name'] input").val("");
            $(".leaveMessageView .board [data-displayname='telephone'] input").val("");
            $(".leaveMessageView .board [data-displayname='email'] input").val("");
            $(".leaveMessageView .board [data-displayname='title'] input").val("");
            $(".leaveMessageView .board [data-displayname='content'] textarea").val("");
            $(".leaveMessageView .board [data-displayname='company'] input").val("");
            $(".leaveMessageView .board [data-displayname='brand'] input").val("");
          },
          warn: function(el, text) {
        	  Alert.show(text)
            //el.find(".warning").html(text);
          }
        })
      visitorInformation = $.visitorInformation({
          storage: storage,
          Alert: Alert,
          storageVisitor: "visitor",
          generate: function(combo) {
            $(".visitorInformationView .body .col").each(function(index, el) {
              var $this = $(this);
              $this.append('<div class="colBack"><span class="name">' + $this.data("name") + '</span><span class="input"></span><span class="warning"></span></div>');
              if ($this.data("type") == "radio") {
            	  $this.find(".input").append('<span class="name"></span><span class="option"><img class="link" src="/any800/style/images/mobileImages/newImages/link.png"></span><div class="radiocover">性别选择<div class="sel" data-key="1"><span class="name">男</span><span class="option"><img class="ok" src="/any800/style/images/mobileImages/newImages/ok.png"></span></div><div class="sel" data-key="2"><span class="name">女</span><span class="option"><img class="ok" src="/any800/style/images/mobileImages/newImages/ok.png"></span></div><div class="sel" data-key="0"><span class="name">保密</span><span class="option"><img class="ok" src="/any800/style/images/mobileImages/newImages/ok.png"></span></div></div>');
            	  var value = $this.data("markedwords")?$this.data("markedwords"):"2";
            	  var item = $this.find(".input .radiocover .sel[data-key='"+value+"']");
            	  item.addClass("selected");
            	  $this.find(".input>.name").html(item.text());
            	  $this.find(".input>.name").data("key",item.data("key"));
              } else {
            	  $this.find(".input").append('<input type="text" placeholder="' + (!!$this.data("placeholder") ? $this.data("placeholder") : "") + '" value="' + (!!$this.data("markedwords") ? $this.data("markedwords") : "") + '" >');
              }
            });
            $(".visitorInformationView [data-type='radio'] .colBack>.input>.name,.visitorInformationView [data-type='radio'] .colBack>.input>.option").on("click", function(event) {
            	$(".visitorInformationView .radiocover").show()
            })
            $(".visitorInformationView .radiocover .sel").on("click", function(event) {
            	var item = $(this);
            	$(".visitorInformationView .radiocover .sel").removeClass("selected");
            	item.addClass("selected");
          	  	$(".visitorInformationView [data-type='radio'] .input>.name").html(item.text());
          	  	$(".visitorInformationView [data-type='radio'] .input>.name").data("key",item.data("key"));
            	$(".radiocover").hide();
            })
        	$(".visitorInformationView .title .cross img,.visitorInformationView .bottom .cancel").on("click", function() {
              visitorInformation.cancel();
            })
            $(".visitorInformationView .board .input").focus(function(event) {
              visitorInformation.check();
            });
            $(".visitorInformationView .bottom .submit").on("click", function(event) {
              visitorInformation.submit({
                visitorName: $(".visitorInformationView .board [data-displayname='visitorName'] input").val(),
                sex:$(".visitorInformationView [data-type='radio'] .input>.name").data("key"),
                realName: $(".visitorInformationView .board [data-displayname='realName'] input").val(),
                mobile: $(".visitorInformationView .board [data-displayname='phone'] input").val(),
                email: $(".visitorInformationView .board [data-displayname='email'] input").val(),
                QQ: $(".visitorInformationView .board [data-displayname='QQ'] input").val(),
                address: $(".visitorInformationView .board [data-displayname='address'] input").val(),
                company: $(".visitorInformationView .board [data-displayname='company'] input").val()
              });
            });
          },
          warn: function(el, text) {
        	  Alert.show(text);
          },
          submitFun: function() {
            //if (dialogue.islive()) {
              dialogue.sendMessage(JSON.stringify(userDatas.getJsonStr()), "getinfo");
              dialogue.showSysMsg("信息提交成功！");
            //}
          },
          cancelFun: function() {
            if (dialogue.islive()) {
              dialogue.sendMessage("访客取消了访客信息收集", "cancelVisitorInformation");
            }
          }
        });
      if(changeWindow){
    	  clearInterval(changeWindow.browserInterval);
      }
      changeWindow = $.changeWindow({
        msgdb: msgdb,
        open: true,
        storage: storage,
        chatId: ucc.chatID,
        browserId: ucc.browserId,
        dialogue: dialogue,
        TimeoutList: TimeoutList,
        data: datas,
        start: function() {
          $(".satisfied").show();
          $("#message").html('');
          $(".leaveMessage").remove();
          $("#fangkexinxi").hide();
          ucc.BasicSetting.need = 0;
        },
        end: function() {
          $(".satisfied").hide();
          $('.reminder').hide();
          uccH5Event.leaveCover();
        }
      });
      changeWindow.init();
    },initSatifaction:function(){
    	satisfaction = $.satisfaction({
            dialogue: dialogue,
            companyPk: ucc.companyPk,
            langPk: ucc.defaultLangPk,
            chatId: ucc.chatID,
            generate: function() {
              $("#message").delegate(".satisfaction", "click", function() {
            	  if(satisfaction.hasSat){
            		  satisfaction.show();
            	  }
              });
              if(satisfaction.hasSat){
            	  $(".dialogue-footer").append("<div class='satisfied'><img src='/any800/style/images/echat/satisfied.png'></div>");
                  $(".satisfied").css({
                    position: 'absolute',
                    top: -60,
                    right: 11,
                    "z-index": 99
                  }).on('click', function() {
                    satisfaction.show();
                  });;
              }
              $(".satisfied img").css('width', '46px');
              $(".satisfied").hide();
              $("#satisfactionid").hide();
              $(".satisfactionView .fr").each(function(index, el) {
                var $this = $(this);
                var btn = "";
                if (satisfaction.getElementByParent($this.data("pk")).length <= 0) {
                  btn = '<img class="ok" src="/any800/style/images/mobileImages/newImages/ok.png">';
                } else {
                  btn = '<img class="link" src="/any800/style/images/mobileImages/newImages/link.png">';
                }
                $this.append('<div class="sel"><span class="name">' + $this.data("name") + '</span><span  class="option">' + btn + '</span></div>');
              });
              $(".satisfactionView .sr").each(function(index, el) {
                var $this = $(this);
                $this.append('<div class="sel"><span class="name">' + $this.data("name") + '</span><span  class="option"><img class="ok" src="/any800/style/images/mobileImages/newImages/ok.png"></span></div>');
              });
              $(".satisfactionView .sr").hide();
              $('.satisfactionView .fr').click(function() {
                var $this = $(this);
                $('.satisfactionView .fr').removeClass("selected");
                $this.addClass("selected");
                if ($this.find(".link").length > 0) {
                  $('.satisfactionView .fr ').hide();
                  $('.satisfactionView .sr ').hide();
                  $('.satisfactionView .sr[data-parent ="' + $this.data("pk") + '"]').show();
                }
              });
              $(".satisfactionView .sr").click(function() {
                var $this = $(this);
                $this.toggleClass("selected");
              });
              $(".satisfactionView .bottom .cancel").on("click", function() {
                if ($(".satisfactionView .fr").css("display") == "none") {
                  $(".satisfactionView .fr").show();
                  $(".satisfactionView .sr").hide().removeClass("selected");
                } else {
                  satisfaction.cancel();
                }
              })
              $(".satisfactionView .title .cross img").on("click", function() {
                satisfaction.cancel();
                $(".satisfactionView .fr").show();
                $(".satisfactionView .sr").hide().removeClass("selected");
              })
              $(".satisfactionView .bottom .submit").on("click", function() {
                if ($(".satisfactionView .fr.selected").length == 0) {
                  Alert.show("请选择满意度评价！");
                  return;
                }
                var pk = $(".satisfactionView .fr.selected").data("pk");
                var opPk = $(".satisfactionView .fr.selected").data("parent");
                var nextSat = "";
                if (satisfaction.getElementByParent(pk).length > 0) {
                  if ($(".satisfactionView .sr.selected").length == 0) {
                    Alert.show("请选择原因！");
                    return;
                  } else {
                    $(".satisfactionView .sr.selected").each(function() {
                      var $this = $(this);
                      nextSat += $this.data("pk") + ",";
                    })
                  }
                }
                datas.set("hasSatisfaction", true);
                satisfaction.submit({
                  satisfactionPk: opPk,
                  optionPk: pk,
                  satisfactionMemo: !!$(".satisfactionView .mome textarea").val() ? $(".satisfactionView .mome textarea").val() : "",
                  nextSatisfactionPk: nextSat
                })
              })
            }
          });
          satisfaction.init();
    },
    initHistory:function(){
    	History = $.history({
            visitorId: userDatas.getVisitorInfo().visitorId,
            companyPk: ucc.companyPk,
            dialogue: dialogue,
            generation: function() {
              if(dialogue.islive())return;
              History.getLeaveChat();
              History.showLeaveChat();
              History.check();
             $("#leaveHistory").delegate("#getMore .c", 'click', function(event) {
                History.check();
              });
            },
            checkFun: function(argument) {
              $("#leaveHistory #getMore").remove();
              $("#leaveHistory").prepend('<span id="getMore"><span class="c">点此查看历史记录</span><span class="l"></span></span>');
              $("#leaveHistory #getMore").toggle(History.more);
            }
          });
        History.init();
    },initLocalHistory:function(){
		History = $.history({
			show: false,
			visitorId: userDatas.getVisitorInfo().visitorId,
			companyPk: ucc.companyPk,
			dialogue: dialogue,
			generation: function() {
				if (dialogue.islive()) return;
				History.getLeaveChat();
	            History.showLeaveChat();
				if(localHistory.history.length>0){
					localHistory.loadMore();
					$('body').delegate('#getMore','click', function() {
						localHistory.loadMore();
					})
				}
			},
			checkFun: function() {}
		});
        History.init();
	}
  }
  $.uccH5Init = function(options) {
    var uccH5Init = new UCCH5INIT(options);
    return uccH5Init;
  }
})(window, jQuery);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var ucc = __webpack_require__(1);
var ajax = __webpack_require__(0);
(function(window, $, undefined) {
  var UCCH5LOGIC = function(options) {
    this.defaults = {},
      this.options = $.extend({}, this.defaults, options);
  }
  UCCH5LOGIC.prototype = {
	blistNum:1,
    showBusinessList: function(businessPk) {
      var ev = this;
      if (dialogue.islive()) return;
      var bs = "";
      if (!datas.get("iswork")) return;
      var result = bList.generate(businessPk);
      if(result){
        if(result.access){
          if(result.online){
          bList.setSelect(result.pk, result.name);
          storage.set("businessId", result.pk);
          storage.set("businessName", result.name);
          queue.reqStartQueue(result.pk, result.name);
            return;
          }else{
              if(result.name){
                var type =  "离线";
                bs += '<span><a class="onlineCls" data-online="'+type+'" data-num="' + ev.blistNum + '" name="' + result.name + '" data-pk="' + result.pk + '">' + ev.blistNum + '.' + result.name + '【' + type + '】' + '</a></span><br>';
              }else{
                $("#message").html("<div style='margin-left:10px;margin-top:10px;line-height:18px;'>您好!欢迎使用在线客服系统,很高兴为您服务!<br/>如果客服忙或者客服不在线,请选择在线<span style='color:#1e93c6;text-decoration: underline;' id='fangke-liuyan'>留言</span></div>");
                        $("#fangke-liuyan").click(function() {
                          leaveMessage.show();
                        });
                return;
              }
          }
        }else{
          var list = result.list;
          for (var i = 0; i < list.length; i++) {
            var l = list[i]
                  var type = l.type == "online" ? "在线" : "离线";
              bs += '<span><a class="onlineCls" data-online="'+type+'" data-num="' + ev.blistNum + '" name="' + l.item.name + '" data-pk="' + l.item.pk + '">' + ev.blistNum + '.' + l.item.name + '【' + type + '】' + '</a></span><br>';
              ev.blistNum++;
          }
        }
      }
      return bs;
    },
    loadScheme: function() {
      uccH5Event.showVisitorInfo();
      ajax.getDepartment().done(function() {
    	bList = $.businessList({
  			businessList: ucc.businessList,
  			aDset: ucc.aDset
  		});
      	langTip.show(1, 1);
      })
    },
    viewFunc: function() {
      if ($('.leaveMessageView').length > 0) {
        document.querySelector('.leaveMessageView').addEventListener('touchmove', function(evt) {
          evt._isScroller = true;
        });
        $('.leaveMessageView textarea').on('focus', function() {
          document.querySelector('.leaveMessageView .body').scrollTop = document.querySelector('.leaveMessageView .body').scrollHeight;
        });
      }
      if ($('.satisfactionView').length > 0) {
        document.querySelector('.satisfactionView').addEventListener('touchmove', function(evt) {
          evt._isScroller = true;
        });
        $('.satisfactionView textarea').on('focus', function() {
          document.querySelector('.satisfactionView .body').scrollTop = document.querySelector('.satisfactionView .body').scrollHeight;
        });
      }
      if ($('.visitorInformationView').length > 0) {
        document.querySelector('.visitorInformationView').addEventListener('touchmove', function(evt) {
          evt._isScroller = true;
        });
        $('.visitorInformationView textarea').on('focus', function() {
          document.querySelector('.visitorInformationView .body').scrollTop = document.querySelector('.visitorInformationView .body').scrollHeight;
        });
      }
    },
    initFace: function() {
      $(".footer-face span img").click(function() {
        $("#dialogue-footer-text").append($.clone(this));
        $("#dialogue-send").show();
        $("#dialogue-add").hide();
        uccH5Event.checkHeight(4);
      });
    },
    addmonitorJs: function() {
    	setTimeout(function(){
        monitor = $.monitor({storage: storage, companyPk: ucc.companyPk,userDatas:userDatas});
    	},3000)
    }
  }
  $.uccH5Logic = function(options) {
    var uccH5Logic = new UCCH5LOGIC(options);
    return uccH5Logic;
  }
})(window, jQuery);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,"function"=="function"&&__webpack_require__(4)&&__webpack_require__(4).jQuery&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return f}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))})(window);

/***/ }),
/* 13 */
/***/ (function(module, exports) {

/*Alert.js 弹出框*/
;
(function(window, $, undefined) {
	var ALERT = function(options) {
			this.defaults = {
				bgColor: 'rgba(0,0,0,0.3)',
				time: 2
			}, this.options = $.extend({}, this.defaults, options)
		}
	ALERT.prototype = {
		isUse: false,
		init: function() {
			var alertItem = this;
			$("body").append("<div class='alert'><div class='col'></div></div>");
			$(".alert").on('click', function(event) {
				alertItem.isUse = false;
				$(".alert").hide();
			});
		},
		show: function(msg, type) {
			var alertItem = this;
			if (alertItem.isUse == false) {
				alertItem.isUse = true;
				if ( !! type && type == "error") {
					$(".alert .col").addClass('error');
				}
				$(".alert .col").html(msg);
				$(".alert").show();
				$(".alert .col").css({
					marginLeft: -$(".alert .col").width() / 2 - 20,
					marginTop: -$(".alert .col").height() - 10
				});
				setTimeout(function() {
					alertItem.isUse = false;
					$(".alert").hide();
					$(".alert .col").removeClass('error');
				}, alertItem.options.time * 1000)
			}

		}
	}
	$.Alert = function(options) {
		var Alert = new ALERT(options);
		Alert.init();
		return Alert;
	}
})(window, jQuery);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

;
(function(window, $, undefined) {
	var TIMEOUTLIST = function(options) {
			this.defaults = {
				msgdb: null,
				clientEndtime: 480,
				clientBusytime: 240,
				visitorEndTime: 240,
				visitorHalfTime: 120,
				ops: {},
				//OperatorBasicSettings包括customerFroVisitors,customerBusy,customerFroVisitors
				startFun: function() {}
			}, this.options = $.extend({}, this.defaults, options)
		}
	TIMEOUTLIST.prototype = {
		diaList: new Object(),
		timeout: null,
		hasVisitorHalfTimeout: false,
		hasVisitorTimeout: false,
		hasClientBusy: false,
		hasClientEnd: false,
		init: function() {
			this.setTime();
		},
		setTime: function() {
			var ops = this.options.ops;
			this.options.clientEndtime = ops.customerFroVisitors ? ops.customerFroVisitors : this.options.clientEndtime;
			this.options.clientBusytime = ops.customerBusy ? ops.customerBusy : this.options.clientBusytime;
			//this.options.clientBusytime = this.options.clientBusytime<240?this.options.clientBusytime/2:this.options.clientBusytime-120;
			this.options.visitorEndTime = ops.customerFroVisitors ? ops.customerFroVisitors : this.options.visitorEndTime;
			this.options.visitorHalfTime = this.options.visitorEndTime <= this.options.visitorHalfTime * 2 ? this.options.visitorEndTime / 2 : this.options.visitorEndTime - this.options.visitorHalfTime;
		},
		startALLTimeout: function() {
			var t = this;
			clearInterval(this.timeout);
			this.timeout = setInterval(function() {
				t.options.startFun();
			}, 1000);
		},
		endChat: function() {
			this.hasVisitorHalfTimeout = true;
			this.hasVisitorTimeout = true;
			this.hasClientBusy = true;
			this.hasClientEnd = true;
		},
		reset: function() {
			//this.diaList[name] = [user, time];
			this.hasVisitorHalfTimeout = false;
			this.hasVisitorTimeout = false;
			this.hasClientBusy = false;
			this.hasClientEnd = false;
		},
		removeDiaList: function(name) {
			delete this.diaList[name]
		},
		diaListLast: function() {
			var msgdb = this.options.msgdb;
			var last
			for (var i in msgdb.db) {
				if (msgdb.db[i] && (msgdb.db[i].type != "robot" && msgdb.db[i].type != "system" && !msgdb.db[i].isRevoke)) {
					if (!last || !((msgdb.db[i].type == "visitor" && msgdb.db[last].type == "visitor") || (msgdb.db[i].type == "client" && msgdb.db[last].type == "client"))) { //第一个
						last = i;
					}
				}
			}
			return last
		},
		isVisitorHalfTimeout: function() {
			var msgdb = this.options.msgdb;
			var t = this;
			var dlast = msgdb.db[t.diaListLast()];
			if (!t.hasVisitorHalfTimeout && !! dlast && dlast.type == "client") {
				var now = new Date().getTime();
				if (now - dlast.time >= t.options.visitorHalfTime * 1000 && !dlast.hasChecked) {
					msgdb.db[t.diaListLast()].hasChecked = true;
					t.hasVisitorHalfTimeout = true;
					return true
				}
			}
			return false;
		},
		isVisitorTimeout: function() {
			var msgdb = this.options.msgdb;
			var t = this;
			var dlast = msgdb.db[t.diaListLast()];
			if (!t.hasVisitorTimeout && !! dlast && dlast.type == "client") {
				var now = new Date().getTime();
				if (now - dlast.time >= t.options.visitorEndTime * 1000) {
					t.hasVisitorTimeout = true;
					return true
				}
			}
			return false;
		},
		isClientBusy: function() {
			var msgdb = this.options.msgdb;
			var t = this;
			var ops = this.options.ops;
			var dlast = msgdb.db[t.diaListLast()];
			if (ops.customerBusy == 0) return false;
			if (!t.hasClientBusy && !! dlast && dlast.type == "visitor") {
				var now = new Date().getTime();
				if (now - dlast.time >= t.options.clientBusytime * 1000 && !dlast.hasChecked) {
					msgdb.db[t.diaListLast()].hasChecked = true;
					t.hasClientBusy = true;
					return true
				}
			}
//			//检查相邻访客与坐席的时间大于坐席等待时间的显示提示
//			var fkNoTip = {};
//			for (var i in msgdb.db) {
//				var d = msgdb.db[i];
//				if (fkNoTip.length != 0) {
//					if (!d.isRevoke) {
//
//						if (d.type == "client") {
//							if (d.time - fkNoTip.time >= t.options.clientBusytime * 1000 && !fkNoTip.hasChecked) {
//								fkNoTip.hasChecked = true;
//								return true;
//							} else {
//								fkNoTip = {};
//							}
//						}
//					}
//				}
//				if (d.type == "visitor") {
//					fkNoTip = d;
//				}
//			}
			return false;
		},
		isClientEnd: function() {
			var msgdb = this.options.msgdb;
			var t = this;
			var dlast = msgdb.db[t.diaListLast()];
			var now = new Date().getTime();
			if (now - dlast.time >= t.options.clientEndtime * 1000 && !t.hasClientEnd && dlast.hasChecked) {
				msgdb.db[t.diaListLast()].hasChecked = true;
				t.hasClientEnd = true;
				return true
			}
			return false;
		}
	}
	$.TimeoutList = function(options) {
		var TimeoutList = new TIMEOUTLIST(options);
		TimeoutList.init();
		return TimeoutList;
	}
})(window, jQuery);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

;
(function(window, $, undefined) {
	var BUSINESSLIST = function(options) {
			this.defaults = {
				'businessList': [],
				aDset: [],
				root: "-1"
			}, this.options = $.extend({}, this.defaults, options);
		}
	BUSINESSLIST.prototype = {
		num: 1,
		//mobile版本的数字号
		basePk: -1,
		init: function() {
			var aDset = this.options.aDset;
			if (!aDset) return;
			var businessList = this.options.businessList;
			if (aDset.joinUpType == "0" || !aDset.joinUpType) {} else if (aDset.joinUpType == "1") { // 指定坐席
				// TODO 指定坐席接入对话
			} else if (aDset.joinUpType == "2") { // 方案指定业务类型
			}
			this.reset("-1");
		},
		reset:function(pk){
			var blist = this;
			var businessList = this.options.businessList;
			var hasonline = false;
			for (var i = 0; i < businessList.length; i++) {
				if(businessList[i].parentPk == pk){
					var next = blist.getList(businessList[i].pk);
					if(next.length==0){
						if(businessList[i].operators.length > 0){
							hasonline = true;
						}
					}else{
						var nexthasOnline = blist.reset(businessList[i].pk);
						if(nexthasOnline==false){
							businessList[i].operators = [];
						}else if(nexthasOnline==true){
							hasonline = true;
						}
					}
				}
			}
			return hasonline;
		},
		hasList: function(pk) {
			var btns = []; //标签组
			var businessList = this.options.businessList;
			for (var i = 0; i < businessList.length; i++) {
				if (businessList[i].parentPk == pk) {
					if (businessList[i].operators.length > 0) {
						btns.push({
							item: businessList[i],
							type: "online"
						});
					} else {
						btns.push({
							item: businessList[i],
							type: "offline"
						});
					}
				}
			}
			return btns;
		},
		getList: function(pk) {
			var num = this.num
			var btns = []; //标签组
			var businessList = this.options.businessList;
			for (var i = 0; i < businessList.length; i++) {
				if (businessList[i].parentPk == pk) {
					if (businessList[i].operators.length > 0) {
						btns.push({
							num: this.num,
							item: businessList[i],
							type: "online"
						});
						this.num++;
					} else {
						btns.push({
							num: this.num,
							item: businessList[i],
							type: "offline"
						});
						this.num++;
					}
				}
			}
			return btns;
		},
		getAllLength: function() {
			var bList = this
			var businessList = this.options.businessList;
			return {
				listLength: businessList.length,
				operatorLength: businessList.length > 0 ? businessList[0].operators.length : 0,
				firstItem: businessList.length > 0 ? businessList[0] : null
			}
		},
		getParentPk: function(pk) {
			var businessList = this.options.businessList;
			for (var i = 0; i < businessList.length; i++) {
				if (businessList[i].pk == pk) {
					return businessList[i].parentPk;
				}
			}
			return null;
		},
		setSelect: function(pk, name) {
			this.select = {
				pk: pk,
				name: name
			}
		},
		getSelect: function() {
			return this.select
		},
		generate: function(pk) {
			//当前节点只有一个子节点
			var list = this.getList(pk);
			var parentPk = this.getParentPk(pk);
			var root = false;
			if (pk == -1 && list.length == 0) {
				return {
					access: true,
					online: false
				};
			} else if (pk == this.basePk && list.length == 1) {
				this.basePk = list[0].item.pk;
				if (this.getList(list[0].item.pk).length > 0) {
					return this.generate(list[0].item.pk);
				} else if (list[0].item.operators.length > 0) {
					return {
						access: true,
						online: true,
						pk: list[0].item.pk,
						name: list[0].item.name
					}
				} else {
					return {
						access: true,
						online: false,
						pk: list[0].item.pk,
						name: list[0].item.name
					}
				}
			} else {
				if (this.basePk == pk) {
					root = true;
				}
				return {
					access: false,
					list: list,
					root: root
				}
			}
		},getItemOnline:function(pk){
			var blist = this;
			var businessList = this.options.businessList;
			var hasonline = false;
			for (var i = 0; i < businessList.length; i++) {
				if(businessList[i].pk == pk){
					if(businessList[i].operators.length>0){
						hasonline = true;
					}
				}
			}
			return hasonline;
		}
	}
	$.businessList = function(options) {
		var businessList = new BUSINESSLIST(options);
		businessList.init();
		return businessList;
	}
})(window, jQuery);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

/*changeFace.js 转换表情*/
;
(function(window, $, undefined) {
	var arrEntities = {
		'lt': '<',
		'gt': '>',
		'nbsp': ' ',
		'amp': '&',
		'quot': '"'
	};
	var imgIco = [
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face01.png" data-name="/::)" id="/::)">', '/::)', '/::\\)'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face02.png" id="/::P" data-name="/::P">', '/::P', '/::P'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face03.png" id="/::$" data-name="/::$">', '/::$', '/::\\$'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face04.png" id="/::D" data-name="/::D">', '/::D', '/::D'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face05.png" id="/::-|" data-name="/::-|">', '/::-|', '/::\\-\\|'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face06.png" id="/::+" data-name="/::+">', '/::+', '/::\\+'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face07.png" id="/:,@-D"  data-name="/:,@-D">', '/:,@-D', '/:,@\\-D'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face08.png" id="/::>" data-name="/::>">', '/::>', '/::\\>'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face09.png" id="/:,@f" data-name="/:,@f">', '/:,@f', '/:,@f'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face10.png" id="/:?" data-name="/:?">', '/:?', '/:\\?'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face11.png" id="/:bye" data-name="/:bye">', '/:bye', '/:bye'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face12.png" id="/:handclap" data-name="/:handclap">', '/:handclap', '/:handclap'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face13.png" id="/::*" data-name="/::*">', '/::*', '/::\\*'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face14.png" id="/:strong" data-name="/:strong">', '/:strong', '/:strong'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face15.png" id="/:P-(" data-name="/:P-(">', '/:P-(', '/:P\\-\\('],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face16.png" id="/:rose" data-name="/:rose">', '/:rose', '/:rose'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face17.png" id="/:share" data-name="/:share">', '/:share', '/:share'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face18.png" id="/:ok" data-name="/:ok">', '/:ok', '/:ok'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face19.png" id="/:sun"  data-name="/:sun">', '/:sun', '/:sun'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face20.png" id="/:heart" data-name="/:heart">', '/:heart', '/:heart'],
		['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face21.png" id="/:hug" data-name="/:hug">', '/:hug', '/:hug']
	]
	var CHANGEFACE = function(options) {
			this.defaults = {
				imgIco: [],
				after: function() {

				}
			}, this.options = $.extend({}, this.defaults, options)
		}
	CHANGEFACE.prototype = {
		init: function() {
			this.options.imgIco = imgIco;
			this.options.after();
		},
		getItems: function() {
			return imgIco;
		},
		imgToIco: function(html) {
			var ht = html;
			if (!ht || typeof html!="string") {
				return ht;
			}
			ht = ht.replace(/&(lt|gt|amp|quot);/ig, function(all, t) {
				return arrEntities[t];
			});
			var $h = $("<div>" + html + "</div>");
			for (var i in imgIco) {
				$h.find("img[data-name='" + imgIco[i][1] + "']").each(function(e) {
					$(this).replaceWith(imgIco[i][1]);
				})
			}
			ht = $h.html();
			return ht;
		},
		icoToImg: function(html) {
			var ht = html;
			if (!ht || typeof html!="string") {
				return ht;
			}
			ht = ht.replace(/&(lt|gt|amp|quot);/ig, function(all, t) {
				return arrEntities[t];
			});
			for (var i in imgIco) {
				if (ht.indexOf(imgIco[i][1]) != -1) {
					ht = ht.replace(new RegExp(imgIco[i][2], "gm"), imgIco[i][0]);
				}
			}
			return ht;
		}
	}
	$.changeFace = function(options) {
		var changeFace = new CHANGEFACE(options);
		changeFace.init();
		return changeFace;
	}
})(window, jQuery);

/***/ }),
/* 17 */
/***/ (function(module, exports) {

(function(window, $, undefined) {
	var CHANGEWINDOW = function(options) {
			this.defaults = {
				open: false,
				msgdb: null,
				storage: null,
				chatId: "",
				browserId: "",
				dialogue: null,
				data: null,
				TimeoutList: null,
				start: function() {},
				end: function() {}
			}, this.options = $.extend({}, this.defaults, options)
		}
	CHANGEWINDOW.prototype = {
		isChanged: false,
		browserInterval: null,
		db: {},
		change: function() {
			var storage = this.options.storage;
			var chatId = this.options.chatId;
			var items = storage.get("currentChat") ? storage.get("currentChat") : [];
			items = this.options.msgdb.getAll();
			if (!storage.get("currentChatId") || this.options.chatId != storage.get("currentChatId")) {
				items = [];
			}
			storage.set("currentChatId", chatId);
			storage.set("currentChat", items);
		},
		clear: function() {
			var chatId = this.options.chatId;
			//this.options.storage.clear("currentChat");
			//this.options.storage.clear("currentChatId");
		},
		check: function() {
			var chatId = this.options.chatId;
			var storage = this.options.storage;
			if ( !! storage.get("currentChat") && !! storage.get("currentChatId") && storage.get("currentChatId") == chatId) {
				return storage.get("currentChat");
			}
			return false;
		},
		setMsgObj: function(msgObj) {
			var chatId = this.options.chatId;
			var storage = this.options.storage;
			storage.set("msgObjCurrentChat", msgObj);
		},
		getMsgObj: function() {
			var storage = this.options.storage;
			return storage.get("msgObjCurrentChat");
		},
		init: function() {
			var storage = this.options.storage;
			var CW = this;
			CW.db = this.options.storage.get("currentChat");
			if (!CW.options.open) return;
			if ( !! storage.get("browserId") && !! storage.get("currentChatId") && CW.options.chatId == storage.get("currentChatId")) {
				storage.set("browserId", CW.options.browserId);
			}
			CW.startcheck();
			if (CW.browserInterval != "over") {
				CW.browserInterval = setInterval(function() {
					CW.startcheck();
				}, 1000)
			}
		},
		startcheck: function() {
			var CW = this;
			var storage = this.options.storage;
			var dialogue = this.options.dialogue;
			var data = this.options.data;
			var msgdb = this.options.msgdb;
			if (!storage.get("browserId") || CW.options.chatId != storage.get("currentChatId")) {
				return;
			} else if (storage.get("offChat")!=true && CW.options.browserId != storage.get("browserId")) {
				if (dialogue.islive() == true) {

					dialogue.end();
					//显示离开
					CW.options.end();
				}
			} else if (CW.options.browserId == storage.get("browserId") && CW.getMsgObj()) {
				if (dialogue.islive() == false) {
					CW.isChanged = true;
					storage.set("browserId",CW.options.browserId);
					storage.set("offChat",CW.options.browserId);
					msgdb.clear();
					CW.options.start();
					var msgObj = CW.getMsgObj();
					data.set("reconnectData", msgObj);
					dialogue.setAttr("remoteUrl", msgObj.url);
					dialogue.setAttr("_workGroupName", msgObj.workgroupName);
					dialogue.setAttr("operatorName", msgObj.opShow);
					data.set("opName", msgObj.workgroupName);
					data.set("_workGroupName", msgObj.workgroupName);
					dialogue.start();
					if ( !! CW.db) {
						var items = CW.db;
						for (var i in items) {
							var item = items[i];
							if (item && (item.type == "visitor" || item.type == "client" || item.type == "robot")) {
								if ( !! item.content && !item.isRevoke && item.status == 0) {
									dialogue.showMsg({
										msgid: item.msgId,
										date: item.time,
										content: item.content,
										from: item.type,
										status: item.status,
										hasChecked:item.hasChecked
									});
								}
							} else if (item && item.type == "system") {
								if ( !! item.content) {
									dialogue.showSysMsg(item.content);
								}
							}
							msgdb.id = parseInt(i) + 1;
						}
						CW.options.TimeoutList.startALLTimeout();
						msgdb.db = CW.db;
					}
				}

			}
		},
		stopCheck: function() {
			var CW = this;
			clearInterval(CW.browserInterval);
			CW.browserInterval = "over";
			CW.clear();
		}
	}
	$.changeWindow = function(options) {
		var changeWindow = new CHANGEWINDOW(options);
		return changeWindow;
	}
})(window, jQuery); 

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/*confirmBox.js */
var CONFIRMBOX = function(options) {
		this.defaults = {
		};
		this.options = $.extend({}, this.defaults, options);
	};
CONFIRMBOX.prototype = {
	defered: null,
	init: function() {
		var c =this;
		if($(".confirmBox").length>0){
			return;
		}
		$("body").append("<div class='confirmBox'><div class='body'><div class='title'></div><div class='rightBtn'></div><div class='wrongBtn'></div></div></div>")
		$(".confirmBox .rightBtn").on("click",function(){
			if(c.defered){
				c.defered.resolve(true);
			};
			$(".confirmBox").hide();
			c.defered = null;
		});
		$(".confirmBox .wrongBtn").on("click",function(){
			if(c.defered){
				c.defered.resolve(false);
			};
			$(".confirmBox").hide();
			c.defered = null;
		});
		$(".confirmBox").hide();
	},
	create:function(title,right,wrong){
		var c =this;
		right = right?right:"确定";
		wrong = wrong?wrong:"取消";
		$(".confirmBox").show();
		c.switchTitle(title,right,wrong);
		if(c.defered){
			c.defered.resolve(false);
		};
		c.defered = new $.Deferred();
		return c.defered.promise();
	},
	switchTitle:function(title,right,wrong){
		$(".confirmBox .title").html(title);
		$(".confirmBox .rightBtn").html(right);
		$(".confirmBox .wrongBtn").html(wrong);
		var h = $(".confirmBox").height()/2-$(".confirmBox .body").height()/2
		$(".confirmBox .body").css({
			marginTop:h
		})
	}
}
$.confirm = function(options) {
  var confirmBox = new CONFIRMBOX(options);
  confirmBox.init();
  return confirmBox;
}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

;
(function(window, $, undefined) {
	var DATA = function(options) {
			this.defaults = {
				chatId: "",
				storage: null,
			}, this.options = $.extend({}, this.defaults, options)
		}
	DATA.prototype = {
		list: {},
		get: function(k) {
			var storage = this.options.storage;
			if (storage) {
				var data = storage.get("data");
				return data ? data[k] : data;
			} else {
				var key = this.options.chatId + k;
				return !!this.list[key] ? this.list[key] : null;
			}
		},
		set: function(k, value) {
			var storage = this.options.storage;
			if (storage) {
				var data = storage.get("data");
				data = data ? data : {};
				data[k] = value;
				storage.set("data", data);
			} else {
				var key = this.options.chatId + k;
				this.list[key] = value;
			}
		}
	}
	$.db = function(options) {
		var datas = new DATA(options);
		return datas;
	}
})(window, jQuery);

/***/ }),
/* 20 */
/***/ (function(module, exports) {

(function(window, $, undefined) {
	String.prototype.trim = function()  
    {  
        return this.replace(/(^\s*)|(\s*$)/g, "");  
    }  
	var WEB = function(options) {
			this.defaults = {
				'period': 30,
				after: function() {}
			}, this.options = $.extend({}, this.defaults, options);
		}
	WEB.prototype = {
		isInitiate: false,
		isReconnection: false,
		checkeTimeout: null,
		msgs: [],
		period: 0,
		getIsInitiate: function() {
			return this.isInitiate;
		},
		getIsReconnection: function() {
			return this.isReconnection;
		},
		getMsgs: function(lastIndexOf) {
			if (this.msgs.length > lastIndexOf) {
				return this.msgs.slice(this.msgs.length - lastIndexOf, this.msgs.length);
			}
			return this.msgs;
		},
		check: function() {
			this.period--;
			if (this.period <= 0) {
				this.options.after();
				clearInterval(this.checkeTimeout);
				this.checkeTimeout = null;
				this.isInitiate = false;
				this.period = this.options.period;
			}
		},
		checkedSuccess: function() {
			clearInterval(this.checkeTimeout);
			this.checkeTimeout = null;
			this.period = this.options.period;
			this.isInitiate = false;
		},
		setInitiate: function(value) {
			this.isInitiate = value;
		},
		setIsReconnection: function(value) {
			this.isReconnection = value;
		},
		checkedFail: function() {
			var item = this;
			item.checkeTimeout = setInterval(function() {
				item.check();
			}, 1e3);
			this.isInitiate = true;
		},
		msgPush: function(op, resultStr) {
			this.msgs.push('{"' + op + '":\"' + resultStr + '\"}');
		}
	}
	$.detectWeb = function(options) {
		var web = new WEB(options);
		web.period = web.options.period;
		return web;
	}
})(window, jQuery);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var ajax = __webpack_require__ (0);
/*dialogue.js 对话主进程*/
;(function(window, $, undefined) {
  var DIALOGUE = function(options) {
      this.defaults = {
        webSocket: null,
        timeStr: '<p class="dialogue-date">$1</p>',
        resendStr: '<div class="msg_" ><img src="style/images/sending.gif"></div>',
        callbackStr: '<span style="color:red;line-height:20px;margin-right:5px;">重新发送</span><img style="vertical-align: bottom;margin-right:5px;" src="style/images/repeat.png">',
        msgEle: '#message',
        visitorId: "",
        historyEle: '#historyChat',
        textEle: '.dialogue-area-write',
        storage: null,
        browserId: "",
        limitReceiveTime: 60,
        changeFaceFun: null,
        chatId: "",
        detectWeb: null,
        userDatas:null,
        msgList: {
          reconnectSuc: "重连服务器成功！",
          reconnectFail: "网络异常，系统正尝试重连服务器！"
        },
        closeStrList: [
          ["对话出现异常，对话结束.", "對話出現異常，對話結束.", "Dialogue is abnormal, the dialogue."],
          ["对话结束，客服离开对话.", "對話結束，客服離開對話。", "End of the conversation, customer service left the conversation."],
          ["对话超时，对话结束。", "對話超時，對話結束。", "Dialogue timeout, the end of the conversation.Dialogue timeout, the end of the conversation."],
          ["您好，为了保证服务质量，我们已经结束了对话，期待再次为您服务。", "對話關閉，客服結束對話", "dialog closes, end customer dialogue."],
          ["响应超时，对话结束。", "響應超時，對話結束。", "Response timeout, end of the conversation."],
          ["您结束了对话。", "您結束了對話。", "You end the conversation."],
          ["网络中断，如需继续对话，请<a href='javascript:void(0)' class='reconnectID'>点击此处</a>重新发起对话", "網絡斷開，對話結束。", "Network disconnection,end of the conversation."],
          ["客服网络中断，当前对话结束，如需继续对话，请<a href='javascript:void(0)' onclick=''  class='reconnectID'>点击此处</a>重新接入。", "客服网络中断，当前对话结束，如需继续对话，请重新接入。", "Customer's Network has bean interrupted ,end of the conversation."],
          ["网络异常，当前对话结束，如需继续对话，<a href='javascript:void(0)' onclick=''  class='reconnectID'>请重新接入</a>。", "客服网络中断，当前对话结束，如需继续对话，请重新接入。", "Network has bean interrupted ,end of the conversation."]
        ],
        showSysMsgFun: function(html) {},
        getReceivedFun: function(msgId) {},
        msgReplace: function(type) {},
        startChat: function() {},
        endChat: function() {},
        sendMessageFun: function(id, txt) {},
        msgFun: function(json) {},
        closeTool: function() {},
        openTool: function() {},
        confirmSend: function(id, flag) {},
        specialFun: function(type, arg) {},
        endChatFun: function() {}
      };
      this.options = $.extend({}, this.defaults, options);
    }
  DIALOGUE.prototype = {
    msgPair: {},
    diaCount: 0,
    isSpeech: false,
    lastSend: "",
    diaList: new Object(),
    readMessageTimeout: null,
    readMessageInterval: null,
    prevTextInterval: null,
    time:new Date().getTime(),
    attr: {
      langType: 0,
      islive: false,
      operatorName: "",
      remoteUrl: "",
      _workGroupName: ""
    },
    getAttr: function(key) {
      return typeof key != "undefined" ? this.attr[key] : "";
    },
    setAttr: function(key, value) {
      this.attr[key] = value;
    },
    islive: function() {
      return this.getAttr("islive");
    },
    showMsg: function(json) {
      var msgid = !! json.msgid ? json.msgid : "",
        date = !! json.date ? json.date : "",
        content = json.content,
        from = !! json.from ? json.from : "client",
        status = !! json.status ? json.status : 0;
      var userDatas = this.options.userDatas;
      var str = this.options.msgReplace(from);
      var isClient = (from == "client");
      var name = !! isClient ? this.getAttr("operatorName") : (from == "robot") ? (this.islive()?this.getAttr("operatorName"):"客服") : userDatas.getJsonStr().visitorName?userDatas.getJsonStr().visitorName:"访客";

      if (!content || content == "undefined" || content == "null") return;
      var reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
      var httpUrl = $("<div>" + content + "</div>").text();
      if (from == "client" && reg.test(httpUrl) && content.indexOf("audio") < 0) {
        var open = "<a href=" + httpUrl + " target='_blank'>" + httpUrl + "</a>";
        content = open;
        this.options.specialFun("openWin", open);
      }
      content = this.messageChange(content);
      content = this.options.changeFaceFun.imgToIco(content);
      content = this.options.changeFaceFun.icoToImg(content);
      str = str.replace(/\$name/g, name).replace(/\$content/g, content).replace(/\$msgid/g, msgid).replace(/\$msgResend/g, !isClient ? this.options.resendStr : "");

      if (status == 0 || !status) {
        if (!date) {
          date = new Date().getTime();
        };
        var timeStr = this.options.timeStr.replace(/\$1/g, new Date(date).Format("hh:mm:ss"));
        $(this.options.msgEle).append(timeStr);
        $(this.options.msgEle).append(str);
      } else {
        if (!date) {
          date = new Date().getTime();
        };
        var timeStr = this.options.timeStr.replace(/\$1/g, new Date(date).Format("yyyy-MM-dd hh:mm:ss"));
        
        $(this.options.historyEle).prepend(str);
        $(this.options.historyEle).prepend(timeStr);
      }
      this.options.msgFun(json);
    },
    messageChange:function(content){
      var contentText = content;
      try{
        contentText = JSON.parse($("<div>"+ content +"</div>").text());
        if(contentText.msgType == "news"){
          var json = {
            title:contentText.articles[0].title,
            summary:contentText.articles[0].summary,
            url:contentText.articles[0].url,
            img:contentText.articles[0].picUrl
          }
          contentText = '<div class="message_news" data-url="'+json.url+'" ><div class="title">'+json.title+'</div><div class="content"><div class="summary">'+json.summary+'</div><div class="img"><img src="'+json.img+'"/></div></div></div>';
        }else if(contentText.type=="IDCard"){
          //{"summaryStr":"个人名片","operatorPK":"ff8080815fe3e1d6015ffb77dcaa0011","headURL":"","nickname":"Bulin","companyPk":"ff8080815faad965015fb3541ef6008c","type":"IDCard","detailURL":"http:\/\/ronghe.any800.com \/scrm\/app\/namecard\/detail?staffId=ff8080815fe3e1d6015ffb77dcaa0011"}
          var json = {
            title:contentText.nickname,
            summary:contentText.summaryStr,
            url:contentText.detailURL,
            img:contentText.headURL?contentText.headURL:"./bootstrapUI/any800/images/client.png"
          }
          contentText = '<div class="message_news IDCard" data-url="'+json.url+'" ><div class="img"><img src="'+json.img+'"/></div><div class="content"><div class="title">'+json.title+'</div><div class="summary">'+json.summary+'</div></div></div>';
        }else if(contentText.type=="knowledgeCard"){
          //{"coverUrl":"","title":"测试插件","companyPk":"ff8080815faad965015fb3541ef6008c","type":"knowledgeCard","description":"随便写","url":"https:\/\/www.baidu.com "}
          var json = {
            title:contentText.title,
            summary:contentText.description,
            url:contentText.url,
            img:contentText.coverUrl?contentText.coverUrl:"./bootstrapUI/any800/images/client.png"
          }
          contentText = '<div class="message_news knowledgeCard" data-url="'+json.url+'" ><div class="content"><div class="title">'+json.title+'</div><div class="summary">'+json.summary+'</div><div class="img"><img src="'+json.img+'"/></div></div></div>';
        }else{
          contentText = content;
        }
      }catch(e){}	
      return contentText;
    },
    showSysMsg: function(html,hidden) {
      if (!html || html == "undefined" || html == "null") return;
      this.options.showSysMsgFun(html,hidden);
    },
    start: function() {
      var dia = this;
      dia.setAttr("islive", true);
      dia.options.storage.set("browserId", dia.options.browserId);
      if ( !! dia.options.webSocket && dia.options.webSocket.isWork) {
        //dia.options.webSocket.connect();
        dia.prevTextInterval = window.setInterval(function() {
          dia.preVstText()
        }, 2000);
      } else {
        dia.startReadMessageTimeout();
        clearInterval(dia.prevTextInterval);
        clearInterval(dia.readMessageInterval);
        dia.readMessageInterval = window.setInterval(function() {
          if(new Date().getTime()-dia.time>10*1000){
            dia.startReadMessageTimeout();
          }
        }, 10*1000);
        dia.prevTextInterval = window.setInterval(function() {
          dia.preVstText()
        }, 2000);
      }
      dia.toolFun(true);
      dia.options.startChat();
    },
    startReadMessageTimeout: function() {
      var dia = this;
      dia.time = new Date().getTime();
      if (dia.readMessageTimeout) {
        clearTimeout(dia.readMessageTimeout);
      }
      dia.readMessageTimeout = window.setTimeout(function() {
        dia.readMessage();
      }, 1000);
    },
    end: function(type) {
      var dia = this;
      if (!dia.islive()) return;
      dia.setAttr("islive", false);
      if ( !! dia.options.webSocket && dia.options.webSocket.isWork) {
        //dia.options.webSocket.close();
      } else {
        if (dia.readMessageTimeout) {
          clearTimeout(dia.readMessageTimeout);
        }
        dia.readMessageTimeout = null;
        clearInterval(dia.readMessageInterval);
        dia.readMessageInterval = null;
        clearInterval(dia.prevTextInterval);
        dia.prevTextInterval = null;
      }
      dia.toolFun(false);
      if (typeof type == "number") {
        dia.options.storage.set("browserId", "");
        dia.showSysMsg(this.options.closeStrList[type][dia.getAttr("langType")],true);
        dia.options.endChat();
      }
      dia.options.endChatFun();
    },
    readMessage: function() {
      var dia = this;
      var detectWeb = dia.options.detectWeb;
      if (!dia.getAttr("remoteUrl")) {
        return;
      }
      ajax.readMessage(dia.options.chatId,dia.getAttr("remoteUrl"))
      .done(function(data) {
        dia.startReadMessageTimeout();
        try {
          if (detectWeb.getIsInitiate()) {
            dia.showSysMsg(dia.options.msgList.reconnectSuc);
          }
          dia.messageDeal(data);
          if (detectWeb.getIsInitiate()) {
            dia.toolFun(true);
            detectWeb.checkedSuccess();
          }
        } catch (e) {}
      }).fail(function(data) {
        dia.startReadMessageTimeout();
        if (!detectWeb.getIsInitiate()) {
          dia.toolFun(false);
          dia.showSysMsg(dia.options.msgList.reconnectFail);
          detectWeb.checkedFail();
        }
      });
    },
    messageDeal: function(result) {
      var dia = this;
      var detectWeb = dia.options.detectWeb;
      if (result && result.root) {
        if (result.root.length == 0) {
          return false;
        }
        for (var i = 0; i < result.root.length; i++) {
          var textSW = result.root[i].type.text;
          if (textSW == "200") { //普通对话
            if (result.root[i].from && result.root[i].date != "") {
              if (result.root[i].langType > 0 && result.root[i].langKey > 0) {

              } else {
                var json = JSON.parse(result.root[i].text);
                dia.addDiaList(json.messageId, new Date().getTime(), json.content, 0, "client");
                if(typeof json.content =="object"){
                  json.content = JSON.stringify(json.content);
                }
                json.content = json.content.replace(/\n/ig,"<br>")
                dia.showMsg({
                  msgid: json.messageId,
                  date: new Date().getTime(),
                  content: json.content,
                  from: "client",
                  status: 0
                });
                dia.options.specialFun("200", {
                  msgid: json.messageId,
                  content: json.content,
                  time: new Date().getTime()
                });
                detectWeb.msgPush('customer', json.content);
              }
            }
          } else if (textSW == "700") { // 满意度、发送文件等.
            dia.options.specialFun("700", result.root[i]);
          } else if (textSW == "900") { // 对话出现异常，对话结束.
            if (detectWeb.getIsInitiate()) {
              dia.end(6);
            } else {
              dia.end(2);
            }
            dia.options.specialFun("900", "");
          } else if (textSW == "901") { // 对话结束，客服退出对话.
            dia.end(3);
            dia.options.specialFun("901", "");
          } else if (textSW == "110") { // 坐席网络中断
            dia.end(7);
            dia.options.specialFun("110", "");
          } else if (textSW == "111") { // 真正的接通了一个客服的标识 @Elijah
            dia.toolFun(true);
            dia.showMsg({
              msgid: "",
              date: new Date().getTime(),
              content: JSON.parse(result.root[i].text).content,
              from: "client",
              status: 0,
              saveIn: 1
            });
            // TODO 如果是当前对话是重连的则这里调用发消息的接口将
            // 5通对话带入到新的坐席上 2015/06/24
            if (detectWeb.getIsReconnection()) {
              var txt = '[' + detectWeb.getMsgs(5).join(',') + ']'; // 取5条数据
              dia.sendMessage(txt, 'offLineMessage');
            }
            dia.options.specialFun("111", result.root[i]);
          } else if (textSW == "112") { // 坐席已经邀请不进来了 @Elijah
            dia.showMsg({
              msgid: "",
              date: new Date().getTime(),
              content: JSON.parse(result.root[i].text).content,
              from: "client",
              status: 0
            });

            dia.end(0); //
            dia.options.specialFun("112", result.root[i]);
          } else if (textSW == "113") {
            dia.options.specialFun("113", result.root[i].text);
          } else if (textSW == "114") { //切换窗口
            dia.options.specialFun("114", result.root[i].text);
          } else if (textSW == "902") { // 对话超时，对话结束.
            if (dia.islive()) {
              dia.options.specialFun("902", result.root[i].text);
              dia.end(2);
            }
          }
        }
      }
    },
    addDiaList: function(msgId, time, content, status, from) {
      if (!msgId) {
        msgId = "Other" + new Date().getTime();
        this.diaCount++;
      }
      this.diaList[msgId] = {
        time: time,
        from: from,
        content: content,
        status: status,
        isReceived: from == "client" ? 1 : 0,
        receivedTime: 0 //0未读,1已读,2未读超时
      }
      return msgId;
    },
    getReceived: function() {
      var dia = this;
      var diaList = this.diaList,
        box = [];
      for (var i in diaList) {
        if (diaList[i].isReceived == 0) {
          box.push(i);
        }
      }
      for (var k in box) {
        if (!isNaN(Number(k))) {
          ajax.getReceivedMID(dia.msgPair[box[k]],this.getAttr("_workGroupName"))
          .done(function(data){
            dia.options.getReceivedFun(box[k]);
            dia.diaList[box[k]].isReceived = 1;
            dia.options.confirmSend(box[k]);
            if (data.success) {


            } else {
              if (dia.diaList[box[k]].receivedTime >= dia.options.limitReceiveTime) {
                dia.diaList[box[k]].isReceived = 2;
              } else {
                dia.diaList[box[k]].receivedTime++;
              }
            }
          })
        }
      }
    },
    preVstText: function() {
      var lastSend = this.lastSend;
      var txtContent = $(this.options.textEle).text().replace(/\s+/g, "");
      if (this.lastSend != txtContent) {
        this.lastSend = txtContent;
        if (txtContent) {
          this.sendMessage(txtContent, "foreknowledge");
        } else {
          this.sendMessage(" ", "foreknowledge");
        }
      }
    },
    sendMessage: function(txt, code, allowSend) {
      var dia = this;
      var arrEntities = {
        'lt': '<',
        'gt': '>',
        //'nbsp': ' ',
        'amp': '&',
        'quot': '"'
      };
      txt = txt.replace(/&(lt|gt|amp|quot);/ig, function(all, t) {
        return arrEntities[t];
      });

      if (code == "acceptRq") {
        this.isSpeech = true;
      }
      if (code == "offLineMessage") { // 将断线重连的离线消息带入到坐席
      } else if (code != "send_file") {} else {
        code = "";
      }
      txt = txt.replace(/<a/g, "<a target='_blank'"); // 给所有链接添加"<a
      // target='_blank'
      var msgId = dia.addDiaList("", new Date().getTime(), txt, 0, "visitor");
      var time = new Date().getTime();
      if (!code && !allowSend) {

        dia.showMsg({
          msgid: msgId,
          date: time,
          content: txt,
          from: "visitor",
          status: 0
        });

        dia.options.sendMessageFun(msgId, txt);
      }
      if ( !! dia.options.webSocket && dia.options.webSocket.isWork && !code) {
        dia.options.webSocket.send({
          date:time,
          message: txt,
          chatID: dia.options.chatId
        })
        return;
      }
      ajax.sendMessage(dia.options.chatId,txt,code ? code : "",dia.getAttr("remoteUrl"),dia.options.visitorId)
      .done(function(data) {
        if (data.success == true) {
          var id = data.messageId;
          if (data.message == 'back') {
            dia.options.confirmSend(id); //ios,直接隐藏
          } else {
            dia.options.confirmSend(id, 'add');
          }
          dia.msgPair[msgId] = id;
          dia.callbackFun(msgId, id);
        }
      });
    },
    callbackFun: function(msgId, id) {
      var dia = this;
      setTimeout(function() {
        if (!dia.diaList[msgId].isReceived) {
          $("[name=" + msgId + "] .msg_").html(dia.options.callbackStr);
        }
      }, 60 * 1000);
    },
    toolFun: function(type) {
      if (type) { // 开启
        this.options.openTool();
      } else { // 关闭
        this.options.closeTool();
      }
    },
    expand:function(json){
      var w = this;
      this.options = $.extend({}, this.options, json);
    }
  }
  $.dialogue = function(options) {
		var dialogue = new DIALOGUE(options);
		return dialogue;
	}
})(window, jQuery);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var ajax = __webpack_require__ (0);
/*history.js 历史纪录及离线留言*/
var HISTORY = function(options) {
		this.defaults = {
			show: true,
			visitorId: "",
			companyPk: "",
			leavePre: "离线消息:",
			maxDia: 5,
			dialogue: null,
			generation: function() {},
			checkFun: function(argument) {}
		};
		this.options = $.extend({}, this.defaults, options);
	};
HISTORY.prototype = {
	page: 1,
	historyDias: [],
	leaveDias: [],
	over: false,
	cur: 1,
	num: 0,
	more:true,
	showHistoryDia: function() {
		if (this.options.show == false) return;
		var history = this;
		var dialogue = this.options.dialogue;
		for (var i in history.historyDias) {
			if (!isNaN(Number(i))) {
				for (var p in history.historyDias[i].content["dia"]) {
					if (!isNaN(Number(i))) {
						var item = history.historyDias[i].content["dia"][p];
						if (!item.hasShown && item.num < history.cur * history.options.maxDia) {
							history.historyDias[i].content["dia"][p].hasShown = true;
							dialogue.showMsg({
								date: Number(new Date(item.time.replace(/-/g,"/")).getTime()),
								from: item.from,
								content: item.content,
								status: 1
							})
						}
					};
				}
			}
		}
	},
	showLeaveChat: function(argument) {
		var history = this;
		var dialogue = this.options.dialogue;
		for (var i in history.leaveDias) {
			if (!isNaN(Number(i))) {
				dialogue.showMsg({
					from: history.leaveDias[i].from,
					content: history.leaveDias[i].content,
					status: 1,
					date: history.leaveDias[i].date
				})
			}
		}
	},
	init: function() {
		this.options.generation();
	},
	check: function(argument) {
		if (this.getSum() < this.cur * this.options.maxDia + 1 && !this.over) {
			this.getHistoryDialogue();
			this.check();
		} else {
			this.showHistoryDia();
			this.cur++;
		}
		this.more =!this.over?true:!(this.getSum() < this.cur * this.options.maxDia + 1);
		this.options.checkFun();
	},
	changeToContent: function(content) {
		var Hi = this;
		var sum = 0;
		var dia = [];
		var dias = $("<div>" + content + "</div>").find(".sevice_chat,.me_chat,.robot_chat");
		for (var i = dias.length-1; i>=0; i--) {
			if ($(dias[i]).find(".msg_back_success").length == 0) {
				dia.push({
					from: dias[i].className == 'sevice_chat' ? "client" : dias[i].className == 'robot_chat' ? "robot" : "visitor",
					content: $(dias[i]).find("content").html(),
					hasShown: false,
					num: Hi.num,
					time:$(dias[i]).find("time").html()
				});
				Hi.num++;
				sum++;
			}
		}
		return {
			sum: sum,
			dia: dia
		};
	},
	getSum: function() {
		var Hi = this;
		var sum = 0;
		for (var i in Hi.historyDias) {
			if (!isNaN(Number(i))) {
				sum += Hi.historyDias[i].content.sum;
			}
		}
		return sum;
	},
	getHistoryDialogue: function() {
		var Hi = this;
		ajax.getHistoryDialogue(Hi.page,Hi.options.visitorId)
		.done(function(data) {
			if (!data || data.length == 0) {
				Hi.over = true;
				return;
			} else {
				for (var i in data) {
					if (!isNaN(Number(i))) {
						var content = Hi.changeToContent(data[i].content, data[i].from);
						Hi.historyDias.push({
							time: new Date(data[i].leaveTime.replace(/-/g,"/")).getTime(),
							content: content
						});
					}
				}
				Hi.page++;
			}
		}).fail(function() {
			Hi.over = true;
		})
	},
	getLeaveChat: function() {
		var Hi = this;
		ajax.getLeaveChat(Hi.options.visitorId)
		.done(function(data) {
			if (data.length == 0) {
				return;
			} else {
				data = data.reverse();
				for (var i in data) {
					if (!isNaN(Number(i))) {
						var content = data[i].content;
						if (typeof content  !== 'string') {
							try{
								content = JSON.stringify(content);
							}catch(e){
								
							}
						}
						content = dialogue.messageChange(content);
						Hi.leaveDias.push({
							content: Hi.options.leavePre + "" + content,
							from: "client"
						});
					}
				}
			}
		})
	}
}
$.history = function(options) {
  var history = new HISTORY(options);
  return history;
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var ajax = __webpack_require__ (0);
/*langTip.js 提示语*/
var LANGTIP = function(options) {
		this.defaults = {
			companyPk: "",
			defaultLangPk: "",
			langMap:{},
			show: function(data) {}
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
	init: function() {
		var langTip = this;
		if(Object.keys(langTip.options.langMap).length>0){
			langTip.langMap = langTip.options.langMap;
			return;
		}
		ajax.getLangList()
		.done(function(data) {
			if (!data) return;
			langTip.langMap = data;
		})
	},
	show: function(t, k) {
		var langTip = this;
		if (t == 1) {
			if (langTip.langMap && langTip.langMap[k]) {
				langTip.options.show(langTip.langMap[k]);
			}
		} else {
			ajax.getLangListByPk(t,k)
			.done(function(data) {
				if (!data) return;
				langTip.options.show(data);
			})
		}

	}
}
$.langTip = function(options) {
  var langTip = new LANGTIP(options);
  langTip.init();
  return langTip;
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var ajax = __webpack_require__ (0);
/*leaveMessage.js 留言*/
(function(window, $, undefined) {
  var LEAVEMESSAGE = function(options) {
      this.defaults = {
        Alert: null,
        messageDisplay: [],
        messageContent: "",
        messageTypeList: [],
        warn: '.warn',
        title: "请留言",
        bottom: "<div class='bottom'><div class='cancel'>取消</div><div class='submit'>确定</div></div>",
        generate: function(combo) {

        },
        reset: function(arg) {

        },
        warn: function(el, text) {

        }
      }, this.options = $.extend({}, this.defaults, options)
    };
  var keySort = function(arr, fn) {
      var array = arr;
      var fn = fn ||
      function(a, b) {
        return b > a;
      }
      for (var i = 1, len = array.length; i < len; i++) {
        var key = array[i];
        var j = i - 1;
        while (j >= 0 && fn(array[j], key)) {
          array[j + 1] = array[j];
          j--
        }
        array[j + 1] = key;
      }
      return array;
    };

  function keysrt(key, desc) {

    return function(a, b) {

      return desc ? ~~ (a[key] < b[key]) : ~~ (a[key] > b[key]);

    }
  };
  LEAVEMESSAGE.prototype = {
    hasCreate: false,
    init: function() {
      var LM = this;
      if (LM.options.messageDisplay.length > 0) {
        LM.options.messageDisplay = keySort(LM.options.messageDisplay, keysrt('sort', false));
        LM.createView();
        LM.hasCreate = true;
      }
    },
    check: function(displayname) {
      var LM = this;
      $(".leaveMessageView .col").removeClass('warn');
      var can = true;
      $(".leaveMessageView .col").each(function(index, el) {
        var $this = $(this);
        if (can == false) return;
        if ( !! displayname && $this.data("displayname") != displayname) return;
        if ($this.data("displayname") == "company") {
          if ($this.data("require") == 1 && $this.find("input").val() == "") {
            LM.options.warn($this, "公司名称不能为空");
            $this.addClass('warn');
            can = false;
            return;
          } else if ($this.find("input").val().length > 30) {
            LM.options.warn($this, "公司名称最大长度为30字符");
            $this.addClass('warn');
            can = false;
            return;
          }
        }
        if ($this.data("displayname") == "name") {
          if ($this.data("require") == 1 && $this.find("input").val() == "") {
            LM.options.warn($this, "姓名不能为空");
            $this.addClass('warn');
            can = false;
            return;
          } else if ($this.find("input").val().length > 20) {
            LM.options.warn($this, "姓名最大长度为20字符");
            $this.addClass('warn');
            can = false;
            return;
          }
        }
        if ($this.data("displayname") == "telephone") {
          if ($this.data("require") == 1 && $this.find("input").val() == "") {
            LM.options.warn($this, "电话不能为空");
            $this.addClass('warn');
            can = false;
            return;
          }
          if ($this.find("input").val() == "") return;
          var re = new RegExp(/^[1][0-9]{1}[0-9]{9}$/);
          if (!re.test($this.find("input").val()) ) {
            LM.options.warn($this, "请填写正确的电话");
            $this.addClass('warn');
            can = false;
            return;
          }
        }
        if ($this.data("displayname") == "email") {
          if ($this.data("require") == 1 && $this.find("input").val() == "") {
            LM.options.warn($this, "电子邮件不能为空");
            $this.addClass('warn');
            can = false;
            return;
          }
          if ($this.find("input").val() == "") return;
          var reg = new RegExp(/^[\-\._A-Za-z0-9]+@([_A-Za-z0-9\-]+\.)+[A-Za-z0-9]{2,3}$/);
          if (!reg.test($this.find("input").val())) {
            LM.options.warn($this, "请填写正确的电子邮件");
            $this.addClass('warn');
            can = false;
            return;
          } else if ($this.find("input").val().length > 50) {
            LM.options.warn($this, "电子邮件最大长度为50字符");
            $this.addClass('warn');
            can = false;
            return;
          }
        }
        if ($this.data("displayname") == "title") {
          if ($this.data("require") == 1 && $this.find("input").val() == "") {
            LM.options.warn($this, "主题不能为空");
            $this.addClass('warn');
            can = false;
            return;
          } else if ($this.find("input").val().length > 50) {
            LM.options.warn($this, "主题最大长度为50字符");
            $this.addClass('warn');
            can = false;
            return;
          }
        }
        if ($this.data("displayname") == "content") {
          if ($this.data("require") == 1 && $this.find("textarea").val() == "") {
            LM.options.warn($this, "内容不能为空");
            $this.addClass('warn');
            can = false;
            return;
          } else if ($this.find("textarea").val().length > 1000) {
            LM.options.warn($this, "内容最大长度为1000字符");
            $this.addClass('warn');
            can = false;
            return;
          }
        }
      });
      return can;
    },
    cancel: function() {
      this.hide();
    },
    createView: function() {
      var LM = this;
      if ($(".leaveMessageView").length > 0) {
        $(".leaveMessageView").remove();
      }
      var str = "<div class='leaveMessageView view'><div class='board'></div></div>";
      $("body").append(str);
      var html = "<div class='title'>" + LM.options.title + "<span class='cross'><img src='"+__webpack_require__(2)+"'></span></div>";
      html += "<div class='body'>";
      if ( !! LM.options.messageContent) {
        html += "<div class='top'>" + LM.options.messageContent + "</div>";
      }
      var colStr = "<div class='col' data-type='$0' data-require='$1' data-name='$2' data-markedwords='$3' data-displayname='$4' ></div>";
      for (var i in LM.options.messageDisplay) {
        var item = LM.options.messageDisplay[i];
        if (item.display == 1 && item.displayName == "messageTypePk") {
          html += colStr.replace(/\$0/g, item.judgeDisplay).replace(/\$1/g, item.required).replace(/\$2/g, item.name).replace(/\$3/g, item.markedWords).replace(/\$4/g, item.displayName);
        }
      }
      for (var i in LM.options.messageDisplay) {
        var item = LM.options.messageDisplay[i];
        if (item.display == 1 && item.displayName != "messageTypePk") {
          html += colStr.replace(/\$0/g, item.judgeDisplay).replace(/\$1/g, item.required).replace(/\$2/g, item.name).replace(/\$3/g, item.markedWords).replace(/\$4/g, item.displayName);
        }
      }
      html += "</div>"
      html += this.options.bottom;
      $(".leaveMessageView .board").html(html);
      this.hide();
      this.options.generate(LM.options.messageTypeList);
    },
    submit: function(json) {
      var LM = this;
      var Alert = LM.options.Alert;
      if (!LM.check()) return false;
      if(!json.messageTypePk){
        LM.options.warn($(".leaveMessageView [data-displayname='messageTypePk']"), "请选择留言分类");
        $(".leaveMessageView [data-displayname='messageTypePk']").addClass('warn');
        can = false;
        return;
      }
      ajax.saveMessageBox(json)
      .done(function(dataObj) {
        if (dataObj.success == true) {
          Alert.show(dataObj.msg);
          LM.reset();
          LM.hide();
        } else {
          Alert.show(dataObj.msg);
        }
      })
      LM.hide();
    },
    reset: function(argument) {
      this.options.reset;
    },
    show: function() {
      if (this.hasCreate) {
        $(".leaveMessageView").show();
  //				$('.leaveMessageView input,.leaveMessageView textarea').addClass("hasplaceholder");
        $(".leaveMessageView .board").css({
          marginTop: -$(".leaveMessageView .board").height() / 2,
        });
        $('.leaveMessageView input,.leaveMessageView textarea').not(".hasplaceholder").placeholder();
      }
    },
    hide: function() {
      $(".leaveMessageView").hide();
    },
    expand:function(json){
      var w = this;
      this.options = $.extend({}, this.options, json);
    }
  }
  $.leaveMessage = function(options) {
		var leaveMessage = new LEAVEMESSAGE(options);
		leaveMessage.init();
		return leaveMessage;
	}
})(window, jQuery);

/***/ }),
/* 25 */
/***/ (function(module, exports) {

/*localHistory.js 需要在生成chatId时使用*/
var HISTORY = function(options) {
		this.defaults = {
			storage: null,
			loadMore:function(array){
				
			}
		};
		this.options = $.extend({}, this.defaults, options);
	};
HISTORY.prototype = {
	current: [],
	history: [],
	time: 0,
	init: function() {
		this.current = !! this.options.storage.get("localCur") ? this.options.storage.get("localCur") : [];
		this.history = this.options.storage.get("localHis") ? this.options.storage.get("localHis") : [];
		this.time = this.options.storage.get("localTim") ? this.options.storage.get("localTim") : new Date().getTime();
		if(this.history.length>0){
			this.lastChat = this.history.length-1;
			this.lastId = this.history[this.lastChat].data.length-1;
		}
	},
	setCurrent: function(db) {
		var dia = [];
		for (var i in db) {
			if (!isNaN(Number(i))) {
				var item = db[i];
				if (item.saveIn == 0 && !item.isRevoke && item.type != "system" && item.status != 1) {
					var opName = item.type == "client"?dialogue.getAttr("operatorName"):item.type == "visitor"?userDatas.getVisitorInfo().visitorName:item.type == "robot"?"机器人":"";
					dia.push({
						from: item.type,
						content: item.content,
						time: item.time,
						opName:opName
					});
				}
			}
		}
		this.options.storage.set("localTim", this.time);
		this.options.storage.set("localCur", dia);
		this.current = dia;
	},
	saveCurrent: function() {
		if (this.current.length > 0) {
			this.history.push({
				data: this.current,
				time: this.time
			});
			this.current = [];
			this.save();
		}
	},
	save: function() {
		this.options.storage.set("localCur", this.current)
		this.options.storage.set("localHis", this.history)
		this.options.storage.set("localTim", 0)
	},
	lastId:0,
	lastChat:0,
	page:5,
	loadMore:function(){
		var array = [],i = 0,page = this.page;
		while (i<page){
			var item = this.preload(this.lastChat,this.lastId);
			if(item){
				array.push(item);
				if(item.type!="date"){
					i++;
				}
			}else{
				break;
			}
		};
		this.options.loadMore(array);
	},
	preload:function(lastChat,lastId){
		if(lastChat==-1){
			return "";
		}
		if(lastId==-1){
			this.lastChat = lastChat-1
			if(this.lastChat==-1){
				return "";
			}
			this.lastId = this.history[this.lastChat].data.length-1
			return {
				type:"date",
				time:this.history[this.lastChat].time
			};
		}
		var msg = this.history[this.lastChat].data[this.lastId];
		this.lastId = this.lastId-1;
		return msg;
	}
}
$.localHistory = function(options) {
  var history = new HISTORY(options);
  return history;
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var ajax = __webpack_require__ (0);
/*monitor.js 访客监控*/
var MONITOR = function(options) {
		this.defaults = {
			userDatas: null,
			storage: null
		}, this.options = $.extend({}, this.defaults, options)
	}
MONITOR.prototype = {
	init: function(msg) {
		var now = nowtime.getTime();
		var mo = this;
		var storage = mo.options.storage;
		var ncVisitor = !! storage.get("ncVisitor") ? storage.get("ncVisitor") : {};
		var t = mo.getTrace()
		var trace = t.result;
		var info = mo.getInfo();
		storage.set("visitorId", info.visitorId);
		storage.set("visitorName", info.visitorName);
		info = mo.changeFirstTime(info, trace);
		ncVisitor["trace"] = trace;
		ncVisitor["info"] = info;
		storage.set("ncVisitor", ncVisitor);
		var i = info;
		if (now - info.lastTime > 10 * 60 * 1000 || !t.hasVal) {
			i["trace"] = [t.item];
		} else {
			i["trace"] = [];
		}
		ajax.setVisitorMonitor(i);
	},
	changeFirstTime: function(info, trace) {
		var item = info;
		var firstTime = item.firstTime;
		var time;
		for (var i in trace) {
			if (!time || time > trace[i].firstInTime) {
				if (!time || new Date(trace[i].firstInTime).Format("yyyy-mm-dd") == nowtime.Format("yyyy-mm-dd")) {
					time = trace[i].firstInTime;
				}
			}
		}
		item.firstTime = !! time ? time : firstTime;
		if(new Date(item.firstTime).Format("yyyy-mm-dd")!=nowtime.Format("yyyy-mm-dd")){
			item.firstTime = item.lastTime;
		}
		return item;
	},
	get: function() {
		var storage = mo.options.storage;
		var route = storage.get("route");
		return route;
	},
	getInfo: function() {
		var mo = this;
		var storage = mo.options.storage;
		var userDatas = mo.options.userDatas;
		var info = userDatas.getJsonStr();
		var allTime = mo.getAllTime(info);
		info.firstTime = allTime.firstTime;
		info.lastTime = allTime.lastTime;
		info.status = "broswer";
		return info;
	},
	getAllTime: function(info) {
		var now = nowtime.getTime();
		return {
			firstTime: ( !! info && !! info.firstTime) ? info.firstTime : now,
			lastTime: now
		}
	},
	getTrace: function() {
		var now = nowtime.getTime();
		var mo = this;
		var storage = mo.options.storage;
		var ncVisitor = storage.get("ncVisitor");
		var route = !! ncVisitor ? ncVisitor.trace : null;
		var r = [];
		var item = null;
		var hasVal = false;
		//记录进入时间(第一次)去重
		if (!route) {
			item = {
				url: location.href,
				firstInTime: now,
				inTime: now,
				title: $("title").html()
			}
			r.push(item);
		} else {
			for (var i in route) {
				if ( !! route[i]) {
					var items = route[i];
					if (decodeURIComponent(items.url) == location.href) {
						hasVal = true;
						items.inTime = now;
						item = items;
					}
					r.push(items);
				}
			}
			if (!hasVal) {
				item = {
					url: location.href,
					firstInTime: now,
					inTime: now,
					title: $("title").html()
				}
				r.push(item);
			}
		}
		if (r.length > 10) {
			r = r.sort(function(a, b) {
				return a.inTime < b.inTime
			});
			r.pop();
		}
		r = r.sort(function(a, b) {
			return a.firstInTime < b.firstInTime
		});

		return {
			item: item,
			result: r,
			hasVal: hasVal
		}
	}
}
$.monitor = function(options) {
  var monitor = new MONITOR(options);
  monitor.init();
  return monitor;
}

/***/ }),
/* 27 */
/***/ (function(module, exports) {

/*msgdb.js 所有信息的记录 langTip dialogue*/
var MSGDB = function(options) {
		this.defaults = {}, this.options = $.extend({}, this.defaults, options);
	};
MSGDB.prototype = {
	allDB: {},
	id: 0,
	db: {},
	add: function(json) {
		var md = this;
		var item = {
			msgId: !! json.msgId ? json.msgId : "",
			type: json.type,
			/*type:"visitor","client","robot","system"*/
			content: json.content,
			/*内容*/
			time: !! json.date ? json.date : new Date().getTime(),
			isRevoke: json.isRevoke?json.isRevoke:false,
			/*是否已撤回*/
			hasChecked: json.hasChecked?json.hasChecked:false,
			/*是否经过超时判断*/
			status: !! json.status ? json.status : 0,
			/*是否保存到历史记录*/
			saveIn: !! json.saveIn ? json.saveIn : 0,
			/*是否是历史记录中的数据,0当前,1历史*/
			received: 0 ,/*0未读,1已读,2未读超时*/
			checkSend: 0/*0发送,1已发送,2未发送*/
			/*是否经过超时判断*/
		}
		md.db[md.id] = item;
		md.allDB[md.id] = item;
		md.id++;
	},
	clear: function() {
		var md = this;
		md.db = {};
	},
	last: function() {
		var md = this;
		var last = 0;
		for (var i in md.db) {
			if (!isNaN(Number(i)) && Number(last) <= Number(i)) {
				last = i;
			}
		}
		return last;
	},
	setKey: function(iKey, key, value) {
		var md = this;
		for (var i in md.db) {
			if (iKey == i) {
				md.db[i][key] = value;
				md.allDB[i][key] = value;
			}
		}
	},
	set: function(msgId, key, value) {
		var md = this;
		for (var i in md.db) {
			if (md.db[i].msgId == msgId) {
				md.db[i][key] = value;
				md.allDB[i][key] = value;
			}
		}
	},
	get: function(msgId) {
		var md = this;
		for (var i in md.db) {
			if (md.db[i].msgId == msgId) {
				return md.db[i];
			}
		}
		return ;
	},
	getAll: function() {
		return this.db;
	}
};
$.msgdb = function(options) {
  var msgdb = new MSGDB(options);
  return msgdb;
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

!
function(a) {
	 true ? a("object" == typeof module && module.exports ? jQuery : jQuery) : a("object" == typeof module && module.exports ? jQuery : jQuery)
}(function(a) {
	function b(b) {
		var c = {},
			d = /^jQuery\d+$/;
		return a.each(b.attributes, function(a, b) {
			b.specified && !d.test(b.name) && (c[b.name] = b.value)
		}), c
	}
	function c(b, c) {
		var d = this,
			f = a(this);
		if (d.value === f.attr(h ? "placeholder-x" : "placeholder") && f.hasClass(n.customClass)) if (d.value = "", f.removeClass(n.customClass), f.data("placeholder-password")) {
			if (f = f.hide().nextAll('input[type="password"]:first').show().attr("id", f.removeAttr("id").data("placeholder-id")), b === !0) return f[0].value = c, c;
			f.focus()
		} else d == e() && d.select()
	}
	function d(d) {
		var e, f = this,
			g = a(this),
			i = f.id;
		if (!d || "blur" !== d.type || !g.hasClass(n.customClass)) if ("" === f.value) {
			if ("password" === f.type) {
				if (!g.data("placeholder-textinput")) {
					try {
						e = g.clone().prop({
							type: "text"
						})
					} catch (j) {
						e = a("<input>").attr(a.extend(b(this), {
							type: "text"
						}))
					}
					e.removeAttr("name").data({
						"placeholder-enabled": !0,
						"placeholder-password": g,
						"placeholder-id": i
					}).bind("focus.placeholder", c), g.data({
						"placeholder-textinput": e,
						"placeholder-id": i
					}).before(e)
				}
				f.value = "", g = g.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", g.data("placeholder-id")).show()
			} else {
				var k = g.data("placeholder-password");
				k && (k[0].value = "", g.attr("id", g.data("placeholder-id")).show().nextAll('input[type="password"]:last').hide().removeAttr("id"))
			}
			g.addClass(n.customClass), g[0].value = g.attr(h ? "placeholder-x" : "placeholder")
		} else g.removeClass(n.customClass)
	}
	function e() {
		try {
			return document.activeElement
		} catch (a) {}
	}
	var f, g, h = !1,
		i = "[object OperaMini]" === Object.prototype.toString.call(window.operamini),
		j = "placeholder" in document.createElement("input") && !i && !h,
		k = "placeholder" in document.createElement("textarea") && !i && !h,
		l = a.valHooks,
		m = a.propHooks,
		n = {};
	j && k ? (g = a.fn.placeholder = function() {
		return this
	}, g.input = !0, g.textarea = !0) : (g = a.fn.placeholder = function(b) {
		var e = {
			customClass: "placeholder"
		};
		return n = a.extend({}, e, b), this.filter((j ? "textarea" : ":input") + "[" + (h ? "placeholder-x" : "placeholder") + "]").not("." + n.customClass).not(":radio, :checkbox, [type=hidden]").bind({
			"focus.placeholder": c,
			"blur.placeholder": d
		}).data("placeholder-enabled", !0).trigger("blur.placeholder")
	}, g.input = j, g.textarea = k, f = {
		get: function(b) {
			var c = a(b),
				d = c.data("placeholder-password");
			return d ? d[0].value : c.data("placeholder-enabled") && c.hasClass(n.customClass) ? "" : b.value
		},
		set: function(b, f) {
			var g, h, i = a(b);
			return "" !== f && (g = i.data("placeholder-textinput"), h = i.data("placeholder-password"), g ? (c.call(g[0], !0, f) || (b.value = f), g[0].value = f) : h && (c.call(b, !0, f) || (h[0].value = f), b.value = f)), i.data("placeholder-enabled") ? ("" === f ? (b.value = f, b != e() && d.call(b)) : (i.hasClass(n.customClass) && c.call(b), b.value = f), i) : (b.value = f, i)
		}
	}, j || (l.input = f, m.value = f), k || (l.textarea = f, m.value = f), a(function() {
		a(document).delegate("form", "submit.placeholder", function() {
			var b = a("." + n.customClass, this).each(function() {
				c.call(this, !0, "")
			});
			setTimeout(function() {
				b.each(d)
			}, 10)
		})
	}), a(window).bind("beforeunload.placeholder", function() {
		var b = !0;
		try {
			"javascript:void(0)" === document.activeElement.toString() && (b = !1)
		} catch (c) {}
		b && a("." + n.customClass).each(function() {
			this.value = ""
		})
	}))
});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var ajax = __webpack_require__ (0);
/*queue.js 队列*/
(function(window, $, undefined) {
  var QUEUE = function(options) {
      this.defaults = {
        chatID: "",
        companyPk: "",
        langPk: 0,
        message: {},
        IpStr: "",
        always: function(result) {

        },
        success: function(result) {

        },
        fail: function(result) {

        },
        leave: function() {

        },
        continueque: function() {

        }
      }, this.options = $.extend({}, this.defaults, options)
    }
  QUEUE.prototype = {
    businessId: "",
    businessName: "",
    isTimeOut: false,
    index: 1,
    start: function(businessId, businessName) {
      var que = this;
      ajax.inQueue(que.options.message,que.options.IpStr)
      .done(function(result){
        if (result) {
          if (result.success == true) {
            //que.options.always(result);
            que.options.success(result);
          } else {
            if (result.inqueue == true) {
              que.getInfo(businessId, 0, false);
              que.options.always(result);
            } else if (result.errorCode == false) {
              que.getInfo(businessId, 0, false);
            } else if (result.server == false) {
              que.options.fail(result);
            } else {
              que.options.leave(result);
            }
          }
        }
      })
      .fail(function(result) {
        que.options.fail(result);
      })
    },
    getInfo: function(businessId, index, isTimeOut) {
      var que = this;
      ajax.inQueue(que.options.message,businessId,index,isTimeOut)
      .done(function(result) {
        if (result) {
          if (result.success == true) {
            if (que.index != result.index) {
              que.index = result.index;
              que.options.always(result);
            }
            if (result.workgroupName) {
              if (result.url) {
                que.options.success(result);
              }
            } else if (result.inqueue == true) {
              setTimeout(function() {
                que.options.always(result);
                que.getInfo(businessId, result.index, false);
              }, 1000);
            } else {
              setTimeout(function() {
                que.getInfo(businessId, result.index, false)
              }, 2000);
            }
          } else {
            if (result.over == false) {
              que.isTimeOut = true;
              que.options.fail(result);
              setTimeout(function() {
                if (que.isTimeOut == true) {
                  que.getInfo(businessId, result.index, true);
                }
              }, 10000);
            } else if (result.server == false) {
              que.options.fail(result);
            } else {
              que.options.fail(result);
            }
          }
        }
      }).fail(function(result) {
        que.options.fail(result);
      })
    },
    continueque: function(companyPk, langPk, businessId) {
      var que = this;
      ajax.continueBusinessQueue(businessId)
      .done(function(result) {
        que.istimeout = false;
        que.getInfo(businessId, 0, false);
        que.options.continueque(result);
      })
    },
    expand:function(json){
      var w = this;
      this.options = $.extend({}, this.options, json);
    }
  }
  $.queueManager = function(options) {
		var queueManager = new QUEUE(options);
		return queueManager;
	}
})(window, jQuery);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var ucc = __webpack_require__ (1);
var baseUrl = ucc.baseUrl;
/*robot.js 机器人*/
var ROBOT = function(options) {
		this.defaults = {
			visitorName: "",
			ecselfList: null,
			langPk: "",
			dialogue: null,
			robotSetting: 2,
			companyPk: "",
			chatId: "",
			ywList: "ff80808150db355d0150e12f11a90388",
			confidence: 60,
			changeToNormal: function(argument) {}
		};
		this.options = $.extend({}, this.defaults, options);
	}
ROBOT.prototype = {
	isUse: true,
	choose: false,
	ncRobotTime: 0,
	nc: {
		number: 2,
		answer: "我正在学习中",
		questions: "投诉".split(";")
	},
	recored: [],
	click: false,
	check: function(text) {
		var robot = this;
		var dialogue = robot.options.dialogue;
		if (robot.options.robotSetting == 2) {
			//跳出
			robot.isUse = false;
			return false;
		}

		if ( !! text) {
			dialogue.showMsg({
				date: new Date().getTime(),
				content: text,
				from: "visitor",
				status: 0
			});
			robot.recored.push({
				date: new Date().getTime(),
				content: text,
				from: "visitor",
				status: 0
			})
		}
		var ecselfList = (robot.options.ecselfList);
		//		try{
		//			ecselfList = JSON.parse(ecselfList);
		//		}catch(e){}
		if ( !! ecselfList) {
			for (var i in ecselfList) {
				var item = ecselfList[i];
				if ( !! item.eclangPk && item.eclangPk == robot.options.langPk) {
					robot.nc = {
						number: item.number || robot.nc.number,
						answer: item.answer || robot.nc.answer,
						questions: !! item.questions ? item.questions.split(";") : ""
					}
				}
			}
		}
		if (robot.options.robotSetting == 3) {
			//小i
			robot.iRobot(text);
		} else if ((robot.options.robotSetting == 1 || robot.options.robotSetting == 4) && robot.options.ywList.indexOf(robot.options.companyPk) > -1) {
			//云问
			robot.ywRobot(text);
		} else if (robot.options.robotSetting == 4 && ecselfList) {
			//久科
			robot.ncRobot(text);
		} else if (robot.options.robotSetting == 1) {
			//旧版久科
			robot.oldNcRobot(text);
		}
		return true;
	},
	iRobot: function(text) {
		if (!text) return;
		var robot = this;
		$.ajax({
			url: "http://vdev.icontek.com:28080/queryj/x/ROOT->ucctest/" + robot.options.companyPk + new Date().getTime() + "/" + text
		}).done(function(e) {
			var result = "";
			if (e.confidence >= robot.confidence && !! e.answer) {
				result += e.answer.replace(/\+/g, " ") + "<br />";
				robot.options.dialogue.showMsg({
					date: new Date().getTime(),
					content: result,
					from: "robot"
				});
				robot.recored.push({
					date: new Date().getTime(),
					content: result,
					from: "robot"
				})
			}
			var cf = confirm("不能查找到答案，是否需要转人工服务?");
			if (cf == true) {
				robot.options.changeToNormal();
			}
		})
	},
	cf:null,
	ncRobot: function(text) {
		if (!text) return;
		var robot = this;
		var dialogue = robot.options.dialogue;
		$.ajax({
			type: "POST",
			url: baseUrl+"/echatManager.do?method=automaticResponse",
			data: {
				"companyPk": robot.options.companyPk,
				"question": text,
				"chatId": robot.options.chatId,
				"visitorName": robot.options.visitorName,
				"langPk": robot.options.langPk,
				"true": robot.click
			},
			dataType: "json"
		}).done(function(data) {
			if(!robot.isUse){
				return;
			}
			robot.click = false;
			if (data.reply == true) {
				robot.ncRobotTime = 0; //连续错才会计算
				dialogue.showMsg({
					date: new Date().getTime(),
					content: data.answer,
					from: "robot"
				});
				robot.recored.push({
					date: new Date().getTime(),
					content: data.answer,
					from: "robot"
				})
			} else {
				robot.ncRobotTime++;
				if (robot.ncRobotTime >= robot.nc.number) {
					if (robot.choose) return;
					robot.choose == true;
					if(!robot.cf){
						robot.cf = confirm("不能查找到答案，是否需要转人工服务?");
						if (robot.cf == true) {
							robot.options.changeToNormal();
							robot.choose = false;
						} else {
							robot.cf = null;
							dialogue.showMsg({
								date: new Date().getTime(),
								content: robot.nc.answer,
								from: "robot"
							});
							robot.recored.push({
								date: new Date().getTime(),
								content: robot.nc.answer,
								from: "robot"
							})
							robot.choose = false;
							robot.ncRobotTime = 0; //取消重置
						}
					}
				} else {
					var p = 0;
					for (var i in robot.nc.questions) {
						var item = robot.nc.questions[i];
						if (item == text) {
							p = 1;
							if (robot.choose) return;
							robot.choose == true;
							if(!robot.cf){
								robot.cf = confirm("不能查找到答案，是否需要转人工服务?");
								if (robot.cf == true) {
									robot.choose = false;
									robot.options.changeToNormal();
								} else {
									robot.cf = null;
									p = 0;
									robot.choose = false;
									robot.ncRobotTime = 0; //取消重置
								}
							}
						}

					}
					if (p == 0) {
						dialogue.showMsg({
							date: new Date().getTime(),
							content: robot.nc.answer,
							from: "robot"
						});
						robot.recored.push({
							date: new Date().getTime(),
							content: robot.nc.answer,
							from: "robot"
						})
					}
				}
			}
		}).fail(function() {
			if(!robot.isUse){
				return;
			}
			robot.click = false;
			robot.ncRobotTime++;
			if (robot.ncRobotTime >= robot.nc.number) {
				if (robot.choose) return;
				robot.choose == true;
				if(!robot.cf){
					robot.cf = confirm("不能查找到答案，是否需要转人工服务?");
					if (robot.cf == true) {
						robot.choose = false;
						robot.options.changeToNormal();
					} else {
						robot.cf = null;
						dialogue.showMsg({
							date: new Date().getTime(),
							content: robot.nc.answer,
							from: "robot"
						});
						robot.recored.push({
							date: new Date().getTime(),
							content: robot.nc.answer,
							from: "robot"
						})
						robot.choose = false;
						robot.ncRobotTime = 0; //取消重置
					}
				}
			} else {
				var p = 0;
				for (var i in robot.nc.questions) {
					var item = robot.nc.questions[i];
					if (item == text) {
						p = 1;
						if (robot.choose) return;
						robot.choose == true;
						if(!robot.cf){
							robot.cf = confirm("不能查找到答案，是否需要转人工服务?");
							if (robot.cf == true) {
								robot.choose = false;
								robot.options.changeToNormal();
							} else {
								robot.cf = null;
								p = 0;
								robot.choose = false;
								robot.ncRobotTime = 0; //取消重置
							}
						}
					}

				}
				if (p == 0) {
					dialogue.showMsg({
						date: new Date().getTime(),
						content: robot.nc.answer,
						from: "robot"
					});
					robot.recored.push({
						date: new Date().getTime(),
						content: robot.nc.answer,
						from: "robot"
					})
				}
			}
		})
	},
	ywRobot: function(text) {
		if (!text) return;
		var robot = this;
		var dialogue = robot.options.dialogue;
		$.ajax({
			type: "POST",
			url: baseUrl+"/echatManager.do?method=loadSelfService2",
			data: {
				"chatId": robot.options.chatId,
				"companyPk": robot.options.companyPk,
				"content": encodeURIComponent(text)
			},
			dataType: "json"
		}).done(function(data) {
			var result = "";
			if (data && data.answer != 'Artificial customer service' && data.answer != null && data.answer != "" && data.answer != undefined) {
				result = data.answer.replace(/\+/g, " ") + "<br />";
				dialogue.showMsg({
					date: new Date().getTime(),
					content: result + "<br />单击<a href='javascript:' class='robo'><span style='color: red;'>转人工</span></a>进行提问。",
					from: "robot",
					status: 0
				});
				robot.recored.push({
					date: new Date().getTime(),
					content: result + "<br />单击<a href='javascript:' class='robo'><span style='color: red;'>转人工</span></a>进行提问。",
					from: "robot"
				})
			} else {
				dialogue.showMsg({
					date: new Date().getTime(),
					content: "<div id='conId'>您好，我正在成长过程中，您的这个问题可能已经超出了我目前的知识范围。单击<a href='javascript:' class='robo'><span style='color: red;'>转人工</span></a>进行提问。</div>",
					from: "robot",
					status: 0
				});
				robot.recored.push({
					date: new Date().getTime(),
					content: "<div id='conId'>您好，我正在成长过程中，您的这个问题可能已经超出了我目前的知识范围。单击<a href='javascript:' class='robo'><span style='color: red;'>转人工</span></a>进行提问。</div>",
					from: "robot"
				})
			}
			$(".robo").click(function() {
				robot.options.changeToNormal();
			})
		})
	},
	oldNcRobot: function(text) {
		if (!text) return;
		var robot = this;
		var dialogue = robot.options.dialogue;
		var result = "";
		$.ajax({
			type: "POST",
			url: baseUrl+"/echatManager.do?method=loadSelfService",
			data: {
				"chatId": robot.options.chatId,
				"companyPk": robot.options.companyPk,
				"content": encodeURIComponent(text)
			},
			dataType: "json"
		}).done(function(rs) {
			if (rs && rs.length > 1) {
				$.each(rs, function(i) {
					result += rs[i].text.replace(/\+/g, " ") + "<br />";
				});
				dialogue.showMsg({
					msgid: "",
					date: new Date().getTime(),
					content: result,
					from: "client",
					status: 0
				});
			} else if (rs && rs.length == 1) {
				result += "<div>" + rs[0].text.replace(/\+/g, " ") + "</div>";
				dialogue.showMsg({
					msgid: "",
					date: new Date().getTime(),
					content: result,
					from: "client",
					status: 0
				});
			} else {
				var cf = confirm("不能查找到答案，是否需要转人工服务?");
				if (cf == true) {
					robot.options.changeToNormal();
				} else {
					robot.ncRobotTime = 0; //取消重置
				}
			}
		})
	}
}
$.robot = function(options) {
  var robot = new ROBOT(options);
  robot.recored = [];
  return robot;
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var ajax = __webpack_require__ (0);
/*satisfaction.js 满意度*/
(function(window, $, undefined) {
  var SATISFACTION = function(options) {
      this.defaults = {
        dialogue: null,
        companyPk: "",
        langPk: "",
        chatId: "",
        title: "满意度调查",
        top: "您对本次服务满意吗？",
        bottom: "<div class='bottom'><div class='cancel'>取消</div><div class='submit'>确定</div></div>",
        generate: function() {}
      }, this.options = $.extend({}, this.defaults, options)
    }
  SATISFACTION.prototype = {
    hasSat: false,
    init: function() {
      var sat = this;
      ajax.getSatisfaction(this.options.chatId)
      .done(function(result) {
        if ( !! result) {
          sat.hasSat = true;
          sat.createView(result);
        }
      });
    },
    check: function(arg) {

    },
    cancel: function() {
      this.options.dialogue.sendMessage("访客取消了满意度评价", "cancelSatisfaction");
      this.hide();
    },
    createView: function(result) {
      if ($(".satisfactionView").length > 0) {
        $(".satisfactionView").remove();
      }
      var str = "<div class='satisfactionView view'><div class='board'></div></div>";
      var firstStr = "<div class='fr' data-pk='$1' data-parent='$2' data-name='$3'></div>";
      var secondStr = "<div class='sr' data-pk='$1' data-parent='$2' data-name='$3'></div>";

      $("body").append(str);
      var html = "<div class='title'>" + this.options.title + "<span class='cross'><img src='"+__webpack_require__(2)+"'></span></div>";
      html += "<div class='body'><div class='top'>" + this.options.top + "</div>";
      for (var i = 0, len = result.length; i < len; i++) {
        var firstRank = result[i] //第一级
        html += firstStr.replace(/\$1/g, firstRank.pk).replace(/\$2/g, firstRank.parentPk).replace(/\$3/g, firstRank.name);
        if (firstRank.children.length > 0) {
          for (var s = 0, slen = firstRank.children.length; s < slen; s++) {
            var secondRank = firstRank.children[s]; //第二级
            html += secondStr.replace(/\$1/g, secondRank.pk).replace(/\$2/g, secondRank.parentPk).replace(/\$3/g, secondRank.name);
          }
        }
      }
      html += "<div class='mome'><textarea placeholder='请输入详情'></textarea></div></div>"
      html += this.options.bottom;
      $(".satisfactionView .board").html(html);
      this.hide();
      this.options.generate();
    },
    getElement: function(pk) {
      return $(".satisfactionView .board [data-pk='" + pk + "']");
    },
    getElementByParent: function(pk) {
      return $(".satisfactionView .board [data-parent='" + pk + "']");
    },
    submit: function(json) {
      //json{satisfactionPk,optionPk,satisfactionMemo,nextSatisfactionPk}
      var sat = this;
      var dialogue = this.options.dialogue;
      ajax.saveSatisfaction(sat.options.chatId,json)
      .done(function() {
        var reply = sat.getElement(json.optionPk).attr("data-name");
        var reasonStr = "，原因为：";
        var reason = "";
        if ( !! json.nextSatisfactionPk) {
          var reasons = json.nextSatisfactionPk.split(",");
          for (var i in reasons) {
            if ( !! reasons[i] && !! sat.getElement(reasons[i]).attr("data-name")) {
              reason += sat.getElement(reasons[i]).attr("data-name") + ",";
            }
          }
        }
        if (reason.lastIndexOf(",") == reason.length - 1) {
          reason = reason.substring(0, reason.length - 1);
        }
        if ( !! reason) {
          reason = reasonStr + reason;
        }
        var message = "访客给您的满意度评价是：" + reply + reason;
        dialogue.sendMessage(message, "", true);
        dialogue.showSysMsg("您给客服" + dialogue.getAttr("operatorName") + "的评价：" + reply + reason)
      })
      this.hide();
    },
    show: function() {
      if (this.hasSat) {
        $(".satisfactionView").show();
  //				$('.satisfactionView input,.satisfactionView textarea').addClass("hasplaceholder");
        $(".satisfactionView .board").css({
          marginTop: "-220px",
        });
        $(".satisfactionView textarea").focus().blur();
        $('.satisfactionView input,.satisfactionView textarea').not(".hasplaceholder").placeholder();
      }
    },
    hide: function() {
      $(".satisfactionView").hide();
    },
    expand:function(json){
      var w = this;
      this.options = $.extend({}, this.options, json);
    }
  }
  $.satisfaction = function(options) {
		var satisfaction = new SATISFACTION(options);
		return satisfaction;
	}
})(window, jQuery);

/***/ }),
/* 32 */
/***/ (function(module, exports) {

/*sensitive.js 敏感词过滤*/
;
(function(window, $, undefined) {
	var SENSITIVE = function(options) {
			this.defaults = {
				vocabulary: {}
			}, this.options = $.extend({}, this.defaults, options)
		}
	SENSITIVE.prototype = {
		get: function(msg) {
			var word = msg;
			var vocabulary = this.options.vocabulary;
			if ( !! vocabulary && !! vocabulary.content) {
				if (vocabulary.isVisable == 1) {
					var aTxtContent = vocabulary.content.split(":");
					for (var i = 0; i < aTxtContent.length; i++) {
						if ( !! aTxtContent[i]) {
							for (var a = 0; a <= word.length; a++) {
								word = word.replace(aTxtContent[i], "*");
							}
						}
					}
				}
			}
			return word;
		}
	}
	$.sensitive = function(options) {
		var sensitive = new SENSITIVE(options);
		return sensitive;
	}
})(window, jQuery);

/***/ }),
/* 33 */
/***/ (function(module, exports) {

;
(function(window, $, undefined) {
	var pictureRatio = 0,
		screenRatio = 0;
	var SHOWBIGIMG = function(options) {
			this.defaults = {
				picStr: "<img id='showpic' src='$1'/>",
				bgColor: 'rgba(0,0,0,0.5)'
			}, this.options = $.extend({}, this.defaults, options)
		}
	SHOWBIGIMG.prototype = {
		init: function() {
			var picItem = this;
			picItem.getScreenRatio();
			if ($(".showPicture").length > 0) {
				return;
			} else {
				$("body").append('<div class="showPicture"></div>');
				$(".showPicture").css({
					position: 'fixed',
					top: '0',
					bottom: '0',
					left: '0',
					right: '0',
					background: picItem.options.bgColor,
					display: 'none',
					zIndex: '1001'
				});
			}
		},
		showPic: function(imgUrl) {
			var picItem = this;
			picItem.init();
			$('.showPicture').html("").append(this.options.picStr.replace(/\$1/g, imgUrl));
			$(".showPicture").show();
			var showpic = document.getElementById('showpic');
			if (showpic.complete) {
				pictureRatio = $(".showPicture img").width() / $(".showPicture img").height();
				picItem.getShowPic();
			} else {
				showpic.onload = function() {
					pictureRatio = $(".showPicture img").width() / $(".showPicture img").height();
					picItem.getShowPic();
				}
			}
			$(".showPicture").unbind().on('click', function(event) {
				$(".showPicture").hide();
			});
		},
		getShowPic: function() {
			if ( !! screenRatio && !! pictureRatio) {
				if (screenRatio > pictureRatio) {
					if ($(".showPicture img").height() >= $(window).height()) {
						$(".showPicture img").css({
							width: 'auto',
							height: '98%',
							padding:" 1% 0",
							display: 'block',
							margin: '0 auto',
							position: 'initial',
							top: '0'
						});
					} else {
						$(".showPicture img").css({
							display: 'block',
							margin: '0 auto',
							position: 'relative',
							top: ($(window).height() - $(".showPicture img").height()) / 2 + 'px'
						});
					}
				} else {
					if ($(".showPicture img").width() >= $(window).width()) {
						$(".showPicture img").css({
							display: 'initial',
							width: '98%',
							padding:"0 1%",
							height: 'auto',
							position: 'fixed',
							top: '50%'
						});
						$(".showPicture img").css({
							marginTop: -$(".showPicture img").height() / 2,
						});
					} else {
						$(".showPicture img").css({
							display: 'initial',
							left: '50%',
							position: 'fixed',
							top: '50%',
							padding:"1% 1%",
						});
						$(".showPicture img").css({
							marginTop: -$(".showPicture img").height() / 2,
							marginLeft: -$(".showPicture img").width() / 2
						});
					}
				}
			}
		},
		getScreenRatio: function() {
			screenRatio = ($(window).width()) / ($(window).height());
		}
	}
	$.showBigImg = function(options) {
		var showBigImg = new SHOWBIGIMG(options);
		showBigImg.init();
		return showBigImg;
	}
})(window, jQuery);

/***/ }),
/* 34 */
/***/ (function(module, exports) {

/*storage.js 缓存机制*/
;
(function(window, $, undefined) {
	var ls;
	var STORAGE = function(options) {
		this.defaults = {
			companyPk:"",
		}, this.options = $.extend({}, this.defaults, options)
	};
	STORAGE.prototype = {
		init: function() {
			if (window.localStorage) {
				ls = window.localStorage;
			} else {
				ls = window.Storage;
			}
			this.setVersion();
		},
		setVersion: function() {
			var l = this;
			var version = l.get("version");
			//保留jsonStr,visitor,localHis
			var jsonStr = l.get("jsonStr");
			var visitor = l.get("visitor");
			var localhis = l.get("localHis");
			if (!version || version != "8.0.1") {
				ls.clear();
				if (jsonStr) l.set("jsonStr", jsonStr);
				if (visitor) l.set("visitor", visitor);
				if (localhis) l.set("localHis", localhis);
				l.set("version", "8.0.1");
			}
		},
		get: function(key) {
			var value = null;
			if(key!="version"){
				key = "c"+this.options.companyPk+"-"+key;
			}
			if (ls) {
				value = ls[key];
				if (value) {
					value = decodeURIComponent(ls[key]);
				}
			} else if ($.cookie) {
				value = decodeURIComponent($.cookie(key));
			}
			try {
				value = JSON.parse(value)
			} catch (e) {}
			return value
		},
		set: function(key, value) {
			if(key!="version"){
				key = "c"+this.options.companyPk+"-"+key;
			}
			if (ls) {
				if (typeof(value) == "object") {
					value = JSON.stringify(value);
				}
				ls[key] = encodeURIComponent(value);
			} else if ($.cookie) {
				$.cookie(key, encodeURIComponent(value));
			}
		},
		clear: function(key) {
			if(key!="version"){
				key = "c"+this.options.companyPk+"-"+key;
			}
			if (ls) {
				ls.removeItem(key)
			}
		}
	}
	$.storage = function(options) {
		var storage = new STORAGE(options);
		storage.init();
		return storage;
	}
})(window, jQuery);

/***/ }),
/* 35 */
/***/ (function(module, exports) {

/*jquery.form.js*/
(function(factory) {
	"use strict";
	factory(jQuery)
}(function($) {
	"use strict";
	var feature = {};
	feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
	feature.formdata = window.FormData !== undefined;
	var hasProp = !! $.fn.prop;
	$.fn.attr2 = function() {
		if (!hasProp) {
			return this.attr.apply(this, arguments)
		}
		var val = this.prop.apply(this, arguments);
		if ((val && val.jquery) || typeof val === 'string') {
			return val
		}
		return this.attr.apply(this, arguments)
	};
	$.fn.ajaxSubmit = function(options) {
		if (!this.length) {
			log('ajaxSubmit: skipping submit process - no element selected');
			return this
		}
		var method, action, url, $form = this;
		if (typeof options == 'function') {
			options = {
				success: options
			}
		} else if (options === undefined) {
			options = {}
		}
		method = options.type || this.attr2('method');
		action = options.url || this.attr2('action');
		url = (typeof action === 'string') ? $.trim(action) : '';
		url = url || window.location.href || '';
		if (url) {
			url = (url.match(/^([^#]+)/) || [])[1]
		}
		options = $.extend(true, {
			url: url,
			success: $.ajaxSettings.success,
			type: method || $.ajaxSettings.type,
			iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
		}, options);
		var veto = {};
		this.trigger('form-pre-serialize', [this, options, veto]);
		if (veto.veto) {
			log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
			return this
		}
		if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
			log('ajaxSubmit: submit aborted via beforeSerialize callback');
			return this
		}
		var traditional = options.traditional;
		if (traditional === undefined) {
			traditional = $.ajaxSettings.traditional
		}
		var elements = [];
		var qx, a = this.formToArray(options.semantic, elements);
		if (options.data) {
			options.extraData = options.data;
			qx = $.param(options.data, traditional)
		}
		if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
			log('ajaxSubmit: submit aborted via beforeSubmit callback');
			return this
		}
		this.trigger('form-submit-validate', [a, this, options, veto]);
		if (veto.veto) {
			log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
			return this
		}
		var q = $.param(a, traditional);
		if (qx) {
			q = (q ? (q + '&' + qx) : qx)
		}
		if (options.type.toUpperCase() == 'GET') {
			options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
			options.data = null
		} else {
			options.data = q
		}
		var callbacks = [];
		if (options.resetForm) {
			callbacks.push(function() {
				$form.resetForm()
			})
		}
		if (options.clearForm) {
			callbacks.push(function() {
				$form.clearForm(options.includeHidden)
			})
		}
		if (!options.dataType && options.target) {
			var oldSuccess = options.success ||
			function() {};
			callbacks.push(function(data) {
				var fn = options.replaceTarget ? 'replaceWith' : 'html';
				$(options.target)[fn](data).each(oldSuccess, arguments)
			})
		} else if (options.success) {
			callbacks.push(options.success)
		}
		options.success = function(data, status, xhr) {
			var context = options.context || this;
			for (var i = 0, max = callbacks.length; i < max; i++) {
				callbacks[i].apply(context, [data, status, xhr || $form, $form])
			}
		};
		if (options.error) {
			var oldError = options.error;
			options.error = function(xhr, status, error) {
				var context = options.context || this;
				oldError.apply(context, [xhr, status, error, $form])
			}
		}
		if (options.complete) {
			var oldComplete = options.complete;
			options.complete = function(xhr, status) {
				var context = options.context || this;
				oldComplete.apply(context, [xhr, status, $form])
			}
		}
		var fileInputs = $('input[type=file]:enabled', this).filter(function() {
			return $(this).val() !== ''
		});
		var hasFileInputs = fileInputs.length > 0;
		var mp = 'multipart/form-data';
		var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);
		var fileAPI = feature.fileapi && feature.formdata;
		log("fileAPI :" + fileAPI);
		var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;
		var jqxhr;
		if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
			if (options.closeKeepAlive) {
				$.get(options.closeKeepAlive, function() {
					jqxhr = fileUploadIframe(a)
				})
			} else {
				jqxhr = fileUploadIframe(a)
			}
		} else if ((hasFileInputs || multipart) && fileAPI) {
			jqxhr = fileUploadXhr(a)
		} else {
			jqxhr = $.ajax(options)
		}
		$form.removeData('jqxhr').data('jqxhr', jqxhr);
		for (var k = 0; k < elements.length; k++) {
			elements[k] = null
		}
		this.trigger('form-submit-notify', [this, options]);
		return this;

		function deepSerialize(extraData) {
			var serialized = $.param(extraData, options.traditional).split('&');
			var len = serialized.length;
			var result = [];
			var i, part;
			for (i = 0; i < len; i++) {
				serialized[i] = serialized[i].replace(/\+/g, ' ');
				part = serialized[i].split('=');
				result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])])
			}
			return result
		}
		function fileUploadXhr(a) {
			var formdata = new FormData();
			for (var i = 0; i < a.length; i++) {
				formdata.append(a[i].name, a[i].value)
			}
			if (options.extraData) {
				var serializedData = deepSerialize(options.extraData);
				for (i = 0; i < serializedData.length; i++) {
					if (serializedData[i]) {
						formdata.append(serializedData[i][0], serializedData[i][1])
					}
				}
			}
			options.data = null;
			var s = $.extend(true, {}, $.ajaxSettings, options, {
				contentType: false,
				processData: false,
				cache: false,
				type: method || 'POST'
			});
			if (options.uploadProgress) {
				s.xhr = function() {
					var xhr = $.ajaxSettings.xhr();
					if (xhr.upload) {
						xhr.upload.addEventListener('progress', function(event) {
							var percent = 0;
							var position = event.loaded || event.position;
							var total = event.total;
							if (event.lengthComputable) {
								percent = Math.ceil(position / total * 100)
							}
							options.uploadProgress(event, position, total, percent)
						}, false)
					}
					return xhr
				}
			}
			s.data = null;
			var beforeSend = s.beforeSend;
			s.beforeSend = function(xhr, o) {
				if (options.formData) {
					o.data = options.formData
				} else {
					o.data = formdata
				}
				if (beforeSend) {
					beforeSend.call(this, xhr, o)
				}
			};
			return $.ajax(s)
		}
		function fileUploadIframe(a) {
			var form = $form[0],
				el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
			var deferred = $.Deferred();
			deferred.abort = function(status) {
				xhr.abort(status)
			};
			if (a) {
				for (i = 0; i < elements.length; i++) {
					el = $(elements[i]);
					if (hasProp) {
						el.prop('disabled', false)
					} else {
						el.removeAttr('disabled')
					}
				}
			}
			s = $.extend(true, {}, $.ajaxSettings, options);
			s.context = s.context || s;
			id = 'jqFormIO' + (new Date().getTime());
			if (s.iframeTarget) {
				$io = $(s.iframeTarget);
				n = $io.attr2('name');
				if (!n) {
					$io.attr2('name', id)
				} else {
					id = n
				}
			} else {
				$io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
				$io.css({
					position: 'absolute',
					top: '-1000px',
					left: '-1000px'
				})
			}
			io = $io[0];
			xhr = {
				aborted: 0,
				responseText: null,
				responseXML: null,
				status: 0,
				statusText: 'n/a',
				getAllResponseHeaders: function() {},
				getResponseHeader: function() {},
				setRequestHeader: function() {},
				abort: function(status) {
					var e = (status === 'timeout' ? 'timeout' : 'aborted');
					log('aborting upload... ' + e);
					this.aborted = 1;
					try {
						if (io.contentWindow.document.execCommand) {
							io.contentWindow.document.execCommand('Stop')
						}
					} catch (ignore) {}
					$io.attr('src', s.iframeSrc);
					xhr.error = e;
					if (s.error) {
						s.error.call(s.context, xhr, e, status)
					}
					if (g) {
						$.event.trigger("ajaxError", [xhr, s, e])
					}
					if (s.complete) {
						s.complete.call(s.context, xhr, e)
					}
				}
			};
			g = s.global;
			if (g && 0 === $.active++) {
				$.event.trigger("ajaxStart")
			}
			if (g) {
				$.event.trigger("ajaxSend", [xhr, s])
			}
			if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
				if (s.global) {
					$.active--
				}
				deferred.reject();
				return deferred
			}
			if (xhr.aborted) {
				deferred.reject();
				return deferred
			}
			sub = form.clk;
			if (sub) {
				n = sub.name;
				if (n && !sub.disabled) {
					s.extraData = s.extraData || {};
					s.extraData[n] = sub.value;
					if (sub.type == "image") {
						s.extraData[n + '.x'] = form.clk_x;
						s.extraData[n + '.y'] = form.clk_y
					}
				}
			}
			var CLIENT_TIMEOUT_ABORT = 1;
			var SERVER_ABORT = 2;

			function getDoc(frame) {
				var doc = null;
				try {
					if (frame.contentWindow) {
						doc = frame.contentWindow.document
					}
				} catch (err) {
					log('cannot get iframe.contentWindow document: ' + err)
				}
				if (doc) {
					return doc
				}
				try {
					doc = frame.contentDocument ? frame.contentDocument : frame.document
				} catch (err) {
					log('cannot get iframe.contentDocument: ' + err);
					doc = frame.document
				}
				return doc
			}
			var csrf_token = $('meta[name=csrf-token]').attr('content');
			var csrf_param = $('meta[name=csrf-param]').attr('content');
			if (csrf_param && csrf_token) {
				s.extraData = s.extraData || {};
				s.extraData[csrf_param] = csrf_token
			}
			function doSubmit() {
				var t = $form.attr2('target'),
					a = $form.attr2('action'),
					mp = 'multipart/form-data',
					et = $form.attr('enctype') || $form.attr('encoding') || mp;
				form.setAttribute('target', id);
				if (!method || /post/i.test(method)) {
					form.setAttribute('method', 'POST')
				}
				if (a != s.url) {
					form.setAttribute('action', s.url)
				}
				if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
					$form.attr({
						encoding: 'multipart/form-data',
						enctype: 'multipart/form-data'
					})
				}
				if (s.timeout) {
					timeoutHandle = setTimeout(function() {
						timedOut = true;
						cb(CLIENT_TIMEOUT_ABORT)
					}, s.timeout)
				}
				function checkState() {
					try {
						var state = getDoc(io).readyState;
						log('state = ' + state);
						if (state && state.toLowerCase() == 'uninitialized') {
							setTimeout(checkState, 50)
						}
					} catch (e) {
						log('Server abort: ', e, ' (', e.name, ')');
						cb(SERVER_ABORT);
						if (timeoutHandle) {
							clearTimeout(timeoutHandle)
						}
						timeoutHandle = undefined
					}
				}
				var extraInputs = [];
				try {
					if (s.extraData) {
						for (var n in s.extraData) {
							if (s.extraData.hasOwnProperty(n)) {
								if ($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
									extraInputs.push($('<input type="hidden" name="' + s.extraData[n].name + '">').val(s.extraData[n].value).appendTo(form)[0])
								} else {
									extraInputs.push($('<input type="hidden" name="' + n + '">').val(s.extraData[n]).appendTo(form)[0])
								}
							}
						}
					}
					if (!s.iframeTarget) {
						$io.appendTo('body')
					}
					if (io.attachEvent) {
						io.attachEvent('onload', cb)
					} else {
						io.addEventListener('load', cb, false)
					}
					setTimeout(checkState, 15);
					try {
						form.submit()
					} catch (err) {
						var submitFn = document.createElement('form').submit;
						submitFn.apply(form)
					}
				} finally {
					form.setAttribute('action', a);
					form.setAttribute('enctype', et);
					if (t) {
						form.setAttribute('target', t)
					} else {
						$form.removeAttr('target')
					}
					$(extraInputs).remove()
				}
			}
			if (s.forceSync) {
				doSubmit()
			} else {
				setTimeout(doSubmit, 10)
			}
			var data, doc, domCheckCount = 50,
				callbackProcessed;

			function cb(e) {
				if (xhr.aborted || callbackProcessed) {
					return
				}
				doc = getDoc(io);
				if (!doc) {
					log('cannot access response document');
					e = SERVER_ABORT
				}
				if (e === CLIENT_TIMEOUT_ABORT && xhr) {
					xhr.abort('timeout');
					deferred.reject(xhr, 'timeout');
					return
				} else if (e == SERVER_ABORT && xhr) {
					xhr.abort('server abort');
					deferred.reject(xhr, 'error', 'server abort');
					return
				}
				if (!doc || doc.location.href == s.iframeSrc) {
					if (!timedOut) {
						return
					}
				}
				if (io.detachEvent) {
					io.detachEvent('onload', cb)
				} else {
					io.removeEventListener('load', cb, false)
				}
				var status = 'success',
					errMsg;
				try {
					if (timedOut) {
						throw 'timeout';
					}
					var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
					log('isXml=' + isXml);
					if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
						if (--domCheckCount) {
							log('requeing onLoad callback, DOM not available');
							setTimeout(cb, 250);
							return
						}
					}
					var docRoot = doc.body ? doc.body : doc.documentElement;
					xhr.responseText = docRoot ? docRoot.innerHTML : null;
					xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
					if (isXml) {
						s.dataType = 'xml'
					}
					xhr.getResponseHeader = function(header) {
						var headers = {
							'content-type': s.dataType
						};
						return headers[header.toLowerCase()]
					};
					if (docRoot) {
						xhr.status = Number(docRoot.getAttribute('status')) || xhr.status;
						xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText
					}
					var dt = (s.dataType || '').toLowerCase();
					var scr = /(json|script|text)/.test(dt);
					if (scr || s.textarea) {
						var ta = doc.getElementsByTagName('textarea')[0];
						if (ta) {
							xhr.responseText = ta.value;
							xhr.status = Number(ta.getAttribute('status')) || xhr.status;
							xhr.statusText = ta.getAttribute('statusText') || xhr.statusText
						} else if (scr) {
							var pre = doc.getElementsByTagName('pre')[0];
							var b = doc.getElementsByTagName('body')[0];
							if (pre) {
								xhr.responseText = pre.textContent ? pre.textContent : pre.innerText
							} else if (b) {
								xhr.responseText = b.textContent ? b.textContent : b.innerText
							}
						}
					} else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
						xhr.responseXML = toXml(xhr.responseText)
					}
					try {
						data = httpData(xhr, dt, s)
					} catch (err) {
						status = 'parsererror';
						xhr.error = errMsg = (err || status)
					}
				} catch (err) {
					log('error caught: ', err);
					status = 'error';
					xhr.error = errMsg = (err || status)
				}
				if (xhr.aborted) {
					log('upload aborted');
					status = null
				}
				if (xhr.status) {
					status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error'
				}
				if (status === 'success') {
					if (s.success) {
						s.success.call(s.context, data, 'success', xhr)
					}
					deferred.resolve(xhr.responseText, 'success', xhr);
					if (g) {
						$.event.trigger("ajaxSuccess", [xhr, s])
					}
				} else if (status) {
					if (errMsg === undefined) {
						errMsg = xhr.statusText
					}
					if (s.error) {
						s.error.call(s.context, xhr, status, errMsg)
					}
					deferred.reject(xhr, 'error', errMsg);
					if (g) {
						$.event.trigger("ajaxError", [xhr, s, errMsg])
					}
				}
				if (g) {
					$.event.trigger("ajaxComplete", [xhr, s])
				}
				if (g && !--$.active) {
					$.event.trigger("ajaxStop")
				}
				if (s.complete) {
					s.complete.call(s.context, xhr, status)
				}
				callbackProcessed = true;
				if (s.timeout) {
					clearTimeout(timeoutHandle)
				}
				setTimeout(function() {
					if (!s.iframeTarget) {
						$io.remove()
					} else {
						$io.attr('src', s.iframeSrc)
					}
					xhr.responseXML = null
				}, 100)
			}
			var toXml = $.parseXML ||
			function(s, doc) {
				if (window.ActiveXObject) {
					doc = new ActiveXObject('Microsoft.XMLDOM');
					doc.async = 'false';
					doc.loadXML(s)
				} else {
					doc = (new DOMParser()).parseFromString(s, 'text/xml')
				}
				return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null
			};
			var parseJSON = $.parseJSON ||
			function(s) {
				return window['eval']('(' + s + ')')
			};
			var httpData = function(xhr, type, s) {
					var ct = xhr.getResponseHeader('content-type') || '',
						xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
						data = xml ? xhr.responseXML : xhr.responseText;
					if (xml && data.documentElement.nodeName === 'parsererror') {
						if ($.error) {
							$.error('parsererror')
						}
					}
					if (s && s.dataFilter) {
						data = s.dataFilter(data, type)
					}
					if (typeof data === 'string') {
						if (type === 'json' || !type && ct.indexOf('json') >= 0) {
							data = parseJSON(data)
						} else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
							$.globalEval(data)
						}
					}
					return data
				};
			return deferred
		}
	};
	$.fn.ajaxForm = function(options) {
		options = options || {};
		options.delegation = options.delegation && $.isFunction($.fn.on);
		if (!options.delegation && this.length === 0) {
			var o = {
				s: this.selector,
				c: this.context
			};
			if (!$.isReady && o.s) {
				log('DOM not ready, queuing ajaxForm');
				$(function() {
					$(o.s, o.c).ajaxForm(options)
				});
				return this
			}
			log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
			return this
		}
		if (options.delegation) {
			$(document).off('submit.form-plugin', this.selector, doAjaxSubmit).off('click.form-plugin', this.selector, captureSubmittingElement).on('submit.form-plugin', this.selector, options, doAjaxSubmit).on('click.form-plugin', this.selector, options, captureSubmittingElement);
			return this
		}
		return this.ajaxFormUnbind().bind('submit.form-plugin', options, doAjaxSubmit).bind('click.form-plugin', options, captureSubmittingElement)
	};

	function doAjaxSubmit(e) {
		var options = e.data;
		if (!e.isDefaultPrevented()) {
			e.preventDefault();
			$(e.target).ajaxSubmit(options)
		}
	}
	function captureSubmittingElement(e) {
		var target = e.target;
		var $el = $(target);
		if (!($el.is("[type=submit],[type=image]"))) {
			var t = $el.closest('[type=submit]');
			if (t.length === 0) {
				return
			}
			target = t[0]
		}
		var form = this;
		form.clk = target;
		if (target.type == 'image') {
			if (e.offsetX !== undefined) {
				form.clk_x = e.offsetX;
				form.clk_y = e.offsetY
			} else if (typeof $.fn.offset == 'function') {
				var offset = $el.offset();
				form.clk_x = e.pageX - offset.left;
				form.clk_y = e.pageY - offset.top
			} else {
				form.clk_x = e.pageX - target.offsetLeft;
				form.clk_y = e.pageY - target.offsetTop
			}
		}
		setTimeout(function() {
			form.clk = form.clk_x = form.clk_y = null
		}, 100)
	}
	$.fn.ajaxFormUnbind = function() {
		return this.unbind('submit.form-plugin click.form-plugin')
	};
	$.fn.formToArray = function(semantic, elements) {
		var a = [];
		if (this.length === 0) {
			return a
		}
		var form = this[0];
		var formId = this.attr('id');
		var els = semantic ? form.getElementsByTagName('*') : form.elements;
		var els2;
		if (els && !/MSIE [678]/.test(navigator.userAgent)) {
			els = $(els).get()
		}
		if (formId) {
			els2 = $(':input[form="' + formId + '"]').get();
			if (els2.length) {
				els = (els || []).concat(els2)
			}
		}
		if (!els || !els.length) {
			return a
		}
		var i, j, n, v, el, max, jmax;
		for (i = 0, max = els.length; i < max; i++) {
			el = els[i];
			n = el.name;
			if (!n || el.disabled) {
				continue
			}
			if (semantic && form.clk && el.type == "image") {
				if (form.clk == el) {
					a.push({
						name: n,
						value: $(el).val(),
						type: el.type
					});
					a.push({
						name: n + '.x',
						value: form.clk_x
					}, {
						name: n + '.y',
						value: form.clk_y
					})
				}
				continue
			}
			v = $.fieldValue(el, true);
			if (v && v.constructor == Array) {
				if (elements) {
					elements.push(el)
				}
				for (j = 0, jmax = v.length; j < jmax; j++) {
					a.push({
						name: n,
						value: v[j]
					})
				}
			} else if (feature.fileapi && el.type == 'file') {
				if (elements) {
					elements.push(el)
				}
				var files = el.files;
				if (files.length) {
					for (j = 0; j < files.length; j++) {
						a.push({
							name: n,
							value: files[j],
							type: el.type
						})
					}
				} else {
					a.push({
						name: n,
						value: '',
						type: el.type
					})
				}
			} else if (v !== null && typeof v != 'undefined') {
				if (elements) {
					elements.push(el)
				}
				a.push({
					name: n,
					value: v,
					type: el.type,
					required: el.required
				})
			}
		}
		if (!semantic && form.clk) {
			var $input = $(form.clk),
				input = $input[0];
			n = input.name;
			if (n && !input.disabled && input.type == 'image') {
				a.push({
					name: n,
					value: $input.val()
				});
				a.push({
					name: n + '.x',
					value: form.clk_x
				}, {
					name: n + '.y',
					value: form.clk_y
				})
			}
		}
		return a
	};
	$.fn.formSerialize = function(semantic) {
		return $.param(this.formToArray(semantic))
	};
	$.fn.fieldSerialize = function(successful) {
		var a = [];
		this.each(function() {
			var n = this.name;
			if (!n) {
				return
			}
			var v = $.fieldValue(this, successful);
			if (v && v.constructor == Array) {
				for (var i = 0, max = v.length; i < max; i++) {
					a.push({
						name: n,
						value: v[i]
					})
				}
			} else if (v !== null && typeof v != 'undefined') {
				a.push({
					name: this.name,
					value: v
				})
			}
		});
		return $.param(a)
	};
	$.fn.fieldValue = function(successful) {
		for (var val = [], i = 0, max = this.length; i < max; i++) {
			var el = this[i];
			var v = $.fieldValue(el, successful);
			if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
				continue
			}
			if (v.constructor == Array) {
				$.merge(val, v)
			} else {
				val.push(v)
			}
		}
		return val
	};
	$.fieldValue = function(el, successful) {
		var n = el.name,
			t = el.type,
			tag = el.tagName.toLowerCase();
		if (successful === undefined) {
			successful = true
		}
		if (successful && (!n || el.disabled || t == 'reset' || t == 'button' || (t == 'checkbox' || t == 'radio') && !el.checked || (t == 'submit' || t == 'image') && el.form && el.form.clk != el || tag == 'select' && el.selectedIndex == -1)) {
			return null
		}
		if (tag == 'select') {
			var index = el.selectedIndex;
			if (index < 0) {
				return null
			}
			var a = [],
				ops = el.options;
			var one = (t == 'select-one');
			var max = (one ? index + 1 : ops.length);
			for (var i = (one ? index : 0); i < max; i++) {
				var op = ops[i];
				if (op.selected) {
					var v = op.value;
					if (!v) {
						v = (op.attributes && op.attributes.value && !(op.attributes.value.specified)) ? op.text : op.value
					}
					if (one) {
						return v
					}
					a.push(v)
				}
			}
			return a
		}
		return $(el).val()
	};
	$.fn.clearForm = function(includeHidden) {
		return this.each(function() {
			$('input,select,textarea', this).clearFields(includeHidden)
		})
	};
	$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
		var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
		return this.each(function() {
			var t = this.type,
				tag = this.tagName.toLowerCase();
			if (re.test(t) || tag == 'textarea') {
				this.value = ''
			} else if (t == 'checkbox' || t == 'radio') {
				this.checked = false
			} else if (tag == 'select') {
				this.selectedIndex = -1
			} else if (t == "file") {
				if (/MSIE/.test(navigator.userAgent)) {
					$(this).replaceWith($(this).clone(true))
				} else {
					$(this).val('')
				}
			} else if (includeHidden) {
				if ((includeHidden === true && /hidden/.test(t)) || (typeof includeHidden == 'string' && $(this).is(includeHidden))) {
					this.value = ''
				}
			}
		})
	};
	$.fn.resetForm = function() {
		return this.each(function() {
			if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
				this.reset()
			}
		})
	};
	$.fn.enable = function(b) {
		if (b === undefined) {
			b = true
		}
		return this.each(function() {
			this.disabled = !b
		})
	};
	$.fn.selected = function(select) {
		if (select === undefined) {
			select = true
		}
		return this.each(function() {
			var t = this.type;
			if (t == 'checkbox' || t == 'radio') {
				this.checked = select
			} else if (this.tagName.toLowerCase() == 'option') {
				var $sel = $(this).parent('select');
				if (select && $sel[0] && $sel[0].type == 'select-one') {
					$sel.find('option').selected(false)
				}
				this.selected = select
			}
		})
	};
	$.fn.ajaxSubmit.debug = false;

	function log() {
		if (!$.fn.ajaxSubmit.debug) {
			return
		}
		var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
		if (window.console && window.console.log) {
			window.console.log(msg)
		} else if (window.opera && window.opera.postError) {
			window.opera.postError(msg)
		}
	}
}));
//依赖于/js/jquery.form.js
(function(window, $, undefined) {
	"use strict";
	var UPLOADFILE = function(el, options) {
			this.$el = el, this.defaults = {
				other: function(up, url) {},
				uploadType: "all",
				size: 0,
				inputImage: false,
				callback: function(url) {},
				error: function(type) {}
			}, this.options = $.extend({}, this.defaults, options);
		}
	UPLOADFILE.prototype = {
		init: function() {
			var up = this;
			var uploadType = this.options.uploadType;
			var size = this.options.size;
			up.create();
		},
		create: function() {
			var up = this;
			var uploadType = this.options.uploadType;
			var size = this.options.size;
			var e = up.$el;
			if (up.$el.find(".fileup").length > 0) {
				up.$el.find(".fileup").remove();
			};
			var url = "/any800/echatManager.do?method=uploadFile";
			var t = "*/*"
			if (up.options.inputImage) t = "image/*";
			var str = '<form class="fileup" contentType="text/html"   method="post"  enctype="multipart/form-data" action="' + url + '"><input multiple="false" type="file" name="uploadField" accept="' + t + '" /></form>';
			$(e).append(str);
			var $input = up.$el.find(".fileup").find("input:file");
			$input.on("change", function() {
				var file = $input[0];
				var filePath = file.value;
				var fileExt = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
				if (!up.checkType(fileExt, uploadType)) {
					up.create();
					up.options.error("type");
					return;
				} else if (file.files && !! size && size < file.files[0].size) {
					up.create();
					up.options.error("size");
					return;
				};
				up.options.other(up, file.files ? file.files[0].name : filePath, new Date().getTime());
			});
		},
		submit: function(time, key) {
			var up = this;
			if (up.$el.find(".fileup").length == 0) return;
			up.$el.find(".fileup").ajaxSubmit(function(msg) {
				var msgs = msg.split("|");
				var message = "";
				if (msgs[0] == "t") {
					up.options.callback(msgs[1], time, key)
				} else {
					up.options.error("other");
				}
				up.create();
			});
		},
		checkType: function(fileExt, uploadType) {
			fileExt = fileExt.toLowerCase();
			if (uploadType == "all") {
				return fileExt.match(/.gif|.jpg|.jpeg|.bmp|.png|.doc|.docx|.xls|.xlsx|.pdf|.txt/i);
			} else {
				var types = uploadType.split(";");
				if (types.length > 0) {
					for (var i in types) {
						if (types[i] == "image") {
							if (fileExt.match(/.gif|.jpg|.jpeg|.bmp|.png/i)) {
								return true;
							}
						} else if (types[i] == "doc") {
							if (fileExt.match(/.doc|.docx/i)) {
								return true;
							}
						} else if (types[i] == "xls") {
							if (fileExt.match(/.xls|.xlsx/i)) {
								return true;
							}
						} else if (types[i] == "pdf") {
							if (fileExt.match(/.pdf/i)) {
								return true;
							}
						}else if(types[i]=="txt"){
	    					if(fileExt.match(/.txt/i)){
	    						return true;
	    					}
	    				}
					}
					return false;
				}
			}
		}
	}
	$.fn.uploadFile = function(options) {
		var uploadFile = new UPLOADFILE($(this), options);
		uploadFile.init();
		return uploadFile;
	}
})(window, jQuery);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var ajax = __webpack_require__(0);
/*userDatas.js 数据信息*/
(function(window, $, undefined) {
  var mobile_type_arr = ["ipad", "ipod", "iphone", "ios", "ios", "android", "backerry", "webos", "symbian", "windows phone", "phone", "blackberry"],
    mobile_pc_browser_json = {
      micromessenger: "微信浏览器",
      ucbrowser: "UC浏览器",
      qqbrowser: "QQ浏览器",
      opera: "Opera浏览器",
      baidubrowser: "百度浏览器",
      firefox: "火狐浏览器",
      maxthon: "傲游浏览器",
      xiaomi: "小米手机浏览器",
      chrome: "Chrome浏览器",
      android: "android内置浏览器",
      iphone: "iphone内置浏览器",
      ipod: "opod内置浏览器",
      ipad: "ipad内置浏览器"
    },
    pc_browser_json = {
      opera: "Opera浏览器",
      maxthon: "傲游浏览器",
      tencenttraveler: "TT浏览器",
      theworld: "天天浏览器",
      lbbrowser: "猎豹浏览器",
      chrome: "Chrome浏览器",
      firefox: "Firefox浏览器",
      msie: "IE浏览器",
      safari: "Safari浏览器"
    };
  var DATAS = function(options) {
      this.defaults = {
        param: null,
        storage: null,
        storageVisitor: "visitor",
        storageIpStr: "ipStr",
        storageChatNum: "chatNum",
        companyPk: "",
        aDset: null,
        chatID: "",
        businessId: "",
        businessName: "",
        storageOldService: "",
        opShow: ""
      }, this.options = $.extend({}, this.defaults, options)
    }
  DATAS.prototype = {
    hasGetJson: false,
    hasGetVisitor: false,
    hasIpStr: false,
    getJsonStr: function() {
      var v = this;
      var item = {};
      if (v.hasGetJson) v.options.param["mn"] = "";
      var visitorInfo = this.getVisitorInfo();
      var aDset = this.options.aDset;
      var ipStr = this.getIpStr();
      if ( !! v.options.param && !! v.options.param["mn"]) {
        var param = JSON.parse(decodeURIComponent(v.options.param["mn"]));
        item = {
          companyPk: v.options.companyPk,
          visitorId: visitorInfo.visitorId,
          visitorName: visitorInfo.visitorName,
          businessId: v.options.businessId,
          businessName: v.options.businessName,
          chatID: v.options.chatID,
          browsingNum: param.browsingNum,
          fromPage: param.fromPage?param.fromPage:!!document.referrer.replace(/[&]/g, "%26")?document.referrer.replace(/[&]/g, "%26"):"",
          title:"",
          ip: ipStr.cip,
          ipName: ipStr.cname,
          usersource: !! aDset ? aDset.scheme_Name : "",
          opShow: v.options.opShow,
          oldService: v.options.storageOldService,
          keyword: param.keyword,
          searchEngine: param.searchEngine,
          lastTime: Number(param.lastTime) ? param.lastTime : new Date(param.lastTime) == "Invalid Date" ? "" : new Date(param.lastTime),
          firstTime: Number(param.firstTime) ? param.firstTime : new Date(param.firstTime) == "Invalid Date" ? "" : new Date(param.firstTime),
          chatNum: v.getChatNum(),
          operatingSystem: v.getOperatingSystem(),
          visitor: visitorInfo,
          commodity: {
            "shopImgUrl": "",
            "shopName": "",
            "shopNum": "",
            "shopPrice": "",
            "shopUrl": ""
          }
        };
      } else {
        var old = v.options.storage.get("jsonStr");
        item = {
          visitorId: visitorInfo.visitorId,
          companyPk: v.options.companyPk,
          visitorName: visitorInfo.visitorName,
          businessId: v.options.businessId,
          businessName: v.options.businessName,
          chatID: v.options.chatID,
          browsingNum: old && old.browsingNum ? old.browsingNum : "",
          fromPage: old && old.fromPage ? old.fromPage : !!document.referrer.replace(/[&]/g, "%26")?document.referrer.replace(/[&]/g, "%26"):"",
          title:old && old.title ? old.title:"",
          usersource: !! aDset ? aDset.scheme_Name : "",
          opShow: v.options.opShow,
          oldService: v.options.storageOldService,
          ip: ipStr.cip,
          ipName: ipStr.cname,
          keyword: old && old.keyword ? old.keyword : "",
          searchEngine: old && old.searchEngine ? old.searchEngine : "",
          lastTime: old && old.lastTime ? old.lastTime : "",
          firstTime: old && old.firstTime ? old.firstTime : "",
          chatNum: v.getChatNum(),
          operatingSystem: v.getOperatingSystem(),
          visitor: visitorInfo,
          commodity: {
            "shopImgUrl": "",
            "shopName": "",
            "shopNum": "",
            "shopPrice": "",
            "shopUrl": ""
          }
        };
      }
      
      if( !!v.options.param["pageInfo"] && !!v.options.param["isuse"] && v.options.param["isuse"]=="true" ){
        var pageInfo =decodeURIComponent(v.options.param["pageInfo"]);
        var page = pageInfo.split("|");
        var fromPage="";
        var title="";
        if(page.length==1){
          title = page[0].trim();
          if(title=="null"){
            title="";
          }
        }else if(page.length>=2){
          title = page[0].trim();
          fromPage = page[1].trim();
          if(title=="null"){
            title="";
          }
          if(fromPage=="null"){
            fromPage="";
          }
        }
        item.title=encodeURIComponent(title);
        item.fromPage=encodeURIComponent(fromPage);
      }else{
        item.title="";
        item.fromPage="";
      }
      
      v.hasGetJson = true;
      v.options.storage.set("jsonStr", item);
      return item;
    },
    getChatNum: function() {
      if (!this.options.storage.get(this.options.storageChatNum)) {
        return 0;
      }
      return this.options.storage.get(this.options.storageChatNum);
    },
    getOperatingSystem: function() {
      var p = this.options.param; // 获取URL参数
      var s = "pc";
      var userAgent = navigator.userAgent.toLowerCase();
      var reg_Exp = /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone|BlackBerry)/i;
      if (userAgent.match(reg_Exp) != null) {
        s = "mb";
      }
      if ( !! p && !! p['qr']) {
        s = "ma"
      }

      var sysResolution = window.screen.width + "×" + window.screen.height;
      var language = !! navigator.systemLanguage ? navigator.systemLanguage : !! navigator.language ? navigator.language : "";
      var operatingSystem = {
        sysInfo: s,
        // 区分渠道
        browserName: this.getUserAgent().browser_name,
        browser: this.getUserAgent().browser_type,
        operatorSystem: this.getUserAgent().terminal_system,
        sysResolution: sysResolution,
        language: language
      };
      return operatingSystem;
    },
    getUserAgent: function() {
      var userAgent_Data = {};
      var userAgent = navigator.userAgent.toLowerCase();
      var reg_Exp = /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone|BlackBerry)/i;
      if (userAgent.match(reg_Exp) != null) {
        userAgent_Data["terminal_Type"] = "移动终端";
        for (var i = 0; i < mobile_type_arr.length; i++) {
          if (userAgent.indexOf(mobile_type_arr[i]) > -1) {
            userAgent_Data["terminal_system"] = mobile_type_arr[i];
            break;
          }
        }
        if (null == userAgent_Data["terminal_system"] || "" == userAgent_Data["terminal_system"]) {
          userAgent_Data["terminal_system"] = "未知";
        }
        for (var i in mobile_pc_browser_json) {
          if (userAgent.indexOf(i) > -1) {
            userAgent_Data["browser_type"] = mobile_pc_browser_json[i];
            userAgent_Data["browser_name"] = i;
            break;
          }
        }
        if (null == userAgent_Data["browser_type"] || "" == userAgent_Data["browser_type"]) {
          userAgent_Data["browser_type"] = "未知";
          userAgent_Data["browser_name"] = "未知";
        }
      } else {
        userAgent_Data["terminal_Type"] = "PC终端";
        var terminal_system = "未知";
        var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
        var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        if (isMac) terminal_system = "Mac";
        var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
        if (isUnix) terminal_system = "Unix";
        var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
        if (isLinux) terminal_system = "Linux";
        if (isWin) {
          var isWin2K = userAgent.indexOf("windows nt 5.0") > -1 || userAgent.indexOf("windows 2000") > -1;
          if (isWin2K) terminal_system = "Win2000";
          var isWinXP = userAgent.indexOf("windows nt 5.1") > -1 || userAgent.indexOf("windows xp") > -1;
          if (isWinXP) terminal_system = "WinXP";
          var isWin2003 = userAgent.indexOf("windows nt 5.2") > -1 || userAgent.indexOf("windows 2003") > -1;
          if (isWin2003) terminal_system = "Win2003";
          var isWinVista = userAgent.indexOf("windows nt 6.0") > -1 || userAgent.indexOf("windows vista") > -1;
          if (isWinVista) terminal_system = "WinVista";
          var isWin7 = userAgent.indexOf("windows nt 6.1") > -1 || userAgent.indexOf("windows 7") > -1;
          if (isWin7) terminal_system = "Win7";
          var isWin8 = userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows 7") > -1;
          if (isWin8) terminal_system = "Win8";
          var isWin10 = userAgent.indexOf("windows nt 10.0") > -1 || userAgent.indexOf("windows 10") > -1;
          if (isWin10) terminal_system = "Win10";
          var isEdge = userAgent.indexOf("Edge") > -1;
          if (isEdge) terminal_system = "WinEdge";
        }
        userAgent_Data["terminal_system"] = terminal_system;
        for (var i in pc_browser_json) {
          if (userAgent.indexOf(i) > -1) {
            userAgent_Data["browser_type"] = pc_browser_json[i];
            userAgent_Data["browser_name"] = i;
            break;
          }
        }
        if (null == userAgent_Data["browser_type"] || "" == userAgent_Data["browser_type"]) {
          var isIE11 = terminal_system=="Win10";
          var isEdge = terminal_system=="WinEdge";
          if(isIE11||isEdge){
            userAgent_Data["browser_type"] = pc_browser_json["msie"];
            userAgent_Data["browser_name"] = "msie"
          }else{
            userAgent_Data["browser_type"] = "未知";
            userAgent_Data["browser_name"] = "未知";
          }
        }
      }
      userAgent_Data["flash_version"] = this.getFlash_version();
      return userAgent_Data;
    },
    getFlash_version: function() {
      var f = "-",
        n = navigator;
      if (n.plugins && n.plugins.length) {
        for (var ii = 0; ii < n.plugins.length; ii++) {
          if (n.plugins[ii].name.indexOf('Shockwave Flash') != -1) {
            f = n.plugins[ii].description.split('Shockwave Flash ')[1];
            break;
          }
        }
      } else if (window.ActiveXObject) {
        for (var ii = 10; ii >= 2; ii--) {
          try {
            var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');");
            if (fl) {
              f = ii + '.0';
              break;
            }
          } catch (e) {}
        }
      }
      return f;
    },
    getIpStr: function() {
      var v = this;
      if (v.hasGetIpStr) return v.options.storage.get(v.options.storageIpStr);
      var ipStr = null;
      if (v.options.storage.get(v.options.storageIpStr)) ipStr = v.options.storage.get(v.options.storageIpStr);
      else {
        ajax.getIp()
        .done(function(e){
          ipStr = e ;
        })
        .always(function(e){
          ipStr = e ;
        })
        .fail(function(e){
          ipStr = e ;
        })
      }
      v.hasGetIpStr = true;
      v.options.storage.set(v.options.storageIpStr, ipStr);
      return ipStr;
    },
    getVisitorInfo: function() {
      var v = this;
      var item = {};
      if (!v.hasGetVisitor && !! v.options.param && !! v.options.param["mn"]) {
        var param = JSON.parse(decodeURIComponent(v.options.param["mn"]));
        item["visitorId"] = param.visitorId;
        item["visitorName"] = param.visitorName;

        if (v.options.param['hjUserData']) {
          // 姓名|性别|固定电话|手机|邮箱|地址|公司名|MSN|QQ|会员ID|
          // 会员等级|会员积分|会员订单（所有历史信息）
          var pDatas = decodeURIComponent(v.options.param['hjUserData']);
          var pData = pDatas.split("|");
          try {
            item["sex"] = pData[1];
            item["realName"] = pData[0];
            item["phone"] = pData[2];
            item["mobile"] = pData[3];
            item["email"] = pData[4];
            item["QQ"] = pData[8];
            item["MSN"] = pData[7];
            item["address"] = pData[5];
            item["company"] = pData[6];
            item["visitorId"] = pData[9];
            item["visitorName"] = pData[0];
          } catch (e) {}
        }
      } else if (!v.hasGetVisitor && !! v.options.param && !! v.options.param["memberPk"]){
        item["visitorId"] = v.options.param["memberPk"];
      }else if ( !! v.options.storage.get(v.options.storageVisitor)) {
        var data = v.options.storage.get(v.options.storageVisitor);
        item["visitorId"] = data.visitorId ? data.visitorId : "";
        if (item["visitorId"] == "") {
          ajax.generationVisitorsID()
          .done(function(dataObj){
            if (dataObj) {
              item["visitorId"] = dataObj.visitorId;
            }
          })
        }
        item["company"] = data.company ? data.company : "";
        item["visitorName"] = data.visitorName ? data.visitorName : "访客" + Number(item["visitorId"].substring(1));
        item["sex"] = !isNaN(Number(data.sex)) ? data.sex : 0;
        item["degree"] = data.degree ? data.degree : "";
        item["realName"] = data.realName ? data.realName : "";
        item["phone"] = data.phone ? data.phone : "";
        item["mobile"] = data.mobile ? data.mobile : "";
        item["email"] = data.email ? data.email : "";
        item["QQ"] = data.QQ ? data.QQ : "";
        item["MSN"] = data.MSN ? data.MSN : "";
        item["address"] = data.address ? data.address : "";
        item["extension"] = data.extension ? data.extension : "";
        item["memberId"] = data.memberId ? data.memberId : "";
      } 
      if (!item["visitorId"]) {
        ajax.generationVisitorsID()
        .done(function(dataObj){
          if (dataObj) {
            item["visitorId"] = dataObj.visitorId;
            item["visitorName"] = "访客" + dataObj.showId;
          }
        })
      }
      var vname = v.updateVisitorName(item,item["visitorId"]);
      v.hasGetVisitor = true;
      v.options.storage.set(v.options.storageVisitor, item);
      return item;
    },
    updateVisitorName: function(item,vid) {
      var v = this;
      if (!v.hasGetVisitor) {
        ajax.getVisitorsName(vid)
        .done(function(dataObj){
          if (dataObj.success) {
            item["company"] = dataObj.company || item["company"] || "";
            item["visitorName"] = dataObj.name || item["visitorName"] || "";
            item["sex"] = !isNaN(Number(dataObj.sex)) ? dataObj.sex : item["sex"]?item["sex"]:0;
            item["degree"] = dataObj.degree || item["degree"] || "";
            item["realName"] = dataObj.realName || item["realName"] || "";
            item["phone"] = dataObj.phone || item["phone"] || "";
            item["mobile"] = dataObj.mobile || item["mobile"] || "";
            item["email"] = dataObj.email || item["email"] || "";
            item["QQ"] = dataObj.QQ || item["QQ"] || "";
            item["MSN"] = dataObj.MSN || item["MSN"] || "";
            item["address"] = dataObj.address || item["address"] || "";
            item["extension"] = dataObj.extension || item["extension"] || "";
            item["memberId"] = dataObj.memberId || item["memberId"] || "";
          }
        })
      }
      return item;
    }
  }
  $.userDatas = function(options) {
		var datas = new DATAS(options);
		return datas;
	}
})(window, jQuery); 

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var ucc = __webpack_require__ (1);
/*visitLimit.js 访问限制*/
var VISTILIMIT = function(options) {
		this.defaults = {
			open: "1",
			storage: null,
			time: 60 * 1000,
			num: 5,
			blockTime: 5 * 1000,
			url: ucc.baseUrl+"/overLoad.jsp"
		}, this.options = $.extend({}, this.defaults, options)
	}
VISTILIMIT.prototype = {
	init: function() {
		if (this.options.open == "0") return;
		var vl = this;
		var storage = this.options.storage;
		var visitLimit = storage.get("vLimit");
		var isLimit = storage.get("isLimit");
		var limitArray = [];
		var now = new Date().getTime();
		if ( !! visitLimit) {
			if (isLimit == "islimited" && now - visitLimit[visitLimit.length - 1].time <= vl.options.blockTime) {
				window.location.href = vl.options.url;
				return;
			} else if (isLimit == "islimited") {
				visitLimit = [];
			}
			storage.set("isLimit", "");
			for (var i in visitLimit) {
				if (now - visitLimit[i].time < vl.options.time) {
					limitArray.push({
						time: visitLimit[i].time
					})
				}
			}
			limitArray.push({
				time: now
			});
			storage.set("vLimit", limitArray);
			if (limitArray.length > vl.options.num) {
				storage.set("isLimit", "islimited");
				window.location.href = vl.options.url;
				return;
			}
		} else {
			limitArray.push({
				time: now
			})
			storage.set("vLimit", limitArray);
		}
	}
}
$.visitLimit = function(options) {
  var visitLimit = new VISTILIMIT(options);
  return visitLimit;
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/*visitorInformation.js 用户信息收集*/
(function(window, $, undefined) {
  var VISITORINFORMATION = function(options) {
      this.defaults = {
        storage: null,
        Alert: null,
        title: "请填写以下信息",
        storageVisitor: "visitor",
        bottom: "<div class='bottom'><div class='cancel'>取消</div><div class='submit'>确定</div></div>",
        generate: function(combo) {},
        warn: function(el, text) {},
        submitFun: function() {},
        cancelFun: function() {}
      }, this.options = $.extend({}, this.defaults, options)
    }
  VISITORINFORMATION.prototype = {
    hasCreate: false,
    visitor: {
      "visitorId": "",
      "company": "",
      "visitorName": "",
      "sex": "0",
      "degree": "",
      "realName": "",
      "phone": "",
      "mobile": "",
      "email": "",
      "QQ": "",
      "MSN": "",
      "address": "",
      "extension": "",
      "memberId": ""
    },
    init: function() {
      var VI = this;
      var storage = VI.options.storage;
      if ( !! storage.get(VI.options.storageVisitor)) {
        VI.visitor = storage.get(VI.options.storageVisitor);
      }
      VI.createView();
      VI.hasCreate = true;
    },
    check: function() {
      var VI = this;
      $(".visitorInformationView .col").removeClass('warn');
      var can = true;
      $(".visitorInformationView .col").each(function(index, el) {
        var $this = $(this);
        if (can == false) return;
        if ($this.data("displayname") == "visitorName") {
          var reg = new RegExp((/^[a-zA-Z0-9\u4e00-\u9fa5]+(\s[a-zA-Z0-9\u4e00-\u9fa5]+|)$/));
          if ($this.data("require") == 1 && $this.find("input").val() == "") {
            VI.options.warn($this, "昵称不能为空");
            $this.addClass('warn');
            can = false;
            return;
          } else if ($this.find("input").val().length > 20) {
            VI.options.warn($this, "昵称最大长度为20字符");
            $this.addClass('warn');
            can = false;
            return;
          } else if (!reg.test($this.find("input").val())) {
            VI.options.warn($this, "请输入中文、英文和数字！");
            $this.addClass('warn');
            can = false;
            return;
          }
        }
        if ($this.data("displayname") == "realName") {
          if ($this.find("input").val().length > 20) {
            VI.options.warn($this, "姓名最大长度为20字符");
            $this.addClass('warn');
            can = false;
            return;
          }
        }
        if ($this.data("displayname") == "phone") {
          if ($this.find("input").val() == "") return;
          var re = new RegExp(/^[1][0-9]{1}[0-9]{9}$/);
          if (!re.test($this.find("input").val())) {
            VI.options.warn($this, "请填写正确的手机号码");
            $this.addClass('warn');
            can = false;
            return;
          }
        }
        if ($this.data("displayname") == "phone") {
          if ($this.find("input").val() == "") return;
          var re = new RegExp(/^[1][0-9]{1}[0-9]{9}$/);
          if (!re.test($this.find("input").val())) {
            VI.options.warn($this, "请填写正确的手机号码");
            $this.addClass('warn');
            can = false;
            return;
          }
        }
        if ($this.data("displayname") == "QQ") {
          if ($this.find("input").val().length > 20) {
            VI.options.warn($this, "QQ最大长度为20字符");
            $this.addClass('warn');
            can = false;
            return;
          }
        }
        if ($this.data("displayname") == "email") {
          if ($this.find("input").val() == "") return;
          var reg = new RegExp(/^[\-\._A-Za-z0-9]+@([_A-Za-z0-9\-]+\.)+[A-Za-z0-9]{2,3}$/);
          if (!reg.test($this.find("input").val())) {
            VI.options.warn($this, "请填写正确的邮箱");
            $this.addClass('warn');
            can = false;
            return;
          } else if ($this.find("input").val().length > 50) {
            VI.options.warn($this, "邮箱最大长度为50字符");
            $this.addClass('warn');
            can = false;
            return;
          }
        }
        if ($this.data("displayname") == "address") {
          if ($this.find("input").val().length > 50) {
            VI.options.warn($this, "地址最大长度为50字符");
            $this.addClass('warn');
            can = false;
            return;
          }
        }
        if ($this.data("displayname") == "company") {
          if ($this.find("input").val().length > 50) {
            VI.options.warn($this, "公司名称最大长度为50字符");
            $this.addClass('warn');
            can = false;
            return;
          }
        }
      });
      return can;
    },
    cancel: function() {
      this.options.cancelFun();
      this.hide();
    },
    createView: function() {
      var VI = this;
      if ($(".visitorInformationView").length > 0) {
        $(".visitorInformationView").remove();
      }
      var str = "<div class='visitorInformationView view'><div class='board'></div></div>";
      $("body").append(str);
      var html = "<div class='title'>" + VI.options.title + "<span class='cross'><img src='"+__webpack_require__(2)+"'></span></div>";
      html += "<div class='body'>";
      html += "<div class='col' data-type='input' data-require='1' data-name='昵称' data-placeholder='请输入昵称' data-displayname='visitorName' ></div>";
      html += "<div class='col' data-type='radio' data-require='0' data-name='性别'  data-markedwords='" + ( !! VI.visitor.sex ? VI.visitor.sex : "") + "' data-displayname='sex' ></div>";
      html += "<div class='col' data-type='input' data-require='0' data-name='姓名' data-placeholder='请输入姓名' data-markedwords='" + ( !! VI.visitor.realName ? VI.visitor.realName : "") + "' data-displayname='realName' ></div>";
      html += "<div class='col' data-type='input' data-require='0' data-name='手机' data-placeholder='请输入手机号码' data-markedwords='" + ( !! VI.visitor.phone ? VI.visitor.phone : "") + "' data-displayname='phone' ></div>";
      html += "<div class='col' data-type='input' data-require='0' data-name='QQ' data-placeholder='请输入QQ号码' data-markedwords='" + ( !! VI.visitor.QQ ? VI.visitor.QQ : "") + "' data-displayname='QQ' ></div>";
      html += "<div class='col' data-type='input' data-require='0' data-name='邮箱' data-placeholder='请输入邮箱地址' data-markedwords='" + ( !! VI.visitor.email ? VI.visitor.email : "") + "' data-displayname='email' ></div>";
      html += "<div class='col' data-type='input' data-require='0' data-name='地址' data-placeholder='请输入地址' data-markedwords='" + ( !! VI.visitor.address ? VI.visitor.address : "") + "' data-displayname='address' ></div>";
      html += "<div class='col' data-type='input' data-require='0' data-name='公司' data-placeholder='请输入公司名称' data-markedwords='" + ( !! VI.visitor.company ? VI.visitor.company : "") + "' data-displayname='company' ></div>";
      html += "</div>";
      html += this.options.bottom;
      $(".visitorInformationView .board").html(html);
      this.hide();
      this.options.generate();
    },
    submit: function(json) {
      var VI = this;
      var storage = VI.options.storage;
      if (!VI.check()) return;
      var visitor = storage.get(VI.options.storageVisitor);
      visitor = $.extend({}, visitor, json);
      storage.set(VI.options.storageVisitor, visitor);
      VI.visitor = visitor;
      storage.set("isSave", 0);
      VI.options.submitFun(VI.visitor);
      VI.hide();
    },
    show: function() {
      if (this.hasCreate) {
        $(".visitorInformationView").show();
        $(".visitorInformationView .board").css({
          marginTop: -$(".visitorInformationView .board").height() / 2,
        });
      }
    },
    hide: function() {
      $(".visitorInformationView").hide();
    }
  }
  $.visitorInformation = function(options) {
		var visitorInformation = new VISITORINFORMATION(options);
		visitorInformation.init();
		return visitorInformation;
	}
})(window, jQuery);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {


var WEBSOCKET = function(options) {
		this.defaults = {
			path: "/any800/UccWebSocket/",
			visitorId: "",
			message: function(chatId, content) {

			},
			deal: function(type, chatId, json) {

			},
			connect:function(isConnect){
				
			},
			confirmSend:function(messageId){
				
			},
			leaveCover:function(){
			},
			open:function(){
			}
		}, this.options = $.extend({}, this.defaults, options)
	};
var UccMessage = function(messageJson) {
		var self = this;
		self.chatId = messageJson.chatID;
		self.type = messageJson.type ? messageJson.type : "VS_CHAT";
		self.content = JSON.stringify(new Message(messageJson.message));
		self.messageId = "Other" +messageJson.date;
		return self;
	};
var UccQueue = function(messageJson) {
		var self = this;
		self.chatId = messageJson.chatID;
		self.type = messageJson.type ? messageJson.type : "VS_CHAT";
		self.content = (messageJson.message);
		self.messageId = "Other" +messageJson.date;
		return self;
	};
var Message = function(message){
	var self = this;
	self.msg = message;
	return self;
}
var dfd = new $.Deferred();
WEBSOCKET.prototype = {
	isWork: false,
	isConnect:false,
	connectTimeout:null,
	websocket: null,
	init: function() {
		var w = this;
		if ( !! window.WebSocket && window.WebSocket.prototype.send) {
			if (w.options.isWs == "true") {
				w.isWork = true;
			}
//				$.ajax({
//					url: "./echat.do",
//					data: {
//						method: "isWebSocketSupported"
//					},
//					async: false,
//					dataType: "json"
//				}).done(function(data) {
//					if (data.isWs == "true") {
//						w.isWork = true;
//					}
//				})
		};
		if(w.isWork){
			w.reconnectionFun();
			w.connect();
		}
		if(!w.isWork){
			return dfd.resolve(false);
		}else{
			return dfd.promise();
		}
	},
	reconnectionFun:function(){
		var w = this;
		if(!w.isWork)return;
		w.ReconnectingWebSocket = __webpack_require__(50);
	},
	getWebSocketUri: function() { 	
		return (window.location.protocol == "http:" ? "ws://" : "wss://") + (document.location.hostname == "" ? "localhost" : document.location.hostname) +  (document.location.port == "" ? "" : (":"+document.location.port)) + this.options.path + this.options.visitorId;
	},
	connect: function() {
		var w = this;
		if (!w.isWork){
			return;
		}
		if(w.websocket && w.websocket.readyState!=WebSocket.CLOSED){
			return;
		};
		var websocket = window.WebSocket || window.MozWebSocket;
		w.websocket = new w.ReconnectingWebSocket(w.getWebSocketUri(),null,{});
		w.websocket.onopen = w.doOpen;
		w.websocket.onerror = w.doError;
		w.websocket.onclose = w.doClose;
		w.websocket.onmessage = w.doMessage;
	},
	doOpen: function() {
		var w = this;
		dfd.resolve(true);
		console.log('Info: WebSocket connection opened.');
		w.isConnect = true;
		w.hasOpend = true;
		webSocket.startTimeout();
		webSocket.pingTime = 0;
		webSocket.pongTime = 0;
		webSocket.options.open();
	},
	pingTime:0,
	pongTime:0,
	sendPing:function(){
		var w = this;
		if(w.pingTime && w.pongTime){
			if(w.pingTime-w.pongTime>3*1000){
				w.websocket.isConnect = false;
			}else{
				w.websocket.isConnect = true;
			}
		}
		w.pingTime = new Date().getTime();
		var m = new UccMessage({date:new Date().getTime(),chatId:"",type:"PING"});
		if(w.websocket){
			w.websocket.send(JSON.stringify(m));
		}
	},
	startTimeout:function(){
		if (!this.isWork) return;
		var w = this;
		if (w.connectTimeout) {
			clearTimeout(w.connectTimeout);
		}
		w.connectTimeout = setTimeout(function(){
			w.sendPing();
			w.options.connect(w.websocket.isConnect);
			w.startTimeout();
		},1000)
	},
	endTimeout:function(){
		var w = this;
		if (w.connectTimeout) {
			clearTimeout(w.connectTimeout);
		}
		w.connectTimeout = null;
	},
	doError: function(evt) {
		var w = this;
		if(!w.hasOpend){
			webSocket.isWork = false;
			dfd.resolve(false);
		}
		console.log('Info: WebSocket error. code=' + evt.code);
	},
	doClose: function(evt) {
		var w = this;
		if(w.hasOpend){
			if(evt.code=="1004" || evt.code=="1006"){

				webSocket.options.leaveCover();
			}
			console.log('Info: WebSocket closed. code=' + evt.code);
			console.log(evt);
			w.isConnect = false;
		}
	},
	doMessage: function(message) {
		var w = this;
		console.log(message.data);
		var json = JSON.parse(message.data);
		var type = json.type;
		if(type=="WELCOME_TIPS"){
			var body = JSON.parse(json.content);
			webSocket.options.deal("CUTOMER_IS_INVITED", json.chatId, body.msg);
		}else if(type=="CHAT"){
			var body = JSON.parse(json.content);
			webSocket.options.message(json.chatId, body.msg,json.messageId);
		}else if(type=="CLOSE_ROOM"){
			var body = JSON.parse(json.content);
			if(body.msg=="operatorLeaving"){
				webSocket.options.deal("CLOSE", json.chatId, body.msg);		
			}else{
				webSocket.options.deal("CLOSE_CUSTOMER", json.chatId, body.msg);
			}
		}else if(type=="LEAVE_ROOM"){
			var body = JSON.parse(json.content);
			webSocket.options.deal("CLOSE_CUSTOMER", json.chatId, body.msg);	
		}else if (type == "RECEIPTS") {
			var body = JSON.parse(json.content);
			webSocket.options.deal("RECEIPT", json.chatId, body.targetMsgId);
		}else if (type == "OPERATION_TIPS") {
			var body = JSON.parse(json.content);
			webSocket.options.deal(type, json.chatId, {params:body});
		}else if (type == "REVOKE") {
			var body = JSON.parse(json.content);
			webSocket.options.deal("CUTOMER_REVOKE", json.chatId, json.messageId);
		}else if (type == "VS_QUEUE_INDEX"){
			var body = JSON.parse(json.content);
			webSocket.options.deal("VS_QUEUE_INDEX", json.chatId, body);
		}else  if(type == "PONG"){
			webSocket.pongTime = new Date().getTime();
		}else if(type == "DISCONNECTED_TIP"){
			var body = JSON.parse(json.content);
			webSocket.options.deal("CUSTOMER_NETWORK_INTERRUPT", json.chatId, body);
		}
	},
	close: function(message) {
		var w = this;
		if (w.websocket != null) {
			//w.websocket.close();
		}
	},
	send: function(message) {
		var w = this;
		if (w.websocket != null) {
			var m = new UccMessage(message);
			w.websocket.send(JSON.stringify(m));
			w.options.confirmSend(m.messageId);
		}
	},
	queue:function(message) {
		var w = this;
		if (w.websocket != null) {
			var m = new UccQueue(message);
			w.websocket.send(JSON.stringify(m));
		}
	},
	expand:function(json){
		var w = this;
		this.options = $.extend({}, this.options, json);
	}
}
$.webSocket = function(options) {
  var webSocket = new WEBSOCKET(options);
  return webSocket;
}

/***/ }),
/* 40 */
/***/ (function(module, exports) {

;
(function(window, $, undefined) {
	var WORKTIME = function(options) {
			this.defaults = {
				'BasicSetting': {},
				'ExtraSetting': {},
				'workStr': "温馨提示：尊敬的客户，我们的服务时间是【$1】<br>如果有重要的事情，请点击<a href='javascript:void(0)' class='dialogue-a fanke-liuyan'>在线留言</a><br>给您带来的不便，敬请谅解.",
				'holidayStr': "温馨提示：尊敬的客户，我们的节假日时间是【$1】<br>如果有重要的事情，请点击<a href='javascript:void(0)' class='dialogue-a fanke-liuyan'>在线留言</a><br>给您带来的不便，敬请谅解.",
				show: function(msg) {}
			}, this.options = $.extend({}, this.defaults, options)
		}
	WORKTIME.prototype = {
		timeZone: "",
		type: 0,
		//type返回的类型节假日2或者是服务时间1或者不返回0
		init: function() {
			var t = this;
			var bs = this.options.BasicSetting;
			var es = this.options.ExtraSetting;
			if ( !! bs && bs.open == 1) {
				var bsStart = bs.startTime.split(":");
				var bsEnd = bs.endTime.split(":");
				if (bsStart.length < 2 || bsEnd.length < 2) {
					return false;
				}
				var startTime = new Date(),
					endTime = new Date(),
					currentDate = new Date();
				startTime.setHours(bsStart[0]);
				startTime.setMinutes(bsStart[1]);
				startTime.setSeconds("00");
				endTime.setHours(bsEnd[0]);
				endTime.setMinutes(bsEnd[1]);
				endTime.setSeconds("00");
				var MonthStr = (currentDate.getMonth() + 1) < 10 ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1),
					DayStr = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
				var currentDateStr = currentDate.getFullYear() + '-' + MonthStr + '-' + DayStr;
				var exceStartTime, exceEndTime; // 例外开始,结束时间
				var dateweek = "",
					week = bs.week,
					day = currentDate.getDay();
				var weeks = week.split(",");
				var isEx = false; //是否是例外情况
				for (var i = 0; i <= weeks.length; i++) {
					switch (weeks[i]) {
					case '0':
						dateweek += "星期日&nbsp";
						break;
					case '1':
						dateweek += "星期一&nbsp";
						break;
					case '2':
						dateweek += "星期二&nbsp";
						break;
					case '3':
						dateweek += "星期三&nbsp";
						break;
					case '4':
						dateweek += "星期四&nbsp";
						break;
					case '5':
						dateweek += "星期五&nbsp";
						break;
					case '6':
						dateweek += "星期六&nbsp";
						break;
					}
				}
				if (week.length == 13) {
					dateweek = "";
				};
				if (week.indexOf(day) >= 0) {
					if (currentDate.getTime() > endTime.getTime() || currentDate.getTime() < startTime.getTime()) {
						//不在当前的时间工作时间内
						t.type = 1;
						t.timeZone = dateweek + bs.startTime + "-" + bs.endTime;
						return false;
					}
					//判断添加了额外的节假时间
					for (var i = 0; i < es.length; i++) {
						if (es[i].exceType == 1 && es[i].exceStartTime <= currentDateStr && es[i].exceEndTime >= currentDateStr) {
							exceStartTime = es[i].exceStartTime;
							exceEndTime = es[i].exceEndTime;
							isEx = true;
							break;
						}
					}
					if (isEx) {
						t.type = 2;
						t.timeZone = exceStartTime + "-" + exceEndTime;
						return false;
					}
				} else {
					if (week != "null") {
						//判断添加了额外的服务时间
						for (var i = 0; i < es.length; i++) {
							if (es[i].exceType == 0 && (es[i].exceStartTime <= currentDateStr && es[i].exceEndTime >= currentDateStr)) { // 工作日
								exceStartTime = es[i].exceStartTime;
								exceEndTime = es[i].exceEndTime;
								isEx = true;
								break;
							}
						}
						if (!isEx) {
							t.type = 1;
							t.timeZone = dateweek + bs.startTime + "-" + bs.endTime;
							return false;
						}
					}
				}
			}
		},
		iswork:function(){
			var workTime = this;
			workTime.type = 0;
			var bs = workTime.options.BasicSetting;
			var es = workTime.options.ExtraSetting;
			if ( !! bs && bs.open == 1) {
				var bsStart = bs.startTime.split(":");
				var bsEnd = bs.endTime.split(":");
				if (bsStart.length != 2 || bsEnd.length != 2) {
					return false;
				}
				var startTime = new Date(),
					endTime = new Date(),
					currentDate = new Date(nowtime);
				startTime.setHours(bsStart[0]);
				startTime.setMinutes(bsStart[1]);
				startTime.setSeconds("00");
				endTime.setHours(bsEnd[0]);
				endTime.setMinutes(bsEnd[1]);
				endTime.setSeconds("00");
				var MonthStr = (currentDate.getMonth() + 1) < 10 ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1),
					DayStr = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
				var currentDateStr = currentDate.getFullYear() + '-' + MonthStr + '-' + DayStr;
				var exceStartTime, exceEndTime; // 例外开始,结束时间
				var dateweek = "",
					week = bs.week,
					day = currentDate.getDay();
				var weeks = week.split(",");
				var isEx = false; //是否是例外情况
				for (var i = 0; i <= weeks.length; i++) {
					switch (weeks[i]) {
					case '0':
						dateweek += "星期日&nbsp";
						break;
					case '1':
						dateweek += "星期一&nbsp";
						break;
					case '2':
						dateweek += "星期二&nbsp";
						break;
					case '3':
						dateweek += "星期三&nbsp";
						break;
					case '4':
						dateweek += "星期四&nbsp";
						break;
					case '5':
						dateweek += "星期五&nbsp";
						break;
					case '6':
						dateweek += "星期六&nbsp";
						break;
					}
				}
				if (week.length == 13) {
					dateweek = "";
				};
				if (week.indexOf(day) >= 0) {
					if (currentDate.getTime() > endTime.getTime() || currentDate.getTime() < startTime.getTime()) {
						//不在当前的时间工作时间内
						workTime.type = 1;
						workTime.timeZone = dateweek + bs.startTime + "-" + bs.endTime;
						return false;
					}
					//判断添加了额外的节假时间
					for (var i = 0; i < es.length; i++) {
						if (es[i].exceType == 1 && es[i].exceStartTime <= currentDateStr && es[i].exceEndTime >= currentDateStr) {
							exceStartTime = es[i].exceStartTime;
							exceEndTime = es[i].exceEndTime;
							isEx = true;
							break;
						}
					}
					if (isEx) {
						workTime.type = 2;
						workTime.timeZone = exceStartTime + "-" + exceEndTime;
						return false;
					}
				} else {
					if (week != "null") {
						//判断添加了额外的服务时间
						for (var i = 0; i < es.length; i++) {
							if (es[i].exceType == 0 && (es[i].exceStartTime <= currentDateStr && es[i].exceEndTime >= currentDateStr)) { // 工作日
								exceStartTime = es[i].exceStartTime;
								exceEndTime = es[i].exceEndTime;
								isEx = true;
								break;
							}
						}
						if (!isEx) {
							workTime.type = 1;
							workTime.timeZone = dateweek + bs.startTime + "-" + bs.endTime;
							return false;
						}
					}
				}
			}
		},
		getMsg: function() {
			if (this.type == 1) {
				return this.options.workStr.replace(/\$1/g, this.timeZone);
			} else if (this.type == 2) {
				return this.options.holidayStr.replace(/\$1/g, this.timeZone);
			}
			return false;
		},
		show: function() {
			var msg = this.getMsg();
			this.options.show(msg);
		}
	}
	$.workTime = function(options) {
		var workTime = new WORKTIME(options);
		workTime.init();
		return workTime;
	}
})(window, jQuery);

/***/ }),
/* 41 */
/***/ (function(module, exports) {

jQuery.cookie = function(a, b, c) {
  if ("undefined" == typeof b) {
	var i = null;
	if (document.cookie && "" != document.cookie)
	  for (var j = document.cookie.split(";"), k = 0; k < j.length; k++) {
		var l = jQuery.trim(j[k]);
		if (l.substring(0, a.length + 1) == a + "=") {
		  i = decodeURIComponent(l.substring(a.length + 1));
		  break
		}
	  }
	return i
  }
  c = c || {}, null === b && (b = "", c.expires = -1);
  var d = "";
  if (c.expires && ("number" == typeof c.expires || c.expires.toUTCString)) {
	var e;
	"number" == typeof c.expires ? (e = new Date, e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c.expires)) : e = c.expires, d = "; expires=" + e.toUTCString()
  }
  var f = c.path ? "; path=" + c.path : "",
	g = c.domain ? "; domain=" + c.domain : "",
	h = c.secure ? "; secure" : "";
  document.cookie = [a, "=", encodeURIComponent(b), d, f, g, h].join("")
};
var stringify = function() {
  function a(a) {
	return /["\\\x00-\x1f]/.test(a) && (a = a.replace(/["\\\x00-\x1f]/g, function(a) {
	  var b = e[a];
	  return b ? b : (b = a.charCodeAt(), "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16))
	})), '"' + a + '"'
  }

  function b(a) {
	var b, c, d, e = ["["],
	  f = a.length;
	for (c = 0; f > c; c++) switch (d = a[c], typeof d) {
	  case "undefined":
	  case "function":
	  case "unknown":
		break;
	  default:
		b && e.push(","), e.push(stringify(d)), b = 1
	}
	return e.push("]"), e.join("")
  }

  function c(a) {
	return 10 > a ? "0" + a : a
  }

  function d(a) {
	return '"' + a.getFullYear() + "-" + c(a.getMonth() + 1) + "-" + c(a.getDate()) + "T" + c(a.getHours()) + ":" + c(a.getMinutes()) + ":" + c(a.getSeconds()) + '"'
  }
  var e = {
	"\b": "\\b",
	"  ": "\\t",
	"\n": "\\n",
	"\f": "\\f",
	"\r": "\\r",
	'"': '\\"',
	"\\": "\\\\"
  };
  return function(c) {
	switch (typeof c) {
	  case "undefined":
		return "undefined";
	  case "number":
		return isFinite(c) ? String(c) : "null";
	  case "string":
		return a(c);
	  case "boolean":
		return String(c);
	  default:
		if (null === c) return "null";
		if (c instanceof Array) return b(c);
		if (c instanceof Date) return d(c);
		var e, f, g = ["{"],
		  h = stringify;
		for (var i in c)
		  if (Object.prototype.hasOwnProperty.call(c, i)) switch (f = c[i], typeof f) {
			case "undefined":
			case "unknown":
			case "function":
			  break;
			default:
			  e && g.push(","), e = 1, g.push(h(i) + ":" + h(f))
		  }
		return g.push("}"), g.join("")
	}
  }
}();
JSON = {
  parse: window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function(a) {
	return String(a).evalJSON()
  } || $.parseJSON || $.evalJSON,
  stringify: Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || stringify
};
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(elt) {
	var len = this.length >>> 0;
	var from = Number(arguments[1]) || 0;
	from = (from < 0) ? Math.ceil(from) : Math.floor(from);
	if (from < 0) from += len;
	for (; from < len; from++) {
	  if (from in this && this[from] === elt) return from
	}
	return -1
  }
}
Array.prototype.insertSort = function(fn) {
  var array = this;
  var fn = fn || function(a, b) {
	return b > a;
  }
  for (var i = 1, len = array.length; i < len; i++) {
	var key = array[i];
	var j = i - 1;
	while (j >= 0 && fn(array[j], key)) {
	  array[j + 1] = array[j];
	  j--
	}
	array[j + 1] = key;
  }
  return array;
}
Date.prototype.Format = function(fmt) {
  var o = {
	"M+": this.getMonth() + 1,
	"d+": this.getDate(),
	"h+": this.getHours(),
	"m+": this.getMinutes(),
	"s+": this.getSeconds(),
	"q+": Math.floor((this.getMonth() + 3) / 3),
	"S": this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt
};
String.prototype.trim = function()  
{  
	return this.replace(/(^\s*)|(\s*$)/g, "");  
}
//console = {};
//console.log=function(e){};
//console.warn=function(e){};
//console.error=function(e){};
//console.debug=function(e){};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var ucc = __webpack_require__(1);
var ajax = __webpack_require__ (0);
var defered = new $.Deferred();
var defered = new $.Deferred();
$.when(
ajax.getSettingsAndService(),
ajax.getLangAndMessageSettings(),
ajax.getVisitosDisplay(),
ajax.getTmpCode()
).done(function(){
	defered.resolve();
})
module.exports = defered.promise();

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = "/webpack//images/loading.gif";

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = "/webpack//images/loading.gif";

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhDwATAIABAJmZmQAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjAwMjc5REM0RDg5MTFFNkJDNDNDNEE0NTI5Q0U3NDEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjAwMjc5REI0RDg5MTFFNkJDNDNDNEE0NTI5Q0U3NDEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjg2ODc0NzZhLTkxZDctMjQ0MS05ODZlLWI2YTA2NzZjZDhiOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Njg3NDc2YS05MWQ3LTI0NDEtOTg2ZS1iNmEwNjc2Y2Q4YjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQFDwABACwAAAAADwATAAACD4yPqcvtD6OctNqLs96tAAAh+QQJHgABACwEAAcAAwAHAAACBwRiZ6iZUQAAIfkEBS0AAQAsAAAAAA8AEwAAAiCMj6nL7Q7AO7HVEOXK5m7tKVeYjJpoMulEfhP2xvJUAAAh+QQFPAABACwIAAEABQARAAACEQSCdrmMYR5s0dn5Kt67qlsAADs="

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAylpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDI2OEFEMDQ0RDhBMTFFNkJEMEFCOEUwREEyQkVDMUMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDI2OEFEMDM0RDhBMTFFNkJEMEFCOEUwREEyQkVDMUMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjg2ODc0NzZhLTkxZDctMjQ0MS05ODZlLWI2YTA2NzZjZDhiOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Njg3NDc2YS05MWQ3LTI0NDEtOTg2ZS1iNmEwNjc2Y2Q4YjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5qmW4mAAABSElEQVR42mL8//8/A7mABcaYNWsWNnkOIL4BxH+AWAUmmJaWBqaZCBjOBcQyQKwMxJvRJXFprgXiQiB+B8TyQPwXiH2A2IuQZpBXmoC4D4j1gPgpEIdA5dYQ0gzyXzmUfRJKbwDiZ0DMCcQx2DQ/AuK3UHYXEO+GBlgzVCwbSldh0/wRiIWAeAmU7wal85BsBwFVbJp1gfg3EEcjiX8AYj4kNZ+Qoxfdz7eQoggE3qDJf8cXYLCE8A1KC6PJc+LSfBGI2YF4BRD/g4oJQsMCBvigcY6hWQHqzEgofw+U7ofSAWheQ3geCPiR2KDU5QzEP4C4ESo2FUo340sk4tDUBQKmUNofiKWgYbEcm80w8BqI5wPxTSC+AsSSQLwWKheGNUsiAVBgJUHZoETzGIiZgXgLEG8lpBkZfINmDFDi8UWXZKSkJAEIMACWLkALAjkkIAAAAABJRU5ErkJggg=="

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = "/webpack//images/player-graphics.gif";

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

(function(h, o, g) {
//	var p = function() {
//		for (var b = /audio(.min)?.js.*/, a = document.getElementsByTagName("script"), c = 0, d = a.length; c < d; c++) {
//			var e = a[c].getAttribute("src");
//			if (b.test(e)) {
//				return e.replace(b, "")
//			}
//		}
//	}();
	var p="./pagesJs/echatJs/audiojs/";
	var swf = "./audio/audiojs.swf";
	var loadinggif = __webpack_require__(44);
	var pausegif = __webpack_require__(45);
	var playpng = __webpack_require__(46);
	var playergif = __webpack_require__(47);
	g[h] = {
		instanceCount: 0,
		instances: {},
		flashSource: '      <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="$1" width="1" height="1" name="$1" style="position: absolute; left: -1px;">         <param name="movie" value="$2?playerInstance=' + h + '.instances[\'$1\']&datetime=$3">         <param name="allowscriptaccess" value="always">         <embed name="$1" src="$2?playerInstance=' + h + '.instances[\'$1\']&datetime=$3" width="1" height="1" allowscriptaccess="always">       </object>',
		settings: {
			autoplay: false,
			loop: false,
			preload: true,
			imageLocation: playergif,
			swfLocation: swf,
			useFlash: function() {
				var b = document.createElement("audio");
				return !(b.canPlayType && b.canPlayType("audio/mpeg;").replace(/no/, ""))
			}(),
			hasFlash: function() {
				if (navigator.plugins && navigator.plugins.length && navigator.plugins["Shockwave Flash"]) {
					return true
				} else {
					if (navigator.mimeTypes && navigator.mimeTypes.length) {
						var b = navigator.mimeTypes["application/x-shockwave-flash"];
						return b && b.enabledPlugin
					} else {
						try {
							new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
							return true
						} catch (a) {}
					}
				}
				return false
			}(),
			createPlayer: {
				markup: '          <div class="play-pause">             <p class="play"></p>             <p class="pause"></p>             <p class="loading"></p>             <p class="error"></p>           </div>           <div class="scrubber">             <div class="progress"></div>             <div class="loaded"></div>           </div>           <div class="time">             <em class="played">00:00</em><strong class="duration">0"</strong>           </div>           <div class="error-message"></div>',
				playPauseClass: "play-pause",
				scrubberClass: "scrubber",
				progressClass: "progress",
				loaderClass: "loaded",
				timeClass: "time",
				durationClass: "duration",
				playedClass: "played",
				errorMessageClass: "error-message",
				playingClass: "playing",
				loadingClass: "loading",
				errorClass: "error"
			},
			css: '    audio[controls] { display:none; }         .audiojs audio { position: absolute; left: -1px; }         .audiojs { display:inline-block; height: 30px;position:relative;width: 110px; border:1px solid #d2d2d2;border-radius:7px; background: #b8e6f7; overflow: hidden; font-family: monospace; font-size: 12px;  }         .audiojs .play-pause { width: 100%; height: 20px; padding: 4px 0px 4px 6px; margin: 0px; position:absolute;left:0; overflow: hidden;  }         .audiojs p { display: none; width: 25px; height: 20px; margin: 0px; cursor: pointer;    margin-top: 2px; }         .audiojs .play { display: block; }         .audiojs .scrubber {display:none; position: absolute; left: 38px;right:89px; background: #5a5a5a; height: 14px; margin: 10px; border-top: 1px solid #3f3f3f; border-left: 0px; border-bottom: 0px; overflow: hidden; }         .audiojs .progress { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #ccc; z-index: 1;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ccc), color-stop(0.5, #ddd), color-stop(0.51, #ccc), color-stop(1, #ccc));           background-image: -moz-linear-gradient(center top, #ccc 0%, #ddd 50%, #ccc 51%, #ccc 100%); }         .audiojs .loaded { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #000;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #222), color-stop(0.5, #333), color-stop(0.51, #222), color-stop(1, #222));           background-image: -moz-linear-gradient(center top, #222 0%, #333 50%, #222 51%, #222 100%); }         .audiojs .time {width:auto; position:absolute;left:10px; height: 30px; line-height: 30px; margin: 0px 0px 0px 6px; padding: 0px 6px 0px 12px; font-size:14px;color: #999;  }         .audiojs .time em { display:none; padding: 0px 2px 0px 0px; color: #f9f9f9; font-style: normal; }         .audiojs .time strong { padding: 0px 0px 0px 2px; font-weight: normal; }         .audiojs .error-message {  position: absolute; left: 38px;right:89px; display: none; margin: 0px 10px; height: 36px; width: 400px; overflow: hidden; line-height: 36px; white-space: nowrap; color: #fff;           text-overflow: ellipsis; -o-text-overflow: ellipsis; -icab-text-overflow: ellipsis; -khtml-text-overflow: ellipsis; -moz-text-overflow: ellipsis; -webkit-text-overflow: ellipsis; }         .audiojs .error-message a { color: #eee; text-decoration: none; padding-bottom: 1px; border-bottom: 1px solid #999; white-space: wrap; }                 .audiojs .play { background: url('+ playpng +') -2px -1px no-repeat; }         .audiojs .loading { background: url('+ loadinggif +') no-repeat; }         .audiojs .error { background: url("$1") -2px -61px no-repeat; }         .audiojs .pause { background: url('+ pausegif +') no-repeat; }                 .playing .play, .playing .loading, .playing .error { display: none; }         .playing .pause { display: block; }                 .loading .play, .loading .pause, .loading .error { display: none; }         .loading .loading { display: block; }                 .error .time, .error .play, .error .pause, .error .scrubber, .error .loading { display: none; }         .error .error { display: block; }         .error .play-pause p { cursor: auto; }         .error .error-message { display: block; }',
			trackEnded: function() {},
			flashError: function() {
				var b = this.settings.createPlayer,
					a = j(b.errorMessageClass, this.wrapper),
					c = 'Missing <a href="http://get.adobe.com/flashplayer/">flash player</a> plugin.';
				if (this.mp3) {
					c += ' <a href="' + this.mp3 + '">Download audio file</a>.'
				}
				g[h].helpers.removeClass(this.wrapper, b.loadingClass);
				g[h].helpers.addClass(this.wrapper, b.errorClass);
				a.innerHTML = c
				g[h].helpers.whenError();
			},
			loadError: function() {
				var b = this.settings.createPlayer,
					a = j(b.errorMessageClass, this.wrapper);
				g[h].helpers.removeClass(this.wrapper, b.loadingClass);
				g[h].helpers.addClass(this.wrapper, b.errorClass);
				a.innerHTML = 'Error loading: "' + this.mp3 + '"'
				g[h].helpers.whenError();
			},
			init: function() {
				g[h].helpers.addClass(this.wrapper, this.settings.createPlayer.loadingClass)
			},
			loadStarted: function() {
				var b = this.settings.createPlayer,
					a = j(b.durationClass, this.wrapper),
					c = Math.floor(this.duration / 60),
					d = Math.floor(this.duration % 60),
					e =  Math.floor(this.duration) + '"';
				g[h].helpers.removeClass(this.wrapper, b.loadingClass);
				//a.innerHTML = (c < 10 ? "0" : "") + c + ":" + (d < 10 ? "0" : "") + d
				//a.innerHTML = e;
			},
			showduration:function(){
				var a= this;
				var p=j(a.settings.createPlayer.durationClass, this.wrapper);
				if($(a.element).parents(".audiojs").parent().find("a[voiceTime]").length>0){
					p.innerHTML = $(a.element).parents(".audiojs").parent().find("a[voiceTime]").attr("voiceTime")+ '"';		
				}else{
					p.innerHTML = Math.round(a.element.duration) + '"';
					setTimeout(function(){a.settings.showduration.apply(a)},1000)
				}
				var time = parseInt(p.innerHTML)?parseInt(p.innerHTML):0;
				time = 60+time*2;
				$(this.wrapper).width(time>160?160:time);
			},
			loadProgress: function(b) {
				var a = this.settings.createPlayer,
					c = j(a.scrubberClass, this.wrapper);
				j(a.loaderClass, this.wrapper).style.width = c.offsetWidth * b + "px";
				/*var p=j(this.settings.createPlayer.durationClass, this.wrapper);
				p.innerHTML = Math.floor(this.duration) + '"';*/
			},
			playPause: function() {
				//var p=j(this.settings.createPlayer.durationClass, this.wrapper);
				//p.innerHTML = Math.floor(this.duration) + '"';
				this.playing ? this.settings.play() : this.settings.pause()
			},
			play: function() {
				g[h].helpers.addClass(this.wrapper, this.settings.createPlayer.playingClass)
			},
			pause: function() {
				g[h].helpers.removeClass(this.wrapper, this.settings.createPlayer.playingClass)
			},
			updatePlayhead: function(b) {
				var a = this.settings.createPlayer,
					c = j(a.scrubberClass, this.wrapper);
				j(a.progressClass, this.wrapper).style.width = c.offsetWidth * b + "px";
				a = j(a.playedClass, this.wrapper);
				/*c = this.duration * b;
				b = Math.floor(c / 60);
				c = Math.floor(c % 60);*/
				//a.innerHTML = (b < 10 ? "0" : "") + b + ":" + (c < 10 ? "0" : "") + c
				//a.innerHTML = Math.floor(this.duration) + '"';
				/*var p=j(this.settings.createPlayer.durationClass, this.wrapper);
				p.innerHTML = Math.floor(this.duration) + '"';*/
			}
		},
		create: function(b, a) {
			a = a || {};
			return b.length ? this.createAll(a, b) : this.newInstance(b, a)
		},
		createAll: function(b, a) {
			var c = a || document.getElementsByTagName("audio"),
				d = [];
			b = b || {};
			for (var e = 0, i = c.length; e < i; e++) {
				d.push(this.newInstance(c[e], b))
			}
			return d
		},
		newInstance: function(b, a) {
			var c = this.helpers.clone(this.settings),
				d = "audiojs" + this.instanceCount,
				e = "audiojs_wrapper" + this.instanceCount;
			this.instanceCount++;
			if (b.getAttribute("autoplay") != null) {
				c.autoplay = true
			}
			if (b.getAttribute("loop") != null) {
				c.loop = true
			}
			if (b.getAttribute("preload") == "none") {
				c.preload = false
			}
			a && this.helpers.merge(c, a);
			if (c.createPlayer.markup) {
				b = this.createPlayer(b, c.createPlayer, e)
			} else {
				b.parentNode.setAttribute("id", e)
			}
			e = new g[o](b, c);
			c.css && this.helpers.injectCss(e, c.css);
			if (c.useFlash && c.hasFlash) {
				this.injectFlash(e, d);
				this.attachFlashEvents(e.wrapper, e)
			} else {
				c.useFlash && !c.hasFlash && this.settings.flashError.apply(e)
			}
			if (!c.useFlash || c.useFlash && c.hasFlash) {
				this.attachEvents(e.wrapper, e)
			}
			
			e.settings.showduration.apply(e);
				
			return this.instances[d] = e
		},
		createPlayer: function(b, a, c) {
			var d = document.createElement("div"),
				e = b.cloneNode(true);
			d.setAttribute("class", "audiojs");
			d.setAttribute("className", "audiojs");
			d.setAttribute("id", c);
			if (e.outerHTML && !document.createElement("audio").canPlayType) {
				e = this.helpers.cloneHtml5Node(b);
				d.innerHTML = a.markup;
				d.appendChild(e);
				b.outerHTML = d.outerHTML;
				d = document.getElementById(c)
			} else {
				d.appendChild(e);
				d.innerHTML += a.markup;
				b.parentNode.replaceChild(d, b)
			}
			return d.getElementsByTagName("audio")[0]
		},
		attachEvents: function(b, a) {
			if (a.settings.createPlayer) {
				
				var c = a.settings.createPlayer,
					d = j(c.playPauseClass, b),
					e = j(c.scrubberClass, b);
				g[h].events.addListener(d, "click", function() {
					a.playPause.apply(a)
				});
				g[h].events.addListener(e, "click", function(i) {
					i = i.clientX;
					var f = this,
						k = 0;
					if (f.offsetParent) {
						do {
							k += f.offsetLeft
						} while (f = f.offsetParent)
					}
					a.skipTo((i - k) / e.offsetWidth)
				});
				if (!a.settings.useFlash) {
					g[h].events.trackLoadProgress(a);
					g[h].events.addListener(a.element, "timeupdate", function() {
						a.updatePlayhead.apply(a)
					});
					g[h].events.addListener(a.element, "ended", function() {
						a.trackEnded.apply(a)
					});
					g[h].events.addListener(a.source, "error", function() {
						clearInterval(a.readyTimer);
						clearInterval(a.loadTimer);
						a.settings.loadError.apply(a)
					})
				}

			}
		},
		attachFlashEvents: function(b, a) {
			a.swfReady = false;
			a.load = function(c) {
				a.mp3 = c;
				a.swfReady && a.element.load(c)
			};
			a.loadProgress = function(c, d) {
				a.loadedPercent = c;
				a.duration = d;
				a.settings.loadStarted.apply(a);
				a.settings.loadProgress.apply(a, [c])
			};
			a.skipTo = function(c) {
				if (!(c > a.loadedPercent)) {
					a.updatePlayhead.call(a, [c]);
					a.element.skipTo(c)
				}
			};
			a.updatePlayhead = function(c) {
				a.settings.updatePlayhead.apply(a, [c])
			};
			a.play = function() {
				if (!a.settings.preload) {
					a.settings.preload = true;
					a.element.init(a.mp3)
				}
				a.playing = true;
				a.element.pplay();
				a.settings.play.apply(a)
			};
			a.pause = function() {
				a.playing = false;
				a.element.ppause();
				a.settings.pause.apply(a)
			};
			a.setVolume = function(c) {
				a.element.setVolume(c)
			};
			a.loadStarted = function() {
				a.swfReady = true;
				a.settings.preload && a.element.init(a.mp3);
				a.settings.autoplay && a.play.apply(a)
			}
		},
		injectFlash: function(b, a) {
			var c = this.flashSource.replace(/\$1/g, a);
			c = c.replace(/\$2/g, b.settings.swfLocation);
			c = c.replace(/\$3/g, +new Date + Math.random());
			var d = b.wrapper.innerHTML,
				e = document.createElement("div");
			e.innerHTML = c + d;
			b.wrapper.innerHTML = e.innerHTML;
			b.element = this.helpers.getSwf(a)
		},
		helpers: {
			whenError:function(){
				
			},
			merge: function(b, a) {
				for (attr in a) {
					if (b.hasOwnProperty(attr) || a.hasOwnProperty(attr)) {
						b[attr] = a[attr]
					}
				}
			},
			clone: function(b) {
				if (b == null || typeof b !== "object") {
					return b
				}
				var a = new b.constructor,
					c;
				for (c in b) {
					a[c] = arguments.callee(b[c])
				}
				return a
			},
			addClass: function(b, a) {
				RegExp("(\\s|^)" + a + "(\\s|$)").test(b.className) || (b.className += " " + a)
			},
			removeClass: function(b, a) {
				b.className = b.className.replace(RegExp("(\\s|^)" + a + "(\\s|$)"), " ")
			},
			injectCss: function(b, a) {
				for (var c = "", d = document.getElementsByTagName("style"), e = a.replace(/\$1/g, b.settings.imageLocation), i = 0, f = d.length; i < f; i++) {
					var k = d[i].getAttribute("title");
					if (k && ~k.indexOf("audiojs")) {
						f = d[i];
						if (f.innerHTML === e) {
							return
						}
						c = f.innerHTML;
						break
					}
				}
				d = document.getElementsByTagName("head")[0];
				i = d.firstChild;
				f = document.createElement("style");
				if (d) {
					f.setAttribute("type", "text/css");
					f.setAttribute("title", "audiojs");
					if (f.styleSheet) {
						f.styleSheet.cssText = c + e
					} else {
						f.appendChild(document.createTextNode(c + e))
					}
					i ? d.insertBefore(f, i) : d.appendChild(styleElement)
				}
			},
			cloneHtml5Node: function(b) {
				var a = document.createDocumentFragment(),
					c = a.createElement ? a : document;
				c.createElement("audio");
				c = c.createElement("div");
				a.appendChild(c);
				c.innerHTML = b.outerHTML;
				return c.firstChild
			},
			getSwf: function(b) {
				b = document[b] || window[b];
				return b.length > 1 ? b[b.length - 1] : b
			}
		},
		events: {
			memoryLeaking: false,
			listeners: [],
			addListener: function(b, a, c) {
				if (b.addEventListener) {
					b.addEventListener(a, c, false)
				} else {
					if (b.attachEvent) {
						this.listeners.push(b);
						if (!this.memoryLeaking) {
							window.attachEvent("onunload", function() {
								if (this.listeners) {
									for (var d = 0, e = this.listeners.length; d < e; d++) {
										g[h].events.purge(this.listeners[d])
									}
								}
							});
							this.memoryLeaking = true
						}
						b.attachEvent("on" + a, function() {
							c.call(b, window.event)
						})
					}
				}
			},
			trackLoadProgress: function(b) {
				if (b.settings.preload) {
					var a, c;
					b = b;
					var d = /(ipod|iphone|ipad)/i.test(navigator.userAgent);
					a = setInterval(function() {
						if (b.element.readyState > -1) {
							d || b.init.apply(b)
						}
						if (b.element.readyState > 1) {
							b.settings.autoplay && b.play.apply(b);
							clearInterval(a);
							c = setInterval(function() {
								b.loadProgress.apply(b);
								b.loadedPercent >= 1 && clearInterval(c)
							})
						}
					}, 10);
					b.readyTimer = a;
					b.loadTimer = c
				}
			},
			purge: function(b) {
				var a = b.attributes,
					c;
				if (a) {
					for (c = 0; c < a.length; c += 1) {
						if (typeof b[a[c].name] === "function") {
							b[a[c].name] = null
						}
					}
				}
				if (a = b.childNodes) {
					for (c = 0; c < a.length; c += 1) {
						purge(b.childNodes[c])
					}
				}
			},
			ready: function() {
				return function(b) {
					var a = window,
						c = false,
						d = true,
						e = a.document,
						i = e.documentElement,
						f = e.addEventListener ? "addEventListener" : "attachEvent",
						k = e.addEventListener ? "removeEventListener" : "detachEvent",
						n = e.addEventListener ? "" : "on",
						m = function(l) {
							if (!(l.type == "readystatechange" && e.readyState != "complete")) {
								(l.type == "load" ? a : e)[k](n + l.type, m, false);
								if (!c && (c = true)) {
									b.call(a, l.type || l)
								}
							}
						},
						q = function() {
							try {
								i.doScroll("left")
							} catch (l) {
								setTimeout(q, 50);
								return
							}
							m("poll")
						};
					if (e.readyState == "complete") {
						b.call(a, "lazy")
					} else {
						if (e.createEventObject && i.doScroll) {
							try {
								d = !a.frameElement
							} catch (r) {}
							d && q()
						}
						e[f](n + "DOMContentLoaded", m, false);
						e[f](n + "readystatechange", m, false);
						a[f](n + "load", m, false)
					}
				}
			}()
		}
	};
	g[o] = function(b, a) {
		this.element = b;
		this.wrapper = b.parentNode;
		this.source = b.getElementsByTagName("source")[0] || b;
		this.mp3 = function(c) {
			var d = c.getElementsByTagName("source")[0];
			return c.getAttribute("src") || (d ? d.getAttribute("src") : null)
		}(b);
		this.settings = a;
		this.loadStartedCalled = false;
		this.loadedPercent = 0;
		this.duration = 1;
		this.playing = false
	};
	g[o].prototype = {
		updatePlayhead: function() {
			this.settings.updatePlayhead.apply(this, [this.element.currentTime / this.duration])
		},
		skipTo: function(b) {
			if (!(b > this.loadedPercent)) {
				this.element.currentTime = this.duration * b;
				this.updatePlayhead()
			}
		},
		load: function(b) {
			this.loadStartedCalled = false;
			this.source.setAttribute("src", b);
			this.element.load();
			this.mp3 = b;
			g[h].events.trackLoadProgress(this)
			
		},
		loadError: function() {
			this.settings.loadError.apply(this)
		},
		init: function() {
			this.settings.init.apply(this);

		},
		loadStarted: function() {
			if (!this.element.duration) {
				return false
			}
			this.duration = this.element.duration;
			this.updatePlayhead();
			this.settings.loadStarted.apply(this);
		},
		loadProgress: function() {
			if (this.element.buffered != null && this.element.buffered.length) {
				if (!this.loadStartedCalled) {
					this.loadStartedCalled = this.loadStarted()
				}
				this.loadedPercent = this.element.buffered.end(this.element.buffered.length - 1) / this.duration;
				this.settings.loadProgress.apply(this, [this.loadedPercent])
			}
		},
		playPause: function() {
			this.playing ? this.pause() : this.play()
		},
		play: function() {
			/(ipod|iphone|ipad)/i.test(navigator.userAgent) && this.element.readyState == 0 && this.init.apply(this);
			if (!this.settings.preload) {
				this.settings.preload = true;
				this.element.setAttribute("preload", "auto");
				g[h].events.trackLoadProgress(this)
			}
			this.playing = true;
			this.element.play();
			this.settings.play.apply(this)
		},
		pause: function() {
			this.playing = false;
			this.element.pause();
			this.settings.pause.apply(this)
		},
		setVolume: function(b) {
			this.element.volume = b
		},
		trackEnded: function() {
			this.skipTo.apply(this, [0]);
			this.settings.loop || this.pause.apply(this);
			this.settings.trackEnded.apply(this)
		}
	};
	var j = function(b, a) {
		var c = [];
		a = a || document;
		if (a.getElementsByClassName) {
			c = a.getElementsByClassName(b)
		} else {
			var d, e, i = a.getElementsByTagName("*"),
				f = RegExp("(^|\\s)" + b + "(\\s|$)");
			d = 0;
			for (e = i.length; d < e; d++) {
				f.test(i[d].className) && c.push(i[d])
			}
		}
		return c.length > 1 ? c : c[0]
	}
})("audiojs", "audiojsInstance", this);
module.exports = this.audiojs;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/*http://www.9client.com/ 021-4008837939*/
var uccCss = __webpack_require__ (5);
__webpack_require__ (12);
__webpack_require__ (41);
__webpack_require__ (0);
ucc = __webpack_require__(1);
pageLoad = __webpack_require__ (42);
__webpack_require__ (13);
__webpack_require__ (15);
__webpack_require__ (16);
__webpack_require__ (17);
__webpack_require__ (19);
__webpack_require__ (20);
__webpack_require__ (21);
__webpack_require__ (3);
__webpack_require__ (22);
__webpack_require__ (23);
__webpack_require__ (24);
__webpack_require__ (25);
__webpack_require__ (26);
__webpack_require__ (27);
__webpack_require__ (28);
__webpack_require__ (29);
__webpack_require__ (30);
__webpack_require__ (31);
__webpack_require__ (32);
__webpack_require__ (33);
__webpack_require__ (34);
__webpack_require__ (14);
__webpack_require__ (35);
__webpack_require__ (36);
__webpack_require__ (37);
__webpack_require__ (38);
__webpack_require__ (39);
__webpack_require__ (40);
__webpack_require__ (18);
__webpack_require__ (10);
__webpack_require__ (9);
__webpack_require__ (11);
__webpack_require__ (6);
__webpack_require__ (8);
__webpack_require__ (7);
;(function(window, $, undefined) {
	$(document).ready(function() {
		$("body").css("visibility","visible");
		pageLoad.done(function(){
      uccH5Event = $.uccH5Event();
      uccH5Logic = $.uccH5Logic();
      uccH5Init = $.uccH5Init();
			uccH5Init.initBasic();
			uccH5Init.initData().done(function(){
				uccH5Init.initFunc();
				if (!dialogue.islive()) {
					workTime.iswork();
				  if (workTime.type == 0) {
            uccH5Logic.loadScheme(); // 加载样式方案
				  } else {
            workTime.show();
				  }
				}
				uccH5Logic.initFace(); // 设置输入框字体
				uccH5Event.binds();
				uccH5Logic.viewFunc(); // 添加事件
				uccH5Init.initSatifaction();
				uccH5Init.initLocalHistory();
				uccH5Event.scrollToBottom();
				$("img[defsrc]").each(function(index, el) {
					$(this).attr("src", $(this).attr("defsrc"));
				});
			});
		})
	})
	setTimeout(function() {
		window.scrollTo(0, 1)
	}, 0);
})(window, jQuery);
/*http://www.9client.com/ 021-4008837939*/

/***/ }),
/* 50 */
/***/ (function(module, exports) {


var WebSocket = window.WebSocket || window.MozWebSocket;
function ReconnectingWebSocket(url, protocols, options) {

	// Default settings
	var settings = {

		/** Whether this instance should log debug messages. */
		debug: false,

		/** Whether or not the websocket should attempt to connect immediately upon instantiation. */
		automaticOpen: true,

		/** The number of milliseconds to delay before attempting to reconnect. */
		reconnectInterval: 1000,
		/** The maximum number of milliseconds to delay a reconnection attempt. */
		maxReconnectInterval: 30000,
		/** The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. */
		reconnectDecay: 1.5,

		/** The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. */
		timeoutInterval: 2000
	}
	if (!options) { options = {}; }

	// Overwrite and define settings with options if they exist.
	for (var key in settings) {
		if (typeof options[key] !== 'undefined') {
			this[key] = options[key];
		} else {
			this[key] = settings[key];
		}
	}

	// These should be treated as read-only properties

	/** The URL as resolved by the constructor. This is always an absolute URL. Read only. */
	this.url = url;

	/** The number of attempted reconnects since starting, or the last successful connection. Read only. */
	this.reconnectAttempts = 0;

	/**
	 * The current state of the connection.
	 * Can be one of: WebSocket.CONNECTING, WebSocket.OPEN, WebSocket.CLOSING, WebSocket.CLOSED
	 * Read only.
	 */
	this.readyState = WebSocket.CONNECTING;

	/**
	 * A string indicating the name of the sub-protocol the server selected; this will be one of
	 * the strings specified in the protocols parameter when creating the WebSocket object.
	 * Read only.
	 */
	this.protocol = null;

	// Private state variables

	var self = this;
	var ws;
	var forcedClose = false;
	var timedOut = false;
	var eventTarget = document.createElement('div');

	// Wire up "on*" properties as event handlers

	eventTarget.addEventListener('open',       function(event) { self.onopen(event); });
	eventTarget.addEventListener('close',      function(event) { self.onclose(event); });
	eventTarget.addEventListener('connecting', function(event) { self.onconnecting(event); });
	eventTarget.addEventListener('message',    function(event) { self.onmessage(event); });
	eventTarget.addEventListener('error',      function(event) { self.onerror(event); });

	// Expose the API required by EventTarget

	this.addEventListener = eventTarget.addEventListener.bind(eventTarget);
	this.removeEventListener = eventTarget.removeEventListener.bind(eventTarget);
	this.dispatchEvent = eventTarget.dispatchEvent.bind(eventTarget);

	/**
	 * This function generates an event that is compatible with standard
	 * compliant browsers and IE9 - IE11
	 *
	 * This will prevent the error:
	 * Object doesn't support this action
	 *
	 * http://stackoverflow.com/questions/19345392/why-arent-my-parameters-getting-passed-through-to-a-dispatched-event/19345563#19345563
	 * @param s String The name that the event should use
	 * @param args Object an optional object that the event will use
	 */
	function generateEvent(s, args) {
		var evt = document.createEvent("CustomEvent");
		evt.initCustomEvent(s, false, false, args);
		return evt;
	};

	this.open = function (reconnectAttempt) {
		ws = new WebSocket(self.url, protocols || []);

		if (!reconnectAttempt) {
			eventTarget.dispatchEvent(generateEvent('connecting'));
		}

		if (self.debug || ReconnectingWebSocket.debugAll) {
			console.debug('ReconnectingWebSocket', 'attempt-connect', self.url);
		}

		var localWs = ws;
		var timeout = setTimeout(function() {
			if (self.debug || ReconnectingWebSocket.debugAll) {
				console.debug('ReconnectingWebSocket', 'connection-timeout', self.url);
			}
			timedOut = true;
			localWs.close();
			timedOut = false;
		}, self.timeoutInterval);

		ws.onopen = function(event) {
			console.log("opened");
			clearTimeout(timeout);
			if (self.debug || ReconnectingWebSocket.debugAll) {
				console.debug('ReconnectingWebSocket', 'onopen', self.url);
			}
			self.protocol = ws.protocol;
			self.readyState = WebSocket.OPEN;
			self.reconnectAttempts = 0;
			var e = generateEvent('open');
			e.isReconnect = reconnectAttempt;
			reconnectAttempt = false;
			eventTarget.dispatchEvent(e);
		};

		ws.onclose = function(event) {
			clearTimeout(timeout);
			console.log("event.code:"+event.code);
			console.log(event.reason);
			if(!!event.code && (event.code =="1004"||event.code =="1005"||event.code =="1006"))forcedClose = true;
			ws = null;
			if (forcedClose) {
				self.readyState = WebSocket.CLOSED;
				var e = generateEvent('close');
				e.code = event.code;
				eventTarget.dispatchEvent(e);
			} else {
				self.readyState = WebSocket.CONNECTING;
				var e = generateEvent('connecting');
				e.code = event.code;
				e.reason = event.reason;
				e.wasClean = event.wasClean;
				eventTarget.dispatchEvent(e);
				if (!reconnectAttempt && !timedOut) {
					if (self.debug || ReconnectingWebSocket.debugAll) {
						console.debug('ReconnectingWebSocket', 'onclose', self.url);
					}
					eventTarget.dispatchEvent(generateEvent('close'));
				}

				var timeout = self.reconnectInterval * Math.pow(self.reconnectDecay, self.reconnectAttempts);
				setTimeout(function() {
					self.reconnectAttempts++;
					self.open(true);
				}, timeout > self.maxReconnectInterval ? self.maxReconnectInterval : timeout);
			}
		};
		ws.onmessage = function(event) {
			if (self.debug || ReconnectingWebSocket.debugAll) {
				console.debug('ReconnectingWebSocket', 'onmessage', self.url, event.data);
			}
			var e = generateEvent('message');
			e.data = event.data;
			eventTarget.dispatchEvent(e);
		};
		ws.onerror = function(event) {
			if (self.debug || ReconnectingWebSocket.debugAll) {
				console.debug('ReconnectingWebSocket', 'onerror', self.url, event);
			}
			eventTarget.dispatchEvent(generateEvent('error'));
		};
	}

	// Whether or not to create a websocket upon instantiation
	if (this.automaticOpen == true) {
		this.open(false);
	}

	/**
	 * Transmits data to the server over the WebSocket connection.
	 *
	 * @param data a text string, ArrayBuffer or Blob to send to the server.
	 */
	this.send = function(data) {
		if (ws) {
			if (self.debug || ReconnectingWebSocket.debugAll) {
				console.debug('ReconnectingWebSocket', 'send', self.url, data);
			}
			return ws.send(data);
		} else {
//			                throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
		}
	};

	/**
	 * Closes the WebSocket connection or connection attempt, if any.
	 * If the connection is already CLOSED, this method does nothing.
	 */
	this.close = function(code, reason) {
		// Default CLOSE_NORMAL code
		if (typeof code == 'undefined') {
			code = 1000;
		}
		console.log('debug: WebSocket closed. code=' + code);
		forcedClose = true;
		if (ws) {
			ws.close(code, reason);
		}
	};

	/**
	 * Additional public API method to refresh the connection if still open (close, re-open).
	 * For example, if the app suspects bad data / missed heart beats, it can try to refresh.
	 */
	this.refresh = function() {
		if (ws) {
			ws.close();
		}
	};
}

/**
 * An event listener to be called when the WebSocket connection's readyState changes to OPEN;
 * this indicates that the connection is ready to send and receive data.
 */
ReconnectingWebSocket.prototype.onopen = function(event) {};
/** An event listener to be called when the WebSocket connection's readyState changes to CLOSED. */
ReconnectingWebSocket.prototype.onclose = function(event) {};
/** An event listener to be called when a connection begins being attempted. */
ReconnectingWebSocket.prototype.onconnecting = function(event) {};
/** An event listener to be called when a message is received from the server. */
ReconnectingWebSocket.prototype.onmessage = function(event) {};
/** An event listener to be called when an error occurs. */
ReconnectingWebSocket.prototype.onerror = function(event) {};

/**
 * Whether all instances of ReconnectingWebSocket should log debug messages.
 * Setting this to true is the equivalent of setting all instances of ReconnectingWebSocket.debug to true.
 */
ReconnectingWebSocket.debugAll = false;

ReconnectingWebSocket.CONNECTING = WebSocket.CONNECTING;
ReconnectingWebSocket.OPEN = WebSocket.OPEN;
ReconnectingWebSocket.CLOSING = WebSocket.CLOSING;
ReconnectingWebSocket.CLOSED = WebSocket.CLOSED;

module.exports = ReconnectingWebSocket;

/***/ })
/******/ ]);