var GoodsDetails = {
    /* 头部左右切换效果 */
    details: function () {
        /* details */
        var dtDiv = $("#works_content_title div");
        var iSpeed = 0;
        var left = 30;
        var oBg = document.getElementById("title_active");
        for (var i = 0; i < dtDiv.length - 1; i++) {
            dtDiv[i].onclick = function () {
                startMove(oBg, this.offsetLeft);
                $(".complete_before").hide();
                $(".check_list_wrap").hide();
                $(".collection_shop_wrap").hide();
                $(".works_complete_wrap >div:eq(" + ($(this).index()) + ")").show().removeClass('hide');
            }
        }
        function startMove(obj, iTarget) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                iSpeed += (iTarget - obj.offsetLeft) / 10;
                iSpeed *= 0.7;
                left += iSpeed;                 //防止小数误差问题
                if (Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) {      //距离足够近与速度足够小
                    clearInterval(obj.timer);
                    obj.style.left = iTarget + "px";
                } else {
                    obj.style.left = left + "px";
                }
            }, 30);
        }
    },
    /* 获取店铺收藏列表 */
    shopInfo: function () {
        var myApp = angular.module('customerApp');
        var _url = 'http://hyu2387760001.my3w.com/personal/collection/shop?callback=JSON_CALLBACK';
        myApp.controller('a', ['$scope', '$http', function ($scope, $http, $timeout) {
            $scope.paginationConf = {
                currentPage: 1,
                totalItems: 20,
                itemsPerPage: 5,
                pagesLength: 9,
                perPageOptions: [10, 20, 30, 40, 50],
                onChange: function () {
                    $http({
                        method: "JSONP",
                        url: _url,
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
                            $scope.infos = data.data;
                            // page_(2, data.length);
                        }
                        /* 如果失败执行 */
                        else {
                            alert(data.msg);
                        }
                    }).error(function (data, status) {
                    });
                }
            };
        }]);
    },
    /* 删除店铺收藏列表 */
    clickEvent: function () {
        var self = this;
        $(document).on('click', '.collection_shop_del', function () {
            self.deleteInfo();
            $(this).parents('.collection_shop').slideUp(500).remove();
        })
    },
    deleteInfo: function () {
        var _url = 'http://hyu2387760001.my3w.com/personal/collection/shopdel';
        $.ajax({
            url: _url,
            type: "GET",
            async: true,
            dataType: 'jsonp',
            data: {
                shop_id: $('.collection_shop').attr('shop_id')
            },
            success: function (data) {
                if (data != null && data.code == '000') {
                    alert(data.msg);
                }
            },
            error: function (data) {
            }
        });
    }
};
define(['angular'], function (angular) {
    //将本控制器函数作为结果返回给router.js
    return function my_collection() {
        GoodsDetails.details();
        GoodsDetails.shopInfo();
        GoodsDetails.clickEvent();
    };
});