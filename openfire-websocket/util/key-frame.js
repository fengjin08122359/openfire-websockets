module.exports = {
  keyFrames:{},
  handlers:[],
  push:function(key,obj,logStr){
    for (var i=0,len = this.handlers.length;i<len;i++){
      if (key == this.handlers[i].key) {
        this.handlers[i].callback(this.handlers[i], key, obj);
      }
    };
    console.log(key, obj);
    if (logStr) {
      console.log(logStr);
    }
  },
  addHandler(handlerName,key,callback){
    this.removeHandler(handlerName,key);
    this.handlers.push({
    	handlerName:handlerName,
      key:key,
      callback:callback,
    })
  },
  removeHandler(handlerName,key){
    for (var i=0,len = this.handlers.length;i<len;i++){
      if (handlerName == this.handlers[i].handlerName) {
        if (!key || key==this.handlers[i].key ) {
          this.handlers.splice(i,1);
          break;
        }
      }
    }
  },
}