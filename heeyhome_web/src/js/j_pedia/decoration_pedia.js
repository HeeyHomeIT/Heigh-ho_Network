var heeyhomePedia = {
	/*
	 * 初始化
	 */
	init : function(){
		heeyhomePedia.picBar();
	},
	/*
	 * 选取左侧导航
	 */
	picBar : function(){
		var _stage = $("#decoration_pedia .pedia_content .bar_content a");
		$(_stage).on({
			click : function(){
				$(this).addClass("active");
				$(this).siblings().removeClass("active");
			}
		});
	}
}
$(function(){
	heeyhomePedia.picBar();
});