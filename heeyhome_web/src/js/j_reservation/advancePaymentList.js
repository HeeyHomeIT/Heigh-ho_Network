/**
 * 闭包
 * 开始预订
 * tangj
 */
(function () {

    /**
     * 需要require的公共方法或组件
     */
    var HHIT_ADVANCEAPP = angular.module('heeyhomeApp');

    var SELDATAURL = "http://www.heeyhome.com/api/public/order/aeckonandactual/seldata"; // 预约订单接口
    var PAYURL = "http://www.heeyhome.com/api/public/alipay/pay"; // 支付宝支付
    var FLAG =true;

    /*定义一个类*/
    var advancePayListWrap = {
        /**
         * 入口方法
         */
        init: function () {
            advancePayListWrap.initEvent();
        },
        initEvent: function () {
            var self = this;
            self.initWebDataEvent(); // 页面数据初始化
            self.initPaySumbitEvent(); // 支付
            self.initRefundEvent(); // 退款

        },
        /**
         * 页面数据初始化
         */
        initWebDataEvent: function () {
            var self = this;
            self.initPaymentListDetailsEvent(); // 预支付清单详情
        },
        /**
         * 预支付清单详情初始化
         */
        initPaymentListDetailsEvent: function () {
            getDataForAjaxHandler.getDataEvent();
        },
        /**
         * 支付
         */
        initPaySumbitEvent: function () {
            var orderId = getUrlParamHandler.getUrlParam("pos");
            $(document).on("click", "#checkYt", function () {
            	if(FLAG){
            		if ($(this).is(':checked')) { //是否默认地址 1:默认地址 2:非默认地址
	                    $(this).siblings("em").addClass("defalut_ico");
	                    $(this).parents().siblings("span").addClass("yes_check");
	                } else {
	                    $(this).siblings("em").removeClass("defalut_ico");
	                    $(this).parents().siblings("span").removeClass("yes_check");
	                }
            	}
            });

            $(document).on("click", "#Jsubmit", function () {
                if ($("#checkYt").is(':checked')) {
                    var orderType = $("#Jsubmit").data("submit");
                    PAYURL = PAYURL + "?pay_type=" + orderType + "&order_id=" + orderId
                    $("#orderFrom").attr("action", PAYURL);
                    $("#orderFrom").submit();
                } else {
                    layer.msg("请先仔细阅读合同条款并勾选确认");
                }

            });
            $(document).on("click", "#Rsubmit", function () {
                if ($("#checkYt").is(':checked')) {
                    window.open('refund.html#/refund/home/refund_step_1');
                } else {
                    layer.msg("请先仔细阅读合同条款并勾选确认");
                }

            });
        },
        /**
         * 退款
         */
        initRefundEvent: function () {
            $(document).off("click", "#Rsubmit").on("click", "#Rsubmit", function () {
                if ($("#checkYt").is(':checked')) {
                    window.open('refund.html#/refund/home/refund_step_1');
                } else {
                    layer.msg("请先仔细阅读合同条款并勾选确认");
                }

            });
        }
    };
    getDataForAjaxHandler = {
        /**
         * 调用AJAX得到数据
         */
        getDataEvent: function () {
            var orderId = getUrlParamHandler.getUrlParam("pos");
            var pc = splicePaymentContHandler;
            $.ajax({
                url: SELDATAURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    order_id: orderId
                }
            }).done(function (data) {
                console.log(data);
                if (data.code == 000) {
                    pc.splicePayDetailsDataEvent(data.data.data_list, "工长");
                    pc.splicePayMoneyDataEvent(data.data.data_list["需付款"]);
                    if(data.data.pay_type == 0){ // 没有需要支付的订单（已支付）
                		$("#Jsubmit").val("已支付").addClass("alreadyPaid");
                		$("#checkYt").prop("checked",true);
                		$(".lookit_default").find("em").addClass("defalut_ico");
						$(".lookit_default").find("label").addClass("cursor");
                		$("#nocheck").addClass("yes_check");
                		FLAG = false;
                	}
                    $(document).on("click", ".titlelist li", function () {
                        pc.splicePayDetailsDataEvent(data.data.data_list, $(this).find("a").text());
                        $(this).addClass("payment_on").siblings().removeClass("payment_on");
                    });
                } else {
                    $(".paymentList_wrap ").html('<div class="nullpage"><i>&nbsp;</i><span>订单号不存在~</span></div>');
                }
            });
        }
    };
    /**
     * 拼接内容
     */
    splicePaymentContHandler = {
        /**
         * 预支付单详情
         * @param {Object} value 对象
         * @param {Object} name 显示的对象
         */
        splicePayDetailsDataEvent: function (value, name) {
            var vrStr = '';
            $.each(value[name], function (i, v) {
                var key, counter = 0;
                for (key in v) {
                    counter++;
                }
                console.log(i)
                console.log(v);
                if (i == "小计/元") {
                    vrStr += '<tr><td colspan="4" class="border_eee">' + i + '</td>';
                    for (var i1 in v) {
                        vrStr += '<td>' + v[i1] + '</td>';

                    }
                    vrStr += '</tr>';
                } else if (i == "结转金额/元") {
                    vrStr += '<tr><td colspan="4" class="border_eee">' + i + '</td><td colspan="2">' + v + '</td></tr>';
                } else {
                    vrStr += '<tr><td rowspan="' + counter + '" class="border_eee">' + i + '</td>';
                    for (var i1 in v) {
                        vrStr += '<td>' + i1 + '</td>';
                        $.each(v[i1], function (item, val) {
                            vrStr += '<td>' + val + '</td>';
                        });
                        vrStr += '</tr>';
                    }
                }


            });
            $(".paymentlist_cardtable table tbody").html(vrStr);
            $(".paymentlist_cardtable").find("table tbody > tr").each(function (e, t) {
                window.setTimeout(function () {
                    $(t).addClass("shows")
                }, 20 * e)
            });
        },
        /**
         * 需要付款详情
         * @param {Object} value 对象
         */
        splicePayMoneyDataEvent: function (value) {
            var order_step = sessionStorage.getItem("orderstep");
            //order_step = 17;
            var vrStr = '';
            $.each(value, function (i, v) {
                if (i == '总计/元') {
                    vrStr += '<tr><td colspan="2" class="border_eee">' + i + '</td><td >' + v + '</td></tr>';
                } else {
                    vrStr += '<tr>';
                    $.each(v, function (item, val) {
                        vrStr += '<td>' + val + '</td>';
                    });
                    vrStr += '</tr>';
                }
            });
            if (order_step == '17' && value['总计/元'] < 0) { //如果到油漆工完工阶段且金额为负，则可以退款
                vrStr += '<tr><td colspan="2" class="border_eee"><label for="checkYt" class="lookit_default"><input id="checkYt" class="display" type="checkbox" /><em class=""></em><span>请仔细核对线下填写预算单上的金额并已认真阅读和同意以下条款之后在退款</span></label><span id="nocheck" class="err_check">请仔细阅读合同条款并勾选确认</span></td><td><a id="Rsubmit" class="submit" type="button" data-submit="order">退款</a></td></tr>';
            } else {
                vrStr += '<tr><td colspan="2" class="border_eee"><label for="checkYt" class="lookit_default"><input id="checkYt" class="display" type="checkbox" /><em class=""></em><span>请仔细核对线下填写预算单上的金额并已认真阅读和同意以下条款之后在支付</span></label><span id="nocheck" class="err_check">请仔细阅读合同条款并勾选确认</span></td><td><input id="Jsubmit" class="submit" type="button" data-submit="order" value="支付"></td></tr>';
            }
            $(".paylist_cardtable table tbody").html(vrStr);
            $(".paylist_cardtable").find("table tbody > tr").each(function (e, t) {
                window.setTimeout(function () {
                    $(t).addClass("shows")
                }, 20 * e)
            });
        }

    };
    getUrlParamHandler = {
        /**
         * 获取url中的参数
         * @param {Object} name
         */
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.hash.split("?")[1].match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return null; //返回参数值
        }
    };

    //入口方法调用 代码只能从这里执行
    HHIT_ADVANCEAPP.controller('advancelistCtrl', ['$scope', '$http', function ($scope, $http) {
        advancePayListWrap.init();
    }]);
})();