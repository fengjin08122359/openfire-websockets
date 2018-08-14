1.安装nodejs
2.使用管理员权限打开命令行
3.$ npm config set registry https://registry.npm.taobao.org
4.$ npm install (安装插件)
5.$ eslint src/js/** --ext .js --fix(优化代码格式)
6.$ npm run dev (预编译)
	a.配置/config/index.js中
	proxyTable -> 代理ajax地址
	host -> 域名 
	port ->	端口号
	预览地址:
	http://127.0.0.1:8082/pc.html#/ff808081612620ee016126a0c33f0003/2/1/

7.$ npm run build (打包)
8./dist 中是打包后的文件