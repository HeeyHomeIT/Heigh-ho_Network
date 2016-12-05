/**
 * 闭包
 * tangj
 */
(function(){

    /**
     * 需要require的公共方法或组件
     */
	var HHIT_NEWAPP = angular.module('newApp');
	
	var CATEURL = "http://hyu2387760001.my3w.com/jzbk/cate?callback=JSON_CALLBACK"; // 获取家装百科分类接口
	var ARTICLE = "http://hyu2387760001.my3w.com/jzbk/article?callback=JSON_CALLBACK"; // 获取文章列表接口

   	/*定义一个类*/
   	var wikipedia = {
   		/**
         * 入口方法
         */
        init: function() {
        	wikipedia.initEvent();
        },
        initEvent: function() {
        	var self = this;
        	/* 获取右侧百科标题*/
        	self.initNavHeadeEvent();
        },
        /**
		 * 获取右侧百科标题
		*/
        initNavHeadeEvent: function() {
        	
        	HHIT_NEWAPP.controller('myCtrl', ['$scope', '$http', function ($scope, $http) {
        		var $rH = $('.right_title h2'); // 家装百科总标题
                /* 右边文章列表默认出现 */
                navHeadeClickHendler.myArticleEvent(1, $scope, $http);
                /* 获取家装百科分类接口 */
                $http({
                    method: "JSONP",
                    url: CATEURL
                }).success(function (data, status) {
                    /* 如果成功执行 */
                    if (data.code === '000') {
                        $scope.names = data.data;
                        /* 右边标题默认出现 */
                        $rH.html(data.data[0].cate_describe);
                        
                    }else {  /* 如果失败执行 */
                        alert(data.msg);
                    }
                }).error(function (data, status) {
                });
                /* 左边导航栏点击事件 */
                $scope.barTab = function (describe, id) {
                    /* 获取右边文章标题 */
                    $rH.html(describe);
                    /* 获取右边文章列表 */
                    navHeadeClickHendler.myArticleEvent(id, $scope, $http);
                    /* 左边导航栏点击效果 */
                    $("#" + id).addClass("active").siblings().removeClass("active");
                }
            }]);
        }
   	};
   	/**
   	 * 百科标题点击事件
   	 */
	navHeadeClickHendler = {
    	myArticleEvent: function (id, $scope, $http) {
        	/* 获取文章列表接口 */
            $http({
                method: "JSONP",
                url: ARTICLE,
                /* 传参 */
                params: {
                	cate_id: id
                }
            }).success(function (data, status) {
                /* 如果成功执行 */
                if (data.code === '000') {
                    $scope.lists = data.data;
                }else {  /* 如果失败执行 */
                    alert(data.msg);
                }
            }).error(function (data, status) {
            });
        }
    }
	//入口方法调用 代码只能从这里执行
    wikipedia.init();
})();
