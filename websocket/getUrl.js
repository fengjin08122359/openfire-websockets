const config = require('../config');

var urlPath  = config.websocketUrl;

module.exports = (window.location.protocol == "http:" ? "ws://" : "wss://") + (document.location.hostname == "" ? "localhost" : document.location.hostname) +  (document.location.port == "" ? "" : (":"+document.location.port)) + urlPath
