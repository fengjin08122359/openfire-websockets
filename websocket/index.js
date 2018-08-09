const ReconnectingWebSocket = require('./ReconnectingWebSocket');



ReconnectingWebSocket.onopen = w.doOpen;
ReconnectingWebSocket.onerror = w.doError;
ReconnectingWebSocket.onclose = w.doClose;
ReconnectingWebSocket.onmessage = w.doMessage;

module.exports = {};
