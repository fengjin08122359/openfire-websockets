/* tab.js 右侧分栏 */
var titleSpan = "<span data-index='$index' data-tab='$tab' >$title<i></i></span>"
var iframeSpan = "<div data-index='$index' class='iframe'><iframe src='$url' frameborder='0' scrolling='scroll'></iframe></div>"
var TAB = function (el, options) {
  this.$el = el
  this.defaults = {
    relatedEl: null
  }, this.options = $.extend({}, this.defaults, options)
}
TAB.prototype = {
  current: 0,
  data: [],
  init: function () {
    var t = this
    t.resize()
    t.$el.find('.tab_title').delegate('span', 'click', function () {
      t.current = $(this).data('index')
      $(this).addClass('active')
      $(this).siblings().removeClass('active')
      var iframe = t.$el.find(".tab_main .iframe[data-index='" + t.current + "']")
      iframe.addClass('active')
      iframe.siblings().removeClass('active')
    })
    t.$el.find('.tab_title').delegate('span i', 'click', function () {
      var index = $(this).parent().data('index')
      t.remove(index)
    })
    $(window).resize(function (event) {
      t.resize()
    })
  },
  add: function (tab, text, url) {
    var t = this
    var index = t.data.length
    if (t.$el.find(".tab_title span[data-tab='" + tab + "']").length == 0) {
      t.data[index] = tab
      t.$el.find('.tab_title').append(titleSpan.replace(/\$title/g, text).replace(/\$index/g, index).replace(/\$tab/g, tab))
      t.$el.find('.tab_main').append(iframeSpan.replace(/\$url/g, url).replace(/\$index/g, index))

      if (tab == 1 || tab == 2) {
        t.$el.find('.tab_title span').last().find('i').remove()
      }
      t.current = index
      t.$el.find(".tab_title span[data-index='" + index + "']").click()
    } else {
      t.$el.find(".tab_title span[data-tab='" + tab + "']").click()
    }
    t.resize()
  },
  resize: function () {
    var t = this
    if (t.$el.find('.tab_title span').length == 0) {
      t.$el.css('width', 0)
      t.options.relatedEl.css('right', 0)
    } else if ($('body').width() > 900) {
      t.$el.css('width', '486px')
      t.options.relatedEl.css('right', '486px')
    } else if ($('body').width() > 768) {
      t.$el.css('width', '430px')
      t.options.relatedEl.css('right', '430px')
    } else {
      t.$el.css('width', 0)
      t.options.relatedEl.css('right', 0)
    }
  },
  remove: function (index) {
    var t = this
    var $this = t.$el.find(".tab_title span[data-index='" + index + "']")
    var next = $this.prev().length > 0 ? $this.prev() : $this.next()
    $this.remove()
    t.$el.find(".tab_main .iframe[data-index='" + index + "']").remove()
    if (next && next.length > 0) {
      next.click()
    }
    t.resize()
  }
}
$.fn.tab = function (options) {
  var tab = new TAB($(this), options)
  tab.init()
  return tab
}
