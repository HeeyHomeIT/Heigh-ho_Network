/**
 * Created by Administrator on 2016/11/29.
 */
$(document).ready(function () {
    $(".pic_smallshop ul").tabs({fx: {opacity: "toggle"}}).tabs("rotate", 5000, true);
});

$(document).ready(function () {

    /* 图片滚动效果 */
    $(".wrapper_box").slide({
        titCell: "",
        mainCell: ".wrapper_ul ul",
        autoPage: true,
        effect: "leftLoop",
        autoPlay: false,
        vis: 4
    });
});

/**
 * Created by Administrator on 2016/11/21.
 */
var items = $('.same_class');
$(".tabUl li").click(function () {
    $(".tabUl").css('position', 'fixed');
});
$(".tabUl li ").click(function (e) {
    e.stopPropagation();
    var x = $(this).index();
    var divTop = items.eq(x).offset().top;
    $("html,body").stop().animate({scrollTop: divTop}, 10);
});


$(document).ready(function () {
    $(window).scroll(function () {
        var scrollTop = $(document).scrollTop();
        var oTabUl = $('#tabUl');
        var curId = '';
        if (scrollTop >= oTabUl.offset().top) {
            $('.tabUl').css('position', 'fixed');
        } else {
            $('.tabUl').css('position', 'static');
        }

        items.each(function () {
            var m = $(this);                      //定义变量，获取当前类
            var itemsTop = m.offset().top;        //定义变量，获取当前类的top偏移量
            if (scrollTop > itemsTop - 100) {
                curId = "&" + m.attr("id");
            } else {
                return false;
            }

        });

        //给相应的楼层设置cur,取消其他楼层的cur
        var curLink = oTabUl.find(".tab_active");
        if (curId && curLink.find('a').attr("tab") != curId) {
            oTabUl.find("[tab= '" + curId + "']").parent().addClass("tab_active");
            curLink.removeClass("tab_active");
        }
    });
});