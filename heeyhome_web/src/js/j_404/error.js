/**
 * 404错误
 * ckk
 */
(function() {
	
	/**
	 * 需要require的公共方法或组件
	 */
	var HHIT_SUCCESSAPP = angular.module('heeyhomeApp');
	
	/* 定义一个类 */
	var errorContent = {
		/**
		 * 入口方法
		 */
		init : function() {
			errorContent.initEvent();
		},
		initEvent : function() {
			var self = this;
			/* 初始化404错误 */
			self.initerrorDetail();
		},
		/**
		 * 404页面初始化
		 */
		initerrorDetail : function() {
			/* 去掉头部多余的部分 */
			$("#menuNavOuter").remove();
			/* 返回上一页 */
			$(".error_detail .error_button .back").on("click",function() {
				history.back();
			});
		}
	};
	//入口方法调用 代码只能从这里执行
	HHIT_SUCCESSAPP.controller('error_detailCtrl', ['$scope', '$http', function($scope, $http) {
		errorContent.init();
	}]);
})();