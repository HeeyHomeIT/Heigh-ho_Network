/**
 * 闭包
 * 店铺详情
 * tangj
 */
(function() {

	/**
	 * 需要require的公共方法或组件
	 */
	var HHIT_CALRESULTAPP = angular.module('heeyhomeApp');

	var COLLECTIONURL = "http://hyu2387760001.my3w.com/costcalculator/result/collect"; // 收藏成本计算器结果接口
	
	var UID = $.cookie("userId"); // 得到userid
    if(UID!=null && UID !="" && UID !=undefined){
    	UID = $.base64.decode(UID);
    }else {
    	UID = "";
    }
    
	var payObj = {};
	if (sessionStorage.payJson != undefined || sessionStorage.payJson != null) {
		payObj = JSON.parse(sessionStorage.payJson);
	}
	var cs = decodeURI(escape(getUrlParam('cs')));
	var mj = getUrlParam('mj');
	var fj = getUrlParam('fj');
	var kt = getUrlParam('kt');
	var wsj = getUrlParam('wsj');
	var yt = getUrlParam('yt');
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.hash.split("?")[1].match(reg); //匹配目标参数
		if(r != null) return unescape(r[2]);
		return null; //返回参数值
	}
	/*定义一个类*/
	var calResultWrap = {
		/**
		 * 入口方法
		 */
		init: function() {
			calResultWrap.initEvent();
		},
		initEvent: function() {
			var self = this;
			self.initDataEvent(); // 页面初始化
			self.initClickCollectionEvent(); // 进行收藏
		},
		initDataEvent:function() {
			// 判断payObj是否为空
			if(JSON.stringify(payObj) != "{}") { 
				$.each(payObj,function(i,v){
					$("."+i).prepend(parseFloat(v).toFixed(2))
				});
			}
		},
		/**
		 * 进行收藏
		 */
		initClickCollectionEvent:function(){
			$(document).on("click",".cr_collection",function(){
				var collectionObj = {};
				collectionObj = payObj;
				collectionObj.city = cs; // 城市
				collectionObj.area = mj;
	            collectionObj.room_num = fj;
	            collectionObj.parlor_num = kt;
	            collectionObj.bathroom_num = wsj;
	            collectionObj.balcony_num = yt;
				console.log(collectionObj);
				$.ajax({
					url: COLLECTIONURL,
					type: "GET",
					async: true,
					dataType: 'jsonp',
					data: {
						user_id:UID,
						calculator_result_json: JSON.stringify(collectionObj)
					},
					success: function(data) {
						alert(data.msg);
					},
					error: function(data) {}
				});
			});
		}
	};

	//入口方法调用 代码只能从这里执行
	HHIT_CALRESULTAPP.controller('calresultCtrl', ['$scope', '$http', function($scope, $http) {
		calResultWrap.init();
	}]);
})();