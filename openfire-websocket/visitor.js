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

if (typeof(require) === 'function') {
    require(["./connection"], function(connection) {
        window.nclientVisitorAPI = connection;
        nclientVisitorAPI.keyFrame.addHandler("clientHandler","login",function(event,key,data){
          alert(data);
        })
        nclientVisitorAPI.keyFrame.addHandler("clientHandler","onPresence",function(event,key,data){
          alert(data);
        })
        nclientVisitorAPI.setConfig({
          username:"mike",
          password:"123456"
        })
        nclientVisitorAPI.init();
    });
}
