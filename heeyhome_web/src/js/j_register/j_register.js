var heeyhomeRegister = {
    /*
     * 初始化
     */
    init: function () {
        heeyhomeRegister.tabSelect();
    },
    /* 登录注册切换 */

    /*
     * 标签切换效果
     */
    tabSelect: function () {
        var _tabrj = $(".container .tab .tab_click_register");//注册标签
        var _tablg = $(".container .tab .tab_click_login");//登录标签
        var _register = $(".container .main .register");//注册内容
        var _login = $(".container .main .login");//登录内容
        var _tdlogin = $(".container .main .third_login");//第三方登录内容
        var _title = $(".container .main .logo_title img");//标题图片
        var _button = $(".container .main .promptly .promptly_do");//立即注册按钮
        var lhash = window.location.hash;
        $(_tabrj).on({
            click: function () {
                if ($(_register).hasClass("display")) {
                    register();
                }
            }
        });
        $(_tablg).on({
            click: function () {
                if ($(_login).hasClass("display")) {
                    login();
                }
            }
        });
        /* 判断首页登录与注册跳转时url里？后面的值进行页面跳转 */
        if (lhash == '#zc') {
            register();
        }else{
            login();
        }

        /* 注册时执行的方法 */
        function register() {
            $(_register).removeClass("display");
            $(_login).addClass("display");
            $(_tdlogin).addClass("display");
            $(_tabrj).css({"color": "#5D2300"}).addClass("active");
            $(_tablg).css({"color": "#363636"}).removeClass("active");
            $(_title).attr("src", "../../image/register.png");
            $(_button).css({"margin-top": 31});
            $(_button).attr("value", "立即注册");
        }
        /* 登录时执行的方法 */
        function login() {
            $(_login).removeClass("display");
            $(_register).addClass("display");
            $(_tdlogin).removeClass("display");
            $(_tablg).css({"color": "#420404"}).addClass("active");
            $(_tabrj).css({"color": "#363636"}).removeClass("active");
            $(_title).attr("src", "../../image/login.png");
            $(_button).css({"margin-top": 20});
            $(_button).attr("value", "立即登录");
        }
    }
};
$(function () {
    heeyhomeRegister.init();

});
