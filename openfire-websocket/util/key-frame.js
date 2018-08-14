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
  addHandler(handerName,key,callback){
    this.removeHandler(handerName,key);
    this.handlers.push({
      handerName:handerName,
      key:key,
      callback:callback,
    })
  },
  removeHandler(handerName,key){
    for (var i=0,len = this.handlers.length;i<len;i++){
      if (handerName == this.handlers[i].handerName) {
        if (!key || key==this.handlers[i].key ) {
          this.handlers.splice(i,1);
          break;
        }
      }
    }
  },
}