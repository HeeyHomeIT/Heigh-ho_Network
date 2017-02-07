define(['app'], function(app) {
	
	var USERINFOURL = "http://www.heeyhome.com/api/public/personal/userinfo"; // 读取用户信息接口
	var UID = $.cookie("userId"); // 得到userid
    if(UID!=null && UID !="" && UID !=undefined){
    	UID = $.base64.decode(UID);
    }else {
    	UID = "";
    }
	
	(function() {
		/*定义一个类*/
		var navWrap = {
			/**
			 * 入口方法
			 */
			init: function() {
				navWrap.initEvent();
			},
			initEvent: function() {
				var self = this;
				/* 当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失*/
				self.navigationScorllEvent();
				/* 回到顶部*/
				self.initGotoTopEvent();
				/* 显示客服聊天 */
				self.initCustomerServiceEvent();
			},
			/**
			 * 回到顶部
			 */
			initGotoTopEvent:function(){
				$(document).on("click",".top",function(){
					$('body,html').stop().animate({
						scrollTop: 0
					}, 1000);
					return false;
				});
			},
			/**
			 * 当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
			 */
			navigationScorllEvent: function() {
				$(window).scroll(function() {
					if($(window).scrollTop() > 100) {
						$(".top").show();
					} else {
						$(".top").hide();
					}
				});
			},
			/* 
			 * 显示客服聊天 
			 */
			initCustomerServiceEvent:function(){
				$(document).on("click",".onlineQA",function(){
//					var name = '';
//					var userinfo_email = '';
//					var phone = ''; 
					$.ajax({
						url: USERINFOURL,
						type: "GET",
						async: true,
						dataType: 'jsonp',
						data: {
							user_id: UID
						}
					}).done(function(data){
						var name='',phone='',userinfo_email='';
						if(data.code == 000){
							name = data.data.user_name;
							phone = data.data.userinfo_phone;
							userinfo_email = data.data.userinfo_email;
						}
						window.easemobim = window.easemobim || {};
						easemobim.bind({
							 //租户id 
						    tenantId: '22227',   
						    //是否隐藏小的悬浮按钮
						    hide: true,
						    visitor: {         
						        trueName: name,
						        phone: phone,
						        description: '描述信息',
						        email: userinfo_email
						    },
						    satisfaction: true,
						    //启用收消息同步
	    					resources: true	
						})
					});
					
				});
			}
		};
		//入口方法调用 代码只能从这里执行
		app.indexNavWrapHandler = function() {
			navWrap.init();
		}
	})();
});