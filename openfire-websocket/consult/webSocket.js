(function(window, $, undefined) {
	var WEBSOCKET = function(options) {
			this.defaults = {
				path: "/any800/UccWebSocket/",
				visitorId: "",
				message: function(chatId, content) {

				},
				deal: function(type, chatId, json) {

				},
				connect:function(isConnect){
					
				},
				confirmSend:function(messageId){
					
				},
				leaveCover:function(){
				},
				open:function(){
				}
			}, this.options = $.extend({}, this.defaults, options)
		};
	var UccMessage = function(messageJson) {
			var self = this;
			self.chatId = messageJson.chatID;
			self.type = messageJson.type ? messageJson.type : "VS_CHAT";
			self.content = JSON.stringify(new Message(messageJson.message));
			self.messageId = "Other" +messageJson.date;
			return self;
		};
	var UccQueue = function(messageJson) {
			var self = this;
			self.chatId = messageJson.chatID;
			self.type = messageJson.type ? messageJson.type : "VS_CHAT";
			self.content = (messageJson.message);
			self.messageId = "Other" +messageJson.date;
			return self;
		};
	var UccReceipts = function(messageId) {
			var self = this;
			self.type = "RECEIPTS";
			self.messageId = messageId;
			return self;
		};
	var Message = function(message){
		var self = this;
		self.msg = message;
		return self;
	}
	var dfd = new $.Deferred();
	WEBSOCKET.prototype = {
		isWork: false,
		isConnect:false,
		connectTimeout:null,
		websocket: null,
		init: function() {
			var w = this;
			var webSocketIsWork = storage.get("webSocketIsWork") 
//			if(typeof webSocketIsWork != "undefined"){
//			  w.isWork = webSocketIsWork
//			}else	
		  if ( !! window.WebSocket && window.WebSocket.prototype.send) {
				if (w.options.isWs == "true") {
					w.isWork = true;
				}
//				$.ajax({
//					url: "./echat.do",
//					data: {
//						method: "isWebSocketSupported"
//					},
//					async: false,
//					dataType: "json"
//				}).done(function(data) {
//					if (data.isWs == "true") {
//						w.isWork = true;
//					}
//				})
			};
			if(w.isWork){
				w.reconnectionFun();
				w.connect();
			}
			if(!w.isWork){
				return dfd.resolve(false);
			}else{
				return dfd.promise();
			}
		},
		reconnectionFun:function(){
			var w = this;
			if(!w.isWork)return;
			(function (global, factory) {
			    if (typeof define === 'function' && define.amd) {
			        define([], factory);
			    } else if (typeof module !== 'undefined' && module.exports){
			        module.exports = factory();
			    } else {
		    		global.ReconnectingWebSocket = factory();
			    }
			})(this, function () {
				var WebSocket = window.WebSocket || window.MozWebSocket;
			    function ReconnectingWebSocket(url, protocols, options) {

			        // Default settings
			        var settings = {

			            /** Whether this instance should log debug messages. */
			            debug: false,

			            /** Whether or not the websocket should attempt to connect immediately upon instantiation. */
			            automaticOpen: true,

			            /** The number of milliseconds to delay before attempting to reconnect. */
			            reconnectInterval: 1000,
			            /** The maximum number of milliseconds to delay a reconnection attempt. */
			            maxReconnectInterval: 30000,
			            /** The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. */
			            reconnectDecay: 1.5,

			            /** The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. */
			            timeoutInterval: 2000
			        }
			        if (!options) { options = {}; }

			        // Overwrite and define settings with options if they exist.
			        for (var key in settings) {
			            if (typeof options[key] !== 'undefined') {
			                this[key] = options[key];
			            } else {
			                this[key] = settings[key];
			            }
			        }

			        // These should be treated as read-only properties

			        /** The URL as resolved by the constructor. This is always an absolute URL. Read only. */
			        this.url = url;

			        /** The number of attempted reconnects since starting, or the last successful connection. Read only. */
			        this.reconnectAttempts = 0;

			        /**
			         * The current state of the connection.
			         * Can be one of: WebSocket.CONNECTING, WebSocket.OPEN, WebSocket.CLOSING, WebSocket.CLOSED
			         * Read only.
			         */
			        this.readyState = WebSocket.CONNECTING;

			        /**
			         * A string indicating the name of the sub-protocol the server selected; this will be one of
			         * the strings specified in the protocols parameter when creating the WebSocket object.
			         * Read only.
			         */
			        this.protocol = null;

			        // Private state variables

			        var self = this;
			        var ws;
			        var forcedClose = false;
			        var timedOut = false;
			        var eventTarget = document.createElement('div');

			        // Wire up "on*" properties as event handlers

			        eventTarget.addEventListener('open',       function(event) { self.onopen(event); });
			        eventTarget.addEventListener('close',      function(event) { self.onclose(event); });
			        eventTarget.addEventListener('connecting', function(event) { self.onconnecting(event); });
			        eventTarget.addEventListener('message',    function(event) { self.onmessage(event); });
			        eventTarget.addEventListener('error',      function(event) { self.onerror(event); });

			        // Expose the API required by EventTarget

			        this.addEventListener = eventTarget.addEventListener.bind(eventTarget);
			        this.removeEventListener = eventTarget.removeEventListener.bind(eventTarget);
			        this.dispatchEvent = eventTarget.dispatchEvent.bind(eventTarget);

			        /**
			         * This function generates an event that is compatible with standard
			         * compliant browsers and IE9 - IE11
			         *
			         * This will prevent the error:
			         * Object doesn't support this action
			         *
			         * http://stackoverflow.com/questions/19345392/why-arent-my-parameters-getting-passed-through-to-a-dispatched-event/19345563#19345563
			         * @param s String The name that the event should use
			         * @param args Object an optional object that the event will use
			         */
			        function generateEvent(s, args) {
			        	var evt = document.createEvent("CustomEvent");
			        	evt.initCustomEvent(s, false, false, args);
			        	return evt;
			        };

			        this.open = function (reconnectAttempt) {
			            ws = new WebSocket(self.url, protocols || []);

			            if (!reconnectAttempt) {
			                eventTarget.dispatchEvent(generateEvent('connecting'));
			            }

			            if (self.debug || ReconnectingWebSocket.debugAll) {
			                console.debug('ReconnectingWebSocket', 'attempt-connect', self.url);
			            }

			            var localWs = ws;
			            var timeout = setTimeout(function() {
			                if (self.debug || ReconnectingWebSocket.debugAll) {
			                    console.debug('ReconnectingWebSocket', 'connection-timeout', self.url);
			                }
			                timedOut = true;
			                localWs.close();
			                timedOut = false;
			            }, self.timeoutInterval);

			            ws.onopen = function(event) {
			            	console.log("opened");
			                clearTimeout(timeout);
			                if (self.debug || ReconnectingWebSocket.debugAll) {
			                    console.debug('ReconnectingWebSocket', 'onopen', self.url);
			                }
			                self.protocol = ws.protocol;
			                self.readyState = WebSocket.OPEN;
			                self.reconnectAttempts = 0;
			                var e = generateEvent('open');
			                e.isReconnect = reconnectAttempt;
			                reconnectAttempt = false;
			                eventTarget.dispatchEvent(e);
			            };

			            ws.onclose = function(event) {
			                clearTimeout(timeout);
			                console.log("event.code:"+event.code);
			                console.log(event.reason);
			                if(!!event.code && (event.code =="1004"||event.code =="1005"||event.code =="1006"))forcedClose = true;
			                ws = null;
			                if (forcedClose) {
			                    self.readyState = WebSocket.CLOSED;
			                    var e = generateEvent('close');
			                    e.code = event.code;
			                    eventTarget.dispatchEvent(e);
			                } else {
			                    self.readyState = WebSocket.CONNECTING;
			                    var e = generateEvent('connecting');
			                    e.code = event.code;
			                    e.reason = event.reason;
			                    e.wasClean = event.wasClean;
			                    eventTarget.dispatchEvent(e);
			                    if (!reconnectAttempt && !timedOut) {
			                        if (self.debug || ReconnectingWebSocket.debugAll) {
			                            console.debug('ReconnectingWebSocket', 'onclose', self.url);
			                        }
			                        eventTarget.dispatchEvent(generateEvent('close'));
			                    }

			                    var timeout = self.reconnectInterval * Math.pow(self.reconnectDecay, self.reconnectAttempts);
			                    setTimeout(function() {
			                        self.reconnectAttempts++;
			                        self.open(true);
			                    }, timeout > self.maxReconnectInterval ? self.maxReconnectInterval : timeout);
			                }
			            };
			            ws.onmessage = function(event) {
			                if (self.debug || ReconnectingWebSocket.debugAll) {
			                    console.debug('ReconnectingWebSocket', 'onmessage', self.url, event.data);
			                }
			                var e = generateEvent('message');
			                e.data = event.data;
			                eventTarget.dispatchEvent(e);
			            };
			            ws.onerror = function(event) {
			                if (self.debug || ReconnectingWebSocket.debugAll) {
			                    console.debug('ReconnectingWebSocket', 'onerror', self.url, event);
			                }
			                eventTarget.dispatchEvent(generateEvent('error'));
			            };
			        }

			        // Whether or not to create a websocket upon instantiation
			        if (this.automaticOpen == true) {
			            this.open(false);
			        }

			        /**
			         * Transmits data to the server over the WebSocket connection.
			         *
			         * @param data a text string, ArrayBuffer or Blob to send to the server.
			         */
			        this.send = function(data) {
			            if (ws) {
			                if (self.debug || ReconnectingWebSocket.debugAll) {
			                    console.debug('ReconnectingWebSocket', 'send', self.url, data);
			                }
			                return ws.send(data);
			            } else {
//			                throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
			            }
			        };

			        /**
			         * Closes the WebSocket connection or connection attempt, if any.
			         * If the connection is already CLOSED, this method does nothing.
			         */
			        this.close = function(code, reason) {
			            // Default CLOSE_NORMAL code
			            if (typeof code == 'undefined') {
			                code = 1000;
			            }
			            console.log('debug: WebSocket closed. code=' + code);
			            forcedClose = true;
			            if (ws) {
			                ws.close(code, reason);
			            }
			        };

			        /**
			         * Additional public API method to refresh the connection if still open (close, re-open).
			         * For example, if the app suspects bad data / missed heart beats, it can try to refresh.
			         */
			        this.refresh = function() {
			            if (ws) {
			                ws.close();
			            }
			        };
			    }

			    /**
			     * An event listener to be called when the WebSocket connection's readyState changes to OPEN;
			     * this indicates that the connection is ready to send and receive data.
			     */
			    ReconnectingWebSocket.prototype.onopen = function(event) {};
			    /** An event listener to be called when the WebSocket connection's readyState changes to CLOSED. */
			    ReconnectingWebSocket.prototype.onclose = function(event) {};
			    /** An event listener to be called when a connection begins being attempted. */
			    ReconnectingWebSocket.prototype.onconnecting = function(event) {};
			    /** An event listener to be called when a message is received from the server. */
			    ReconnectingWebSocket.prototype.onmessage = function(event) {};
			    /** An event listener to be called when an error occurs. */
			    ReconnectingWebSocket.prototype.onerror = function(event) {};

			    /**
			     * Whether all instances of ReconnectingWebSocket should log debug messages.
			     * Setting this to true is the equivalent of setting all instances of ReconnectingWebSocket.debug to true.
			     */
			    ReconnectingWebSocket.debugAll = false;

			    ReconnectingWebSocket.CONNECTING = WebSocket.CONNECTING;
			    ReconnectingWebSocket.OPEN = WebSocket.OPEN;
			    ReconnectingWebSocket.CLOSING = WebSocket.CLOSING;
			    ReconnectingWebSocket.CLOSED = WebSocket.CLOSED;

			    return ReconnectingWebSocket;
			});
		},
		getWebSocketUri: function() { 	
			return (window.location.protocol == "http:" ? "ws://" : "wss://") + (document.location.hostname == "" ? "localhost" : document.location.hostname) +  (document.location.port == "" ? "" : (":"+document.location.port)) + this.options.path + this.options.visitorId;
		},
		connectType:0,
		connect: function() {
			var w = this;
			if (!w.isWork){
				return;
			}
			if(w.websocket && w.websocket.readyState!=WebSocket.CLOSED){
				return;
			};
			var websocket = window.WebSocket || window.MozWebSocket;
			w.websocket = new this.ReconnectingWebSocket(w.getWebSocketUri(),null,{});
			w.websocket.onopen = w.doOpen;
			w.websocket.onerror = w.doError;
			w.websocket.onclose = w.doClose;
			w.websocket.onmessage = w.doMessage;
			w.connectType = 1;
		},
		doOpen: function() {
			var w = this;
			dfd.resolve(true);
			console.log('Info: WebSocket connection opened.');
			w.isConnect = true;
			webSocket.hasOpend = true;
			webSocket.startTimeout();
			webSocket.pingTime = 0;
			webSocket.pongTime = 0;
			webSocket.options.open();
			webSocket.connectType = 2;
			storage.set("webSocketIsWork",true)
		},
		pingTime:0,
		pongTime:0,
		sendPing:function(){
			var w = this;
			if(w.pingTime && w.pongTime){
				if(w.pingTime-w.pongTime>3*1000){
					w.websocket.isConnect = false;
				}else{
					w.websocket.isConnect = true;
				}
			}
			w.pingTime = new Date().getTime();
			var m = new UccMessage({date:new Date().getTime(),chatId:"",type:"PING"});
			if(w.websocket){
				w.websocket.send(JSON.stringify(m));
			}
		},
		startTimeout:function(){
			if (!this.isWork) return;
			var w = this;
			if (w.connectTimeout) {
				clearTimeout(w.connectTimeout);
			}
			w.connectTimeout = setTimeout(function(){
				w.sendPing();
				w.options.connect(w.websocket.isConnect);
				if(!w.websocket.isConnect && w.connectType == 3){
          if(w.websocket && w.websocket.readyState == WebSocket.CLOSED) {
            w.connect()
          };
        }
				w.startTimeout();
			},1000)
		},
		endTimeout:function(){
			var w = this;
			if (w.connectTimeout) {
				clearTimeout(w.connectTimeout);
			}
			w.connectTimeout = null;
		},
		startReconnect:function(){
      var w = this;
      if (w.reconnectTimeout) {
        clearTimeout(w.reconnectTimeout);
      }
      if (w.websocket && w.websocket.isConnect) {
        return
      }
      w.connect()
      w.reconnectTimeout = setTimeout(function () {
        w.startReconnect()
      }, 5000)
    },
		doError: function(evt) {
			var w = this;
			if(!webSocket.hasOpend){
				webSocket.isWork = false;
				storage.set("webSocketIsWork",false)
				dfd.resolve(false);
			}
			console.log('Info: WebSocket error. code=' + evt.code);
		},
		doClose: function(evt) {
			var w = this;
			if(webSocket.hasOpend){
				if(evt.code=="1004" || evt.code=="1006"){
					webSocket.options.leaveCover();
				}
				if (evt.code=="1006") {
				  webSocket.startReconnect()
				}
				console.log('Info: WebSocket closed. code=' + evt.code);
				console.log(evt);
				w.isConnect = false;
			}
			webSocket.connectType = 3;
		},
		doMessage: function(message) {
			var w = this;
			console.log(message.data);
			var json = JSON.parse(message.data);
			var type = json.type;
			if(type=="WELCOME_TIPS"){
				var body = JSON.parse(json.content);
				webSocket.options.deal("CUTOMER_IS_INVITED", json.chatId, body.msg);
			}else if(type=="CHAT"){
				var body = JSON.parse(json.content);
				webSocket.options.message(json.chatId, body.msg,json.messageId);
			}else if(type=="CLOSE_ROOM"){
				var body = JSON.parse(json.content);
				if(body.msg=="operatorLeaving"){
					webSocket.options.deal("CLOSE", json.chatId, body.msg);		
				}else{
					webSocket.options.deal("CLOSE_CUSTOMER", json.chatId, body.msg);
				}
			}else if(type=="LEAVE_ROOM"){
				var body = JSON.parse(json.content);
				webSocket.options.deal("CLOSE_CUSTOMER", json.chatId, body.msg);	
			}else if (type == "RECEIPTS") {
				var body = JSON.parse(json.content);
				webSocket.options.deal("RECEIPT", json.chatId, body.targetMsgId);
			}else if (type == "OPERATION_TIPS") {
				var body = JSON.parse(json.content);
				webSocket.options.deal(type, json.chatId, {params:body});
			}else if (type == "REVOKE") {
				var body = JSON.parse(json.content);
				webSocket.options.deal("CUTOMER_REVOKE", json.chatId, json.messageId);
			}else if (type == "VS_QUEUE_INDEX"){
				var body = JSON.parse(json.content);
				webSocket.options.deal("VS_QUEUE_INDEX", json.chatId, body);
			}else  if(type == "PONG"){
				webSocket.pongTime = new Date().getTime();
			}else if(type == "DISCONNECTED_TIP"){
				var body = JSON.parse(json.content);
				webSocket.options.deal("CUSTOMER_NETWORK_INTERRUPT", json.chatId, body);
			}
			if (type != "PONG" && type != "RECEIPTS") {
				if (webSocket.websocket != null && json.messageId) {
					var m = new UccReceipts(json.messageId);
					webSocket.websocket.send(JSON.stringify(m));
				}
			}
		},
		close: function(message) {
			var w = this;
			if (w.websocket != null) {
				//w.websocket.close();
			}
		},
		send: function(message) {
			var w = this;
			if (w.websocket != null) {
				var m = new UccMessage(message);
        w.options.confirmSend(m.messageId);
				w.websocket.send(JSON.stringify(m));
			}
		},
		queue:function(message) {
			var w = this;
			if (w.websocket != null) {
				var m = new UccQueue(message);
				w.websocket.send(JSON.stringify(m));
			}
		}
	}
	$.webSocket = function(options) {
		var webSocket = new WEBSOCKET(options);
		return webSocket;
	}
})(window, jQuery);
