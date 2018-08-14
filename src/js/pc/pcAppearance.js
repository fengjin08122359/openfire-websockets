var PCAPPEARANCE = function (options) {
  this.defaults = {
    title: '',
    titleLink: '',
    logo: '',
    selectColor: '',
    langType: '1',
    visitorIco: '',
    clientIco: '',
    robotIco: '',
    backgroundImg: '',
    toolsSelect: [],
    tabConfig: {
      type: '',
      link: '',
      name: ''
    }
  }, this.options = $.extend({}, this.defaults, options)
}
PCAPPEARANCE.prototype = {
  init: function () {
    this.initLoad()
    this.switchTools()
    this.createTab()
  },
  initLoad: function () {
    if (this.options.title) {
      document.title = this.options.title
    }
    if (this.options.titleLink) {
      $('.top .gap>a').attr('href', this.options.titleLink)
    }
    if (this.options.logo) {
      $('.top .gap>a>img').attr('defsrc', this.options.logo).attr('src', this.options.logo)
    }
    if (this.options.selectColor) {
      this.insertStyle('.dialogue-me .dialogue-in-c{background: ' + this.options.selectColor + '}')
    }
    if (this.options.backgroundImg) {
      this.insertStyle('.dialogue-record-c {background: url(' + this.options.backgroundImg + ") no-repeat center;-webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover;background-size: cover; filter: progid: DXImageTransform.Microsoft.AlphaImageLoader( src='', sizingMethod='scale');-ms-filter: progid: DXImageTransform.Microsoft.AlphaImageLoader( src='', sizingMethod='scale');}")
    }
  },
  insertStyle: function (str) {
    var nod = document.createElement('style')
    nod.type = 'text/css'
    if (nod.styleSheet) {
      nod.styleSheet.cssText = str
    } else {
      nod.innerHTML = str
    }
    document.getElementsByTagName('head')[0].appendChild(nod)
  },
  switchTools: function () {
    if (this.options.toolsSelect && this.options.toolsSelect.length > 0) {
      // ucc.buttonList = [];
    }
  },
  createTab: function () {
    tab = $('.tab_info').tab({
      relatedEl: $('.dialogue')
    })
    var tabConfig = this.options.tabConfig
    if (tabConfig) {
      tab.add('2', tabConfig.name, './swiper.html')
    }
  }
}
$.pcAppearance = function (options) {
  var pcAppearance = new PCAPPEARANCE(options)
  pcAppearance.init()
  return pcAppearance
}
