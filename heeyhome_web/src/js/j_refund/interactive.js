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

        }
    };


    //入口方法调用 代码只能从这里执行
    HHIT_SHOPLISTAPP.controller('refund', ['$scope', '$http', function ($scope, $http) {
        refundWrap.init();
    }]);
})();