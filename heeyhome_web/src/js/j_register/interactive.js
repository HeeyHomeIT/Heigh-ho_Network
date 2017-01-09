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

	var CONFIRM = 'http://hyu2387760001.my3w.com/verification/confirm'; // 确认账号
	var INFORMATION = 'http://hyu2387760001.my3w.com/personal/userinfo'; // 用户信息
	var RESET = 'http://hyu2387760001.my3w.com/resetpassword'; // 重置密码
	var PHONE = 'http://hyu2387760001.my3w.com/verification/phoneverify'; // 手机验证
	var EMAIL = 'http://hyu2387760001.my3w.com/verification/emailverify'; // 邮箱验证
	var PHCODE = 'http://hyu2387760001.my3w.com/sendsms'; // 手机验证码
	var EMCODE = 'http://hyu2387760001.my3w.com/sendmail'; // 邮箱验证码
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
		 * 确认账号进入第二步
		 */
		sureAccount : function() {
			HHIT_CENTERAPP.controller('processOneCtrl', ['$scope', '$http', '$state',function ($scope, $http,$state) {
				$("#headerWrapper").remove();
				$("#menuNavOuter").remove();
            	// 加载图片验证码插件
			 	require(['lib/jquery/jquery.idcode.js']);
                /* details */
                $(".guide span").eq(0).addClass("active").siblings().removeClass("active");//第一页的active
				$.idcode.setCode();   //加载生成验证码方法
				$(".process_1 .next_section").on("click",function() { //提交进入第二步
    				ajaxSubmitTwo.twoSection();
    			});
				
            }]);
			
		},
		/*
		 * 立即重置进入第三步
		 */
		quickReset : function() {
			HHIT_CENTERAPP.controller('processTwoCtrl', ['$scope', '$http', '$state',function ($scope, $http,$state) {
				$("#headerWrapper").remove();
				$("#menuNavOuter").remove();
				$(".guide span").eq(1).addClass("active").siblings().removeClass("active");//第二页的active
				var id = sessionStorage.getItem("user_id");
				var email = sessionStorage.getItem("user_email");
				var phone = sessionStorage.getItem("user_phone");
				var name = sessionStorage.getItem("user_name");
				var user_phone = doAccount.baseInformation(phone,3,7,'****');//账号信息打码
				var user_name = doAccount.baseInformation(name,3,7,'****');//账号信息打码
				if(!EMAILREG.test(email)) {
					$(".process_2 .email_quick p").html("您尚未绑定邮箱，无法进行此操作");
				} else {
					var user_email = doAccount.baseInformation(email,3,6,'***');//账号信息打码
					$(".process_2 .email_quick p span").html(user_email);
				}								
				$(".process_2 .process_title span").html(user_name);
				$(".process_2 .phone_quick p span").html(user_phone);								
				/* 立即重置的点击 */
				quickReset.validateMethod();
				/* 重新选择验证方式 */
				validate.reselectMethod();
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
				$("#menuNavOuter").remove();
				$(".guide span").eq(2).addClass("active").siblings().removeClass("active");//第三页的active
				var name = sessionStorage.getItem("user_name");
				var user_name = doAccount.baseInformation(name,3,7,'****');//账号信息打码
				$(".process_3 h3 span").html(user_name);
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
			var phone = sessionStorage.getItem("user_phone"); //手机号
			var $emcode = $(".email_validate .email_code .get_code"); //邮箱验证码按钮
			var email = sessionStorage.getItem("user_email"); //邮箱
			$phcode.on("click",function() { //手机验证码
//				if($phone.val() == null || $phone.val() == "") {
//					inputErrorHendler.errorContent(MSG1,$phone);
//					return;
//				}else if(!PHONEREG.test($phone.val())) {
//					inputErrorHendler.errorContent(MSG2,$phone);
//					return;
//				}
				confirmCodeHendler.sendMessage($phcode,COUNT,"phone",phone);
			});
			$emcode.on("click",function() { //邮箱验证码
//				if($email.val() == null || $email.val() == "") {
//					inputErrorHendler.errorContent(MSG0,$email);
//					return;
//				}else if(!EMAILREG.test($email.val())) {
//					inputErrorHendler.errorContent(MSG10,$email);
//					return;
//				}
				confirmCodeHendler.sendMessage($emcode,COUNT,"email",email);
			});
		}
	}
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
	 * 账号信息打码
	 * @param {Object} str 要替换的字符串
	 * @param {Object} begin 要替换的字符串中的起始位置
	 * @param {Object} end 要替换的字符串中的结束位置
	 * @param {Object} char 要替换成的字符串
	 */
	doAccount = {
		baseInformation : function(str,begin,end,char) {
			var temp1 = str.substring(0,begin);
			var temp2 = str.substring(begin,end);
			var temp3 = str.substring(end,str.length);
			return temp1+temp2.replace(temp2,char)+temp3;
		}
	};
	/*
	 * 点击立即重置事件
	 */
	quickReset = {
		validateMethod : function() {
			var phone = sessionStorage.getItem("user_phone"); //手机号
			var email = sessionStorage.getItem("user_email"); //邮箱
			$(".phone_quick input").on("click",function() { //手机的立即重置				
				$(".process_2 ul").addClass("display");
				$(".phone_validate").removeClass("display").children(".phone").find("input").val(phone);
			});
			if(!EMAILREG.test(email)) {
				$(".email_quick input").on("click",function() {
					layer.alert("您尚未绑定邮箱，请先绑定邮箱");
				})
			} else {
				$(".email_quick input").on("click",function() {
					$(".process_2 ul").addClass("display");
					$(".email_validate").removeClass("display").children(".email").find("input").val(email);
				})
			}			
//			$(".process_2 li input").on("click",function() {
//				var type = $(this).attr("data-belong");
//				var content = sessionStorage.getItem("user_"+ type); //手机号||邮箱
//				var $method = $("." + type + "_validate"); //立即验证的方式
//				var title = "您正在使用" + $(this).attr("data-title") + "方式验证身份，请完成以下操作"; //立即验证的标题
//				$method.removeClass("display").siblings("div").addClass("display").siblings("ul").addClass("display");
//				$(".process_2 .process_title").html(title);
//				console.log(content)
//				$("." + type).find("input").val(content);
//			})
		}
	};
	/*
	 * 点击重新选择验证方式事件
	 */
	validate = {
		reselectMethod : function() {
			$(".reselect").on("click",function() {
				$(this).parent().parent().addClass("display").siblings("ul").removeClass("display");
			});
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
	 * 错误提示框函数
	 * @param {Object} code 错误类型
	 */
	errorMsgHendler = {
		remindBox : function(msg) {
			var $reminderBox = $("#ReminderBox");
			var $rb = $(".remindebox");
			$reminderBox.removeClass("display");
			$(".info_header span").text(msg);
			$rb.stop().animate({
				"margin-top": "-150px",
				opacity: 1,
			}, 500);
			$(".remindemodel_ok").on("click",function() { // 点击'好的'关闭提示弹出框
				$rb.stop().animate({
	                "margin-top": "-40px",
	                opacity: 0
	            }, 500, function () {
	                $reminderBox.addClass("display");
	            });
			});
		}
	};
	/**
	 * ajax提交进入第二步
	 */
	ajaxSubmitTwo = {
		twoSection : function() { //进入第二步
			var flag = true; // 判断能不能提交 true：能提交  false： 不能提交
			var $load = $("#loading");
			var $account = $(".account_name input"); //账户名
			var accountVal = $account.val(); //输入账户名的值
			var $code = $(".confirm_code input"); //验证码input框
			var $codePlace = $(".confirm_code .code"); //验证码
			var codeVal = $code.val(); //输入验证码的值
			var $btn = $(".process_1 .next_section"); //下一步按钮
			var code_result = sessionStorage.getItem("result"); //图片验证码的返回值 0：正确 ；1：错误
			var IsBy = $.idcode.validateCode()  //调用返回值，返回值结果为true或者false
			/*
			 * 相关验证
			 */
			if(accountVal == null || accountVal == "") {
				inputErrorHendler.errorContent(MSG8,$account);
				flag = false;
			}
			if(codeVal == null || codeVal == "") {
				inputErrorHendler.errorContent(MSG7,$code);
				flag = false;
			}else if(!IsBy) {
				inputErrorHendler.errorContent(MSG9,$code);
				flag = false;
			}
			clickInput.clickInputEvent(); //隐藏错误信息
			// 验证后有错误则return 不提交
			if(!flag) {
				return;
			}
			$.ajax({
				type:"get",
				url:CONFIRM,
				async:true,
				dataType: "jsonp",
				data: {
					account: accountVal
				},
				beforeSend : function() { // 向服务器发送请求前执行一些动作
					if(flag){
			        	$load.removeClass("display");
			        }
					// 禁用按钮防止重复提交
					$btn.attr("disabled",true);
				},
				success: function(data) {
					if(data != null && data.code == '000') {
						sessionStorage.setItem("user_id",data.data.user_id);
						sessionStorage.setItem("user_name",data.data.user_name);
						sessionStorage.setItem("user_phone",data.data.user_phone);
						sessionStorage.setItem("user_email",data.data.user_email);
						window.location.href="#/forget/public/process_2";
						//$state.go("forget.public.process_2");
					} else if(data != null && data.code != '000') {					
						layer.alert(data.msg);
					}
				},
				complete : function() { // 向服务器发送请求成功后执行一些动作
					// 提交成功解禁提交按钮
				    $btn.removeAttr("disabled");
				    // 提交成功loading消失
			        $load.addClass("display");
				},
				error : function(data) {}
			});
		},
	};	
	/**
	 * ajax提交进入第三步
	 */
	ajaxSubmitThree = {
		threeSection : function() {
			$(".phone_validate .besure").on("click",function() {  //通过手机验证
				var $code = $(".phone_validate .phone_code .click"); //验证码
				var codeVal = $code.val(); //输入验证码的值
				var flag = true;
				var $load = $("#loading");
				var id = sessionStorage.getItem("user_id");
				var phone = sessionStorage.getItem("user_phone");
				if(codeVal == null || codeVal == "") {
					inputErrorHendler.errorContent(MSG7,$code);
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
						user_id: id,
						phone: phone,
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
							//$state.go("forget.public.process_2");
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
				//var $email = $(".email_validate .email input"); //邮箱
				//var emailVal = $email.val(); //输入邮箱的值
				var $code = $(".email_validate .email_code .click"); //验证码
				var codeVal = $code.val(); //输入验证码的值
				var flag = true;
				var $load = $("#loading");
				var id = sessionStorage.getItem("user_id");
				var email = sessionStorage.getItem("user_email");
				$(".email_validate .email input").val(email);
				if(codeVal == null || codeVal == "") {
					inputErrorHendler.errorContent(MSG7,$code);
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
						user_id: id,
						email: email,
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
							//$state.go("forget.public.process_2");
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
				var id = sessionStorage.getItem("user_id");
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
						user_id :  id,
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
