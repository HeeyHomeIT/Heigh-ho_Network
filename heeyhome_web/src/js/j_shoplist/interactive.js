/**
 * 虚拟现实
 */
/**
 * 闭包
 * tangj
 */
(function () {

    /**
     * 需要require的公共方法或组件
     */
    var HHIT_SHOPLISTAPP = angular.module('heeyhomeApp');

    var TAGSURL = "http://hyu2387760001.my3w.com/shoplist/gettags"; // 获取工长店铺筛选接口
    var SHOPLISTURL = "http://hyu2387760001.my3w.com/shoplist"; // 获取工长店铺列表信息接口

    var TOTAL; // 后台数据总数
    var MAXROWS; //总页数

    var USERID = $.cookie("userId"); // 得到userid
    if (USERID != null && USERID != "" && USERID != undefined) {
        USERID = $.base64.decode($.cookie("userId"));
    } else {
        USERID = "";
    }

    /**
     * 筛选条件初始化
     * userid              userid 默认空
     * servicearea         servicearea 服务区域筛选条件数组的key
     * workernum           workernum 工人数量筛选条件数组的key
     * servicetag          servicetag 风格标签筛选条件数组的key
     * shopage             shopage 店铺年限筛选条件数组的key
     * orderKey            order 排序  0默认 1成交量 2评分
     * pageVal             page  第几页
     * limitVal            limit 每页显示几条数据
     */
    var filterObj = {
        userid: USERID,
        servicearea: 1,
        workernum: 1,
        servicetag: 1,
        shopage: 1,
        orderKey: 0,
        pageVal: 1,
        limitVal: 4
    };

    /*定义一个类*/
    var shopListWrap = {
        /**
         * 入口方法
         */
        init: function () {
            shopListWrap.initEvent();
        },
        initEvent: function () {
            var self = this;
            /* 获取筛选标签内容*/
            self.initGetTagsEvent();
            /* 获取虚拟现实内容 默认1，1，1，0，1，4*/
            shopListContHandler.listContentEvent(filterObj);
        },
        /**
         * 获取筛选标签内容
         */
        initGetTagsEvent: function () {
            $.ajax({
                url: TAGSURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                success: function (data) {
                    if (data != null && data.code == '000') {
                        $.each(data.data, function (i, v) {
                            var fliterStr = '<div class="fliter_' + i + '"  data-name=' + i + '  >';
                            $.each(v, function (item, val) {
                                switch (item) {
                                    case 0:
                                        fliterStr += '<span class="fliter_name">' + val + '</span><ul class="fliter_tab" >';
                                        break;
                                    case 1:
                                        fliterStr += '<li class="active" data-label="' + item + '" >';
                                        fliterStr += '<a>' + val + '</a></li>';
                                        break;
                                    default:
                                        fliterStr += '<li class="" data-label="' + item + '" >';
                                        fliterStr += '<a>' + val + '</a></li>';
                                }
                            });
                            fliterStr += '</ul></div>';
                            $(".fliter").append(fliterStr);
                        });
                        tabSelectHandler.tabSelectEvent()

                    }
                },
                error: function (data) {
                }
            });
        }
    };
    /**
     * 标签切换效果
     */
    tabSelectHandler = {
        tabSelectEvent: function () {
            var $fliter = $(".fliter div li");

            $fliter.on("click", function () {
                $(this).addClass("active").siblings().removeClass("active");
                var $fliterdiv = $(this).closest("div");
                var $siblingdiv = $fliterdiv.siblings()
//				// 插入当前点击的筛选内容块名字 对应相应的当前点击的筛选内容id
                filterObj[$fliterdiv.data("name")] = $(this).data("label");
                $.each($siblingdiv, function (i, v) {
                    // 插入当前点击的筛选内容块名字 对应相应的当前点击的筛选内容id
                    filterObj[$siblingdiv.eq(i).data("name")] = $siblingdiv.eq(i).find("li.active").data("label");
                });
                console.log(filterObj)
                shopListContHandler.listContentEvent(filterObj);
                $(".shop_summary div").remove();
                $(".page_div3 div").remove();

            });
        }
    };
    shopListContHandler = {
        /**
         * 获取店铺列表内容
         * @param {Object} filterObj 筛选条件对象
         */
        listContentEvent: function (filterObj) {
            console.log(filterObj)
            $.ajax({
                url: SHOPLISTURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    user_id: filterObj.userid,
                    servicearea: filterObj.servicearea,
                    workernum: filterObj.workernum,
                    servicetag: filterObj.servicetag,
                    shopage: filterObj.shopage,
                    order: filterObj.orderKey,
                    page: filterObj.pageVal,
                    limit: filterObj.limitVal
                },
                success: function (data) {
                    if (data && data.code == '000') {
                        //console.log(data);
                        TOTAL = data.data[0].total; // 总数
                        $(".number").text(TOTAL);
                        $(".shop_summary div").remove();
                        $.each(data.data, function (i, v) {
                            var vrStr = spliceShopListContHandler.spliceStrEvent(v);
                            $(".shop_summary").append(vrStr);
                            if (v.iscollected == '1') {//判断是否已收藏过
                                $('.collect_shop').val('已收藏');
                            }
                        });
                        pageHandler.pageContentEvent();
                        orderModuleHandler.orderClickEvent();
                    } else {
                        $(".number").text(0);
                        alert(data.msg);
                    }
                },
                error: function (data) {
                }
            });
        }
    };
    /**
     * 排序模块
     */
    orderModuleHandler = {
        orderClickEvent: function () {
            var $sort = $(".content_title .sort");
            var sortname = $sort.parent().data("name");
            $sort.off("click").on("click", function () {
                $(this).addClass("active").siblings().removeClass("active");
                filterObj[sortname] = $(this).data("label");
                shopListContHandler.listContentEvent(filterObj);
                $(".shop_summary div").remove();
                $(".page_div3 div").remove();
            });
        }
    };
    /**
     * 拼接内容
     */
    spliceShopListContHandler = {
        spliceStrEvent: function (value) {
            var vrStr = '<div class="shop_box" data-shopid="' + value.shop_id + '" data-shopperid="' + value.shopper_id + '">';
            vrStr += '	<div class="left_image">';
            vrStr += '		<a href="#nogo"><img src="http://hyu2387760001.my3w.com/' + value.shop_img + '"></a>';
            vrStr += '		<div class="image-background_1"></div>';
            vrStr += '		<div class="image-background_2"></div>';
            vrStr += '	</div>';
            vrStr += '	<div class="right_summary">';
            vrStr += '		<div class="shop_name">';
            vrStr += '			<h2>' + value.shop_name + '</h2>';
            $.each(value.authentication, function (i, v) {
                vrStr += '		<img src="http://hyu2387760001.my3w.com/' + v + '">';
            });
            vrStr += '		</div>';
            vrStr += '		<div class="shop_introduce">';
            vrStr += '			<p>常住地址: <span>' + value.shop_address + '</span></p>';
            vrStr += '			<p>服务范围: ';
            $.each(value.servicearea, function (i, v) {
                vrStr += '		<span>' + v + '</span>';
            });
            vrStr += '			</p>';
            vrStr += '			<p>擅长风格: ';
            $.each(value.servicetag, function (i, v) {
                vrStr += '		<span>' + v + '</span>';
            });
            vrStr += '			</p>';
            vrStr += '			<p>店铺年限：<span>' + value.opentime + '</span>年</p>';
            vrStr += '		</div>';
            vrStr += '		<div class="shop_icon clearfix">';
            vrStr += '			<div class="icon_pnumber">';
            vrStr += '				<img src="css/img/icon-pnumber-1.png">';
            vrStr += '				<span>' + value.shop_scan + '</span>';
            vrStr += '			</div>';
            vrStr += '			<div class="icon_turnover">';
            vrStr += '				<img src="css/img/icon-turnover-1.png">';
            vrStr += '				<span>' + value.shop_volume + '</span>';
            vrStr += '			</div>';
            vrStr += '		</div>';
            vrStr += '		<div class="shop_assess">';
            vrStr += '			<p>工程质量<span>' + value.shop_score.projectquality + '</span>分</p>';
            vrStr += '			<p>服务态度<span>' + value.shop_score.serviceattitude + '</span>分</p>';
            vrStr += '			<p>综合评价<span>' + value.shop_score.overallmerit + '</span>分</p>';
            vrStr += '		</div>';
            vrStr += '		<div class="shop_button">';
            vrStr += '			<input type="button" class="collect_shop" value="收藏">';
//				vrStr += '			<input type="button" class="enter_shop" value="进入店铺">';
            vrStr += '			<a class="enter_shop" rel="nofollow" href="view_shop.html#/shopdetails?pos=' + value.shop_id + '" >进入店铺</a>';
            vrStr += '		</div>';
            vrStr += '	</div>';
            vrStr += '</div>';
            return vrStr;
        }
    };
    /**
     * 分页
     */
    pageHandler = {
        pageContentEvent: function () {
            MAXROWS = Math.ceil(TOTAL / 4); // 页数
            $(".page_div3").paging({
                total: MAXROWS, //全部页数
                animation: false, //是否是滚动动画方式呈现  false为精简方式呈现   页数大于limit时无论怎么设置自动默认为false
                centerBgColor: "#fff",
                centerFontColor: "#000",
                centerBorder: "1px solid #ddd",
                transition: "all .2s",
                centerHoverBgColor: "#25dd3d",
                centerHoverBorder: "1px solid #25dd3d",
                centerFontHoverColor: "#fff",
                otherFontHoverColor: "#fff",
                otherBorder: "1px solid #ddd",
                otherHoverBorder: "1px solid #25dd3d",
                otherBgColor: "#fff",
                otherHoverBgColor: "#25dd3d",
                currentFontColor: "#fff",
                currentBgColor: "#f79898",
                currentBorder: "1px solid #f79898",
                fontSize: 13,
                currentFontSize: 13,
                cormer: 2, //按钮的边角曲度
                gapWidth: 3, //间隙宽度
                showJump: true, //是否显示跳转功能
                jumpBgColor: "#fff",
                jumpFontHoverColor: "#fff",
                jumpHoverBgColor: "#25dd3d",
                jumpBorder: "1px solid #ddd",
                jumpHoverBorder: "1px solid #25dd3d",
                submitType: "get", //注明是通过get方式访问还是post方式访问
                idParameter: "page",               //传到后台的当前页的id的参数名，这个传值会自动添加在href或ajax的url末尾
                url: SHOPLISTURL, //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
                ajaxData: {
                    user_id: filterObj.userid,
                    servicearea: filterObj.servicearea,
                    workernum: filterObj.workernum,
                    servicetag: filterObj.servicetag,
                    shopage: filterObj.shopage,
                    order: filterObj.orderKey,
                    page: filterObj.pageVal,
                    limit: filterObj.limitVal
                },   //ajax方式传值时的附加传值,要传的参数放在这里面,页面参数只要指定idParamemeter就好，会自动添加
                dataOperate: function oprate(data) {
                    $(".shop_summary div").remove();
                    $.each(data.data, function (i, v) {
                        var vrStr = spliceShopListContHandler.spliceStrEvent(v);
                        $(".shop_summary").append(vrStr);
                        if (v.iscollected == '1') {
                            $('.collect_shop').val('已收藏');
                        }
                    });
                } //用于ajax返回的数据的操作,回调函数,data为服务器返回数据
            });
        }
    };
    //入口方法调用 代码只能从这里执行
    HHIT_SHOPLISTAPP.controller('myShoplist', ['$scope', '$http', function ($scope, $http) {
        shopListWrap.init();
    }]);
})();