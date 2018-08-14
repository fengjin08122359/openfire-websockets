/* getParameter.js 参数信息 */
var getParameter = function () {
  var src = location.href
  // 解析参数并存储到 settings 变量中
  var arg = src.indexOf('?') !== -1 ? src.split('?').pop() : ''
  var settings = {}
  arg.replace(/(\w+)(?:=([^&]*))?/g, function (a, key, value) {
    settings[key] = value
  })
  return settings
}
$.getParameter = getParameter
