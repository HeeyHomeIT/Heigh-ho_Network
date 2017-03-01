define(['app'], function(app) {
	
	(function() {
		/*定义一个类*/
		var errorWrap = {
			/**
			 * 入口方法
			 */
			init: function() {
				errorWrap.initEvent();
			},
			initEvent: function() {
				var self = this;
				/* 初始化404页面 */
				self.initErrorEvent();
			},
			/**
			 * 初始化404页面
			 */
			initErrorEvent:function(){
				/* 返回上一页 */
				$(".error_detail .error_button .back").on("click",function() {
					history.back();
				});
			}					
		};
		//入口方法调用 代码只能从这里执行
		app.errorWrapHandler = function() {
			errorWrap.init();
		}
	})();
});