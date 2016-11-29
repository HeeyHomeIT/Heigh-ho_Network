var heeyhomeCommon = {
	/**
	 * 初始化
	 */
	init:function(){
		heeyhomeCommon.tabSelect();
	},
	/**
	 * 标签切换效果
	 */
	tabSelect: function(){
		var _fliter = $(".fliter div li");
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
	}
}
$(function(){
	heeyhomeCommon.init();
});