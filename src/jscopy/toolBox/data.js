
(function (window, $, undefined) {
  var DATA = function (options) {
    this.defaults = {
      chatId: '',
      storage: null
    }, this.options = $.extend({}, this.defaults, options)
  }
  DATA.prototype = {
    list: {},
    get: function (k) {
      var storage = this.options.storage
      if (storage) {
        var data = storage.get('data')
        return data ? data[k] : data
      } else {
        var key = this.options.chatId + k
        return this.list[key] ? this.list[key] : null
      }
    },
    set: function (k, value) {
      var storage = this.options.storage
      if (storage) {
        var data = storage.get('data')
        data = data || {}
        data[k] = value
        storage.set('data', data)
      } else {
        var key = this.options.chatId + k
        this.list[key] = value
      }
    }
  }
  $.db = function (options) {
    var datas = new DATA(options)
    return datas
  }
})(window, jQuery)
