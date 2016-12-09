/**
 * Created by Administrator on 2016/11/23.
 */
LeftBar = {
    /* 左边导航栏鼠标点击事件 */
    mouseClick: function () {
        (function () {
            $('.left_ul li').click(function () {
                $(this).addClass('left_active').siblings().removeClass('left_active');
            });
        })();
    },
    /* 左边导航栏根据右边内容保持高亮 */
    lightHigh: function () {
        var iHash = window.location.hash;
        $('.left_ul li a[href="' + iHash + '"]').parent().addClass('left_active').siblings().removeClass('left_active');
    }
};
$(function () {
    /* 个人中心左侧导航栏点击事件 */
    LeftBar.mouseClick();
    LeftBar.lightHigh();
});
