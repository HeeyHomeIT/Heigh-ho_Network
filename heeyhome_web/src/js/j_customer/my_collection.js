/**
 * Created by Administrator on 2016/11/28.
 */
/**
 * Created by Administrator on 2016/11/25.
 */
var GoodsDetails = {
    details: function () {
        /* details */
        var dtDiv = $("#works_content_title div");
        var iSpeed = 0;
        var left = 30;
        var oBg = document.getElementById("title_active");
        for (var i = 0; i < dtDiv.length - 1; i++) {
            dtDiv[i].onclick = function () {
                startMove(oBg, this.offsetLeft);
                $(".complete_before").hide();
                $(".check_list_wrap").hide();
                $(".collection_shop_wrap").hide();
                $(".works_complete_wrap >div:eq(" + ($(this).index()) + ")").show();
            }
        }
        function startMove(obj, iTarget) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                iSpeed += (iTarget - obj.offsetLeft) / 10;
                iSpeed *= 0.7;
                left += iSpeed;                 //防止小数误差问题
                if (Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) {      //距离足够近与速度足够小
                    clearInterval(obj.timer);
                    obj.style.left = iTarget + "px";
                } else {
                    obj.style.left = left + "px";
                }
            }, 30);
        }
    }
};
define(['angular'], function (angular) {
    //将本控制器函数作为结果返回给router.js
    return function my_collection() {
        GoodsDetails.details();
    };
});