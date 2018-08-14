/*log.js 日志*/
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
;
var stringify=function(){function a(a){return/["\\\x00-\x1f]/.test(a)&&(a=a.replace(/["\\\x00-\x1f]/g,function(a){var b=e[a];return b?b:(b=a.charCodeAt(),"\\u00"+Math.floor(b/16).toString(16)+(b%16).toString(16))})),'"'+a+'"'}function b(a){var b,c,d,e=["["],f=a.length;for(c=0;f>c;c++)switch(d=a[c],typeof d){case"undefined":case"function":case"unknown":break;default:b&&e.push(","),e.push(stringify(d)),b=1}return e.push("]"),e.join("")}function c(a){return 10>a?"0"+a:a}function d(a){return'"'+a.getFullYear()+"-"+c(a.getMonth()+1)+"-"+c(a.getDate())+"T"+c(a.getHours())+":"+c(a.getMinutes())+":"+c(a.getSeconds())+'"'}var e={"\b":"\\b","       ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};return function(c){switch(typeof c){case"undefined":return"undefined";case"number":return isFinite(c)?String(c):"null";case"string":return a(c);case"boolean":return String(c);default:if(null===c)return"null";if(c instanceof Array)return b(c);if(c instanceof Date)return d(c);var e,f,g=["{"],h=stringify;for(var i in c)if(Object.prototype.hasOwnProperty.call(c,i))switch(f=c[i],typeof f){case"undefined":case"unknown":case"function":break;default:e&&g.push(","),e=1,g.push(h(i)+":"+h(f))}return g.push("}"),g.join("")}}}();
if(/* @cc_on!@ */0){
    JSON = {
       parse: function(b) {
         return (new Function("return " + b))()
       },
       stringify: stringify
    };
  }else{
    JSON = {
        parse: window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON &&
            function(str) {
                return String(str).evalJSON();
            } || $.parseJSON || $.evalJSON,
        stringify: Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || stringify
    };
  };
  Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	};
	if(typeof Object.getOwnPropertyNames=="undefined"){
		Object.getOwnPropertyNames = function(item){
			var arr = [];
			for(var i in item){
				arr.push(i);
			}
			return arr;
		}
	}
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
    };
    $.arrayUnique = function (th) {
	  var n = []; //一个新的临时数组
	  for(var i = 0; i < th.length; i++) //遍历当前数组
	  {
	    if(n.indexOf(th[i]) == -1) n.push(th[i]);
	  }
	  return n;
	}; 
	if(typeof console =="undefined"){
		console = {};
		console.log=function(e){};
		console.warn=function(e){};
		console.error=function(e){};
		console.debug=function(e){};
	};
	function HTMLDecode(text) {
	    var temp = document.createElement("div");
	    temp.innerHTML = text;
	    var output = temp.innerText || temp.textContent;
	    temp = null;
	    return output;
	};
	function HTMLEncode(html) {
	    var temp = document.createElement("div");
	    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
	    var output = temp.innerHTML;
	    temp = null;
	    return output;
	};
	(function($) {
    $.fn.jqDrag = function(h) {
      return i(this, h, 'd');
    };
    $.fn.jqResize = function(h) {
      return i(this, h, 'r');
    };
    $.jqDnR = {
      dnr : {},
      e : 0,
      drag : function(v) {
        if (M.k == 'd')
          E.css( {
            left : M.X + (v.pageX || v.originalEvent.touches[0].pageX || 0) - M.pX,
            top : M.Y + (v.pageY || v.originalEvent.touches[0].pageY || 0) - M.pY
          });
        else
          E.css( {
            width : Math.max(v.pageX - M.pX + M.W, 0),
            height : Math.max(v.pageY - M.pY + M.H, 0)
          });
        var event = arguments[0]||window.event;
        if( event.stopPropagation ) { event.stopPropagation(); } //For 'Good' browsers
        else { event.cancelBubble = true; } //For IE
        return false;
      },
      stop : function() {
        E.removeClass("transparent");
        $(this).unbind('touchmove mousemove', J.drag).unbind('touchend mouseup', J.stop);
      }
    };
    var J = $.jqDnR, M = J.dnr, E = J.e, i = function(e, h, k) {
      return e.each(function() {
        h = (h) ? $(h, e) : e;
        h.bind('touchstart mousedown', {
          e : e,
          k : k
        }, function(v) {
          var d = v.data, p = {};
          E = d.e;
          if (E.css('position') != 'relative') {
            try {
              E.position(p);
            } catch (e) {
            }
          }
          M = {
            X : p.left || f('left') || 0,
            Y : p.top || f('top') || 0,
            W : f('width') || E[0].scrollWidth || 0,
            H : f('height') || E[0].scrollHeight || 0,
            pX : (v.pageX || v.originalEvent.touches[0].pageX || 0),
            pY : (v.pageY || v.originalEvent.touches[0].pageY || 0),
            k : d.k,
            o : E.css('opacity')
          };
//          E.css( {
//            opacity : 0.8
//          });
          E.addClass("transparent");
          $(this).on("touchmove mousemove",$.jqDnR.drag).on("touchend mouseup",$.jqDnR.stop);
          var event = arguments[0]||window.event;
          if( event.stopPropagation ) { event.stopPropagation(); } //For 'Good' browsers
          else { event.cancelBubble = true; } //For IE
          return false;
        });
      });
    }, f = function(k) {
      return parseInt(E.css(k)) || false;
    };
  })(jQuery);
(function(window, $, undefined) {
	var LOG = function(options) {
		this.defaults = {
		    bgColor: 'rgba(0,0,0,0.3)',
		    time:2,
		    maxLength:100000,
		    downloadJsp:"",
		    css:""
		},
		this.options = $.extend({}, this.defaults, options)
	};
	LOG.prototype = {
		index:0,
		control:0,zoom:1,close:0,
		logArray:[],
		from:["all"],
		curFrom:0,
		init:function(){
		  this.insertStyle(".logBox{position:fixed;top:0;left:0;width:60%;height:60%;background:#fff;border:1px solid #000;border-radius:5px;z-index:1000000;display:none;cursor:move}.logBox .tools{position:absolute;top:0;width:80%;height:20px;margin:10px 10%}.logBox .list{position:absolute;top:40px;width:100%;bottom:0;overflow-x:hidden;overflow-y:auto;word-break:break-all}.logBox .tools span{width:20%;box-sizing:border-box;display:inline-block;text-align:center;line-height:20px;background:#e1e1e1;cursor:pointer}.logBoxcol{background:#333;color:#fff}.logBoxcol:nth-child(even){background:#fff;color:#333}")
			var l =this;
	  		$(window).error(function(msg, url, line){
	  			if(msg && msg.originalEvent){
	  				console.log("错误信息：" , msg.originalEvent.message);
	  		       console.log("出错文件：" , msg.originalEvent.filename);
	  		       console.log("出错行号：" , msg.originalEvent.lineno);
	  		       console.log("出错列号：" , msg.originalEvent.colno);
	  			}
	  		});
			if($(".logBox").length>0)return;
			$("body").append("<div class='logBox'></div>");
			$(".logBox").append("<div class='tools'><span class='control'>暂停</span><span class='zoom'>缩小</span><span class='from'>all</span><span class='copy'>导出</span><span class='closebtn'>关闭</span></div><div class='list'></div>");
			$('.logBox').jqDrag();
			$(".logBox .tools .control").on("click",function(){
				if(l.control==0){
					l.control = 1;
					$(".logBox .tools .control").html("开始");
				}else{
					$(".logBox .tools .control").html("暂停");
					l.control = 0;
					l.reuse();
				}
			})
			$(".logBox .tools .zoom").on("click",function(){
				if(l.zoom==0){
					l.zoom = 1;
					$(".logBox .tools .zoom").html("缩小");
					$(".logBox").height("60%");
					$(".logBox").width("60%");
				}else{
					$(".logBox .tools .zoom").html("放大");
					l.zoom = 0;
					$(".logBox").width("300px");
					$(".logBox").height("40px");
				}
			})
			$(".logBox .tools .copy").on("click",function(){
				l.saveAsFile();
			})
			$(".logBox .tools .from").on("click",function(){
				l.curFrom = (l.curFrom+1)%l.from.length;
				$(this).html(l.from[l.curFrom]);
				l.reuse();
			})
			$(".logBox .tools .closebtn").on("click",function(){
				l.hide();
			})
			if(getParameter()["debug"]=="0" || getParameter()["debug"]=="1"){
				this.show();
			}
			if(getParameter()["debug"]!="0" && getParameter()["debug"]!="2"){
				console.log = function () {
				    var s = [];
				    for (var i = 0; i < arguments.length; i++) {
				    	if((typeof arguments[i]).toLowerCase() == "object"){

				    	}else if((typeof arguments[i]).toLowerCase() == "boolean"||(typeof arguments[i]).toLowerCase() == "number"||(typeof arguments[i]).toLowerCase() == "string"){
				    		s.push(arguments[i]);
				    	}
				    }
				    l.log("log",s.length==1?s:JSON.stringify(s));
				};
				console.warn = function () {
				    var s = [];
				    for (var i = 0; i < arguments.length; i++) {
				    	if((typeof arguments[i]).toLowerCase() == "object"){

				    	}else if((typeof arguments[i]).toLowerCase() == "boolean"||(typeof arguments[i]).toLowerCase() == "number"||(typeof arguments[i]).toLowerCase() == "string"){
				    		s.push(arguments[i]);
				    	}
				    }
				    l.log("warn",s.length==1?s:JSON.stringify(s));
				};
				console.error = function () {
				    var s = [];
				    for (var i = 0; i < arguments.length; i++) {
				    	if((typeof arguments[i]).toLowerCase() == "object"){

				    	}else if((typeof arguments[i]).toLowerCase() == "boolean"||(typeof arguments[i]).toLowerCase() == "number"||(typeof arguments[i]).toLowerCase() == "string"){
				    		s.push(arguments[i]);
				    	}
				    }
				    l.log("error",s.length==1?s:JSON.stringify(s));
				};
				console.debug = function () {
				    var s = [];
				    for (var i = 0; i < arguments.length; i++) {
				    	if((typeof arguments[i]).toLowerCase() == "object"){
				    		s.push(JSON.stringify(arguments[i]));
				    	}else{
				    		s.push(arguments[i]);
				    	}
				    }
				    l.log("debug",s.length==1?s:JSON.stringify(s));
				};
			}
		},
		log:function(from,e){
			var time = new Date().Format("hh:mm:ss");
			var text = time+" "+from+" "+e+" time:"+new Date().getTime();
			try{
				text = decodeURIComponent(decodeURIComponent(HTMLEncode(text)));
			}catch(ex){}
			this.addCategory(from);
			this.logArray.push({time:time,from:from,text:HTMLEncode(text)});
			if(this.logArray.length>this.options.maxLength){
				this.logArray.shift();
			}
			if(this.control==0 && this.close==1 && this.curShow(from)){
				$(".logBox .list").append('<div class="logBoxcol">'+HTMLEncode(text)+'</div>');
				$('.logBox .list')[0].scrollTop = $('.logBox .list')[0].scrollHeight;
			}
		},
		reuse:function(){
			var l = this;
			$(".logBox .list").html("");
			for(var i=0,len=l.logArray.length;i<len;i++){
				if(l.curShow(l.logArray[i].from)){
					$(".logBox .list").append('<div class="logBoxcol">'+l.logArray[i].text+'</div>');
				}
			}
		},
		addCategory:function(from){
			var l = this;
			l.from =  $.arrayUnique(l.from.concat(from));
		},
		curShow:function(from){
			var l = this;
			return l.from[l.curFrom] == from ||l.from[l.curFrom] =="all";
		},
		hide:function(){
			if(this.close==1){
				this.close = 0;
				$(".logBox").hide();
			}
		},
		show:function(){
			if(this.close==0){
				this.close = 1;
				$(".logBox").show();
				this.reuse();
			}
		},saveAsFile:function(){
			var l = this;
			var htmlChatContent = this.getChatContent();
		      htmlChatContent = encodeURIComponent(htmlChatContent);
		      var iframe; // 生成iframe.
		      if (window.frames && window.frames['downloadFrame']) {} else {
		        try {
		          iframe = document.createElement('<iframe name="downloadFrame" style="display:none;">');
		        } catch (ex) {
		          iframe = document.createElement('iframe');
		          iframe.style = 'display:none;';
		          iframe.setAttribute("style", "display:none;");
		        }
		        iframe.id = 'downloadFrame';
		        iframe.name = 'downloadFrame';
		        iframe.width = 0;
		        iframe.height = 0;
		        iframe.marginHeight = 0;
		        iframe.marginWidth = 0;

		        var objBody = document.getElementsByTagName("body").item(0);
		        objBody.insertBefore(iframe, objBody.firstChild);
		      }
		      var formObj;
		      if ($("#downloadForm").length > 0) {
		        formObj = $("#downloadForm")[0];
		      } else {
		        formObj = document.createElement("form");
		        var formMethod = "post";
		        formObj.setAttribute("method", formMethod);
		        formObj.setAttribute("name", "downloadForm");
		        formObj.setAttribute("id", "downloadForm");
		        formObj.setAttribute("action", l.options.downloadJsp);
		        formObj.setAttribute("target", "downloadFrame");
		      }
		      var inputHiddenObj;
		      if ($("#htmlContent").length > 0) {
		        inputHiddenObj = $("#htmlContent")[0];
		      } else {
		        inputHiddenObj = document.createElement("input");
		        inputHiddenObj.setAttribute("type", "hidden");
		        inputHiddenObj.setAttribute("name", 'htmlContent');
		        inputHiddenObj.setAttribute("id", 'htmlContent');
		      }
		      inputHiddenObj.setAttribute("value", htmlChatContent);
		      formObj.appendChild(inputHiddenObj);
		      var tmpObjBody = document.getElementsByTagName("body").item(0);
		      tmpObjBody.insertBefore(formObj, tmpObjBody.firstChild);
		      formObj.submit();
		},getChatContent:function(){
			var l =this;
			var htmlChat = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>日志记录</title>';
		      htmlChat += "<link type='text/css' rel='stylesheet' href='" + l.options.css + "'/></head><body style='visibility: visible;'>";
		      htmlChat += $(".logBox .list").html()
		      htmlChat += "</body></html>";
		      return htmlChat;
		},insertStyle: function (str) {
	    var nod = document.createElement("style");  
	    nod.type="text/css";  
	    if(nod.styleSheet){         
	      nod.styleSheet.cssText = str;  
	    } else {  
	      nod.innerHTML = str;       
	    }  
	    document.getElementsByTagName("head")[0].appendChild(nod); 
	  }
	}
	$.log = function(options) {
		var log = new LOG(options);
		return log;
	}
})(window, jQuery);