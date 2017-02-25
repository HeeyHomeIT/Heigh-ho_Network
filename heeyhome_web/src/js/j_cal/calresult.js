/**
 * 闭包
 * 店铺详情
 * tangj
 */
(function () {

    /**
     * 需要require的公共方法或组件
     */
    var HHIT_CALRESULTAPP = angular.module('heeyhomeApp');

    var COLLECTIONURL = "http://www.heeyhome.com/api/public/costcalculator/result/collect"; // 收藏成本计算器结果接口


    var payObj = {};
    /* 获取我的收藏成本预算查看详情内容 */
    //payObj = $.parseJSON(sessionStorage.getItem("payJson"));
    if (sessionStorage.payJson != undefined || sessionStorage.payJson != null) {
        payObj = JSON.parse(sessionStorage.payJson);
    }
    var cs = decodeURI(escape(getUrlParam('cs')));
    var mj = getUrlParam('mj');
    var fj = getUrlParam('fj');
    var kt = getUrlParam('kt');
    var wsj = getUrlParam('wsj');
    var yt = getUrlParam('yt');

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.hash.split("?")[1].match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }

    /*定义一个类*/
    var calResultWrap = {
        /**
         * 入口方法
         */
        init: function () {
            calResultWrap.initEvent();
        },
        initEvent: function () {
            var self = this;
            self.initDataEvent(); // 页面初始化
            self.initClickCollectionEvent(); // 进行收藏
            self.initSlideEvent(); // 右侧内容显示隐藏

        },
        initDataEvent: function () {
            // 判断payObj是否为空
            if (JSON.stringify(payObj) != "{}") {
                $.each(payObj, function (i, v) {
                    $("." + i).prepend(parseFloat(v).toFixed(2))
                });
            }
        },
        /**
         * 进行收藏
         */
        initClickCollectionEvent: function () {
            $(document).on("click", ".cr_collection", function () {
                var UID = $.cookie("userId"); // 得到userid
                if (UID != null && UID != "" && UID != undefined) {
                    UID = $.base64.decode(UID);
                } else {
                    UID = "";
                }
                if (UID == '') {
                    layer.msg("亲，收藏前请先登录哦~");
                    function login() {
                        window.location.href = "register.html#/dl";
                    }

                    setTimeout(function () {
                        login();
                    }, 1500);
                } else {
                    var userType = $.cookie('userType');
                    if ($.base64.decode(userType) == 1) {
                        var collectionObj = {};
                        collectionObj = payObj;
                        collectionObj.city = cs; // 城市
                        collectionObj.area = mj;
                        collectionObj.room_num = fj;
                        collectionObj.parlor_num = kt;
                        collectionObj.bathroom_num = wsj;
                        collectionObj.balcony_num = yt;
                        console.log(collectionObj);
                        $.ajax({
                            url: COLLECTIONURL,
                            type: "GET",
                            async: true,
                            dataType: 'jsonp',
                            data: {
                                user_id: UID,
                                calculator_result_json: JSON.stringify(collectionObj)
                            },
                            success: function (data) {
                                layer.alert(data.msg);
                            },
                            error: function (data) {
                            }
                        });
                    } else {
                        layer.msg("此功能暂时只对用户开放");
                    }
                }
            });
        },
        /**
         * 右侧内容显示隐藏
         */
        initSlideEvent: function () {
            /* 屏幕可视区高度小于735时调整相应的高度 */
            var height = $(window).height();
            console.log(height)
            if (height != 736) {
                var $div = $('#slide_bar div');
                $.each($div, function () {
                    $(this).css('height', parseFloat($(this).css('height')) * height / 735);
                });
                $('.wcontent_title').css('backgroundPosition', '15px ' + 90 * height / 735 + 'px');
                if (height > 736) {
                    if (!!window.ActiveXObject || "ActiveXObject" in window) {//IE浏览器下特殊样式
                        $('.wcontent_title span').addClass('span');
                    } else {
                        $('.wcontent_title span').css({'marginTop': '20px', 'position': 'absolute'});
                    }
                } else {
                    $('.wcontent_title span').css('fontSize', '14px');
                }
            }
            /* 鼠标移入左边导航栏的效果 */
            $('.sl_wcontent').hover(function () {
                var $a = $(this).find('a');
                var r = -102;
                $a.show().css({"left": (r - 20) + 'px'}).stop().animate({left: r}, 500);
            }, function () {
                $(this).find('a').hide();
            }).click(function (e) {
                var $slideBar = $(this).parents('#slide_bar');
                if ($(this).hasClass('sl_wcontentActive')) {
                    $(this).removeClass('sl_wcontentActive');
                    $slideBar.next(".slide_content").stop().animate({right: "-300px"}, 500);
                    $slideBar.stop().animate({right: "0"}, 500);
                    $slideBar.parents('#slide_bar').next(".slide_content").children('.slide_contentWrap').hide();
                } else {
                    $(this).addClass('sl_wcontentActive').siblings().removeClass('sl_wcontentActive');
                    $slideBar.next(".slide_content").stop().animate({right: "0"}, 500);
                    $slideBar.stop().animate({right: "300px"}, 500);
                    $slideBar.next(".slide_content").children('.slide_contentWrap').hide().eq($(this).index()).fadeIn(1500).removeClass('hide');
                }
                e.stopPropagation();//阻止冒泡事件
            });
            /* 点击页面中的a链接 */
            $('.content_materials').click(function (e) {
                var i = $('.content_materials').index($(this));
                var $nslideBar = $(this).parents('#crcontainer').next("#slide_bar");
                var $sl_wcontent = $nslideBar.find('.sl_wcontent');
                $sl_wcontent.removeClass('sl_wcontentActive');
                $sl_wcontent.eq(i).addClass('sl_wcontentActive');
                $nslideBar.next(".slide_content").stop().animate({right: "0"}, 500);
                $nslideBar.stop().animate({right: "300px"}, 500);
                $nslideBar.next(".slide_content").children('.slide_contentWrap').hide().eq(i).fadeIn(1500).removeClass('hide');
                e.stopPropagation();//阻止冒泡事件
            });
            /* 点击网页中的任一页面使右边内容消失 */
            $('body').click(function () {
                $(".slide_content").stop().animate({right: "-300px"}, 500);
                $('#slide_bar').stop().animate({right: "0"}, 500);
                $('.sl_wcontent').removeClass('sl_wcontentActive');
            });
            /* 阻止右边内容的冒泡事件 */
            $(".slide_content").click(function (e) {
                e.stopPropagation();
            })
        }
    };

    //入口方法调用 代码只能从这里执行
    HHIT_CALRESULTAPP.controller('calresultCtrl', ['$scope', '$http', function ($scope, $http) {
        calResultWrap.init();
    }]);
})();