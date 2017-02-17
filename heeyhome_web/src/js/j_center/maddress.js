/**
 * 闭包
 * tangj
 */
(function () {

    /**
     * 需要require的公共方法或组件
     */
    var HHIT_CENTERAPP = angular.module('heeyhomeApp');

    var READURL = 'http://www.heeyhome.com/api/public/personal/drive_address'; // 读取收货地址信息接口
    var ADDURL = 'http://www.heeyhome.com/api/public/personal/drive_address/add'; // 添加收货地址接口
    var DELETEURL = 'http://www.heeyhome.com/api/public/personal/drive_address/del'; // 删除收货地址信息接口
    var EDITORURL = 'http://www.heeyhome.com/api/public/personal/drive_address/change'; // 编辑收货地址信息接口
    var SETDEFAULTURL = 'http://www.heeyhome.com/api/public/personal/drive_address/setdefault'; // 设置默认收货地址接口

    var ADDTEXT = "添加";
    var EDITORTEXT = "编辑";

    var PHONEREG = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/; // 验证手机号正则表达式

    // 错误提示文字
    var MSG1 = "手机号不能为空";
    var MSG2 = "请输入有效的手机号码";
    var MSG3 = "收货人姓名不能为空";
    var MSG4 = "邮政编码不能为空";
    var MSG5 = "详细地址不能为空";

    var USERID = $.cookie("userId"); // 得到userid
    if (USERID != null && USERID != "" && USERID != undefined) {
        USERID = $.base64.decode($.cookie("userId"));
    } else {
        USERID = "";
    }

    /*定义一个类*/
    var addressWrap = {
        /* 入口方法 */
        init: function () {
            addressWrap.initEvent();
        },
        initEvent: function () {
            var self = this;
            $(".Jcenter").html("收货地址");
            $('.left_ul li').eq(6).addClass('left_active').siblings().removeClass('left_active');
            self.initAddressInfoEvent(); // 我的收货地址初始化
            self.addAddressInfoEvent(); // 添加新地址
            self.clickInputBoxEvent(); // 点击input框事件
            self.backBtnClickEvent(); // 点击返回按钮
        },
        /**
         * input框初始化
         */
        initInputValEvent: function () {
            $(".add_address_wrap input[type='text']").val("");
            $(".add_address_wrap input[type='text']").removeClass("border_eec988 border_ff5704");
            $(".add_address_wrap input[type='checkbox']").prop("checked", false);
            $('.address_content').distpicker('destroy'); // 销毁城市联动
        },
        /**
         * 我的收货地址初始化
         */
        initAddressInfoEvent: function () {
            var self = this;
            CRUDInfoHandler.queryInfoEvent(); // 查询信息初始化
        },
        /**
         * 添加新地址按钮点击事件
         */
        addAddressInfoEvent: function () {
            var self = this;
            $(".addEvent").on("click", function () {
                self.initInputValEvent();
                $('.address_content').distpicker('reset', true); // 城市联动初始化
                $(".saveaddBtn").val(ADDTEXT); // 设置保存按钮文字为添加
                $(this).closest("div.address_wrap").addClass("display").siblings().removeClass("display");
                self.soeBtnClickEvent(1); // 保存新地址点击事件
                $('.not_information').hide();
                $('.not_information_text').html();
            });
        },
        /**
         * 返回按钮点击事件
         */
        backBtnClickEvent: function () {
            $("#addBack").on("click", function () {
                $(".add_address_wrap").addClass("display").siblings().removeClass("display");
                CRUDInfoHandler.queryInfoEvent(); // 查询信息初始化
            });
        },
        /**
         * 删除按钮点击事件
         */
        deleteBtnClickEvent: function () {
            $(".address_del").on("click", function () {
                var $addressList = $(this).closest("div.address_list");
                var id = $addressList.data("id");
                CRUDInfoHandler.deleteInfoEvent($addressList, id);
            });
        },
        /**
         * 编辑按钮点击事件
         */
        editorBtnClickEvent: function () {
            var self = this;
            $(".address_editor").on("click", function () {
                self.initInputValEvent();
                var editorJSON = JSON.parse($(this).closest("div").siblings("input").val()); // 获取json字符串转换成对象
                // 加载城市插件初始化
                $('.address_content').distpicker({
                    province: editorJSON.province,
                    city: editorJSON.city,
                    district: editorJSON.district
                });
                $(".saveaddBtn").val(EDITORTEXT); // 设置保存按钮文字为编辑
                $("#receiver").val(editorJSON.receiver); // 收货人
                $("#alladdress").val(editorJSON.address); // 详细地址
                $("#zipcode").val(editorJSON.zipcode); //邮政编码
                $("#mobile").val(editorJSON.mobile); //联系电话
                if (editorJSON.is_default == "1") { //是否默认地址 1:默认地址 2:非默认地址
                    console.log(1)
                    $(".i-chk").prop("checked", true)
                } else if (editorJSON.is_default == "2") {
                    $(".i-chk").prop("checked", false);
                }
                $(this).closest("div.address_wrap").addClass("display").siblings().removeClass("display");
                self.soeBtnClickEvent(2, editorJSON.id); // 保存新地址/编辑按钮点击事件
            });
        },
        /**
         * 更改默认地址点击事件
         */
        setdefaultBtnClickEvent: function () {
            $(".default_address").on("click", function () {
                var addressId = $(this).closest("div.address_list").data("id");
                CRUDInfoHandler.setdefaultInfoEvent(addressId); // 设置默认收货地址
            });
        },
        /**
         * 保存新地址/编辑按钮点击事件
         * @param {Object} flag 1:保存 2：编辑
         * @param {Object} id 编辑地址ID
         */
        soeBtnClickEvent: function (flag, id) {
            var self = this;
            var $saveaddBtn = $(".saveaddBtn");
            $saveaddBtn.off("click").on("click", function () {
                var addAddressObj = {}; // 要保存的地址对象
                addAddressObj.receiver = $("#receiver").val(); // 收货人
                addAddressObj.province = $("#province3").val(); // 省份
                addAddressObj.city = $("#city3").val(); // 城市
                addAddressObj.district = $("#district3").val(); // 区
                addAddressObj.street = ""; // 街道
                addAddressObj.address = $("#alladdress").val(); // 详细地址
                addAddressObj.zipcode = $("#zipcode").val(); //邮政编码
                addAddressObj.mobile = $("#mobile").val(); //联系电话

                if ($(".i-chk").is(':checked')) { //是否默认地址 1:默认地址 2:非默认地址
                    addAddressObj.is_default = "1";
                } else {
                    addAddressObj.is_default = "2";
                }
                console.log(addAddressObj);
                // 保存事件
                if ($saveaddBtn.val() == ADDTEXT && flag == 1) {
                    addAddressObj.userId = USERID; // 用户id
                    //相关验证
                    if (infoVerificationHandler.verificationEvent(addAddressObj)) {
                        CRUDInfoHandler.insertInfoEvent(addAddressObj);
                    }
                } else if ($saveaddBtn.val() == EDITORTEXT && flag == 2) { // 编辑事件
                    addAddressObj.addressId = id;
//					CRUDInfoHandler.setdefaultInfoEvent(id) // 设置默认收货地址
                    //相关验证
                    if (infoVerificationHandler.verificationEvent(addAddressObj)) {
                        CRUDInfoHandler.editorInfoEvent(addAddressObj);
                    }
                }

            });
        },
        /**
         * 点击input框事件
         */
        clickInputBoxEvent: function () {
            $(".add_address_wrap input[type='text']").on("click", function () { // 点击隐藏错误信息
                $(this).siblings("label.error").removeClass("whether");
                $(this).addClass("border_eec988").removeClass("border_ff5704").closest("div.address_cont_line").siblings().find("input[type='text']").removeClass("border_eec988");
            });
        }
    };
    spliceContentHandler = {
        /**
         * 拼接内容
         * @param {Object} value ajax得到的数据对象
         */
        spliceStrEvent: function (value) {
            var vrStr = '<div class="address_list" data-id="' + value.id + '" ><div class="address_list_title"><input type="hidden" id="Address' + value.id + '" value=' + JSON.stringify(value) + '>';
            vrStr += '<span class="recipient">收货人</span>';
            vrStr += '<span class="in_area">所在地区</span>';
            vrStr += '<span class="detailed_address">详细地址</span>';
            vrStr += '<span class="address_code">邮编</span>';
            vrStr += '<span class="address_tel">电话/手机</span>';
            vrStr += '<div class="editor_del"><a class="address_editor" href="javascript:;">';
            vrStr += '<em class="sprite_order"></em></a><a class="address_del" href="javascript:;">';
            vrStr += '<em class="sprite_order"></em></a></div></div>';
            vrStr += '<div class="address_list_content" >';
            vrStr += '<span class="recipient">' + value.receiver + '</span>';
            vrStr += '<span class="in_area">' + value.province + value.city + value.district + '</span>';
            vrStr += '<span class="detailed_address">' + value.address + '</span>';
            vrStr += '<span class="address_code">' + value.zipcode + '</span>';
            vrStr += '<span class="address_tel">' + value.mobile + '</span>';
            if (value.is_default == "1") {
                vrStr += '<span class="defaulted">默认地址</span>';
            } else if (value.is_default == "2") {
                vrStr += '<a class="default_address" href="javascript:;">设为默认地址</a>';
            }
            vrStr += '</div></div>';
            return vrStr;
        }
    };
    CRUDInfoHandler = {
        /**
         * 查询信息
         */
        queryInfoEvent: function () {
            $.ajax({
                url: READURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    user_id: USERID
                },
                success: function (data) {
                    if (data != null && data.code == '000') {
                        console.log(data.data);
                        $(".addressListWrap").empty();
                        $.each(data.data, function (i, v) {
                            var fliterStr = spliceContentHandler.spliceStrEvent(v);
                            $(".addressListWrap").append(fliterStr);
                        });
                        addressWrap.deleteBtnClickEvent();
                        addressWrap.editorBtnClickEvent();
                        addressWrap.setdefaultBtnClickEvent();
                    } else if (data.code == '117') {
                        $('.not_information').show().removeClass('hide');
                        $('.not_information_text').html('亲，暂无收货地址哦，点击按钮可进行添加~');
                    } else {
                        layer.msg(data.msg);
                    }
                }, error: function (data) {
                }
            });
        },
        /**
         * 插入信息
         */
        insertInfoEvent: function (obj) {
            $.ajax({
                url: ADDURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    user_id: obj.userId,
                    receiver: obj.receiver,
                    province: obj.province,
                    city: obj.city,
                    district: obj.district,
                    street: obj.street,
                    address: obj.address,
                    zipcode: obj.zipcode,
                    mobile: obj.mobile,
                    is_default: obj.is_default
                },
                success: function (data) {
                    console.log(data);
                    if (data != null && data.code == '000') {
                        layer.msg(data.msg);
                        CRUDInfoHandler.queryInfoEvent();
                        $(".add_address_wrap").addClass("display").siblings().removeClass("display");
//						addressWrap.initInputValEvent();
                    } else {
                        layer.msg(data.msg);
                    }
                },
                error: function (data) {
                }
            });
        },
        /**
         * 删除信息
         * @param {Object} element 元素
         * @param {Object} id 对应ID
         */
        deleteInfoEvent: function (element, id) {
            $.ajax({
                url: DELETEURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data != null && data.code == '000') {
                        layer.msg(data.msg);
                        element.remove();
                        CRUDInfoHandler.queryInfoEvent(); // 查询信息初始化
                    } else {
                        layer.msg(data.msg);
                    }
                },
                error: function (data) {
                }
            });
        },
        /**
         * 编辑信息
         */
        editorInfoEvent: function (obj) {
            console.log(obj.addressId);
            $.ajax({
                url: EDITORURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    id: obj.addressId,
                    receiver: obj.receiver,
                    province: obj.province,
                    city: obj.city,
                    district: obj.district,
                    street: obj.street,
                    address: obj.address,
                    zipcode: obj.zipcode,
                    mobile: obj.mobile,
                    is_default: obj.is_default
                },
                success: function (data) {
                    console.log(data);
                    if (data != null && data.code == '000') {
                        layer.msg(data.msg);
                        CRUDInfoHandler.queryInfoEvent();
                        $(".add_address_wrap").addClass("display").siblings().removeClass("display");
//						addressWrap.initInputValEvent();
                    } else {
                        layer.msg(data.msg);
                    }
                },
                error: function (data) {
                }
            });
        },
        /**
         * 设置默认地址
         */
        setdefaultInfoEvent: function (id) {
            $.ajax({
                url: SETDEFAULTURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    user_id: USERID,
                    id: id
                },
                success: function (data) {
//					if(data != null && data.code == '000') {
//						
//					}
                    CRUDInfoHandler.queryInfoEvent();
                }, error: function (data) {
                }
            });
        }
    };
    infoVerificationHandler = {
        /**
         * 相关验证
         * @param {Object} obj 验证数据对象内容
         */
        verificationEvent: function (obj) {
            var self = this;
            var flag = true; // 判断能不能提交 true：能提交  false： 不能提交
            // 判断手机号
            if (obj.mobile == null || obj.mobile == "") {
                self.errorContent(MSG1, $("#mobile"));
                flag = false;
            } else if (obj.mobile.length != 11 || !PHONEREG.test(obj.mobile)) {
                self.errorContent(MSG2, $("#mobile"));
                flag = false;
            }
            // 判断收货人姓名
            if (obj.receiver == null || obj.receiver == "") {
                self.errorContent(MSG3, $("#receiver"));
                flag = false;
            }
            // 判断邮政编码
            if (obj.zipcode == null || obj.zipcode == "") {
                self.errorContent(MSG4, $("#zipcode"));
                flag = false;
            }

            // 判断详细地址
            if (obj.address == null || obj.address == "") {
                self.errorContent(MSG5, $("#alladdress"));
                flag = false;
            }
            return flag;
        },
        /**
         * 输入错误提示
         * @param {Object} msg 错误提示文字
         * @param {Object} element 错误所在之处
         */
        errorContent: function (msg, element) {
//			element.siblings("label").text(msg).addClass("whether").parent("div").addClass("itemClickError");
            element.addClass("border_ff5704").siblings("label").text(msg).addClass("whether");
        }
    };
    //入口方法调用 代码只能从这里执行
    HHIT_CENTERAPP.controller('mAddressCtrl', ['$scope', '$http', function ($scope, $http) {

        addressWrap.init();
    }]);
})();