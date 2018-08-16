var getUrl = require('./getUrl');
var getResource = require('./getResource');
var config = require('../config');
var strophe = require('strophe.js');
var Openfire = require('./strophe-openfire-websocket');
var keyFrame = require('../util/key-frame');

var connection = new Openfire.Connection(getUrl);
var connected = false;
var clientId = '';

function onConnect(status) {
  if (status == strophe.Strophe.Status.CONNFAIL) {
      keyFrame.push("login","CONNFAIL")
      connected = false;
  } else if (status == strophe.Strophe.Status.AUTHFAIL) {
      keyFrame.push("login","AUTHFAIL")
      connected = false;
  } else if (status == strophe.Strophe.Status.DISCONNECTED) {
      keyFrame.push("login","DISCONNECTED")
      connected = false;
  } else if (status == strophe.Strophe.Status.CONNECTING) {
      keyFrame.push("login","CONNECTING")
  } else if (status == strophe.Strophe.Status.CONNECTED) {
      keyFrame.push("login","CONNECTED")
      connected = true;

      // 当接收到<message>节，调用onMessage回调函数
      connection.addHandler(onChallenge, null, 'challenge', null, null, null);
      connection.addHandler(onOpen, null, 'open', null, null, null);
      connection.addHandler(onSuccess, null, 'success', null, null, null);     
      connection.addHandler(onFail, null, 'failure', null, null, null);           
      connection.addHandler(onstream, null, 'stream:features', null, null, null);
      connection.send(strophe.$build("open",{"xmlns":"urn:ietf:params:xml:ns:xmpp-framing"}));
  }
  connection.status = status
}
function onFail(msg){
  keyFrame.push("auth","fail")
}
function onSuccess(msg){
  keyFrame.push("auth","success")
  connection.send(strophe.$build("open",{"id":clientId,"xmlns":"urn:ietf:params:xml:ns:xmpp-framing"}));
  connection.send(strophe.$iq({"id":clientId,"type":"set",xmlns:"jabber:client"}).cnode(strophe.$build("bind",{xmlns:"urn:ietf:params:xml:ns:xmpp-bind"}).c("resource",null,nclientAPI.connection.getUniqueId()).node))
  connection.send(strophe.$pres({"id":clientId}).c("status",null,"online").c("priority",null,1));
  keyFrame.push("success","websocket connected!")
}
function onOpen(msg){
  keyFrame.push("authOpen",msg);
  if (!clientId) {
    clientId = msg.getAttribute('id');
    connection.clientId = clientId;
  }
}

function onstream(msg){
  keyFrame.push("auth","stream");
  var token = window.btoa(connection.username+"\0"+connection.password);
  connection.send(strophe.$build("auth",{"mechanism":"PLAIN","xmlns":"urn:ietf:params:xml:ns:xmpp-sasl"}).t(token));
  return true;
}
function onChallenge(msg){
  keyFrame.push("auth","challenge");
  connection.send(strophe.$build("response",{"mechanism":"PLAIN","xmlns":"urn:ietf:params:xml:ns:xmpp-sasl"}).t(msg.innerHTML));
  return true;
}

connection.connectFun = function(){
	connection.connect(config.username ,config.password, onConnect);
}

module.exports = connection