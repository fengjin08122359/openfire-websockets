params = require('./js/util/getParameter.js')
if(!!navigator.userAgent.match(/.*iphone.*|.*Linux.*|.*AppleWebKit.*Mobile.*/)){
  if(window.location.href.indexOf("pc.html")>-1){
    window.location.href=window.location.href.replace("pc.html","h5.html");
  }
  require ("./js/h5.js")
}else{
  if(window.location.href.indexOf("h5.html")>-1){
    window.location.href=window.location.href.replace("h5.html","pc.html");
  }
  require ("./js/pc.js")
}
if (params["debug"]==1) {
  require('./js/log/log.js')
  require('./js/log/log.css')
  debug = $.log({
    downloadJsp:"/any800/echat/downloadChat.jsp",
    css: "/any800/pagesJs/echatJs/load/tools/log.css"
  });
  $(document).ready(function () {
    debug.init();
    debug.show();
    document.querySelector('.logBox').addEventListener('touchmove', function(evt) {
      evt._isScroller = true;
    });
  })
}
