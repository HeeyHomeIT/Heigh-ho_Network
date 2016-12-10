/**
 * 虚拟现实
 */
/**
 * 闭包
 * tangj
 */
(function() {

	/**
	 * 需要require的公共方法或组件
	 */
	var HHIT_CENTERAPP = angular.module('heeyhomeApp');

	var TAGSURL = 'http://hyu2387760001.my3w.com/panorama/gettags'; // 筛选条件标签显示
	var VRCONTENTURL = 'http://hyu2387760001.my3w.com/panorama'; // 虚拟现实

	/*定义一个类*/
	var panoramaWrap = {
		/**
		 * 入口方法
		 */
		init: function() {
			panoramaWrap.initEvent();
		},
		initEvent: function() {
			var self = this;
			/* 获取筛选标签内容*/
			self.initGetTagsEvent();
			/* 获取虚拟现实内容*/
			vrContentHandler.vrContentEvent();
		},
		/**
		 * 获取筛选标签内容
		 */
		initGetTagsEvent: function() {
			$.ajax({
				url: TAGSURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				success: function(data) {
					if(data != null && data.code == '000') {
						$.each(data.data, function(i, v) {
							var fliterStr = '<div class="fliter_' + i + '" >';
							$.each(v, function(item, val) {
								switch(item) {
									case 0:
										fliterStr += '<span class="fliter_name">' + val + '</span><ul class="fliter_tab">';
										break;
									case 1:
										fliterStr += '<li class="active" data-label="' + item + '" >';
										fliterStr += '<a>' + val + '</a></li>';
										break;
									default:
										fliterStr += '<li class="" data-label="' + item + '" >';
										fliterStr += '<a>' + val + '</a></li>';
								}
							});
							fliterStr += '</ul></div>';
							$(".fliter").append(fliterStr);
						});
						tabSelectHandler.tabSelectEvent()
					}
				},
				error: function(data) {}
			});
		},

	};
	/**
	 * 标签切换效果
	 */
	tabSelectHandler = {
		tabSelectEvent: function() {
			var $fliter = $(".fliter div li");
			$fliter.on("click", function() {
				$(this).addClass("active").siblings().removeClass("active");
			});
		}
	};
	vrContentHandler = {
		/**
		 * 获取虚拟现实内容
		 * @param {Object} areaKey 建筑面积筛选条件数组的key 
		 * @param {Object} housetypeKey 户型筛选条件数组的key
		 * @param {Object} servicetagKey 装修风格筛选条件数组的key
		 * @param {Object} orderKey 排序 0默认 1浏览量 2点赞量 3收藏量
		 * @param {Object} pageVal 第几页
		 * @param {Object} limitVal 每页显示几条数据
		 */
		vrContentEvent: function(areaKey,housetypeKey,servicetagKey,orderKey,pageVal,limitVal) {
			$.ajax({
				url: VRCONTENTURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				data:{
					area:areaKey,
					housetype:housetypeKey,
					servicetag:servicetagKey,
					order:orderKey,
					page:pageVal,
					limit:limitVal
				},
				success: function(data) {
					console.log(data.data);
					
					$.each(data.data, function(i,v) {
						console.log(v)
						
					});
				},
				error: function(data) {}
			});
		}
	};
	//入口方法调用 代码只能从这里执行
	HHIT_CENTERAPP.controller('panoramaCtrl', ['$scope', '$http', function($scope, $http) {
		panoramaWrap.init();
	}]);
})();