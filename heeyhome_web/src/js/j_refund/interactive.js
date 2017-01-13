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

    var GETREFUNDINFOURL = "http://hyu2387760001.my3w.com/order/user/getrefundinfo"; // 用户退款信息获取


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
         * 前端判断js
         */
        initJudgementEvent: function () {
            $('.submit_application').click(function () {
                if ($('#account').val() == null || $('#account').val() == '') {
                    layer.msg('支付宝账户不能为空~~');
                } else {
                    window.location.href = 'refund.html#/refund/home/refund_step_2';
                    $('.title_detail').eq(0).removeClass('active');
                    $('.title_detail').eq(1).addClass('active');
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
                        $('#order_number').html(data.data.order_id);//获取订单编号
                        if (data.data.order_step == '17') {
                            $('#order_step').html('油漆工完工阶段');//获取订单步骤
                        }
                        $('#order_time').html(data.data.order_time);//获取订单时间
                        $('#order_money').html(-data.data.pay_amount);//获取退款金额
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