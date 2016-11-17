$(function(){
	//瀑布流
	function waterfall(){
		var boxs = $(".vr_picture .box_picture");
		var w = boxs.eq(0).outerWidth();
		var cols = Math.floor($(".vr_picture").width()/w);
		$(".vr_picture").width(w * cols).css({"margin":"0 auto"});
		var hArr = [];
		boxs.each(function(index,value){
			var h = boxs.eq(index).outerHeight();
			if(index < cols){
				hArr[index] = h;
			}else{
					var minH = Math.min.apply(null,hArr);
					var minHIndex = $.inArray(minH,hArr);
					$(value).css({
						"position":"absolute",
						"top":minH+"px",
						"left":minHIndex*w+"px"
					})
					hArr[minHIndex] += h;
				}
		})
	}
	waterfall();
	
	//img的hover效果1
	var heeyhomeReality = {
		/**
		 * 初始化
		 */
		init: function(){
			heeyhomeReality.hoverPicture();
		},
		/**
		 * hover效果
		 */
		hoverPicture: function(){
			var _pic_1 = $(".vr_picture .box_picture");
			$(_pic_1).on({
				mouseover: function(){
					$(this).find(".pic_content").removeClass("hide");
				},
				mouseout: function(){
					$(this).find(".pic_content").addClass("hide");
				}
			});
		}
	};
	heeyhomeReality.init();
});
