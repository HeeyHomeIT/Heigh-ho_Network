/**
 * 闭包
 * tangj
 */
(function () {

    /**
     * 需要require的公共方法或组件
     */
    var HHIT_NEWAPP = angular.module('heeyhomeApp');

    var FILTERURL = "http://hyu2387760001.my3w.com/shoplist/gettags?callback=JSON_CALLBACK"; // 获取工长店铺筛选接口
    var LISTURL = "http://hyu2387760001.my3w.com/shoplist?callback=JSON_CALLBACK"; // 获取工长店铺列表信息接口
    var COLLECTURL = "http://hyu2387760001.my3w.com/shop/collect?callback=JSON_CALLBACK"; // 获取工长店铺收藏店铺接口

    /*定义一个类*/
    var wikishop = {
        /**
         * 入口方法
         */
        init: function () {
            wikishop.initEvent();
        },
        initEvent: function () {
            var self = this;
            /* 获取工长店铺筛选接口 */
            self.initFilterEvent();
        },
        /**
         * 获取工长店铺内容
         */
        initFilterEvent: function () {

            HHIT_NEWAPP.controller('myShoplist', ['$scope', '$http', function ($scope, $http) {
                /* 获取工长店铺筛选接口 */
                $http({
                    method: "JSONP",
                    url: FILTERURL
                }).success(function (data, status) {
                    /* 如果成功执行 */
                    if (data.code === '000') {
                        //console.log(data);
                        $scope.serviceareaTitle = data.data.servicearea.shift();//获取服务区域
                        $scope.servicearea = data.data.servicearea;//获取服务区域里的数据
                        $scope.workernumTitle = data.data.workernum.shift();//获取工人数量
                        $scope.workernum = data.data.workernum;//获取工人数量里的数据
                        $scope.servicetagTitle = data.data.servicetag.shift();//获取风格标签
                        $scope.servicetag = data.data.servicetag;//获取风格标签里的数据
                        $scope.shopageTitle = data.data.shopage.shift();//获取店铺年限
                        $scope.shopage = data.data.shopage;//获取店铺年限里的数据
                    } else {  /* 如果失败执行 */
                        alert(data.msg);
                    }
                }).error(function (data, status) {
                });
                /* 获取工长店铺列表信息接口 */
                var total = 0;
                $scope.paginationConf = {
                    currentPage: 1,
                    totalItems: total,
                    itemsPerPage: 4,
                    pagesLength: 5,
                    perPageOptions: [10, 20, 30, 40, 50],
                    onChange: function () {
                        $http({
                            method: "JSONP",
                            url: LISTURL,
                            /* 传参 */
                            params: {
                                user_id: $.base64.decode($.cookie("userId")),
                                page: $scope.paginationConf.currentPage,
                                limit: 4
                            }
                        }).success(function (data, status) {
                            /* 如果成功执行 */
                            if (data.code === '000') {
                                console.log(data.data);
                                $scope.shopList = data.data;
                                /* 防止页面一直刷新 */
                                if (total != data.data[0].total) {
                                    $scope.paginationConf.totalItems = data.data[0].total;
                                }
                                for (var i = 0; i < $scope.shopList.length; i++) {
                                    if ($scope.shopList[i].iscollected == '1') {
                                        $scope.shopList[i].iscollected = '已收藏';
                                    } else {
                                        $scope.shopList[i].iscollected = '收藏';
                                    }
                                }
                                total = data.data[0].total;//获取总数据

                            }
                            /* 如果失败执行 */
                            else {
                                alert(data.msg);
                            }
                        }).error(function (data, status) {
                        });
                    }
                };
                /* 收藏店铺 */
                $scope.collectShop = function ($index) {
                    $http({
                        method: "JSONP",
                        url: COLLECTURL,
                        /* 传参 */
                        params: {
                            user_id: $.base64.decode($.cookie("userId")),
                            shop_id: $scope.shopList[$index].shop_id
                        }
                    }).success(function (data, status) {
                        if (data && data.code == '000') {
                            alert(data.msg);
                            $('.collect_shop').eq($index).attr('value', '已收藏');
                        } else {
                            alert(data.msg);
                        }
                    }).error(function (data, status) {
                    });
                }
            }]);
        }
    };
    //入口方法调用 代码只能从这里执行
    wikishop.init();
})();
