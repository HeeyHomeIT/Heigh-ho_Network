/**
 * Created by Administrator on 2016/12/3.
 */

(function () {
    var decoration = {

        init: function () {
            decoration.initEvent();
        },

        initEvent: function () {
            var self = this;
            self.initDecorationEvent();
        },
        initDecorationEvent: function () {
            angular.module('newApp').controller('myCtrl', ['$scope', '$http', function ($scope, $http) {
                /* 右边文章列表默认出现 */
                detailDecoration.myArticle(1, $scope, $http);
                /* 获取家装百科分类接口 */
                $http({
                    method: "JSONP",
                    url: "http://hyu2387760001.my3w.com/jzbk/cate?callback=JSON_CALLBACK"
                }).success(function (data, status) {
                    var rH = $('.right_title h2');
                    /* 如果成功执行 */
                    if (data.code === '000') {
                        $scope.names = data.data;
                        /* 右边标题默认出现 */
                        rH.html(data.data[0].cate_describe);
                        
                    }
                    /* 如果失败执行 */
                    else {
                        alert(data.msg);
                    }
                }).error(function (data, status) {
                });
                /* 左边导航栏点击事件 */
                $scope.barTab = function (describe, id) {
                    /* 获取右边文章标题 */
                    $('.right_title h2').html(describe);
                    /* 获取右边文章列表 */
                    detailDecoration.myArticle(id, $scope, $http);
                    /* 左边导航栏点击效果 */
                    $("#" + id).addClass("active").siblings().removeClass("active");
                }
            }]);
        }


    };
    detailDecoration = {
        myArticle: function (id, $scope, $http) {
            /* 获取文章列表接口 */
            $http({
                method: "JSONP",
                url: "http://hyu2387760001.my3w.com/jzbk/article?callback=JSON_CALLBACK",
                /* 传参 */
                params: {
                    cate_id: id
                }
            }).success(function (data, status) {
                /* 如果成功执行 */
                if (data.code === '000') {
                    $scope.lists = data.data;
                }
                /* 如果失败执行 */
                else {
                    alert(data.msg);
                }
            }).error(function (data, status) {
            });
        }
    };
    decoration.init();

})();

