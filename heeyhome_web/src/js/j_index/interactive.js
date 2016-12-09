define(['app'], function(app) {
	(function() {
		/*定义一个类*/
		var indexWrap = {
			/**
			 * 入口方法
			 */
			init: function() {
				indexWrap.initEvent();
			},
			initEvent: function() {
				var self = this;
				/* 轮播图*/
				self.initCarouselEvent();
			},
			/**
			 * 轮播图
			 */
			initCarouselEvent: function() {
				$("#myCarousel").carousel();
				var _focus = $(".carousel-indicators li");
				var _number = $(".number_control li");
				var i = 0;
				setInterval(function() {
					for(i = 0; i < 5; i++) {
						if($(_focus).eq(i).attr("class") == "active") {
							$(_number).eq(i).addClass("active");
							$(_number).eq(i).siblings().removeClass("active");
						}
					}
				}, 1);
			}
		};
		//入口方法调用 代码只能从这里执行
		app.indexWrapHandler = function() {
			indexWrap.init();
		}
	})();
});