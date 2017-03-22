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

    var COLLECTIONURL = "/api/public/costcalculator/result/collect"; // 收藏成本计算器结果接口


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
                        window.location.href = "register.html?#dl";
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
            $('#slide_bar').css('top', ($(window).height() - $('#slide_bar').outerHeight()) / 2 + $(document).scrollTop());
            /* 头部标题点击切换 */
            var $dtDiv = $("#works_content_title1 div");
            var iSpeed = 0;
            var left = 0;
            var oBg = document.getElementById("title_active");
            for (var i = 0; i < $dtDiv.length - 1; i++) {
                $dtDiv[i].onclick = function () {
                    startMoveHandler.startMoveEvent(oBg, this.offsetLeft, iSpeed, left);
                    $(".work_content").hide();
                    $(".material_content").hide();
                    $(".slide_content >div:eq(" + ($(this).index() + 1) + ")").show().removeClass('hide');
                }
            }
            var flag = false;
            $('#slide_bar').click(function () {
                if (flag) {
                    $("#slide_bar").stop().animate({right: "-200px"}, 500, function () {
                        $("#slide_bar").stop().animate({right: "349px"}, 500).addClass('bar');
                    });
                    $(".slide_content").stop().animate({right: "-550px"}, 500, function () {
                        $(".slide_content").stop().animate({right: "0"}, 500);
                    });
                    flag = false;

                } else {
                    $("#slide_bar").stop().animate({right: "-200px"}, 500, function () {
                        $("#slide_bar").stop().animate({right: "0"}, 500).removeClass('bar');
                    });
                    $(".slide_content").stop().animate({right: "-550px"}, 500, function () {
                        $(".slide_content").stop().animate({right: "-350px"}, 500);
                    });
                    flag = true;
                }
            });

            $("#slide_bar").stop().animate({right: "-200px"}, 500, function () {
                $("#slide_bar").stop().animate({right: "349px"}, 500).addClass('bar');
            });
            $(".slide_content").stop().animate({right: "-550px"}, 500, function () {
                $(".slide_content").stop().animate({right: "0"}, 500);
            });

            /* 点击网页中的任一页面使右边内容消失 */
            // $('body').click(function () {
            //     $(".slide_content").stop().animate({right: "-300px"}, 500);
            //     $('#slide_bar').stop().animate({right: "0"}, 500);
            //     $('.sl_wcontent').removeClass('sl_wcontentActive');
            // });
            /* 阻止右边内容的冒泡事件 */
            // $(".slide_content").click(function (e) {
            //     e.stopPropagation();
            // })
        }
    };
    /* div移动撞击事件 */
    startMoveHandler = {
        startMoveEvent: function (obj, iTarget, iSpeed, left) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                iSpeed += (iTarget - obj.offsetLeft) / 10;
                iSpeed *= 0.7;
                left += iSpeed; //防止小数误差问题
                if (Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) { //距离足够近与速度足够小
                    clearInterval(obj.timer);
                    obj.style.left = iTarget + "px";
                } else {
                    obj.style.left = left + "px";
                }
            }, 30);
        }
    };

    //入口方法调用 代码只能从这里执行
    HHIT_CALRESULTAPP.controller('calresultCtrl', ['$scope', '$http', function ($scope, $http) {
        calResultWrap.init();
    }]);
})();