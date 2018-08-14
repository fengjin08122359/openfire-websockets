var ucc = require('../util/uccData.js')
var appData = require('../util/appData.js')
var SETSKIN = function (options) {
  this.defaults = {
    aDset: {
      vcwTitleZhcn: 'UCC访客端界面',
      vcwLftAdZhcn: ucc.baseUrl + '/style/images/echat/ad.html',
      vcwLogoZhcn: ucc.baseUrl + '/style/css/images/ucc-logo.png'
    }
  }
  this.options = {
    aDset: {
      vcwTitleZhcn: options.aDset.vcwTitleZhcn ? options.aDset.vcwTitleZhcn : this.defaults.aDset.vcwTitleZhcn,
      vcwLftAdZhcn: options.aDset.vcwLftAdZhcn ? options.aDset.vcwLftAdZhcn : this.defaults.aDset.vcwLftAdZhcn,
      vcwLogoZhcn: options.aDset.vcwLogoZhcn ? options.aDset.vcwLogoZhcn : this.defaults.aDset.vcwLogoZhcn
    }
  }
}
SETSKIN.prototype = {
  setTitle: function () {},
  setTab: function () {
    // tab.add('2', '简介', this.options.aDset.vcwLftAdZhcn)
  }
}
$.setSkin = function (options) {
  var setSkin = new SETSKIN(options)
  return setSkin
}
