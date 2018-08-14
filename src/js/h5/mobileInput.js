var OS= (function(navigator, userAgent, platform, appVersion){
  var detect = {}
  detect.webkit = userAgent.match(/WebKit\/([\d.]+)/) ? true : false
  detect.ipod = /iPod/i.test(platform) || userAgent.match(/(iPod).*OS\s([\d_]+)/) ? true : false
  detect.ipad = /iPad/i.test(navigator.userAgent) || userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false
  detect.iphone = /iPhone/i.test(platform) || !detect.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false
  detect.mac = /Mac/i.test(platform)
  detect.ios = detect.ipod || detect.ipad || detect.iphone
  detect.safari = userAgent.match(/Safari/) && !detect.chrome ? true : false
  detect.mobileSafari = detect.ios && !!appVersion.match(/(?:Version\/)([\w\._]+)/)
  if (detect.ios) detect.iosVersion = parseFloat(appVersion.slice(appVersion.indexOf("Version/") + 8)) || -1
  return detect
})(navigator, navigator.userAgent, navigator.platform, navigator.appVersion || navigator.userAgent);
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
adjustHeight:0,
  init: function() {
    $("html").css({
      position: "absolute",
      top: 0,
      left: 0,
      width:"100%",
      height: "100%"
    });
    this.setAdjustHeight();
    this.width = $("html").width();
    this.height = $("html").height();
    this.scrollTop = document.body.scrollTop;
  },
  setAdjustHeight:function(){
    if (OS.mobileSafari && OS.iosVersion < 12) {
      this.adjustHeight = 40;
    }
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
    if(OS.iosVersion <= 10){
      m.checkInterval = setInterval(function(){
        if($("body")[0].scrollTop<$("body")[0].scrollHeight && $("body")[0].scrollTop!=0){
          $("html").css({
              top:$("body")[0].scrollTop,
              height:$("body")[0].scrollHeight-$("body")[0].scrollTop
            });
          window.scrollTo(0, 99999);
        }else if($("body")[0].scrollTop==0){
          $("html").css({
            top:0,
            height:"100%"
          });
        }
     },600)
    }else{
      m.checkInterval = setInterval(function(){
         m.checkIphoneFun();
      },300)
    }
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
      h = Math.max(h,this.height/2-this.adjustHeight);
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
              height:(this.height-m.samples[0].scrollY-this.adjustHeight)
            });
             window.scrollTo(0, m.samples[0].scrollY);
          }
        }else{
          m.samples[0].type=4;
          $("html").css({
          top:0,
          width:"100%",
          height:this.height-this.adjustHeight
        });
          document.body.scrollTop = 0;
        }
    }else if(m.samples.length==2){
      var ppheight = m.samples[1].scHeight-m.samples[1].scrollY ;
      var sctop = -Math.abs(m.samples[1].scrollY);
      var h = Math.min(ppheight,this.height/2);
      h = Math.max(h,this.height/2-this.adjustHeight);
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
//        else if(m.samples[0].height!=m.samples[1].height){
//          //document.body.scrollTop = 0;
//        }
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
//      if(params["debug"]==1){
      m.checkIphoneFunV3();
      return;
//      }
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