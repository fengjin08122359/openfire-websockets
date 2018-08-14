require('./swiper/idangerous.swiper.min.js')
require('./swiper/idangerous.swiper.css')
require('./swiper/index.css')
require('./js/jquery-1.7.2.min.js')
require('./js/util/base.js')
var ajax = require('./js/util/ajax.js')

ajax.getPcAppearance().done(function(data){
  if(data.tabConfig){
    if(data.tabConfig.type=="swiper"){
      var swiper = new Swiper('.swiper-container',{
        autoplay : 3000,//可选选项，自动滑动
        loop : true,//可选选项，开启循环
      })
      for (var i = 0, len = data.tabConfig.list.length;i < len;i++){
        swiper.appendSlide('<img src="'+ data.tabConfig.list[i].link +'">','swiper-slide','div')
      }
    }else if(data.tabConfig.type=="web"){
      $(".swiper-container .swiper-wrapper").append('<img src="'+ data.tabConfig.link +'">')
    }
    
  }
})