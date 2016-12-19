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
	
	var TOTAL; // 后台数据总数
	var MAXROWS; //总页数
	/**
	 * 筛选条件初始化
	 * area 建筑面积筛选条件数组的key 
	 * housetype 户型筛选条件数组的key
	 * servicetag 装修风格筛选条件数组的key
	 * orderKey 排序 0默认 1浏览量 2点赞量 3收藏量
	 * pageVal 第几页
	 * limitVal 每页显示几条数据
	 */
	var filterObj = {
		area:1,
		housetype:1,
		servicetag:1,
		orderKey:0,
		pageVal:1,
		limitVal:4
	};

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
			/* 获取虚拟现实内容 默认1，1，1，0，1，4*/
			vrContentHandler.vrContentEvent(filterObj);
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
							var fliterStr = '<div class="fliter_' + i + '"  data-name='+i+'  >';
							$.each(v, function(item, val) {
								switch(item) {
									case 0:
										fliterStr += '<span class="fliter_name">' + val + '</span><ul class="fliter_tab" >';
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
				var $fliterdiv = $(this).closest("div");
				var $siblingdiv = $fliterdiv.siblings()
				// 插入当前点击的筛选内容块名字 对应相应的当前点击的筛选内容id
				filterObj[$fliterdiv.data("name")]=$(this).data("label");
				$.each($siblingdiv, function(i,v) {
					// 插入当前点击的筛选内容块名字 对应相应的当前点击的筛选内容id
					filterObj[$siblingdiv.eq(i).data("name")]=$siblingdiv.eq(i).find("li.active").data("label");
				});
				vrContentHandler.vrContentEvent(filterObj);
				$(".content_pic div").remove();
				$(".page_div3 div").remove();
				
			});
		}
	};
	vrContentHandler = {
		/**
		 * 获取虚拟现实内容
		 * @param {Object} filterObj 筛选条件对象
		 */
		vrContentEvent: function(filterObj) {
			console.log(filterObj)
			$.ajax({
				url: VRCONTENTURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				data:{
					area:filterObj.area,
					housetype:filterObj.housetype,
					servicetag:filterObj.servicetag,
					order:filterObj.orderKey,
					page:filterObj.pageVal,
					limit:filterObj.limitVal
				},
				success: function(data) {
					TOTAL = data.data[0].total; // 总数
					$(".content_pic div").remove();
					$.each(data.data, function(i, v) {
						var vrStr = spliceVrContentHandler.spliceStrEvent(v);
						$(".content_pic").append(vrStr)
					});
					pageHandler.pageContentEvent();
					orderModuleHandler.orderClickEvent();
				},
				error: function(data) {}
			});
		}
	};
	/**
	 * 排序模块
	 */
	orderModuleHandler = {
		orderClickEvent:function() {
			var $sort = $(".content_title .sort");
			var sortname = $sort.parent().data("name");
			$sort.off("click").on("click",function(){
				$(this).addClass("active").siblings().removeClass("active");
				filterObj[sortname] = $(this).data("label");
				vrContentHandler.vrContentEvent(filterObj);
				$(".content_pic div").remove();
				$(".page_div3 div").remove();
			});
		}
	};
	/**
	 * 拼接内容
	 */
	spliceVrContentHandler = {
		spliceStrEvent:function(value) {
			var vrStr = '<div class="pic_box" data-id="' + value.panorama_id + '"><div class="vr_pic">';
				vrStr += '<a href="' + value.panorama_url + '"><img src="http://hyu2387760001.my3w.com/' + value.panorama_img + '" class="now">';
				vrStr += '<div class="bg_mongolia">';
				vrStr += '<div class="pic_hover"><img src="css/img/icon-tovr.png"></div></div></a></div>';
				vrStr += '<div class="pic_introduce">';
				vrStr += '<div class="pic_style clearfix"><h2>' + value.panorama_style + '</h2></div>';
				vrStr += '<div class="pic_badge"><img src="css/img/icon-badge.png" title="点击收藏"></div>';
				vrStr += '<div class="pic_detail"><p>建筑面积：<em>' + value.panorama_area + '</em>㎡</p><p>' + value.panorama_housetype + '</p></div>';
				vrStr += '<div class="pic_icon"><div class="pic_view">';
				vrStr += '<img src="css/img/icon-view.png" title="浏览数"><span>' + value.scan_num + '</span></div>';
				vrStr += '<div class="pic_praise"><img src="css/img/icon-praise.png" title="点赞数"><span>' + value.like_num + '</span></div></div></div></div>';
			return vrStr;
		}
	};
	/**
	 * 分页
	 */
	pageHandler = {
		pageContentEvent:function() {
			MAXROWS =  Math.ceil(TOTAL/4); // 页数
			$(".page_div3").paging({
				total: MAXROWS, //全部页数
				animation: false, //是否是滚动动画方式呈现  false为精简方式呈现   页数大于limit时无论怎么设置自动默认为false
				centerBgColor: "#fff",
				centerFontColor: "#000",
				centerBorder: "1px solid #ddd",
				transition: "all .2s",
				centerHoverBgColor: "#25dd3d",
				centerHoverBorder: "1px solid #25dd3d",
				centerFontHoverColor: "#fff",
				otherFontHoverColor: "#fff",
				otherBorder: "1px solid #ddd",
				otherHoverBorder: "1px solid #25dd3d",
				otherBgColor: "#fff",
				otherHoverBgColor: "#25dd3d",
				currentFontColor: "#fff",
				currentBgColor: "#f79898",
				currentBorder: "1px solid #f79898",
				fontSize: 13,
				currentFontSize: 13,
				cormer: 2, //按钮的边角曲度
				gapWidth: 3, //间隙宽度
				showJump: true, //是否显示跳转功能
				jumpBgColor: "#fff",
				jumpFontHoverColor: "#fff",
				jumpHoverBgColor: "#25dd3d",
				jumpBorder: "1px solid #ddd",
				jumpHoverBorder: "1px solid #25dd3d",
				submitType: "get", //注明是通过get方式访问还是post方式访问
				idParameter: "page",               //传到后台的当前页的id的参数名，这个传值会自动添加在href或ajax的url末尾
				url: "http://hyu2387760001.my3w.com/panorama", //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
				ajaxData: {
					area:filterObj.area,
					housetype:filterObj.housetype,
					servicetag:filterObj.servicetag,
					order:filterObj.orderKey,
					limit:filterObj.limitVal
				},   //ajax方式传值时的附加传值,要传的参数放在这里面,页面参数只要指定idParamemeter就好，会自动添加
				dataOperate: function oprate(data) {
					$(".content_pic div").remove();
					$.each(data.data, function(i, v) {
						var vrStr = spliceVrContentHandler.spliceStrEvent(v);
						$(".content_pic").append(vrStr)
					});
				} //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
			});
		}
	}
	//入口方法调用 代码只能从这里执行
	HHIT_CENTERAPP.controller('panoramaCtrl', ['$scope', '$http', function($scope, $http) {
		panoramaWrap.init();
	}]);
})();