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

    var BASEURL = 'http://www.heeyhome.com/api/public/';

    var MASTERDATAURL = BASEURL + 'personal/foremaninfo?callback=JSON_CALLBACK'; // 工长个人资料
    var USERIMGURL = BASEURL + 'personal/portrait'; // 用户头像
    var USERIMGEDITURL = BASEURL + 'personal/portrait/change'; // 编辑用户头像
    var SAFELEVELURL = BASEURL + 'personal/safe'; // 安全等级
    var TEAMURL = BASEURL + 'myworkers'; // 我的团队
    var WORKERINFOURL = BASEURL + 'myworkers/workerinfo'; // 我的团队-员工详情
    var EDITWORKERURL = BASEURL + 'myworkers/changeworker'; //我的团队-编辑工人
    var ADDWORKERURL = BASEURL + 'myworkers/addworker'; //我的团队-添加工人
    var PRICELISTURL = BASEURL + 'myworkers/pricelist'; //工人价格明细
    var APPLYURL = BASEURL + 'withdraw/apply'; // 我的钱包银行卡提现
    var BILLURL = BASEURL + 'mywallet/bill'; // 我的钱包账单明细
    var WALLETURL = BASEURL + 'mywallet'; // 我的钱包获取当前总额，提现金额
    var DELBILLURL = BASEURL + 'mywallet/bill/del'; // 单条账单明细删除
    var SHOPCURL = BASEURL + 'personal/myshop?callback=JSON_CALLBACK';//店铺资料
    var SIMGURL = BASEURL + 'personal/myshop/uploadimg';//上传效果图图片接口
    var STECURL = BASEURL + 'personal/myshop/addtechnics';//上传本店工艺图片接口
    var ETECURL = BASEURL + 'personal/myshop/editechnics'; //更改本店工艺图片接口
    var WORKCURL = BASEURL + 'myworkcase?callback=JSON_CALLBACK';//我的作品
    var NEWCASEURL = BASEURL + 'addmyworkcase'; //我的作品工长添加案例
    var DELCASEURL = BASEURL + 'delmyworkcase'; //我的作品删除工长案例
    var GETNAMEURL = BASEURL + 'bankcard/getname?callback=JSON_CALLBACK';//获取持卡人姓名接口
    var TYPEURL = BASEURL + 'bankcard/getcardtype?callback=JSON_CALLBACK';//获取银行卡类型接口
    var VERIFYURL = BASEURL + 'bankcard/cardverify?callback=JSON_CALLBACK';//银行卡四元素认证接口
    var BANKINFOURL = BASEURL + 'mybankcards?callback=JSON_CALLBACK';//获取银行卡信息接口
    var PHCODE = BASEURL + 'sendsms'; // 手机验证码
    var TAGURL = BASEURL + 'personal/myshop/stylelist?callback=JSON_CALLBACK';//风格标签
    var MASTERSHOPURL = BASEURL + 'personal/myshop/change';//编辑工长店铺资料
    var DELTECURL = BASEURL + 'personal/myshop/deltechnics';//删除店铺工艺接口
    var DELSHOPURL = BASEURL + 'personal/myshop/del';//删除店铺效果图接口
    var TECURL = BASEURL + 'personal/myshop/technics?callback=JSON_CALLBACK';//显示店铺工艺列表信息接口
    var EDITPERURL = BASEURL + 'personal/foremaninfo/change';//编辑工长信息资料
    var READURL = BASEURL + 'personal/message'; // 读取消息中心信息接口
    var DELETEURL = BASEURL + 'personal/message/del'; // 删除消息中心信息接口
    var HAVEREADURL = BASEURL + 'personal/message/read'; // 已读消息接口
    var ALLREADURL = BASEURL + 'personal/message/readall'; // 全部标记已读接口
    var NEWSURL = BASEURL + 'personal/message/isnew'; // 读取新消息接口
    var ORDERURL = BASEURL + 'order/shop/list'; // 我的订单
    var STARTWORKURL = BASEURL + 'order/process/startWork'; // 我的订单进度开工等上传信息
    var DETAILWORKURL = BASEURL + 'order/process/lookWork'; // 查看我的订单进度开工等上传信息
    var ORDERFILTERURL = BASEURL + 'order/shop/listfilter'; // 我的订单筛选
    var ORDERTOCUSURL = BASEURL + 'order/shop/subupdatemsg'; // 我的订单步骤返回给用户
    var ADDDATEURL = BASEURL + 'order/aeckonandactual/adddate'; // 添加预算单与结算单数据
    var GENERATEURL = BASEURL + 'order/aeckonandactual/generatelist'; // 预算单结算单生成
    var LISTNAMEURL = BASEURL + 'order/aeckonandactual/getlistname?callback=JSON_CALLBACK'; // 获取预算单结算单字段
    var SELDATAURL = BASEURL + 'order/aeckonandactual/getlistdata?callback=JSON_CALLBACK'; // 获取预算单结算单信息
    var UPDATEURL = BASEURL + 'order/aeckonandactual/update?callback=JSON_CALLBACK'; // 修改结算单信息
    var SELSTATUSURL = BASEURL + 'order/aeckonandactual/selstatus'; // 查询预结算单编辑状态
    var MATERIALLISTURL = BASEURL + 'materialslist'; //工长材料清单
    var HOUSESTYLEURL = BASEURL + 'order/style/addhousestyle'; //订单装修风格
    var MATERIALORDERURL = BASEURL + 'order/material/produce'; //材料订单
    var APPOINTMENTURL = BASEURL + '/order/appointment';// 获取订单上门时间
    var DESTORYURL = BASEURL + '/order/shop/destory';// 取消订单
    var CONFIRMURL = BASEURL + '/order/shop/confirm';// 工长确认订单接口
    var BASICINFOURL = BASEURL + '/order/shop/orderbasicinfo';// 获取业主信息接口
    var HOMEORDERURL = BASEURL + '/order/shop/ordercount';// 获取我的首页订单数据接口


    var email;//获取工长邮箱
    var realname;//获取真实姓名
    var idcardno;//获取身份证号
    var banklogo;//获取银行logo
    var bankname;//获取银行卡的名字
    var cardtype;//获取银行卡的类型

    var TOTAL; // 消息中心后台数据总数
    var ORDERTOTAL; // 我的订单后台数据总数
    var ORDERFILTERTOTAL; // 我的订单筛选后台数据总数
    var HOUSESTYLE;//我的订单装修风格
    var ORDERID;//订单id
    var MAXROWS; //消息中心总页数
    var myfile = [];
    var len2 = 0;//已完成项目的总数
    var len3 = 0;//未完成项目的总数
    var load = '<div class="loading"><img src="image/icon-loading.gif"></div>';


    // 错误提示文字
    var MSG1 = "建筑面积不能为空";
    var MSG2 = "请选择有效的户型";
    var MSG3 = "请选择装修风格";
    var MSG4 = "请选择合适的工期";
    var MSG5 = "详细地址不能为空";
    var MSG6 = "施工图片不能为空";

    var USERID = $.cookie("userId"); // 得到userid
    if (USERID != null && USERID != "" && USERID != undefined) {
        USERID = $.base64.decode($.cookie("userId"));
    } else {
        USERID = "";
    }
    /**
     * 移动号码归属地支持号段:134 135 136 137 138 139 147 150 151 152 157 158 159 178  182 183 184 187 188
     * 联通号码归属地支持号段:130 131 132  145 155 156 176  186
     * 电信号码归属地支持号段:133 153 177 180 181 189
     * 移动运营商:170
     */
    var PHONEREG = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/; // 验证手机号正则表达式
    var cardReg = /^\d{19}$/;

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
            // self.initMSuccessEvent();
            self.initMNewWorkEvent();
            self.initMTeamEvent();
            self.initMShopEvent();
            self.initMOrderEvent();
            self.initWithdrawEvent();
            self.initOrderProcessEvent();
            self.initBankEvent();
            self.initBillEvent();
            self.initMsgInfo();
            self.initTeamDetailEvent();
            self.initTeamInfoEvent();
            self.initTeamEditEvent();
            self.initMaterialEvent();
            self.initSuccessCase();

        },
        /*
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
                });
                $.ajaxSetup({//给所有的Ajax加加载层
                    beforeSend: function () {
                        $(".right_content_wrap").append(load);
                        $(".safe_right_content").append(load);
                        // $(".safe_right .loading").css('top', '70%');
                    },
                    complete: function () {
                        $(".right_content_wrap .loading").remove(); //关闭加载层
                        $(".safe_right_content .loading").remove(); //关闭加载层
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
                                $('.left_ul li').eq(7).append("<i>" + data.data.newmsgtotal + "</i>");
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
            HHIT_CENTERAPP.controller('mhomeCtrl', ['$scope', '$http', function ($scope, $http) {
                $(".Jforeman").html("我的主页");
                $('.left_ul li').eq(0).addClass('left_active').siblings().removeClass('left_active');
                getHomeInfoHandler.getInfoEvent();//获取工长店铺
                getHomeInfoHandler.getSafeEvent();//获取工长的安全等级
                getHomeInfoHandler.getEmailEvent();//获取工长的邮箱信息
                getHomeInfoHandler.getImgEvent();//获取工长的头像
                getUserAvatarHandler.getInfoEvent();//上传工长头像
            }]);
        },
        /*
         *  工长个人资料标题切换内容
         */
        initMDataEvent: function () {
            HHIT_CENTERAPP.controller('mDataCtrl', ['$scope', '$http', function ($scope, $http) {
                $(".Jforeman").html("个人资料");
                $('.left_ul li').eq(1).addClass('left_active').siblings().removeClass('left_active');
                // 加载城市插件
                $('[data-toggle="distpicker"]').distpicker();
                getMasterInfoHandler.getInfoEvent();//获取工长信息
            }]);
        },
        /*
         *  我的作品标题切换内容
         */
        initMWorkEvent: function () {
            HHIT_CENTERAPP.controller('mWorkCtrl', ['$scope', '$http', function ($scope, $http) {
                $(".Jforeman").html("我的作品");
                $('.left_ul li').eq(4).addClass('left_active').siblings().removeClass('left_active');
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
                        WUndonePageHandler.pageContentEvent();
                        WCompletePageHandler.pageContentEvent();
                    }
                }
                getWorkInfoHandler.workInfo();
            }]);
        },


        /*
         * 我的作品添加新作品
         */
        initMNewWorkEvent: function () {
            HHIT_CENTERAPP.controller('newworkCtrl', ['$scope', '$http', function ($scope, $http) {
                /* details */
                /* 年月日三级联动 */
                new YMDselect('year1', 'month1', 'day1');
                new YMDselect('year2', 'month2', 'day2');
                // 加载城市插件
                $('[data-toggle="distpicker"]').distpicker();
                //装修风格标签获取
                $.ajax({
                    type: "get",
                    url: TAGURL,
                    async: true,
                    dataType: "jsonp",
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            var tag = '<div class="new_stylecnt">';
                            $.each(data.data, function (i, v) {
                                tag += '<span>' + v.stylename + '</span>';
                            });
                            tag += '</div>';
                            $(".new_style").append(tag);
                            $(".new_stylecnt span").on("click", function () {
                                $(this).toggleClass("active").siblings().removeClass("active");
                            });
                        }
                    },
                    error: function (data) {
                    }
                });
                //添加新施工图片
                addPicture.constructionPic();
                //ajax上传提交修改
                $(".new_work_content .submit").on("click", function () {
                    ajaxSubmit.confirmAdd();
                });
                //点击隐藏错误信息
                removeError.clickEvent();
            }]);
        },
        /*
         * 成功案例数据初始化
         */
        initSuccessCase: function () {
            HHIT_CENTERAPP.controller('success_caseCtrl', ['$scope', '$http', function ($scope, $http) {
                /* 去掉头部多余的部分 */
                $("#menuNavOuter").remove();
                $("#headerWrapper").remove();
                var id;
                var case_id = sessionStorage.getItem("case_id");
                var isshopdetai = sessionStorage.getItem("isshopdetail");
                var userType = $.cookie('userType');
                if ($.base64.decode(userType) == 2 && isshopdetai != '0') {
                    id = $.base64.decode($.cookie('userId'));
                } else {
                    id = $.base64.decode($.cookie("foremanId"));
                }
                $.ajax({
                    type: "get",
                    url: WORKCURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        foreman_id: id
                    },
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            $.each(data.data, function (i, v) {
                                if (v.case_id == case_id) {
                                    $(".content_top h2 span").html(v.area);
                                    $(".content_top .include").html(v.housetype);
                                    $(".content_bottom .time").html(v.timelong);
                                    $(".content_bottom .address").html(v.address);
                                    var img = '<ul>';
                                    $.each(v.img, function (m, n) {
                                        img += '<li><img src="' + n.case_img + '"></li>';
                                    });
                                    img += '</ul>';
                                    $(".bg_picture").append(img);
                                    /* 切换图片 */
                                    superSlide.slidePic();
                                }
                            });
                        } else {
                            layer.msg(data.msg)
                        }
                    },
                    error: function (data) {
                    }
                });

                $.ajax({
                    url: SHOPCURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        shop_id: $.base64.decode($.cookie("userShopId"))
                    },
                    success: function (data) {
                        if (data && data.code == '000') {
                            if (data.data.shop_name != null && data.data.shop_name != '') {
                                $("#success_case .now_location .shopname").html(data.data.shop_name);//获取店铺名字
                            } else {
                                $("#success_case .now_location .shopname").html('无');
                            }
                        } else {
                            layer.alert(data.msg);
                        }
                    },
                    error: function (data) {
                    }
                });

            }]);
        },

        /*
         *  我的团队
         */
        initMTeamEvent: function () {
            HHIT_CENTERAPP.controller('mTeamCtrl', ['$scope', '$http', function ($scope, $http) {
                $(".Jforeman").html("我的团队");
                $('.left_ul li').eq(5).addClass('left_active').siblings().removeClass('left_active');
                getTeamInfoHandler.getInfoEvent();
            }]);
        },
        /*
         *  我的团队工人的具体信息
         */
        initTeamDetailEvent: function () {
            HHIT_CENTERAPP.controller('teamDetailCtrl', ['$scope', '$http', function ($scope, $http) {
                $('.left_ul li').eq(5).addClass('left_active').siblings().removeClass('left_active');
                var cate_id = sessionStorage.getItem("cateid");
                var eleworkernum = sessionStorage.getItem("eleworker_num");
                var woodworkernum = sessionStorage.getItem("woodworker_num");
                var brickworkernum = sessionStorage.getItem("brickworker_num");
                var paintworkernum = sessionStorage.getItem("paintworker_num");
                var mixworkernum = sessionStorage.getItem("mixworker_num");
                var box_total;
                switch (cate_id) {
                    case "1":
                        box_total = mixworkernum;
                        break;
                    case "2":
                        box_total = eleworkernum;
                        break;
                    case "3":
                        box_total = brickworkernum;
                        break;
                    case "4":
                        box_total = woodworkernum;
                        break;
                    case "5":
                        box_total = paintworkernum;
                        break;
                }
                $.ajax({
                    type: "get",
                    url: TEAMURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        shop_id: $.base64.decode($.cookie("userShopId")),
                        cate_id: cate_id,
                        page: 1,
                        limit: 5
                    },
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            var worker = '<div class="team_detail_content clearfix">';
                            $.each(data.data, function (i, v) {
                                worker += '<div class="worker_box sprite_team" data-id="' + v.userid + '" data-action="edit"><a href="#/master/teamDetail_list">';
                                worker += '<div class="head_picture"><img src="' + v.portrait_img + '"></div>';
                                worker += '<div class="worker_content"><h3><span class="name">' + v.name + '</span>';
                                worker += '<span class="age">' + v.age + '岁</span></h3>';
                                worker += '<ul class="worker_information"><li>';
                                worker += '<span class="span_left">籍贯</span><span class="span_right">' + v.birthplace + '</span></li>';
                                worker += '<li><span class="span_left">从业时间</span><span class="span_right">' + v.worktime + '</span></li>';
                                worker += '<li><span class="span_left">手机号</span><span class="span_right">' + v.phone + '</span></li>';
                                worker += '<li><span class="span_left">身份证号</span><span class="span_right">' + v.idcard + '</span></li>';
                                worker += '<li><span class="span_left">开户银行</span><span class="span_right">' + v.bankname + '</span></li>';
                                worker += '<li><span class="span_left">银行卡号</span><span class="span_right">' + v.bankcard + '</span></li>';
                                worker += '</ul></div></a></div>';
                            });

                            worker += '<div class="worker_box sprite_team worker_add" data-action="add"><a href="#/master/teamDetail_edit"></a></div></div>';
                            $(".team_detail_wrap .page_number").before(worker);
                            $(".team_detail_content .worker_box").on("click", function () {
                                var id = $(this).attr("data-id");
                                var action = $(this).attr("data-action");
                                sessionStorage.setItem("userid", id);
                                sessionStorage.setItem("action", action);
                            });
                            workpageHandler.pageContentEvent(box_total, cate_id); //分页
                        } else {
//                          layer.msg(data.msg)
                            var worker = '<div class="team_detail_content clearfix">';
                            worker += '<div class="worker_box sprite_team worker_add" data-action="add"><a href="#/master/teamDetail_edit"></a></div></div>';
                            $(".team_detail_wrap .page_number").before(worker);
                            $(".team_detail_content .worker_box").on("click", function () {
                                var action = $(this).attr("data-action");
                                sessionStorage.setItem("action", action);
                            });
                        }
                    },
                    error: function (data) {
                    }
                });
            }]);
        },

        /*
         * 我的员工详细资料
         */
        initTeamInfoEvent: function () {
            HHIT_CENTERAPP.controller('teamDetail_listCtrl', ['$scope', '$http', function ($scope, $http) {
                /* details */
                var cate_id = sessionStorage.getItem("cateid");
                var worker_id = sessionStorage.getItem("userid");
                $('.left_ul li').eq(5).addClass('left_active').siblings().removeClass('left_active');
                $.ajax({
                    type: "get",
                    url: WORKERINFOURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        cate_id: cate_id,
                        worker_id: worker_id
                    },
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            $(".staff_bg img").attr("src", "" + data.data.portrait_img + "");
                            $(".staff_top_info .wname .span_val").html(data.data.name);
                            $(".staff_top_info .wage .span_val").html(data.data.age);
                            $(".staff_top_info .wplace .span_val").html(data.data.birthplace);
                            $(".staff_top_info .wtime .span_val").html(data.data.worktime);
                            $(".staff_top_info .wphone .span_val").html(data.data.phone);
                            $(".staff_top_info .wid_number .span_val").html(data.data.idcard);
                            $(".staff_top_info .wbank_name .span_val").html(data.data.bankname);
                            $(".staff_top_info .wbank_account .span_val").html(data.data.bankcard);
                            var detail = "<ul>";
                            $.each(data.data.pricelist, function (i, v) {
                                $.each(v.service, function (m, n) {
                                    detail += '<li><span class="name">' + n.servicename + '</span>';
                                    detail += '<span class="unit">' + n.unit + '</span>';
                                    detail += '<span class="num">' + n.cost + '</span></li>';
                                });
                            });
                            detail += '</ul>';
                            $(".staff_bottom_content").append(detail);

                        } else {
                            layer.msg(data.msg)
                        }
                    },
                    error: function (data) {

                    }
                });
            }]);
        },
        /*
         * 编辑我的员工资料
         */
        initTeamEditEvent: function () {
            HHIT_CENTERAPP.controller('teamDetail_editCtrl', ['$scope', '$http', function ($scope, $http) {
                $('.left_ul li').eq(5).addClass('left_active').siblings().removeClass('left_active');
                /* details */
                //显示价格明细
                loadDetail.showInformation();
                var perform = sessionStorage.getItem("action"); //当前是编辑还是新增
                if (perform == "edit") {
                    getInformation.workDetail();
                } else {
                    $('.staff_picture .add_picture').find('input').change(function () {
                        var inputImg = $(this);
                        inputImg.parent().parent().attr("data-flag", "0");
                        var file = inputImg.get(0).files[0];
                        var reader = new FileReader();
                        if (!/image\/\w+/.test(file.type)) {
                            inputImg.parent().parent().css('background', '');
                            inputImg.parent().parent().removeClass('clear');
                            layer.alert("请确保文件为图像类型");
                            inputImg.val(''); //清空file选择的文件
                            return false;
                        }
                        // onload是异步操作
                        else {
                            reader.onload = function (e) {
                                inputImg.parent().parent().attr("data-flag", "1");
                                inputImg.parent().parent().addClass('clear'); //图片预览时input file 添加opacity样式，设置完全透明
                                inputImg.parent().siblings(".close").show();
                                inputImg.parent().parent().css({
                                    'background': 'url("' + e.target.result + '") no-repeat',
                                    'backgroundSize': '100% 100%'
                                }); //图片设置为$('.showImg')背景图
                                /* 点击叉叉图片取消事件 */
                                $('.close').on("click", function () {
                                    $(this).parent().removeClass('clear');
                                    $(this).parent().css('background', '');
                                    $(this).hide();
                                });
                            }
                        }
                        reader.readAsDataURL(file);
                    });
                    $(".staff_confirm").on("click", function () {
                        workerAction.addWorker(); //增加工人
                    });
                }

            }]);
        },
        /*
         *  店铺资料
         */
        initMShopEvent: function () {
            HHIT_CENTERAPP.controller('mShopCtrl', ['$scope', '$http', function ($scope, $http) {
                $(".Jforeman").html("店铺资料");
                $('.left_ul li').eq(2).addClass('left_active').siblings().removeClass('left_active');
                getShopInfoHandler.shopInfo();
            }]);
        },
        /*
         *  我的钱包提现
         */
        initWithdrawEvent: function () {
            getWithdrawInfoHandler.getInfoEvent();
        },
        /*
         *  我的钱包我的银行卡
         */
        initBankEvent: function () {
            getBankInfoHandler.getInfoEvent();
            getBankInfoHandler.getNameEvent();
            getBankInfoHandler.getLogoEvent();
            getBankInfoHandler.sendCaptcha();
        },
        /*
         * 我的钱包账单明细
         */
        initBillEvent: function () {
            HHIT_CENTERAPP.controller('billCtrl', ['$scope', '$http', function ($scope, $http) {
                $(".Jforeman").html("我的钱包");
                $('.left_ul li').eq(8).addClass('left_active').siblings().removeClass('left_active');
                getWalletData.getMoney();
                getNearByMonth.fiveMonth();
                getBillInfoHandler.getInfoEvent();
            }]);
        },
        /*
         *  我的订单
         */
        initMOrderEvent: function () {
            HHIT_CENTERAPP.controller('mOrderCtrl', ['$scope', '$http', function ($scope, $http) {
                $(".Jforeman").html("我的订单");
                $('.left_ul li').eq(3).addClass('left_active').siblings().removeClass('left_active');
                orderList.getInfoEvent();
                orderFilter.getEvent();
            }]);
        },
        /*
         *  我的订单进度更新后续内容
         */
        initOrderProcessEvent: function () {
            getOrderProcessHandler.getInfoEvent();
            getOrderBudgetHandler.getInfoEvent();
        },
        /*
         * 材料清单
         */
        initMaterialEvent: function () {
            HHIT_CENTERAPP.controller('materialCtrl', ['$scope', '$http', function ($scope, $http) {
                var time;
                var name;
                var phone;
                var address;
                var type;
                var area;
                var src;
                $("#menuNavOuter").remove();
                var orderId = sessionStorage.getItem("orderId");
                $.ajax({
                    type: "get",
                    url: BASICINFOURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        shop_id: $.base64.decode($.cookie("userShopId")),
                        order_id: orderId
                    },
                    success: function (data) {
                        if (data != null && data.code == '000') {

                            time = data.data.order_list[0].order_time;
                            name = data.data.order_list[0].user_realname;
                            phone = data.data.order_list[0].user_phone;
                            address = data.data.order_list[0].order_address;
                            type = data.data.order_list[0].room + "室" + data.data.order_list[0].parlour + "厅" + data.data.order_list[0].toilet + "卫" + data.data.order_list[0].balcony + "阳台";
                            area = data.data.order_list[0].area;
                            src = data.data.order_list[0].user_portrait;

                            $(".owner_content .owner_picture img").attr("src", src);
                            $(".owner_summary h3").html(name);
                            $(".owner_summary p span").html(phone);
                            $(".owner_left .area span").html(area);
                            $(".owner_left .order p").html(orderId);
                            $(".owner_middle .type p").html(type);
                            $(".owner_middle .time p").html(time);
                            $(".owner_right .address p").html(address);
                        } else {
                            layer.msg(data.msg)
                        }
                    },
                    error: function (data) {
                    }
                });
                /* 获得具体材料清单 */
                MaterialList.getList();
            }]);
        },

        /*
         * 消息中心初始化
         */
        initMsgInfo: function () {
            HHIT_CENTERAPP.controller('msginfoCtrl', ['$scope', '$http', function ($scope, $http) {
                $(".Jforeman").html("消息中心");
                $('.left_ul li').eq(7).addClass('left_active').siblings().removeClass('left_active');
                initInfo.info();
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

    /*
     * 我的订单筛选
     */
    orderFilter = {
        getEvent: function () {
            var _arrowli = $(".order_title div").eq(6).find("ul li");//全部后面的小三角形里的内容
            var orderStatus = 0;
            $(_arrowli).click(function () {
                if ($(this).html() == '待确认') {
                    orderStatus = 1;
                } else if ($(this).html() == '待上门量房') {
                    orderStatus = 3;
                } else if ($(this).html() == '待用户预支付') {
                    orderStatus = 4;
                } else if ($(this).html() == '订单进行中') {
                    orderStatus = 5;
                } else if ($(this).html() == '已完成') {
                    orderStatus = 6;
                }
                console.log(orderStatus);
                $.ajax({
                    url: ORDERFILTERURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        shop_id: $.base64.decode($.cookie("userShopId")),
                        order_status: orderStatus,
                        page: 1,
                        limit: 3
                    },
                    success: function (data) {
                        if (data && data.code == '000') {
                            var vrStr = "";
                            ORDERFILTERTOTAL = data.data.order_count;
                            $.each(data.data.order_list, function (i, v) {
                                if (data.data.order_list[i].order_status == '1') {
                                    data.data.order_list[i].order_status = '待确认';
                                } else if (data.data.order_list[i].order_status == '2') {
                                    data.data.order_list[i].order_status = '待预约';
                                } else if (data.data.order_list[i].order_status == '3') {
                                    data.data.order_list[i].order_status = '待上门量房';
                                } else if (data.data.order_list[i].order_status == '4') {
                                    data.data.order_list[i].order_status = '待用户预支付';
                                } else if (data.data.order_list[i].order_status == '5') {
                                    data.data.order_list[i].order_status = '订单进行中';
                                } else if (data.data.order_list[i].order_status == '6') {
                                    data.data.order_list[i].order_status = '已完成';
                                }
                                vrStr += spliceOrderContent.spliceStrEvent(v);
                                $(".order_wrap").html(vrStr);
                            });
                            OrderPageHandler.pageContentEvent(ORDERFILTERTOTAL, ORDERFILTERURL, {
                                shop_id: $.base64.decode($.cookie("userShopId")),
                                order_status: orderStatus,
                                page: 1,
                                limit: 3
                            });
                        } else {
                            layer.msg(data.msg);
                        }
                    },
                    error: function (data) {
                        layer.alert(data.msg);
                    }
                });
            });
        }
    };

    /* 获取我的订单列表 */
    orderList = {
        getInfoEvent: function () {
            console.log($.base64.decode($.cookie("userShopId")))
            $.ajax({
                url: ORDERURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    shop_id: $.base64.decode($.cookie("userShopId")),
                    page: 1,
                    limit: 3
                },
                success: function (data) {
                    if (data && data.code == '000') {
                        console.log(data.data);
                        ORDERTOTAL = data.data.order_count;
                        $(".order_wrap").empty();
                        var vrStr = "";
                        $.each(data.data.order_list, function (i, v) {
                            /* 判断当前状态 */
                            if (data.data.order_list[i].order_status == '1') {
                                data.data.order_list[i].order_status = '待确认';
                            } else if (data.data.order_list[i].order_status == '2') {
                                data.data.order_list[i].order_status = '待预约';
                            } else if (data.data.order_list[i].order_status == '3') {
                                data.data.order_list[i].order_status = '待上门量房';
                            } else if (data.data.order_list[i].order_status == '4') {
                                data.data.order_list[i].order_status = '待用户预支付';
                            } else if (data.data.order_list[i].order_status == '5') {
                                data.data.order_list[i].order_status = '订单进行中';
                            } else if (data.data.order_list[i].order_status == '6') {
                                data.data.order_list[i].order_status = '已完成';
                            } else if (data.data.order_list[i].order_status == '7') {
                                data.data.order_list[i].order_status = '已取消';
                            } else if (data.data.order_list[i].order_status == '8') {
                                data.data.order_list[i].order_status = '工长店铺取消';
                            }
                            vrStr += spliceOrderContent.spliceStrEvent(v);
                            $(".order_wrap").html(vrStr);
                        });

                        OrderPageHandler.pageContentEvent(ORDERTOTAL, ORDERURL, {
                            shop_id: $.base64.decode($.cookie("userShopId")),
                            page: 1,
                            limit: 3
                        });
                        /* 我的订单点击小三角事件 */
                        arrowClick.getEvent();
                    } else if (data.code == '205') {
                        $('#orderContent').remove();
                        $('.not_information').show().removeClass('hide');
                        $('.not_information_text').html('您的订单空空如也~~');
                    }
                },
                error: function (data) {
                    layer.alert(data.msg);
                }
            });

            $(document).off('click', '.progress_updates').on('click', '.progress_updates', function (e) {
                var sHtml = $(e.target).parents('.block').find('.stage span').html();
                if (sHtml == '已取消' || sHtml == '工长店铺取消') {
                    layer.msg('您现在的订单状态还不能点击~~');
                } else {
                    sessionStorage.setItem("status", $(e.target).parents('.order_box').attr('status'));
                    sessionStorage.setItem("step", $(e.target).parents('.order_box').attr('step'));
                    sessionStorage.setItem("orderId", $(e.target).parents('.order_box').attr('orderId'));
                    window.location.href = 'order.html#/order';
                }
            });
        }
    };

    /* 我的订单进度更新 */
    getOrderProcessHandler = {
        getInfoEvent: function () {
            HHIT_CENTERAPP.controller('order', ['$scope', '$http', function ($scope, $http) {
                $('#menuNavOuter').remove();
                /* 年月日三级联动 */
                new YMDselect('year1', 'month1', 'day1');

                var step;
                var status;
                var orderId = sessionStorage.getItem("orderId");
                var budgetState;//定义预算单编辑状态
                var statementStatus;//定义结算单编辑状态
                var houseStyle;//定义装修风格

                function change() {
                    $.ajax({
                        url: BASICINFOURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            shop_id: $.base64.decode($.cookie("userShopId")),
                            order_id: orderId
                        },
                        success: function (data) {
                            if (data && data.code == '000') {
                                console.log(data.data);

                                step = data.data.order_list[0].order_step;
                                status = data.data.order_list[0].order_status;

                                orderStatus();
                            }
                        }
                    });
                }

                change();


                /* 获取订单列表的订单步骤 */
                // var step = sessionStorage.getItem("step");
                // var status = sessionStorage.getItem("status");


                /* 根据status判断进度更新进去页面的状态 */
                function orderStatus() {
                    if (status == '1' || status == '2') {//待确认与待预约情况下不可以编辑，只可以看
                        /* 从后台得到用于预约上门时间 */
                        $.ajax({
                            url: APPOINTMENTURL,
                            type: "GET",
                            async: true,
                            dataType: 'jsonp',
                            data: {
                                order_id: orderId
                            },
                            success: function (data) {
                                console.log(data);
                                if (data.code == "000") {
                                    $("#Ju").val(data.data.user_id);
                                    var vrstr = '';
                                    if (data.data.reservation_time1 != null && data.data.reservation_time1 != "") {
                                        vrstr += '<span class="reservation_time">' + data.data.reservation_time1 + '</span>';
                                    }
                                    if (data.data.reservation_time2 != null && data.data.reservation_time2 != "") {
                                        vrstr += '<span class="reservation_time">' + data.data.reservation_time2 + '</span>';
                                    }
                                    $(".whetherOrders_style").append(vrstr);
                                    $('.reservation_time').addClass("cursor");
                                }
                            }
                        });
                        $('.order_wrap input').attr("disabled", "disabled");
                        $('#whetherOrders_sure').attr("disabled", false).addClass("bg_eec988");
                        $('#whetherOrders_cancel').attr("disabled", false).addClass("border_eec988").addClass("col_eec988");
                        $(document).on("click", ".whetherOrders_style span", function () {
                            if ($(this).hasClass("on")) {
                                $(this).removeClass("border_eec988").removeClass("col_eec988").removeClass("on");
                            } else {
                                $(this).addClass("border_eec988").addClass("col_eec988").addClass("on");
                                $(this).siblings("span").removeClass("border_eec988").removeClass("col_eec988").removeClass("on");
                            }
                        });
                        $(document).on("click", "#whetherOrders_sure", function () {
                            var Ju = $("#Ju").val();
                            var flag = false;
                            var confirmTime = [];
                            $.each($(".whetherOrders_style span"), function (i, v) {
                                console.log(v);
                                if ($(v).hasClass("on")) {
                                    flag = true;
                                    confirmTime.push($(v).index())
                                }
                            });
                            if (flag) {
                                // 可以接单MONTHLYREPORTURL
                                console.log(confirmTime);
                                $.ajax({
                                    url: CONFIRMURL,
                                    type: "GET",
                                    async: true,
                                    dataType: 'jsonp',
                                    data: {
                                        order_id: orderId,
                                        user_id: Ju,
                                        confirm_time: confirmTime[0]
                                    },
                                    success: function (data) {
                                        console.log(data);
                                        if (data.code == "000") {
                                            layer.msg("接单成功");
                                            window.location.href = 'master.html#/master/morder';
                                        }
                                    }
                                });
                            } else {
                                layer.msg('请先选择上门时间~~');
                            }
                        });
                        // 取消订单
                        $(document).on("click", "#whetherOrders_cancel", function () {
                            var Ju = $("#Ju").val();
                            $.ajax({
                                url: DESTORYURL,
                                type: "GET",
                                async: true,
                                dataType: 'jsonp',
                                data: {
                                    order_id: orderId,
                                    user_id: Ju
                                },
                                success: function (data) {
                                    console.log(data);
                                    if (data.code == "000") {
                                        layer.msg(data.msg);
                                        window.close();
                                    }
                                }
                            });
                        });
                    } else if (status == '3') {//待上门量房可以编辑进场准备的预算单
                        $.ajax({
                            url: APPOINTMENTURL,
                            type: "GET",
                            async: true,
                            dataType: 'jsonp',
                            data: {
                                order_id: orderId
                            },
                            success: function (data) {
                                console.log(data);
                                if (data.code == "000") {
                                    $("#Ju").val(data.data.user_id);
                                    $(".whetherOrders_style p ").html("您的上门时间为");
                                    if (data.data.confirm_time == 1) {
                                        var vrstr = '<span class="reservation_time">' + data.data.reservation_time1 + '</span>';
                                    } else if (data.data.confirm_time == 2) {
                                        var vrstr = '<span class="reservation_time">' + data.data.reservation_time2 + '</span>';
                                    }
                                    $(".whetherOrders_style span").remove();
                                    $(".whetherOrders_style").append(vrstr);
                                    $("#whetherOrders_cancel").addClass("centerit").val("已接单");
                                    $("#whetherOrders_sure").remove();
                                }
                            }
                        });
                        $('.order_wrap input').attr("disabled", "disabled");
                        $('#order_edit').attr("disabled", false);
                    } else if (status == '4') {//待用户预支付可以查看
                        $.ajax({
                            url: APPOINTMENTURL,
                            type: "GET",
                            async: true,
                            dataType: 'jsonp',
                            data: {
                                order_id: orderId
                            },
                            success: function (data) {
                                console.log(data);
                                if (data.code == "000") {
                                    $("#Ju").val(data.data.user_id);
                                    $(".whetherOrders_style p ").html("您的上门时间为");
                                    if (data.data.confirm_time == 1) {
                                        var vrstr = '<span class="reservation_time">' + data.data.reservation_time1 + '</span>';
                                    } else if (data.data.confirm_time == 2) {
                                        var vrstr = '<span class="reservation_time">' + data.data.reservation_time2 + '</span>';
                                    }
                                    $(".whetherOrders_style span").remove();
                                    $(".whetherOrders_style").append(vrstr);
                                    $("#whetherOrders_cancel").addClass("centerit").val("已接单");
                                    $("#whetherOrders_sure").remove()
                                }
                            }
                        });
                        $('.order_wrap input').attr("disabled", "disabled");
                        $('#order_edit').attr("disabled", false).addClass("border_eec988").addClass("col_eec988").addClass("new_edit");
                        $('#order_edit').val('查看' + $('#order_edit').val().substr(2, 5));
                    } else if (status == '5') {//订单进行中
                        console.log(step);
                        $('.whetherOrders').hide();
                        switch (step) {
                            case "1":
                                /* 在没有选择风格之前后面的状态都不能点击 */
                                $('.order_process input').attr("disabled", "disabled");
                                //可以查看预算单
                                $('#order_edit').attr("disabled", false).addClass('new_edit');
                                //提醒工长需要先添加风格
                                if (houseStyle != null && houseStyle != '' && houseStyle != undefined) {
                                    $('.order_increase').eq(0).attr("disabled", false);
                                } else {
                                    layer.alert('您需要先选择装修风格哦~~');
                                }
                                /* 点击选择风格 */
                                $('#confirm_type').click(function () {
                                    var styleVal = $('#testSelect').val();//获取select的值
                                    /* 向后台传送装修风格数据 */
                                    $.ajax({
                                        url: HOUSESTYLEURL,
                                        type: "GET",
                                        async: true,
                                        dataType: 'jsonp',
                                        data: {
                                            order_id: orderId,
                                            house_style: styleVal
                                        },
                                        success: function (data) {
                                            if (data && data.code == '000') {
                                                $('.order_process input').attr("disabled", false);// 恢复按钮点击
                                                $('.process_style p').html(styleVal);
                                                $('#confirm_type').hide();//隐藏按钮
                                                $('#testSelect').hide();//隐藏select框
                                            }
                                        }
                                    });
                                });
                                for (var i = 1; i < 18; i++) {//判断后面的能不能点击
                                    $('.order_edit').eq(i).addClass('determine_process');
                                    $('.order_increase').eq(i).addClass('add_process');
                                }
                                submitOrderProgress.getInfoEvent();//点击提交进程按钮
                                break;
                            case "2":
                            case "3":
                            case "6":
                            case "7":
                            case "10":
                            case "11":
                            case "14":
                            case "15":
                                $('.order_increase').eq(parseInt(step) - 1).attr('disabled', false);
                                for (var i = 0; i < parseInt(step) - 1; i++) {
                                    $('.process_center').eq(i).find('img').attr('src', 'image/order_success.png');
                                    $('.order_increase').eq(i).hide();
                                    $('.detail_a').eq(i).css('display', 'block').removeClass('hide');
                                    if (budgetState == '0') {
                                        $('#order_edit').addClass('new_edit');
                                    }
                                    if (statementStatus == '0') {
                                        $('.order_edit ').eq(i + 1).addClass('new_edit');
                                    }
                                    $('.order_edit ').eq(i).val('查看' + $('.order_edit ').eq(i).val().substr(2, 5));
                                }
                                for (var i = parseInt(step); i < 18; i++) {//判断后面的能不能点击
                                    $('.order_edit').eq(i).addClass('determine_process');
                                    $('.order_increase').eq(i).addClass('add_process');
                                }
                                submitOrderProgress.getInfoEvent();//点击提交进程按钮
                                break;
                            case "4":
                            case "8":
                            case "12":
                            case "16":
                                $('.order_edit').eq(parseInt(step)).attr('disabled', 'disabled');
                                $('.order_increase').eq(parseInt(step) - 1).attr('disabled', false);
                                for (var i = 0; i < parseInt(step); i++) {
                                    $('.process_center').eq(i).find('img').attr('src', 'image/order_success.png');
                                    $('.order_increase').eq(i).hide();
                                    $('.detail_a').eq(i).css('display', 'block').removeClass('hide');
                                    if (budgetState == '0') {
                                        $('#order_edit').addClass('new_edit');
                                    }
                                    if (statementStatus == '0') {
                                        $('.order_edit ').eq(i + 1).addClass('new_edit');
                                    }
                                    $('.order_edit ').eq(i).val('查看' + $('.order_edit ').eq(i).val().substr(2, 5));
                                }
                                for (var i = parseInt(step) + 1; i < 18; i++) {//判断后面的能不能点击
                                    $('.order_edit').eq(i).addClass('determine_process');
                                    $('.order_increase').eq(i).addClass('add_process');
                                }
                                submitOrderProgress.getInfoEvent();//点击提交进程按钮
                                break;
                            case "5":
                            case "9":
                            case "13":
                            case "17":
                                for (var i = 0; i < parseInt(step); i++) {
                                    if (i != step - 1) {
                                        $('.process_center').eq(i).find('img').attr('src', 'image/order_success.png');
                                    }
                                    $('.order_increase').eq(i).hide();
                                    $('.detail_a').eq(i).css('display', 'block').removeClass('hide');
                                    if (budgetState == '0') {
                                        $('#order_edit').addClass('new_edit');
                                    }
                                    if (statementStatus == '0') {
                                        $('.order_edit ').eq(i + 1).addClass('new_edit');
                                        $('.order_edit ').eq(i + 1).val('查看' + $('.order_edit ').eq(i + 1).val().substr(2, 5));
                                    }
                                    if (i != 0) {
                                        $('.order_edit ').eq(i - 1).val('查看' + $('.order_edit ').eq(i - 1).val().substr(2, 5));
                                    }

                                }
                                for (var i = parseInt(step); i < 18; i++) {//判断后面的能不能点击
                                    $('.order_edit').eq(i).addClass('determine_process');
                                    $('.order_increase').eq(i).addClass('add_process');
                                }
                                submitOrderProgress.getInfoEvent();//点击提交进程按钮
                                break;
                            default:
                                break;
                        }
                    } else if (status == '6') {//已完成
                        $('.whetherOrders').hide();
                        for (var i = 0; i < 17; i++) {
                            $('.process_center').eq(i).find('img').attr('src', 'image/order_success.png');
                            $('.order_increase').eq(i).hide();
                            $('.detail_a').eq(i).css('display', 'block').removeClass('hide');
                            $('.order_edit ').eq(i).addClass('new_edit');
                            $('.order_edit ').eq(i).val('查看' + $('.order_edit ').eq(i).val().substr(2, 5));
                        }
                        $('.order_wrap input').attr("disabled", false);
                    } else {
                        $('#order_edit').attr("disabled", false);
                        $('#order_edit').val('查看' + $('#order_edit').val().substr(2, 5));
                    }

                }

                /* 点击编辑预算结算单 */
                $('.order_edit').click(function () {
                    if ($(this).hasClass('determine_process')) {
                        layer.msg('亲，你需要先完成上一步~~');
                    }
                    else if ($(this).hasClass('new_edit')) {
                        sessionStorage.setItem("num", '0');
                        window.location.href = 'editSheet.html#/budget_sheet';
                    }
                    else {
                        //跳转
                        sessionStorage.setItem("num", '1');
                        window.location.href = 'editSheet.html#/budget_sheet';//跳转到预算单页面
                    }
                });

                /*点击进场添加按钮*/
                $('.order_increase').click(function () {
                    var budgetState = sessionStorage.getItem("budgetState");
                    if ($(this).hasClass('add_process')) {
                        layer.msg('亲，你需要先完成上一步~~');
                    } else if (budgetState == '1' && step == '18') {//如果预算单是可编辑状态则添加不能点击
                        $('#pre_add1').attr('disabled', 'disabled');
                    } else if ($(this).hasClass('approach')) {
                        var NUM = $(this).parent(".order_process");
                        $(this).addClass('upload');
                        $(this).siblings('.detail_a').addClass('detail_upload');
                        $('.add_technology').show().removeClass('hide');
                        $('.wrap').show().removeClass('hide');
                        $('.add_technology').css('top', ($(window).height() - NUM.outerHeight()) / 2 + $(document).scrollTop() - 100);
                        orderStartWork.upload();//添加开工日期与图片
                    } else {
                        /* 工种 */
                        sessionStorage.setItem("type", $(this).parent('.order_process').find('.process_title').attr('typename'));
                        window.location.href = 'material.html#/material/list';//跳转到材料单页面
                    }
                });

                /*进场添加弹框消失*/
                $('#add_close').click(function () {
                    $('.add_technology').hide();
                    $('.wrap').hide();
                });

                /* 点击查看详情 */
                $('.detail_a ').click(function () {
                    if ($(this).hasClass('detail_m')) {
                        /* 工种 */
                        sessionStorage.setItem("type", $(this).parent('.order_process').find('.process_title').attr('typename'));
                        sessionStorage.setItem("isClick", '0');
                        window.location.href = 'material.html#/material/list';//跳转到材料单页面
                    } else {
                        var NUM = $(this).parent(".order_process");
                        $('.see_details').show().removeClass('hide');
                        $('.wrap').show().removeClass('hide');
                        $('.see_details').css('top', ($(window).height() - NUM.outerHeight()) / 2 + $(document).scrollTop() - 100);

                        var $index = $(this).parents('.order_process').index() - 1;
                        if ($index == 5 || $index == 9 || $index == 13 || $index == 17) {
                            $index = $index - 1;
                        }
                        orderDeatilWork.detail($index);
                    }

                });
                /* 查看详情关闭 */
                $('.complete').click(function () {
                    $('.see_details').hide();
                    $('.wrap').hide();
                });


                /* 获取业主信息 */
                $.ajax({
                    type: "get",
                    url: BASICINFOURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        shop_id: $.base64.decode($.cookie("userShopId")),
                        order_id: orderId
                    },
                    success: function (data) {
                        console.log(data);
                        if (data != null && data.code == '000') {
                            time = data.data.order_list[0].order_time;
                            name = data.data.order_list[0].user_realname;
                            phone = data.data.order_list[0].user_phone;
                            address = data.data.order_list[0].order_address;
                            type = data.data.order_list[0].room + "室" + data.data.order_list[0].parlour + "厅" + data.data.order_list[0].toilet + "卫" + data.data.order_list[0].balcony + "阳台";
                            area = data.data.order_list[0].area;
                            src = data.data.order_list[0].user_portrait;

                            $(".owner_summary h3").html(name);
                            $(".owner_summary p span").html(phone);
                            $(".owner_left .area span").html(area);
                            $(".owner_left .order p").html(orderId);
                            $(".owner_middle .type p").html(type);
                            $(".owner_middle .time p").html(time);
                            $(".owner_right .address p").html(address);
                        } else {
                            layer.msg(data.msg)
                        }
                    },
                    error: function (data) {
                    }
                });

                /* 查询预结算单编辑状态 */
                $.ajax({
                    url: SELSTATUSURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        order_id: orderId
                    },
                    success: function (data) {
                        console.log(data);
                        if (data && data.code == '000') {
                            console.log(data.data);
                            /* 预算单状态 */
                            budgetState = data.data['预算单编辑状态'];
                            // sessionStorage.setItem("budgetState", data.data['预算单编辑状态']);
                            /* 结算单状态 */
                            statementStatus = data.data['结算单编辑状态'];
                            // sessionStorage.setItem("statementStatus", data.data['结算单编辑状态']);
                            orderStatus();
                        } else if (data && data.code == '200') {

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
                        order_id: orderId
                    },
                    success: function (data) {
                        if (data && data.code == '000') {
                            console.log(data.data);
                            if (data.data['装修风格'] != null) {
                                $('.process_style p').html(data.data['装修风格']);
                                $('#confirm_type').hide();//隐藏按钮
                                $('#testSelect').hide();//隐藏select框
                                houseStyle = data.data['装修风格'];
                                orderStatus();
                                if (step == 1) {
                                    $('#pre_add1').attr("disabled", false);// 恢复按钮点击
                                    $('#order_edit').attr("disabled", false);// 恢复按钮点击
                                }
                            }
                        }
                    },
                    error: function (data) {
                    }
                });


            }]);
        }
    };

    /* 我的订单进度更新编辑预算单 */
    getOrderBudgetHandler = {
        getInfoEvent: function () {
            HHIT_CENTERAPP.controller('edit_sheetCtrl', ['$scope', '$http', function ($scope, $http) {
                $('#menuNavOuter').remove();
                var orderId = sessionStorage.getItem("orderId");
                var step;
                var num = sessionStorage.getItem("num");
                $.ajax({
                    url: BASICINFOURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        shop_id: $.base64.decode($.cookie("userShopId")),
                        order_id: orderId
                    },
                    success: function (data) {
                        if (data && data.code == '000') {
                            console.log(data.data);
                            step = data.data.order_list[0].order_step;

                            if (step == '18') {
                                $('.sheet_right input').attr("disabled", "disabled");
                                $('.after_submit').attr("disabled", "disabled");
                            } else {
                                /* 点击结算单只可以填写施工后的数据 */
                                $('.sheet_left input').attr("disabled", "disabled");
                                $('.before_submit').attr("disabled", "disabled");
                                $('.foreman').attr("disabled", "disabled");
                            }
                        }
                    }
                });
                /* input框如果输入的是负值 */
                $(document).on('blur', 'input[type=number]', function (e) {
                    var val = $(e.target).val();
                    if (parseInt(val) < 0) {
                        $(e.target).css('borderColor', 'red');
                        layer.tips('数字不能为负!', $(e.target), {
                            tips: [2, 'red'],
                            tipsMore: true,
                            time: 1000
                        });
                    } else {
                        $(e.target).css('borderColor', '#D4D4D4');
                    }
                });

                /* 获取预算单结算单字段 */
                $.ajax({
                    url: LISTNAMEURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        shop_id: $.base64.decode($.cookie("userShopId"))
                    },
                    success: function (data) {
                        if (data && data.code == '000') {
                            //console.log(data.data);
                            $.each(data.data, function (i, v) {
                                if (v.category == '杂工') {
                                    $('.handyman_ul').append('<li> <span class="servicename">' + v.servicename + '</span> <span class="unit"><b>' + v.cost + '</b>元/<i>' + v.unit + '</i></span> <input type="number" bid="' + v.id + '"> </li>')
                                } else if (v.category == '水电工') {
                                    $('.plumber_ul').append('<li> <span class="servicename">' + v.servicename + '</span> <span class="unit"><b>' + v.cost + '</b>元/<i>' + v.unit + '</i></span> <input type="number" bid="' + v.id + '"> </li>')
                                } else if (v.category == '瓦工') {
                                    $('.bricklayer_ul').prepend('<li> <span class="servicename">' + v.servicename + '</span> <span class="unit"><b>' + v.cost + '</b>元/<i>' + v.unit + '</i></span> <input type="number" bid="' + v.id + '"> </li>')
                                } else if (v.category == '木工') {
                                    $('.wood_ul').prepend('<li> <span class="servicename">' + v.servicename + '</span> <span class="unit"><b>' + v.cost + '</b>元/<i>' + v.unit + '</i></span> <input type="number" bid="' + v.id + '"> </li>')
                                } else if (v.category == '油漆工') {
                                    $('.painter_ul').append('<li> <span class="servicename">' + v.servicename + '</span> <span class="unit"><b>' + v.cost + '</b>元/<i>' + v.unit + '</i></span> <input type="number" bid="' + v.id + '"> </li>')
                                } else if (v.category == '工长') {
                                    $('.foreman_ul').append('<li> <span class="servicename">' + v.servicename + '</span> <span class="unit"><b>' + v.cost + '</b>元/<i>' + v.unit + '</i></span> <input type="number" bid="' + v.id + '" class="foreman"> </li>')
                                }
                            })
                        }
                        /* 进场准备点击预算单只可以填写施工前的数据 */
                        /* 获取订单列表的订单步骤 */
                        // var step = sessionStorage.getItem("step");


                        /* 获取结算单预算单信息 */
                        $.ajax({
                            url: SELDATAURL,
                            type: "GET",
                            async: true,
                            dataType: 'jsonp',
                            data: {
                                order_id: orderId
                            },
                            success: function (data) {
                                console.log(data)
                                if (data && data.code == '000') {
                                    console.log(data.data);
                                    $('#before_remark').val(data.data['预算单数据'][0].remark);
                                    $('#after_remark').val(data.data['结算单数据'][0].remark);
                                    var $list = data.data['预算单数据'][0];
                                    $('.sheet_left input[bid="64"]').val(data.data['预算单数据'][0].foreman_price);
                                    $.each($list, function (i, v) {
                                        if (i.indexOf('service') >= 0) {
                                            $('.sheet_left input[bid="' + i.substring(7) + '"]').val(v);
                                        }
                                    });
                                    var $bill = data.data['结算单数据'][0];
                                    $('.sheet_right input[bid="64"]').val(data.data['结算单数据'][0].foreman_price);
                                    $.each($bill, function (i, v) {
                                        if (i.indexOf('service') >= 0) {
                                            $('.sheet_right input[bid="' + i.substring(7) + '"]').val(v);
                                        }
                                    })
                                }
                            },
                            error: function (data) {
                            }
                        });

                        /* 如果变成查看结算预算单就让所有的input框disabled */
                        if (num == '0') {
                            $('.construction_sheet input').attr("disabled", "disabled");
                        }
                        //  else {
                        //     // $('.after_submit').click(function () {
                        //     //     var billObj = {};
                        //     //     /* 获取json数据 */
                        //     //     var $right = $('.sheet_right input[type="number"]');
                        //     //     $.each($right, function (i, v) {
                        //     //         billObj[parseInt($(v).attr('bid') - 1)] = $(v).val();
                        //     //     });
                        //     //     $.ajax({
                        //     //         url: UPDATEURL,
                        //     //         type: "GET",
                        //     //         async: true,
                        //     //         dataType: 'jsonp',
                        //     //         data: {
                        //     //             order_id: orderId,
                        //     //             list_data_json: JSON.stringify(billObj),
                        //     //             remark: $('#after_remark').val()
                        //     //         },
                        //     //         success: function (data) {
                        //     //             console.log(data.msg);
                        //     //             if (data && data.code == '000') {
                        //     //                 //window.location.href = 'order.html#/order/home';
                        //     //                 //sessionStorage.setItem("step", '7');//假设赋值
                        //     //             }
                        //     //         },
                        //     //         error: function (data) {
                        //     //         }
                        //     //     });
                        //     // });
                        // }
                    },
                    error: function (data) {
                    }
                });

                /* 点击左边提交按钮 */
                var budObj = {};
                $(document).off('click', '.before_submit').on('click', '.before_submit', function () {
                    var isInteger = true;
                    /* 获取json数据 */
                    var $number = $('.sheet_left input[type="number"]');
                    $.each($number, function (i, v) {
                        budObj[parseInt($(v).attr('bid') - 1)] = $(v).val();
                        if ($(v).val() < 0) {
                            layer.msg('数字不能小于0哦~~');
                            isInteger = false;
                        }

                    });

                    /* 生成预算单结算单 */
                    isInteger && $.ajax({
                        url: GENERATEURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            order_id: orderId
                        },
                        success: function (data) {
                            console.log($('#before_remark').val());
                            console.log(JSON.stringify(budObj))
                            /* 添加预算单数据 */
                            $.ajax({
                                url: ADDDATEURL,
                                type: "GET",
                                async: true,
                                dataType: 'jsonp',
                                data: {
                                    order_id: orderId,
                                    list_data_json: JSON.stringify(budObj),
                                    remark: $('#before_remark').val()
                                },
                                success: function (data) {
                                    console.log(data);
                                    if (data && data.code == '000') {
                                        layer.msg(data.msg);
                                        window.location.href = 'order.html#/order/home';
                                    } else {
                                        layer.msg(data.msg);
                                    }
                                },
                                error: function (data) {
                                    console.log(data)
                                }
                            });
                        },
                        error: function (data) {
                        }
                    });


                });

                /* 点击右边提交按钮 */
                $(document).off('click', '.after_submit').on('click', '.after_submit', function () {
                    var isGreater = true;
                    var billObj = {};
                    /* 获取json数据 */
                    var $right = $('.sheet_right input[type="number"]');
                    $.each($right, function (i, v) {
                        billObj[parseInt($(v).attr('bid') - 1)] = $(v).val();
                        if ($(v).val() < 0) {
                            layer.msg('数字不能小于0哦~~');
                            isGreater = false;
                        }
                    });
                    isGreater && $.ajax({
                        url: UPDATEURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            order_id: orderId,
                            list_data_json: JSON.stringify(billObj),
                            remark: $('#after_remark').val()
                        },
                        success: function (data) {
                            layer.msg(data.msg);
                            if (data && data.code == '000') {
                                window.location.href = 'order.html#/order/home';
                                //sessionStorage.setItem("step", '7');//假设赋值
                            }
                        },
                        error: function (data) {
                        }
                    });

                });
            }]);
        }
    };

    /* 我的订单添加开工时间 */
    orderStartWork = {
        upload: function () {
            /* 图片上传预览 */
            function upImg(div) {
                $(div).find('input').change(function () {
                    var inputImg = $(this);
                    var file = inputImg.get(0).files[0];
                    var reader = new FileReader();
                    if (!/image\/\w+/.test(file.type)) {
                        inputImg.parent().parent().css('background-image', '');
                        inputImg.parent().removeClass('opacity');
                        layer.msg("请确保文件为图像类型");
                        inputImg.val('');//清空file选择的文件
                        return false;
                    }
                    // onload是异步操作
                    else {
                        reader.onload = function (e) {
                            inputImg.parent().addClass('opacity');//图片预览时input file 添加opacity样式，设置完全透明
                            inputImg.parent().parent().css('background-image', 'url("' + e.target.result + '")');//图片设置为$('.showImg')背景图
                            inputImg.parent().parent().find('.close').removeClass('hide').show();
                        }
                    }
                    reader.readAsDataURL(file);
                });
            }

            upImg('.add_picture');//上传图片展示

            /* 上传图片后点击红色叉叉图片取消事件 */
            $('.close').click(function () {
                $(this).parent().find('a').removeClass('opacity');
                $(this).parent().css('background-image', '');
                $(this).hide();
            });

            $(document).off('click', '#upload').on('click', '#upload', function () {
                var data = new FormData();
                var $syear = $(".year1 option:selected");//开工日期年份
                var $smonth = $(".month1 option:selected");//开工日期月份
                var $sday = $(".day1 option:selected");//开工日
                var timelong = $syear.val() + "-" + $smonth.val() + "-" + $sday.val();
                data.append("order_id", sessionStorage.getItem("orderId"));
                data.append("content", $('.message_input').val());
                data.append("time", timelong);
                for (var i = 1; i <= 3; i++) {
                    if ($("#file" + i).val()) {
                        data.append("myfile[]", $("#file" + i)[0].files[0]);
                    }
                }
                $.ajax({
                    url: STARTWORKURL,
                    type: 'POST',
                    data: data,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        if (result.code === '000') {
                            layer.msg(result.msg);
                            $('.upload').hide();
                            $('.add_technology').hide();
                            $('.detail_upload').removeClass('hide').show();
                            var orderId = sessionStorage.getItem("orderId");
                            $.ajax({
                                url: BASICINFOURL,
                                type: "GET",
                                async: true,
                                dataType: 'jsonp',
                                data: {
                                    shop_id: $.base64.decode($.cookie("userShopId")),
                                    order_id: orderId
                                },
                                success: function (data) {
                                    if (data && data.code == '000') {
                                        sessionStorage.setItem("step", data.data.order_list[0].order_step);
                                    }
                                }
                            });
                            location.reload();
                        } else {
                            layer.msg(result.msg);
                            $('.add_technology').hide();
                        }
                    },
                    error: function (e, a, v) {
                        alert("错误！！");
                    }
                });
            });
        }
    };

    /* 我的订单查看详情 */
    orderDeatilWork = {
        detail: function ($index) {
            var orderId = sessionStorage.getItem("orderId");
            $('.construction_photo').html('');
            $.ajax({
                url: DETAILWORKURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    order_id: orderId,
                    order_step: $index
                },
                success: function (data) {
                    if (data && data.code == '000') {
                        var time = data.data.time.substring(0, 10);
                        var newTime = time.split("-");
                        console.log(data.data);
                        $('.start_year').html(newTime[0]);
                        $('.start_month').html(newTime[1]);
                        $('.start_day').html(newTime[2]);
                        $('.detail_describe').html(data.data.content);
                        $.each(data.data.imgs, function (i, v) {
                            $('.construction_photo').append('<div class="photo fl"> <img src=' + v.img_url + '> </div><!--photo-->');
                        });
                    } else {
                        layer.msg(data.msg);
                    }
                },
                error: function (data) {
                    layer.alert(data.msg);
                }
            });

        }
    };

    /* 我的订单步骤返回给用户 */
    submitOrderProgress = {
        getInfoEvent: function () {
            var orderId = sessionStorage.getItem('orderId');
            $(document).on('click', '.order_submit', function () {//点击提交按钮
                $.ajax({
                    url: ORDERTOCUSURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        order_id: orderId
                    },
                    success: function (data) {
                        if (data && data.code == '000') {
                            layer.msg(data.msg);
                        } else {
                            layer.msg(data.msg);
                        }
                    },
                    error: function (data) {
                        layer.alert(data.msg);
                    }
                });
            });
        }
    };

    /* 我的订单具体材料清单 */
    MaterialList = {
        getList: function () {
            HHIT_CENTERAPP.controller('listCtrl', ['$scope', '$http', function ($scope, $http) {
                var orderId = sessionStorage.getItem("orderId");
                var type = sessionStorage.getItem("type");
                if (type == '木工') {
                    type = "wood";
                } else if (type == '水电') {
                    type = "ele";
                } else if (type == '瓦工') {
                    type = "brick";
                } else if (type == '油漆') {
                    type = "paint";
                }
                console.log(orderId);
                $.ajax({
                    type: "get",
                    url: MATERIALLISTURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        order_id: orderId
                    },
                    success: function (data) {
                        console.log(data);
                        if (data != null && data.code == '000') {
                            var list = '<ul>';
                            switch (type) {
                                case "ele":
                                    var information = data.data.ele;
                                    $(".title_picture em").css("background-position", "-286px -261px");
                                    $(".type_cname").html("水电工");
                                    $(".type_ename").html("PLUMBER");
                                    break;
                                case "brick":
                                    var information = data.data.brick;
                                    $(".title_picture em").css("background-position", "-30px -261px");
                                    $(".type_cname").html("瓦工");
                                    $(".type_ename").html("BRICKLAYER");
                                    break;
                                case "wood":
                                    var information = data.data.wood;
                                    $(".title_picture em").css("background-position", "-418px -261px");
                                    $(".type_cname").html("木工");
                                    $(".type_ename").html("WOODWORKING");
                                    break;
                                case "paint":
                                    var information = data.data.paint;
                                    $(".title_picture em").css("background-position", "-155px -261px");
                                    $(".type_cname").html("油漆工");
                                    $(".type_ename").html("PAINTER");
                                    break;
                            }
                            $.each(information, function (i, v) {
                                list += '<li><div class="picture">';
                                list += '<img src="' + v.img + '"></div>';
                                list += '<div class="name">' + v.name + '</div>';
                                list += '<div class="li_right clearfix" id="li_right"><div class="format">';
                                if (v.spec.length > 1) {
                                    $.each(v.spec, function (m, n) {
                                        list += '<span>' + n.spec_name + '</span>';
                                    });
                                    list += '</div><div class="unit">';
                                    $.each(v.spec, function (m, n) {
                                        list += '<span>' + v.unit + '</span>';
                                    });
                                    list += '</div><div class="number">';
                                    $.each(v.spec, function (m, n) {
                                        list += '<div class="control_number"><span class="minus"></span>';
                                        list += '<input type="number" value="' + n.num + '" data-id="' + n.id + '"><span class="plus"></span></div>';
                                    });
                                } else {
                                    list += '<span class="none"></span>';
                                    list += '</div><div class="unit">';
                                    list += '<span class="none">' + v.unit + '</span>';
                                    list += '</div><div class="number">';
                                    list += '<div class="control_number none"><span class="minus"></span>';
                                    list += '<input type="number" value="' + v.spec.num + '" data-id="' + v.spec.id + '"><span class="plus"></span></div>';
                                }
                                list += '</div></div></li>';
                            });
                            list += '</ul>';
                            $(".sure_send").before(list);
                            /* 数量的加减 */
                            numberControl.plusMinus();
                            /* 确认发送 */
                            sureSend.toUser();
                            var isClick = sessionStorage.getItem("isClick");
                            if (isClick == '0') {
                                $('.sure_send').attr('disabled', true);
                                $('.control_number input[type="number"]').attr('disabled', true);
                            }
                        } else {
                            layer.msg(data.msg)
                        }
                    },
                    error: function (data) {
                        console.log(data)
                    }
                });
            }]);
        }
    };

    /* 我的订单材料数量的控制*/
    numberControl = {
        plusMinus: function () {
            $(".control_number .minus").on("click", function () {  //减一操作
                var inp = $(this).siblings("input");
                if (inp.val() <= '0') {
                    layer.msg("请输入合理的数量！");
                } else {
                    var num = Math.ceil(inp.val());
                    num--;
                    inp.val(num);
                }
            });
            $(".control_number .plus").on("click", function () {  //加一操作
                var inp = $(this).siblings("input");
                var num = Math.ceil(inp.val());
                num++;
                inp.val(num);
            });
        }
    };

    /*确认无误，发送给用户*/
    sureSend = {
        toUser: function () {
            $(".sure_send").on("click", function () {
                var flag = true;// 判断能不能提交 true：能提交  false： 不能提交
                var material = $(".material_content").find("ul input");
                var material_json = {};
                var id = [], value = [];
                var t = 0;
                for (var i = 0; i < material.length; i++) {
                    id[i] = material.eq(i).attr("data-id");
                    if (material.eq(i).val() != Math.ceil(material.eq(i).val())) {
                        flag = false;
                    } else {
                        value[i] = material.eq(i).val();
                        t++;
                    }
                    material_json[id[i]] = value[i];
                }
                var material_string = JSON.stringify(material_json);
                if (!flag) {
                    return;
                }
                var orderId = sessionStorage.getItem("orderId");
                var type = sessionStorage.getItem("type");
                var material_type;
                if (type == '木工') {
                    material_type = 3;
                } else if (type == '水电') {
                    material_type = 1;
                } else if (type == '瓦工') {
                    material_type = 4;
                } else if (type == '油漆') {
                    material_type = 5;
                }
                console.log(material_string);
                $.ajax({
                    type: "get",
                    url: MATERIALORDERURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        order_id: orderId,
                        material_type: material_type,
                        material_arr: material_string
                    },
                    beforeSend: function () {
                        $(".sure_send").attr("disabled", true);
                    },
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            layer.msg(data.msg);
                            window.location.href = 'order.html#/order/home';
                        } else {
                            layer.msg(data.msg);
                        }
                    },
                    complete: function () {
                        $(".sure_send").attr("disabled", false);
                    },
                    error: function (data) {
                        console.log(data)
                    }
                });
            });
        }
    };

    /* 获取我的主页工长信息 */
    getHomeInfoHandler = {
        /* 获取工长店铺资料信息 */
        getInfoEvent: function () {
            $.ajax({
                url: SHOPCURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    shop_id: $.base64.decode($.cookie("userShopId"))
                },
                success: function (data) {
                    if (data && data.code == '000') {
                        console.log(data.data);
                        if (data.data.shop_name != null && data.data.shop_name != '') {
                            $('#shop_name').html(data.data.shop_name);//获取店铺名字
                        } else {
                            $('#shop_name').html('无');
                        }
                        $.each(data.data.authentication, function (i, v) {
                            $(".store_name").append('<img src="' + data.data.authentication[i] + '">')
                        });
                        $('#team_person').html(data.data.shop_workernum);//获取我的团队总人数
                        $('#shop_scan').html(data.data.shop_scan);//获取浏览量
                        $('#projectquality').html(data.data.shop_score.projectquality);//获取工程质量
                        $('#serviceattitude').html(data.data.shop_score.serviceattitude);//获取服务态度
                        $('#overallmerit').html(data.data.shop_score.overallmerit);//获取综合评价
                        $('#collectnum').html(data.data.collectnum);//获取收藏量
                    }
                },
                error: function (data) {
                }
            });
            /* 获取订单信息 */
            $.ajax({
                url: HOMEORDERURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    shop_id: $.base64.decode($.cookie("userShopId"))
                },
                success: function (data) {
                    if (data && data.code == '000') {
                        $('#completed').html(data.data['已完成']);
                        $('#order_progress').html(data.data['未完成']);
                    }
                },
                error: function (data) {
                    layer.alert(data.msg);
                }
            });
            $('.enter_store').click(function () {
                window.location.href = 'view_shop.html#/shopdetails?pos=' + $.base64.decode($.cookie("userShopId")) + '';
            });
        },
        /* 获取工长店铺的安全等级 */
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
        },
        /* 获取工长店铺的邮箱信息 */
        getEmailEvent: function () {
            $.ajax({
                url: MASTERDATAURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    foreman_id: USERID
                },
                success: function (data) {
                    if (data != null && data.code == '000') {
                        email = data.data.foremaninfo_email; //获取工长的邮箱
                        if (email != null) {//判断邮箱是否为空
                            $('#email_p').html('<span>' + email + '</span><a href="#/master/setting/email/email_1">修改绑定</a>')
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
                        $(".head").html('<img src="' + data.data.user_img + '"><a class="edit_avatar" href="javascript:;">修改头像<input type="file" name="" id="avatar_file"></a> ');//获取头像
                    }
                },
                error: function (data) {
                }
            });
        }
    };

    /* 上传工长头像 */
    getUserAvatarHandler = {
        getInfoEvent: function () {
            $(document).off('change', '#avatar_file').on('change', '#avatar_file', function () {
                var inputImg = $(this);
                var file = inputImg.get(0).files[0];
                if (!/image\/\w+/.test(file.type)) {
                    layer.msg("请确保文件为图像类型");
                    inputImg.val('');//清空file选择的文件
                    return false;
                } else {
                    var data = new FormData();
                    data.append("user_id", USERID);
                    data.append("myfile", $("#avatar_file")[0].files[0]);
                    $.ajax({
                        type: "POST",
                        url: USERIMGEDITURL,
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

    /* 工长信息 */
    getMasterInfoHandler = {
        getInfoEvent: function () {
            var $personal_edit = $(".personal_area_list .area_edit");
            var area_arr = [];
            var experience = '<div class="fl reduce"><input class="input_all" type="text" title=""><a class="experience new_circle hide" href="javascript:;">删除</a></div> ';
            var experience1 = '<a id="area_circle" class="personal_circle new_circle" href="javascript:;">添加</a>';
            var experience2 = '<a id="experience_circle" class="personal_circle new_circle" href="javascript:;">添加</a><a id="experience_edit" class="personal_circle new_circle" href="javascript:;">编辑</a>';
            var area = '<div class="fl reduce"><input class="personal_user_community" type="text" title=""> <a class="experience1 new_circle hide" href="javascript:;">删除</a></div> ';
            var area1 = '<a id="area_circle" class="personal_circle new_circle" href="javascript:;">添加</a><a id="area_edit" class="personal_circle new_circle" href="javascript:;">编辑</a>';
            /* 获取工长信息 */
            //HHIT_CENTERAPP.controller('personal', ['$scope', '$http', function ($scope, $http) {

            $.ajax({
                url: MASTERDATAURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    foreman_id: USERID
                },
                success: function (data) {
                    if (data && data.code == '000') {
                        console.log(data);
                        var abb_phone = data.data.foremaninfo_phone.substr(0, 3) + "****" + data.data.foremaninfo_phone.substr(7, 11);//手机号中间四位变成*号
                        $('.personal_tel').html(abb_phone); //获取工长的电话号码
                        $('.personal_user_age').val(data.data.foremaninfo_age); //获取工长的年龄
                        $('.personal_service_length').val(data.data.worktime); //获取工长的工龄
                        $('.personal_user_nickname').val(data.data.foremaninfo_nickname); //获取工长的昵称
                        $('.personal_area_detail').val(data.data.loc_address); //获取工长的详细住址
                        email = data.data.foremaninfo_email; //获取工长的邮箱
                        if (email != null) {//判断邮箱是否为空
                            var length = email.length;
                            var abb_email = email.substr(0, 3) + "****" + email.substr(length - 3, length);//邮箱中间变成*号
                            $('#email_p').html('<span>' + abb_email + '</span><a href="#/master/setting/email/email_1">修改绑定</a>')
                        }
                        $('.personal_user_name').val(data.data.user_name); //获取工长的用户名
                        //判断工长的性别
                        if (data.data.foremaninfo_sex == 1) {
                            $('#man').attr('checked', 'checked');
                        } else {
                            $('#women').attr('checked', 'checked');
                        }
                        //获取工长的从业经历
                        var eLen = data.data.experience.length;
                        if (eLen == 0) {
                            $('.personal_form_area').append('<a id="experience_circle" class="personal_circle new_circle" href="javascript:;">添加</a>');
                        } else {
                            for (var i = 0; i < eLen; i++) {
                                $('.personal_form_area').append('<div class="fl"> <input type="text" title="" class="input_all" value="' + data.data.experience[i] + '"><a class="experience new_circle hide" href="javascript:;">删除</a></div>');
                            }
                            $('.input_all').eq(0).addClass('first');
                            $('.personal_form_area .experience').eq(0).before(experience2);
                        }


                        //获取工长的服务区域
                        var aLen = data.data.servicearea.length;
                        for (var i = 0; i < aLen; i++) {
                            if (data.data.servicearea[i] != '') {
                                $('#personal_circle').before('<a class="personal_area" href="javascript:;">' + data.data.servicearea[i] + '</a>');
                            }
                        }
                        //获取工长的装修小区
                        var dLen = data.data.decoratedareas.length;
                        if (dLen == 0) {
                            $('.renovation_area').append(experience1);
                        } else {
                            for (var i = 0; i < dLen; i++) {
                                $('.renovation_area').append('<div class="fl"> <input type="text" title="" class="personal_user_community" value="' + data.data.decoratedareas[i] + '"><a class="experience1 new_circle hide" href="javascript:;">删除</a></div>');
                            }
                            $('.renovation_area .experience1').eq(0).before(area1);
                        }

                        if (data.data.isedit == 2) {//判断用户名能不能被编辑
                            $('.personal_user_name').attr("disabled", true);
                        }
                        $('.personal_user_community').eq(0).addClass('personal_user_first');
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


            /* 点击添加服务区域 */
            $('#personal_circle').click(function () {
                $personal_edit.removeClass("display");
                for (var i = 0; i < $(".personal_area_list .personal_area").length; i++) {
                    area_arr[i] = $(".personal_area_list .personal_area").eq(i).html();
                }
                //默认给标签加current
                for (var i = 0; i < $(".personal_area_list .area_edit span").length; i++) {
                    if ($.inArray($(".personal_area_list .area_edit span").eq(i).html(), area_arr) >= 0) {
                        $(".personal_area_list .area_edit span").eq(i).addClass("current");
                    }
                }
                //点击下面的标签添加标签
                $personal_edit.find("span").unbind('click').click(function () {
                    if (!$(this).hasClass('current')) {
                        $(this).addClass("current");
                        $('#personal_circle').before('<a class="personal_area" href="javascript:;">' + $(this).html() + '</a>');
                    } else {
                        $(this).removeClass("current");
                        for (var i = 0; i < $(".personal_area_list .personal_area").length; i++) {
                            if ($(this).html() == $(".personal_area_list .personal_area").eq(i).html()) {
                                $(".personal_area_list .personal_area").eq(i).remove();
                            }
                        }
                    }
                });
                $personal_edit.find(".area_sure").unbind('click').click(function () {
                    $personal_edit.addClass("display");
                    area_arr = [];
                });
            });

            /* 点击添加从业经历 */
            $(document).off('click', '#experience_circle').on('click', '#experience_circle', function () {
                $('.personal_form_area').append(experience);
                $('.input_all').eq(0).addClass('first');
                $('.personal_form_area #experience_circle').remove();
                $('.personal_form_area #experience_edit').remove();
                $('.personal_form_area .experience').eq(0).before(experience2);
            });

            /* 点击添加装修小区 */
            $(document).off('click', '#area_circle').on('click', '#area_circle', function () {
                $('.renovation_area').append(area);
                $('.personal_user_community').eq(0).addClass('personal_user_first');
                $('.renovation_area #area_circle').remove();
                $('.renovation_area #area_edit').remove();
                $('.renovation_area .experience1').eq(0).before(area1);

            });

            /* 点击编辑从业经历删除按钮出现 */
            $(document).off('click', '#experience_edit').on('click', '#experience_edit', function () {
                $(this).parents('.personal_form_area ').find('.experience').show().removeClass('hide').css('display', 'inline-block');
            });
            /* 点击编辑装修小区删除按钮出现 */
            $(document).off('click', '#area_edit').on('click', '#area_edit', function () {
                $(this).parents('.renovation_area ').find('.experience1').show().removeClass('hide').css('display', 'inline-block');
            });
            /* 点击删除从业经历 */
            $(document).off('click', '.experience').on('click', '.experience', function () {
                $(this).parent().remove();
                $('.personal_form_area #experience_circle').remove();
                $('.personal_form_area #experience_edit').remove();
                $('.input_all').eq(0).addClass('first');
                if ($('.personal_form_area .experience').length == 0) {
                    $('.personal_form_area').append('<a id="experience_circle" class="personal_circle new_circle" href="javascript:;">添加</a>');
                } else {
                    if ($('.personal_form_area #experience_circle').length == 0) {
                        $('.personal_form_area').find('.experience').eq(0).before(experience2);
                    }
                }
            });
            /* 点击删除装修小区 */
            $(document).off('click', '.experience1').on('click', '.experience1', function () {
                $(this).parent().remove();
                $('.renovation_area #area_circle').remove();
                $('.renovation_area #area_edit').remove();
                $('.personal_user_community').eq(0).addClass('personal_user_first');

                if ($('.renovation_area .experience1').length == 0) {
                    $('.renovation_area').append(experience1);
                } else {
                    $('.renovation_area').find('.experience1').eq(0).before(area1);
                }
            });

            /* 编辑工长信息 */
            $('#personal_submit').click(function () {
                var array = [];
                var arry_community = [];
                var arry_area = [];
                /*获取从业经历的数据*/
                for (var i = 0; i < $('.input_all').length; i++) {
                    array.push($('.input_all').eq(i).val());
                }
                /*获取装修小区的数据*/
                for (var i = 0; i < $('.personal_user_community').length; i++) {
                    arry_community.push($('.personal_user_community').eq(i).val());
                }
                /*获取服务区域的数据*/
                for (var i = 0; i < $('.personal_area').length; i++) {
                    arry_area.push($('.personal_area').eq(i).html());
                }
                console.log(USERID);
                console.log('name:' + $('.personal_user_name').val());
                console.log('experience:' + array);
                $.ajax({
                    url: EDITPERURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        foreman_id: USERID,
                        name: $('.personal_user_name').val(),
                        nickname: $('.personal_user_nickname').val(),
                        age: $('.personal_user_age').val(),
                        worktime: $('.personal_service_length').val(),
                        experience: array,
                        decoratedareas: arry_community,
                        servicearea: arry_area,
                        loc_address: $('.personal_area_detail').val(),
                        loc_province: $('#province1').val(),
                        loc_city: $('#city1').val(),
                        loc_district: $('#district1').val(),
                        home_province: $('#province2').val(),
                        home_city: $('#city2').val(),
                        home_district: $('#district2').val(),
                        sex: $("input[name='sex']:checked").val()
                    },
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            layer.msg(data.msg);
                        }
                    },
                    error: function (data) {
                    }
                });
            });
        }
    };

    /* 获取当前总额 提现金额接口 、保证金写死 */
    getWalletData = {
        getMoney: function () {
            $.ajax({
                type: "get",
                url: WALLETURL,
                async: true,
                dataType: "jsonp",
                data: {
                    user_id: USERID
                },
                success: function (data) {
                    if (data != null && data.code == '000') {
                        console.log(data.data);
                        $(".wallet_content_top li .withdraw span").html(data.data.available_total);
                        sessionStorage.setItem('availableTotal', data.data.available_total);
                        sessionStorage.setItem('processType', data.data.process_type);
                        sessionStorage.setItem('money', data.data.money);
                        sessionStorage.setItem('bank', data.data.bank);
                        $(".wallet_content_top li .total span").html(data.data.total);
                    } else {
                        layer.alert(data.msg);
                    }
                },
                error: function (data) {
                }
            });
        }
    };

    /* 获得最近的五个月 */
    getNearByMonth = {
        fiveMonth: function () {
            var mydate = new Date();
            var year = [], month = [], i, str = [];
            for (i = 0; i < 5; i++) {
                year[i] = "" + mydate.getFullYear();
            }
            month[0] = (mydate.getMonth() + 1);
            for (i = 1; i < 5; i++) {
                month[i] = month[i - 1] - 1;
                if (month[i] <= 0) {
                    month[i] += 12;
                    year[i]--;
                    for (var j = i + 1; j < 5; j++) {
                        year[j] = year[j - 1];
                    }
                }
            }
            for (i = 0; i < 5; i++) {
                if (month[i] < 10) {
                    month[i] = "0" + month[i];
                }
                str[i] = year[i] + " - " + month[i];
                $(".bottom_title_left a").eq(i).html(str[i]);
            }
        }
    };

    /* 单条账单明细删除 */
    BillDelete = {
        deleteRecord: function () {
            $(".dd_opera").on("click", function () {
                var id = $(this).parent().attr("data-id");
                $.ajax({
                    type: "get",
                    url: DELBILLURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        id: id
                    },
                    success: function (data) {
                        if (data && data.code == '000') {
                            getBillInfoHandler.getInfoEvent();
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

    /* 我的钱包账单明细 */
    getBillInfoHandler = {
        getInfoEvent: function () {
            var str;
            var time;
            $(".bottom_title_left a").eq(0).addClass("active");
            str = $(".bottom_title_left a").eq(0).html().substring(0, 4) + $(".bottom_title_left a").eq(0).html().substring(7, 9);
            $(".wallet_month").html($(".bottom_title_left a").eq(0).html());
            $(".bottom_title_left a").on("click", function () {
                $(this).addClass("active").siblings().removeClass("active");
                $(".wallet_month").html($(this).html());
                time = $(this).html().substring(0, 4) + $(this).html().substring(7, 9);
                $.ajax({
                    type: "get",
                    url: BILLURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        user_id: USERID,
                        month: time,
                        page: 1,
                        limit: 4
                    },
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            //console.log(data);
                            var bill = "";
                            var total = data.data[0].total;
                            $.each(data.data, function (i, v) {
                                bill += spliceBillContent.spliceStrEvent(v);
                            });
                            $(".wallet_dl").nextAll().remove();
                            $(".wallet_bottom_content").append(bill);
                            BillDelete.deleteRecord();
                            BillPageHandler.pageContentEvent(total, time);
                            $('.not_information').hide();
                            $('.not_information_text').html();
                            $(".page_number").css('opacity', '1');
                        } else {
                            $(".wallet_dl").nextAll().remove();
                            $(".page_number").css('opacity', '0');
                            // layer.alert(data.msg);
                            //$('.wallet').remove();
                            $('.not_information').show().removeClass('hide');
                            $('.not_information_text').html('您还没有交易记录哦~~');
                        }
                    },
                    error: function (data) {
                    }
                });
            });
            $.ajax({
                type: "get",
                url: BILLURL,
                async: true,
                dataType: "jsonp",
                data: {
                    user_id: USERID,
                    month: str,
                    page: 1,
                    limit: 4
                },
                success: function (data) {
                    if (data != null && data.code == '000') {
                        console.log(data);
                        var bill = "";
                        var total = data.data[0].total;
                        $.each(data.data, function (i, v) {
                            bill += spliceBillContent.spliceStrEvent(v);
                        });
                        $(".wallet_dl").nextAll().remove();
                        $(".wallet_bottom_content").append(bill);
                        BillDelete.deleteRecord();
                        BillPageHandler.pageContentEvent(total, str);
                    } else {
                        $(".wallet_dl").nextAll().remove();
                        $(".page_number").css('opacity', '0');
                        // layer.alert(data.msg);
                        //$('.wallet').remove();
                        $('.not_information').show().removeClass('hide');
                        $('.not_information_text').html('您还没有交易记录哦~~');
                    }
                },
                error: function (data) {
                }
            });
        }
    };

    /* 我的钱包账单明细分页 */
    BillPageHandler = {
        pageContentEvent: function (bill_total, time) {
            $(".page_div5").empty().paging({
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
                    month: time,
                    page: 1,
                    limit: 4
                },   //ajax方式传值时的附加传值,要传的参数放在这里面,页面参数只要指定idParamemeter就好，会自动添加
                dataOperate: function oprate(data) {
                    $(".wallet_dl").nextAll().remove();
                    var bill = "";
                    $.each(data.data, function (i, v) {
                        bill += spliceBillContent.spliceStrEvent(v);
                    });
                    $(".wallet_dl").nextAll().remove();
                    $(".wallet_bottom_content").append(bill);
                    BillDelete.deleteRecord();
                    $('.not_information').hide();
                    $('.not_information_text').html();
                    $(".page_number").css('opacity', '1');
                } //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
            });
        }
    };

    /* 我的钱包账单明细拼接内容 */
    spliceBillContent = {
        spliceStrEvent: function (value) {
            var vrStr = '<div class="wallet_dd" data-id="' + value.id + '">';
            vrStr += '<span class="wallet_time">' + value.time + '</span>';
            vrStr += '<span class="wallet_account">' + value.content + '</span>';
            vrStr += '<span class="wallet_coin">' + value.money + '</span>';
            vrStr += '<span class="wallet_cash">支付成功</span>';
            vrStr += '<a href="javascript:;" class="dd_opera">';
            vrStr += '<em class="sprite_team"></em>';
            vrStr += '</a></div>';
            return vrStr;
        }
    };

    /* 我的钱包提现 */
    getWithdrawInfoHandler = {
        getInfoEvent: function () {
            HHIT_CENTERAPP.controller('withdraw', ['$scope', '$http', function ($scope, $http) {
                $('#headerWrapper').remove();

                var availableTotal = sessionStorage.getItem('availableTotal');
                $('.current_balance b').html(availableTotal);
                var processType = sessionStorage.getItem('processType');
                var money = sessionStorage.getItem('money');
                var bank = sessionStorage.getItem('bank');
                var v_array = [];
                if (processType == 'false') {//正在提现中
                    /* 列出我的银行卡信息 */
                    $http({
                        method: "JSONP",
                        url: BANKINFOURL,
                        /* 传参 */
                        params: {
                            user_id: USERID
                        }
                    }).success(function (data, status) {
                        /* 如果成功执行 */
                        if (data.code === '000') {
                            console.log(data);
                            $.each(data.data, function (i, v) {
                                if (v.bankname == bank) {
                                    var cardno = v.bankcardno;
                                    v.bankcardnoDim = cardno.substr(cardno.length - 4);//获取银行卡后四位
                                    v_array.push(v);
                                    $scope.wbanks = v_array;
                                }
                            });

                            $scope.renderFinish = function () {
                                $('.radio_money').attr('checked', 'checked');
                                $('.bank_fr').remove();
                                $('#money').attr("disabled", true).val(money);
                                $('#cash_confirm').attr("disabled", true).val("正在提现中...");
                            };
                        }

                    });
                } else {
                    /* 列出我的银行卡信息 */
                    $http({
                        method: "JSONP",
                        url: BANKINFOURL,
                        /* 传参 */
                        params: {
                            user_id: USERID
                        }
                    }).success(function (data, status) {
                        /* 如果成功执行 */
                        if (data.code === '000') {
                            console.log(data);
                            for (var i = 0; i < data.data.length; i++) {
                                var cardno = data.data[i].bankcardno;
                                data.data[i].bankcardnoDim = cardno.substr(cardno.length - 4);//获取银行卡后四位
                            }
                            $scope.wbanks = data.data;
                        }
                        /* 如果失败执行 */
                        else {
                            //layer.alert(data.msg);
                            $("#choose_bank").append('<div class="not_bank fl"> <span>您还没有绑定银行卡哦~~ 点击去</span><a href="bank.html#/bank/home"> 绑定 </a> </div><!--not_bank-->');

                        }
                    }).error(function (data, status) {
                    });
                }


                /* 提现 */
                $('#cash_confirm').click(function () {
                    var val = $('input:radio[name="money"]:checked').val();
                    if (val == null) {
                        layer.alert("请至少选择一个银行卡！");
                        return false;
                    } else if ($('#money').val() == '') {
                        layer.alert("提现金额不能为空！");
                    } else if ($('#money').val() <= 0) {
                        layer.alert("提现金额不能小于等于0！");
                    }
                    else {
                        var wbank;
                        $.each($scope.wbanks, function (i, val) {
                            $('.bank :radio').eq(i).data('no', val.bankcardno);
                            if (val.bankcardno == $('.bank :radio:checked').data('no')) {
                                wbank = val;
                            }
                        });
                        $.ajax({
                            url: APPLYURL,
                            type: "GET",
                            async: true,
                            dataType: 'jsonp',
                            data: {
                                user_id: USERID,
                                bankcardno: wbank.bankcardno,
                                bankname: wbank.bankname,
                                cardtype: wbank.cardtype,
                                money: $('#money').val()
                            },
                            success: function (data) {
                                if (data.code == '000') {
                                    $('.withdraw_complete').show().removeClass('hide');
                                    $('.withdraw_contentWrap').hide();
                                } else {
                                    layer.msg(data.msg);
                                }
                            },
                            error: function (data) {
                                layer.alert(data.msg);
                            }
                        });
                    }
                });
            }]);
        }
    };

    /* 我的钱包我的银行卡 */
    getBankInfoHandler = {
        getInfoEvent: function () {
            HHIT_CENTERAPP.controller('bank', ['$scope', '$http', function ($scope, $http) {
                $('#headerWrapper').remove();
                /* 列出我的银行卡信息 */
                $http({
                    method: "JSONP",
                    url: BANKINFOURL,
                    /* 传参 */
                    params: {
                        user_id: USERID
                    }
                }).success(function (data, status) {
                    /* 如果成功执行 */
                    if (data.code === '000') {
                        console.log(data);
                        for (var i = 0; i < data.data.length; i++) {
                            var cardno = data.data[i].bankcardno;
                            data.data[i].bankcardno = cardno.substr(cardno.length - 4);//获取银行卡后四位
                        }
                        $scope.banks = data.data;
                    }
                    /* 如果失败执行 */
                    else {
                        //alert(data.msg);
                        layer.msg(data.msg);
                    }
                }).error(function (data, status) {
                });

            }]);
            HHIT_CENTERAPP.controller('process4', ['$scope', '$http', function ($scope, $http) {
                $('#headerWrapper').remove();
            }]);

        },
        /* 获取持卡人姓名 */
        getNameEvent: function () {
            HHIT_CENTERAPP.controller('process1', ['$scope', '$http', function ($scope, $http) {
                $('#headerWrapper').remove();
                $.ajax({
                    url: GETNAMEURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        user_id: USERID
                    },
                    success: function (data) {
                        console.log(data);
                        if (data && data.code == '000') {
                            realname = data.data.realname;//获取真实姓名
                            idcardno = data.data.idcardno;//获取身份证号
                            $('#process1_next').click(function () {
                                if ($('#card_name').val() == '') {
                                    layer.alert('持卡人姓名不能为空');
                                } else if ($('#card_name').val() != realname) {
                                    layer.alert('持卡人姓名与真实姓名不相符');
                                } else if ($('#card_no').val() == '') {
                                    layer.alert('卡号不能为空');
                                } else if (!cardReg.test($('#card_no').val())) {
                                    layer.alert('银行卡格式不正确');
                                } else {
                                    $.cookie("b", $.base64.encode($('#card_no').val()));//银行卡卡号
                                    $.cookie("r", $.base64.encode(data.data.realname, 'utf8'));//真实姓名
                                    $.cookie("i", $.base64.encode(data.data.idcardno));//身份证号
                                    window.location.href = '#bank/add_process2';
                                }
                            });
                        } else if (data.code == '133') {
                            layer.alert('您还没有进行身份验证，您可以在安全设置中进行验证~~如果您已验证过，请耐心等待我们的审核~~');
                            $('#card_name').attr('disabled', true);
                            $('#card_no').attr('disabled', true);
                            $('#process1_next').attr('disabled', true);
                        }
                    },
                    error: function (data) {
                        layer.alert(data.msg);
                    }
                });
            }]);
        },
        /* 获取银行卡logo */
        getLogoEvent: function () {
            HHIT_CENTERAPP.controller('process2', ['$scope', '$http', function ($scope, $http) {
                var bankcardno = $.base64.decode($.cookie("b"));
                $('#headerWrapper').remove();
                $.ajax({
                    url: TYPEURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        user_id: USERID,
                        realname: realname,
                        idcardno: idcardno,
                        bankcardno: bankcardno
                    },
                    success: function (data) {
                        console.log(data);
                        if (data && data.code == '000') {
                            $("#card_type").attr('placeholder', data.data.bankname);//获取银行卡的名字
                            $('#process2_next').click(function () {
                                if ($('#reserved_phone').val() == '') {
                                    layer.alert('电话不能为空');
                                } else if (!PHONEREG.test($('#reserved_phone').val())) {
                                    layer.alert('手机号码格式不正确');
                                } else {
                                    $.cookie("phone", $.base64.encode($('#reserved_phone').val()));
                                    $.cookie("bankname", $.base64.encode(data.data.bankname, 'utf8'));
                                    sessionStorage.setItem("cardtype", data.data.cardtype);
                                    sessionStorage.setItem("banklogo", data.data.banklogo);
                                    window.location.href = '#bank/add_process3';
                                }
                            });
                        }
                    },
                    error: function (data) {
                        layer.alert(data.msg);
                    }
                });
            }]);
        },
        /**
         * 发送验证码事件与下一步
         */
        sendCaptcha: function () {
            // 向后台发送处理数据，向用户发送验证码
            HHIT_CENTERAPP.controller('process3', ['$scope', '$http', function ($scope, $http) {
                $('#headerWrapper').remove();
                var phone = $.base64.decode($.cookie("phone"));
                var bankcardno = $.base64.decode($.cookie("b"));
                var bankname = unescape($.base64.decode($.cookie("bankname"), 'utf8'));
                var cardtype = sessionStorage.getItem("cardtype");
                var banklogo = sessionStorage.getItem("banklogo");
                var realname = unescape($.base64.decode($.cookie("r"), 'utf8'));
                var idcardno = $.base64.decode($.cookie("i"));
                var code = $('#verification_code');
                var abb_phone = phone.substr(0, 3) + "****" + phone.substr(7, 11);//手机号中间四位变成*号
                $('#phone_number').html(abb_phone);//银行卡预留手机号
                code.click(function () {
                    var COUNT = 60; // 验证码间隔秒数
                    $.ajax({
                        url: PHCODE,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            phone: phone
                        },
                        success: function (data) {
                            if (data.code == '000') {
                                // 设置验证码按钮效果，开始计时
                                code.addClass("zc_btnClick").attr("disabled", true);
                                code.val(COUNT + "秒后重新获取");
                                InterValObj = window.setInterval(function () {
                                    if (COUNT == 1) {
                                        window.clearInterval(InterValObj); // 停止计时器
                                        code.removeClass("zc_btnClick").removeAttr("disabled"); // 启用按钮
                                        code.val("获取验证码");
                                    } else {
                                        COUNT--;
                                        code.val(COUNT + "秒后重新获取");
                                    }
                                }, 1000); // 启动计时器，1秒执行一次
                            } else {
                                layer.alert(data.msg);
                            }
                        },
                        error: function (data) {
                        }
                    });
                });
                /* 点击下一步 */
                $('#process3_next').click(function () {
                    if ($('#code_input').val() == '') {
                        layer.alert('验证码不能为空');
                    } else {
                        $.ajax({
                            url: VERIFYURL,
                            type: "GET",
                            async: true,
                            dataType: 'jsonp',
                            data: {
                                user_id: USERID,
                                realname: realname,
                                idcardno: idcardno,
                                bankcardno: bankcardno,
                                bankname: bankname,
                                cardtype: cardtype,
                                phone: phone,
                                captcha: $('#code_input').val(),
                                banklogo: banklogo
                            },
                            success: function (data) {
                                console.log(data);
                                if (data.code == '000') {
                                    window.location.href = '#bank/add_process4';
                                } else {
                                    layer.msg(data.msg);
                                }
                            },
                            error: function (data) {
                                layer.alert(data.msg);
                            }
                        });
                    }

                })
            }
            ]);
        }
    };

    /* 获取我的团队信息 */
    getTeamInfoHandler = {
        getInfoEvent: function () {
            var wrap = $('.team_bg_wrap');
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
                        console.log(data)
                        sessionStorage.setItem("eleworker_num", data.data.eleworker.length);
                        sessionStorage.setItem("woodworker_num", data.data.woodworker.length);
                        sessionStorage.setItem("brickworker_num", data.data.brickworker.length);
                        sessionStorage.setItem("paintworker_num", data.data.paintworker.length);
                        sessionStorage.setItem("mixworker_num", data.data.mixworker.length);
                        $('#eleworker').html(data.data.eleworker.length);//水电工
                        $('#woodworker').html(data.data.woodworker.length);//木工
                        $('#brickworker').html(data.data.brickworker.length);//瓦工
                        $('#paintworker').html(data.data.paintworker.length);//油漆工
                        $('#mixworker').html(data.data.mixworker.length);//杂工
                        $(".team_content .team_bg_wrap").on("click", function () {
                            var cateid = $(this).children("a").attr("data-id");
                            sessionStorage.setItem("cateid", cateid);
                        });
                        if (data.data.eleworker.length != 0) {
                            wrap.eq(0).css('background', 'url(' + data.data.eleworker[0].portrait_img + ')');
                        }
                        if (data.data.woodworker.length != 0) {
                            wrap.eq(1).css('background', 'url(' + data.data.woodworker[0].portrait_img + ')');
                        }
                        if (data.data.brickworker.length != 0) {
                            wrap.eq(2).css('background', 'url(' + data.data.brickworker[0].portrait_img + ')');
                        }
                        if (data.data.paintworker.length != 0) {
                            wrap.eq(3).css('background', 'url(' + data.data.paintworker[0].portrait_img + ')');
                        }
                        if (data.data.mixworker.length != 0) {
                            wrap.eq(4).css('background', 'url(' + data.data.mixworker[0].portrait_img + ')');
                        }


                    }
                },
                error: function (data) {
                }
            });
        }
    };

    /* 新增和编辑工人 */
    workerAction = {
        editWorker: function () { //调用编辑工人接口
            var service = [];
            var cate_id = sessionStorage.getItem("cateid"); //工种id     1：杂工 2：水电工 3：瓦工 4：木工 5：油漆工
            var worker_id = sessionStorage.getItem("userid"); //工人id
            var flag = true; // 判断能不能提交 true：能提交  false： 不能提交
            var $name = $(".staff_name .name").val(); //工人姓名
            var $sex = $(".staff_name .sex option:selected").val(); //工人性别   1：男生 2：女生
            var $age = $(".staff_name .age").val(); //工人年龄
            var $birthplace = $(".staff_home .place").val(); //工人籍贯
            var $worktime = $(".staff_date input").val(); //工人从业年限
            var $idcard = $(".staff_phone .idcard").val(); //身份证
            var $bankcard = $(".staff_phone .bankcard").val(); //银行卡
            var $phone = $(".staff_phone .phone").val(); //手机号
            var $bankname = $(".staff_phone .bankname").val(); //开户银行
            if ($name == "" || $name == null) {
                layer.msg("姓名不能为空");
                flag = false;
            } else if ($age == "" || $age == null) {
                layer.msg("年龄不能为空");
                flag = false;
            } else if ($birthplace == "" || $birthplace == null) {
                layer.msg("籍贯不能为空");
                flag = false;
            } else if ($worktime == "" || $worktime == null) {
                layer.msg("从业时间不能为空");
                flag = false;
            } else if ($phone == "" || $phone == null) {
                layer.msg("手机号不能为空");
                flag = false;
            } else if ($idcard == "" || $idcard == null) {
                layer.msg("身份证号不能为空");
                flag = false;
            } else if ($bankname == "" || $bankname == null) {
                layer.msg("开户银行不能为空");
                flag = false;
            } else if ($bankcard == "" || $bankcard == null) {
                layer.msg("银行卡号不能为空");
                flag = false;
            }
            for (var i = 0; i < $(".edit_bottom li input").length; i++) {
                if ($(".edit_bottom li input").eq(i).val() == "" || $(".edit_bottom li input").eq(i).val() == null) {
                    layer.alert("价格明细表有项未填");
                    flag = false;
                    break;
                }
            }
            // 验证后有错误则return 不提交
            if (!flag) {
                return;
            }
            switch (cate_id) {
                case "1":
                    for (var i = 0; i < $(".edit_bottom li input").length; i++) {
                        service[i + 1] = $(".edit_bottom li input").eq(i).val();
                    }
                    $.ajax({
                        type: "get",
                        url: EDITWORKERURL,
                        async: true,
                        dataType: "jsonp",
                        data: {
                            cate_id: cate_id,
                            worker_id: worker_id,
                            name: $name,
                            sex: $sex,
                            age: $age,
                            birthplace: $birthplace,
                            worktime: $worktime,
                            idcard: $idcard,
                            bankcard: $bankcard,
                            phone: $phone,
                            bankname: $bankname,
                            service1: service[1],
                            service2: service[2],
                            service3: service[3],
                            service4: service[4],
                            service5: service[5],
                            service6: service[6],
                            service7: service[7],
                            service8: service[8],
                            service9: service[9],
                            service10: service[10],
                            service11: service[11],
                            service12: service[12],
                            service13: service[13],
                            service14: service[14],
                            service15: service[15],
                            service16: service[16]
                        },
                        success: function (data) {
                            if (data != null && data.code == '000') {
                                layer.msg(data.msg);
                                window.location.href = "#/master/mteam";
                                location.reload(true);
                            } else {
                                layer.alert(data.msg);
                            }
                        }
                    });
                    break;
                case "2":
                    for (var i = 0; i < $(".edit_bottom li input").length; i++) {
                        service[i + 17] = $(".edit_bottom li input").eq(i).val();
                    }
                    $.ajax({
                        type: "get",
                        url: EDITWORKERURL,
                        async: true,
                        dataType: "jsonp",
                        data: {
                            cate_id: cate_id,
                            worker_id: worker_id,
                            name: $name,
                            sex: $sex,
                            age: $age,
                            birthplace: $birthplace,
                            worktime: $worktime,
                            idcard: $idcard,
                            bankcard: $bankcard,
                            phone: $phone,
                            bankname: $bankname,
                            service17: service[17],
                            service18: service[18]
                        },
                        success: function (data) {
                            if (data != null && data.code == '000') {
                                layer.msg(data.msg);
                                window.location.href = "#/master/mteam";
                                location.reload(true);
                            } else {
                                layer.alert(data.msg);
                            }
                        }
                    });
                    break;
                case "3":
                    for (var i = 0; i < $(".edit_bottom li input").length; i++) {
                        service[i + 19] = $(".edit_bottom li input").eq(i).val();
                    }
                    $.ajax({
                        type: "get",
                        url: EDITWORKERURL,
                        async: true,
                        dataType: "jsonp",
                        data: {
                            cate_id: cate_id,
                            worker_id: worker_id,
                            name: $name,
                            sex: $sex,
                            age: $age,
                            birthplace: $birthplace,
                            worktime: $worktime,
                            idcard: $idcard,
                            bankcard: $bankcard,
                            phone: $phone,
                            bankname: $bankname,
                            service19: service[19],
                            service20: service[20],
                            service21: service[21],
                            service22: service[22],
                            service23: service[23],
                            service24: service[24],
                            service25: service[25],
                            service26: service[26],
                            service27: service[27],
                            service28: service[28],
                            service29: service[29],
                            service30: service[30],
                            service31: service[31],
                            service32: service[32],
                            service33: service[33],
                            service34: service[34],
                            service35: service[35],
                            service36: service[36],
                            service37: service[37],
                            service38: service[38],
                            service39: service[39],
                            service40: service[40],
                            service41: service[41]
                        },
                        success: function (data) {
                            if (data != null && data.code == '000') {
                                layer.msg(data.msg);
                                window.location.href = "#/master/mteam";
                                location.reload(true);
                            } else {
                                layer.alert(data.msg);
                            }
                        }
                    });
                    break;
                case "4":
                    for (var i = 0; i < $(".edit_bottom li input").length; i++) {
                        service[i + 42] = $(".edit_bottom li input").eq(i).val();
                    }
                    $.ajax({
                        type: "get",
                        url: EDITWORKERURL,
                        async: true,
                        dataType: "jsonp",
                        data: {
                            cate_id: cate_id,
                            worker_id: worker_id,
                            name: $name,
                            sex: $sex,
                            age: $age,
                            birthplace: $birthplace,
                            worktime: $worktime,
                            idcard: $idcard,
                            bankcard: $bankcard,
                            phone: $phone,
                            bankname: $bankname,
                            service42: service[42],
                            service43: service[43],
                            service44: service[44],
                            service45: service[45],
                            service46: service[46],
                            service47: service[47],
                            service48: service[48],
                            service49: service[49],
                            service50: service[50],
                            service51: service[51],
                            service52: service[52],
                            service53: service[53]
                        },
                        success: function (data) {
                            if (data != null && data.code == '000') {
                                layer.msg(data.msg);
                                window.location.href = "#/master/mteam";
                                location.reload(true);
                            } else {
                                layer.alert(data.msg);
                            }
                        }
                    });
                    break;
                case "5":
                    for (var i = 0; i < $(".edit_bottom li input").length; i++) {
                        service[i + 54] = $(".edit_bottom li input").eq(i).val();
                    }
                    $.ajax({
                        type: "get",
                        url: EDITWORKERURL,
                        async: true,
                        dataType: "jsonp",
                        data: {
                            cate_id: cate_id,
                            worker_id: worker_id,
                            name: $name,
                            sex: $sex,
                            age: $age,
                            birthplace: $birthplace,
                            worktime: $worktime,
                            idcard: $idcard,
                            bankcard: $bankcard,
                            phone: $phone,
                            bankname: $bankname,
                            service54: service[54],
                            service55: service[55],
                            service56: service[56],
                            service57: service[57],
                            service58: service[58],
                            service59: service[59],
                            service60: service[60],
                            service61: service[61],
                            service62: service[62],
                            service63: service[63]
                        },
                        success: function (data) {
                            if (data != null && data.code == '000') {
                                layer.msg(data.msg);
                                window.location.href = "#/master/mteam";
                                location.reload(true);
                            } else {
                                layer.alert(data.msg);
                            }
                        }
                    });
                    break;
            }

        },
        addWorker: function () { //调用增加工人接口
            var service = [];
            var cate_id = sessionStorage.getItem("cateid"); //工种id     1：杂工 2：水电工 3：瓦工 4：木工 5：油漆工
            var shop_id = sessionStorage.getItem("shopid");
            var flag = true; // 判断能不能提交 true：能提交  false： 不能提交
            var data = new FormData();
            var $name = $(".staff_name .name").val(); //工人姓名
            var $sex = $(".staff_name .sex option:selected").val(); //工人性别   1：男生 2：女生
            var $age = $(".staff_name .age").val(); //工人年龄
            var $birthplace = $(".staff_home .place").val(); //工人籍贯
            var $worktime = $(".staff_date input").val(); //工人从业年限
            var $idcard = $(".staff_phone .idcard").val(); //身份证
            var $bankcard = $(".staff_phone .bankcard").val(); //银行卡
            var $phone = $(".staff_phone .phone").val(); //手机号
            var $bankname = $(".staff_phone .bankname").val(); //开户银行
            data.append("cate_id", cate_id);
            data.append("myfile", $("#worker_picture")[0].files[0]);
            data.append("shop_id", $.base64.decode($.cookie("userShopId")));
            data.append("name", $name);
            data.append("sex", $sex);
            data.append("age", $age);
            data.append("birthplace", $birthplace);
            data.append("worktime", $worktime);
            data.append("idcard", $idcard);
            data.append("bankcard", $bankcard);
            data.append("phone", $phone);
            data.append("bankname", $bankname);
            if ($(".staff_picture .add_picture").attr("data-flag") == '0') {
                layer.msg("未上传头像");
                flag = false;
            } else if ($name == "" || $name == null) {
                layer.msg("姓名不能为空");
                flag = false;
            } else if ($age == "" || $age == null) {
                layer.msg("年龄不能为空");
                flag = false;
            } else if ($birthplace == "" || $birthplace == null) {
                layer.msg("籍贯不能为空");
                flag = false;
            } else if ($worktime == "" || $worktime == null) {
                layer.msg("从业时间不能为空");
                flag = false;
            } else if ($phone == "" || $phone == null) {
                layer.msg("手机号不能为空");
                flag = false;
            } else if ($idcard == "" || $idcard == null) {
                layer.msg("身份证号不能为空");
                flag = false;
            } else if ($bankname == "" || $bankname == null) {
                layer.msg("开户银行不能为空");
                flag = false;
            } else if ($bankcard == "" || $bankcard == null) {
                layer.msg("银行卡号不能为空");
                flag = false;
            }
            for (var i = 0; i < $(".edit_bottom li input").length; i++) {
                if ($(".edit_bottom li input").eq(i).val() == "" || $(".edit_bottom li input").eq(i).val() == null) {
                    layer.msg("价格明细表有项未填");
                    flag = false;
                    break;
                }
            }
            // 验证后有错误则return 不提交
            if (!flag) {
                return;
            }
            switch (cate_id) {
                case "1":
                    for (var i = 0; i < $(".edit_bottom li input").length; i++) {
                        service[i + 1] = $(".edit_bottom li input").eq(i).val();
                        data.append(("service" + (i + 1)), service[i + 1]);
                    }
                    $.ajax({
                        type: "post",
                        url: ADDWORKERURL,
                        dataType: "jsonp",
                        jsonp: 'callback',
                        data: data,
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            if (result.code == '000') {
                                layer.msg("添加工人成功");
                                window.location.href = "#/master/mteam";
                                location.reload(true);
                            } else {
                                layer.alert(result.msg);
                            }
                        },
                        error: function (e, a, v) {
                            layer.alert("未知错误");
                        }
                    });
                    break;
                case "2":
                    for (var i = 0; i < $(".edit_bottom li input").length; i++) {
                        service[i + 17] = $(".edit_bottom li input").eq(i).val();
                        data.append(("service" + (i + 17)), service[i + 17]);

                    }
                    $.ajax({
                        type: "post",
                        url: ADDWORKERURL,
                        dataType: "jsonp",
                        jsonp: 'callback',
                        data: data,
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            if (result.code == '000') {
                                layer.msg("添加工人成功");
                                window.location.href = "#/master/mteam";
                                location.reload(true);
                            } else {
                                layer.alert(result.msg);
                            }
                        },
                        error: function (e, a, v) {
                            layer.alert("未知错误");
                        }
                    });
                    break;
                case "3":
                    for (var i = 0; i < $(".edit_bottom li input").length; i++) {
                        service[i + 19] = $(".edit_bottom li input").eq(i).val();
                        data.append(("service" + (i + 19)), service[i + 19]);
                    }
                    $.ajax({
                        type: "post",
                        url: ADDWORKERURL,
                        dataType: "jsonp",
                        jsonp: 'callback',
                        data: data,
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            if (result.code == '000') {
                                layer.msg("添加工人成功");
                                window.location.href = "#/master/mteam";
                                location.reload(true);
                            } else {
                                layer.alert(result.msg);
                            }
                        },
                        error: function (e, a, v) {
                            layer.alert("未知错误");
                        }
                    });
                    break;
                case "4":
                    for (var i = 0; i < $(".edit_bottom li input").length; i++) {
                        service[i + 42] = $(".edit_bottom li input").eq(i).val();
                        data.append(("service" + (i + 42)), service[i + 42]);
                    }
                    $.ajax({
                        type: "post",
                        url: ADDWORKERURL,
                        dataType: "jsonp",
                        jsonp: 'callback',
                        data: data,
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            if (result.code == '000') {
                                layer.msg("添加工人成功");
                                window.location.href = "#/master/mteam";
                                location.reload(true);
                            } else {
                                layer.alert(result.msg);
                            }
                        },
                        error: function (e, a, v) {
                            layer.alert("未知错误");
                        }
                    });
                    break;
                case "5":
                    for (var i = 0; i < $(".edit_bottom li input").length; i++) {
                        service[i + 54] = $(".edit_bottom li input").eq(i).val();
                        data.append(("service" + (i + 54)), service[i + 54]);
                    }
                    $.ajax({
                        type: "post",
                        url: ADDWORKERURL,
                        dataType: "jsonp",
                        jsonp: 'callback',
                        data: data,
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            if (result.code == '000') {
                                layer.msg("添加工人成功");
                                window.location.href = "#/master/mteam";
                                location.reload(true);
                            } else {
                                layer.alert(result.msg);
                            }
                        },
                        error: function (e, a, v) {
                            layer.alert("未知错误");
                        }
                    });
                    break;
            }
        }
    };

    /* 编辑前获得我的员工具体信息 */
    getInformation = {
        workDetail: function () {
            var cate_id = sessionStorage.getItem("cateid");
            var worker_id = sessionStorage.getItem("userid");
            $.ajax({
                type: "get",
                url: WORKERINFOURL,
                async: true,
                dataType: "jsonp",
                data: {
                    cate_id: cate_id,
                    worker_id: worker_id
                },
                success: function (data) {
                    if (data && data.code == '000') {
                        var cost = [],
                            k = 0;
                        var length = $(".edit_bottom li").length;
                        $(".staff_picture .add_picture").attr("data-flag", "1").addClass("clear").css({
                            'background': 'url("' + data.data.portrait_img + '") no-repeat',
                            'backgroundSize': '100% 100%'
                        });
                        $(".staff_name .name").val(data.data.name); //工人姓名
                        $(".staff_name .sex option:selected").val(data.data.sex); //工人性别   1：男生 2：女生
                        $(".staff_name .age").val(data.data.age); //工人年龄
                        $(".staff_home .place").val(data.data.birthplace); //工人籍贯
                        $(".staff_date input").val(data.data.worktime); //工人从业年限
                        $(".staff_phone .idcard").val(data.data.idcard); //身份证
                        $(".staff_phone .bankcard").val(data.data.bankcard); //银行卡
                        $(".staff_phone .phone").val(data.data.phone); //手机号
                        $(".staff_phone .bankname").val(data.data.bankname); //开户银行
                        $.each(data.data.pricelist, function (i, v) {
                            $.each(v.service, function (m, n) {
                                cost[k] = n.cost;
                                k++;
                            });
                        });
                        for (var j = 0; j < length; j++) {
                            $(".edit_bottom li").eq(j).find("input").val(cost[j]);
                        }
                        $('.staff_picture .add_picture').find('input').change(function () {
                            var inputImg = $(this);
                            inputImg.parent().parent().attr("data-flag", "0");
                            var file = inputImg.get(0).files[0];
                            var reader = new FileReader();
                            if (!/image\/\w+/.test(file.type)) {
                                inputImg.parent().parent().css('background', '');
                                inputImg.parent().parent().removeClass('clear');
                                layer.alert("请确保文件为图像类型");
                                inputImg.val(''); //清空file选择的文件
                                return false;
                            }
                            // onload是异步操作
                            else {
                                reader.onload = function (e) {
                                    inputImg.parent().parent().attr("data-flag", "1");
                                    inputImg.parent().parent().addClass('clear'); //图片预览时input file 添加opacity样式，设置完全透明
                                    inputImg.parent().parent().css({
                                        'background': 'url("' + e.target.result + '") no-repeat',
                                        'backgroundSize': '100% 100%'
                                    }); //图片设置为$('.showImg')背景图
                                    var data = new FormData();
                                    data.append("myfile", $("#worker_picture")[0].files[0]);
                                    data.append("user_id", worker_id);
                                    $.ajax({
                                        type: "post",
                                        url: USERIMGEDITURL,
                                        cache: false,
                                        data: data,
                                        dataType: "jsonp",
                                        jsonp: 'callback',
                                        processData: false,
                                        contentType: false,
                                        success: function (result) {
                                            layer.alert(result.msg);
                                        },
                                        error: function (e, a, v) {
                                            layer.alert("未知错误");
                                        }
                                    });
                                }
                            }
                            reader.readAsDataURL(file);
                        });
                        $(".staff_confirm").on("click", function () {
                            workerAction.editWorker(); //编辑工人
                        });
                    } else {
                        layer.alert(data.msg);
                    }
                },
                error: function (data) {
                }
            });

        }
    };

    /* 显示价格明细信息 */
    loadDetail = {
        showInformation: function () {
            var cate_id = sessionStorage.getItem("cateid");
            var service = [];
            $.ajax({
                type: "get",
                url: PRICELISTURL,
                async: true,
                dataType: "jsonp",
                data: {
                    cate_id: cate_id,
                    shop_id: $.base64.decode($.cookie("userShopId"))
                },
                success: function (data) {
                    var detail = '<ul>';
                    if (data != null && data.code == '000') {
                        $.each(data.data, function (i, v) {
                            $.each(v.service, function (m, n) {
                                detail += '<li><span class="name">' + n.servicename + '</span>';
                                detail += '<input title="" type="text" value="' + n.cost + '">';
                                detail += '<span class="unit">' + n.unit + '</span>';
                            });
                        });
                        detail += '</ul>';
                        $(".edit_bottom").append(detail);
                    }
                },
                error: function (data) {
                }
            });
        },
        showTable: function () {
            var cate_id = sessionStorage.getItem("cateid");
            var service = [];
            $.ajax({
                type: "get",
                url: PRICELISTURL,
                async: true,
                dataType: "jsonp",
                data: {
                    cate_id: cate_id,
                    shop_id: $.base64.decode($.cookie("userShopId"))
                },
                success: function (data) {
                    if (data != null && data.code == '000') {
                        var detail = '<ul>';
                        $.each(data.data, function (i, v) {
                            $.each(v.service, function (m, n) {
                                detail += '<li><span class="name">' + n.servicename + '</span>';
                                detail += '<span class="unit">' + n.unit + '</span>';
                                detail += '<span class="num">' + n.cost + '</span></li>';
                            });
                        });
                        detail += '</ul>';
                        $(".staff_bottom_content").append(detail);
                    }
                },
                error: function (data) {
                }
            });
        }
    };

    /* 工长店铺资料 */
    getShopInfoHandler = {
        shopInfo: function () {
            HHIT_CENTERAPP.controller('shop', ['$scope', '$http', function ($scope, $http) {
                /* 获取工长店铺资料开始 */
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
                        var openTime = data.data.opentime;
                        openTime = openTime.substring(0, 10);
                        $('#shop_name').val(data.data.shop_name);//获取店名
                        $('#shop_describe').val(data.data.shop_describe);//获取店铺理念
                        $('#shop_age').val(openTime);//获取店铺的开店时间
                        $('#shop_ad').val(data.data.shop_address);//获取店铺的地址
                        //获取店铺资料的服务区域
                        var aLen = data.data.servicearea.length;
                        for (var i = 0; i < aLen; i++) {
                            if (data.data.servicearea[i] != '') {
                                $('#personal_circle').before('<a class="personal_area service_area" href="javascript:;">' + data.data.servicearea[i] + '</a>');
                            }
                        }
                        // //获取店铺资料的擅长风格
                        var sLen = data.data.servicetag.length;
                        for (var i = 0; i < sLen; i++) {
                            if (data.data.servicetag[i] != '') {
                                $('#personal_style').before('<a class="personal_style" href="javascript:;">' + data.data.servicetag[i] + '</a>');
                            }
                        }
                        //获取店铺资料的店铺认证
                        var hLen = data.data.authentication.length;
                        for (var i = 0; i < hLen; i++) {
                            $('#shop_head').append('<img class="fl" src=' + data.data.authentication[i] + '>');
                        }
                        //获取店铺资料的本店工艺(最多只显示五张)
                        if (data.data.shop_technics.length >= 5) {
                            $scope.infos = data.data.shop_technics.slice(0, 5);
                            $('#technic_add').hide();
                            $('.detail_p').css('marginTop', '100px');
                        } else {
                            $scope.infos = data.data.shop_technics;
                            $('#technic_add').show();
                            $('.detail_p').css('marginTop', '5px');
                        }
                        if (data.data.shop_technics.length > 0) {
                            $.each(data.data.shop_technics, function (i, v) {
                                $('.detail_p').append('<b>' + v.technics_text + '</b>');
                            });
                        } else {
                            $('.detail_p').append('<b>随便说点什么吧！</b>');
                        }

                        //获取店铺资料的效果图展示(最多只显示四张)
                        if (data.data.shop_imgs.length >= 4) {
                            $scope.imgs = data.data.shop_imgs.slice(0, 4);
                            $('.renderings_img').hide();
                        } else {
                            $scope.imgs = data.data.shop_imgs;
                            $('.renderings_img').show();
                        }
                    }
                    /* 如果失败执行 */
                    else {
                        layer.layer.msg(data.msg);
                    }
                }).error(function (data, status) {
                });


                /* 擅长工长店铺资料风格标签的编辑*/
                var $edit = $(".shop_detail_style .edit");
                var $area_edit = $(".shop_detail_area .area_edit");
                var arr = [];
                var area_arr = [];
                $.ajax({
                    type: "get",
                    url: TAGURL,
                    async: true,
                    dataType: "jsonp",
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            var tag = '<div class="tag_content">';
                            $.each(data.data, function (i, v) {
                                tag += '<span>' + v.stylename + '</span>';
                            });
                            tag += '</div><a href="javascript:;" class="besure">确定</a>';
                            $edit.append(tag).addClass("display");
                        }
                    },
                    error: function (data) {
                    }
                });

                /* 点击添加擅长风格 */
                $('#personal_style').click(function () {
                    $edit.removeClass("display");
                    for (var i = 0; i < $(".shop_detail_style .personal_style").length; i++) {
                        arr[i] = $(".shop_detail_style .personal_style").eq(i).html();
                    }
                    //默认给标签加current
                    for (var i = 0; i < $(".shop_detail_style .edit span").length; i++) {
                        if ($.inArray($(".shop_detail_style .edit span").eq(i).html(), arr) >= 0) {
                            $(".shop_detail_style .edit span").eq(i).addClass("current");
                        }
                    }
                    //点击下面的标签添加标签
                    $edit.find("span").unbind('click').click(function () {
                        if (!$(this).hasClass('current')) {
                            $(this).addClass("current");
                            $('#personal_style').before('<a class="personal_style" href="javascript:;">' + $(this).html() + '</a>');
                        } else {
                            $(this).removeClass("current");
                            for (var i = 0; i < $(".shop_detail_style .personal_style").length; i++) {
                                if ($(this).html() == $(".shop_detail_style .personal_style").eq(i).html()) {
                                    $(".shop_detail_style .personal_style").eq(i).remove();
                                }
                            }
                        }
                    });
                    $edit.find(".besure").unbind('click').click(function () {
                        $edit.addClass("display");
                        arr = [];
                    });
                });

                /* 点击添加服务区域 */
                $('#personal_circle').click(function () {
                    $area_edit.removeClass("display");
                    for (var i = 0; i < $(".shop_detail_area .personal_area").length; i++) {
                        area_arr[i] = $(".shop_detail_area .personal_area").eq(i).html();
                    }
                    //默认给标签加current
                    for (var i = 0; i < $(".shop_detail_area .area_edit span").length; i++) {
                        if ($.inArray($(".shop_detail_area .area_edit span").eq(i).html(), area_arr) >= 0) {
                            $(".shop_detail_area .area_edit span").eq(i).addClass("current");
                        }
                    }
                    //点击下面的标签添加标签
                    $area_edit.find("span").unbind('click').click(function () {
                        if (!$(this).hasClass('current')) {
                            $(this).addClass("current");
                            $('#personal_circle').before('<a class="personal_area" href="javascript:;">' + $(this).html() + '</a>');
                        } else {
                            $(this).removeClass("current");
                            for (var i = 0; i < $(".shop_detail_area .personal_area").length; i++) {
                                if ($(this).html() == $(".shop_detail_area .personal_area").eq(i).html()) {
                                    $(".shop_detail_area .personal_area").eq(i).remove();
                                }
                            }
                        }
                    });
                    $area_edit.find(".area_sure").unbind('click').click(function () {
                        $area_edit.addClass("display");
                        area_arr = [];
                    });
                });

                /* 获取工长店铺资料结束 */

                /* 编辑工长店铺资料开始 */
                $('#shop_save').click(function () {
                    var array = [];
                    var arry_area = [];
                    for (var i = 0; i < $('.personal_style').length; i++) {
                        array.push($('.personal_style').eq(i).html());
                    }
                    for (var i = 0; i < $('.personal_area').length; i++) {
                        arry_area.push($('.personal_area').eq(i).html());
                    }
                    $.ajax({
                        url: MASTERSHOPURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            shop_id: $.base64.decode($.cookie("userShopId")),
                            shop_name: $('#shop_name').val(),
                            shop_address: $('#shop_ad').val(),
                            shop_describe: $('#shop_describe').val(),
                            servicetag: array,
                            servicearea: arry_area
                        },
                        success: function (data) {
                            if (data != null && data.code == '000') {
                                layer.msg(data.msg);
                            }
                        },
                        error: function (data) {
                        }
                    });
                });
                /* 编辑工长店铺资料结束 */

                /* 点击删除本店工艺开始 */
                $(document).off('click', '#complete_del').on('click', '#complete_del', function () {
                    var technicsid = $(this).attr('technicsid');
                    $.ajax({
                        url: DELTECURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            technics_id: technicsid
                        },
                        success: function (data) {
                            if (data.code == '000') {
                                layer.msg(data.msg);
                                $('.detail_p b').remove();
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
                                        //console.log(data);
                                        //获取店铺资料的本店工艺(最多只显示五张)
                                        if (data.data.shop_technics.length >= 5) {
                                            $scope.infos = data.data.shop_technics.slice(0, 5);
                                            $('#technic_add').hide();
                                            $('.detail_p').css('marginTop', '100px');
                                        } else {
                                            $scope.infos = data.data.shop_technics;
                                            $('#technic_add').show();
                                            $('.detail_p').css('marginTop', '5px');
                                        }
                                        if (data.data.shop_technics.length > 0) {
                                            $.each(data.data.shop_technics, function (i, v) {
                                                $('.detail_p').append('<b>' + v.technics_text + '</b>');
                                            });
                                        } else {
                                            $('.detail_p').append('<b>随便说点什么吧！</b>');
                                        }
                                    } else {
                                        layer.msg(data.msg);
                                    }
                                })
                            } else {
                                layer.msg(data.msg);
                            }

                        },
                        error: function (data) {
                        }
                    });
                });
                /* 点击删除本店工艺结束 */

                /* 点击删除效果图开始 */
                $(document).off('click', '#img_del').on('click', '#img_del', function () {
                    var imgid = $(this).attr('imgid');
                    $.ajax({
                        url: DELSHOPURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            img_id: imgid
                        },
                        success: function (data) {
                            if (data.code == '000') {
                                layer.msg(data.msg);
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
                                        //console.log(data);
                                        //获取店铺资料的效果图展示(最多只显示四张)
                                        if (data.data.shop_imgs.length >= 4) {
                                            $scope.imgs = data.data.shop_imgs.slice(0, 4);
                                            $('.renderings_img').hide();
                                        } else {
                                            $scope.imgs = data.data.shop_imgs;
                                            $('.renderings_img').show();
                                        }
                                    }
                                    /* 如果失败执行 */
                                    else {
                                        layer.layer.msg(data.msg);
                                    }
                                });
                            } else {
                                layer.msg(data.msg);
                            }

                        },
                        error: function (data) {
                        }
                    });
                });
                /* 点击删除效果图结束 */

                /* 点击添加工艺弹出弹层 */
                $('#technic_add').click(function () {
                    $('.add_picture input').val('');//清空file选择的文件
                    var NUM = $(this).parents(".right_content_wrap").next('.add_technology');
                    $('.add_technology').css('top', ($(window).height() - NUM.outerHeight()) / 2 + $(document).scrollTop());
                    $('.add_technology').show().removeClass('hide').removeClass("edit");
                    $('.wrap').show().removeClass('hide');
                    var $add_picture = $('.add_picture');
                    var $add_picture_a = $add_picture.find('a');
                    $add_picture_a.removeClass('opacity');
                    $add_picture.css('background-image', '');
                    $add_picture.find('.close').hide();
                    $('#textarea').val('');
                    upImg('.add_picture');//本店工艺上传图片
                });

                var img_id = [];
                // var img_count = 0;
                /* 点击本店工艺更改弹出弹层 */
                $(document).on('click', '.renderings_show_a', function () {
                    $('.add_technology').show().removeClass('hide').addClass("edit");
                    $('.wrap').show().removeClass('hide');

                    var infos = $scope.infos;
                    var craftImg = $('.craft_img');
                    $.each(craftImg, function (i, v) {
                        $(this).data('imgs', infos[i].technics_img);
                        $(this).data('text', infos[i].technics_text);
                        $(this).data("tid", infos[i].technics_id);
                    });
                    var $add_picture = $('.add_picture');
                    var $add_picture_a = $add_picture.find('a');
                    $add_picture_a.removeClass('opacity new');
                    $add_picture.css('background-image', '');
                    $add_picture.removeAttr('img_id');
                    $add_picture.removeAttr('count');
                    $add_picture.find('.close').hide();
                    var $img = $(this).prev().prev();
                    var imgs = $img.data('imgs');
                    $.each(imgs, function (i, v) {
                        $add_picture_a.eq(i).addClass('opacity'); //图片预览时input file 添加opacity样式，设置完全透明
                        $add_picture.eq(i).css('background-image', 'url(' + v.technics_img + ')'); //图片设置为$('.showImg')背景图
                        $add_picture.eq(i).find('.close').show();
                        $add_picture.eq(i).attr("img_id", v.img_id);
                        $add_picture.eq(i).attr("count", 0);
                    });
                    $('.add_technology').attr("technics_id", $img.data('tid'));
                    $('#textarea').val($img.data('text'));
                    upImg('.add_picture');//本店工艺上传图片
                });

                /* 点击弹层叉号关闭弹层 */
                $('#add_close').click(function () {
                    $('.add_technology').hide();
                    $('.add_technology').removeClass("edit");
                    $(".add_technology .add_picture").removeAttr("img_id");
                    $(".add_technology .add_picture").removeAttr("count");
                    $('.wrap').hide();
                });

                /* 图片上传预览 */
                function upImg(div) {
                    $(div).find('input').unbind("change").change(function () {
                        var inputImg = $(this);
                        var file = inputImg.get(0).files[0];
                        var id = inputImg.parent().parent().attr("img_id");
                        var reader = new FileReader();
                        if (file) {
                            if (!/image\/\w+/.test(file.type)) {
                                inputImg.parent().parent().css('background-image', '');
                                inputImg.parent().removeClass('opacity new');
                                layer.msg("请确保文件为图像类型");
                                inputImg.val('');//清空file选择的文件
                                return false;
                            }
                            // onload是异步操作
                            else {
                                reader.onload = function (e) {
                                    if (id == undefined) {
                                        inputImg.parent().parent().attr("count", 1);
                                    } else if (img_id.indexOf(id) != -1) {
                                        inputImg.parent().parent().attr("count", 1);
                                        img_id.push(id);
                                    }
                                    inputImg.parent().addClass('opacity new');//图片预览时input file 添加opacity样式，设置完全透明
                                    inputImg.parent().parent().css('background-image', 'url("' + e.target.result + '")');//图片设置为$('.showImg')背景图
                                    inputImg.parent().parent().find('.close').show();
                                }
                            }
                            reader.readAsDataURL(file);
                        }
                    });
                }

                // upImg('.add_picture');//本店工艺上传图片
                //upImg('#renderings_img');//效果图上传图片


                /* 上传图片后点击红色叉叉图片取消事件 */
                $('.close').click(function () {
                    $(this).parent().find('a').removeClass('opacity new');
                    $(this).parent().css('background-image', '');
                    $(this).parent().attr("count", 0);
                    var id = $(this).parent().attr("img_id");
                    if (id != undefined && img_id.indexOf(id) < 0) {
                        img_id.push(id);
                    }
                    $(this).hide();
                });

                /* 上传效果图 */
                $(document).off('change', '#renderings_file').on('change', '#renderings_file', function () {
                    var inputImg = $(this);
                    var file = inputImg.get(0).files[0];
                    if (!/image\/\w+/.test(file.type)) {
                        layer.msg("请确保文件为图像类型");
                        inputImg.val('');//清空file选择的文件
                        return false;
                    } else {
                        var data = new FormData();
                        data.append("shop_id", $.base64.decode($.cookie("userShopId")));
                        data.append("myfile", $("#renderings_file")[0].files[0]);
                        $.ajax({
                            url: SIMGURL,
                            type: 'POST',
                            data: data,
                            dataType: 'jsonp',
                            jsonp: 'callback',
                            cache: false,
                            processData: false,
                            contentType: false,
                            success: function (result) {
                                if (result.code === '000') {
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
                                            //console.log(data);
                                            //获取店铺资料的效果图展示(最多只显示四张)
                                            if (data.data.shop_imgs.length >= 4) {
                                                $scope.imgs = data.data.shop_imgs.slice(0, 4);
                                                $('.renderings_img').hide();
                                            } else {
                                                $scope.imgs = data.data.shop_imgs;
                                                $('.renderings_img').show();
                                            }
                                            var $renderings_img = $('#renderings_img');
                                            $renderings_img.css('backgroundImage', '');
                                            $renderings_img.find('a').removeClass('opacity');
                                        }
                                        /* 如果失败执行 */
                                        else {
                                            layer.msg(data.msg);
                                        }
                                    });
                                    layer.msg(result.msg);
                                    $('#renderings_file').val('');//清空file选择的文件
                                } else {
                                    layer.msg(result.msg);
                                    $('#renderings_file').val('');//清空file选择的文件
                                }
                            },
                            error: function (e, a, v) {
                                alert("错误！！");
                            }
                        });
                    }
                });

                /* 上传与更改本店工艺 */
                $(document).off('click', '.complete').on('click', '.complete', function () {
                    var img_count = 0;
                    if ($(this).parent().parent().parent().hasClass("edit")) { //更改本店工艺
                        var data = new FormData();
                        data.append("technics_id", $('.add_technology').attr("technics_id"));
                        data.append("describe", $('#textarea').val());
                        for (var i = 0; i < 3; i++) {
                            if ($(".add_technology .add_picture").eq(i).attr("count") == 1) {
                                img_count++;
                            }
                        }
                        data.append("count", img_count);
                        data.append("type", 1);
                        for (var i = 0; i < img_id.length; i++) {
                            data.append("img_id[]", img_id[i]);
                        }
                        for (var i = 1; i <= 3; i++) {
                            if ($("#file" + i).val() && $("#file" + i).parent().hasClass("new")) {
                                data.append("myfile[]", $("#file" + i)[0].files[0]);
                            }
                        }
                        $.ajax({
                            type: "POST",
                            url: ETECURL,
                            data: data,
                            dataType: "jsonp",
                            jsonp: 'callback',
                            cache: false,
                            processData: false,
                            contentType: false,
                            success: function (result) {
                                if (result.code == '000') {
                                    layer.msg(result.msg);
                                    $('.detail_p b').remove();
                                    $('.add_technology').hide();
                                    $('.wrap').hide();
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
                                            //console.log(data);
                                            //获取店铺资料的本店工艺(最多只显示五张)
                                            if (data.data.shop_technics.length >= 5) {
                                                $scope.infos = data.data.shop_technics.slice(0, 5);
                                                $('#technic_add').hide();
                                                $('.detail_p').css('marginTop', '100px');
                                            } else {
                                                $scope.infos = data.data.shop_technics;
                                                $('#technic_add').show();
                                                $('.detail_p').css('marginTop', '5px');
                                            }
                                            if (data.data.shop_technics.length > 0) {
                                                $.each(data.data.shop_technics, function (i, v) {
                                                    $('.detail_p').append('<b>' + v.technics_text + '</b>');
                                                });
                                            } else {
                                                $('.detail_p').append('<b>随便说点什么吧！</b>');
                                            }
                                        }
                                        /* 如果失败执行 */
                                        else {
                                            layer.layer.msg(data.msg);
                                        }
                                    }).error(function (data, status) {
                                    });
                                } else {
                                    layer.alert(result.msg);
                                }
                            },
                            error: function (e, a, v) {
                                layer.alert("未知错误");
                            }
                        });
                    } else { //上传本店工艺
                        var data = new FormData();
                        data.append("shop_id", $.base64.decode($.cookie("userShopId")));
                        data.append("describe", $('#textarea').val());
                        for (var i = 1; i <= 3; i++) {
                            if ($("#file" + i).val()) {
                                data.append("myfile[]", $("#file" + i)[0].files[0]);
                            }
                        }
                        $.ajax({
                            url: STECURL,
                            type: 'POST',
                            data: data,
                            dataType: 'jsonp',
                            jsonp: 'callback',
                            cache: false,
                            processData: false,
                            contentType: false,
                            success: function (result) {
                                if (result.code === '000') {
                                    $('.detail_p b').remove();
                                    layer.msg(result.msg);
                                    $('.add_technology').hide();
                                    $('.wrap').hide();
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
                                            //console.log(data);
                                            //获取店铺资料的本店工艺(最多只显示五张)
                                            if (data.data.shop_technics.length >= 5) {
                                                $scope.infos = data.data.shop_technics.slice(0, 5);
                                                $('#technic_add').hide();
                                                $('.detail_p').css('marginTop', '100px');
                                            } else {
                                                $scope.infos = data.data.shop_technics;
                                                $('#technic_add').show();
                                                $('.detail_p').css('marginTop', '5px');
                                            }
                                            if (data.data.shop_technics.length > 0) {
                                                $.each(data.data.shop_technics, function (i, v) {
                                                    $('.detail_p').append('<b>' + v.technics_text + '</b>');
                                                });
                                            } else {
                                                $('.detail_p').append('<b>随便说点什么吧！</b>');
                                            }
                                        }
                                        /* 如果失败执行 */
                                        else {
                                            layer.layer.msg(data.msg);
                                        }
                                    }).error(function (data, status) {
                                    });
                                    $('.add_picture input').val('');//清空file选择的文件
                                } else {
                                    layer.msg(result.msg);
                                }
                            },
                            error: function (e, a, v) {
                                alert("错误！！");
                            }
                        });
                    }

                });

            }]);
        }
    };

    /* 获取工长我的作品 */
    getWorkInfoHandler = {
        workInfo: function () {
            HHIT_CENTERAPP.controller('work', ['$scope', '$http', function ($scope, $http) {
                /* 获取入驻嗨吼之前的数据 */
                function http() {
                    $http({
                        method: "JSONP",
                        url: WORKCURL,
                        params: {
                            foreman_id: USERID,
                            type: 1,
                            limit: 4
                        },
                        beforeSend: function () {
                            $(".complete_before .works_detail").remove();
                            $(".complete_before").append(load);
                        },
                        complete: function () {
                            $(".complete_before .loading").remove();
                        }
                    }).success(function (data, status) {
                        /* 如果成功执行 */
                        if (data && data.code === '000') {
                            console.log(data.data);
                            if (data.data.length >= 4) {
                                $scope.works = data.data.slice(0, 4);
                                $('.new_album').hide();
                            } else {
                                $scope.works = data.data;
                                $('.new_album').show();
                            }
                            // $scope.session = function (id) {
                            //     sessionStorage.setItem("case_id", id);
                            // };

                            $(document).on('click', '.works_detail', function () {
                                sessionStorage.setItem("case_id", $(this).attr('caseid'));
                                sessionStorage.setItem("isshopdetail", '1');
                            })

                        }
                        /* 如果失败执行 */
                        else {
                            //layer.msg(data.msg);
                        }
                    }).error(function (data, status) {
                    });
                }

                http();
                //删除入驻嗨吼之前的项目
                $(document).off('click', '.complete_del').on('click', '.complete_del', function () {
                    var $caseId = $(this).attr('caseId');
                    $.ajax({
                        url: DELCASEURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            case_id: $caseId
                        },
                        success: function (data) {
                            if (data && data.code == '000') {
                                layer.msg(data.msg);
                                http();
                            } else {
                                layer.msg(data.msg);
                            }
                        },
                        error: function (data) {
                        }
                    });
                });

                /* 获取已完成的数据 */
                $.ajax({
                    type: "get",
                    url: WORKCURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        foreman_id: USERID,
                        type: 2,
                        page: 1,
                        limit: 8
                    },
                    success: function (data) {
                        //console.log(data.data);

                        if (data && data.code === '000') {
                            len2 = data.data[0].total;//获取已完成的总数据
                            var vrStr = '';
                            $.each(data.data, function (i, v) {
                                vrStr += spliceWCompleteContent.spliceStrEvent(v);
                            });
                            $(".works_complete").html(vrStr);
                            WCompletePageHandler.pageContentEvent();
                        }
                        else if (data.code == '117') {
                            $('.works_completeWrap').remove();
                            $('.works_complete_wrap .not_information').show().removeClass('hide');
                            $('.works_complete_wrap .not_information_text').html('您现在还没有已完成的作品哦~~');
                        } else {
                            layer.msg(data.msg);
                        }
                    },
                    error: function (data) {
                    }
                });

                /* 获取未完成的数据 */
                $.ajax({
                    type: "get",
                    url: WORKCURL,
                    async: true,
                    dataType: "jsonp",
                    data: {
                        foreman_id: USERID,
                        type: 3,
                        page: 1,
                        limit: 8
                    },
                    success: function (data) {
                        //console.log(data.data);
                        if (data && data.code === '000') {
                            len3 = data.data[0].total;//获取已完成的总数据
                            var vrStr = '';
                            $.each(data.data, function (i, v) {
                                vrStr += spliceWUndoneContent.spliceStrEvent(v);
                            });
                            $(".worksPending").html(vrStr);
                            WUndonePageHandler.pageContentEvent();
                        } else if (data.code == '117') {
                            $('.works_pending').remove();
                            $('.works_pending_wrap .not_information').show().removeClass('hide');
                            $('.works_pending_wrap .not_information_text').html('您现在还没有待完成的作品哦~~');
                        } else {
                            layer.msg(data.msg);
                        }
                    },
                    error: function (data) {
                    }
                });

                /* 点击已完成进入订单详情页面 */
                $(document).on('click', '#detail_bg', function () {
                    sessionStorage.setItem("step", $(this).attr('step'));
                    sessionStorage.setItem("orderId", $(this).attr('orderId'));
                    sessionStorage.setItem("status", '已完成');
                    window.open('order.html#/order');
                });

                /* 点击待完成进入订单详情页面 */
                $(document).on('click', '.undone', function () {
                    sessionStorage.setItem("step", $(this).parents('.works_detail').attr('step'));
                    sessionStorage.setItem("orderId", $(this).parents('.works_detail').attr('orderId'));
                    sessionStorage.setItem("status", '订单进行中');
                    window.open('order.html#/order');
                })

            }]);
        }
    };

    /* 左右切换图片 */
    superSlide = {
        slidePic: function () {
            $("#success_case").slide({
                titCell: ".hd ul",
                mainCell: ".bg_picture ul",
                autoPage: false,
                trigger: "click",
                effect: "leftLoop",
                autoPlay: false,
                vis: 1
            });
        }
    };

    /* 我的作品增加新作品的提交 */
    ajaxSubmit = {
        confirmAdd: function () {
            var $area = $(".new_areacnt input"); //建筑面积
            var $room = $(".room option:selected"); //室所选中的项
            var $hall = $(".hall option:selected"); //厅所选中的项
            var $toilet = $(".toilet option:selected"); //卫所选中的项
            var $balcony = $(".balcony option:selected"); //阳台所选中的项
            var $style = $(".new_stylecnt span.active"); //选中的装修风格
            var $syear = $(".year1 option:selected"); //起始年份选中的项
            var $smonth = $(".month1 option:selected"); //起始月份选中的项
            var $sday = $(".day1 option:selected"); //起始日选中的项
            var $eyear = $(".year2 option:selected"); //结束年份选中的项
            var $emonth = $(".month2 option:selected"); //结束月份选中的项
            var $eday = $(".day2 option:selected"); //结束日选中的项
            var $address = $(".detail_address input"); //详细地址
            var count = 0;
            var flag = true; // 判断能不能提交 true：能提交  false： 不能提交
            var housetype = $room.val() + "室" + $hall.val() + "厅" + $toilet.val() + "卫" + $balcony.val() + "阳台";
            var timelong = $syear.val() + "." + $smonth.val() + "." + $sday.val() + "-" + $eyear.val() + "." + $emonth.val() + "." + $eday.val();
            var data = new FormData();
            data.append("foreman_id", USERID);
            data.append("housetype", housetype);
            data.append("style", $style.html());
            data.append("timelong", timelong);
            data.append("address", $address.val());
            data.append("area", $area.val());
            for (var i = 1; i <= 5; i++) {
                if ($("#file" + i).val()) {
                    data.append("myfile[]", $("#file" + i)[0].files[0]);
                    count++;
                }
            }
            /**
             * 相关验证
             */
            if ($area.val() == "" || $area.val() == null) {
                errorRemind.errorContent(MSG1, $(".new_area h3"));
                flag = false;
            }
            if ($room.val() == "请选择" || $hall.val() == "请选择" || $toilet.val() == "请选择" || $balcony.val() == "请选择") {
                errorRemind.errorContent(MSG2, $(".new_type h3"));
                flag = false;
            }
            if ($style.html() == "" || $style.html() == null) {
                errorRemind.errorContent(MSG3, $(".new_style h3"));
                flag = false;
            }
            if ($syear.html() == "-年份-" || $smonth.html() == "-月份-" || $sday.html() == "-日期-" || $eyear.html() == "-年份-" || $emonth.html() == "-月份-" || $eday.html() == "-日期-") {
                errorRemind.errorContent(MSG4, $(".new_schedule h3"));
                flag = false;
            } else if (parseInt($syear.html()) > parseInt($eyear.html())) {
                errorRemind.errorContent(MSG4, $(".new_schedule h3"));
                flag = false;
            } else if (parseInt($syear.html()) == parseInt($eyear.html()) && parseInt($smonth.html()) > parseInt($emonth.html())) {
                errorRemind.errorContent(MSG4, $(".new_schedule h3"));
                flag = false;
            } else if (parseInt($syear.html()) == parseInt($eyear.html()) && parseInt($smonth.html()) == parseInt($emonth.html()) && parseInt($sday.html()) > parseInt($eday.html())) {
                errorRemind.errorContent(MSG4, $(".new_schedule h3"));
                flag = false;
            }
            if ($address.val() == "" || $address.val() == null) {
                errorRemind.errorContent(MSG5, $(".new_address h3"));
                flag = false;
            }
            if (count == 0) {
                errorRemind.errorContent(MSG6, $(".construction_picture h3"));
                flag = false;
            }
            // 验证后有错误则return 不提交
            if (!flag) {
                return;
            }
            $.ajax({
                type: "post",
                url: NEWCASEURL,
                dataType: 'jsonp',
                jsonp: 'callback',
                data: data,
                cache: false,
                processData: false,
                contentType: false,
                success: function (result) {
                    if (result.code == '000') {
                        window.location.href = "#/master/mwork";
                        location.reload(true);
                    } else {
                        layer.alert("上传失败");
                    }
                },
                error: function (e, a, v) {
                    layer.alert("未知错误");
                }
            });
        }
    };

    /**
     * 我的作品错误提示信息
     * @param {Object} msg 错误提示文字
     * @param {Object} element 错误所在之处
     */
    errorRemind = {
        errorContent: function (msg, element) {
            element.siblings("label").text(msg).addClass("whether");
        }
    };

    /* 我的作品点击隐藏错误信息 */
    removeError = {
        clickEvent: function () {
            $(".new_work_content>div").on("click", function () { // 点击隐藏错误信息
                $(this).children("label").removeClass("whether");
            });
        }
    };

    /* 我的作品增加新的施工图片 */
    addPicture = {
        constructionPic: function () {
            $(".add_picture input").on("change", function () {
                var inputImg = $(this);
                var file = inputImg.get(0).files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                if (!/image\/\w+/.test(file.type)) {
                    inputImg.parent().parent().css('background', '');
                    inputImg.parent().parent().removeClass('clear');
                    layer.alert("请确保文件为图像类型");
                    inputImg.val(''); //清空file选择的文件
                    return false;
                } else {
                    reader.onload = function (e) {
                        inputImg.parent().parent().addClass('clear'); //图片预览时input file 添加opacity样式，设置完全透明
                        inputImg.parent().siblings('.close').show();
                        inputImg.parent().parent().css({
                            'background': 'url("' + e.target.result + '") no-repeat',
                            'backgroundSize': '100% 100%'
                        }); //图片设置为$('.showImg')背景图
                        /* 点击叉叉图片取消事件 */
                        $('.close').on("click", function () {
                            $(this).parent().removeClass('clear');
                            $(this).parent().css('background', '');
                            $(this).hide();
                        });
                    }
                }

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
                    //console.log(data);
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

    /* 消息中心拼接内容 */
    spliceContentHandler = {
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

    /* 消息中心分页 */
    pageHandler = {
        pageContentEvent: function () {
            MAXROWS = Math.ceil(TOTAL / 4); // 页数
            $(".page_div3").empty().paging({
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
                    //markRead.checkAll();
                } //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
            });
        }
    };

    /* 我的团队具体工人分页 */
    workpageHandler = {
        pageContentEvent: function (box_total, cate_id) {
            MAXROWS = Math.ceil(box_total / 5); // 页数
            $(".page_div3").empty().paging({
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
                url: TEAMURL, //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
                ajaxData: {
                    shop_id: $.base64.decode($.cookie("userShopId")),
                    cate_id: cate_id,
                    page: 1,
                    limit: 5
                },   //ajax方式传值时的附加传值,要传的参数放在这里面,页面参数只要指定idParamemeter就好，会自动添加
                dataOperate: function oprate(data) {
                    $('.team_detail_content').remove();
                    var worker = '<div class="team_detail_content clearfix">';
                    $.each(data.data, function (i, v) {
                        worker += '<div class="worker_box sprite_team" data-id="' + v.userid + '" data-action="edit"><a href="#/master/teamDetail_list">';
                        worker += '<div class="head_picture"><img src="' + v.portrait_img + '"></div>';
                        worker += '<div class="worker_content"><h3><span class="name">' + v.name + '</span>';
                        worker += '<span class="age">' + v.age + '岁</span></h3>';
                        worker += '<ul class="worker_information"><li>';
                        worker += '<span class="span_left">籍贯</span><span class="span_right">' + v.birthplace + '</span></li>';
                        worker += '<li><span class="span_left">从业时间</span><span class="span_right">' + v.worktime + '</span></li>';
                        worker += '<li><span class="span_left">手机号</span><span class="span_right">' + v.phone + '</span></li>';
                        worker += '<li><span class="span_left">身份证号</span><span class="span_right">' + v.idcard + '</span></li>';
                        worker += '<li><span class="span_left">开户银行</span><span class="span_right">' + v.bankname + '</span></li>';
                        worker += '<li><span class="span_left">银行卡号</span><span class="span_right">' + v.bankcard + '</span></li>';
                        worker += '</ul></div></a></div>';
                    });
                    worker += '<div class="worker_box sprite_team worker_add" data-action="add"><a href="#/master/teamDetail_edit"></a></div></div>';
                    $(".team_detail_wrap .page_number").before(worker);
                    $(".team_detail_content .worker_box").on("click", function () {
                        var id = $(this).attr("data-id");
                        var action = $(this).attr("data-action");
                        sessionStorage.setItem("userid", id);
                        sessionStorage.setItem("action", action);
                    });
                    //markRead.checkAll();
                } //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
            });
        }
    };

    /* 我的订单拼接内容 */
    spliceOrderContent = {
        spliceStrEvent: function (value) {
            var vrStr = '<div class="order_box" step ="' + value.order_step + '" orderId ="' + value.order_id + '" status ="' + value.order_status + '">';
            vrStr += '<div class="ordercnt_title clearfix">';
            vrStr += '<span>' + value.room + '室' + value.parlour + '厅' + value.toilet + '卫' + value.balcony + '阳台</span>';
            vrStr += '<span>订单号</span>';
            vrStr += '<span>' + value.order_id + '</span>';
            vrStr += '<span>' + value.order_time + '</span>';
            vrStr += '</div>';
            vrStr += '<div class="ordercnt_content">';
            vrStr += '<div class="block clearfix">';
            vrStr += '<div class="name">';
            vrStr += '<p>' + value.user_realname + '</p>';
            vrStr += '<p>' + value.user_phone + '</p>';
            vrStr += '</div>';
            vrStr += '<div class="address">';
            vrStr += '<span>' + value.order_address + '</span>';
            vrStr += '</div>';
            vrStr += '<div class="size area">';
            vrStr += '<p class="item_hover_0">' + value.area + '</p>';
            vrStr += '</div>';
            vrStr += '<div class="stage">';
            vrStr += '<span>' + value.order_status + '</span>';
            vrStr += '</div>';
            vrStr += '<div class="money">';
            if (value.actual_finish_amount != '' && value.actual_finish_amount != null) {
                vrStr += '<span>' + value.actual_finish_amount + '</span>';
            } else {
                vrStr += '<span>0</span>';
            }

            vrStr += '</div>';
            vrStr += '<div class="all">';
            vrStr += '<a class="progress_updates">进度更新</a>';
            vrStr += '</div>';
            vrStr += '</div>';
            vrStr += '<div class="order_detail display">';
            vrStr += '<p>户型：三室两厅 &nbsp;&nbsp;餐厅、客厅、卧室、阳台、卫生间</p>';
            vrStr += '<p>简介：起居室整体色彩干净清爽，浅色的背景墙和沙发让空间基调利落明快，而与之相对比的红色地毯则让空间现代化感更强，且不失活泼。利用侧面的“裸妆”墙体收货一个更为丰富且个性的立体装饰效果，同时也达到了客厅空间的收纳作用。</p>';
            vrStr += '</div>';
            vrStr += '</div>';
            vrStr += '</div>';
            return vrStr;
        }
    };

    /* 我的订单分页 */
    OrderPageHandler = {
        pageContentEvent: function (total, url, data) {
            $(".page_div3").empty().paging({
                total: Math.ceil(total / 3), //全部页数
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
                url: url, //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
                ajaxData: data,   //ajax方式传值时的附加传值,要传的参数放在这里面,页面参数只要指定idParamemeter就好，会自动添加
                dataOperate: function oprate(data) {
                    $(".order_wrap").empty();
                    var vrStr = "";
                    $.each(data.data.order_list, function (i, v) {
                        /* 判断当前状态 */
                        if (data.data.order_list[i].order_status == '1') {
                            data.data.order_list[i].order_status = '待确认'
                        } else if (data.data.order_list[i].order_status == '2') {
                            data.data.order_list[i].order_status = '待预约'
                        } else if (data.data.order_list[i].order_status == '3') {
                            data.data.order_list[i].order_status = '待上门量房'
                        } else if (data.data.order_list[i].order_status == '4') {
                            data.data.order_list[i].order_status = '待用户预支付'
                        } else if (data.data.order_list[i].order_status == '5') {
                            data.data.order_list[i].order_status = '订单进行中'
                        } else if (data.data.order_list[i].order_status == '6') {
                            data.data.order_list[i].order_status = '已完成'
                        } else if (data.data.order_list[i].order_status == '7') {
                            data.data.order_list[i].order_status = '已取消'
                        } else if (data.data.order_list[i].order_status == '8') {
                            data.data.order_list[i].order_status = '工长店铺取消'
                        }
                        vrStr += spliceOrderContent.spliceStrEvent(v);
                        $(".order_wrap").html(vrStr);
                    });

                } //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
            });
        }
    };

    /* 我的作品已完成拼接内容 */
    spliceWCompleteContent = {
        spliceStrEvent: function (value) {
            var vrStr = '<div class="works_detail fl works_bg">';
            vrStr += '<div class="detail_img">';
            vrStr += '<img src="' + value.img[0].case_img + '">';
            vrStr += '</div><!--detail_img-->';
            vrStr += '<div id="detail_bg" class="detail_bg clearfix" step ="' + value.order_step + '" orderId ="' + value.case_id + '">';
            vrStr += '<div class="detail_bg_div">';
            vrStr += '</div><!--detail_bg_div-->';
            vrStr += '<div class="detail_bg_content">';
            vrStr += '<dl>';
            vrStr += '<dd><span>' + value.area + '</span>m<sup>2</sup></dd>';
            vrStr += '<dd>' + value.style + '</dd>';
            vrStr += '<dd>' + value.housetype + '</dd>';
            vrStr += '</dl>';
            vrStr += '</div><!--detail_bg_content-->';
            vrStr += '</div><!--detail_bg-->';
            vrStr += '</div><!--works_detail-->';
            return vrStr;
        }
    };

    /* 我的作品已完成分页 */
    WCompletePageHandler = {
        pageContentEvent: function () {
            $(".page_div4").empty().paging({
                total: Math.ceil(len2 / 8), //全部页数
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
                url: WORKCURL, //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
                ajaxData: {
                    foreman_id: USERID,
                    type: 2,
                    page: 1,
                    limit: 8
                },   //ajax方式传值时的附加传值,要传的参数放在这里面,页面参数只要指定idParamemeter就好，会自动添加
                dataOperate: function oprate(data) {
                    var vrStr = '';
                    $.each(data.data, function (i, v) {
                        vrStr += spliceWCompleteContent.spliceStrEvent(v);
                    });
                    $(".works_complete").html(vrStr);
                } //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
            });
        }
    };

    /* 我的作品未完成拼接内容 */
    spliceWUndoneContent = {
        spliceStrEvent: function (value) {
            var vrStr = '<div class="works_detail fl complete_img" step ="' + value.order_step + '" orderId ="' + value.case_id + '">';
            vrStr += '<div class="detail_img">';
            vrStr += '<img src="css/img/my_work1.jpg">';
            vrStr += '</div><!--detail_img-->';
            vrStr += '<div class="pending_font undone clearfix">';
            vrStr += '<em class="address_em sprite_team fl"></em><p class="pending_address fl">' + value.address + '</p>';
            vrStr += '<p class="pending_name fl"><em class="sprite_team"></em>' + value.area + '</p>';
            vrStr += '<p class="pending_tel fl"><em class="sprite_team"></em>' + value.housetype + '</p>';
            vrStr += '</div><!--pending_font-->';
            vrStr += '<div class="bg undone"></div>';
            vrStr += '</div><!--works_detail-->';
            return vrStr;

        }
    };

    /* 我的作品未完成分页 */
    WUndonePageHandler = {
        pageContentEvent: function () {
            $(".page_div5").empty().paging({
                total: Math.ceil(len3 / 8), //全部页数
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
                url: WORKCURL, //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
                ajaxData: {
                    foreman_id: USERID,
                    type: 3,
                    page: 1,
                    limit: 8
                },   //ajax方式传值时的附加传值,要传的参数放在这里面,页面参数只要指定idParamemeter就好，会自动添加
                dataOperate: function oprate(data) {
                    var vrStr = '';
                    $.each(data.data, function (i, v) {
                        vrStr += spliceWUndoneContent.spliceStrEvent(v);
                    });
                    $(".WUndonePageHandler").html(vrStr);
                } //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
            });
        }
    };

    /* 消息中心删除记录 */
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
                            initInfo.info();
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

    /* 消息中心全选标记已读 */
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

//入口方法调用 代码只能从这里执行
    centerWrap.init();
})();