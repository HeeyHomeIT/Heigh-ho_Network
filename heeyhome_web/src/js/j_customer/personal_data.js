/**
 * Created by Administrator on 2016/11/26.
 */
/**
 * Created by Administrator on 2016/11/25.
 */
/* 头部左右切换效果开始 */
var personalData = {
    details: function () {
        /* details */
        var dtDiv = $("#works_content_title div");
        var iSpeed = 0;
        var left = 0;
        var oBg = document.getElementById("title_active");
        for (var i = 0; i < dtDiv.length - 1; i++) {
            dtDiv[i].onclick = function () {
                startMove(oBg, this.offsetLeft);
                $(".personal_content").hide();
                $(".update_head").hide();
                $(".works_content >div:eq(" + ($(this).index() + 1) + ")").show();
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
/* 头部左右切换效果结束 */
define(['angular'], function (angular) {
    //将本控制器函数作为结果返回给router.js
    return function personal_data() {
        personalData.details();
    };
});