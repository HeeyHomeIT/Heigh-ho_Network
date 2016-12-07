/**
 * 注册登录js
 */
(function(){
	
	var HASH = window.location.hash; // 获取 href 属性中在井号“#”后面的分段
	var REGISTERURL = "http://hyu2387760001.my3w.com/register/user_register"; // 获取注册接口
	var LOGINURL = "http://hyu2387760001.my3w.com/login/login"; // 获取登录接口
	var CODEURL = "http://hyu2387760001.my3w.com/sendsms"; // 获取验证码接口 
	var QQLOGINURL = "http://hyu2387760001.my3w.com/qqlogin"; // QQ登录接口
	var WXLOGINURL = "http://hyu2387760001.my3w.com/wxlogin"; // 微信登录接口
	/**
	* 移动号码归属地支持号段:134 135 136 137 138 139 147 150 151 152 157 158 159 178  182 183 184 187 188
	* 联通号码归属地支持号段:130 131 132  145 155 156 176  186 
	* 电信号码归属地支持号段:133 153 177 180 181 189 
	* 移动运营商:170
	*/
	var PHONEREG = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/; // 验证手机号正则表达式
	var PSWREG = /^[0-9a-zA-Z_]{6,14}$/; // 验证密码的正则表达式
	// 错误提示文字
	var MSG1 = "手机号不能为空";
	var MSG2 = "请输入有效的手机号码";
	var MSG3 = "密码不能为空";
	var MSG4 = "密码长度为6~14位不为空格的字符";
	var MSG5 = "确认密码不能为空";
	var MSG6 = "输入密码不一致";
	var MSG7 = "验证码不能为空";
	
	/* 定义一个类 */
	var loginWrap = {
		
		/* 入口方法 */
		init : function() {
			/**
             * 业务代码
             */
			loginWrap.initEvent();
		},
		initEvent: function() {
        	var self = this;
        	self.initLoginEvent();
        	self.tabSelectEvent(); // 登录注册标签切换模块
        	self.clickInputEvent(); // input框的点击内容
        	self.clickLoginEvent(); // 点击立即注册/登录
        	self.pswSaveEvent(); // 记住密码
        	self.getConfirmCodeEvent(); // 点击获取验证码内容
        	self.thirdLoginEvent(); // 第三方登录
        },
        initLoginEvent: function() {
        	// 如果井号后面的属性值为空或者为NULL，则默认显示登录界面
			if(HASH == "" || HASH == null){
				HASH = "#dl";
				window.location.hash = "#dl";
			}
			switch(HASH){    
				case "#zc":      
					changeTabHendler.swtchTab(0); // 显示注册界面面板
					break;
				case "#dl":    
				   	changeTabHendler.swtchTab(1); // 显示登录界面面板    
				    break;     
			}
        },
        /*
		 * 登录注册标签切换模块
		 */
		tabSelectEvent : function() {
			var $tabLi = $(".tab li"); // 注册登录的标题
			$tabLi.on("click",function(){
				changeTabHendler.swtchTab($(this).index()); // 根据获取当前点击的li是第几个,切换注册登录DIV面板
			});
		},
		/*
		 * input框的点击内容
		 */
		clickInputEvent : function() { 
			$(".main input").on("click",function() { // 点击隐藏错误信息
				$(this).siblings("label").removeClass("whether");
				$(this).parent("div.registerItem").removeClass("itemClickError").addClass("itemClick").siblings().removeClass("itemClick");
			});
		},
		/*
		 * 点击立即注册/登录内容
		 */
		clickLoginEvent : function() {
			var $submit = $(".promptly_do");
			$submit.on("click",function(){
				var hash = window.location.hash;
				var info = hash.split("#")[1]; // 对字符串进行分割得到dl或zc
				if(hash != null && hash != "") {
					ajaxSubmitHendler.submitInfo(info); // ajax注册或登录  
				}
			});
		},
		/*
		 * 记住密码内容
		 */
		pswSaveEvent : function(){
	        var $remember = $(".remember");
	        var userVal = $.cookie("user");
	        var userPswVal = $.cookie("a");
	        var checkFlagVal = $.cookie("checked");
	        if (userVal != null && userVal != "") {
	            $(".dl_iphone").val($.base64.decode(userVal));
	        }
	        if (userPswVal != null && userPswVal != "" && PSWREG.test(userPswVal)) {
	            $(".dl_password").val($.base64.decode(userPswVal));
	        }
	        if (checkFlagVal == 1) {
	            $remember.attr("checked", true);
	        }
	        $remember.on("click", function () {
	            if ($remember.prop("checked")) {
	                $.cookie("checked", 1); // 1:记住密码框选择 0：记住密码框不选择
	            } else {
	                // 当记住密码不选中是把session中的值删掉
	                $.cookie("checked", null, {expires: -1,path: '/'});
	                $.cookie("user", null, {expires: -1,path: '/'});
	                $.cookie("a", null, {expires: -1,path: '/'});
	            }
	
	        });
		},
		/*
		 * 点击获取验证码内容
		 */
		getConfirmCodeEvent : function() {
			var $codeBtn = $(".zc_btnSendCode"); // 验证码按钮
			var $zcPhone = $(".zc_phone");
			var COUNT = 60; // 验证码间隔秒数
			$codeBtn.on("click",function() { // 点击验证码时进行验证
				if($zcPhone.val() == null || $zcPhone.val() == "") {
					inputErrorHendler.errorContent(MSG1,$zcPhone);
					return;
				}else if(!PHONEREG.test($zcPhone.val())) {
					inputErrorHendler.errorContent(MSG2,$zcPhone);
					return;
				}
				confirmCodeHendler.sendMessage($codeBtn,COUNT,"zc",$zcPhone.val());
			});
		},
		/*
		 * 第三方登录内容
		 */
		thirdLoginEvent: function () {
	        $('.qq').on('click', function () {
	            window.location.href = QQLOGINURL;
	        });
	        $('.wechat').on('click', function () {
	            window.location.href = WXLOGINURL;
	        });
	    }
	};
	/**
	 * 切换注册登录DIV面板
	 * @param {Object} flag 0：注册 1：登录  flag(0：第一个li 1：第二个li)
	 */
	changeTabHendler = {
		swtchTab: function(flag){
	        var $tab = $(".container .tab"); // 标签
	        var $main = $(".container .main"); // 内容
	        if(flag) {
				$main.find(".login,.third_login").removeClass("display"); // 登录内容和第三方登录内容显示
				$main.find(".register").addClass("display"); // 注册内容隐藏
				$tab.find(".tab_click_login").addClass("active").siblings(".tab_click_register").removeClass("active"); // 登录标签添加样式,注册标签删掉样式
				$main.children(".logo_title").find("img").attr("src","../../image/register.png"); // 内容标签图标修改
				$main.find(".promptly_do").removeClass("margin_top_1").addClass("margin_top_2").attr("value","立即登录"); // 立即注册按钮改变
				window.location.hash = "#dl"; // 设置 href属性中在井号'#'后面的分段为dl
			}else {
				$main.find(".register").removeClass("display"); // 注册内容显示
				$main.find(".login,.third_login").addClass("display"); // 登录内容和第三方登录内容隐藏
				$tab.find(".tab_click_register").addClass("active").siblings(".tab_click_login").removeClass("active"); // 注册标签添加样式,登录标签删掉样式
				$main.children(".logo_title").find("img").attr("src","../../image/login.png"); // 内容标签图标修改
				$main.find(".promptly_do").removeClass("margin_top_2").addClass("margin_top_1").attr("value","立即注册"); // 立即注册按钮改变
				window.location.hash = "#zc"; // 设置 href属性中在井号'#'后面的分段zc
			}
		}
	};
	/**
	 * 进行ajax登录注册信息
	 * @param {Object} hash dl：登录信息 zc：注册信息
	 */
	ajaxSubmitHendler = {
		submitInfo : function(hash) {
			var $phone = $("."+hash+"_phone"); // 手机号
			var phoneVal = $phone.val(); // 输入手机号值
			var $psw = $("."+hash+"_password"); // 密码
			var pswVal = $psw.val(); // 输入密码值
			var $surePsw = $("."+hash+"_sure_password"); // 确认密码
			var surePswVal = $surePsw.val(); // 输入确认密码值
			var $code = $("."+hash+"_codes"); // 验证码
			var codeVal = $code.val(); // 输入验证码值
			var $rememberFlag = $(".remember"); // 记住密码
			var flag = true; // 判断能不能提交 true：能提交  false： 不能提交
			var $load = $("#loading");
			var $btn = $(".promptly_do");
			/**
			 * 相关验证
			 */
			if(phoneVal == null || phoneVal == "") {
				inputErrorHendler.errorContent(MSG1,$phone);
				flag = false;
			}else if(phoneVal.length != 11 || !PHONEREG.test(phoneVal)) {
				inputErrorHendler.errorContent(MSG2,$phone);
				flag = false;
			}
			if(pswVal == null || pswVal == "") {
				inputErrorHendler.errorContent(MSG3,$psw);
				flag = false;
			}else if(!PSWREG.test(pswVal)) {
				inputErrorHendler.errorContent(MSG4,$psw);
				flag = false;
			}
			// 只有在注册的时候才会输入确认密码和验证码
			if(hash == "zc"){
				if(surePswVal == null || surePswVal == "") {
					inputErrorHendler.errorContent(MSG5,$surePsw);
					flag = false;
				}else if(surePswVal != pswVal) {
					inputErrorHendler.errorContent(MSG6,$surePsw);
					flag = false;
				}
				if(codeVal == null || codeVal == "") {
					inputErrorHendler.errorContent(MSG7,$code);
					flag = false;
				}
			}
			// 验证后有错误则return 不提交
			if(!flag) {
				return;
			}
			if(hash == "zc") {
				$.ajax({
					type:"get",
					url:REGISTERURL,
					async:true,
					dataType:"jsonp",
					data:{
						phone:phoneVal,
						password:pswVal,
						captcha:codeVal
					},
					beforeSend : function() { // 向服务器发送请求前执行一些动作
						if(flag){
			        		$load.removeClass("display");
			        	}
						// 禁用按钮防止重复提交
						$btn.attr("disabled",true);
					},
					success:function(data) {
						if (data != null && data.code == '000') {  //正确
//			                $.cookie("userId",data.data.user_id);
//			                $.cookie("userName",data.data.user_name);
//			                $.cookie("nickName",data.data.nickname);
			                //window.location.href = "../../index2.html?userName=" + data.data.user_name; //进行登录
			                changeTabHendler.swtchTab(1); // 进入登录页面
			            } else if(data != null && data.code != '000') { //错误
			            	errorMsgHendler.remindBox(data.msg);
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
			} else if(hash == "dl") {
				$.ajax({
			        url: LOGINURL,
			        type: "GET",
			        async: true,
			        dataType: 'jsonp',
			        data: {
			            account: phoneVal,
			            password: pswVal
			        },
			        beforeSend: function () { // 向服务器发送请求前执行一些动作
			            if (flag) {
			                $load.removeClass("display");
			            }
			            // 禁用按钮防止重复提交
			            $btn.attr("disabled", true);
			
			            if (phoneVal != null && pswVal != null && phoneVal != "" && pswVal != "") {
			                if ($rememberFlag.prop("checked")) {
			                    // 如果用户选择记住密码存储手机号和密码到cookie中
			                    $.cookie("user", $.base64.encode(phoneVal), {expires: 7, path: '/'});
			                    $.cookie("a", $.base64.encode(pswVal), {expires: 7, path: '/'});
			                    /* 用户密码 */
			                    $.cookie("checked", 1); // 1:记住密码框选择 0：记住密码框不选择
			                } else {
			                    // 如果用户不选择记住密码那么从cookie中去除手机号和密码
			                    $.cookie("user", null, {expires: -1,path: '/'});
			                    $.cookie("a", null, {expires: -1,path: '/'});
			                    $.cookie("checked", null, {expires: -1,path: '/'});
			                }
			            }
			        },
			        success: function (data) {
			            if (data != null && data.code == '000') {
			                $.cookie("userId", $.base64.encode(data.data.user_id), {expires: 7, path: '/'});
			                $.cookie("userName", $.base64.encode(data.data.user_name), {expires: 7, path: '/'});
			                $.cookie("userType", $.base64.encode(data.data.user_type), {expires: 7, path: '/'});
			                //alert('登录成功');
			                window.location.href = "../../index2.html?name=" + data.data.user_name; // 进行跳转
			            }else if(data != null && data.code != '000') { // 错误
			            	errorMsgHendler.remindBox(data.msg);
			            }
			        },
			        complete: function () { // 向服务器发送请求成功后执行一些动作
			            // 提交成功解禁提交按钮
			            $btn.removeAttr("disabled");
			            // 提交成功loading消失
			            $load.addClass("display");
			        },
			        error: function (data) {}
			    });
			}
			
		}
	};
	/**
	 * 验证码处理
	 * @param {Object} element 验证码控件
	 * @param {Object} count 验证码间隔秒数
	 * @param {Object} flag zc:注册的验证码 cz:重置的验证码
	 * @param {Object} phoneVal 需要注册的手机号码
	 */
	confirmCodeHendler = {
		sendMessage : function(element,count,flag,phoneVal) {
			// 设置验证码按钮效果，开始计时
			element.addClass("zc_btnClick").attr("disabled",true);
			element.val(count + "秒后重新获取");
			InterValObj = window.setInterval(function(){
				if (count == 1) {                
			        window.clearInterval(InterValObj); // 停止计时器
			        element.removeClass("zc_btnClick").removeAttr("disabled"); // 启用按钮
			        element.val("获取验证码");
			   	}else {
			        count--;
			        element.val(count + "秒后重新获取");
			    }
			},1000); // 启动计时器，1秒执行一次
			
			// 向后台发送处理数据，向用户发送验证码
			$.ajax({
				url:CODEURL,
				type:"get",
				async:true,
				dataType: 'jsonp',
				data: {
					phone: phoneVal
				},
				success:function(data){},
		    	error :function(data){}
			});
		}
	};
	/**
	 * 登录注册输入错误提示
	 * @param {Object} msg 错误提示文字
	 * @param {Object} element 错误所在之处
	 */
	inputErrorHendler = {
		errorContent : function(msg,element) {
			element.siblings("label").text(msg).addClass("whether").parent("div").addClass("itemClickError");
		}
	};
	/**
	 * 注册错误提示框函数
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
	// 入口方法调用
	loginWrap.init();
})();