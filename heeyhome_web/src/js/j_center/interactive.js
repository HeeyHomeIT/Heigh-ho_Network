/**
 * 闭包
 * tangj
 */
(function () {

    /**
     * 需要require的公共方法或组件
     */
    var HHIT_CENTERAPP = angular.module('heeyhomeApp');

    var BASEURL = 'http://hyu2387760001.my3w.com/';

    var USERDATAURL = BASEURL + 'personal/userinfo'; // 用户个人资料
    var EDITUSERDATAURL = BASEURL + 'personal/userinfo/change'; // 编辑用户个人资料
    var USERIMGURL = BASEURL + 'personal/portrait'; // 用户头像
    var SAFELEVELURL = BASEURL + 'personal/safe'; // 安全等级
    var PANORAMAURL = BASEURL + 'personal/collection/panorama?callback=JSON_CALLBACK';//我的收藏全景图
    var SHOPCURL = BASEURL + 'personal/collection/shop?callback=JSON_CALLBACK';//我的收藏店铺列表
    var BILLURL = BASEURL + 'costcalculator/result/get?callback=JSON_CALLBACK';//我的收藏成本计算列表
    var BILLDELURL = BASEURL + 'costcalculator/result/del?callback=JSON_CALLBACK';//我的收藏成本计算列表删除
    var DSHOPURL = BASEURL + 'personal/collection/shopdel?callback=JSON_CALLBACK';//我的收藏店铺删除
    var DPICURL = BASEURL + 'personal/collection/panoramadel?callback=JSON_CALLBACK';//我的收藏全景图删除
    var NEWSURL = BASEURL + 'personal/message/isnew'; // 读取新消息接口
    var READURL = BASEURL + 'personal/message'; // 读取消息中心信息接口
    var DELETEURL = BASEURL + 'personal/message/del'; // 删除消息中心信息接口
    var HAVEREADURL = BASEURL + 'personal/message/read'; // 已读消息接口
    var ALLREADURL = BASEURL + 'personal/message/readall'; // 全部标记已读接口
    var ORDERURL = BASEURL + 'order/shop/list'; // 我的订单
    var USERORDERURL = BASEURL + 'order/client/list';//用户订单
    var ORDERDETAILURL = BASEURL + 'order/detail';//用户订单详情

    var email;//获取用户邮箱
    var pic_total;//获取我的收藏全景图总数据
    var bill_total;//获取我的收藏成本计算总数据
    var shop_total;//获取我的收藏店铺总数据
    var newValue;
    var TOTAL; // 信息中心后台数据总数
    var MAXROWS; //信息中心总页数

    var USERID = $.cookie("userId"); // 得到userid
    if (USERID != null && USERID != "" && USERID != undefined) {
        USERID = $.base64.decode($.cookie("userId"));
    } else {
        USERID = "";
    }

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
            self.initMDataEvent();
            self.initMHomeEvent();
            self.initMCollectionEvent();
            self.initMOrderEvent();
            self.initMsgInfo();
            self.initMOrderDataEvent();
            self.initMOrderDetailEvent();
            self.initSuccessPayEvent();
        },
        /**
         * 个人中心样式改变事件
         */
        initStyleChangeEvent: function () {

            HHIT_CENTERAPP.controller('styleCtrl', ['$scope', '$http', function ($scope, $http) {
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
                });

                /* 消息中心有多少条新消息 */
                $.ajax({
                    type: "get",
                    url: NEWSURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        user_id: USERID
                    },
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            if (data.data.newmsgtotal > 0) {
                                $('.left_ul li').eq(4).append("<i>" + data.data.newmsgtotal + "</i>");
                            }
                        }
                    },
                    error: function (data) {
                    }
                });
            }]);
        },
        /*
         *  我的主页内容获取
         */
        initMHomeEvent: function () {
            HHIT_CENTERAPP.controller('homeCtrl', ['$scope', '$http', function ($scope, $http) {
                getHomeInfoHandler.getInfoEvent();//获取用户信息
                getHomeInfoHandler.getImgEvent();//获取用户头像
                getHomeInfoHandler.getCollectEvent();//获取用户我的收藏信息
                getHomeInfoHandler.getSafeEvent();//获取用户的安全等级
            }]);
        },
        /*
         *  个人资料标题切换内容
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
                getUserInfoHandler.getInfoEvent();
                uploadPictureHandler.uploadAvatar();
            }]);
        },
        /*
         * 我的订单详情
         */
        initMOrderDetailEvent: function () {
            HHIT_CENTERAPP.controller('order_detailCtrl', ['$scope', '$http', function ($scope, $http) {
                $('#menuNavOuter').remove();
                var shop_id = sessionStorage.getItem("shopid");
                var order_id = sessionStorage.getItem("orderid");
                /* 获得订单顶部业主信息 */
                $.ajax({
                    type: "get",
                    url: ORDERURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        shop_id: shop_id
                    },
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            $.each(data.data.order_list, function (i, v) {
                                if (v.order_id == order_id) {
                                    $(".owner_picture img").attr("src", "http://hyu2387760001.my3w.com/" + v.user_portrait);
                                    $(".owner_summary h3").html(v.user_realname);
                                    $(".owner_summary p span").html(v.user_phone);
                                    $(".owner_left .area h3 span").html(v.area);
                                    $(".owner_left .order p").html(order_id);
                                    $(".owner_middle .type p").html(v.room + "室" + v.parlour + "厅" + v.toilet + "卫" + v.balcony + "阳台");
                                    $(".owner_middle .time p").html(v.order_time);
                                    $(".owner_right .address p").html(v.order_address);
                                }
                            });
                        } else {
                            layer.alert(data.msg);
                        }
                    },
                    error: function (data) {

                    }
                });
                /* 获得订单详情 */
                OrderDetail.getDetail();
            }]);
        },
        /*
         * 获得我的订单内容
         */
        initMOrderDataEvent: function () {
            HHIT_CENTERAPP.controller('mMorderCtrl', ['$scope', '$http', function ($scope, $http) {
                $.ajax({
                    type: "get",
                    url: USERORDERURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        user_id: USERID,
                        page: 1,
                        limit: 2
                    },
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            var order_total = data.data.order_count;
                            var order = '';
                            $.each(data.data.order_list, function (i, v) {
                                order += spliceOrderHandler.spliceOrderList(v);
                            });
                            $(".order_content .page_number").before(order);
                            $(".order_box").each(function () {
                                if ($(this).find(".all a").length == 1) {
                                    $(this).find(".all .top").addClass("one");
                                }
                            });
                            $(".ordercnt_content .all").on("click", function () {
                                var shopid = $(this).attr("data-shopid");
                                var orderid = $(this).attr("data-orderid");
                                sessionStorage.setItem("shopid", shopid);
                                sessionStorage.setItem("orderid", orderid);
                            });
                            OrderPageHandler.pageContentEvent(order_total);
                            /* 我的订单点击小三角事件 */
                            arrowClick.getEvent();
                        } else if (data.code == '200') {
                            $('#orderContent').remove();
                            $('.not_information').show().removeClass('hide');
                            $('.not_information_text').html('您的订单空空如也~~');
                        } else {
                            layer.msg(data.msg);
                        }
                    },
                    error: function (data) {
                    }
                });
            }]);
        },
        /*
         *  我的收藏标题切换内容
         */
        initMCollectionEvent: function () {
            HHIT_CENTERAPP.controller('mCollectionCtrl', ['$scope', '$http', function ($scope, $http) {
                /* 点击我的首页中收藏跳到相应的我的收藏页面 */
                var left = 30;
                var hash = location.hash;
                if (hash.indexOf('?') != -1) {
                    var search = hash.substring(hash.indexOf('?') + 1);
                    $(".complete_before").hide();
                    $(".check_list_wrap").hide();
                    $(".collection_shop_wrap").hide();
                    $("#works_complete_wrap >div:eq(" + search.substring(6, 7) + ")").show().removeClass('hide');
                    left = 30 + 214 * search.substring(6, 7);
                }
                /* 让我的收藏保持高亮 */
                var hash = window.location.hash;
                if (hash.indexOf('#/center/mcollection') != -1) {
                    var $a = $('#left_ul a');
                    $a.each(function () {
                        var uiSref = $(this).attr('ui-sref');
                        if (hash.indexOf(uiSref.replace('.', '/')) != -1) {
                            $(this).parent().addClass('left_active').siblings().removeClass('left_active');
                        }
                    });
                }

                /* details */
                var $dtDiv = $("#works_content_title div");
                var iSpeed = 0;
                var oBg = document.getElementById("title_active");
                $(oBg).css('left', left + 'px');
                for (var i = 0; i < $dtDiv.length - 1; i++) {
                    $dtDiv[i].onclick = function () {
                        startMoveHandler.startMoveEvent(oBg, this.offsetLeft, iSpeed, left);
                        $(".complete_before").hide();
                        $(".check_list_wrap").hide();
                        $(".collection_shop_wrap").hide();
                        $(".works_complete_wrap >div:eq(" + ($(this).index()) + ")").show().removeClass('hide');
                        pageHandler.pageContentEvent();
                        billPageHandler.pageContentEvent();
                        shopPageHandler.pageContentEvent();
                    }
                }
                getShopInfoHandler.shopInfo();//获取店铺收藏列表
                getPicInfoHandler.picInfo();//获取全景图列表
                getBillInfoHandler.billInfoEvent();//获取成本计算列表
            }]);
        },

        /* 我的订单点击小三角事件 */
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
        },
        /*
         * 消息中心初始化
         */
        initMsgInfo: function () {
            HHIT_CENTERAPP.controller('msgCtrl', ['$scope', '$http', function ($scope, $http) {
                initInfo.info();
            }]);
        },
        /*
         * 支付成功
         */
        initSuccessPayEvent: function () {
            HHIT_CENTERAPP.controller('pay_endCtrl', ['$scope', '$http', function ($scope, $http) {
                $("#headerWrapper").remove();
                $("#menuNavOuter").remove();
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
                    user_id: USERID
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
                    user_id: USERID,
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
                    user_id: USERID,
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
            /* 账单 */
            $.ajax({
                url: BILLURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    user_id: USERID,
                    page: 1,
                    limit: 2
                },
                success: function (data) {
                    //console.log(data.data);
                    if (data != null && data.code == '000') {
                        $('#bill_total').html(data.data.calculator_count);
                    } else {
                        $('#bill_total').html(0);
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
                    user_id: USERID

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

    /* 获取用户信息 */
    getUserInfoHandler = {
        getInfoEvent: function () {
            var account_name;
            $.ajax({
                url: USERDATAURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    user_id: USERID
                },
                success: function (data) {
                    if (data != null && data.code == '000') {
                        console.log(data.data);
                        if (data.data.isedit == '2') {
                            $(".personal_user_name").attr("disabled", true);
                        }
                        $(".personal_user_name").val(data.data.user_name);//获取用户的用户名
                        var abb_phone = data.data.userinfo_phone.substr(0, 3) + "****" + data.data.userinfo_phone.substr(7, 11);//手机号中间四位变成*号
                        $('.personal_tel').html(abb_phone); //获取用户的电话号码
                        $('.personal_user_age').val(data.data.userinfo_age); //获取用户的年龄
                        $('.personal_user_nickname').val(data.data.userinfo_nickname); //获取用户的昵称
                        if (data.data.userinfo_sex == 1) { //判断用户的性别
                            $('#man').attr('checked', 'checked');
                        } else {
                            $('#women').attr('checked', 'checked');
                        }
                        $(".personal_form_list #province1 option:selected").html(data.data.loc_province).val(data.data.loc_province);
                        $(".personal_form_list #city1 option:selected").html(data.data.loc_city).val(data.data.loc_city);
                        $(".personal_form_list #district1 option:selected").html(data.data.loc_district).val(data.data.loc_district);
                        $(".personal_form_list #province2 option:selected").html(data.data.home_province).val(data.data.home_province);
                        $(".personal_form_list #city2 option:selected").html(data.data.home_city).val(data.data.home_city);
                        $(".personal_form_list #district2 option:selected").html(data.data.home_district).val(data.data.home_district);
                        $(".personal_form_list .personal_area_detail").val(data.data.loc_address);
                        if (data.data.userinfo_email != null && data.data.userinfo_email != '') {
                            $(".personal_form_list p span").html(data.data.userinfo_email);
                        }
                    }
                },
                error: function (data) {
                }
            });
            $(".personal_form .personal_submit").on("click", function () {
                var phone = $('.personal_tel').html();
                var account = $(".personal_user_name").val();
                var age = $('.personal_user_age').val();
                var nickname = $('.personal_user_nickname').val();
                var sex;
                if ($('#man').attr('checked') == 'checked') {
                    sex = 1;
                } else {
                    sex = 0;
                }
                var province1 = $(".personal_form_list #province1 option:selected").val();
                var city1 = $(".personal_form_list #city1 option:selected").val();
                var district1 = $(".personal_form_list #district1 option:selected").val();
                var province2 = $(".personal_form_list #province2 option:selected").val();
                var city2 = $(".personal_form_list #city2 option:selected").val();
                var district2 = $(".personal_form_list #district2 option:selected").val();
                var address = $(".personal_form_list .personal_area_detail").val();
                /* 编辑用户信息 */
                $.ajax({
                    type: "get",
                    url: EDITUSERDATAURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        user_id: USERID,
                        name: account,
                        nickname: nickname,
                        sex: sex,
                        age: age,
                        loc_province: province1,
                        loc_city: city1,
                        loc_district: district1,
                        loc_address: address,
                        home_province: province2,
                        home_city: city2,
                        home_district: district2
                    },
                    beforeSend: function () {
                        $(".personal_form .personal_submit").attr("disabled", true);
                    },
                    success: function (data) {
                        if (data != null || data.code == '000') {
                            layer.msg(data.msg);
                        } else {
                            alert(data.msg)
                        }
                    },
                    complete: function () {
                        $(".personal_form .personal_submit").attr("disabled", false);
                    },
                    error: function (data) {
                    }
                });
            });
        }
    };

    /* 我的收藏成本计算 */
    getBillInfoHandler = {
        billInfoEvent: function () {
            function ajax() {
                $.ajax({
                    url: BILLURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        user_id: USERID,
                        page: 1,
                        limit: 2
                    },
                    success: function (data) {
                        //console.log(data.data);
                        if (data != null && data.code == '000') {
                            bill_total = data.data.calculator_count;
                            var vrStr = "";
                            $.each(data.data.calculator_data, function (i, v) {
                                vrStr += spliceBillHandler.spliceStrEvent(v);
                            });
                            $(".billWrap").html(vrStr);
                            billPageHandler.pageContentEvent();

                            $(document).on("click", ".collection_detail", function (e) {
                                sessionStorage.setItem("payJson", $(e.target).parents('.check_list').attr('data-cal'));
                            });

                        }
                    },
                    error: function (data) {
                    }
                });
            }

            ajax();
            /* 删除我的收藏成本计算 */
            $(document).on('click', '.collection_del', function (e) {
                var calculator_results_id = $(e.target).parents('.check_list').attr('calculator_results_id');
                $.ajax({
                    url: BILLDELURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        user_id: USERID,
                        calculator_results_id: calculator_results_id
                    },
                    success: function (data) {
                        layer.msg(data.msg);
                        ajax();
                        billPageHandler.pageContentEvent();
                    },
                    error: function (data) {
                        layer.msg(data.msg);
                    }
                });
            })
        }
    };

    /* 获得我的订单详情内容 */
    OrderDetail = {
        getDetail: function () {
            var order_id = sessionStorage.getItem("orderid");
            $.ajax({
                type: "get",
                url: ORDERDETAILURL,
                async: true,
                dataType: "jsonp",
                data: {
                    order_id: order_id
                },
                success: function (data) {
                    if (data != null && data.code == '000') {
                        if (data.data.now_order_step != 18) {
                            var stage = '<div class="axis_start">';
                            stage += '<h2>进场准备</h2>';
                            stage += '<h3>READING..</h3>';
                            stage += '</div>';
                            var work = '<div class="work_worker">';
                            $.each(data.data.detail, function (i, v) {
                                stage += spliceStageHandler.spliceStrEvent(v);
                            });
                            if (data.data.now_order_step != 1) {
                                $.each(data.data.worker, function (i, v) {
                                    work += '<div class="worker">';
                                    work += '<img src="http://hyu2387760001.my3w.com/' + v.portrait + '">';
                                    work += '<p><span class="worker_cname">' + v.name + '</span>';
                                    work += '</p></div>';
                                });
                                work += '</div>';
                                $(".axis_content").append(work);
                            }
                            $(".axis_content").append(stage);
                            for (var i = 0; i < $(".work_stage .step .status").length; i++) {
                                if ($(".work_stage .step .status").eq(i).html() == "(undefined)") {
                                    $(".work_stage .step .status").eq(i).empty();
                                }
                            }
                            $(".work_stage").eq(0).addClass("first_stage").find(".stage_title em").remove();
                            $(".work_stage").eq(0).find(".stage_title b").before("<i></i>");
                            $(".complete_stage").prev().children().find(".step").html("工长上传图片");
                            if ($(".work_stage").length == 17) {
                                var end = '<div class="axis_end">';
                                end += '<i></i>';
                                end += '<h2>工期完成</h2>';
                                end += '<h3>FINISH</h3>';
                                end += '</div>';
                                $(".axis_content").append(end);
                            }
                            $("#time_axis").css("height", $(".axis_content").height() + 200);
                            /* 左侧悬浮条 */
                            suspensionMenu.menuTab();
                        } else {
                            layer.alert("还未开工哦，亲~~");
                        }
                    } else {
                        layer.alert(data.msg)
                    }
                },
                error: function (data) {
                }
            });
        }
    };

    /* 获取我的收藏店铺列表 */
    getShopInfoHandler = {
        shopInfo: function () {
            HHIT_CENTERAPP.controller('collectionController', ['$scope', '$http', function ($scope, $http) {
                function ajax() {
                    $.ajax({
                        url: SHOPCURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            user_id: USERID,
                            page: 1,
                            limit: 4
                        },
                        success: function (data) {
                            console.log(data.data);
                            if (data != null && data.code == '000') {
                                shop_total = data.data[0].total;

                                var vrStr = "";
                                $.each(data.data, function (i, v) {
                                    vrStr += spliceShopHandler.spliceStrEvent(v);
                                });

                                $(".shopWrap").html(vrStr);
                                shopPageHandler.pageContentEvent();
                            }
                        },
                        error: function (data) {
                        }
                    });
                }

                ajax();

                /* 删除我的收藏店铺列表 */
                $(document).on('click', '.collection_shop_del', function (e) {
                    var shopId = $(e.target).parents('.collection_shop').attr('shopId');
                    $.ajax({
                        url: DSHOPURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            user_id: USERID,
                            shop_id: shopId
                        },
                        success: function (data) {
                            console.log(shopId);
                            layer.msg(data.msg);
                            ajax();
                            shopPageHandler.pageContentEvent();
                        },
                        error: function (data) {
                            layer.msg(data.msg);
                        }
                    });
                })

            }]);
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
                            user_id: USERID,
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
                    var $panorama_id = $(this).parent().attr('panorama_id');
                    $.ajax({
                        url: DPICURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            user_id: USERID,
                            panorama_id: $panorama_id
                        },
                        success: function (data) {
                            if (data && data.code == '000') {
                                layer.msg(data.msg);
                                http();
                                pageHandler.pageContentEvent();
                            }
                        },
                        error: function (data) {
                            layer.msg(data.msg);
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

    /* 消息中心判断已读还是未读*/
    judgeNews = {
        isnews: function () {
            $(".main_content").each(function () {
                if ($(this).attr("data-isread") == "0") { //未读消息
                    $(this).addClass("isnews");
                }
            });
        }
    };

    /* 消息中心消息的点击 */
    readNews = {
        tobeRead: function () {
            $(".main_content .content").on("click", function () {
                var tit = $(this).html();
                var cnt = $(this).siblings(".cnt").html();
                $(".detail_cnt").dialog({
                    title: tit,					// title
                    dragable: true,
                    html: '', 						// html template
                    width: 400,					// width
                    height: 200,				// height
                    cannelText: '取消',		// cannel text
                    confirmText: '确认',	// confirm text
                    showFooter: true,
                    onClose: function () {	// colse callback

                    },
                    onOpen: false,				// open callback
                    onConfirm: function () { //  confirm callback required

                        $(".detail_cnt").dialog().close();
                    },
                    onCannel: function () {  	// Cannel callback
                        //$(".detail_cnt").find('.body-content').html("");
                    },
                    getContent: function () { 	// get Content callback
                        $(".detail_cnt").find('.body-content').html(cnt);
                    }
                }).open();
                $(".detail_cnt").find('.body-content').html(cnt);
                if ($(this).parent().attr("data-isread") == "0") { //未读消息
                    var id = $(this).parent().attr("data-id");
                    var $now = $(this).parent();
                    //$(this).parent().removeClass("isnews");
                    var num = $(".left_ul li i").html();
                    if (num != 0) {
                        num--;
                        $(".left_ul li i").html(num);
                    } else {
                        $(".left_ul li i").remove();
                    }
                    $.ajax({
                        type: "get",
                        url: HAVEREADURL,
                        async: true,
                        dataType: "jsonp",
                        data: {
                            msgid: id
                        },
                        success: function (data) {
                            $now.attr("data-isread", "1").removeClass("isnews");
                        },
                        error: function (data) {
                        }
                    });
                }
            });
        }
    };

    /* 消息中心初始化 */
    initInfo = {
        info: function () {
            $.ajax({
                type: "get",
                url: READURL,
                async: true,
                dataType: "jsonp",
                data: {
                    user_id: USERID,
                    page: 1,
                    limit: 4
                },
                success: function (data) {
                    if (data != null && data.code == '000') {
                        $(".main_contentWrap").empty();
                        TOTAL = data.data[0].total; // 总数
                        $.each(data.data, function (i, v) {
                            var tipStr = spliceContentHandler.spliceStrEvent(v);
                            $(".main_contentWrap").append(tipStr);
                        });
                        judgeNews.isnews();             //已读消息和未读消息的区分
                        readNews.tobeRead();            //查看消息
                        pageHandler.pageContentEvent(); //分页
                        deleteRecord.singleSelection(); //单项删除
                        markRead.checkAll();       //全选标记
                    } else if (data.code == '117') {//信息找不到
                        $('#contentWrap').remove();
                        $('.not_information').show().removeClass('hide');
                        $('.not_information_text').html('您的消息空空如也~~');
                    } else {
                        layer.msg(data.msg);
                    }
                },
                error: function (data) {
                }
            });
        }
    };

    /**
     * 消息中心拼接内容
     * @param {Object} value ajax得到的数据对象
     */
    spliceContentHandler = {
        spliceStrEvent: function (value) {
            var vrStr = '<div class="main_content" data-isread="' + value.isread + '" data-id="' + value.id + '">';
            vrStr += '<span class="name">' + value.senduser + '</span>';
            vrStr += '<span class="content">' + value.msgtitle + '</span>';
            vrStr += '<span class="time">' + value.sendtime + '</span>';
            vrStr += '<span class="cnt">' + value.msgcontent + '</span>';
            vrStr += '<a class="delete" href="javascript:;"><img src="css/img/delete.png"></a>';
            vrStr += '</div>';
            return vrStr;
        }
    };

    /**
     * 消息中心分页
     */
    infopageHandler = {
        pageContentEvent: function () {
            MAXROWS = Math.ceil(TOTAL / 4); // 页数
            console.log(TOTAL);
            $(".page_div2").empty().paging({
                total: MAXROWS, //全部页数
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
                url: READURL, //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
                ajaxData: {
                    user_id: USERID,
                    page: 1,
                    limit: 4
                },   //ajax方式传值时的附加传值,要传的参数放在这里面,页面参数只要指定idParamemeter就好，会自动添加
                dataOperate: function oprate(data) {
                    $(".main_contentWrap").empty();
                    $.each(data.data, function (i, v) {
                        var tipStr = spliceContentHandler.spliceStrEvent(v);
                        $(".main_contentWrap").append(tipStr);
                    });
                    judgeNews.isnews();
                    readNews.tobeRead();
                    deleteRecord.singleSelection();
                    markRead.checkAll();
                } //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
            });
        }
    };
    /**
     * 消息中心删除记录
     */
    deleteRecord = {
        singleSelection: function () {
            $(".main_contentWrap .delete").on("click", function () {
                var id = $(this).parent().attr("data-id");
                $.ajax({
                    type: "get",
                    url: DELETEURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        id: id
                    },
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            //centerWrap.initMsgInfo(); //删除记录后刷新数据
                            initInfo.info();//删除记录后刷新数据
                            layer.msg(data.msg);
                        } else {
                            layer.alert(data.msg)
                        }
                    },
                    error: function (data) {

                    }
                });
            })
        }
    };
    /**
     * 消息中心全选标记已读
     */
    markRead = {
        checkAll: function () {
            $(".information_choose a").on("click", function () {
                if ($(".information_choose input").is(":checked")) {
                    $.ajax({
                        type: "get",
                        url: ALLREADURL,
                        async: true,
                        dataType: "jsonp",
                        data: {
                            user_id: USERID
                        },
                        success: function (data) {
                            if (data != null && data.code == '000') {
                                $(".main_content").attr("data-isread", "1").removeClass("isnews");
                                $(".left_ul li i").remove();
                            } else {
                                layer.alert(data.msg)
                            }
                        },
                        error: function (data) {
                        }
                    });
                } else {
                    layer.alert("请先选中全选按钮");
                }
            });
        }
    };
    /**
     * 消息中心提示框函数
     * @param {Object} msg 提示语
     */
    errorMsgHendler = {
        remindBox: function (msg) {
            var $reminderBox = $("#ReminderBox");
            var $rb = $(".remindebox");
            $reminderBox.removeClass("display");
            $(".info_header span").text(msg);
            $rb.stop().animate({
                "margin-top": "-150px",
                opacity: 1,
            }, 500);
            $(".remindemodel_ok").on("click", function () { // 点击'好的'关闭提示弹出框
                $rb.stop().animate({
                    "margin-top": "-40px",
                    opacity: 0
                }, 500, function () {
                    $reminderBox.addClass("display");
                });
            });
        }
    };

    /* 时间轴订单左侧的悬浮条 */
    suspensionMenu = {
        menuTab: function () {
            $(".work_stage").eq(0).addClass("first_stage bar");
            $(".work_stage").eq(1).addClass("sdg_stage bar");
            $(".work_stage").eq(5).addClass("wg_stage bar");
            $(".work_stage").eq(9).addClass("mg_stage bar");
            $(".work_stage").eq(13).addClass("yqg_stage bar");
            $(".work_stage").eq(17).addClass("end_stage bar");
            var li = '';
            if ($(".work_stage").hasClass("first_stage")) {
                li += '<li class="current">';
                li += '<a href="javascript:void(0)" tab="&first_stage">进场准备</a>';
                li += '</li>';
            }
            if ($(".work_stage").hasClass("sdg_stage")) {
                li += '<li>';
                li += '<a href="javascript:void(0)" tab="&sdg_stage">水电工阶段</a>';
                li += '</li>';
            }
            if ($(".work_stage").hasClass("wg_stage")) {
                li += '<li>';
                li += '<a href="javascript:void(0)" tab="&wg_stage">瓦工阶段</a>';
                li += '</li>';
            }
            if ($(".work_stage").hasClass("mg_stage")) {
                li += '<li>';
                li += '<a href="javascript:void(0)" tab="&mg_stage">木工阶段</a>';
                li += '</li>';
            }
            if ($(".work_stage").hasClass("yqg_stage")) {
                li += '<li>';
                li += '<a href="javascript:void(0)" tab="&yqg_stage">油漆工阶段</a>';
                li += '</li>';
            }
            if ($(".work_stage").hasClass("end_stage")) {
                li += '<li>';
                li += '<a href="javascript:void(0)" tab="&end_stage">工期完成</a>';
                li += '</li>';
            }
            $("#suspension_menu ul").append(li);
            if ($("#suspension_menu ul li").length >= 3) {
                var top = '';
                top += '<li>';
                top += '<a href="javascript:void(0)" tab="&to_head">回到顶部</a>';
                top += '</li>';
                $("#suspension_menu ul").append(top);
            }
            var _head = $(".commonhead");
            $(_head).addClass("to_head bar");
            var items = $(".bar");
            var _tabs = $("#suspension_menu li ");
            $(_tabs).on('click', function (e) {
                e.stopPropagation();
                var x = $(this).index();
                var divTop;
                if (x == _tabs.length - 1) {
                    divTop = items.eq(0).offset().top;
                }
                else {
                    divTop = items.eq(x + 1).offset().top;
                }
                $("html,body").stop().animate({
                    scrollTop: divTop
                }, 10);
            });
            $(window).scroll(function () {
                var scrollTop = $(document).scrollTop();
                var oTabUl = $('#suspension_menu');
                var curId = '';
                if (scrollTop > 550) {
                    $(oTabUl).css('display', 'block');
                } else {
                    $(oTabUl).css('display', 'none');
                }

                items.each(function () {
                    var m = $(this); //定义变量，获取当前类
                    var itemsTop = m.offset().top; //定义变量，获取当前类的top偏移量
                    if (scrollTop > itemsTop - 100) {
                        curId = "&" + m.attr("class").split(" ")[1];
                    } else {
                        return false;
                    }
                });

                //给相应的楼层设置cur,取消其他楼层的cur
                var curLink = oTabUl.find(".current");
                if (curId && curLink.find('a').attr("tab") != curId) {
                    oTabUl.find("[tab= '" + curId + "']").parent().addClass("current");
                    curLink.removeClass("current");
                }
            });
        }
    };
    /**
     * 我的订单详情拼接内容
     */
    spliceStageHandler = {
        spliceStrEvent: function (value) {
            if (value.material_pay_status == 1) {
                value.material_pay_status = "未配送";
            } else if (value.material_pay_status == 2) {
                value.material_pay_status = "配送中";
            } else if (value.material_pay_status == 3) {
                value.material_pay_status = "配送完成";
            }
            var vrStr = '<div class="work_stage">';
            vrStr += '<div class="stage_title">';
            vrStr += '<span class="date">' + value.img_time + '</span>';
            vrStr += '<em></em>';
            vrStr += '<b></b>';
            vrStr += '<span class="step">' + value.order_step + '<span class="status">(' + value.material_pay_status + ')</span></span>';
            vrStr += '</div>';
            vrStr += '<div class="stage_content">';
            vrStr += '<div class="stage_pic clearfix">';
            $.each(value.img, function (m, n) {
                vrStr += '<div class="pic">';
                vrStr += '<img src="http://hyu2387760001.my3w.com/' + n.img_url + '">';
                vrStr += '</div>';
            });
            vrStr += '</div>';
            vrStr += '<p>' + value.img_content + '</p>';
            vrStr += '</div></div>';
            if (value.order_step.indexOf("完成") > 0) {
                vrStr += '<div class="work_stage complete_stage">';
                vrStr += '<div class="stage_title">';
                vrStr += '<i></i>';
                vrStr += '<b></b>';
                vrStr += '<span class="step">' + value.order_step + '</span>';
                vrStr += '<a href="javascript:;" target="_blank" class="balance">结算清单</a>';
                vrStr += '</div>';
                vrStr += '<div class="stage_content">';
                vrStr += '</div></div>';
            }
            return vrStr;
        }
    };

    /**
     * 我的订单列表拼接内容
     */
    spliceOrderHandler = {
        spliceOrderList: function (value) {
            var vrStr = '<div class="order_box">';
            vrStr += '<div class="ordercnt_title clearfix">';
            vrStr += '<span class="type">' + value.room + '室 ' + value.parlour + '厅' + value.toilet + '卫' + value.balcony + '阳台</span>';
            vrStr += '<span class="time">' + value.order_time + '</span><span>订单号</span>';
            vrStr += '<span class="order_num">' + value.order_id + '</span><span class="name">' + value.shop_name + '</span>';
            vrStr += '</div><div class="ordercnt_content">';
            vrStr += '<div class="block clearfix"><div class="address">';
            vrStr += '<p>' + value.order_address + '</p></div>';
            vrStr += '<div class="area"><p class="item_hover_0"><span>' + value.area + '</span>㎡</p></div>';
            vrStr += '<div class="now_stage"><p>' + value.order_step_ch + '</p></div>';
            vrStr += '<div class="money"><p>' + value.actual_finish_amount + '</p></div>';
            vrStr += '<div class="trade_stage"><p>' + value.order_status_ch + '</p></div>';
            // 未开工之前跳转到预约单页面
            if(value.order_step == 18 &&(value.order_status == 1 ||value.order_status == 2||value.order_status == 3||value.order_status == 4)){
            	console.log(value)
            	var oInfoObj = {};
				oInfoObj.shop_id = value.shop_id;
				oInfoObj.user_id = value.user_id;
				oInfoObj.order_id = value.order_id;
				$.cookie("dd", JSON.stringify(oInfoObj), {expires: 1, path: '/'});
            	vrStr += '<div class="all" data-shopid="'+value.shop_id+'" data-orderid="'+value.order_id+'"><a href="reservation.html#/waitcontact?type=1" target="_blank" class="top">查看详情</a>';
            }else{
            	vrStr += '<div class="all" data-shopid="'+value.shop_id+'" data-orderid="'+value.order_id+'"><a href="order_detail.html#/morder_wrap/morder_detail" target="_blank" class="top">查看详情</a>';	
            }
            if(value.order_status == 6) {
                vrStr += '<a href="javascript:;" class="bottom">确认验货</a>';
            }
//          if(value.order_status == 4) {
//              vrStr += '<a href="success_pay.html#/success_pay/pay_end" class="bottom">支付</a>';
//          }
//          if(value.order_status == 5 && (value.order_step == 3 || value.order_step == 5 || value.order_step == 7 || value.order_step == 9 || value.order_step == 11 || value.order_step == 13 || value.order_step == 15 || value.order_step == 17)) {
//              vrStr += '<a href="success_pay.html#/success_pay/pay_end" class="bottom">支付</a>';
//          }
			// 订单进行中
            if(value.order_status == 5){
            	// 辅材类
            	if(value.order_step == 3 || value.order_step == 7 || value.order_step == 11 || value.order_step == 15){
            		vrStr += '<a href="reservation.html#/materiallist?pos='+value.order_id+'" class="bottom">辅材支付</a>';
            	}
            	// 人工费
            	if(value.order_step == 5 || value.order_step == 9 || value.order_step == 13 || value.order_step == 17){
            		vrStr += '<a href="reservation.html#/advancelist?pos='+value.order_id+'" class="bottom">人工支付</a>';
            	}
            }
            vrStr += '</div></div>';
            vrStr += '</div></div>';
            return vrStr;
        }
    };
    /**
     * 我的订单分页
     */
    OrderPageHandler = {
        pageContentEvent: function (order_total) {
            $(".page_div2").empty().paging({
                total: Math.ceil(order_total / 2), //全部页数
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
                url: USERORDERURL, //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
                ajaxData: {
                    user_id: USERID,
                    page: 1,
                    limit: 2
                },   //ajax方式传值时的附加传值,要传的参数放在这里面,页面参数只要指定idParamemeter就好，会自动添加
                dataOperate: function oprate(data) {
                    $(".order_content .page_number").prevAll().remove();
                    var order = '';
                    $.each(data.data.order_list, function (i, v) {
                        order += spliceOrderHandler.spliceOrderList(v);
                    });
                    $(".order_content .page_number").before(order);
                    $(".order_box").each(function () {
                        if ($(this).find(".all a").length == 1) {
                            $(this).find(".all .top").addClass("one");
                        }
                    });
                    $(".ordercnt_content .all").on("click", function () {
                        var shopid = $(this).attr("data-shopid");
                        var orderid = $(this).attr("data-orderid");
                        sessionStorage.setItem("shopid", shopid);
                        sessionStorage.setItem("orderid", orderid);
                    });
                    /* 我的订单点击小三角事件 */
                    arrowClick.getEvent();
                } //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
            });
        }
    };
    /*
     * 我的订单点击小三角事件
     */
    arrowClick = {
        getEvent: function () {
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
        }
    };


    /**
     * 我的收藏全景图分页
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
                url: PANORAMAURL, //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
                ajaxData: {
                    user_id: USERID,
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
     * 我的收藏全景图拼接内容
     */
    splicePicHandler = {
        spliceStrEvent: function (value) {
            var vrStr = '<div class="works_detail works_detail_first fl complete_img" panorama_id="' + value.panorama_id + '">';
            vrStr += '	<a class="complete_del" href="javascript:;">';
            vrStr += '		<img src="css/img/my_work_del.png">';
            vrStr += '		</a>';
            vrStr += '		<div class="detail_img">';
            vrStr += '	<img src="http://hyu2387760001.my3w.com/' + value.panorama_img + '">';
            vrStr += '	</div><!--detail_img-->';
            vrStr += '		<a href="' + value.panorama_url + '" class="complete_bg"></a><!--complete_bg-->';
            vrStr += '			<span>' + value.panorama_style + '</span>';
            vrStr += '			<a href="' + value.panorama_url + '" class="bg"></a>';
            vrStr += '			</div><!--works_detail-->';
            return vrStr;
        }
    };

    /**
     * 我的收藏结算清单分页
     */
    billPageHandler = {
        pageContentEvent: function () {
            $(".page_div").empty().paging({
                total: Math.ceil(bill_total / 2), //全部页数
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
                url: BILLURL, //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
                ajaxData: {
                    user_id: USERID,
                    page: 1,
                    limit: 2
                },   //ajax方式传值时的附加传值,要传的参数放在这里面,页面参数只要指定idParamemeter就好，会自动添加
                dataOperate: function oprate(data) {
                    var vrStr = '';
                    $.each(data.data.calculator_data, function (i, v) {
                        vrStr += spliceBillHandler.spliceStrEvent(v);
                    });
                    $(".billWrap").html(vrStr);
                } //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
            });
        }
    };

    /**
     * 我的收藏结算清单拼接内容
     */
    spliceBillHandler = {
        spliceStrEvent: function (value) {
            newValue = JSON.stringify(value);
            var vrStr = '<div class="check_list" data-cal=\'' + newValue + '\' calculator_results_id ="' + value.calculator_results_id + '">';
            vrStr += '	<div class="check_list_title">';
            vrStr += '		<span class="covered_area">建筑面积</span>';
            vrStr += '		<span class="room_number">厅数</span>';
            vrStr += '	<span class="room">房间</span>';
            vrStr += '	<span class="toilet">卫生间</span>';
            vrStr += '		<span class="balcony">阳台</span>';
            vrStr += '			<span class="clearing_time">结算时间</span>';
            vrStr += '			<a class="collection_del" href="javascript:;">';
            vrStr += '			<img src="css/img/my_work_del.png">';
            vrStr += '			</a>';
            vrStr += '			</div><!--check_list_title-->';
            vrStr += '			<div class="check_list_content">';
            vrStr += '			<span class="covered_area"><i>' + value.area + '</i>m<sup>2</sup></span>';
            vrStr += '			<span class="room_number">' + value.parlour + '</span>';
            vrStr += '			<span class="room">' + value.room + '</span>';
            vrStr += '			<span class="toilet">' + value.toilet + '</span>';
            vrStr += '			<span class="balcony">' + value.balcony + '</span>';
            vrStr += '			<span class="clearing_time">' + value.calculator_results_time + '</span>';
            vrStr += '			<a class="collection_detail" target="_blank" href="calresult.html#/calresult' + "?cs=" + value.city + "&mj=" + value.area + "&fj=" + value.room + "&kt=" + value.parlour + "&wsj=" + value.toilet + "&yt=" + value.balcony + '">查看详情</a>';
            vrStr += '			</div><!--check_list_content-->';
            vrStr += '			</div><!--check_list-->';
            return vrStr;
        }
    };

    /**
     * 我的收藏店铺分页
     */
    shopPageHandler = {
        pageContentEvent: function () {
            $(".page_div1").empty().paging({
                total: Math.ceil(shop_total / 4), //全部页数
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
                url: SHOPCURL, //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
                ajaxData: {
                    user_id: USERID,
                    page: 1,
                    limit: 4
                },   //ajax方式传值时的附加传值,要传的参数放在这里面,页面参数只要指定idParamemeter就好，会自动添加
                dataOperate: function oprate(data) {
                    var vrStr = '';
                    $.each(data.data, function (i, v) {
                        vrStr += spliceShopHandler.spliceStrEvent(v);
                    });
                    $(".shopWrap").html(vrStr);
                } //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
            });
        }
    };

    /**
     * 我的收藏店铺拼接内容
     */
    spliceShopHandler = {
        spliceStrEvent: function (value) {
            var vrStr = '<div class="collection_shop clearfix" shopId="' + value.shop_id + '">';
            vrStr += '	<div class="left_img fl">';
            vrStr += '	<img src="http://hyu2387760001.my3w.com/' + value.img + '">';
            vrStr += '		</div><!--left_img-->';
            vrStr += '		<div class="left_detail fl">';
            vrStr += '	<p class="manager_shop">' + value.shop_name + '<i class="iconfont first_i">';
            $.each(value.authentication, function (s, r) {
                vrStr += '<img src="http://hyu2387760001.my3w.com/' + r + '">';
            });
            vrStr += '	</i></p>';
            vrStr += '	<p>常驻地址：<span>' + value.shop_address + '</span></p>';
            vrStr += '<p>服务范围：';
            $.each(value.servicearea, function (m, n) {
                vrStr += '<span>' + n + '</span>;';
            });
            vrStr += '</p>';
            vrStr += '			<a class="eyes" href="javascript:;">';
            vrStr += '			<i class="iconfont">&#xe69c;</i><span>' + value.shop_scan + '</span>';
            vrStr += '			</a>';
            vrStr += '			<a class="shake_hands" href="javascript:;">';
            vrStr += '			<i class="iconfont">&#xe626;</i><span>' + value.shop_volume + '</span>';
            vrStr += '			</a>';
            vrStr += '			</p>';
            vrStr += '			</div><!--left_detail-->';
            vrStr += '			<div class="collection_shop_right fr">';
            vrStr += '			<div class="shop_quality_wrap fl">';
            vrStr += '			<p class="shop_quality">工程质量<span>' + value.shop_score.projectquality + '</span>分</p>';
            vrStr += '			<p>服务态度<span>' + value.shop_score.serviceattitude + '</span>分</p>';
            vrStr += '			<p>综合评价<span>' + value.shop_score.overallmerit + '</span>分</p>';
            vrStr += '			</div><!--shop_quality_wrap-->';
            vrStr += '			<a class="collection_shop_del fl" href="javascript:;">';
            vrStr += '			<img src="css/img/collection_shop_del.png">';
            vrStr += '			</a>';
            vrStr += '			</div><!--collection_shop_right-->';
            vrStr += '			</div><!--collection_shop-->';
            return vrStr;

        }
    };
    //入口方法调用 代码只能从这里执行
    centerWrap.init();
})();