/* sensitive.js 敏感词过滤 */

(function (window, $, undefined) {
  var SENSITIVE = function (options) {
    this.defaults = {
      vocabulary: {}
    }, this.options = $.extend({}, this.defaults, options)
  }
  SENSITIVE.prototype = {
    get: function (msg) {
      var word = msg
      var vocabulary = this.options.vocabulary
      if (!!vocabulary && !!vocabulary.content) {
        if (vocabulary.isVisable == 1) {
          var aTxtContent = vocabulary.content.split(':')
          for (var i = 0; i < aTxtContent.length; i++) {
            if (aTxtContent[i]) {
              for (var a = 0; a <= word.length; a++) {
                word = word.replace(aTxtContent[i], '*')
              }
            }
          }
        }
      }
      return word
    }
  }
  $.sensitive = function (options) {
    var sensitive = new SENSITIVE(options)
    return sensitive
  }
})(window, jQuery)
