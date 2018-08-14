var config = require('../config');

var urlPath  = config.websocketUrl;
var url = (window.location.protocol == "http:" ? "ws://" : "wss://") + (document.location.hostname == "" ? "localhost" : document.location.hostname) +  (document.location.port == "" ? "" : (":"+document.location.port)) + urlPath
url = 'ws://127.0.0.1:7070/ws/server'

module.exports = urlPath