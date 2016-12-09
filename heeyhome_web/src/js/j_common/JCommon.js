$(function() {
	
	/* 定义一个类 */
	var headWrap = {
		/* 入口方法 */
		init : function() {
			/**
             * 业务代码
             */
			headWrap.initEvent();
		},
		initEvent: function() {
        	var self = this;
        	self.searchBoxClickEvent(); // 搜索框点击事件
        	self.myHeeyHomeEvent(); // 我的嘿吼
        	self.getUserDataEvent(); // 得到登录信息
        },
        /**
	     * 搜索框点击事件
	     */
        searchBoxClickEvent: function(){
	    	$("#c_search_text").on({
	    		"focus":function() {
	    			var $this = $(this);
	    			var placeholder = $this.attr("attr-placeholder");
	    			if($this.val() == placeholder) {
	        			$this.val("");
	        		}
	    			$(".c_searchpop").show();
	    		},
	    		"blur":function() {
	    			var $this = $(this);
	    			var placeholder = $this.attr("attr-placeholder");
	    			if($this.val() == '') {
	        			$this.val(placeholder);
	        		}
	    			$(".c_searchpop").hide();
	    		}
	    	});
	    },
	    /**
	     * 我的嘿吼
	     */
	    myHeeyHomeEvent: function(){
	    	$("#c_myhh").hover(function(){
				$(this).children("a").addClass("item_hover_180");
				$(this).children("div").css("height","112px");
				$(this).addClass("open");
	    	},function(){
	    		$(this).children("a").removeClass("item_hover_180");
	    		$(this).children("div").css("height","0px");
	    		$(this).removeClass("open");
	    	});
	    },
	    /**
	     * 登录信息
	     */
	    getUserDataEvent : function(){
			var userName = $.cookie('userName');
			var cloneLoginStr = $("#topLogin").html(); // 克隆未登录前页面模块
			var cloneLgStr = $(".userinfo p").html()
	        if(userName != null && userName != "") {
	        	var loginStr = '<a class="user_information" rel="nofollow" href="#nogo">' + $.base64.decode(userName) + '</a><span>，您好 </span><span class="exit">退出</span>';
	        	var lgStr = '<a class="uinfo" href="#nogo"><span>' + $.base64.decode(userName) + '</span></a>'
	        	cloneHtmlHendler.loginClone(loginStr,lgStr);
	        	$(".exit").on("click",function(){ // 点击退出的事件
	        		cloneHtmlHendler.loginClone(cloneLoginStr,cloneLgStr);
	        		$.cookie("userId", null,{expires: -1,path: '/'});
                    $.cookie("userName", null,{expires: -1,path: '/'});
                    $.cookie("userType", null,{expires: -1,path: '/'});
				});
	        }
			
		}
	};
	/**
	 * 删除追加代码
	 */
	cloneHtmlHendler = {
		loginClone : function(str1,str2) {
			$("#topLogin").empty().append(str1);
    		$(".userinfo p").empty().append(str2);
		}
	};
	
	// 入口方法调用
	headWrap.init();	
})