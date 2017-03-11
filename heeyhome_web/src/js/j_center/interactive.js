/**
 * 闭包
 * tangj
 */
(function () {

    /**
     * 需要require的公共方法或组件
     */
    var HHIT_CENTERAPP = angular.module('heeyhomeApp');

    var BASEURL = '/api/public/';

    var USERDATAURL = BASEURL + 'personal/userinfo'; // 用户个人资料
    var EDITUSERDATAURL = BASEURL + 'personal/userinfo/change'; // 编辑用户个人资料
    var USERIMGURL = BASEURL + 'personal/portrait'; // 用户头像
    var UPUSERIMGURL = BASEURL + 'personal/portrait/change'; // 上传用户头像
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
    var SHOPIMGURL = BASEURL + 'personal/myshop/imgs';//店铺图片
    var SELSTATUSURL = BASEURL + 'order/client/selstatus';//查询订单状态及步骤
    var CALRESULTURL = BASEURL + 'costcalculator/result/get'; // 获取收藏的成本计算器结果接口
    var CANCELORDERURL = BASEURL + 'order/client/destory';//用户取消订单
    var HOUSESTYLEURL = BASEURL + 'order/style/addhousestyle'; //订单装修风格
    var BASICINFOURL = BASEURL + '/order/shop/orderbasicinfo';// 获取业主信息接口
    var ORDEREVALURL = BASEURL + '/order/order/evaluation';// 用户订单评价

    var email;//获取用户邮箱
    var pic_total;//获取我的收藏全景图总数据
    var bill_total;//获取我的收藏成本计算总数据
    var shop_total;//获取我的收藏店铺总数据
    var newValue;
    var TOTAL; // 信息中心后台数据总数
    var MAXROWS; //信息中心总页数
    var load = '<div class="loading"><img src="image/icon-loading.gif"></div>';


    var USERID = $.cookie("userId"); // 得到userid
    if (USERID != null && USERID != "" && USERID != undefined) {
        USERID = $.base64.decode($.cookie("userId"));
    } else {
        USERID = "";
    }
    // 店铺认证提示文字
    var certification = {
        '1': "平台实名认证",
        '2': "保证金",
        '3': "团队保险",
        '4': "两年质保维修"
    };
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
            self.initMsgInfo();
            self.initMOrderDataEvent();
            self.initMOrderDetailEvent();
//          self.initSuccessPayEvent();
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
                $.ajaxSetup({//给所有的Ajax加加载层
                    beforeSend: function () {
                        $(".right_content_wrap").append(load);
                        $(".order_content .right_content").append(load);
                        $(".safe_right_content").append(load);
                        // $("#safe").append(load);
                        // $("#safe .loading").css('top', '80%');
                    },
                    complete: function () {
                        $(".right_content_wrap .loading").remove(); //关闭加载层
                        $(".order_content .right_content .loading").remove(); //关闭加载层
                        $(".safe_right_content .loading").remove(); //关闭加载层
                        // $("#safe .loading").remove(); //关闭加载层
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
                $(".Jcenter").html("我的主页");
                $('.left_ul li').eq(0).addClass('left_active').siblings().removeClass('left_active');
                getHomeInfoHandler.getInfoEvent();//获取用户信息
                getHomeInfoHandler.getImgEvent();//获取用户头像
                getHomeInfoHandler.getOrderEvent();//获取用户我的订单信息
                getHomeInfoHandler.getCollectEvent();//获取用户我的收藏信息
                getHomeInfoHandler.getSafeEvent();//获取用户的安全等级
                getUserAvatarHandler.getInfoEvent();//上传头像
            }]);
        },
        /*
         *  个人资料标题切换内容
         */
        initMDataEvent: function () {
            HHIT_CENTERAPP.controller('mDataCtrl', ['$scope', '$http', function ($scope, $http) {
                $(".Jcenter").html("个人资料");
                $('.left_ul li').eq(1).addClass('left_active').siblings().removeClass('left_active');
                // 加载城市插件
                $('[data-toggle="distpicker"]').distpicker();
                getUserInfoHandler.getInfoEvent();
            }]);
        },

        /*
         * 获得我的订单内容
         */
        initMOrderDataEvent: function () {
            HHIT_CENTERAPP.controller('mMorderCtrl', ['$scope', '$http', function ($scope, $http) {
                $(".Jcenter").html("我的订单");
                $('.left_ul li').eq(2).addClass('left_active').siblings().removeClass('left_active');

                $.ajax({
                    type: "get",
                    url: USERORDERURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        user_id: USERID,
                        page: 1,
                        limit: 3
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
                            OrderPageHandler.pageContentEvent(order_total);
                        } else if (data.code == '205') {
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


                /* 点击查看详情 */
                $(document).off("click", ".ordercnt_content .all .top").on("click", ".ordercnt_content .all .top", function () {
                    var shopid = $(this).parent().attr("data-shopid");
                    var orderid = $(this).parent().attr("data-orderid");
                    sessionStorage.setItem("shopid", shopid);
                    sessionStorage.setItem("orderid", orderid);
                });
                $(document).off("click", ".ordercnt_content .all .look_new").on("click", ".ordercnt_content .all .look_new", function () {
                    var shopid = $(this).parent().attr("data-shopid");
                    var orderid = $(this).parent().attr("data-orderid");
                    var userid = $(this).parent().attr("data-sss");//userid
                    var oInfoObj = {};
                    oInfoObj.shop_id = shopid;
                    oInfoObj.user_id = userid;
                    oInfoObj.order_id = orderid;
                    $.cookie("dd", JSON.stringify(oInfoObj), {expires: 1, path: '/'});
                    window.open('reservation.html#/waitcontact?type=1');
                });
                $(document).off("click", ".ordercnt_content .all .bottom").on("click", ".ordercnt_content .all .bottom", function () {
                    var shopid = $(this).parent().attr("data-shopid");
                    var orderid = $(this).parent().attr("data-orderid");
                    var orderstep = $(this).parent().attr("data-orderstep");
                    sessionStorage.setItem("shopid", shopid);
                    sessionStorage.setItem("orderid", orderid);
                    sessionStorage.setItem("orderstep", orderstep);
                    if ($(this).html() == "取消订单") {
                        $.ajax({
                            type: "get",
                            url: CANCELORDERURL,
                            async: true,
                            dataType: "jsonp",
                            data: {
                                user_id: USERID,
                                order_id: orderid
                            },
                            success: function (data) {
                                if (data && data.code == '000') {
                                    layer.alert(data.msg);
                                    location.reload(true);
                                } else {
                                    layer.alert(data.msg);
                                }
                            },
                            error: function (data) {
                            }
                        });
                    } else if ($(this).html() == "确认验货") {
                        var order_id = sessionStorage.getItem('orderid');
                        var gradeArray = ['2分 失望', '4分 不满', '6分 一般', '8分 满意', '10分 惊喜'];
                        var $engineering_quality = $('<p class="engineering_quality">工程质量：</p>');
                        var $service_attitude = $('<p class="service_attitude">服务态度：</p>');
                        var $overview = $('<p class="overview">综合评价：</p>');
                        var ihtml = '<i class="iconfont">&#xe64e;</i>';
                        var span = '<span class="describe" style="display: none"></span>';
                        var evaButton = '<input class="evaButton" type="button" value="提交评价">';
                        $.each(gradeArray, function (i, val) {
                            $engineering_quality.append(ihtml);
                            $service_attitude.append(ihtml);
                            $overview.append(ihtml);
                        });
                        $engineering_quality.append(span);
                        $service_attitude.append(span);
                        $overview.append(span);
                        var content = $engineering_quality[0].outerHTML + $service_attitude[0].outerHTML + $overview[0].outerHTML + evaButton;
                        layer.open({
                            type: 1,
                            skin: 'layui-layer-rim', //加上边框
                            area: ['420px', '270px'], //宽高
                            content: content
                        });
                        $(document).off('click', '.evaButton').on('click', '.evaButton', function () {
                            var projectquality = $('.engineering_quality .activei').length * 2;
                            var serviceattitude = $('.service_attitude .activei').length * 2;
                            var overallmerit = $('.overview .activei').length * 2;

                            $.ajax({
                                type: "get",
                                url: ORDEREVALURL,
                                async: true,
                                dataType: "jsonp",
                                data: {
                                    order_id: order_id,
                                    projectquality: projectquality,
                                    serviceattitude: serviceattitude,
                                    overallmerit: overallmerit
                                },
                                success: function (data) {
                                    if (data && data.code == '000') {
                                        $('.layui-layer-shade').remove();
                                        $('.layui-layer').remove();
                                        $('.confirm_inspection').parent('.all').find('.top').addClass('one');
                                        $('.all .confirm_inspection').remove();
                                    } else {
                                        layer.msg(data.msg);
                                    }
                                },
                                error: function (data) {
                                }
                            });
                        });
                        function eval(div) {
                            $(document).on('click', div, function () {
                                $(div).removeClass('activei');
                                var $t = $(this);
                                var index = $t.index();
                                $t.parent().find('.describe').data('grade', index);
                                for (var i = 0; i < index + 1; i++) {
                                    $(div).eq(i).addClass('activei');
                                }
                            })
                        }

                        function hover(div) {
                            $(div).hover(function () {
                                var $t = $(this);
                                var index = $t.index();
                                $(div).removeClass('activei');
                                for (var i = 0; i < index + 1; i++) {
                                    $(div).eq(i).addClass('activei');
                                }
                                $t.parent().find('.describe').show().html(gradeArray[index]);
                            }, function () {
                                $(div).removeClass('activei');
                                var describe = $(this).parent().find('.describe');
                                var grade = describe.data('grade');
                                if (grade == undefined) {
                                    describe.hide();
                                } else {
                                    for (var i = 0; i < grade + 1; i++) {
                                        $(div).eq(i).addClass('activei');
                                    }
                                    describe.show().html(gradeArray[grade]);
                                }
                            });
                        }

                        eval('.engineering_quality i');
                        eval('.service_attitude i');
                        eval('.overview i');

                        hover('.engineering_quality i');
                        hover('.service_attitude i');
                        hover('.overview i');
                    }
                });
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
                    url: BASICINFOURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        shop_id: shop_id,
                        order_id: order_id
                    },
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            console.log(data.data);

                            $(".owner_picture img").attr("src", data.data.order_list[0].user_portrait);
                            $(".owner_summary h3").html(data.data.order_list[0].user_realname);
                            $(".owner_summary p span").html(data.data.order_list[0].user_phone);
                            $(".owner_left .area p span").html(data.data.order_list[0].area);
                            $(".owner_left .order p").html(order_id);
                            $(".owner_middle .type p").html(data.data.order_list[0].room + "室" + data.data.order_list[0].parlour + "厅" + data.data.order_list[0].toilet + "卫" + data.data.order_list[0].balcony + "阳台");
                            $(".owner_middle .time p").html(data.data.order_list[0].order_time);
                            $(".owner_right .address p").html(data.data.order_list[0].order_address);

                        } else {
                            layer.alert(data.msg);
                        }
                    },
                    error: function (data) {

                    }
                });
                /* 获取装修风格 */
                $.ajax({
                    url: HOUSESTYLEURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        order_id: order_id
                    },
                    success: function (data) {
                        if (data && data.code == '000') {
                            console.log(data.data);
                            if (data.data['装修风格'] != null) {
                                $('.housetype p').html(data.data['装修风格']);
                            } else {
                                $('.housetype p').html('无');
                            }
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
         *  我的收藏标题切换内容
         */
        initMCollectionEvent: function () {
            HHIT_CENTERAPP.controller('mCollectionCtrl', ['$scope', '$http', function ($scope, $http) {
                $(".Jcenter").html("我的收藏");
                $('.left_ul li').eq(3).addClass('left_active').siblings().removeClass('left_active');
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
                        if ($(this).index() == 0) {
                            getPicInfoHandler.picInfo();//获取全景图列表
                        } else if ($(this).index() == 1) {
                            getBillInfoHandler.billInfoEvent();//获取成本计算列表
                        } else if ($(this).index() == 2) {
                            getShopInfoHandler.shopInfo();//获取店铺收藏列表
                        }
                    }
                }
                getPicInfoHandler.picInfo();//获取全景图列表
                getBillInfoHandler.billInfoEvent();//获取成本计算列表
                getShopInfoHandler.shopInfo();//获取店铺收藏列表
            }]);
        },

        /*
         * 消息中心初始化
         */
        initMsgInfo: function () {
            HHIT_CENTERAPP.controller('msgCtrl', ['$scope', '$http', function ($scope, $http) {
                $(".Jcenter").html("消息中心");
                $('.left_ul li').eq(4).addClass('left_active').siblings().removeClass('left_active');
                initInfo.info();
            }]);
        }
//      /*
//       * 支付成功
//       */
//      initSuccessPayEvent: function () {
//          HHIT_CENTERAPP.controller('pay_endCtrl', ['$scope', '$http', function ($scope, $http) {
//              $("#headerWrapper").remove();
//              $("#menuNavOuter").remove();
//          }]);
//      }

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
                        $(".left_img").html('<img src="' + data.data.user_img + '"><a class="edit_avatar" href="javascript:;">修改头像<input type="file" name="" id="renderings_file"></a> ');
                    }
                },
                error: function (data) {
                }
            });
        },
        /* 获取用户我的订单信息 */
        getOrderEvent: function () {
            $.ajax({
                type: "get",
                url: USERORDERURL,
                async: true,
                dataType: "jsonp",
                data: {
                    user_id: USERID
                },
                beforeSend: function () {
                    $(".my_order_content").addClass("loagbg");
                    $(".order_content_title ").addClass("display");
                    $(".order_content_cnt ").addClass("display");
                },
                success: function (data) {
                    //data.code = 117;
                    console.log(data)
                    if (data && data.code == '000') {
                        var _new = 0;
                        console.log(data.data.order_list[_new])
                        var orderid = data.data.order_list[_new].order_id;
                        var shopid = data.data.order_list[_new].shop_id;
                        /* 获取店铺图片 */
                        $.ajax({
                            type: "get",
                            url: SHOPIMGURL,
                            async: true,
                            dataType: "jsonp",
                            data: {
                                shop_id: shopid
                            },
                            success: function (data) {
                                if (data && data.code == '000') {
                                    var src = data.data[0].shop_img;
                                    $(".order_content_title .order_title_left .order_title_left_img").html('<img src="' + src + '">');
                                } else {
                                    layer.msg(data.msg);
                                }
                            },
                            error: function (data) {
                            }
                        });
                        var status = data.data.order_list[_new].order_status;
                        var step = data.data.order_list[_new].order_step;
                        $(".order_cnt_right").on("click", function () {
                            sessionStorage.setItem("shopid", data.data.order_list[_new].shop_id);
                            sessionStorage.setItem("orderid", data.data.order_list[_new].order_id);
                        });
                        // 未开工之前跳转到预约单页面
                        if (step == 18 && (status == 1 || status == 2 || status == 3 || status == 4)) {
                            console.log(data);
                            var oInfoObj = {};
                            oInfoObj.shop_id = data.data.order_list[0].shop_id;
                            oInfoObj.user_id = data.data.order_list[0].user_id;
                            oInfoObj.order_id = data.data.order_list[0].order_id;
                            $.cookie("dd", JSON.stringify(oInfoObj), {expires: 1, path: '/'});
                            $(".order_cnt_right .detail").attr("href", "reservation.html#/waitcontact?type=1");
                        } else {
                            $(".order_cnt_right .detail").attr("href", "order_detail.html#/morder_wrap/morder_detail");
                        }
                        // 订单进行中
                        if (status == 5) {
                            // 辅材类
                            if (step == 3 || step == 7 || step == 11 || step == 15) {
                                if (data.data.order_list[0].order_material_is_exist == '1') {//工长已编辑过材料清单

                                    var type = 0;
                                    if (data.data.order_list[0].order_step_ch.indexOf("水电") != -1) {
                                        type = 1;
                                    }
                                    if (data.data.order_list[0].order_step_ch.indexOf("瓦工") != -1) {
                                        type = 3;
                                    }
                                    if (data.data.order_list[0].order_step_ch.indexOf("木工") != -1) {
                                        type = 4;
                                    }
                                    if (data.data.order_list[0].order_step_ch.indexOf("油漆") != -1) {
                                        type = 5;
                                    }
                                    $(".order_cnt_right .operation").attr("href", "reservation.html#/materiallist?pos=" + data.data.order_list[_new].order_id + "&&material_type=" + type).html("辅材支付");
                                    // vrStr += '<a href="reservation.html#/materiallist?pos=' + value.order_id + '&&material_type=' + type + '" class="bottom">辅材支付</a>';
                                } else {
                                    $(".order_cnt_right .operation").css({
                                        'width': '0',
                                        'height': '0',
                                        'border': 'none'
                                    });
                                }
                            }
                            // 人工费
                            else if (step == 5 || step == 9 || step == 13 || step == 17) {
                                if (data.data.order_list[0].order_actual_isclick == '1') {//工长已编辑过结算单

                                    var order_step_type = 0;
                                    if (data.data.order_list[0].order_step_ch.indexOf("水电") != -1) {
                                        order_step_type = 5;
                                    }
                                    if (data.data.order_list[0].order_step_ch.indexOf("瓦工") != -1) {
                                        order_step_type = 9;
                                    }
                                    if (data.data.order_list[0].order_step_ch.indexOf("木工") != -1) {
                                        order_step_type = 13;
                                    }
                                    if (data.data.order_list[0].order_step_ch.indexOf("油漆") != -1) {
                                        order_step_type = 17;
                                    }
                                    $(".order_cnt_right .operation").attr("href", "reservation.html#/advancelist?pos=" + data.data.order_list[_new].order_id + "&&order_step_type=" + order_step_type).html("人工支付");
                                    // vrStr += '<a href="reservation.html#/advancelist?pos=' + value.order_id + '&&order_step_type=' + order_step_type + '" class="bottom">人工支付</a>';
                                } else {
                                    $(".order_cnt_right .operation").css({
                                        'width': '0',
                                        'height': '0',
                                        'border': 'none'
                                    });
                                }
                            } else {
                                $(".order_cnt_right .operation").remove();
                                $(".order_cnt_right .detail").addClass("one");
                            }
                        } else if (status == 6) {
                            if (data.data.order_list[0].is_evaluation == '0') {//用户没有评价过订单
                                $(".order_cnt_right .operation").html("确认验货");
                                $('.all .bottom').addClass('confirm_inspection');
                                $(".order_cnt_right .operation").on("click", function () {
                                    var order_id = sessionStorage.getItem('orderid');
                                    var gradeArray = ['2分 失望', '4分 不满', '6分 一般', '8分 满意', '10分 惊喜'];
                                    var $engineering_quality = $('<p class="engineering_quality">工程质量：</p>');
                                    var $service_attitude = $('<p class="service_attitude">服务态度：</p>');
                                    var $overview = $('<p class="overview">综合评价：</p>');
                                    var ihtml = '<i class="iconfont">&#xe64e;</i>';
                                    var span = '<span class="describe" style="display: none"></span>';
                                    var evaButton = '<input class="evaButton" type="button" value="提交评价">';
                                    $.each(gradeArray, function (i, val) {
                                        $engineering_quality.append(ihtml);
                                        $service_attitude.append(ihtml);
                                        $overview.append(ihtml);
                                    });
                                    $engineering_quality.append(span);
                                    $service_attitude.append(span);
                                    $overview.append(span);
                                    var content = $engineering_quality[0].outerHTML + $service_attitude[0].outerHTML + $overview[0].outerHTML + evaButton;
                                    layer.open({
                                        type: 1,
                                        skin: 'layui-layer-rim', //加上边框
                                        area: ['420px', '270px'], //宽高
                                        content: content
                                    });
                                    $(document).off('click', '.evaButton').on('click', '.evaButton', function () {
                                        var projectquality = $('.engineering_quality .activei').length * 2;
                                        var serviceattitude = $('.service_attitude .activei').length * 2;
                                        var overallmerit = $('.overview .activei').length * 2;

                                        $.ajax({
                                            type: "get",
                                            url: ORDEREVALURL,
                                            async: true,
                                            dataType: "jsonp",
                                            data: {
                                                order_id: order_id,
                                                projectquality: projectquality,
                                                serviceattitude: serviceattitude,
                                                overallmerit: overallmerit
                                            },
                                            success: function (data) {
                                                if (data && data.code == '000') {
                                                    $('.layui-layer-shade').remove();
                                                    $('.layui-layer').remove();
                                                    $('.confirm_inspection').parent('.order_cnt_right').find('.detail').addClass('one');
                                                    $('.order_cnt_right .confirm_inspection').remove();
                                                } else {
                                                    layer.msg(data.msg);
                                                }
                                            },
                                            error: function (data) {
                                            }
                                        });
                                    });
                                    function eval(div) {
                                        $(document).on('click', div, function () {
                                            $(div).removeClass('activei');
                                            var $t = $(this);
                                            var index = $t.index();
                                            $t.parent().find('.describe').data('grade', index);
                                            for (var i = 0; i < index + 1; i++) {
                                                $(div).eq(i).addClass('activei');
                                            }
                                        })
                                    }

                                    function hover(div) {
                                        $(div).hover(function () {
                                            var $t = $(this);
                                            var index = $t.index();
                                            $(div).removeClass('activei');
                                            for (var i = 0; i < index + 1; i++) {
                                                $(div).eq(i).addClass('activei');
                                            }
                                            $t.parent().find('.describe').show().html(gradeArray[index]);
                                        }, function () {
                                            $(div).removeClass('activei');
                                            var describe = $(this).parent().find('.describe');
                                            var grade = describe.data('grade');
                                            if (grade == undefined) {
                                                describe.hide();
                                            } else {
                                                for (var i = 0; i < grade + 1; i++) {
                                                    $(div).eq(i).addClass('activei');
                                                }
                                                describe.show().html(gradeArray[grade]);
                                            }
                                        });
                                    }

                                    eval('.engineering_quality i');
                                    eval('.service_attitude i');
                                    eval('.overview i');

                                    hover('.engineering_quality i');
                                    hover('.service_attitude i');
                                    hover('.overview i');
                                });
                            } else {
                                $(".order_cnt_right .operation").remove();
                                $(".order_cnt_right .detail").addClass("one");
                            }

                        } else if (status == 4) {
                            $(".order_cnt_right .operation").attr("href", "reservation.html#/advancelist?pos=" + data.data.order_list[_new].order_id).html("人工支付");
                        } else if (status == 1) {
                            $(".order_cnt_right .operation").html("取消订单");
                            /* 取消订单 */
                            $(".order_cnt_right .operation").off("click", ".order_cnt_right .operation").on("click", function () {
                                $.ajax({
                                    type: "get",
                                    url: CANCELORDERURL,
                                    async: true,
                                    dataType: "jsonp",
                                    data: {
                                        user_id: USERID,
                                        order_id: orderid
                                    },
                                    success: function (data) {
                                        if (data && data.code == '000') {
                                            layer.alert(data.msg);
                                            $(".order_cnt_right .operation").css("cursor", "not-allowed");
                                            getHomeInfoHandler.getOrderEvent();
                                        } else {
                                            layer.alert(data.msg);
                                        }
                                    },
                                    error: function (data) {
                                    }
                                });
                            });
                        } else {
                            $(".order_cnt_right .operation").remove();
                            $(".order_cnt_right .detail").addClass("one");
                        }
                        $(".order_content_title .order_title_left span").html(data.data.order_list[_new].shop_name);//获取店铺名称
                        $(".order_content_title .order_title_right span").html(data.data.order_list[_new].order_time);//获取订单创建时间
                        $(".order_cnt_left .status .order_span_right").html(data.data.order_list[_new].order_status_ch);//获取订单状态
                        $(".order_cnt_left .address .order_span_right").html(data.data.order_list[_new].order_address);//获取订单地址
                        $(".order_cnt_left .house .order_span_right .area").html(data.data.order_list[_new].area);//获取订单房屋信息-面积
                        var type = data.data.order_list[_new].room + "室" + data.data.order_list[_new].parlour + "厅" + data.data.order_list[_new].toilet + "卫" + data.data.order_list[_new].balcony + "阳台";
                        $(".order_cnt_left .house .order_span_right .type").html(type);//获取订单房屋信息-户型
                        /* 获取预约金额 */
                        var result_id = data.data.order_list[_new].calculator_result_id;
                        $.ajax({
                            type: "get",
                            url: CALRESULTURL,
                            async: true,
                            dataType: "jsonp",
                            data: {
                                user_id: USERID
                            },
                            success: function (data) {
                                if (data && data.code == '000') {
                                    $.each(data.data.calculator_data, function (i, v) {
                                        if (v.calculator_results_id == result_id) {
                                            $(".order_cnt_left .house .order_span_right .money").html(v.zj);
                                        }
                                    });
                                } else {
                                    layer.alert(data.msg);
                                }
                            },
                            error: function (data) {
                            }
                        });
                        //$(".order_cnt_left .house .order_span_right .money").html(data.data.order_list[_new].actual_finish_amount);//获取订单房屋信息-预约金额
                        /* 获取预约时间 */
                        var time = '(';
                        $.ajax({
                            type: "get",
                            url: SELSTATUSURL,
                            async: true,
                            dataType: "jsonp",
                            data: {
                                user_id: USERID,
                                order_id: orderid
                            },
                            success: function (data) {
                                if (data && data.code == '000') {
                                    console.log(data.data);
                                    $.each(data.data.reservation_time_user, function (i, v) {
                                        if (v != null && v != '') {
                                            var v1 = v.split(' ')[0];
                                            time += v1 + '   ';
                                        }
                                    });
                                    time += ')';
                                    if (status == 1) {
                                        $(".order_cnt_left .time .order_span_right").html("待工长确认" + time);
                                    } else {
                                        var reservation_time = data.data.reservation_time.split(' ')[0];
                                        $(".order_cnt_left .time .order_span_right").html(reservation_time);
                                    }
                                } else {
                                    layer.alert(data.msg);
                                }
                            },
                            error: function (data) {
                            }
                        });
                    } else if (data.code == '205') {
                        $('.my_order_content').remove();
                        $('.not_information').show().removeClass('hide');
                        $('.not_information_text').html('您暂时还没有订单消息哦~~');
                    } else {
                        layer.alert(data.msg);
                    }
                },
                complete: function () {
                    $(".my_order_content").removeClass("loagbg");
                    $(".order_content_title ").removeClass("display");
                    $(".order_content_cnt ").removeClass("display");
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
            $('.sex').click(function () {
                $('.sex em').removeClass('checked');
                $(this).find('em').addClass('checked');
            });
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
                            $('.sman em').addClass('checked');
                        } else {
                            $('#women').attr('checked', 'checked');
                            $('.swomen em').addClass('checked');
                        }
                        if (data.data.userinfo_email != null && data.data.userinfo_email != '') {
                            var email = data.data.userinfo_email;
                            var length = data.data.userinfo_email.length;
                            var abb_email = email.substr(0, 3) + "****" + email.substr(length - 3, length);//邮箱中间变成*号
                            $(".personal_form_list .email").html(abb_email).addClass("apparent");//获取用户的邮箱
                            $(".personal_form_list p a").html("修改绑定");
                        } else {
                            $(".personal_form_list .email").removeClass("apparent");
                            $(".personal_form_list p a").html("绑定邮箱");
                        }

                        $('#nowAddress').distpicker({
                            province: data.data.loc_province,
                            city: data.data.loc_city,
                            district: data.data.loc_district
                        });

                        $('#homeAddress').distpicker({
                            province: data.data.home_province,
                            city: data.data.home_city,
                            district: data.data.home_district
                        });
                        $(".personal_form_list .personal_area_detail").val(data.data.loc_address);
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
                        sex: $("input[name='sex']:checked").val(),
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
                            layer.msg(data.msg)
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

    /* 上传用户头像 */
    getUserAvatarHandler = {
        getInfoEvent: function () {
            $(document).off('change', '#renderings_file').on('change', '#renderings_file', function () {
                var inputImg = $(this);
                var file = inputImg.get(0).files[0];
                if (!/image\/\w+/.test(file.type)) {
                    layer.msg("请确保文件为图像类型");
                    inputImg.val('');//清空file选择的文件
                    return false;
                } else {
                    var data = new FormData();
                    data.append("user_id", USERID);
                    data.append("myfile", $("#renderings_file")[0].files[0]);
                    $.ajax({
                        type: "POST",
                        url: UPUSERIMGURL,
                        data: data,
                        dataType: "jsonp",
                        jsonp: 'callback',
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            if (result.code == '000') {
                                layer.msg(result.msg);
                                getHomeInfoHandler.getImgEvent();
                            } else {
                                layer.alert(result.msg);
                            }
                        },
                        error: function (e, a, v) {
                            layer.alert("未知错误");
                        }
                    });
                }
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
                        console.log(data.data);
                        if (data.data.now_order_step != 18) {
                            var stage = '<div class="axis_start">';
                            stage += '<h2>进场准备</h2>';
                            stage += '<h3>READING..</h3>';
                            stage += '</div>';
                            var work = '<div class="work_worker">';
                            $.each(data.data.detail, function (i, v) {
                                stage += spliceStageHandler.spliceStrEvent(v);
                                if (v.material_pay_status == '配送中') {
                                    $(document).on('mouseover', '.step span', function () {
                                        $('.step span').addClass('distribution');
                                    });
                                    $(document).on('mouseout', '.step', function () {
                                        $('.step span').removeClass('distribution');
                                    });
                                }
                            });
                            if (data.data.now_order_step != 1) {
                                $.each(data.data.worker, function (i, v) {
                                    work += '<div class="worker">';
                                    work += '<img src="' + v.portrait + '">';
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
                            if (data.data.noworder_status == 6) {
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
                        if (!!window.ActiveXObject || "ActiveXObject" in window) {//IE浏览器下特殊样式
                            $('.work_stage .stage_content').css('marginLeft', '0');
                        }
                        if (window.navigator.userAgent.indexOf("Firefox") != -1) {//火狐浏览器下特殊样式
                            $('.work_stage .stage_content').css('marginLeft', '12px');
                        }
                        if (window.navigator.userAgent.indexOf("Chrome") && window.chrome) {//谷歌浏览器下特殊样式
                            $('.work_stage .stage_content').css('marginLeft', '6px');
                        }

                        layer.photos({
                            photos: '.stage_pic',
                            anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
                        });


                    } else {
                        layer.alert(data.msg)
                    }
                },
                error: function (data) {
                }
            });
        }
    };

    /* 我的收藏成本计算 */
    getBillInfoHandler = {
        billInfoEvent: function () {
            function ajax1() {
                $.ajax({
                    url: BILLURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        user_id: USERID,
                        page: 1,
                        limit: 4
                    },
                    success: function (data) {
                        //console.log(data.data);
                        //data.code = 200;
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

                        } else if (data.code == '200') {
                            $('.check_wrap').remove();
                            $('.check_list_wrap .not_information').show().removeClass('hide');
                            $('.check_list_wrap .not_information_text').html('您现在还没有关于成本计算的收藏哦~~');
                        }
                    },
                    error: function (data) {
                    }
                });
            }

            ajax1();
            /* 删除我的收藏成本计算 */
            $(document).off('click', '#collection_del').on('click', '#collection_del', function (e) {
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
                        ajax1();
                        billPageHandler.pageContentEvent();
                    },
                    error: function (data) {
                        layer.msg(data.msg);
                    }
                });
            })
        }
    };

    /* 获取我的收藏店铺列表 */
    getShopInfoHandler = {
        shopInfo: function () {
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
                        //data.code = 117;
                        if (data != null && data.code == '000') {
                            shop_total = data.data[0].total;

                            var vrStr = "";
                            $.each(data.data, function (i, v) {
                                vrStr += spliceShopHandler.spliceStrEvent(v);
                            });

                            $(".shopWrap").html(vrStr);
                            $(".shopWrap .collection_shop .left_img").on("click", function () {
                                var pos = $(this).parent().attr("shopid");
                                window.location.href = "view_shop.html#/shopdetails?pos=" + pos;
                            });
                            shopPageHandler.pageContentEvent();
                        } else if (data.code == '117') {
                            $('.shop_wrap').remove();
                            $('.collection_shop_wrap .not_information').show().removeClass('hide');
                            $('.collection_shop_wrap .not_information_text').html('您现在还没有收藏店铺哦~~');
                        }
                    },
                    error: function (data) {
                    }
                });
            }

            ajax();

            /* 删除我的收藏店铺列表 */
            $(document).off('click', '.collection_shop_del').on('click', '.collection_shop_del', function (e) {
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
                        // console.log(shopId);
                        layer.msg(data.msg);
                        ajax();
                        //shopPageHandler.pageContentEvent();
                    },
                    error: function (data) {
                    }
                });
            })

        }
    };

    /* 获取我的收藏全景图列表 */
    getPicInfoHandler = {
        picInfo: function () {
            function ajaxImg() {
                $.ajax({
                    url: PANORAMAURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        user_id: USERID,
                        page: 1,
                        limit: 12
                    },
                    success: function (data) {
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
                        else if (data.code == '117') {
                            $('.img_wrap').remove();
                            $('.complete_before .not_information').show().removeClass('hide');
                            $('.complete_before .not_information_text').html('您现在还没有收藏全景图哦~~');
                        }
                    },
                    error: function (data) {
                        layer.msg(data.msg);
                    }
                });
            }

            ajaxImg();
            $(document).off('click', '#pic_del').on('click', '#pic_del', function () {
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
                            ajaxImg();
                            pageHandler.pageContentEvent();
                        }
                    },
                    error: function (data) {
                        layer.msg(data.msg);
                    }
                });
            });
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
                var cnt = $(this).siblings(".cnt").html();
                layer.open({
                    type: 1,
                    skin: 'layui-layer-rim', //加上边框
                    area: ['420px', '240px'], //宽高
                    content: '<p>' + cnt + '</p>'
                });
                if ($(this).parent().attr("data-isread") == "0") { //未读消息
                    var id = $(this).parent().attr("data-id");
                    var $now = $(this).parent();
                    //$(this).parent().removeClass("isnews");
                    var num = $(".left_ul li i").html();
                    if (num != 0) {
                        num--;
                        if (num == 0) {
                            $(".left_ul li i").remove();
                        } else {
                            $(".left_ul li i").html(num);
                        }
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
                    limit: 10
                },
                success: function (data) {
                    if (data != null && data.code == '000') {
                        $(".main_contentWrap").empty();
                        TOTAL = data.data[0].total; // 总数
                        $.each(data.data, function (i, v) {
                            var tipStr = spliceMsgHandler.spliceStrEvent(v);
                            $(".main_contentWrap").append(tipStr);
                        });
                        judgeNews.isnews();             //已读消息和未读消息的区分
                        readNews.tobeRead();            //查看消息
                        infopageHandler.pageContentEvent(); //分页
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
    spliceMsgHandler = {
        spliceStrEvent: function (value) {
            var vrStr = '<div class="main_content" data-isread="' + value.isread + '" data-id="' + value.id + '">';
            vrStr += '<span class="name">' + value.senduser + '</span>';
            vrStr += '<span class="content">' + value.msgtitle + '</span>';
            vrStr += '<span class="time">' + value.sendtime + '</span>';
            vrStr += '<span class="cnt">' + value.msgcontent + '</span>';
            vrStr += '<a class="delete" href="javascript:;"><em class="sprite-details"></em></a>';
            vrStr += '</div>';
            return vrStr;
        }
    };

    /**
     * 消息中心分页
     */
    infopageHandler = {
        pageContentEvent: function () {
            MAXROWS = Math.ceil(TOTAL / 10); // 页数
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
                    limit: 10
                },   //ajax方式传值时的附加传值,要传的参数放在这里面,页面参数只要指定idParamemeter就好，会自动添加
                dataOperate: function oprate(data) {
                    $(".main_contentWrap").empty();
                    $.each(data.data, function (i, v) {
                        var tipStr = spliceMsgHandler.spliceStrEvent(v);
                        $(".main_contentWrap").append(tipStr);
                    });
                    judgeNews.isnews();
                    readNews.tobeRead();
                    deleteRecord.singleSelection();
//                  markRead.checkAll();
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
            $(document).on("click", ".set_default input", function () {
                if ($(this).is(':checked')) { //是否默认地址 1:默认地址 2:非默认地址
                    $(this).siblings("em").removeClass("checked");
                } else {
                    $(this).siblings("em").addClass("checked");
                }
            });
            $(".information_choose a").on("click", function () {
                if ($(".information_choose .set_default em").hasClass("checked")) {
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
                opacity: 1
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
            var workStage = $(".work_stage");
            workStage.eq(0).addClass("first_stage bar");
            workStage.eq(1).addClass("sdg_stage bar");
            workStage.eq(5).addClass("wg_stage bar");
            workStage.eq(9).addClass("mg_stage bar");
            workStage.eq(13).addClass("yqg_stage bar");
            workStage.eq(17).addClass("end_stage bar");
            var li = '';
            if (workStage.hasClass("first_stage")) {
                li += '<li class="current">';
                li += '<a href="javascript:void(0)" tab="&first_stage">进场准备</a>';
                li += '</li>';
            }
            if (workStage.hasClass("sdg_stage")) {
                li += '<li>';
                li += '<a href="javascript:void(0)" tab="&sdg_stage">水电工阶段</a>';
                li += '</li>';
            }
            if (workStage.hasClass("wg_stage")) {
                li += '<li>';
                li += '<a href="javascript:void(0)" tab="&wg_stage">瓦工阶段</a>';
                li += '</li>';
            }
            if (workStage.hasClass("mg_stage")) {
                li += '<li>';
                li += '<a href="javascript:void(0)" tab="&mg_stage">木工阶段</a>';
                li += '</li>';
            }
            if (workStage.hasClass("yqg_stage")) {
                li += '<li>';
                li += '<a href="javascript:void(0)" tab="&yqg_stage">油漆工阶段</a>';
                li += '</li>';
            }
            if (workStage.hasClass("end_stage")) {
                li += '<li>';
                li += '<a href="javascript:void(0)" tab="&end_stage">工期完成</a>';
                li += '</li>';
            }
            $("#suspension_menu ul").append(li);
            // if ($("#suspension_menu ul li").length >= 3) {
            //     var top = '';
            //     // top += '<li class="litop">';
            //     // top += '<a href="javascript:void(0)" tab="&to_head">回到顶部</a>';
            //     // top += '</li>';
            //     $("#suspension_menu ul").append(top);
            // }
            var _head = $(".commonhead");
            $(_head).addClass("to_head bar");
            var items = $(".bar");
            var _tabs = $("#suspension_menu li ");
            $(_tabs).on('click', function (e) {
                e.stopPropagation();
                var x = $(this).index();
                var divTop;
                if ($(this).hasClass('litop')) {
                    divTop = items.eq(0).offset().top;
                }
                else {
                    divTop = items.eq(x + 1).offset().top;
                }
                $("html,body").stop().animate({
                    scrollTop: divTop - 20
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
            } else if (value.material_pay_status == 4) {
                value.material_pay_status = "自行购买";
            }
            var vrStr = '<div class="work_stage">';
            vrStr += '<div class="stage_title">';
            vrStr += '<span class="date">' + value.img_time.split(" ")[0] + '</span>';
            vrStr += '<em></em>';
            vrStr += '<b></b>';
            var order_id = sessionStorage.getItem("orderid");
            if (value.order_step.indexOf("辅材") > 0) {
                var type = 0;
                if (value.order_step.indexOf("水电") != -1) {
                    type = 1;
                }
                if (value.order_step.indexOf("瓦工") != -1) {
                    type = 3;
                }
                if (value.order_step.indexOf("木工") != -1) {
                    type = 4;
                }
                if (value.order_step.indexOf("油漆") != -1) {
                    type = 5;
                }
                vrStr += '<span class="step">' + value.order_step + '[<span class="' + ((value.material_pay_status == '配送中') ? 'c_eec988' : '') + '">' + value.material_pay_status + '</span>]' + '<a href="reservation.html#/materiallist?pos=' + order_id + '&&material_type=' + type + '" target="_blank" class="balance">材料清单</a></span>';
                vrStr += '</div>';
                vrStr += '<div class="stage_content">';
                vrStr += '<div class="stage_pic clearfix">';
                $.each(value.img, function (m, n) {
                    // vrStr += '<div class="pic">';
                    vrStr += '<img src="' + n.img_url + '" alt="' + value.order_step + '">';
                    // vrStr += '</div>';
                });
                vrStr += '</div>';
                vrStr += '</div>';

            } else if (value.order_step.indexOf("完成") > 0) {
                var order_step_type = 0;
                if (value.order_step.indexOf("水电") != -1) {
                    order_step_type = 5;
                }
                if (value.order_step.indexOf("瓦工") != -1) {
                    order_step_type = 9;
                }
                if (value.order_step.indexOf("木工") != -1) {
                    order_step_type = 13;
                }
                if (value.order_step.indexOf("油漆") != -1) {
                    order_step_type = 17;
                }
                vrStr += '<span class="step">' + value.order_step + '</span>';
                if (value.order_actual_isclick == '1') {
                    vrStr += '<a href="reservation.html#/advancelist?pos=' + order_id + '&&order_step_type=' + order_step_type + '" target="_blank" class="settlement">结算清单</a>';
                }
                vrStr += '</div>';
                vrStr += '<div class="stage_content">';
                vrStr += '<div class="stage_pic clearfix">';
                $.each(value.img, function (m, n) {
                    // vrStr += '<div class="pic">';
                    vrStr += '<img src="' + n.img_url + '" alt="' + value.order_step + '">';
                    // vrStr += '</div>';
                });
                vrStr += '</div>';
                vrStr += '</div>';
                vrStr += '</div>';
            } else if (value.order_step.indexOf("剪裁") != -1) {
                vrStr += '<span class="step">' + value.order_step + '<a href="reservation.html#/advancelist?pos=' + value.order_id + '&order_step_type=18" target="_blank" class="balance prepayment">预支付单</a></span>';
                vrStr += '</div>';
                vrStr += '<div class="stage_content">';
                vrStr += '<div class="stage_pic clearfix">';
                $.each(value.img, function (m, n) {
                    // vrStr += '<div class="pic">';
                    vrStr += '<img src="' + n.img_url + '" alt="' + value.order_step + '">';
                    // vrStr += '</div>';
                });
                vrStr += '</div>';
                vrStr += '</div>';
            }
            else {
                vrStr += '<span class="step">' + value.order_step + '</span>';
                vrStr += '</div>';
                vrStr += '<div class="stage_content">';
                vrStr += '<div class="stage_pic clearfix">';
                $.each(value.img, function (m, n) {
                    // vrStr += '<div class="pic">';
                    vrStr += '<img src="' + n.img_url + '" alt="' + value.order_step + '">';
                    // vrStr += '</div>';
                });
                vrStr += '</div>';
                vrStr += '<p>' + value.img_content + '</p>';
                vrStr += '</div>';
            }

            vrStr += '</div>';
            return vrStr;
        }
    };

    /**
     * 我的订单列表拼接内容
     */
    spliceOrderHandler = {
        spliceOrderList: function (value) {
            console.log(value);
            var vrStr = '<div class="order_box">';
            vrStr += '<div class="ordercnt_title clearfix">';
            vrStr += '<span class="type">' + value.room + '室 ' + value.parlour + '厅' + value.toilet + '卫' + value.balcony + '阳台</span>';
            vrStr += '<span class="time">' + value.order_time + '</span><span>订单号</span>';
            vrStr += '<span class="order_num">' + value.order_id + '</span><a class="name" href="view_shop.html#/shopdetails?pos=' + value.shop_id + '" target="_blank">' + value.shop_name + '</a>';
            vrStr += '</div><div class="ordercnt_content">';
            vrStr += '<div class="block clearfix"><div class="address">';
            vrStr += '<p>' + value.order_address + '</p></div>';
            vrStr += '<div class="area"><p class="item_hover_0"><span>' + value.area + '</span>㎡</p></div>';
            if (value.order_step == '3') {
                if (value.order_material_is_exist == '0') {
                    value.order_step_ch = '水电工开工';
                }
            } else if (value.order_step == '7') {
                if (value.order_material_is_exist == '0') {
                    value.order_step_ch = '瓦工开工';
                }
            } else if (value.order_step == '11') {
                if (value.order_material_is_exist == '0') {
                    value.order_step_ch = '木工开工';
                }
            } else if (value.order_step == '15') {
                if (value.order_material_is_exist == '0') {
                    value.order_step_ch = '油漆工开工';
                }
            }
            vrStr += '<div class="now_stage"><p>' + value.order_step_ch + '</p></div>';
            if (value.actual_finish_amount == null) {
                vrStr += '<div class="money"><p>0.00</p></div>';
            } else {
                vrStr += '<div class="money"><p>' + value.actual_finish_amount + '</p></div>';
            }
            vrStr += '<div class="trade_stage"><p>' + value.order_status_ch + '</p></div>';
            // 未开工之前跳转到预约单页面
            if (value.order_step == 18 && (value.order_status == 1 || value.order_status == 2 || value.order_status == 3 || value.order_status == 4)) {
                // console.log(value);
                // var oInfoObj = {};
                // oInfoObj.shop_id = value.shop_id;
                // oInfoObj.user_id = value.user_id;
                // oInfoObj.order_id = value.order_id;
                // $.cookie("dd", JSON.stringify(oInfoObj), {expires: 1, path: '/'});
                vrStr += '<div class="all" data-sss="' + value.user_id + '" data-shopid="' + value.shop_id + '" data-orderid="' + value.order_id + '"  data-orderstep="' + value.order_step + '"><a href="javascript:;" class="top look_new">查看详情</a>';
            } else if (value.order_status == 7) {
                vrStr += '<div class="all"><span>--</span>';
            } else {
                vrStr += '<div class="all" data-shopid="' + value.shop_id + '" data-orderid="' + value.order_id + '"  data-orderstep="' + value.order_step + '"><a href="order_detail.html#/morder_wrap/morder_detail" target="_blank" class="top">查看详情</a>';
            }
            if (value.order_status == 6) {
                if (value.is_evaluation == '0') {
                    vrStr += '<a href="javascript:;" class="bottom confirm_inspection">确认验货</a>';
                }
            }
            if (value.order_status == 1) {
                vrStr += '<a href="javascript:;" class="bottom">取消订单</a>';
            }
            if (value.order_status == 4) {
                vrStr += '<a href="reservation.html#/advancelist?pos=' + value.order_id + '"  class="bottom">人工支付</a>';
            }
//          if(value.order_status == 4) {
//              vrStr += '<a href="success_pay.html#/success_pay/pay_end" class="bottom">支付</a>';
//          }
//          if(value.order_status == 5 && (value.order_step == 3 || value.order_step == 5 || value.order_step == 7 || value.order_step == 9 || value.order_step == 11 || value.order_step == 13 || value.order_step == 15 || value.order_step == 17)) {
//              vrStr += '<a href="success_pay.html#/success_pay/pay_end" class="bottom">支付</a>';
//          }
            // 订单进行中
            if (value.order_status == 5) {
                // 辅材类
                if (value.order_step == 3 || value.order_step == 7 || value.order_step == 11 || value.order_step == 15) {
                    if (value.order_material_is_exist == '1') {//工长已编辑过材料清单
                        var type = 0;
                        if (value.order_step_ch.indexOf("水电") != -1) {
                            type = 1;
                        }
                        if (value.order_step_ch.indexOf("瓦工") != -1) {
                            type = 3;
                        }
                        if (value.order_step_ch.indexOf("木工") != -1) {
                            type = 4;
                        }
                        if (value.order_step_ch.indexOf("油漆") != -1) {
                            type = 5;
                        }
                        vrStr += '<a href="reservation.html#/materiallist?pos=' + value.order_id + '&&material_type=' + type + '" class="bottom">辅材支付</a>';
                    }
                }
                // 人工费
                if (value.order_step == 5 || value.order_step == 9 || value.order_step == 13 || value.order_step == 17) {
                    if (value.order_actual_isclick == '1') {//工长已编辑过结算单
                        var order_step_type = 0;
                        if (value.order_step_ch.indexOf("水电") != -1) {
                            order_step_type = 5;
                        }
                        if (value.order_step_ch.indexOf("瓦工") != -1) {
                            order_step_type = 9;
                        }
                        if (value.order_step_ch.indexOf("木工") != -1) {
                            order_step_type = 13;
                        }
                        if (value.order_step_ch.indexOf("油漆") != -1) {
                            order_step_type = 17;
                        }
                        vrStr += '<a href="reservation.html#/advancelist?pos=' + value.order_id + '&&order_step_type=' + order_step_type + '" class="bottom">人工支付</a>';
                    }
                    /*href="refund.html#/refund/home/refund_step_1"*/
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
                total: Math.ceil(order_total / 3), //全部页数
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
                    limit: 3
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
                    $(document).off("click", ".ordercnt_content .all .bottom").on("click", ".ordercnt_content .all .bottom", function () {
                        var shopid = $(this).parent().attr("data-shopid");
                        var orderid = $(this).parent().attr("data-orderid");
                        var orderstep = $(this).parent().attr("data-orderstep");
                        sessionStorage.setItem("shopid", shopid);
                        sessionStorage.setItem("orderid", orderid);
                        sessionStorage.setItem("orderstep", orderstep);
                        if ($(this).html() == "取消订单") {
                            $.ajax({
                                type: "get",
                                url: CANCELORDERURL,
                                async: true,
                                dataType: "jsonp",
                                data: {
                                    user_id: USERID,
                                    order_id: orderid
                                },
                                success: function (data) {
                                    if (data && data.code == '000') {
                                        layer.alert(data.msg);
                                        location.reload(true);
                                    } else {
                                        layer.alert(data.msg);
                                    }
                                },
                                error: function (data) {
                                }
                            });
                        } else if ($(this).html() == "确认验货") {
                            var order_id = sessionStorage.getItem('orderid');
                            var gradeArray = ['2分 失望', '4分 不满', '6分 一般', '8分 满意', '10分 惊喜'];
                            var $engineering_quality = $('<p class="engineering_quality">工程质量：</p>');
                            var $service_attitude = $('<p class="service_attitude">服务态度：</p>');
                            var $overview = $('<p class="overview">综合评价：</p>');
                            var ihtml = '<i class="iconfont">&#xe64e;</i>';
                            var span = '<span class="describe" style="display: none"></span>';
                            var evaButton = '<input class="evaButton" type="button" value="提交评价">';
                            $.each(gradeArray, function (i, val) {
                                $engineering_quality.append(ihtml);
                                $service_attitude.append(ihtml);
                                $overview.append(ihtml);
                            });
                            $engineering_quality.append(span);
                            $service_attitude.append(span);
                            $overview.append(span);
                            var content = $engineering_quality[0].outerHTML + $service_attitude[0].outerHTML + $overview[0].outerHTML + evaButton;
                            layer.open({
                                type: 1,
                                skin: 'layui-layer-rim', //加上边框
                                area: ['420px', '270px'], //宽高
                                content: content
                            });
                            $(document).off('click', '.evaButton').on('click', '.evaButton', function () {
                                var projectquality = $('.engineering_quality .activei').length * 2;
                                var serviceattitude = $('.service_attitude .activei').length * 2;
                                var overallmerit = $('.overview .activei').length * 2;

                                $.ajax({
                                    type: "get",
                                    url: ORDEREVALURL,
                                    async: true,
                                    dataType: "jsonp",
                                    data: {
                                        order_id: order_id,
                                        projectquality: projectquality,
                                        serviceattitude: serviceattitude,
                                        overallmerit: overallmerit
                                    },
                                    success: function (data) {
                                        if (data && data.code == '000') {
                                            $('.layui-layer-shade').remove();
                                            $('.layui-layer').remove();
                                            $('.confirm_inspection').parent('.all').find('.top').addClass('one');
                                            $('.all .confirm_inspection').remove();
                                        } else {
                                            layer.msg(data.msg);
                                        }
                                    },
                                    error: function (data) {
                                    }
                                });
                            });
                            function eval(div) {
                                $(document).on('click', div, function () {
                                    $(div).removeClass('activei');
                                    var $t = $(this);
                                    var index = $t.index();
                                    $t.parent().find('.describe').data('grade', index);
                                    for (var i = 0; i < index + 1; i++) {
                                        $(div).eq(i).addClass('activei');
                                    }
                                })
                            }

                            function hover(div) {
                                $(div).hover(function () {
                                    var $t = $(this);
                                    var index = $t.index();
                                    $(div).removeClass('activei');
                                    for (var i = 0; i < index + 1; i++) {
                                        $(div).eq(i).addClass('activei');
                                    }
                                    $t.parent().find('.describe').show().html(gradeArray[index]);
                                }, function () {
                                    $(div).removeClass('activei');
                                    var describe = $(this).parent().find('.describe');
                                    var grade = describe.data('grade');
                                    if (grade == undefined) {
                                        describe.hide();
                                    } else {
                                        for (var i = 0; i < grade + 1; i++) {
                                            $(div).eq(i).addClass('activei');
                                        }
                                        describe.show().html(gradeArray[grade]);
                                    }
                                });
                            }

                            eval('.engineering_quality i');
                            eval('.service_attitude i');
                            eval('.overview i');

                            hover('.engineering_quality i');
                            hover('.service_attitude i');
                            hover('.overview i');
                        }
                    });
                } //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
            });
        }
    };

    /**
     * 我的收藏全景图分页
     */
    pageHandler = {
        pageContentEvent: function () {
            $(".page_div3").empty().paging({
                total: Math.ceil(pic_total / 12), //全部页数
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
                    limit: 12
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
            vrStr += '	<a id="pic_del" class="complete_del" href="javascript:;">';
            vrStr += '		<em class="sprite-details"></em>';
            vrStr += '		</a>';
            vrStr += '		<div class="detail_img">';
            vrStr += '	<img src="' + value.panorama_img + '">';
            vrStr += '	</div><!--detail_img-->';
            vrStr += '		<a href="' + value.panorama_url + '" class="complete_bg"></a><!--complete_bg-->';
            vrStr += '			<span>' + value.panorama_style + '</span>';
            vrStr += '			<a href="' + value.panorama_url + '" class="bg"></a>';
            vrStr += '			</div><!--works_detail-->';
            return vrStr;
        }
    };

    /**
     * 我的收藏成本计算分页
     */
    billPageHandler = {
        pageContentEvent: function () {
            $(".page_div").empty().paging({
                total: Math.ceil(bill_total / 4), //全部页数
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
                    limit: 4
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
     * 我的收藏成本计算拼接内容
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
            vrStr += '			<a id="collection_del" class="collection_del" href="javascript:;">';
            vrStr += '			<em class="sprite-details"></em>';
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
                    $(".shopWrap .collection_shop .left_img").on("click", function () {
                        var pos = $(this).parent().attr("shopid");
                        window.location.href = "view_shop.html#/shopdetails?pos=" + pos;
                    });
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
            if (value.img != null && value.img != '') {
                vrStr += '	<img src="' + value.img + '">';
            }
            vrStr += '		</div><!--left_img-->';
            vrStr += '		<div class="left_detail fl">';
            vrStr += '	<p class="manager_shop">' + ((value.shop_name != null && value.shop_name != "") ? value.shop_name : '无') + '';
            $.each(value.authentication, function (s, r) {
                vrStr += '		<span style="background-position:' + (-20) * (r - 1) + 'px 0" title=' + certification[r] + '></span>';
            });
            vrStr += '	</p>';
            vrStr += '	<p>常驻地址：<span>' + ((value.shop_address != null && value.shop_address != "") ? value.shop_address : '无') + '</span></p>';
            vrStr += '<p>服务范围：';
            $.each(value.servicearea, function (m, n) {
                if (n != '' && n != null) {
                    vrStr += '<span>' + n + '</span>;';
                } else {
                    vrStr += '<span>无</span>';
                }
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
            vrStr += '			<em class="sprite-details"></em>';
            vrStr += '			</a>';
            vrStr += '			</div><!--collection_shop_right-->';
            vrStr += '			</div><!--collection_shop-->';
            return vrStr;

        }
    };
    //入口方法调用 代码只能从这里执行
    centerWrap.init();
})();