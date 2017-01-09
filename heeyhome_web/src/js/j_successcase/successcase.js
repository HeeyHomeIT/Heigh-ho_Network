/**
 * 闭包
 * 店铺详情
 * tangj
 */
(function() {

	/**
	 * 需要require的公共方法或组件
	 */
	var HHIT_SUCCESSCASEAPP = angular.module('heeyhomeApp');

	var SUCCESSURL = "http://hyu2387760001.my3w.com/myworkcase"; // 显示工长添加的案例列表信息接口
	
	
	var worksObj = {};

	/*定义一个类*/
	var successCaseWrap = {
		/**
		 * 入口方法
		 */
		init: function() {
			successCaseWrap.initEvent();
		},
		initEvent: function() {
			var self = this;
			var gzId = getUrlParamHandler.getUrlParam('pos');
			$("#Jgz").val(gzId);
			/* 页面工人初始化数据*/
			self.initSuccessCaseDataEvent();

		},
		/**
		 * 页面成功案例初始化数据
		 */
		initSuccessCaseDataEvent: function() {
			var sc = spliceSuccessContHandler;
			var shopperId = $("#Jgz").val();
			$.ajax({
				url: SUCCESSURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				data: {
					foreman_id: shopperId
				}
			}).done(function(data){
				console.log(data)
				$(".sc_contents ul").html(sc.spliceCgInfoEvent(data.data))
			});
		},
	};

	getUrlParamHandler = {
		/**
		 * 获取url中的参数
		 * @param {Object} name
		 */
		getUrlParam: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.hash.split("?")[1].match(reg); //匹配目标参数
			if(r != null) return unescape(r[2]);
			return null; //返回参数值
		}
	};
	/**
	 * 拼接内容
	 */
	spliceSuccessContHandler = {
		/**
		 * 成功案例
		 * @param {Object} value 对象
		 */
		spliceCgInfoEvent: function(value) {
			var vrStr = '';
			$.each(value, function(i, v) {
				if(v.img.length != 0) {
					vrStr += '<li><div class="image"><a href="javascript:void(0)"><img src="http://hyu2387760001.my3w.com/' + v.img[0].case_img + '"></a>';
					vrStr += '<div class="image_title"><div class="roomtype">'+v.housetype+'</div><div class="roomicon"><em class="sc_icon_love"></em><span>'+v.like_num+'</span></div>';
					vrStr += '<div class="roomicon"><em class="sc_icon_look"></em><span>'+v.scan_num+'</span></div></div></div>';
					vrStr += '<div class="introduce"><strong>'+v.style +'&nbsp;'+v.area +'m<sup>2</sup></strong>';
					vrStr += '<div class="introduce-icon"><em class="sc_icon_love"></em><span>'+v.address+'</span></div>';
					vrStr += '<div class="introduce-icon"><em class="sc_icon_love"></em><span>'+v.timelong+'</span></div></div></li>';
				}
			});
			return vrStr;
		},
	}

	//入口方法调用 代码只能从这里执行
	HHIT_SUCCESSCASEAPP.controller('successcaseCtrl', ['$scope', '$http', function($scope, $http) {
		successCaseWrap.init();
	}]);
})();