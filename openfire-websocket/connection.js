(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //Allow using this built library as an AMD module
        //in another project. That other project will only
        //see this AMD call, not the internal modules in
        //the closure below.
        define([], factory);
    } else {
        //Browser globals case.
        var wrapper = factory();
        root.nclientAPI  = wrapper.nclientAPI;
    }
}(this, function () {
require('./util/bind.js')
var strophe = require('strophe.js');
var config = require('./config');
var extend = require('extend');
var nclientAPI = {
  connection:null,
  keyFrame: require('./util/key-frame'),
  Strophe:strophe.Strophe,
  callbacks:{
    onMessage:function(){},
    onPresence:function(){},
  },
  setConfig:function(conf){
    var conn = this;
    config = extend(true,config,conf);
  },
  init:function(conf){
    var conn = this;
    if (conn.connection) return;
    conn.keyFrame.addHandler("default","buildConnection",function(event,key,data){
      //console.log(data);
    })
    conn.keyFrame.addHandler("default","login",function(event,key,data){
      //console.log(data);
    })
    conn.keyFrame.addHandler("default","auth",function(event,key,data){
      //console.log(data);
    })
    conn.keyFrame.addHandler("default","onMessage",function(event,key,data){
      //console.log(data);
    })
    conn.keyFrame.addHandler("default","onPresence",function(event,key,data){
      //console.log(data);
    })
    conn.keyFrame.addHandler("default","send",function(event,key,data){
      //console.log(data.tree());
    })
    if ( !! window.WebSocket && window.WebSocket.prototype.send) {
      conn.setConnection("websocket")
    } else {
      conn.setConnection("bosh")
    }
  },
  setConnection:function(type){
    if (this.connection) {
      this.connection.close();
    }
    nclientAPI.keyFrame.push("buildConnection",type)
    if (type == "websocket") {
      this.connection = require('./bosh');
    } else if (type == "bosh") {
      this.connection = require('./bosh');
      
    }
    if (this.connection) {
      this.connection.addHandler(this.onMessage, null, 'message', null, null, null);
      this.connection.addHandler(this.onPresence, null, 'presence', null, null, null);
    }
  },
  send:function(msg){
    nclientAPI.keyFrame.push("send",msg)
    this.connection.send(msg)
  },
  changeStatus:function(status){
    this.send(strophe.$pres({"id":this.connection.clientId}).c("status",null,status).c("priority",null,1))
  },
  addInRoom:function(roomId){
    var pres = strophe.$pres({
        from: config.username,
        to: roomId + "/" + config.username
    }).c('x',{xmlns: 'http://jabber.org/protocol/muc'});
    this.send(pres);
  },
  onMessage:function(msg){
    // 解析出<message>的from、type属性，以及body子元素
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');

    if (type == "groupchat" && elems.length > 0) {
        //var body = elems[0];
        //$("#msg").append(from.substring(from.indexOf('/') + 1) + ":<br>" + Strophe.getText(body) + "<br>")
    }
    nclientAPI.keyFrame.push("onMessage",msg)
    return true;
  },
  onPresence:function(msg){
    nclientAPI.keyFrame.push("onPresence",msg)
  }
}
//nclientAPI.addInRoom("mike@conference.openfire-test")
//nclientAPI.changeStatus("offline")
return nclientAPI;
}));