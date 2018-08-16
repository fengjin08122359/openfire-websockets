var config;
if (typeof(require) === 'undefined') {
    /* XXX: Hack to work around r.js's stupid parsing.
     * We want to save the configuration in a variable so that we can reuse it in
     * tests/main.js.
     */
    require = {
        config: function (c) {
            config = c;
        }
    };
}
/*    addConnectionHandler
 *    Parameters:
 *    (Function) handler - The user callback.
 *    (String) ns - The namespace to match.
 *    (String) name - The stanza name to match.
 *    (String|Array) type - The stanza type (or types if an array) to match.
 *    (String) id - The stanza id attribute to match.
 *    (String) from - The stanza from attribute to match.
 *    (String) options - The handler options
 */
if (typeof(require) === 'function') {
    require(["./connection"], function(nclientAPI) {
        var nclientClientAPI = {
          init:function(){
            var api = this;
            api.addKeyFrameHandler("clientHandler","login",function(event,key,data){
              //alert(data);
            })
            api.addKeyFrameHandler("clientHandler","onPresence",function(event,key,data){
              //alert(data);
            })
            nclientAPI.init();
            api.addConnectionHandler(function(msg){
              api.addKeyFrame("onPresence","获取Presence代码"+msg);
              return true;
            }, null, 'presence', null, null, null);
            nclientAPI.takeover = function(){}
          },
          send:function(msg){
            nclientAPI.send(msg);
          },
          addKeyFrameHandler:function(handlerName,key,fn){
            nclientAPI.keyFrame.addHandler(handlerName,key,fn)
          },
          addKeyFrame:function(key,msg){
            nclientAPI.keyFrame.push(key,msg);
          },
          addConnectionHandler:function(handler, ns, name, type, id, from, options){
            nclientAPI.addConnectionHandler(handler, ns, name, type, id, from, options);
          },
          setConfig:function(json){
        	  nclientAPI.setConfig(json)
          }
        }
        nclientClientAPI.setLogin("mike","123456");
        nclientClientAPI.setConfig({
    	  websocketUrl: 'ws://127.0.0.1:7070/ws/server',
    	  boshUrl: 'http://127.0.0.1:7070/http-bind/'
        })
        nclientClientAPI.init();
        window.nclientClientAPI = nclientClientAPI;
    });
}
