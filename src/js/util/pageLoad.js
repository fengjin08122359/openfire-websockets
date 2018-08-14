var ajax = require('../util/ajax.js')
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
