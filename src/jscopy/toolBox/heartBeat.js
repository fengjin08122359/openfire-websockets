/* heartBeat.js 心跳机制 */
(function (window, $, undefined) {
  var HEARTBEAT = function (options) {
    this.defaults = {
      detectWeb: function () {}
    }, this.options = $.extend({}, this.defaults, options)
  }
  HEARTBEAT.prototype = {
    beatInterval: null,
    beatTimeout: null,
    json: {},
    init: function (json) {
      //      this.json = json;
      //      this.startBeatTimeout(json);
      //      this.json = json;
      //      clearInterval(this.beatInterval);
      //      this.beatInterval = null;
      //      this.beatInterval = setInterval(function() {
      //        $.ajax({
      //          url: './echat.do',
      //          type: 'POST',
      //          dataType: 'html',
      //          data: {
      //            method: "beat",
      //            businessId: json.businessId,
      //            chatId: json.chatId
      //          },
      //        })
      //      }, 1000)

    },
    startBeatTimeout: function (json) {
      //      var beat = this;
      //      if (beat.beatTimeout) {
      //        clearTimeout(beat.beatTimeout);
      //      }
      //      beat.beatTimeout = window.setTimeout(function() {
      //        $.ajax({
      //          url: './echat.do',
      //          type: 'POST',
      //          dataType: 'html',
      //          data: {
      //            method: "beat",
      //            businessId: json.businessId,
      //            chatId: json.chatId
      //          },
      //        }).always(function() {
      //          if (beat.beatTimeout) {
      //            beat.startBeatTimeout(json);
      //          }
      //        }).fail(function() {
      //          beat.options.detectWeb();
      //        })
      //      }, 1000);
    },
    end: function () {
      //      clearInterval(this.beatInterval);
      //      this.beatInterval = null;
      //      if (this.beatTimeout) {
      //        clearTimeout(this.beatTimeout);
      //      }
      //      this.beatTimeout = null;
      //      $.ajax({
      //        url: './echat.do',
      //        type: 'POST',
      //        dataType: 'html',
      //        data: {
      //          method: "removeBeat",
      //          businessId: this.json.businessId,
      //          chatId: this.json.chatId
      //        },
      //      })
    }
  }
  $.heartBeat = function (options) {
    var heartBeat = new HEARTBEAT(options)
    return heartBeat
  }
})(window, jQuery)
