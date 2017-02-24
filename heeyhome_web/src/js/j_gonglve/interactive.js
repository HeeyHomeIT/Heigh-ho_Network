/**
 * 闭包
 * tangj
 */
(function () {

    /**
     * 需要require的公共方法或组件
     */
    var HHIT_NEWAPP = angular.module('heeyhomeApp');
    var gonglve_total;//获取总数据
    var dHash = window.location.hash;//这里用search获取不到值，因为？前面有#号，所以用字符串截取hash的办法
    var idHash = dHash.substring(12, dHash.length);//截取字符串?后面的值

    var CATEURL = "http://www.heeyhome.com/api/public/jzbk/cate?callback=JSON_CALLBACK"; // 获取家装百科分类接口
    var ARTICLE = "http://www.heeyhome.com/api/public/jzbk/article?callback=JSON_CALLBACK"; // 获取文章列表接口
    var VRVIEWURL = "http://www.heeyhome.com/api/public/jzbk/scan"; // 获取浏览量

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
            self.initNavHeadeEvent();
        },
        /**
         * 获取右侧百科标题
         */
        initNavHeadeEvent: function () {
            HHIT_NEWAPP.controller('myGonglve', ['$scope', '$http', function ($scope, $http) {
                var $rH = $('.right_title h2'); // 家装百科总标题

                /* 获取家装百科分类接口 */
                $http({
                    method: "JSONP",
                    url: CATEURL
                }).success(function (data, status) {
                    /* 如果成功执行 */
                    if (data.code === '000') {
                        console.log(data.data);
                        /* 右边文章列表默认出现 */
                        navHeadeClickHendler.myArticleEvent(data.data[0].id);
                        $scope.names = data.data;
                        /* 右边标题默认出现 */
                        $rH.html(data.data[0].cate_describe);
                        sessionStorage.setItem("describe", data.data[0].cate_describe);
                        sessionStorage.setItem("name", data.data[0].cate_name);
                    } else {  /* 如果失败执行 */
                        layer.alert(data.msg);
                    }
                }).error(function (data, status) {
                });
                /* 左边导航栏点击事件 */
                $(document).on('click', '.bar_list', function () {
                    var id = $(this).attr('id');
                    var describe = $(this).attr('describe');
                    var name = $(this).attr('name');
                    sessionStorage.setItem("describe", describe);
                    sessionStorage.setItem("name", name);
                    /* 获取右边文章标题 */
                    $rH.html(describe);
                    /* 获取右边文章列表 */
                    navHeadeClickHendler.myArticleEvent(id);
                    /* 左边导航栏点击效果 */
                    $("#" + id).addClass("active").siblings().removeClass("active");
                })
            }]);
        }
    };
    /**
     * 百科标题点击事件
     */
    navHeadeClickHendler = {
        myArticleEvent: function (id) {
            /* 获取文章列表接口 */
            var load = '<div class="loading"><img src="image/icon-loading.gif"></div>';
            $.ajax({
                url: ARTICLE,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    cate_id: id,
                    page: 1,
                    limit: 2
                },
                beforeSend: function () {
                    $(".right_wrap").append(load);
                    $(".right_wrap .loading").css('left', '55%');
                    $('.rightDetail').remove();
                },
                complete: function () {
                    $(".right_wrap .loading").remove(); //关闭加载层
                },
                success: function (data) {
                    if (data && data.code == '000') {
                        console.log(data);
                        gonglve_total = data.data[0].total;//获取总数据
                        splicePicHandler.spliceStrEvent(data.data);
                        pageHandler.pageContentEvent(id);
                        viewPlus.addView();
                    }
                },
                error: function (data) {
                    layer.alert(data.msg);
                }
            });
        }

    };
    /**
     * 浏览量计数
     */
    viewPlus = {
        addView: function () {
            $(".rightDetail").on("click", function () {
                var id = $(this).attr("rid");
                var icon = $(this).find('.icon_people');
                $.ajax({
                    type: "get",
                    url: VRVIEWURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        id: id
                    },
                    success: function (data) {
                        if (data && data.code == '000') {
                            icon.html(data.data.scan++);
                            //location.reload();
                        } else {
                            layer.alert(data.msg);
                        }
                    },
                    error: function (data) {
                    }
                });
            });
        }
    };
    /**
     * 分页
     */
    pageHandler = {
        pageContentEvent: function (id) {
            console.log(gonglve_total);
            $(".page_number>div").append($(".page_div3").empty().paging({
                total: Math.ceil(gonglve_total / 2), //全部页数
                animation: false, //是否是滚动动画方式呈现  false为精简方式呈现   页数大于limit时无论怎么设置自动默认为false
                centerBgColor: "#fff",
                centerFontColor: "#000",
                centerBorder: "1px solid #ddd",
                transition: "all .2s",
                centerHoverBgColor: "#eec988",
                centerHoverBorder: "1px solid #eec988",
                centerFontHoverColor: "#fff",
                otherFontHoverColor: "#fff",
                otherBorder: "1px solid #ddd",
                otherHoverBorder: "1px solid #eec988",
                otherBgColor: "#fff",
                otherHoverBgColor: "#eec988",
                currentFontColor: "#fff",
                currentBgColor: "#eec988",
                currentBorder: "1px solid #eec988",
                fontSize: 13,
                currentFontSize: 13,
                cormer: 2, //按钮的边角曲度
                gapWidth: 3, //间隙宽度
                showJump: true, //是否显示跳转功能
                jumpBgColor: "#fff",
                jumpFontHoverColor: "#fff",
                jumpHoverBgColor: "#eec988",
                jumpBorder: "1px solid #ddd",
                jumpHoverBorder: "1px solid #eec988",
                submitType: "get", //注明是通过get方式访问还是post方式访问
                idParameter: "page",               //传到后台的当前页的id的参数名，这个传值会自动添加在href或ajax的url末尾
                url: ARTICLE, //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
                ajaxData: {
                    cate_id: id,
                    page: 1,
                    limit: 2
                },   //ajax方式传值时的附加传值,要传的参数放在这里面,页面参数只要指定idParamemeter就好，会自动添加
                dataOperate: function oprate(data) {
                    splicePicHandler.spliceStrEvent(data.data);
                    viewPlus.addView();
                } //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
            }));
        }
    };
    /**
     * 拼接内容
     */
    splicePicHandler = {
        spliceStrEvent: function (value) {
            var vrStr = '';
            $.each(value, function (i, v) {
                vrStr += '<div class="rightDetail" rid="' + v.id + '">';
                vrStr += '<a class="right_detail clearfix" href="gonglve_detail.html#/detail?id=' + v.id + '" target="_blank">';
                vrStr += '	<div class="right_img">';
                vrStr += '		<img src="' + v.img + '">';
                vrStr += '		<div class="img_background_1"></div>';
                vrStr += '		<div class="img_background_2"></div>';
                vrStr += '	</div><!--right_img-->';
                vrStr += '	<div class="detail_content">';
                vrStr += '		<div class="detail_title">' + v.article_title + '</div><!--detail_title-->';
                vrStr += '			<div class="detail_des">';
                vrStr += '			<div id="detail_p">' + v.article_content + '</div>';
                vrStr += '			<div class="detail_bro">';
                vrStr += '			<i class="iconfont">&#xe631;</i><span class="icon_time">' + v.add_time + '</span>';
                vrStr += '			<i class="iconfont icon_eye">&#xe620;</i><span class="icon_people">' + v.scan + '</span>';
                vrStr += '			</div><!--detail_bro-->';
                vrStr += '			</div><!--detail_des-->';
                vrStr += '			</div><!--detail_content-->';
                vrStr += '			</a><!--right_detail-->';
                vrStr += '			</div>';
                // return vrStr;
            });
            $(".right_wrap").html(vrStr);
        }
    };
    //入口方法调用 代码只能从这里执行
    wikipedia.init();
})();
