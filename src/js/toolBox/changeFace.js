/* changeFace.js 转换表情 */

(function (window, $, undefined) {
  var arrEntities = {
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'amp': '&',
    'quot': '"'
  }
  var imgIco = [
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face01.png" data-name="/::)" id="/::)">', '/::)', '/::\\)'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face02.png" id="/::P" data-name="/::P">', '/::P', '/::P'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face03.png" id="/::$" data-name="/::$">', '/::$', '/::\\$'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face04.png" id="/::D" data-name="/::D">', '/::D', '/::D'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face05.png" id="/::-|" data-name="/::-|">', '/::-|', '/::\\-\\|'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face06.png" id="/::+" data-name="/::+">', '/::+', '/::\\+'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face07.png" id="/:,@-D"  data-name="/:,@-D">', '/:,@-D', '/:,@\\-D'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face08.png" id="/::>" data-name="/::>">', '/::>', '/::\\>'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face09.png" id="/:,@f" data-name="/:,@f">', '/:,@f', '/:,@f'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face10.png" id="/:?" data-name="/:?">', '/:?', '/:\\?'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face11.png" id="/:bye" data-name="/:bye">', '/:bye', '/:bye'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face12.png" id="/:handclap" data-name="/:handclap">', '/:handclap', '/:handclap'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face13.png" id="/::*" data-name="/::*">', '/::*', '/::\\*'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face14.png" id="/:strong" data-name="/:strong">', '/:strong', '/:strong'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face15.png" id="/:P-(" data-name="/:P-(">', '/:P-(', '/:P\\-\\('],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face16.png" id="/:rose" data-name="/:rose">', '/:rose', '/:rose'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face17.png" id="/:share" data-name="/:share">', '/:share', '/:share'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face18.png" id="/:ok" data-name="/:ok">', '/:ok', '/:ok'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face19.png" id="/:sun"  data-name="/:sun">', '/:sun', '/:sun'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face20.png" id="/:heart" data-name="/:heart">', '/:heart', '/:heart'],
    ['<img emotions="true" name="faceIco" src="/any800/style/images/mobileImages/newImages/face21.png" id="/:hug" data-name="/:hug">', '/:hug', '/:hug']
  ]
  var CHANGEFACE = function (options) {
    this.defaults = {
      imgIco: [],
      after: function () {

      }
    }, this.options = $.extend({}, this.defaults, options)
  }
  CHANGEFACE.prototype = {
    init: function () {
      this.options.imgIco = imgIco
      this.options.after()
    },
    getItems: function () {
      return imgIco
    },
    imgToIco: function (html) {
      var ht = html
      if (!ht || typeof html !== 'string') {
        return ht
      }
      ht = ht.replace(/&(lt|gt|amp|quot);/ig, function (all, t) {
        return arrEntities[t]
      })
      var $h = $('<div>' + html + '</div>')
      for (var i in imgIco) {
        $h.find("img[data-name='" + imgIco[i][1] + "']").each(function (e) {
          $(this).replaceWith(imgIco[i][1])
        })
      }
      ht = $h.html()
      return ht
    },
    icoToImg: function (html) {
      var ht = html
      if (!ht || typeof html !== 'string') {
        return ht
      }
      ht = ht.replace(/&(lt|gt|amp|quot);/ig, function (all, t) {
        return arrEntities[t]
      })
      for (var i in imgIco) {
        if (ht.indexOf(imgIco[i][1]) != -1) {
          ht = ht.replace(new RegExp(imgIco[i][2], 'gm'), imgIco[i][0])
        }
      }
      return ht
    }
  }
  $.changeFace = function (options) {
    var changeFace = new CHANGEFACE(options)
    changeFace.init()
    return changeFace
  }
})(window, jQuery)
