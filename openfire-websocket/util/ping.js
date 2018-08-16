var strophe = require('strophe.js');
var config = require('../config');
var api = require('../connection');

var pingPlugin = {
	interval:null,
	connection:null,
	pingxmlns:'urn:xmpp:ping',
	pingTime:0,
	pongTime:0,
	init:function(){
		var p = this;
		var updateTime = config.updateTime || 5;
		var overTime = config.overTime || 20;
		p.pingTime = 0;
		p.pongTime = new Date().getTime();
		if (this.interval) {
			clearInterval(this.interval);
		}
		this.interval = setInterval(function(){
			if (api.connection.connected){
				p.ping();
				console.log("pingTime",new Date());
				p.pingTime = new Date().getTime();
				if (p.pingTime && p.pongTime && Math.abs(p.pingTime-p.pongTime)>(overTime*1000)){
					api.reconnect();
				}	
			}
		},updateTime*1000);
		api.addConnectionHandler(function(ping){
			if (ping.getElementsByTagName('ping').length>0){
				console.log("pongTime",new Date());
				p.pongTime = new Date().getTime();
			}
			return true;
		}, null, 'iq', null, null, null);
	},
	ping:function (){
		var id = api.connection.getUniqueId('ping');
        var iq = strophe.$iq({type: 'get', to: api.connection.jid, id: id}).c('ping', {xmlns: this.pingxmlns});
        api.connection.send(iq);
	}
}
module.exports = pingPlugin