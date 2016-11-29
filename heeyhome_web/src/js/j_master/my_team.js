/**
 * Created by Administrator on 2016/11/24.
 */
TeamMove = {
    mouseMove: function () {
        $('.team_bg_wrap').hover(function () {
            $(this).find('.team_bg_bottom').stop().fadeIn();
            /*var x = $(this).index() + 1;
             $(this).find('.team_img img').attr('src', 'css/img/team_active' + x + '.png').fadeIn();*/
        }, function () {
            $(this).find('.team_bg_bottom').stop().fadeOut();
            /*var x = $(this).index() + 1;*/
            /*$(this).find('.team_img img').attr('src', 'css/img/team' + x + '.png').fadeIn();*/
        });
    }
};


define(['angular'], function (angular) {
    //将本控制器函数作为结果返回给router.js
    return function master() {
        TeamMove.mouseMove();
    };
});
