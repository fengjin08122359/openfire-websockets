var baseUrl = document.location.protocol + '//' + location.host + '/any800'
var ucc = {
  companyPk: 'ff808081612620ee016126a0c33f0003',
  codeKey: 1,
  langPk: '',
  type: '',
  baseUrl: baseUrl
}
// 解析参数并存储到 settings 变量中
var settings = {};
var src = location.href;
var arg = src.indexOf('?') !== -1 ? src.split('?').pop() : '';
arg.replace(/(\w+)(?:=([^&]*))?/g, function(a, key, value) {
  settings[key] = value;
});

if (settings.companyPk) {
  ucc.companyPk = settings.companyPk || ucc.companyPk
  ucc.codeKey = settings.codeKey || ucc.codeKey
  ucc.langPk = settings.langPk || ucc.langPk
  ucc.type = settings.type || ucc.type
}

module.exports = ucc
