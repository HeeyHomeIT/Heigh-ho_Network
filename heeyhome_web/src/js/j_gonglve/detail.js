/**
 * 闭包
 * tangj
 */
(function () {

    /**
     * 需要require的公共方法或组件
     */
    var HHIT_NEWAPP = angular.module('heeyhomeApp');
    var dHash = window.location.hash;//这里用search获取不到值，因为？前面有#号，所以用字符串截取hash的办法
    var idHash = dHash.substring(12, dHash.length);//截取字符串?后面的值

    var DETAILURL = "/api/public/jzbk/info?callback=JSON_CALLBACK"; // 获取文章详情接口

    /*定义一个类*/
    var wikipedia = {
        /**
         * 入口方法
         */
        init: function () {
            wikipedia.initEvent();
        },
        initEvent: function () {
            var self = this;
            /* 获取右侧百科标题*/
            self.initDetailEvent();
        },

        /**
         * 获取百科文章详情内容
         */
        initDetailEvent: function () {
            HHIT_NEWAPP.controller('myDetail', ['$scope', '$http', function ($scope, $http) {
                var cate_describe = sessionStorage.getItem("describe");
                var cate_name = sessionStorage.getItem("name");
                console.log(cate_describe);
                /* 获取文章详情接口 */
                $http({
                    method: "JSONP",
                    url: DETAILURL,
                    /* 传参 */
                    params: {
                        id: idHash
                    }
                }).success(function (data, status) {
                    /* 如果成功执行 */
                    if (data.code === '000') {

                        //往详情页里面塞内容
                        $(".gonglve_detail .now_location .stage").html(cate_name);
                        $(".gonglve_detail .now_location .attention").html(data.data.article_title);
                        $('.gonglve_title').html(data.data.article_title);
                        $('.gonglve_content').html(data.data.article_content);
                    } else {  /* 如果失败执行 */
                        layer.alert(data.msg);
                    }
                }).error(function (data, status) {
                });
            }]);
        }
    };

    //入口方法调用 代码只能从这里执行
    wikipedia.init();
})();
