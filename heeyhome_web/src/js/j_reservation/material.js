/**
 * 闭包
 * 开始预订
 * tangj
 */
(function() {

	/**
	 * 需要require的公共方法或组件
	 */
//	var HHIT_MATERIALAPP = angular.module('heeyhomeApp');

	var SELDATAURL = "http://hyu2387760001.my3w.com/order/aeckonandactual/seldata"; // 预约订单接口
	var PAYURL = "http://hyu2387760001.my3w.com/alipay/pay"; // 支付宝支付
	
	/*定义一个类*/
	var materialListWrap = {
		/**
		 * 入口方法
		 */
		init: function() {
			materialListWrap.initEvent();
		},
		initEvent: function() {
			var self = this;
			self.initWebDataEvent(); // 页面数据初始化
			self.initSelectAllEvent(); // 材料选择
			
		},
		/**
		 * 页面数据初始化
		 */
		initWebDataEvent:function(){
			var self = this;
//			self.initPaymentListDetailsEvent(); // 预支付清单详情
		},
		/**
		 * 材料选择
		 */
		initSelectAllEvent:function(){
			//全选和全不选
			$(document).on("click",".JcheckGcd",function(){
				if($(this).is(':checked')) { //是否默认地址 1:默认地址 2:非默认地址
					$(this).siblings("em").removeClass("defalut_ico");
					$(this).closest("table").find('input[name="subBox"]').prop("checked",this.checked).siblings("em").removeClass("defalut_ico"); 
					
				}else{
					$(this).siblings("em").addClass("defalut_ico");
					$(this).closest("table").find('input[name="subBox"]').prop("checked",this.checked).siblings("em").addClass("defalut_ico"); 
					
				}
			});
			// 单个选择
			$(document).on("click",".material_cardtable tbody tr input",function(){
				if($(this).is(':checked')) { //是否默认地址 1:默认地址 2:非默认地址
					$(this).siblings("em").removeClass("defalut_ico");
					
				}else{
					$(this).siblings("em").addClass("defalut_ico");
				}
			});
		}
	};
	
	//入口方法调用 代码只能从这里执行
//	HHIT_MATERIALAPP.controller('materialCtrl', ['$scope', '$http', function($scope, $http) {
		materialListWrap.init();
//	}]);
})();