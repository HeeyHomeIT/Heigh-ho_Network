(function(){
	var heeyhomeHeader = {
		/*
		 * 初始化
		 */
		init : function() {
			heeyhomeHeader.getUserData();
		},
		getUserData : function(){
			var self = this;
			self.getUserDataEvent();
		},
		getUserDataEvent : function(){
			var userInfo = $.base64.decode($.cookie('userName'));
			var user = $.base64.decode($.cookie("user"));//解密后的user值
			var _temp_1 = $(".please_login").html();//未登录前显示
			var _temp_2 = $("#topLogin").children("span:first-of-type").nextAll();//初始欢迎标题后面的内容
			var _temp_3 = "<a href='#nogo' class='user_information'>" + userInfo + "</a>" + "<span class='exit'>退出</span>";//登录后欢迎标题的内容
	        var iphoneReg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;//手机号正则表达式
	        if (user != null && user != "" && iphoneReg.test(user)) {	            
	            $("#topLogin").children("span:first-of-type").nextAll().remove();
	            $("#topLogin").append(_temp_3);
	            $(".please_login").html(userInfo);
	            $(".exit").on("click",function(){ //点击退出的事件
					$("#topLogin").children("span:first-of-type").nextAll().remove();
					$("#topLogin").append(_temp_2);
					$(".please_login").html(_temp_1);
				});
	            
	        }
			
		}
	}
	heeyhomeHeader.init();
})();
