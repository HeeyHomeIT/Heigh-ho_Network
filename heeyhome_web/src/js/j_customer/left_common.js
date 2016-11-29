/**
 * Created by Administrator on 2016/11/23.
 */
LeftBar = {
    mouseClick: function () {
        (function () {
            $('.left_ul li').click(function () {
                $(this).addClass('left_active').siblings().removeClass('left_active');
            });
        })();
    }
};
$(function () {
    /* 个人中心左侧导航栏点击事件 */
    LeftBar.mouseClick();
});
