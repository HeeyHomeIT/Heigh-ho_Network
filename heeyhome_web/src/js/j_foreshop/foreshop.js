var heeyhomeForeshop = {
	/**
	 * 初始化
	 */
	init:function(){
		heeyhomeForeshop.tabSelect();
	},
	/**
	 * 标签切换效果
	 */
	tabSelect: function(){
		var _fliter = $(".shop_fliter div li");
		var _sort = $(".shop_content .content_title .sort");
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
				$(this).css({"color":"#E88226"});
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
	heeyhomeForeshop.init();
});