var H5APPEARANCE = function (options) {
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
H5APPEARANCE.prototype = {
  init: function () {
    this.initLoad()
  },
  initLoad: function () {
    if (this.options.title) {
      document.title = this.options.title
    }
    if (this.options.selectColor) {
      this.insertStyle('main .dialogue .contentMessage.dialogue-me .dialogue-c{background: ' + this.options.selectColor + '}')
    }
    if (this.options.backgroundImg) {
      this.insertStyle('#message {background: url(' + this.options.backgroundImg + ") no-repeat center;-webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover;background-size: cover; filter: progid: DXImageTransform.Microsoft.AlphaImageLoader( src='', sizingMethod='scale');-ms-filter: progid: DXImageTransform.Microsoft.AlphaImageLoader( src='', sizingMethod='scale');}")
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
  }
}
$.h5Appearance = function (options) {
  var h5Appearance = new H5APPEARANCE(options)
  h5Appearance.init()
  return h5Appearance
}
