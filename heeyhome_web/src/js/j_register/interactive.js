/**
 * 忘记密码
 */
/**
 * 闭包
 * ckk
 */
(function(){
	
	/**
	 * 需要require的公共方法或组件
	 */
	var HHIT_CENTERAPP = angular.module('heeyhomeApp');

	var CONFIRM = '/api/public/verification/confirm'; // 确认账号
	var INFORMATION = '/api/public/personal/userinfo'; // 用户信息
	var RESET = '/api/public/resetpassword'; // 重置密码
	var PHONE = '/api/public/verification/phoneverify'; // 手机验证
	var EMAIL = '/api/public/verification/emailverify'; // 邮箱验证
	var PHCODE = '/api/public/sendsms'; // 手机验证码
	var EMCODE = '/api/public/sendmail'; // 邮箱验证码
	/**
	* 移动号码归属地支持号段:134 135 136 137 138 139 147 150 151 152 157 158 159 178  182 183 184 187 188
	* 联通号码归属地支持号段:130 131 132  145 155 156 176  186 
	* 电信号码归属地支持号段:133 153 177 180 181 189 
	* 移动运营商:170
	*/
	var PHONEREG = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/; // 验证手机号正则表达式
	var EMAILREG = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/; //验证邮箱正则表达式
	var PSWREG = /^[0-9a-zA-Z_]{6,14}$/; // 验证密码的正则表达式
	var COUNT = 60; // 验证码间隔秒数
	// 错误提示文字
	var MSG0 = "邮箱不能为空";
	var MSG1 = "手机号不能为空";
	var MSG2 = "请输入有效的手机号码";
	var MSG3 = "密码不能为空";
	var MSG4 = "密码长度为6~14位不为空格的字符";
	var MSG5 = "确认密码不能为空";
	var MSG6 = "输入密码不一致";
	var MSG7 = "验证码不能为空";
	var MSG8 = "账户不能为空";
	var MSG9 = "验证码错误";
	var MSG10 = "请输入有效的邮箱";
	
	var forgetProcess = {
		/*
		 * 入口方法
		 */
		init : function() {
			forgetProcess.initEvent();
		},
		initEvent : function() {
			var self = this;
			self.sureAccount(); //确认账号
			self.quickReset(); //立即重置
			self.newPassword(); //新密码
		},
		/*
		 * 选择验证方式进入第二步
		 */
		sureAccount : function() {
			HHIT_CENTERAPP.controller('processOneCtrl', ['$scope', '$http', '$state',function ($scope, $http,$state) {
				$("#headerWrapper").remove();
                /* details */
                $(".guide span").eq(0).addClass("active").siblings().removeClass("active");//第一页的active
				$(".process_1 li input").on("click",function() { //选择验证方式
    				var belong = $(this).attr("data-belong");
    				sessionStorage.setItem("style",belong);
    				window.location.href="#/forget/public/process_2";
    			});				
            }]);			
		},
		/*
		 * 发送验证码进入第三步
		 */
		quickReset : function() {
			HHIT_CENTERAPP.controller('processTwoCtrl', ['$scope', '$http', '$state',function ($scope, $http,$state) {
				$("#headerWrapper").remove();
				$(".guide span").eq(1).addClass("active").siblings().removeClass("active");//第二页的active
				var style = sessionStorage.getItem("style");			
				if(style == "phone") {
					$(".process_2 .phone_validate").removeClass("display");
				} else {
					$(".process_2 .email_validate").removeClass("display");
				}																
				/* 重新选择验证方式 */
				$(".reselect").on("click",function() {
					window.location.href = "#/forget/public/process_1";
				});
				/* 获取验证码 */
				getCode.codeEvent();
				/* 点击进入第三步 */					
				ajaxSubmitThree.threeSection();		
            }]);
		},
		/*
		 * 新密码的确认
		 */
		newPassword : function() {
			HHIT_CENTERAPP.controller('processThreeCtrl', ['$scope', '$http', '$state',function ($scope, $http,$state) {
				$("#headerWrapper").remove();
				$(".guide span").eq(2).addClass("active").siblings().removeClass("active");//第三页的active
				/* 确定按钮的点击 */				
				complete.backLogin();
            }]);
		}
	};
	/*
	 * 点击获取验证码
	 */
	getCode = {
		codeEvent : function() {
			var $phcode = $(".phone_validate .phone_code .get_code"); //手机验证码按钮
			var $emcode = $(".email_validate .email_code .get_code"); //邮箱验证码按钮
			$phcode.on("click",function() { //手机验证码
				var $phone = $(".phone_validate .phone input"); //手机号
				var phoneVal = $phone.val(); //手机号的值				
				console.log(phoneVal);
				if(phoneVal == null || phoneVal == "") {
					inputErrorHendler.errorContent(MSG1,$phone);
					return;
				}else if(!PHONEREG.test(phoneVal)) {
					inputErrorHendler.errorContent(MSG2,$phone);
					return;
				}
				
				confirmCodeHendler.sendMessage($phcode,COUNT,"phone",phoneVal);
			});
			$emcode.on("click",function() { //邮箱验证码
				var $email = $(".email_validate .email .click"); //邮箱
				var emailVal = $(".email_validate .email .click").val(); //邮箱的值
				if(emailVal == null || emailVal == "") {
					inputErrorHendler.errorContent(MSG0,$email);
					return;
				}else if(!EMAILREG.test(emailVal)) {
					inputErrorHendler.errorContent(MSG10,$email);
					return;
				}
				confirmCodeHendler.sendMessage($emcode,COUNT,"email",emailVal);
			});
			clickInput.clickInputEvent(); //隐藏错误信息
		}
	};
	/*
	 * input的点击隐藏错误信息
	 */
	clickInput = {
		clickInputEvent : function() {
			$(".process .click").on("click",function() { // 点击隐藏错误信息					
				$(this).siblings("label").removeClass("whether");
				$(this).removeClass("inputClickError").addClass("inputClick").siblings().removeClass("itemClick");
//				if($(this).siblings("span").html() == "验证码") {
//					$(this).val("");
//				}
			});
		}
	};	
	/**
	 * 输入错误提示
	 * @param {Object} msg 错误提示文字
	 * @param {Object} element 错误所在之处
	 */
	inputErrorHendler = {
		errorContent : function(msg,element) {
			element.siblings("label").text(msg).addClass("whether").siblings("input").addClass("inputClickError");
		}
	};
	/**
	 * 验证码处理
	 * @param {Object} element 验证码控件
	 * @param {Object} count 验证码间隔秒数
	 * @param {Object} flag phone:手机验证码 email:邮箱验证码
	 * @param {Object} Val 需要发送验证码的地址
	 */
	confirmCodeHendler = {
		sendMessage : function(element,count,flag,Val) {
			// 设置验证码按钮效果，开始计时
			element.addClass("btnClick").attr("disabled",true);
			element.val(count + "秒后重新获取");
			InterValObj = window.setInterval(function(){
				if (count == 1) {                
			        window.clearInterval(InterValObj); // 停止计时器
			        element.removeClass("btnClick").removeAttr("disabled"); // 启用按钮
			        element.val("获取验证码");
			   	}else {
			        count--;
			        element.val(count + "秒后重新获取");
			    }
			},1000); // 启动计时器，1秒执行一次
			
			if(flag == 'phone') {
				// 向后台发送处理数据，向用户手机发送验证码
				$.ajax({
					url:PHCODE,
					type:"get",
					async:true,
					dataType: 'jsonp',
					data: {
						phone: Val
					},
					success:function(data){},
			    	error :function(data){
			    		
			    	}
				});
			} else {
				// 向后台发送处理数据，向用户邮箱发送验证码
				$.ajax({
					url:EMCODE,
					type:"get",
					async:true,
					dataType: 'jsonp',
					data: {
						email: Val
					},
					success:function(data){},
			    	error :function(data){
			  
			    	}
				});
			}
			
		}
	};
	/**
	 * ajax提交进入第三步
	 */
	ajaxSubmitThree = {
		threeSection : function() {
			$(".phone_validate .besure").on("click",function() {  //通过手机验证
				var $code = $(".phone_validate .phone_code .click"); //验证码
				var codeVal = $code.val(); //输入验证码的值
				var $phone = $(".phone_validate .phone .click"); //手机号
				var phoneVal = $phone.val(); //输入手机号的值 
				var flag = true;
				var $load = $("#loading");
				if(codeVal == null || codeVal == "") {
					inputErrorHendler.errorContent(MSG7,$code);
					flag = false;
				}
				if(phoneVal == null || phoneVal == "") {
					inputErrorHendler.errorContent(MSG1,$phone);
					flag = false;
				} else if(!PHONEREG.test(phoneVal)){
					inputErrorHendler.errorContent(MSG2,$phone);
					flag = false;
				}
				clickInput.clickInputEvent(); //隐藏错误信息
				// 验证后有错误则return 不提交
				if(!flag) {
					return;
				}
				$.ajax({
					type:"get",
					url:PHONE,
					async:true,
					dataType: "jsonp",
					data: {
						phone: phoneVal,
						captcha: codeVal
					},
					beforeSend : function() { // 向服务器发送请求前执行一些动作
						if(flag){
				        	$load.removeClass("display");
				        }
						// 禁用按钮防止重复提交
						$(".phone_validate .besure").attr("disabled",true);
					},
					success: function(data) {
						if(data != null && data.code == '000') {
							sessionStorage.setItem("user_flag",data.data.flag);	
							window.location.href="#/forget/public/process_3";
						} else if(data != null && data.code != '000') {					
							layer.alert(data.msg);
						}
					},
					complete : function() { // 向服务器发送请求成功后执行一些动作
						// 提交成功解禁提交按钮
					    $(".phone_validate .besure").removeAttr("disabled");
					    // 提交成功loading消失
			        	$load.addClass("display");
					},
					error : function(data) {}
				});
			});
			
			$(".email_validate .besure").on("click",function() {  //通过邮箱验证
				var $email = $(".email_validate .email input"); //邮箱
				var emailVal = $email.val(); //输入邮箱的值
				var $code = $(".email_validate .email_code .click"); //验证码
				var codeVal = $code.val(); //输入验证码的值
				var flag = true;
				var $load = $("#loading");
				if(codeVal == null || codeVal == "") {
					inputErrorHendler.errorContent(MSG7,$code);
					flag = false;
				}
				if(emailVal == null || emailVal == "") {
					inputErrorHendler.errorContent(MSG0,$email);
					flag = false;
				} else if(!EMAILREG.test(emailVal)){
					inputErrorHendler.errorContent(MSG10,$email);
					flag = false;
				}
				clickInput.clickInputEvent(); //隐藏错误信息
				// 验证后有错误则return 不提交
				if(!flag) {
					return;
				}
				$.ajax({
					type:"get",
					url:EMAIL,
					async:true,
					dataType: "jsonp",
					data: {
						email: emailVal,
						captcha: codeVal
					},
					beforeSend : function() { // 向服务器发送请求前执行一些动作
						if(flag){
				        	$load.removeClass("display");
				        }
						// 禁用按钮防止重复提交
						$(".email_validate .besure").attr("disabled",true);
					},
					success: function(data) {
						if(data != null && data.code == '000') {
							sessionStorage.setItem("user_flag",data.data.flag);	
							window.location.href="#/forget/public/process_3";
						} else if(data != null && data.code != '000') {					
							layer.alert(data.msg);
						}
					},
					complete : function() { // 向服务器发送请求成功后执行一些动作
						// 提交成功解禁提交按钮
					    $(".email_validate .besure").removeAttr("disabled");
					    // 提交成功loading消失
			        	$load.addClass("display");
					},
					error : function(data) {
					}
				});
			});
		}
	};
	/*
	 * 点击确定，进入登录页面
	 */
	complete = {
		backLogin : function() {
			$(".process_3 .sure").on("click",function() {
				var $newpassword = $(".new_password input"); //新的登录密码
				var newpasswordVal = $newpassword.val(); //新的登录密码的输入值
				var $surepassword = $(".sure_passowrd input"); //确认新密码
				var surepasswordVal = $surepassword.val(); //确认新密码的输入值
				var flag = true; // 判断能不能提交 true：能提交  false： 不能提交
				var $load = $("#loading");
				var user_flag = sessionStorage.getItem("user_flag"); //第二步传来的参数
				
				if(newpasswordVal == null || newpasswordVal == "") {
					inputErrorHendler.errorContent(MSG3,$newpassword);
					flag = false;
				} else if (!PSWREG.test(newpasswordVal)) {
					inputErrorHendler.errorContent(MSG4,$newpassword);
					flag = false;
				}
				if(surepasswordVal == null || surepasswordVal == "") {
					inputErrorHendler.errorContent(MSG5,$surepassword);
					flag = false;
				} else if (surepasswordVal != newpasswordVal) {
					inputErrorHendler.errorContent(MSG6,$surepassword);
					flag = false;
				}
				clickInput.clickInputEvent(); //隐藏错误信息
				// 验证后有错误则return 不提交
				if(!flag) {
					return;
				}
				$.ajax({
					type:"get",
					url:RESET,
					async:true,
					dataType: 'jsonp',
					data: {
						new_password : newpasswordVal,
						flag : user_flag
					},
					beforeSend : function() { // 向服务器发送请求前执行一些动作
						if(flag){
				        	$load.removeClass("display");
				        }
						// 禁用按钮防止重复提交
						$(".process_3 .sure").attr("disabled",true);
					},
					success : function(data) {
						if(data != null && data.code == '000') {
							window.location.href = "register.html";
						} else if(data != null && data.code != '000') {
							layer.alert(data.msg);
						}
					},
					complete : function() { // 向服务器发送请求成功后执行一些动作
						// 提交成功解禁提交按钮
			        	$(".process_3 .sure").removeAttr("disabled");
			        	// 提交成功loading消失
			        	$load.addClass("display");
					},
					error : function(data){}
				});
			});
		}
	};
	//入口方法调用
	forgetProcess.init();
})();
