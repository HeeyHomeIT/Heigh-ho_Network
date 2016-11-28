var heeyhomeReality = {
	/**
	 * 初始化
	 */
	init:function(){
		heeyhomeReality.tabSelect();
	},
	/**
	 * 标签切换效果
	 */
	tabSelect: function(){
		var _fliter = $(".fliter div li");
		var _sort = $(".virtual_content .content_title .sort");
		$(_fliter).on({
			mouseover: function(){
				$(this).children("a").css({"color":"#E88226"});
			},
			mouseout: function(){
				$(this).children("a").css({"color":"#4B4948"});				
			},
			click: function(){
				$(this).addClass("active");
				$(this).siblings().removeClass("active");
			}
		});
		$(_sort).on({
			mouseover: function(){
				$(this).css({"color":"#EEC988"});
			},
			mouseout: function(){
				$(this).css({"color":"#656565"});				
			},
			click: function(){
				$(this).addClass("active");
				$(this).siblings().removeClass("active");
			}
		});
	}
}
$(function(){
	heeyhomeReality.init();
});