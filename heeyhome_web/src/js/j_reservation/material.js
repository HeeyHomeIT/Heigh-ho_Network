/**
 * 闭包
 * 开始预订
 * tangj
 */
(function () {

    /**
     * 需要require的公共方法或组件
     */
    var HHIT_MATERIALAPP = angular.module('heeyhomeApp');

    var USERGETURL = "http://www.heeyhome.com/api/public/order/material/userget"; // 用户材料订单数据获取API
    var PAYURL = "http://www.heeyhome.com/api/public/alipay/pay"; // 支付宝支付
    var OUTURL = "http://www.heeyhome.com/api/public/order/material/outMaterialByUser"; // 用户确认材料单线下购买

    /*定义一个类*/
    var materialListWrap = {
        /**
         * 入口方法
         */
        init: function () {
            materialListWrap.initEvent();
        },
        initEvent: function () {
            var self = this;
            self.initWebDataEvent(); // 页面数据初始化
        },
        /**
         * 页面数据初始化
         */
        initWebDataEvent: function () {
            var self = this;
            self.initMaterialListDetailsEvent(); // 材料清单详情
        },
        /**
         * 材料清单详情
         */
        initMaterialListDetailsEvent: function () {
            getDataForAjaxHandler.getDataEvent();
        }
    };
    getDataForAjaxHandler = {
        /**
         * 调用AJAX得到数据
         */
        getDataEvent: function () {
            var self = this;
            var orderId = getUrlParamHandler.getUrlParam("pos");
            var type = getUrlParamHandler.getUrlParam("material_type");
            console.log(orderId);
            var pc = spliceMaterialContHandler;

            $.ajax({
                url: USERGETURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    order_id: orderId,
                    material_type: type
                },
                beforeSend: function () {
                    $("#itemlists").addClass("loagbg");
                },
                complete: function () {
                    $("#itemlists").removeClass("loagbg");
                }
            }).done(function (data) {
                console.log(data);

                if (data.data.order_pay_type == 0) { // 未支付 订单未产生需要支付环节（材料可以选择，可以选择自行购买或平台支付）

                    pc.spliceMaterialsDataEvent(data.data, false); // 初始值
                    self.initTotalSumEvent(); // 求总价
                    self.initPaySumbitEvent(); // 支付

                    self.initSelectAllEvent(); // 材料选择

                    $(document).on("click", ".titlelist input", function () {
                        var $this = $(this);
                        pc.spliceRelevantMaterialsEvent(data.data, $this.data("brand"), $this, false);
                        $this.parents("li").siblings().find("i").removeClass("rep_radiao_check");
                        $this.siblings("i").addClass("rep_radiao_check");
                    });
                    $('.Jnum').html($('.shows').length);
                } else if (data.data.order_pay_type == 1) { // 待支付（材料不可选择，可以选择自行购买或平台支付）
                    self.initPaySumbitEvent(data.data.order_pay_type); // 支付
//					$("#Jpayment").val("已支付").addClass("alreadyPaid");
//					$(".selfPurchase").addClass("ap");
                    $("#checkYt").prop("checked", true);
                    $(".explain").find("em").addClass("defalut_ico");
                    $(".explain").find("label").addClass("cursor");
                    $("#nocheck").addClass("yes_check");
                    pc.spliceMaterialsDataEvent(data.data, true); // 初始值
                    $(document).on("click", ".titlelist input", function () {
                        var $this = $(this);
                        pc.spliceRelevantMaterialsEvent(data.data, $this.data("brand"), $this, true);
                        $this.parents("li").siblings().find("i").removeClass("rep_radiao_check");
                        $this.siblings("i").addClass("rep_radiao_check");
                    });
                    layer.msg("材料不可选择，可以选择自行购买或平台支付");
                    self.initTotalSumEvent(); // 求总价
                    $('.Jnum').html($('.shows').length);
                } else if (data.data.order_pay_type == 3) { // 支付成功（材料不可选择，不可选择自行购买或平台支付）
                    var buy = sessionStorage.getItem('data-buy');
                    if (buy == '1') {
                        $('.listnumber span').remove();
                        $('.listnumber').append('<b>已自行购买材料</b>');
                    }
                    $("#Jpayment").val("已支付").addClass("alreadyPaid");
                    $(".selfPurchase").addClass("ap");
                    $("#checkYt").prop("checked", true);
                    $(".explain").find("em").addClass("defalut_ico");
                    $(".explain").find("label").addClass("cursor");
                    $("#nocheck").addClass("yes_check");
                    pc.spliceMaterialsDataEvent(data.data, true); // 初始值
                    $(document).on("click", ".titlelist input", function () {
                        var $this = $(this);
                        pc.spliceRelevantMaterialsEvent(data.data, $this.data("brand"), $this, true);
                        $this.parents("li").siblings().find("i").removeClass("rep_radiao_check");
                        $this.siblings("i").addClass("rep_radiao_check");
                    });
                    self.initTotalSumEvent(); // 求总价
                    $('.Jnum').html($('.shows').length);
                }
            });
        },
        /**
         * 支付
         * @param {Object} type 支付状态
         */
        initPaySumbitEvent: function (type) {
            var orderId = getUrlParamHandler.getUrlParam("pos");
            if (type != 1) {
                $(document).on("click", "#checkYt", function () {
                    if ($(this).is(':checked')) { //是否默认地址 1:默认地址 2:非默认地址
                        $(this).siblings("em").addClass("defalut_ico");
                        $(this).parents().siblings("span").addClass("yes_check");
                    } else {
                        $(this).siblings("em").removeClass("defalut_ico");
                        $(this).parents().siblings("span").removeClass("yes_check");
                    }
                });
            }

            $(document).on("click", "#Jpayment", function () {
                if ($("#checkYt").is(':checked')) {
                    var selectedArr = [];
                    $.each($("#itemlists .itemlist .material_cardtable tbody tr"), function (i, v) {
                        if ($(v).find("em").hasClass("defalut_ico")) {
                            selectedArr.push($(v).find(".Jselect").data("select"));
                        }
                    });
                    console.log(JSON.stringify(selectedArr));
                    var orderType = $("#Jpayment").data("submit");
                    console.log(orderType);
                    PAYURL = PAYURL + "?pay_type=" + orderType + "&order_id=" + orderId + "&material_list=" + JSON.stringify(selectedArr);
                    $("#meterialFrom").attr("action", PAYURL);
                    $("#meterialFrom").submit();
                } else {
                    layer.msg("请先仔细阅读合同条款并勾选确认");
                }

            });
            // 自行购买
            $(document).on("click", "#JSelfPurchase", function () {
                $.ajax({
                    url: OUTURL,
                    type: "GET",
                    async: true,
                    dataType: 'jsonp',
                    data: {
                        order_id: orderId
                    },
                    success: function (data) {
                    }, error: function (data) {
                    }
                }).done(function (data) {
                    console.log(data);
                    // layer.alert(data.msg)
                    layer.confirm('您确定自行购买吗？', {
                        btn: ['确定', '取消'] //按钮
                    }, function () {
                        location.reload();
                        // $('.listnumber span').remove();
                        // $('.listnumber').append('<b>已自行购买材料</b>');
                        sessionStorage.setItem('data-buy', '1');
                    });
                });
            });
        },
        /**
         * 材料选择
         */
        initSelectAllEvent: function () {
            var self = this;
            //全选和全不选
            $(document).on("click", ".JcheckGcd", function () {
                if ($(this).is(':checked')) { //是否默认地址 1:默认地址 2:非默认地址
                    $(this).siblings("em").removeClass("defalut_ico");
                    $(this).closest("table").find('input[name="subBox"]').prop("checked", this.checked).siblings("em").removeClass("defalut_ico");

                } else {
                    $(this).siblings("em").addClass("defalut_ico");
                    $(this).closest("table").find('input[name="subBox"]').prop("checked", this.checked).siblings("em").addClass("defalut_ico");

                }
                self.initTotalSumEvent(); // 求总价
            });
            // 单个选择
            $(document).on("click", ".material_cardtable tbody tr input", function () {
                if ($(this).is(':checked')) { //是否默认地址 1:默认地址 2:非默认地址
                    $(this).siblings("em").removeClass("defalut_ico");
                } else {
                    $(this).siblings("em").addClass("defalut_ico");
                }
                self.initTotalSumEvent(); // 求总价
            });
        },
        /**
         * 总价变化
         */
        initTotalSumEvent: function () {
            var total = 0;
            $.each($("#itemlists .itemlist .material_cardtable tbody tr"), function (i, v) {
                if ($(v).find("em").hasClass("defalut_ico")) {
                    total += parseInt($(v).find(".Jselect").data("subtotal"));
                    console.log(total)
                }

            });
            $(".Jtotal").html(total);
        }

    };
    /**
     * 拼接内容
     */
    spliceMaterialContHandler = {
        /**
         * 预支付单详情
         * @param {Object} value 对象
         * @param {Object} flag 标志 true代表已支付 false代表未支付
         */
        spliceMaterialsDataEvent: function (value, flag) {
            var vrStr = '';

            $.each(value, function (i, v) {
                if (i != "order_pay_type") {
                    var key, counter = 0;
                    for (key in v) {
                        counter++;
                    }
                    // 只有一个品牌数
                    if (parseInt(counter) == 1) {
                        if (Object.keys(v) == "无品牌") {
                            vrStr += '<div class="itemlist">';
                            vrStr += '<div class="titlelist"></div>';
                            vrStr += '<div class="material_cardtable "><table cellspacing="0" cellpadding="0"><thead><tr><td align="center" width="200px">参考图</td>';
                            vrStr += '<td align="center" width="185px">名称</td><td align="center" width="100px">规格</td><td align="center" width="100px">单位</td><td align="center" width="100px">单价/元</td><td align="center" width="100px">数量</td>';
                            vrStr += '<td align="center" width="100px">小计/元</td><td align="center" width="50px">';
                            if (flag) {
                                vrStr += '</td></tr></thead><tbody>'
                            } else {
                                vrStr += '<label class="set_default"><input class="JcheckGcd" id="checkGcd" type="checkbox" /><em class="defalut_ico"></em></label></td></tr></thead><tbody>'
                            }
                            $.each(v, function (item, val) {
                                $.each(val, function (item1, val1) {
                                    vrStr += '<tr class="shows">';
                                    vrStr += '<td rowspan="' + val1.data.length + '" class="border_eee"><img src="http://www.heeyhome.com/' + val1.img + '"></td>';
                                    vrStr += '<td rowspan="' + val1.data.length + '" class="border_eee">' + val1.name + '</td>';
                                    $.each(val1.data, function (item2, val2) {
                                        if (item2 != 0) {
                                            vrStr += '<tr class="shows">';
                                        }
                                        vrStr += '<td class="Jselect" data-select="' + val2.id + '" data-subtotal="' + parseFloat(val2.price) * parseFloat(val2.num) + '">' + val2.spec_name + '</td><td>' + val2.unit + '</td><td>' + val2.price + '</td><td>' + val2.num + '</td><td>' + parseFloat(val2.price) * parseFloat(val2.num) + '</td>';
                                        vrStr += '<td>';
                                        if (flag) {
                                            vrStr += '<label class="set_default cursor"><input name="subBox" checked="' + (val2.choose_flag == 1 ? 'checked' : '') + '" type="checkbox" /><em class="' + (val2.choose_flag == 1 ? 'rep_radiao_check' : '') + '"></em></label></td>'
                                        } else {
                                            vrStr += '<label class="set_default"><input name="subBox" type="checkbox" /><em class="defalut_ico"></em></label></td>'
                                        }
                                        vrStr += '</tr>';
                                    });
                                });
                                vrStr += '</tbody></table></div></div>';
                            });
                        } else {

                            vrStr += '<div class="itemlist">';
                            vrStr += '<div class="titlelist"><dl><dt>请选择一个品牌</dt><dd><ul class="airplane_rad clearfix"><li>';
                            vrStr += '<label for="airplaneRadio' + i + '" id="repAirRadio' + i + '"><input type="radio" checked="checked" data-brand="' + Object.values(v)[0][0].data[0].brand_id + '" id="airplaneRadio' + i + '" class="display" />';
                            vrStr += '<i class="rep_radiao_check"></i><span>' + Object.keys(v) + '</span></label></li></ul></dd></dl></div>';
                            vrStr += '<div class="material_cardtable "><table cellspacing="0" cellpadding="0"><thead><tr><td align="center" width="200px">参考图</td>';
                            vrStr += '<td align="center" width="185px">名称</td><td align="center" width="100px">规格</td><td align="center" width="100px">单位</td><td align="center" width="100px">单价/元</td><td align="center" width="100px">数量</td>';
                            vrStr += '<td align="center" width="100px">小计/元</td><td align="center" width="50px">';
                            if (flag) {
                                vrStr += '</td></tr></thead><tbody>'
                            } else {
                                vrStr += '<label class="set_default"><input class="JcheckGcd" id="checkGcd" type="checkbox" /><em class="defalut_ico"></em></label></td></tr></thead><tbody>'
                            }
                            $.each(v, function (item, val) {
                                $.each(val, function (item1, val1) {
                                    vrStr += '<tr class="shows">';
                                    vrStr += '<td rowspan="' + val1.data.length + '" class="border_eee"><img src="http://www.heeyhome.com/' + val1.img + '"></td>';
                                    vrStr += '<td rowspan="' + val1.data.length + '" class="border_eee">' + val1.name + '</td>';
                                    $.each(val1.data, function (item2, val2) {
                                        if (item2 != 0) {
                                            vrStr += '<tr class="shows">';
                                        }
                                        vrStr += '<td class="Jselect" data-select="' + val2.id + '" data-subtotal="' + parseFloat(val2.price) * parseFloat(val2.num) + '" >' + val2.spec_name + '</td><td>' + val2.unit + '</td><td>' + val2.price + '</td><td>' + val2.num + '</td><td>' + parseFloat(val2.price) * parseFloat(val2.num) + '</td>';
                                        vrStr += '<td>';
                                        if (flag) {
                                            vrStr += '<label class="set_default cursor"><input name="subBox" type="checkbox" checked="' + (val2.choose_flag == 1 ? 'checked' : '') + '" /><em class="' + (val2.choose_flag == 1 ? 'rep_radiao_check' : '') + '"></em></label></td>'
                                        } else {
                                            vrStr += '<label class="set_default"><input name="subBox" type="checkbox" /><em class="defalut_ico"></em></label></td>'
                                        }
                                        vrStr += '</tr>';
                                    });
                                });
                                vrStr += '</tbody></table></div></div>';
                            });
                        }
                    } else {
                        var brandId = [];
                        $.each(v, function (a, b) {
                            brandId.push(Object.values(b)[0].data[0].brand_id);
                        });
                        vrStr += '<div class="itemlist">';
                        vrStr += '<div class="titlelist"><dl><dt>请选择一个品牌</dt><dd><ul class="airplane_rad clearfix">';
                        for (var i1 in Object.keys(v)) {
                            vrStr += '<li><label for="airplaneRadio' + i + i1 + '" id="repAirRadio' + i + i1 + '">';

                            vrStr += '<input type="radio" checked="checked" data-brand="' + brandId[i1] + '" id="airplaneRadio' + i + i1 + '" class="display" />'
                            vrStr += '<i class="' + (parseInt(i1) == 0 ? 'rep_radiao_check' : '') + '"></i><span>' + Object.keys(v)[i1] + '</span></label></li>';
                        }
                        vrStr += '</ul></dd></dl></div>';
                        vrStr += '<div class="material_cardtable "><table cellspacing="0" cellpadding="0"><thead><tr><td align="center" width="200px">参考图</td>';
                        vrStr += '<td align="center" width="185px">名称</td><td align="center" width="100px">规格</td><td align="center" width="100px">单位</td><td align="center" width="100px">单价/元</td><td align="center" width="100px">数量</td>';
                        vrStr += '<td align="center" width="100px">小计/元</td><td align="center" width="50px">';
                        if (flag) {
                            vrStr += '</td></tr></thead><tbody>'
                        } else {
                            vrStr += '<label class="set_default"><input class="JcheckGcd" id="checkGcd" type="checkbox" /><em class="defalut_ico"></em></label></td></tr></thead><tbody>'
                        }
                        $.each(Object.values(v)[0], function (item, val) {
                            vrStr += '<tr class="shows">';
                            vrStr += '<td rowspan="' + val.data.length + '" class="border_eee"><img src="http://www.heeyhome.com/' + val.img + '"></td>';
                            vrStr += '<td rowspan="' + val.data.length + '" class="border_eee">' + val.name + '</td>';
                            $.each(val.data, function (item2, val2) {
                                if (item2 != 0) {
                                    vrStr += '<tr class="shows">';
                                }
                                vrStr += '<td class="Jselect" data-select="' + val2.id + '" data-subtotal="' + parseFloat(val2.price) * parseFloat(val2.num) + '" >' + val2.spec_name + '</td><td>' + val2.unit + '</td><td>' + val2.price + '</td><td>' + val2.num + '</td><td>' + parseFloat(val2.price) * parseFloat(val2.num) + '</td>';
                                vrStr += '<td>';
                                if (flag) {
                                    vrStr += '<label class="set_default cursor"><input name="subBox" type="checkbox" checked="' + (val2.choose_flag == 1 ? 'checked' : '') + '" /><em class="' + (val2.choose_flag == 1 ? 'rep_radiao_check' : '') + '"></em></label></td>'
                                } else {
                                    vrStr += '<label class="set_default"><input name="subBox" type="checkbox" /><em class="defalut_ico"></em></label></td>'
                                }
                                vrStr += '</tr>';
                            });

                        });
                        vrStr += '</tbody></table></div></div>';
                    }
                }

            });
            $("#itemlists").html(vrStr);
            $("#itemlists").find("table tbody > tr").each(function (e, t) {
                window.setTimeout(function () {
                    $(t).addClass("shows")
                }, 20 * e);
            });
        },
        /**
         * 相应的材料切换
         * @param {Object} value 对象
         * @param {Object} brandId 材料ID
         * @param {Object} element 当前对象
         * @param {Object} flag 标志 true代表已支付 false代表未支付
         */
        spliceRelevantMaterialsEvent: function (value, brandId, element, flag) {
            var vrStr = '';
            $.each(value, function (i, v) {
                if (i != "order_pay_type") {
                    $.each(v, function (item, val) {
                        if (val[0].data[0].brand_id == brandId) {
                            console.log(val);
                            vrStr += '<div class="material_cardtable "><table cellspacing="0" cellpadding="0"><thead><tr><td align="center" width="200px">参考图</td>';
                            vrStr += '<td align="center" width="185px">名称</td><td align="center" width="100px">规格</td><td align="center" width="100px">单位</td><td align="center" width="100px">单价/元</td><td align="center" width="100px">数量</td>';
                            vrStr += '<td align="center" width="100px">小计/元</td><td align="center" width="50px">';
                            if (flag) {
                                vrStr += '</td></tr></thead><tbody>';
                            } else {
                                vrStr += '<label class="set_default"><input class="JcheckGcd" id="checkGcd" type="checkbox" /><em class="defalut_ico"></em></label></td></tr></thead><tbody>';
                            }
                            $.each(val, function (item, val) {
                                vrStr += '<tr>';
                                vrStr += '<td rowspan="' + val.data.length + '" class="border_eee"><img src="http://www.heeyhome.com/' + val.img + '"></td>';
                                vrStr += '<td rowspan="' + val.data.length + '" class="border_eee">' + val.name + '</td>';
                                $.each(val.data, function (item2, val2) {
                                    if (item2 != 0) {
                                        vrStr += '<tr>';
                                    }
                                    vrStr += '<td data-select="' + val2.id + '">' + val2.spec_name + '</td><td>' + val2.unit + '</td><td>' + val2.price + '</td><td>' + val2.num + '</td><td>' + parseFloat(val2.price) * parseFloat(val2.num) + '</td>';
                                    vrStr += '<td>';
                                    if (flag) {
                                        vrStr += '<label class="set_default cursor"><input name="subBox" type="checkbox" checked="' + (val2.choose_flag == 1 ? 'checked' : '') + '" /><em class="' + (val2.choose_flag == 1 ? 'rep_radiao_check' : '') + '"></em></label></td>'
                                    } else {
                                        vrStr += '<label class="set_default"><input name="subBox" type="checkbox" /><em class="defalut_ico"></em></label></td>'
                                    }
                                    vrStr += '</tr>';
                                });
                            });
                            vrStr += '</tbody></table></div></div>';
                        }
                    });
                }
            });
            element.closest(".titlelist").siblings().html(vrStr);
            element.closest(".titlelist").siblings().find("table tbody > tr").each(function (e, t) {
                window.setTimeout(function () {
                    $(t).addClass("shows")
                }, 20 * e)
            });
        }

    };
    getUrlParamHandler = {
        /**
         * 获取url中的参数
         * @param {Object} name
         */
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.hash.split("?")[1].match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return null; //返回参数值
        }
    };

    //入口方法调用 代码只能从这里执行
    HHIT_MATERIALAPP.controller('materiallistCtrl', ['$scope', '$http', function ($scope, $http) {
        materialListWrap.init();
    }]);
})();