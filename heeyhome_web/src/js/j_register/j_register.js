(function(){
	var REGISTER = "http://hyu2387760001.my3w.com/register/user_register"; // 获取注册接口
	var LOGIN = "http://hyu2387760001.my3w.com/login/login";//获取登录接口
	var CODE = "http://hyu2387760001.my3w.com/sendsms"; // 获取验证码接口 
	var TEXT_1 = "亲,手机号不能为空";//错误提示文字1
	var TEXT_2 = "亲,请输入有效的手机号码";//错误提示文字2
	var TEXT_3 = "亲,密码不能为空";//错误提示文字3
	var TEXT_4 = "亲,密码长度为6~14个不为空格的字符";//错误提示文字4
	var TEXT_5 = "亲,确认密码不能为空";//错误提示文字5
	var TEXT_6 = "亲,输入的密码不一致";//错误提示文字6
	var TEXT_7 = "验证码不能为空";//错误提示文字7
	
	var heeyhomeRegister = {
		/*
		 * 初始化
		 */
		init : function() {
			heeyhomeRegister.tabSelect();
			heeyhomeRegister.getConfirmCode();
			heeyhomeRegister.clickInput();
			heeyhomeRegister.promptlyRegister();
			heeyhomeRegister.passwordSave();
			heeyhomeRegister.thirdLogin();
		},
		/*
		 * 登录注册标签切换模块
		 */
		tabSelect : function() {
			var self = this;
			self.tabSelectEvent();
		},
		/*
		 * 点击立即注册/登录
		 */
		promptlyRegister : function() {
			var self = this;
			self.promptlyRegisterEvent();			
		},
		/*
		 * input框的点击效果
		 */
		clickInput : function() {
			var self = this;
			self.clickInputEvent();
		},
		/*
		 * 点击获取验证码
		 */
		getConfirmCode : function() {
			var self = this;
			self.getConfirmCodeEvent();
		},
		/*
		 * 记住密码
		 */
		passwordSave : function() {
			var self = this;
			self.passwordSaveEvent();
		},
		/*
		 * 第三方登录
		 */
		thirdLogin : function() {
			var self = this;
			self.thirdLoginEvent();
		},
		/*
		 * 登录注册标签切换内容
		 */
		tabSelectEvent : function() {
			var _tab = $(".tab li"); // 注册登录的标题
			$(_tab).on ({
				click:function() {
					var index = $(this).index(); //获取当前点击的LI是第几个
					detailTab.fashTab(index);//切换注册登录DIV面板
				}
			});		
		},
		/*
		 * 点击立即注册/登录内容
		 */
		promptlyRegisterEvent : function() {
			var _submit = $(".promptly .promptly_do");
			var _information = "";
			$(_submit).on({
				click : function() {
					_information = window.location.hash;
					if(_information != null && _information != ""){
						switch(_information) {    
							case "#zc":      
								ajaxSubmit.submitInformation("zc"); //ajax注册信息  
								break;
							case "#dl":    
							    ajaxSubmit.submitInformation("dl"); //ajax登录信息     
				    			break;      
						} 
					}
				}
			});
		},
		/*
		 * input框的点击内容
		 */
		clickInputEvent : function() { 
			$(".main").find("input").on("click",function() { //点击隐藏错误信息
				$(this).siblings("label").removeClass("whether");
				$(this).parent("div.registerItem").removeClass("itemClickError").addClass("itemClick").siblings().removeClass("itemClick");
			});
			$(".remindemodel_ok").on("click",function() { //点击“好的”关闭提示弹出框
				 $(".remindebox").stop().animate({
	                "margin-top": "-40px",
	                opacity: 0
	            }, 500, function () {
	                $("#ReminderBox").addClass("display");
	            });
			});
		},
		/*
		 * 点击获取验证码内容
		 */
		getConfirmCodeEvent : function() {
			var _btnSendCode = $(".zc_btnSendCode"); //验证码按钮
			var _zc_phone = $(".zc_phone");
			var count = 60; //验证码间隔秒数
			var phoneReg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/; //验证手机号正则表达式
			$(_btnSendCode).on("click",function() { //点击验证码时进行验证
				if(_zc_phone.val() == null || _zc_phone.val() == "") {
					inputError.display(TEXT_1,_zc_phone);
					return;
				}else if(!phoneReg.test(_zc_phone.val())) {
					inputError.display(TEXT_2,_zc_phone);
					return;
				}
				confirmCode.sendMessage(_btnSendCode,count,"zc",_zc_phone.val());
			});
		},
		/*
		 * 记住密码内容
		 */
		passwordSaveEvent : function() {
			var _user = $(".dl_phone").val();
	        var _password = $(".dl_password").val();
	        var _rememberFlag = $(".remember");
	        var user = $.base64.decode($.cookie("user"));
	        var userPassword = $.base64.decode($.cookie("a"));
	        var checkedFlag = $.cookie("checked");
	        var passwordReg = /^[0-9a-zA-Z_]{6,14}$/; //验证密码的正则表达式
	        if (user != null && user != "") {
	            $(".dl_iphone").val(user);
	        }
	        if (userPassword != null && userPassword != "" && passwordReg.test(userPassword)) {
	            $(".dl_password").val(userPassword);
	        }
	        if (checkedFlag == 1) {
	            _rememberFlag.attr("checked", true);
	        }
	        _rememberFlag.on("click", function () {
	            if (_rememberFlag.prop("checked")) {
	                $.cookie("checked", 1); // 1:记住密码框选择 0：记住密码框不选择
	            } else {
	                // 当记住密码不选中是把session中的值删掉
	                $.cookie("checked", null);
	                $.cookie("user", null);
	                $.cookie("a", null);
	            }
	
	        });
		},
		/*
		 * 第三方登录内容
		 */
		thirdLoginEvent: function () {
	        $('.qq').on('click', function () {
	            window.location.href = "http://hyu2387760001.my3w.com/qqlogin";
	        });
	        $('.wechat').on('click', function () {
	            window.location.href = "http://hyu2387760001.my3w.com/wxlogin";
	        });
	    }
	};
	/**
	 * 切换注册登录DIV面板
	 * @param {Object} flag 0：注册 1：登录  flag(0：第一个li 1：第二个li)
	 */
	detailTab = {
		fashTab : function(flag) {
			var _tabrj = $(".container .tab .tab_click_register");//注册标签
	        var _tablg = $(".container .tab .tab_click_login");//登录标签
	        var _register = $(".container .main .register");//注册内容
	        var _login = $(".container .main .login");//登录内容
	        var _tdlogin = $(".container .main .third_login");//第三方登录内容
	        var _title = $(".container .main .logo_title img");//标题图片
	        var _button = $(".container .main .promptly .promptly_do");//立即注册按钮
	        if(flag) {
				_login.removeClass("display");
				_register.addClass("display");					
				_tdlogin.removeClass("display");
				_tablg.addClass("active color_3").removeClass("color_2");
				_tabrj.addClass("color_2").removeClass("active color_1");
				_title.attr("src","../../image/register.png");
				_button.removeClass("margin_top_1").addClass("margin_top_2").attr("value","立即登录");
				window.location.hash = "#dl"; //设置 href 属性中在井号“#”后面的分段
			}else {
				_register.removeClass("display");
				_login.addClass("display");					
				_tdlogin.addClass("display");
				_tabrj.addClass("active color_1").removeClass("color_2");
				_tablg.addClass("color_2").removeClass("active color_3");
				_title.attr("src","../../image/login.png");
				_button.removeClass("margin_top_2").addClass("margin_top_1").attr("value","立即注册");
				window.location.hash = "#zc"; //设置 href 属性中在井号“#”后面的分段
			}
		}
	};
	/**
	 * 进行ajax登录注册信息
	 * @param {Object} hash dl：登录信息 zc：注册信息
	 */
	ajaxSubmit = {
		submitInformation : function(hash) {
			var _phone = $("."+hash+"_phone"); //手机号
			var _phoneVal = _phone.val();//输入手机号值
			var _password = $("."+hash+"_password"); // 密码
			var _passwordVal = _password.val(); // 输入密码值
			var _surepassword = $("."+hash+"_sure_password"); //确认密码
			var _surepasswordVal = _surepassword.val(); // 输入确认密码值
			var _codes = $("."+hash+"_codes"); //验证码
			var _codesVal = _codes.val(); // 输入验证码值
			var _rememberFlag = $(".remember"); // 记住密码
			var flag = true;
			/**
			* 移动号码归属地支持号段:134 135 136 137 138 139 147 150 151 152 157 158 159 178  182 183 184 187 188
			* 联通号码归属地支持号段:130 131 132  145 155 156 176  186 
			* 电信号码归属地支持号段:133 153 177 180 181 189 
			* 移动运营商:170
			*/
			var phoneReg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/; //验证手机号正则表达式
			var passwordReg = /^[0-9a-zA-Z_]{6,14}$/; //验证密码的正则表达式
			/**
			 * 相关验证
			 */
			if(_phoneVal == null || _phoneVal == "") {
				inputError.display(TEXT_1,_phone);
				flag = false;
			}else if(_phoneVal.length != 11) {
				inputError.display(TEXT_2,_phone);
				flag = false;
			}else if(!phoneReg.test(_phoneVal)) {
				inputError.display(TEXT_2,_phone);
				flag = false;
			}
			if(_passwordVal == null || _passwordVal == "") {
				inputError.display(TEXT_3,_password);
				flag = false;
			}else if(!passwordReg.test(_passwordVal)) {
				inputError.display(TEXT_4,_password);
				flag = false;
			}
			//只有在注册的时候才会输入确认密码和验证码
			if(hash == "zc"){
				if(_surepasswordVal == null || _surepasswordVal == "") {
					inputError.display(TEXT_5,_surepassword);
					flag = false;
				}else if(_surepasswordVal != _passwordVal) {
					inputError.display(TEXT_6,_surepassword);
					flag = false;
				}
				if(_codesVal == null || _codesVal == "") {
					inputError.display(TEXT_7,_codes);
					flag = false;
				}
			}
			//验证后有错误则return掉不提交
			if(!flag) {
				return;
			}
			if(hash == "zc") {
				$.ajax({
					type:"get",
					url:REGISTER,
					async:true,
					dataType:"jsonp",
					data:{
						phone:_phoneVal,
						password:_passwordVal,
						captcha:_codesVal
					},
					beforeSend : function() { //向服务器发送请求前执行一些动作
						if(flag){
			        		$("#loading").removeClass("display");
			        	}
						// 禁用按钮防止重复提交
						$(".promptly .promptly_do").attr("disabled",true);
					},
					success:function(data) {
						if (data != null && data.code == '000') {  //正确
			                $.cookie("userId",data.data.user_id);
			                $.cookie("userName",data.data.user_name);
			                $.cookie("nickName",data.data.nickname);
			                //window.location.href = "../../index2.html?userName=" + data.data.user_name; //进行登录
			                 detailTab.fashTab(1);//进入登录页面
			           }else if(data != null && data.code != '000') { //错误
			            	remind.remindBox(data.code);
			            }
					},
					complete : function() { //向服务器发送请求成功后执行一些动作
						// 提交成功解禁提交按钮
			        	$(".promptly .promptly_do").removeAttr("disabled");
			        	//提交成功loading消失
			        	$("#loading").addClass("display");
					},
					error : function(data) {
						
					}
				});
			}else {
				$.ajax({
			        url: LOGIN,
			        type: "GET",
			        async: true,
			        dataType: 'jsonp',
			        data: {
			            account: _phoneVal,
			            password: _passwordVal
			        },
			        beforeSend: function () { //向服务器发送请求前执行一些动作
			
			            if (flag) {
			                $("#loading").removeClass("display");
			            }
			            // 禁用按钮防止重复提交
			            $(".promptly_do").attr("disabled", true);
			
			            if (_phoneVal != null && _passwordVal != null && _phoneVal != "" && _passwordVal != "") {
			                if (_rememberFlag.prop("checked")) {
			                    //如果用户选择记住密码存储手机号和密码到session中
			                    //$.cookie($.base64.encode('电话'), $.base64.encode(_phoneVal));
			                    $.cookie("user", $.base64.encode(_phoneVal), {expires: 7, path: '/'});
			                    $.cookie("a", $.base64.encode(_passwordVal), {expires: 7, path: '/'});
			                    /* 用户密码 */
			                    $.cookie("checked", 1); // 1:记住密码框选择 0：记住密码框不选择
			                } else {
			                    //如果用户不选择记住密码那么从session中去除手机号和密码
			                    $.cookie("user", null);
			                    $.cookie("a", null);
			                    $.cookie("checked", null);
			                }
			            }
			        },
			        success: function (data) {
			            if (data != null && data.code == '000') {
			                //$.cookie("us", $.base64.encode(data.data.user_id&data.data.user_name&data.data.user_type));
			                $.cookie("userId", $.base64.encode(data.data.user_id), {expires: 7, path: '/'});
			                $.cookie("userName", $.base64.encode(data.data.user_name), {expires: 7, path: '/'});
			                $.cookie("userType", $.base64.encode(data.data.user_type), {expires: 7, path: '/'});
			                //alert('登录成功');
			                window.location.href = "../../index2.html?name=" + data.data.user_name; //进行跳转
			            }else if(data != null && data.code != '000') { //错误
			            	remind.remindBox(data.code);
			            }
			        },
			        complete: function () { //向服务器发送请求成功后执行一些动作
			            // 提交成功解禁提交按钮
			            $(".promptly_do").removeAttr("disabled");
			            //提交成功loading消失
			            $("#loading").addClass("display");
			        },
			        error: function (data) {
			        }
			    });
			}
			
		}
	};
	/**
	 * 验证码处理
	 * @param {Object} btnSendCode 验证码控件
	 * @param {Object} count 验证码间隔秒数
	 * @param {Object} flag zc:注册的验证码 cz:重置的验证码
	 * @param {Object} phoneVal 需要注册的手机号码
	 */
	confirmCode = {
		sendMessage : function(btnSendCode,count,flag,phoneVal) {
			timeCount = count;
			//设置验证码按钮效果，开始计时
			btnSendCode.attr("disabled",true);
			btnSendCode.val(timeCount + "秒后重新获取");
			InterValObj = window.setInterval(function(){
				timer.setRemainTime(btnSendCode);
			},1000); //启动计时器，1秒执行一次
			
			//向后台发送处理数据，向用户发送验证码
			$.ajax({
				url:CODE,
				type:"get",
				async:true,
				dataType: 'jsonp',
				data: {
					phone: phoneVal
				},
				beforeSend:function(){ //向服务器发送请求前执行一些动作
				},
				success:function(data){
				},
				complete: function () { //向服务器发送请求成功后执行一些动作
		    	},
		    	error :function(data){
				}
		    	
			});
		}
	};
	/**
	 * 计时器处理函数
	 * @param {Object} btnSendCode 验证码控件
	 */
	timer = {
		setRemainTime : function(btnSendCode) {
			if (timeCount == 1) {                
		        window.clearInterval(InterValObj);//停止计时器
		        btnSendCode.removeAttr("disabled");//启用按钮
		        btnSendCode.val("获取验证码");
		   	}else {
		        timeCount--;
		        btnSendCode.val(timeCount + "秒后重新获取");
		    }
		}
	};
	/**
	 * 注册错误提示框函数
	 * @param {Object} code 错误类型
	 */
	remind = {
		remindBox : function(code) {
			var txt;//具体的错误信息
			if(code == 113) {
				txt = "账户已存在,注册失败!";	
			}else if(code == 112) {
				txt = "注意,用户名、密码、验证码不能为空!";
			}else if(code == 119) {
				txt = "注册失败,短信验证码超时！";
			}else if(code == 118) {
				txt = "注册失败,短信验证码错误！";
			}else if(code == 111) {
				txt = "亲,登录失败";
			}else if(code == 114) {
				txt = "亲,登录失败，账户不存在!";
			}else if(code == 115) {
				txt = "亲,登录失败,密码不正确!";
			}			
			else {
				txt = "未知错误发生！";
			}
			$("#ReminderBox").removeClass("display");
			$(".info_header span").text(txt);
			$(".remindebox").stop().animate({
				"margin-top": "-150px",
				opacity: 1,
			}, 500);
		}
	};
	/**
	 * 登录注册输入错误提示函数
	 * @param {Object} writing 错误提示文字
	 * @param {Object} place 错误所在之处
	 */
	inputError = {
		display : function(writing,place) {
			place.siblings("label").text(writing).addClass("whether").parent("div").addClass("itemClickError");
		}
	};
	
	var InterValObj; //计时器变量，控制时间
	var timeCount;//当前剩余秒数
	var _hash = window.location.hash; //获取 href 属性中在井号“#”后面的分段
	//如果井号后面的属性值为空或者为NULL，则默认显示登录界面
	if(_hash == "" || _hash == null){
		_hash = "#dl";
		window.location.hash = "#dl";
	}
	switch(_hash){    
		case "#zc":      
			detailTab.fashTab(0);   //显示注册界面面板
			break;
		case "#dl":    
		    detailTab.fashTab(1);   //显示登录界面面板    
		    break;     
//		case "#wj":
//			showforgetPasswordHtml();    //显示重置密码界面面板
			
	}
	//入口方法调用
	heeyhomeRegister.init();
})();