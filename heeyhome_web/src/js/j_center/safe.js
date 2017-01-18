/**
 * 闭包
 * tangj
 */
(function () {

    /**
     * 需要require的公共方法或组件
     */
    var HHIT_CENTERAPP = angular.module('heeyhomeApp');

    var BASEURL = 'http://www.heeyhome.com/api/public/';

    var USERDATAURL = BASEURL + 'personal/userinfo'; // 用户个人资料
    var SAFELEVELURL = 'http://www.heeyhome.com/api/public/personal/safe'; // 安全等级
    var AUTHVERIFYURL = BASEURL + 'personal/safe/authverify'; // 身份验证
    var AUTHURL = BASEURL + 'personal/safe/auth'; // 获取身份验证状态
    var PASSWORDURL = BASEURL + 'editpassword'; // 修改密码
    var SENDSMSURL = BASEURL + 'sendsms'; // 发送短信
    var SENDEMAILSURL = BASEURL + 'sendmail'; // 发送邮箱
    var PHONEVERIFYURL = BASEURL + 'personal/safe/phoneverify'; // 验证绑定手机
    var PHONECHANGEURL = BASEURL + 'personal/safe/phonechange'; // 修改绑定手机
    var EMAILURL = BASEURL + 'personal/safe/emailverify'; // 验证绑定邮箱
    var NEWEMAILURL = BASEURL + 'personal/safe/emailchange'; // 绑定新邮箱
    var LOGINPASSWORDURL = BASEURL + 'editpassword/initialpwd'; // 登录密码验证
    var PASSWORDMSURL = BASEURL + 'editpassword/smsedit'; // 修改密码短信验证
    var SAFEURL = BASEURL + 'personal/loginhistory?callback=JSON_CALLBACK';//安全设置登录历史

    var phone;//获取用户手机号
    var email;//获取用户邮箱
    var phone_flag;
    var email_flag;
    var password_flag;
    var new_flag;

    /**
     * 移动号码归属地支持号段:134 135 136 137 138 139 147 150 151 152 157 158 159 178  182 183 184 187 188
     * 联通号码归属地支持号段:130 131 132  145 155 156 176  186
     * 电信号码归属地支持号段:133 153 177 180 181 189
     * 移动运营商:170
     */
    var PHONEREG = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/; // 验证手机号正则表达式
    var PSWREG = /^[0-9a-zA-Z_]{6,14}$/; // 验证密码的正则表达式
    var EMAILREG = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;//验证邮箱的正则表达式
    var isIDCard1 = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;//验证身份证号的正则表达式
    // 错误提示文字
    var MSG1 = "手机号不能为空";
    var MSG2 = "请输入有效的手机号码";
    var MSG3 = "密码不能为空";
    var MSG4 = "密码长度为6~14位不为空格的字符";
    var MSG5 = "确认密码不能为空";
    var MSG6 = "输入密码不一致";
    var MSG7 = "验证码不能为空";
    var MSG8 = "邮箱不能为空";
    var MSG9 = "邮箱格式不正确";
    var MSG10 = "姓名与身份证号不能为空";
    var MSG11 = "身份证号码错误！";
    var MSG12 = '身份证格式不正确';

    /*定义一个类*/
    var centerWrap = {
        /**
         * 入口方法
         */
        init: function () {
            var self = this;
            self.initEvent();
        },
        initEvent: function () {
            var self = this;

            //身份验证事件
            self.initAuthenticationEvent();

            //安全等级
            self.initSafeLevelEvent();

            //绑定手机
            self.initBindOldPhoneEvent();

            //绑定邮箱
            self.initEmailEvent();

            //修改密码事件
            self.initPasswordAuthEvent();

            //原手机号点击验证码事件
            $(document).off('click', '#oldPhoneCaptcha').on('click', '#oldPhoneCaptcha', function () {
                self.sendCaptcha(SENDSMSURL, {phone: phone}, $('#oldPhoneCaptcha'));
            });
            //新手机号点击验证码事件
            $(document).off('click', '#code_button').on('click', '#code_button', function () {
                self.sendCaptcha(SENDSMSURL, {phone: $('#newphone_num1').val()}, $('#code_button'));
            });
            //修改密码点击验证码事件
            $(document).off('click', '#resetCaptcha').on('click', '#resetCaptcha', function () {
                self.sendCaptcha(SENDSMSURL, {phone: phone}, $('#resetCaptcha'));
            });
            //新邮箱点击验证码事件
            $(document).off('click', '#email_code').on('click', '#email_code', function () {
                if ($('#new_email').val() == '') {
                    layer.alert(MSG8);
                } else if (EMAILREG.test($('#new_email').val())) {
                    self.sendCaptcha(SENDEMAILSURL, {email: $('#new_email').val()}, $('#email_code'));
                } else {
                    layer.alert(MSG9);
                }
            });
        },
        /**
         * 公用接口：获取用户手机号、邮箱等信息
         */
        initCommonEvent: function (success) {
            $.ajax({
                url: USERDATAURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    user_id: $.base64.decode($.cookie("userId"))
                },
                success: function (data) {
                    if (data && data.code == '000') {
                        phone = data.data.userinfo_phone; //获取用户的电话号码
                        email = data.data.userinfo_email; //获取用户的邮箱
                        success.call();
                    }
                },
                error: function (data) {
                }
            });
        },
        /**
         * 身份验证事件
         */
        initAuthenticationEvent: function () {
            /* 身份验证第一步：输入姓名与身份证号 */
            $(document).off('click', '.next_auth').on('click', '.next_auth', function () {
                if ($('#rel_name').val() == "" || $('#id_code').val() == "") {
                    layer.alert(MSG10);
                } else if (isIDCard1.test($('#id_code').val())) {
                    if ($('#id_code').val().length == 18) {
                        var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //将前17位加权因子保存在数组里
                        var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                        var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                        for (var i = 0; i < 17; i++) {
                            idCardWiSum += $('#id_code').val().substring(i, i + 1) * idCardWi[i];
                        }

                        var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
                        var idCardLast = $('#id_code').val().substring(17);//得到最后一位身份证号码

                        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                        if (idCardMod == 2) {
                            if (idCardLast == "X" || idCardLast == "x") {
                                $('.authentic_one').hide();
                                $('.authentic_two').show().removeClass('hide');
                                $(".revise_process a").eq(1).addClass("active").siblings().removeClass("active");
                            } else {
                                layer.alert(MSG11);
                            }
                        } else {
                            //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                            if (idCardLast == idCardY[idCardMod]) {
                                $('.authentic_one').hide();
                                $('.authentic_two').show().removeClass('hide');
                                $(".revise_process a").eq(1).addClass("active").siblings().removeClass("active");
                            } else {
                                layer.alert(MSG11);
                            }
                        }
                    }
                } else {
                    layer.alert(MSG12);
                }
            });
            /* 身份验证上传身份证照片 */
            HHIT_CENTERAPP.controller('auth1', ['$scope', '$state', function ($scope, $state) {
                $('#user_id').val($.base64.decode($.cookie("userId")));
                $('#form').attr('action', AUTHVERIFYURL);
                /* 身份图片上传预览 */
                $('.auth_wrap').find('input').change(function () {
                    var inputImg = $(this);
                    var file = inputImg.get(0).files[0];
                    var reader = new FileReader();
                    if (!/image\/\w+/.test(file.type)) {
                        inputImg.parent().parent().css('background-image', '');
                        inputImg.parent().removeClass('opacity');
                        layer.alert("请确保文件为图像类型");
                        //alertError(swal);//弹出文件格式错误通知
                        inputImg.val('');//清空file选择的文件
                        return false;
                    }
                    // onload是异步操作
                    else {
                        reader.onload = function (e) {
                            console.log(e);
                            inputImg.parent().addClass('opacity');//图片预览时input file 添加opacity样式，设置完全透明
                            inputImg.parent().parent().css('background-image', 'url("' + e.target.result + '")');//图片设置为$('.showImg')背景图
                            inputImg.parent().parent().find('.close').show();
                        }
                    }
                    reader.readAsDataURL(file);
                });
                /* 点击叉叉图片取消事件 */
                $('.close').click(function () {
                    $(this).parent().find('a').removeClass('opacity');
                    $(this).parent().css('background-image', '');
                    $(this).hide();
                });

                $(document).ready(function () {
                    $('.next_confirm').click(function () {
                        setTimeout(function () {
                            var iframe = document.getElementById('if');//获取那个iframe，也可以用$('#iframe')[0]替代
                            var iframeWindow = iframe.contentWindow;//获取iframe里的window对象
                            var $c = $(iframeWindow);//获取iframe中的jquery对象
                            $c('body');//获取iframe中body元素，其他的话自己用$c('#aaa')去获取吧
                        }, 3000);
                    });

                });

                $("#if").load(function () {
                    $.ajax({
                        url: AUTHURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            user_id: $.base64.decode($.cookie("userId"))
                        },
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            if (data.code == '131') {
                                //console.log(data);
                            } else {
                                layer.alert(data.msg);
                            }
                        },
                        error: function (data) {
                        }
                    });
                });
            }]);
        },

        /**
         * 发送验证码事件
         */
        sendCaptcha: function (url, parameter, element) {
            var COUNT = 60; // 验证码间隔秒数
            // 向后台发送处理数据，向用户发送验证码
            $.ajax({
                url: url,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: parameter,
                success: function (data) {
                    // var data={code:'000'};
                    if (data.code == '000') {
                        // 设置验证码按钮效果，开始计时
                        element.addClass("zc_btnClick").attr("disabled", true);
                        element.val(COUNT + "秒后重新获取");
                        InterValObj = window.setInterval(function () {
                            if (COUNT == 1) {
                                window.clearInterval(InterValObj); // 停止计时器
                                element.removeClass("zc_btnClick").removeAttr("disabled"); // 启用按钮
                                element.val("获取验证码");
                            } else {
                                COUNT--;
                                element.val(COUNT + "秒后重新获取");
                            }
                        }, 1000); // 启动计时器，1秒执行一次
                    } else {
                        layer.alert(data.msg);
                    }
                },
                error: function (data) {
                }
            });
        },
        /**
         * 绑定手机号事件
         */
        initBindOldPhoneEvent: function () {
            /* 绑定手机第一步，获取原手机号的验证码 */
            HHIT_CENTERAPP.controller('bind_phone1', ['$scope', '$state', function ($scope, $state) {
                var hash = window.location.hash;
                $('#left_ul li').removeClass('left_active');
                var $a = $('#left_ul a');
                $a.each(function () {
                    var uiSref = $(this).attr('ui-sref');
                    if (hash.indexOf(uiSref.replace('.', '/')) != -1) {
                        $(this).parent().addClass('left_active');
                    }
                });
                var oldPhone = function () {
                    $(".revise_process a").eq(0).addClass("active").siblings().removeClass("active");
                    var abb_phone = phone.substr(0, 3) + "****" + phone.substr(7, 11);//手机号中间四位变成*号
                    $('#old_phone').html(abb_phone);//身份验证中原绑定手机号
                    //绑定手机号下一步点击事件
                    $(document).off('click', '#next1').on('click', '#next1', function () {
                        if ($('#confirm_code1').val() != '') {//判断验证码不为空
                            $.ajax({
                                url: PHONEVERIFYURL,
                                type: "GET",
                                async: true,
                                dataType: 'jsonp',
                                data: {
                                    user_id: $.base64.decode($.cookie("userId")),
                                    oldphone: phone,
                                    captcha: $('#confirm_code1').val()
                                },
                                success: function (data) {
                                    if (data.code == '000') {
                                        //console.log(data);
                                        phone_flag = data.data.flag;
                                        //console.log(flag);
                                        window.location.href = '#/center/setting/bind/bind_phone_2';
                                    } else {
                                        layer.alert(data.msg);
                                    }
                                },
                                error: function (data) {
                                }
                            });
                        } else {
                            layer.alert(MSG7);
                        }
                    });
                };
                if (!phone) {
                    centerWrap.initCommonEvent(oldPhone);
                } else {
                    oldPhone();
                }
            }]);

            /* 绑定手机第二步，绑定一个新的手机号码 */
            HHIT_CENTERAPP.controller('bind_phone2', ['$scope', '$state', function ($scope, $state) {
                $(".revise_process a").eq(1).addClass("active").siblings().removeClass("active");
                //绑定手机号下一步点击事件
                $(document).off('click', '#next2').on('click', '#next2', function () {
                    $.ajax({
                        url: PHONECHANGEURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            user_id: $.base64.decode($.cookie("userId")),
                            flag: phone_flag,
                            newphone: $('#newphone_num1').val(),
                            captcha: $('#newphone_code1').val()
                        },
                        success: function (data) {
                            if (data.code == '000') {
                                //console.log(data);
                                window.location.href = '#/center/setting/bind/bind_phone_3';
                            } else {
                                layer.alert(data.msg);
                            }
                        },
                        error: function (data) {
                        }
                    });
                });
            }]);
            /* 绑定手机第三步，完成后跳转到安全设置 */
            HHIT_CENTERAPP.controller('bind_phone3', ['$scope', '$state', function ($scope, $state) {
                $(".revise_process a").eq(2).addClass("active").siblings().removeClass("active");
                $(document).off('click', '#back').on('click', '#back', function () {
                    window.location.href = '#/center/setting';
                    location.reload(true);
                });
            }]);
        },
        /**
         * 绑定邮箱事件
         */
        initEmailEvent: function () {
            /* 绑定邮箱第一步，获取原手机的验证码 */
            HHIT_CENTERAPP.controller('emailOne', ['$scope', '$state', function ($scope, $state) {
                var hash = window.location.hash;
                $('#left_ul li').removeClass('left_active');
                var $a = $('#left_ul a');
                $a.each(function () {
                    var uiSref = $(this).attr('ui-sref');
                    if (hash.indexOf(uiSref.replace('.', '/')) != -1) {
                        $(this).parent().addClass('left_active');
                    }
                });
                var emailOne = function () {
                    $(".revise_process a").eq(0).addClass("active").siblings().removeClass("active");
                    var abb_phone = phone.substr(0, 3) + "****" + phone.substr(7, 11);//手机号中间四位变成*号
                    $('#old_phone').html(abb_phone);//身份验证中原绑定手机号
                    //绑定邮箱下一步点击事件
                    $(document).off('click', '#next_email1').on('click', '#next_email1', function () {
                        if ($('#confirm_code').val() != '') {//判断验证码不为空
                            $.ajax({
                                url: EMAILURL,
                                type: "GET",
                                async: true,
                                dataType: 'jsonp',
                                data: {
                                    user_id: $.base64.decode($.cookie("userId")),
                                    phone: phone,
                                    captcha: $('#confirm_code').val()
                                },
                                success: function (data) {
                                    if (data.code == '000') {
                                        //console.log(data);
                                        email_flag = data.data.flag;
                                        //console.log(flag);
                                        window.location.href = '#/center/setting/email/email_2';
                                    } else {
                                        layer.alert(data.msg);
                                    }
                                },
                                error: function (data) {
                                }
                            });
                        } else {
                            layer.alert(MSG7);
                        }
                    });
                };
                /* 先去获取用户手机号 */
                if (!phone) {
                    centerWrap.initCommonEvent(emailOne);
                } else {
                    emailOne();
                }

            }]);
            /* 绑定邮箱第二步，设置新邮箱 */
            HHIT_CENTERAPP.controller('emailTwo', ['$scope', '$state', function ($scope, $state) {
                $(".revise_process a").eq(1).addClass("active").siblings().removeClass("active");
                //绑定邮箱下一步点击事件
                $(document).off('click', '#next_email2').on('click', '#next_email2', function () {
                    $.ajax({
                        url: NEWEMAILURL,
                        type: "GET",
                        async: true,
                        dataType: 'jsonp',
                        data: {
                            user_id: $.base64.decode($.cookie("userId")),
                            flag: email_flag,
                            newemail: $('#new_email').val(),
                            captcha: $('#newphone_code').val()
                        },
                        success: function (data) {
                            if (data.code == '000') {
                                //console.log(data);
                                window.location.href = '#/center/setting/email/email_3';
                            } else {
                                layer.alert(data.msg);
                            }
                        },
                        error: function (data) {
                        }
                    });
                });
            }]);
            /* 绑定邮箱第三步，完成 */
            HHIT_CENTERAPP.controller('emailThree', ['$scope', '$state', function ($scope, $state) {
                $(".revise_process a").eq(2).addClass("active").siblings().removeClass("active");
                $(document).off('click', '#back').on('click', '#back', function () {
                    window.location.href = '#/center/setting';
                });
            }]);

        },
        /**
         * 修改密码事件
         */
        initPasswordAuthEvent: function () {
            /* 修改密码第一步 */
            HHIT_CENTERAPP.controller('reset1', ['$scope', '$state', function ($scope, $state) {
                $(".revise_process a").eq(0).addClass("active").siblings().removeClass("active");
                //点击选择何种方式身份验证
                $(document).off('click', '#message').on('click', '#message', function () {//短信验证码方式
                    window.location.href = '#/center/setting/reset/reset_2';
                });
                $(document).off('click', '#password').on('click', '#password', function () {//登录密码方式
                    window.location.href = '#/center/setting/reset/reset_3';
                });
            }]);
            /* 修改密码第一步短信验证身份 */
            HHIT_CENTERAPP.controller('reset2', ['$scope', '$state', function ($scope, $state) {
                var password_phone = function () {
                    $(".revise_process a").eq(0).addClass("active").siblings().removeClass("active");
                    var abb_phone = phone.substr(0, 3) + "****" + phone.substr(7, 11);//手机号中间四位变成*号
                    $('#old_phone').html(abb_phone);//身份验证中原绑定手机号
                    $(document).off('click', '#re_select').on('click', '#re_select', function () {//跳回到选择何种方式页面
                        window.location.href = '#/center/setting/reset/reset_1';
                    });
                    /* 短信身份验证 */
                    $(document).off('click', '#next_message1').on('click', '#next_message1', function () {//点击下一步事件
                        if ($('#password_code').val() != '') {
                            $.ajax({
                                url: PASSWORDMSURL,
                                type: "GET",
                                async: true,
                                dataType: 'jsonp',
                                data: {
                                    user_id: $.base64.decode($.cookie("userId")),
                                    phone: phone,
                                    captcha: $('#password_code').val()
                                },
                                success: function (data) {
                                    if (data.code == '000') {
                                        new_flag = data.data.flag;
                                        //console.log(password_flag);
                                        window.location.href = '#/center/setting/reset/reset_6';
                                    } else {
                                        layer.alert(data.msg);
                                    }
                                },
                                error: function (data) {
                                }
                            });
                        } else {
                            layer.alert(MSG7);
                        }
                    });
                };
                if (!phone) {
                    centerWrap.initCommonEvent(password_phone);
                } else {
                    password_phone();
                }
            }]);
            /* 修改密码第一步登录密码验证身份 */
            HHIT_CENTERAPP.controller('reset3', ['$scope', '$state', function ($scope, $state) {
                $(".revise_process a").eq(0).addClass("active").siblings().removeClass("active");
                $(document).off('click', '#re_select').on('click', '#re_select', function () {//跳回到选择何种方式页面
                    window.location.href = '#/center/setting/reset/reset_1';
                });
                /* 密码身份验证 */
                $(document).off('click', '#next_password1').on('click', '#next_password1', function () {//判断输入登录密码是否正确决定要不要调转到下一步
                    if ($('#login_code').val() == '') {
                        layer.alert(MSG3);
                    } else {
                        $.ajax({
                            url: LOGINPASSWORDURL,
                            type: "GET",
                            async: true,
                            dataType: 'jsonp',
                            data: {
                                user_id: $.base64.decode($.cookie("userId")),
                                oldpassword: $('#login_code').val()
                            },
                            success: function (data) {
                                if (data.code == '000') {
                                    password_flag = data.data.flag;
                                    window.location.href = '#/center/setting/reset/reset_4';
                                } else {
                                    layer.alert(data.msg);
                                }
                            },
                            error: function (data) {
                            }
                        });
                    }
                });

            }]);
            /* 修改密码第二步短信验证身份后设置密码 */
            HHIT_CENTERAPP.controller('reset4', ['$scope', '$state', function ($scope, $state) {
                $(".revise_process a").eq(1).addClass("active").siblings().removeClass("active");
                $(document).off('click', '#next_reset2').on('click', '#next_reset2', function () {//判断输入新密码两次是否一样
                    //window.location.href='#/center/reset/reset_1';
                    if ($('#new_password1').val() == '' || $('#new_password2').val() == '') {
                        layer.alert(MSG3);
                    } else if (!PSWREG.test($('#new_password1').val())) {
                        layer.alert(MSG4);
                    } else if ($('#new_password1').val() != $('#new_password2').val()) {
                        layer.alert(MSG6);
                    }
                    else {
                        /* 修改密码 */
                        $.ajax({
                            url: PASSWORDURL,
                            type: "GET",
                            async: true,
                            dataType: 'jsonp',
                            data: {
                                user_id: $.base64.decode($.cookie("userId")),
                                flag: password_flag,
                                new_password: $('#new_password1').val()
                            },
                            success: function (data) {
                                if (data.code == '000') {
                                    window.location.href = '#/center/setting/reset/reset_5';
                                } else {
                                    layer.alert(data.msg);
                                }
                            },
                            error: function (data) {
                            }
                        });
                    }
                });

            }]);
            /* 修改密码第二步登录密码验证身份后设置密码 */
            HHIT_CENTERAPP.controller('reset6', ['$scope', '$state', function ($scope, $state) {
                $(".revise_process a").eq(1).addClass("active").siblings().removeClass("active");
                $(document).off('click', '#ms_reset2').on('click', '#ms_reset2', function () {//判断输入新密码两次是否一样
                    //window.location.href='#/center/reset/reset_1';
                    if ($('#new_password1').val() == '' || $('#new_password2').val() == '') {
                        layer.alert(MSG3);
                    } else if (!PSWREG.test($('#new_password1').val())) {
                        layer.alert('密码格式不正确');
                    } else if ($('#new_password1').val() != $('#new_password2').val()) {
                        layer.alert(MSG6);
                    }
                    else {
                        /* 修改密码 */
                        $.ajax({
                            url: PASSWORDURL,
                            type: "GET",
                            async: true,
                            dataType: 'jsonp',
                            data: {
                                user_id: $.base64.decode($.cookie("userId")),
                                flag: new_flag,
                                new_password: $('#new_password1').val()
                            },
                            success: function (data) {
                                if (data.code == '000') {
                                    window.location.href = '#/center/setting/reset/reset_5';
                                } else {
                                    layer.alert(data.msg);
                                }
                            },
                            error: function (data) {
                            }
                        });
                    }
                });

            }]);
            /* 修改密码第三步完成 */
            HHIT_CENTERAPP.controller('reset5', ['$scope', '$state', function ($scope, $state) {
                $(".revise_process a").eq(2).addClass("active").siblings().removeClass("active");
                $(document).off('click', '#password_button').on('click', '#password_button', function () {//修改密码成功后重新登录
                    window.location.href = 'register.html';
                });
                /* 5秒倒计时之后页面自动跳转到登录页面 */
                //设定倒数秒数
                var t = 5;
                var $countdown = $('#countdown');
                //显示倒数秒数
                function showTime() {
                    t -= 1;
                    $countdown.html(t);
                    if (t == 0) {
                        window.location.href = 'register.html';
                    }
                    //每秒执行一次,showTime()
                    setTimeout(showTime, 1000);
                }

                //执行showTime()
                showTime();
            }]);
        },
        /**
         * 安全等级、登录历史
         */
        initSafeLevelEvent: function () {
            HHIT_CENTERAPP.controller('mSettingCtrl', ['$scope', '$http', function ($scope, $http) {
                $(".Jcenter").html("安全设置");
                $('.left_ul li').eq(5).addClass('left_active').siblings().removeClass('left_active');
                /* 获取用户的安全等级 */
                $.ajax({
                    dataType: "JSONP",
                    url: SAFELEVELURL,
                    type: "GET",
                    async: true,
                    data: {
                        user_id: $.base64.decode($.cookie("userId"))

                    },
                    success: function (data) {
                        if (data && data.code == '000') {
                            //console.log(data.data);
                            if (parseInt(data.data.score) == 2) {
                                for (var i = 0; i < 1; i++) {
                                    $('.star i').eq(i).addClass('active_i');
                                }
                            } else if (parseInt(data.data.score) == 4) {
                                for (var i = 0; i < 2; i++) {
                                    $('.star i').eq(i).addClass('active_i');
                                }
                            } else if (parseInt(data.data.score) == 6) {
                                for (var i = 0; i < 3; i++) {
                                    $('.star i').eq(i).addClass('active_i');
                                }
                            } else if (parseInt(data.data.score) == 8) {
                                for (var i = 0; i < 4; i++) {
                                    $('.star i').eq(i).addClass('active_i');
                                }
                            } else if (parseInt(data.data.score) == 10) {
                                for (var i = 0; i < 5; i++) {
                                    $('.star i').eq(i).addClass('active_i');
                                }
                            }
                            $('#number').html(parseInt(data.data.score) + '.0');
                        }
                    },
                    error: function (data) {
                    }
                });
                /* 获取登录历史 */
                $http({
                    method: "JSONP",
                    url: SAFEURL,
                    /* 传参 */
                    params: {
                        user_id: $.base64.decode($.cookie("userId"))
                    }
                }).success(function (data, status) {
                    /* 如果成功执行 */
                    if (data.code === '000') {
                        /* 获取显示在页面中的数据 */
                        $scope.safes = data.data.slice(0, 2);
                        /* 获取点击更多显示的数据 */
                        var len = data.data.length;//总数据的长度
                        $scope.mores = data.data.slice(2, len);
                        var more = $("#more");//获取到更多按钮
                        /* 点击更多执行的事件 */
                        more.click(function () {
                            $('.login_next').toggle(300);
                            if (more.html() == '更多') {
                                more.html('隐藏');
                            } else {
                                more.html('更多');
                            }
                        });
                    }
                    /* 如果失败执行 */
                    else if (data.code === '117') {
                        $('.not_information').show().removeClass('hide');
                        $('.not_information_text').html('您最近还没有登录过哦~~');
                        $('.login_note').hide();
                        $('.login_history p').hide();
                    } else {
                        layer.msg(data.msg);
                    }
                }).error(function (data, status) {
                });
                /* 判断用户有没有绑定邮箱 */
                $.ajax({
                    url: USERDATAURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        user_id: $.base64.decode($.cookie("userId"))
                    },
                    success: function (data) {
                        if (data && data.code == '000') {
                            console.log(data.data);
                            email = data.data.userinfo_email; //获取用户的邮箱
                            if (email != null) {
                                $('#email').html('立即修改');
                            }
                        }
                    },
                    error: function (data) {
                    }
                });
            }]);
        }
    };

    //入口方法调用 代码只能从这里执行
    centerWrap.init();
})();