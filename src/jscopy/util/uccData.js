var baseUrl = document.location.protocol + '//' + location.host + '/any800'
var ucc = {
  companyPk: 'ff808081612620ee016126a0c33f0003',
  codeKey: 1,
  langPk: '',
  type: '',
  baseUrl: baseUrl
}
if (location.hash.slice(1)) {
  var sp = location.hash.slice(1).split('/')
  if (sp[1]) {
    ucc.companyPk = sp[1]
  }
  if (sp[2]) {
    ucc.codeKey = sp[2]
  }
  if (sp[3]) {
    ucc.langPk = sp[3]
  }
}

module.exports = ucc
