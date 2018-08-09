const strophe = require('strophe');
if ( !! window.WebSocket && window.WebSocket.prototype.send) {
  const strophe = require('./websocket');
}