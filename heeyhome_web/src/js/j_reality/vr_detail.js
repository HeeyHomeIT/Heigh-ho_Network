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
		var _sort = $(".virtual_content .content_title .sort");
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