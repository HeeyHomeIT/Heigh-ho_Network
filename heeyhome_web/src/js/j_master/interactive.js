/**
 * Created by Administrator on 2016/12/14.
 */
/**
 * 闭包
 * tangj
 */
(function () {

    /**
     * 需要require的公共方法或组件
     */
    var HHIT_CENTERAPP = angular.module('heeyhomeApp');

    var MASTERDATAURL = 'http://hyu2387760001.my3w.com/personal/foremaninfo'; // 工长个人资料
    var SAFELEVELURL = 'http://hyu2387760001.my3w.com/personal/safe'; // 安全等级
    var TEAMURL = 'http://hyu2387760001.my3w.com/myworkers'; // 我的团队
    var SHOPCURL = 'http://hyu2387760001.my3w.com/personal/myshop?callback=JSON_CALLBACK';//店铺资料


    var USERIMGURL = 'http://hyu2387760001.my3w.com/personal/portrait'; // 用户头像
    var PANORAMAURL = 'http://hyu2387760001.my3w.com/personal/collection/panorama?callback=JSON_CALLBACK';//我的收藏全景图
    var DSHOPURL = 'http://hyu2387760001.my3w.com/personal/collection/shopdel?callback=JSON_CALLBACK';//我的收藏店铺删除
    var DPICURL = 'http://hyu2387760001.my3w.com//personal/collection/panoramadel?callback=JSON_CALLBACK';//我的收藏全景图删除

    var email;//获取工长邮箱
    var pic_total;//获取我的收藏全景图总数据

    /*定义一个类*/
    var centerWrap = {
        /**
         * 入口方法
         */
        init: function () {
            centerWrap.initEvent();
        },
        initEvent: function () {
            var self = this;
            self.initStyleChangeEvent();
            self.initMHomeEvent();
            self.initMDataEvent();
            self.initMWorkEvent();
            self.initMTeamEvent();
            self.initMShopEvent();
            self.initMOrderEvent();
        },
        /**
         * 个人中心样式改变事件
         */
        initStyleChangeEvent: function () {

            HHIT_CENTERAPP.controller('leftCtrl', ['$scope', '$http', function ($scope, $http) {
                /* 左边导航栏鼠标点击事件 */
                $('.left_ul li').click(function () {
                    $(this).addClass('left_active').siblings().removeClass('left_active');
                });
                var hash = window.location.hash;
                var $a = $('#left_ul a');
                $a.each(function () {
                    var uiSref = $(this).attr('ui-sref');
                    if (hash.indexOf(uiSref.replace('.', '/')) != -1) {
                        $(this).parent().addClass('left_active');
                    }
                })
            }]);
        },
        /*
         *  我的主页内容获取
         */
        initMHomeEvent: function () {
            HHIT_CENTERAPP.controller('mhomeCtrl', ['$scope', '$http', function ($scope, $http) {
                // getHomeInfoHandler.getInfoEvent();//获取用户信息
                // getHomeInfoHandler.getImgEvent();//获取用户头像
                // getHomeInfoHandler.getCollectEvent();//获取用户我的收藏信息
                // getHomeInfoHandler.getSafeEvent();//获取用户的安全等级
            }]);
        },
        /*
         *  工长个人资料标题切换内容
         */
        initMDataEvent: function () {
            HHIT_CENTERAPP.controller('mDataCtrl', ['$scope', '$http', function ($scope, $http) {
                // 加载城市插件
                $('[data-toggle="distpicker"]').distpicker();
                /* details */
                var $dtDiv = $("#works_content_title div");
                var iSpeed = 0;
                var left = 0;
                var oBg = document.getElementById("title_active");
                for (var i = 0; i < $dtDiv.length - 1; i++) {
                    $dtDiv[i].onclick = function () {
                        startMoveHandler.startMoveEvent(oBg, this.offsetLeft, iSpeed, left);
                        $(".personal_content").hide();
                        $(".update_head").hide();
                        $(".works_content >div:eq(" + ($(this).index() + 1) + ")").show().removeClass('hide');
                    }
                }
                getMasterInfoHandler.getInfoEvent();//获取工长信息
                uploadPictureHandler.uploadAvatar();//上传图片
            }]);
        },
        /*
         *  我的作品标题切换内容
         */
        initMWorkEvent: function () {
            HHIT_CENTERAPP.controller('mWorkCtrl', ['$scope', '$http', function ($scope, $http) {
                /* details */
                var $dtDiv = $("#works_content_title1 div");
                var iSpeed = 0;
                var left = 0;
                var oBg = document.getElementById("title_active");
                for (var i = 0; i < $dtDiv.length - 1; i++) {
                    $dtDiv[i].onclick = function () {
                        startMoveHandler.startMoveEvent(oBg, this.offsetLeft, iSpeed, left);
                        $(".works_complete_wrap").hide();
                        $(".works_pending_wrap").hide();
                        $(".my_work >div:eq(" + ($(this).index() + 1) + ")").show().removeClass('hide');
                    }
                }
            }]);
        },
        /*
         *  我的团队
         */
        initMTeamEvent: function () {
            HHIT_CENTERAPP.controller('mTeamCtrl', ['$scope', '$http', function ($scope, $http) {
                $('.team_bg_wrap').hover(function () {
                    $(this).find('.team_bg_bottom').stop().fadeIn().removeClass('hide');
                }, function () {
                    $(this).find('.team_bg_bottom').stop().fadeOut();
                });
                getTeamInfoHandler.getInfoEvent();
            }]);
        },
        /*
         *  店铺资料
         */
        initMShopEvent: function () {
            HHIT_CENTERAPP.controller('mShopCtrl', ['$scope', '$http', function ($scope, $http) {
                getShopInfoHandler.shopInfo();
            }]);
        },
        /*
         *  我的订单点击小三角事件
         */
        initMOrderEvent: function () {
            HHIT_CENTERAPP.controller('mMorderCtrl', ['$scope', '$http', function ($scope, $http) {
                var _arrow = $(".order_title div").eq(6);//全部后面的小三角形
                var _area = $(".order_content .order_box");//哪一份订单
                var _arrowcnt = $(".order_title div").eq(6).find("ul");//全部后面的小三角形里的内容
                $(_arrow).click(function () {
                    $(_arrowcnt).slideDown(500);
                }, function () {
                    if ($(_arrow).hasClass("item_hover_180")) {
                        $(_arrow).removeClass("item_hover_180");
                    }
                    else {
                        $(_arrow).addClass("item_hover_180");
                    }
                    $(_arrowcnt).slideToggle(500);
                });
                $(_area).each(function () {
                    var _arrowsize = $(this).find(".area").children("p");//建筑面积里的小三角形
                    var _sizecnt = $(this).find(".ordercnt_content").children(".order_detail");//建筑面积里的小三角形里的内容
                    $(_arrowsize).click(function () {
                        $(_sizecnt).slideDown(500);
                    }, function () {

                        if ($(this).hasClass("item_hover_180")) {
                            $(this).removeClass("item_hover_180");
                            $(this).css({"border": "0"});
                        }
                        else {
                            $(this).addClass("item_hover_180");
                            $(this).css({"border": "1px solid #EFEFEF", "border-bottom": "1px solid #ffffff"});
                        }
                        $(_sizecnt).slideToggle(500);
                    });
                });
            }]);
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

    /* 获取我的主页用户信息 */
    getHomeInfoHandler = {
        /* 获取用户资料信息 */
        getInfoEvent: function () {
            $.ajax({
                url: USERDATAURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    user_id: $.base64.decode($.cookie("userId"))
                },
                success: function (data) {
                    if (data && data.code == '000') {
                        var abb_phone = data.data.userinfo_phone.substr(0, 3) + "****" + data.data.userinfo_phone.substr(7, 11);//手机号中间四位变成*号
                        $('.user_name').html(data.data.userinfo_nickname); //获取用户的昵称
                        $('#user_phone').html(abb_phone); //获取用户的用户名
                        //data.data.userinfo_email = "sada";
                        email = data.data.userinfo_email; //获取用户的邮箱
                        if (email != null) {//判断邮箱是否为空
                            $('#email span').html('已绑定');
                            $('#email a').html('立即修改');
                        }
                    }
                },
                error: function (data) {
                }
            });
        },
        /* 获取用户头像信息 */
        getImgEvent: function () {
            $.ajax({
                url: USERIMGURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    user_id: $.base64.decode($.cookie("userId"))
                },
                success: function (data) {
                    if (data && data.code == '000') {
                        //console.log(data.data);
                        $('.left_img img').attr('src', 'http://hyu2387760001.my3w.com/' + data.data.user_img);
                    }
                },
                error: function (data) {
                }
            });
        },
        /* 获取用户我的收藏信息 */
        getCollectEvent: function () {
            /* 效果图 */
            $.ajax({
                dataType: "JSONP",
                url: PANORAMAURL,
                type: "GET",
                async: true,
                data: {
                    user_id: $.base64.decode($.cookie("userId")),
                    page: 1,
                    limit: 1
                },
                success: function (data) {
                    if (data && data.code == '000') {
                        $('#pic_total').html(data.data[0].total);
                    } else {
                        $('#pic_total').html(0);
                    }
                },
                error: function (data) {
                }
            });
            /* 店铺 */
            $.ajax({
                dataType: "JSONP",
                url: SHOPCURL,
                type: "GET",
                async: true,
                data: {
                    user_id: $.base64.decode($.cookie("userId")),
                    page: 1,
                    limit: 1
                },
                success: function (data) {
                    if (data && data.code == '000') {
                        $('#shop_total').html(data.data[0].total);
                    } else {
                        $('#shop_total').html(0);
                    }
                },
                error: function (data) {
                }
            });
        },
        /* 获取用户的安全等级 */
        getSafeEvent: function () {
            $.ajax({
                dataType: "JSONP",
                url: SAFELEVELURL,
                type: "GET",
                async: true,
                data: {
                    user_id: $.base64.decode($.cookie("userId"))

                },
                success: function (data) {
                    if (data && data.code == '000') {
                        if (parseInt(data.data.score) > 0 && parseInt(data.data.score) <= 3.3) {
                            /* 安全等级显示 */
                            $('#active_level').css('width', '47px');
                            $('.safe_name span').eq(0).addClass('active_name');
                        } else if (parseInt(data.data.score) > 3.3 && parseInt(data.data.score) <= 6.7) {
                            /* 安全等级显示 */
                            $('#active_level').css('width', '94px');
                            $('.safe_name span').eq(1).addClass('active_name');
                        } else {
                            /* 安全等级显示 */
                            $('#active_level').css('width', '141px');
                            $('.safe_name span').eq(2).addClass('active_name');
                        }
                    }
                },
                error: function (data) {
                }
            });
        }
    };

    /* 获取工长信息 */
    getMasterInfoHandler = {
        getInfoEvent: function () {
            $.ajax({
                url: MASTERDATAURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    foreman_id: $.base64.decode($.cookie("userId"))
                },
                success: function (data) {
                    console.log(data);
                    if (data != null && data.code == '000') {
                        var abb_phone = data.data.foremaninfo_phone.substr(0, 3) + "****" + data.data.foremaninfo_phone.substr(7, 11);//手机号中间四位变成*号
                        $('.personal_tel').html(abb_phone); //获取工长的电话号码
                        $('.personal_user_age').val(data.data.foremaninfo_age); //获取工长的年龄
                        $('.personal_user_nickname').val(data.data.foremaninfo_nickname); //获取工长的昵称
                        $('.personal_area_detail').val(data.data.loc_address); //获取工长的详细住址
                        email = data.data.foremaninfo_email; //获取工长的邮箱
                        if (email != null) {//判断邮箱是否为空
                            $('#email_p').html(email + '<a href="javascript:;">修改绑定</a>')
                        }
                        $('.personal_user_name').val($.base64.decode($.cookie("userName"))); //获取工长的用户名
                        //判断工长的性别
                        if (data.data.foremaninfo_sex == 1) {
                            $('#man').attr('checked', 'checked');
                        } else {
                            $('#women').attr('checked', 'checked');
                        }
                        //获取工长的从业经历
                        var eLen = data.data.experience.length;
                        var eStr = '';
                        for (var i = 0; i < eLen; i++) {
                            eStr += data.data.experience[i] + "；";
                            $('.personal_form_area textarea').val(eStr);
                        }
                        //获取工长的服务区域
                        var aLen = data.data.servicearea.length;
                        for (var i = 0; i < aLen; i++) {
                            $('#personal_circle').before('<a class="personal_area" href="javascript:;">' + data.data.servicearea[i] + '</a>');
                        }
                        //获取工长的装修小区
                        var dLen = data.data.decoratedareas.length;
                        var dStr = '';
                        for (var i = 0; i < dLen; i++) {
                            dStr += data.data.decoratedareas[i] + "；";
                            $('.personal_user_community').val(dStr);
                        }
                        //获取所在地信息
                        $('#loc').distpicker({
                            province: data.data.loc_province,
                            city: data.data.loc_city,
                            district: data.data.loc_district
                        });

                        //获取家乡信息
                        $('#home').distpicker({
                            province: data.data.home_province,
                            city: data.data.home_city,
                            district: data.data.home_district
                        });
                    }
                },
                error: function (data) {
                }
            });
        }
    };

    /* 获取我的团队信息 */
    getTeamInfoHandler = {
        getInfoEvent: function () {
            $.ajax({
                url: TEAMURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    shop_id: $.base64.decode($.cookie("userShopId"))
                },
                success: function (data) {
                    if (data != null && data.code == '000') {
                        console.log(data);
                        $('#eleworker').html(data.data.eleworker.length);//水电工
                        $('#woodworker').html(data.data.woodworker.length);//木工
                        $('#brickworker').html(data.data.brickworker.length);//瓦工
                        $('#paintworker').html(data.data.paintworker.length);//油漆工
                        $('#mixworker').html(data.data.mixworker.length);//杂工
                    }
                },
                error: function (data) {
                }
            });
        }
    };

    /* 获取工长店铺资料 */
    getShopInfoHandler = {
        shopInfo: function () {
            HHIT_CENTERAPP.controller('shop', ['$scope', '$http', function ($scope, $http) {
                $http({
                    method: "JSONP",
                    url: SHOPCURL,
                    /* 传参 */
                    params: {
                        shop_id: $.base64.decode($.cookie("userShopId"))
                    }
                }).success(function (data, status) {
                    /* 如果成功执行 */
                    if (data.code === '000') {
                        console.log(data);
                        $('#shop_name').val(data.data.shop_name);//获取店名
                        $('#shop_describe').val(data.data.shop_describe);//获取店铺理念
                        $('#shop_age').val(data.data.opentime);//获取店铺的开店时间
                        $('#shop_ad').val(data.data.shop_address);//获取店铺的地址
                        //获取店铺资料的服务区域
                        var aLen = data.data.servicearea.length;
                        for (var i = 0; i < aLen; i++) {
                            $('#personal_circle').before('<a class="personal_area" href="javascript:;">' + data.data.servicearea[i] + '</a>');
                        }
                        //获取店铺资料的擅长风格
                        var sLen = data.data.servicetag.length;
                        for (var i = 0; i < sLen; i++) {
                            $('#personal_style').before('<a class="personal_area" href="javascript:;">' + data.data.servicetag[i] + '</a>');
                        }
                        //获取店铺资料的店铺认证
                        var hLen = data.data.authentication.length;
                        for (var i = 0; i < hLen; i++) {
                            $('#shop_head').append('<img class="fl" src="http://hyu2387760001.my3w.com/' + data.data.authentication[i] + '">');
                        }
                        //获取店铺资料的本店工艺
                        $scope.infos = data.data.shop_technics;
                        //获取店铺资料的效果图展示
                        $scope.imgs = data.data.shop_imgs;
                        console.log($scope.imgs);
                    }
                    /* 如果失败执行 */
                    else {
                        //alert(data.msg);
                    }
                }).error(function (data, status) {
                });
            }]);
            // $.ajax({
            //     url: SHOPCURL,
            //     type: "GET",
            //     async: true,
            //     dataType: 'jsonp',
            //     data: {
            //         shop_id: $.base64.decode($.cookie("userShopId"))
            //     },
            //     success: function (data) {
            //         if (data != null && data.code == '000') {
            //             console.log(data);
            //             $('#shop_name').val(data.data.shop_name);//获取店名
            //             $('#shop_describe').val(data.data.shop_describe);//获取店铺理念
            //             $('#shop_age').val(data.data.opentime);//获取店铺的开店时间
            //             $('#shop_ad').val(data.data.shop_address);//获取店铺的地址
            //             //获取店铺资料的服务区域
            //             var aLen = data.data.servicearea.length;
            //             for (var i = 0; i < aLen; i++) {
            //                 $('#personal_circle').before('<a class="personal_area" href="javascript:;">' + data.data.servicearea[i] + '</a>');
            //             }
            //             //获取店铺资料的擅长风格
            //             var sLen = data.data.servicetag.length;
            //             for (var i = 0; i < sLen; i++) {
            //                 $('#personal_style').before('<a class="personal_area" href="javascript:;">' + data.data.servicetag[i] + '</a>');
            //             }
            //             //获取店铺资料的店铺认证
            //             var hLen = data.data.authentication.length;
            //             for (var i = 0; i < hLen; i++) {
            //                 $('#shop_head').append('<img class="fl" src="http://hyu2387760001.my3w.com/' + data.data.authentication[i] + '">');
            //             }
            //             // //获取店铺资料的本店工艺
            //             // var tLen = data.data.shop_technics.length;
            //             // for (var i = 0; i < tLen; i++) {
            //             //     //alert(data.data.shop_technics[i].technics_img.length);
            //             //     for (var j = 0; j < data.data.shop_technics[i].technics_img.length; j++) {
            //             //         $('.show_bg').before('<img class="fl" src="http://hyu2387760001.my3w.com/' + data.data.shop_technics[i].technics_img[j] + '">');
            //             //     }
            //             // }
            //         }
            //     },
            //     error: function (data) {
            //     }
            // });
        }
    };

    /* 获取我的收藏全景图列表 */
    getPicInfoHandler = {
        picInfo: function () {
            HHIT_CENTERAPP.controller('panoramaController', ['$scope', '$http', function ($scope, $http) {
                function http() {
                    $http({
                        method: "JSONP",
                        url: PANORAMAURL,
                        params: {
                            user_id: $.base64.decode($.cookie("userId")),
                            page: 1,
                            limit: 2
                        }
                    }).success(function (data, status) {
                        /* 如果成功执行 */
                        if (data && data.code === '000') {
                            //console.log(data.data);
                            pic_total = data.data[0].total;//获取总数据
                            var vrStr = "";
                            $.each(data.data, function (i, v) {
                                vrStr += splicePicHandler.spliceStrEvent(v);
                            });
                            $(".picWrap").html(vrStr);
                            pageHandler.pageContentEvent();
                        }
                        /* 如果失败执行 */
                        else {
                            $(".picWrap").html('');
                            $(".page_div3").empty();
                        }
                    }).error(function (data, status) {
                    });
                }

                http();
                $(document).on('click', '.complete_del', function () {
                    var $iscollected_id = $(this).parent().attr('iscollected_id');
                    $.ajax({
                        url: DPICURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            user_id: $.base64.decode($.cookie("userId")),
                            panorama_id: $iscollected_id
                        },
                        success: function (data) {
                            if (data && data.code == '000') {
                                http();
                                pageHandler.pageContentEvent();
                            }
                        },
                        error: function (data) {
                        }
                    });
                });
            }]);
        }
    };

    /* 上传图片 */
    uploadPictureHandler = {
        uploadAvatar: function () {
            var options = {
                thumbBox: '.thumbBox',
                spinner: '.spinner',
                imgSrc: 'css/img/imgWrap_bg.png'
            };
            var cropper = $('.imageBox').cropbox(options);
            $('#upload-file').on('change', function () {
                var reader = new FileReader();
                reader.onload = function (e) {
                    options.imgSrc = e.target.result;
                    cropper = $('.imageBox').cropbox(options);
                    $('.thumbBox').show().removeClass('hide');
                };
                reader.readAsDataURL(this.files[0]);
                /*this.files = [];*/
            });
            /* 点击剪切触发的事件 */
            $('#btnCrop').on('click', function () {
                var img = cropper.getDataURL();
                var result_100 = $('.cropped .result_100');
                var result_50 = $('.cropped .result_50');
                result_100.html('');
                result_50.html('');
                result_100.append('<img src="' + img + '" align="absmiddle" style="width:100px;height:100px;box-shadow:0 0 12px #7E7E7E;">');
                result_50.append('<img src="' + img + '" align="absmiddle" style="width:50px;height:50px;box-shadow:0 0 12px #7E7E7E;" >');
            });
            /* 点击加号触发的事件 */
            $('#btnZoomIn').on('click', function () {
                cropper.zoomIn();
            });
            /* 点击减号触发的事件 */
            $('#btnZoomOut').on('click', function () {
                cropper.zoomOut();
            });
            /* 鼠标移入图片框框的时候禁用滚轮，离开可以使用滚轮 */
            $('.imgWrap').hover(function () {
                disabledMouseWheel.chromeDepend();
            }, function () {
                window.onmousewheel = document.onmousewheel = true;
                document.removeEventListener('DOMMouseScroll', disabledMouseWheel.firefoxDepend, false);
            });
        }
    };

    /* 禁用滚轮事件 */
    disabledMouseWheel = {
        chromeDepend: function () {
            if (document.addEventListener) {
                document.addEventListener('DOMMouseScroll', disabledMouseWheel.firefoxDepend, false);
            }//W3C
            window.onmousewheel = document.onmousewheel = disabledMouseWheel.firefoxDepend;//IE/Opera/Chrome
        },
        firefoxDepend: function (evt) {
            evt = evt || window.event;
            if (evt.preventDefault) {
                // Firefox
                evt.preventDefault();
                evt.stopPropagation();
            } else {
                // IE
                evt.cancelBubble = true;
                evt.returnValue = false;
            }
            return false;
        }
    };
    /**
     * 分页
     */
    pageHandler = {
        pageContentEvent: function () {
            $(".page_div3").empty().paging({
                total: Math.ceil(pic_total / 2), //全部页数
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
                url: PANORAMAURL, //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
                ajaxData: {
                    user_id: $.base64.decode($.cookie("userId")),
                    page: 1,
                    limit: 2
                },   //ajax方式传值时的附加传值,要传的参数放在这里面,页面参数只要指定idParamemeter就好，会自动添加
                dataOperate: function oprate(data) {
                    var vrStr = '';
                    $.each(data.data, function (i, v) {
                        vrStr += splicePicHandler.spliceStrEvent(v);
                    });
                    $(".picWrap").html(vrStr);
                } //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
            });
        }
    };
    /**
     * 拼接内容
     */
    splicePicHandler = {
        spliceStrEvent: function (value) {
            var vrStr = '<div class="works_detail works_detail_first fl complete_img" iscollected_id="' + value.iscollected_id + '">';
            vrStr += '	<a class="complete_del" href="javascript:;">';
            vrStr += '		<img src="css/img/my_work_del.png">';
            vrStr += '		</a>';
            vrStr += '		<div class="detail_img">';
            vrStr += '	<img src="http://hyu2387760001.my3w.com/' + value.panorama_img + '">';
            vrStr += '	</div><!--detail_img-->';
            vrStr += '		<a href="' + value.url + '" class="complete_bg"></a><!--complete_bg-->';
            vrStr += '			<span>' + value.panorama_style + '</span>';
            vrStr += '			<a href="' + value.url + '" class="bg"></a>';
            vrStr += '			</div><!--works_detail-->';
            return vrStr;
        }
    };
    //入口方法调用 代码只能从这里执行
    centerWrap.init();
})();