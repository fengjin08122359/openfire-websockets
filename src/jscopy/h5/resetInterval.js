window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             function (callback) {
               window.setTimeout(callback, 6000 / 60)
             }
})()
window.setTimeout = function (callback, delay) {
  var dateNow = Date.now,
    requestAnimation = window.requestAnimFrame,
    start = dateNow(),
    stop,
    timeoutFunc = function () {
      dateNow() - start < delay ? stop || requestAnimation(timeoutFunc) : callback()
    }
  requestAnimation(timeoutFunc)
  return {
    clear: function () { stop = 1 }
  }
}
window.setInterval = function (callback, delay) {
  var dateNow = Date.now,
    requestAnimation = window.requestAnimFrame,
    start = dateNow(),
    stop,
    intervalFunc = function () {
      dateNow() - start < delay || (start += delay, callback())
      stop || requestAnimation(intervalFunc)
    }
  requestAnimation(intervalFunc)
  return {
    clear: function () { stop = 1 }
  }
}
window.clearTimeout = function (el) {
  if (el && el.clear) {
    el.clear()
  }
}
window.clearInterval = function (el) {
  if (el && el.clear) {
    el.clear()
  }
}
