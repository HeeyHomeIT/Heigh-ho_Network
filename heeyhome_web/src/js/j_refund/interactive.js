/**
 * Created by Administrator on 2017/1/11.
 */
/**
 * 虚拟现实
 */
/**
 * 闭包
 * tangj
 */
(function () {

    /**
     * 需要require的公共方法或组件
     */
    var HHIT_SHOPLISTAPP = angular.module('heeyhomeApp');

    var GETREFUNDINFOURL = "/api/public/order/user/getrefundinfo"; // 用户退款信息获取
    var SUBREFUNDINFOURL = "/api/public/order/user/subrefundinfo"; // 用户退款信息获取

    var PHONEREG = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/; // 验证手机号正则表达式
    var EMAILREG = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;//验证邮箱的正则表达式

    /*定义一个类*/
    var refundWrap = {
        /**
         * 入口方法
         */
        init: function () {
            refundWrap.initEvent();
        },
        initEvent: function () {
            var self = this;
            self.initRemoveHeadEvent();
            self.initJudgementEvent();
            self.initGetInfoEvent();

        },
        /**
         * 删除头部内容
         */
        initRemoveHeadEvent: function () {
            $('#headerWrapper').remove();
        },
        /**
         * 点击提交申请按钮
         */
        initJudgementEvent: function () {
            var order_id = sessionStorage.getItem("orderid");
            $(document).off('click', '.submit_application').on('click', '.submit_application', function () {
                if ($('#account').val() == null || $('#account').val() == '') {
                    layer.msg('支付宝账户不能为空~~');
                } else if (!PHONEREG.test($('#account').val()) && !EMAILREG.test($('#account').val())) {
                    layer.msg('支付宝账户格式不正确~~');
                } else {
                    $.ajax({
                        url: SUBREFUNDINFOURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            order_id: order_id,
                            alipay_account: $('#account').val()
                        },
                        success: function (data) {
                            if (data != null && data.code == '000') {
                                layer.msg(data.msg);
                                window.location.href = 'refund.html#/refund/home/refund_step_2';
                            } else {
                                layer.msg(data.msg);
                            }
                        },
                        error: function (data) {
                        }
                    });
                }
            });
        },
        /**
         * 获取用户退款信息
         */
        initGetInfoEvent: function () {
            var order_id = sessionStorage.getItem("orderid");
            $.ajax({
                url: GETREFUNDINFOURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    order_id: order_id
                },
                success: function (data) {
                    if (data != null && data.code == '000') {
                        console.log(data.data);
                        $('#order_number').html(data.data.order_id);//获取订单编号
                        if (data.data.order_step == '17') {
                            $('#order_step').html('油漆工完工阶段');//获取订单步骤
                        }
                        $('#order_time').html(data.data.order_time);//获取订单时间
                        $('#order_money').html(-data.data.pay_amount);//获取退款金额
                        if (data.data.refund_status == '0') {//未提交退款信息
                            window.location.href = 'refund.html#/refund/home/refund_step_1';
                        } else if (data.data.refund_status == '1') {//等待退款
                            window.location.href = 'refund.html#/refund/home/refund_step_2';
                            $('.title_detail').eq(0).removeClass('active');
                            $('.title_detail').eq(1).addClass('active');
                        } else {//退款成功
                            window.location.href = 'refund.html#/refund/home/refund_step_3';
                            $('.title_detail').eq(0).removeClass('active');
                            $('.title_detail').eq(2).addClass('active');
                            $('#wait span').html(data.data.refund_account);//退款成功获取用户的支付宝账户显示在页面中
                        }
                    } else {
                        layer.msg(data.msg);
                    }
                },
                error: function (data) {
                }
            });
        }
    };


    //入口方法调用 代码只能从这里执行
    HHIT_SHOPLISTAPP.controller('refund', ['$scope', '$http', function ($scope, $http) {
        refundWrap.init();
    }]);
})();