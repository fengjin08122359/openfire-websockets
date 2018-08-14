if (navigator.userAgent.match(/.*iphone.*|.*Linux.*|.*AppleWebKit.*Mobile.*/)) {
  if (window.location.href.indexOf('pc.html') > -1) {
    window.location.href = window.location.href.replace('pc.html', 'h5.html')
  }
} else {
  if (window.location.href.indexOf('h5.html') > -1) {
    window.location.href = window.location.href.replace('h5.html', 'pc.html')
  }
}
if (typeof console === 'undefined') {
  console = {}
  console.log = function (e) {}
  console.warn = function (e) {}
  console.error = function (e) {}
  console.debug = function (e) {}
}
jQuery.cookie = function (a, b, c) {
  if (typeof b === 'undefined') {
    var i = null
    if (document.cookie && document.cookie != '') {
      for (var j = document.cookie.split(';'), k = 0; k < j.length; k++) {
        var l = jQuery.trim(j[k])
        if (l.substring(0, a.length + 1) == a + '=') {
          i = decodeURIComponent(l.substring(a.length + 1))
          break
        }
      }
    }
    return i
  }
  c = c || {}, b === null && (b = '', c.expires = -1)
  var d = ''
  if (c.expires && (typeof c.expires === 'number' || c.expires.toUTCString)) {
    var e
    typeof c.expires === 'number' ? (e = new Date(), e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c.expires)) : e = c.expires, d = '; expires=' + e.toUTCString()
  }
  var f = c.path ? '; path=' + c.path : '',
    g = c.domain ? '; domain=' + c.domain : '',
    h = c.secure ? '; secure' : ''
  document.cookie = [a, '=', encodeURIComponent(b), d, f, g, h].join('')
}
var stringify = (function () {
  function a (a) {
    return /["\\\x00-\x1f]/.test(a) && (a = a.replace(/["\\\x00-\x1f]/g, function (a) {
      var b = e[a]
      return b || (b = a.charCodeAt(), '\\u00' + Math.floor(b / 16).toString(16) + (b % 16).toString(16))
    })), '"' + a + '"'
  }

  function b (a) {
    var b, c, d, e = ['['],
      f = a.length
    for (c = 0; f > c; c++) {
      switch (d = a[c], typeof d) {
        case 'undefined':
        case 'function':
        case 'unknown':
          break
        default:
          b && e.push(','), e.push(stringify(d)), b = 1
      }
    }
    return e.push(']'), e.join('')
  }

  function c (a) {
    return a < 10 ? '0' + a : a
  }

  function d (a) {
    return '"' + a.getFullYear() + '-' + c(a.getMonth() + 1) + '-' + c(a.getDate()) + 'T' + c(a.getHours()) + ':' + c(a.getMinutes()) + ':' + c(a.getSeconds()) + '"'
  }
  var e = {
    '\b': '\\b',
    '  ': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"': '\\"',
    '\\': '\\\\'
  }
  return function (c) {
    switch (typeof c) {
      case 'undefined':
        return 'undefined'
      case 'number':
        return isFinite(c) ? String(c) : 'null'
      case 'string':
        return a(c)
      case 'boolean':
        return String(c)
      default:
        if (c === null) return 'null'
        if (c instanceof Array) return b(c)
        if (c instanceof Date) return d(c)
        var e, f, g = ['{'],
          h = stringify
        for (var i in c) {
          if (Object.prototype.hasOwnProperty.call(c, i)) {
            switch (f = c[i], typeof f) {
              case 'undefined':
              case 'unknown':
              case 'function':
                break
              default:
                e && g.push(','), e = 1, g.push(h(i) + ':' + h(f))
            }
          }
        }
        return g.push('}'), g.join('')
    }
  }
}())
JSON = {
  parse: window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function (a) {
    return String(a).evalJSON()
  } || $.parseJSON || $.evalJSON,
  stringify: Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || stringify
}
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (elt) {
    var len = this.length >>> 0
    var from = Number(arguments[1]) || 0
    from = (from < 0) ? Math.ceil(from) : Math.floor(from)
    if (from < 0) from += len
    for (; from < len; from++) {
      if (from in this && this[from] === elt) return from
    }
    return -1
  }
}
Array.prototype.insertSort = function (fn) {
  var array = this
  var fun = fn || function (a, b) {
    return b > a
  }
  for (var i = 1, len = array.length; i < len; i++) {
    var key = array[i]
    var j = i - 1
    while (j >= 0 && fun(array[j], key)) {
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = key
  }
  return array
}
Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  return fmt
}
String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, '')
}
