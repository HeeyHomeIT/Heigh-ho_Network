var heeyhomeMyorder = {
	/*
	 * 初始化
	 */
	init : function() {
		heeyhomeMyorder.arrowChange();
	},
	/*
	 * 箭头切换效果
	 */
	arrowChange : function(){
		var _arrow = $(".order_title div").eq(6);//全部后面的小三角形
		var _area = $(".order_content .order_box");//哪一份订单
		var _arrowcnt = $(".order_title div").eq(6).find("ul");//全部后面的小三角形里的内容
		$(_arrow).click(function(){
			$(_arrowcnt).slideDown(500);
		},function(){
			if($(_arrow).hasClass("item_hover_180")){
				$(_arrow).removeClass("item_hover_180");
			}
			else{
				$(_arrow).addClass("item_hover_180");
			}	
			$(_arrowcnt).slideToggle(500);
		});
		$(_area).each(function(){
			var _arrowsize = $(this).find(".size").children("p");//建筑面积里的小三角形
			var _sizecnt = $(this).find(".ordercnt_content").children(".hide");//建筑面积里的小三角形里的内容
			$(_arrowsize).click(function(){
				$(_sizecnt).slideDown(500);
			},function(){
				if($(this).hasClass("item_hover_180")){
					$(this).removeClass("item_hover_180");
					$(this).css({"border":"0"});
				}
				else{
					$(this).addClass("item_hover_180");
					$(this).css({"border":"1px solid #EFEFEF","border-bottom":"1px solid #ffffff"});
				}				
				$(_sizecnt).slideToggle(500);
			});
		});	
	}
}
//$(function(){
//	heeyhomeMyorder.init();
//});
define(['angular'],function(angular){
	return function my_order(){
		heeyhomeMyorder.init();
	};
});
