api说明

JS调用基础api
nclientAPI

1.setConfig
nclientAPI.setConfig(conf)
#参数 paramters:
conf : json对象用户名,密码, 
#样例example:
({
  websocketUrl: 'ws://127.0.0.1:7070/ws/server',//websocket链接地址
  boshUrl: 'http://127.0.0.1:7070/http-bind/',//bosh链接地址
  domain:'openfire-test',//openfire的domain,一般不修改
  updateTime:5,//pingpong的更新时间(秒)
  overTime:20,//pingpong超时时间(秒)
  reconnectTime: 10//断线重连时间(秒)
})
#用途usage:
用于配置登陆api的配置信息

2.init
nclientAPI.init(type)
#参数 paramters:
type :  启动链接方式的类型
#样例example:
("bosh")(不配置会自动选择浏览器可以运行的方式)
#用途usage:
在配置用户名密码后启动链接

3.send
nclientAPI.init(msg)
#参数 paramters:
msg : xml格式的代码 
#样例example:
("<message></message>")
#用途usage:
发送消息

4.keyFrame
nclientAPI.keyFrame
#用途usage:关键帧信息,用于日志和js扩展
	a.nclientAPI.keyFrame.push(key,obj,logStr)
	#参数 paramters:
	key : 关键帧标记
	obj : 关键帧需要记录的对象
	logStr : 关键帧红需要提醒的日志
	#样例example:
	("onMessage","消息主体","一条消息")
	#用途usage:
	在扩展中通过key调用需要扩展的内容
	
	b.nclientAPI.keyFrame.addHandler(handlerName,key,callback)
	#参数 paramters:
	handlerName : 关键帧主体,记录关键帧的发起者
	key : 关键帧标记
	callback : 使用关键帧标记时,需要的回调方法
	#样例example:
	("clientAPI","onMessage",function(handlerName,key,data){alert(data)})
	("visitorAPI","onMessage",function(handlerName,key,data){alert(data)})
	#用途usage:
	为api增加对应的扩展
	
	c.nclientAPI.keyFrame.removeHandler(handlerName,key)
	#参数 paramters:
	handlerName : 关键帧主体,记录关键帧的发起者
	key : 关键帧标记(可省略,将直接删除主体)
	#样例example:
	("visitorAPI","onMessage")
	#用途usage:
	为api删除对应的扩展
	
5.Strophe
nclientAPI.Strophe
请参考strophe.js的api
#用途usage:
在发送消息与接收解析消息中使用可以快捷的使用xml对象

6.addConnectionHandler
nclientAPI.addConnectionHandler(handler, ns, name, type, id, from, options)
#参数 paramters:
handler :  消息处理回调
ns : 根据namespace匹配
name : 根据name匹配
type : 根据类型匹配
id : 根据id匹配
from : 根据来源匹配
options : 根据选项匹配
#样例example:
(function(msg){alert(msg)}, null, 'presence', null, null, null)
处理name是presence的消息
#用途usage:
根据各种方式匹配不同类型的xml消息(比较常用的是name)

7.connection
nclientAPI.connection
请参考strophe.js的api
#用途usage:
使用strophe连接后创建的链接,可用于发送消息,检测消息等(一般不会使用)
	
9.setLogin
nclientAPI.setConfig(username,password)
#参数 paramters:
username :  用户名
username :  密码
#样例example:
("mike","123456")
#用途usage:
在配置用户名密码后启动链接




座席端api

访客端api
