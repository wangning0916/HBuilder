/**
 * By Houfeng
 * Houfeng@DCloud.io
 * 平台调用相关
 * */
 function userlogin(account,password){
 }
 function userreg(account,password){
 }
 function userforget(email){
 }
 function readusers(){
 }
(function(owner) {
	/**
	 * 回调函数说明:
	 * 所有支持 callback 的接口函数，除了能直接回调 callback 外，
	 * 还能用 “函数名Callback” 的具名方式回调，比如登录回调：loginCallback
	 **/

	/**
	 * 登录方法
	 * loginInfo : {account:'账号',passowrd:'密码'}
	 * 如果登录失败，请直接 callback "提示信息"，如 "用户名或密码错误"
	 * 在这个方法中，可以处理保存登录账号记录的操作
	 */
	owner.login = function(loginInfo, callback) {
		if(loginInfo.password==''||loginInfo.password==null||loginInfo.password=='undefined'){
			loginCallback("请输入密码") ;
			return false ;
		}
		if(loginInfo.account==''||loginInfo.account==null||loginInfo.account=='undefined'){
			loginCallback("请输入用户名/Email") ;
			return false ;
		}
		var mailReg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ ;
		if(!mailReg.test(loginInfo.account)){
			loginCallback("用户名/Email格式不正确") ;
			return false ;
		}
		userlogin(loginInfo.account,loginInfo.password);
		//return "请实现 invoke.js 中的 login 方法";
	};

	/**
	 * 读取登录成功的账号记录，格式为数组：
	 * [{
	 *		label: 'test1@DCloud.io'
	 *	}, {
	 *		label: 'test2@DCloud.io'
	 *	}];
	 * */
	owner.readHistory = function(callback) {
		readusers();
	};

	/**
	 * 注册一个新账号
	 * regInfo : {account:'账号',passowrd:'密码'}
	 * 失败或出现异时，可以直接callback "提示信息"
	 * */
	owner.register = function(regInfo, callback) {
		if(regInfo.password==''||regInfo.password==null||regInfo.password=='undefined'){
			callback(" ") ;
			return false ;
		}
		if(regInfo.password.length<8){
			callback("* 密码长度至少8位，请检查") ;
			return false ;
		}
		if(regInfo.account==''||regInfo.account==null||regInfo.account=='undefined'){
			callback("* 请输入用户名/Email") ;
			return false ;
		}
		var mailReg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ ;
		if(!mailReg.test(regInfo.account)){
			callback("* 用户名/Email格式不正确") ;
			return false ;
		}
		userreg(regInfo.account,regInfo.password);
	};

	/**
	 * 忘记密码
	 * loginInfo 参考 login 方法
	 * */
	owner.forgetPassword = function(loginInfo, callback) {
		if(loginInfo.account==''||loginInfo.account==null||loginInfo.account=='undefined'){
			callback("* 请输入用户名/Email") ;
			return false ;
		}
		var mailReg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ ;
		if(!mailReg.test(loginInfo.account)){
			callback("* 用户名/Email格式不正确") ;
			return false ;
		}
		userforget(loginInfo.account);
	};

	/**
	 * 读取代理设置信息，callback 格式
	 * {
	 * 		type:'none', //可选值 ProxyNone:不使用代理，ProxyIE:使用系统代理，ProxyUser:使用 Http 代理
	 * 		server:'127.0.0.1', //代理服务器
	 * 		port:8080 //代理服务器端口
	 * 		account:'admin' //代理服务账号
	 * 		password:'pass01!' //代理服务密码
	 * }
	 * */
	owner.readProxy = function(callback) {
		callback(eval(window.external.GetProxyInfo())[0]) ;
	}

	/**
	 * 保存代理设置，proxyInfo 的结构参考 readProxy 方法
	 * */
	owner.saveProxy = function(proxyInfo, callback) {
		
		if (proxyInfo.type == "ProxyUser") 
		{
			
			window.external.SetProxyInfo(proxyInfo.account,proxyInfo.password, proxyInfo.server,proxyInfo.port)
			callback();
		}
		else
		{
			window.external.SetProxyType(proxyInfo.type);
			callback();
		};
	};

	/**
	 * 打开一个 URL
	 * */
	owner.openUrl = function(url) {
		window.external.WinOpenUrl(url);
	};

	/**
	 * 关闭程序
	 * */
	owner.close = function() {
		window.external.ExistIDE();
	};

	/**
	 * 重新启动
	 * */
	owner.restart = function() {
		window.external.HBuilderRestart();
	};

	/**
	 * 还原设置
	 * */
	owner.clearSettings = function() {
		window.external.ClearAllUserInfo();
	};

	/**
	 * 下载最新版本
	 * */
	owner.downloadLast = function() {
		window.external.WinOpenUrl("http://www.dcloud.io");
	};

}(this.invoke = {}));