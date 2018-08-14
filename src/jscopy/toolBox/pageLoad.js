var ucc = require('../util/uccData.js')
var ajax = require('../util/ajax.js')
var defered = new $.Deferred()
var defered = new $.Deferred()
$.when(
  ajax.getSettingsAndService(),
  ajax.getLangAndMessageSettings(),
  ajax.getVisitosDisplay(),
  ajax.getTmpCode()
).done(function () {
  defered.resolve()
})
module.exports = defered.promise()
var appData = require('../util/appData.js')
appData.pageLoad = {}
appData.pageLoad.getDepartment = ajax.getDepartment
