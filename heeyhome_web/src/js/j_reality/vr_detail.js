/*
 * 虚拟现实js
 */
(function(){
	
	/**
    * 需要require的公共方法或组件
    */
	var HHIT_NEWAPP = angular.module('newApp');
	
	var FLITER = "http://hyu2387760001.my3w.com/panorama/gettags?callback=JSON_CALLBACK"; // 获取筛选标签接口
	var CARD = "http://hyu2387760001.my3w.com/panorama?callback=JSON_CALLBACK"; // 获取虚拟现实卡片接口
	
	/* 定义一个类 */
	var virtualReality = {
		
		/* 入口方法 */
		init : function() {
			/**
			 * 业务代码
			 */
			virtualReality.initEvent();
		},
		initEvent : function() {
			var self = this;
			self.getInformation(); //获取虚拟现实卡片信息
			//self.fliterContent(); //根据筛选标签筛选
			//self.sortContent(); //根据排序方式排序
		},
		getInformation : function() {
			HHIT_NEWAPP.controller('vrCtrl',['$scope', '$http', function ($scope, $http) {
                /* 虚拟现实卡片默认全部出现 */
                var index_1=0,index_2=0,index_3=0; //筛选条件默认全部
                //var order=0; //排序默认为默认排序
                var page=1; //默认显示第一页
                var total;
                var limit=16; //默认一页最多显示16条数据
                cardContent.myVrCard(index_1,index_2,index_3,page,limit, $scope, $http);
                /* 获取筛选标签接口 */
                $http({
                    method: "JSONP",
                    url: FLITER
                }).success(function (data, status) {
                    /* 如果成功执行 */
                    if (data.code === '000') {
                        $scope.areas = data.data.area;
                        $scope.housetypes = data.data.housetype;
                        $scope.servicetags = data.data.servicetag;
                    }else {  /* 如果失败执行 */
                        alert(data.msg);
                    }
                }).error(function (data, status) {
                });
                /* 建筑面积的点击事件 */
               $scope.fliterArea = function(area) {
               		/* 判断所在数组下标 */
               		for(var i in $scope.areas) {
               			if($scope.areas[i] == area) {
               				index_1 = i;
               			}
               		};
               		/* 建筑面积的筛选 */
               		cardContent.myVrCard(index_1,index_2,index_3,page,limit, $scope, $http);
               		/* 建筑面积的点击效果 */
               		$(".fliter_area li").eq(index_1).addClass("active").siblings().removeClass("active");
               };
                /* 户型的点击事件 */
               $scope.fliterType = function(type) {
               		/* 判断所在数组下标 */
               		
               		for(var i in $scope.housetypes) {
               			if($scope.housetypes[i] == type) {
               				index_2 = i;
               			}
               		};
               		/* 户型的筛选 */
               		cardContent.myVrCard(index_1,index_2,index_3,page,limit, $scope, $http);
               		/* 户型的点击效果 */
               		$(".fliter_type li").eq(index_2).addClass("active").siblings().removeClass("active");
               };
               /* 装修风格的点击事件 */
               $scope.fliterStyle = function(style) {
               		/* 判断所在数组下标 */
               		
               		for(var i in $scope.servicetags) {
               			if($scope.servicetags[i] == style) {
               				index_3 = i;
               			}
               		};
               		/* 装修风格的筛选 */
               		cardContent.myVrCard(index_1,index_2,index_3,page,limit, $scope, $http);
               		/* 装修风格的点击效果 */
               		$(".fliter_style li").eq(index_3).addClass("active").siblings().removeClass("active");
               };
              
                $scope.paginationConf = {
                	
		            currentPage: 1,		            
		            itemsPerPage: 15,
		            pagesLength: 15,
		            perPageOptions: [10, 20, 30, 40, 50],
		            onChange: function(){
						$http({
							method: 'jsonp',
							url: CARD,
							params: {
								area: index_1,
								housetype: index_2,
								servicetag: index_3,
								page: $scope.paginationConf.currentPage,
								limit: limit
							}
						}).success(function (data,status) {
							if(data.code == '000') {
								$scope.cards = data.data;
							}else {  /* 如果失败执行 */
								$(".pic_box").addClass("display");
								alert(data.msg);
							}
						}).error(function (data,status) {				
						});
						
		            }
		        };
			}]);
		}
	};
	/*
	 * 根据筛选标签筛选
	 */
	cardContent = {
		myVrCard : function(area,type,style,page,limit,$scope, $http) {
			/* 获取虚拟现实卡片接口 */
			$http({
				method: "jsonp",
				url: CARD,
				/* 传参数 */
				params: {
					area: area,
					housetype: type,
					servicetag: style,
					page: page,
					limit: limit
				}
			}).success(function (data,status) {
				/* 如果成功执行 */
				if (data.code == '000') {
					
					$scope.cards = data.data;
					$scope.paginationConf.totalItems = data.data[0].total;
					/* 开始排序 */
					var i;
					var Area;
					var Type;
					var Style;
					
					$(".content_title .page_view").on("click",function() {
						for(i = 0;i < $(".fliter_area li").length;i++) {
	               			if($(".fliter_area li").eq(i).hasClass("active")) {
	               				Area = i;
	               			}
	               		};
	               		for(i = 0;i < $(".fliter_type li").length;i++) {
	               			if($(".fliter_type li").eq(i).hasClass("active")) {
	               				Type = i;
	               			}
	               		};
	               		for(i = 0;i < $(".fliter_style li").length;i++) {
	               			if($(".fliter_style li").eq(i).hasClass("active")) {
	               				Style = i;
	               			}
	               		};
						cardSort.descSort(Area,Type,Style,1,limit, $scope, $http);
						
						/* 浏览量的点击效果 */
		               	$(this).addClass("active").siblings().removeClass("active");		               	
					});
					$(".content_title .praise_number").on("click",function() {
						for(i = 0;i < $(".fliter_area li").length;i++) {
	               			if($(".fliter_area li").eq(i).hasClass("active")) {
	               				Area = i;
	               			}
	               		};
	               		for(i = 0;i < $(".fliter_type li").length;i++) {
	               			if($(".fliter_type li").eq(i).hasClass("active")) {
	               				Type = i;
	               			}
	               		};
	               		for(i = 0;i < $(".fliter_style li").length;i++) {
	               			if($(".fliter_style li").eq(i).hasClass("active")) {
	               				Style = i;
	               			}
	               		};
						cardSort.descSort(Area,Type,Style,2,limit, $scope, $http);
						/* 点赞量的点击效果 */
		               	$(this).addClass("active").siblings().removeClass("active");		               	
					});
					$(".content_title .collect").on("click",function() {
						for(i = 0;i < $(".fliter_area li").length;i++) {
	               			if($(".fliter_area li").eq(i).hasClass("active")) {
	               				Area = i;
	               			}
	               		};
	               		for(i = 0;i < $(".fliter_type li").length;i++) {
	               			if($(".fliter_type li").eq(i).hasClass("active")) {
	               				Type = i;
	               			}
	               		};
	               		for(i = 0;i < $(".fliter_style li").length;i++) {
	               			if($(".fliter_style li").eq(i).hasClass("active")) {
	               				Style = i;
	               			}
	               		};
						cardSort.descSort(Area,Type,Style,3,limit, $scope, $http);
						/* 收藏量的点击效果 */
		               	$(this).addClass("active").siblings().removeClass("active");
					});
					$(".content_title .default").on("click",function() {
						for(i = 0;i < $(".fliter_area li").length;i++) {
	               			if($(".fliter_area li").eq(i).hasClass("active")) {
	               				Area = i;
	               			}
	               		};
	               		for(i = 0;i < $(".fliter_type li").length;i++) {
	               			if($(".fliter_type li").eq(i).hasClass("active")) {
	               				Type = i;
	               			}
	               		};
	               		for(i = 0;i < $(".fliter_style li").length;i++) {
	               			if($(".fliter_style li").eq(i).hasClass("active")) {
	               				Style = i;
	               			}
	               		};
						cardSort.descSort(Area,Type,Style,0,limit, $scope, $http);
						/* 默认排序的点击效果 */
		               	$(this).addClass("active").siblings().removeClass("active");
					});
				}else {  /* 如果失败执行 */
					$(".pic_box").addClass("display");
					alert(data.msg);
				}
			}).error(function (data,status) {				
			});
			
		}
	};
	/*
	 * 排序
	 */
	cardSort = {
		descSort : function(Area,Type,Style,order,limit,$scope, $http) {
			$http({
				method: "jsonp",
				url: CARD,
				/* 传参数 */
				params: {
					area: Area,
					housetype: Type,
					servicetag: Style,
					order: order,
					limit: limit
				}
			}).success(function (data,status) {
				/* 如果成功执行 */
				if (data.code == '000') {
					$scope.cards = data.data;
					
				}else {  /* 如果失败执行 */
					$(".pic_box").addClass("display");
					alert(data.msg);
				}
			}).error(function (data,status) {				
			});
		}
	}
	
	//入口方法调用 代码只能从这里执行
    virtualReality.init();
})();
