var getUrl = require('./getUrl');
var config = require('../config');
var keyFrame = require('../util/key-frame');
var strophe = require('strophe.js');
var connection = new strophe.Strophe.Connection(getUrl);
var connected = false;
var clientId = '';
var username = config.username.indexOf(config.domain) > -1 ? config.username : (config.username + '@' + config.domain)
function onConnect(status) {
  if (status == strophe.Strophe.Status.CONNFAIL) {
      keyFrame.push("login","CONNFAIL")
  } else if (status == strophe.Strophe.Status.AUTHFAIL) {
      keyFrame.push("login","AUTHFAIL")
  } else if (status == strophe.Strophe.Status.DISCONNECTED) {
      alert("连接断开！");
      connected = false;
  } else if (status == strophe.Strophe.Status.CONNECTED) {
      keyFrame.push("login","CONNECTED")
      connected = true;

      // 当接收到<message>节，调用onMessage回调函数
      connection.addHandler(onSuccess, null, 'success', null, null, null);
      connection.addHandler(onFail, null, 'failure', null, null, null);    
      connection.send(strophe.$pres().tree());

  }
}

function onFail(msg){
  keyFrame.push("auth","fail")
}

function onSuccess(msg) {
  connection.clientId = connection._proto.sid;
}
keyFrame.push("login",username+config.password+getUrl)
connection.connect(username ,config.password, onConnect);

module.exports = connection