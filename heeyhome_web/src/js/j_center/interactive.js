/**
 * 闭包
 * tangj
 */
(function () {

    /**
     * 需要require的公共方法或组件
     */
    var HHIT_CENTERAPP = angular.module('heeyhomeApp');

    var USERDATAURL = 'http://hyu2387760001.my3w.com/personal/userinfo'; // 用户个人资料
    var SHOPCURL = 'http://hyu2387760001.my3w.com/personal/collection/shop?callback=JSON_CALLBACK';//店铺收藏列表
    var DSHOPURL = 'http://hyu2387760001.my3w.com/personal/collection/shopdel?callback=JSON_CALLBACK';//删除店铺收藏列表

    /*定义一个类*/
    var centerWrap = {
        /**
         * 入口方法
         */
        init: function () {
            centerWrap.initEvent();
        },
        initEvent: function () {
            var self = this;
            /* 获取右侧百科标题*/
            self.initStyleChangeEvent();
            self.initMDataEvent();
            self.initMCollectionEvent();
            self.initMOrderEvent();
        },
        /**
         * 个人中心样式改变事件
         */
        initStyleChangeEvent: function () {

            HHIT_CENTERAPP.controller('styleCtrl', ['$scope', '$http', function ($scope, $http) {
                /* 左边导航栏鼠标点击事件 */
                $('.left_ul li').click(function () {
                    $(this).addClass('left_active').siblings().removeClass('left_active');
                });
            }]);
        },
        /*
         *  个人资料标题切换内容
         */
        initMDataEvent: function () {
            HHIT_CENTERAPP.controller('mDataCtrl', ['$scope', '$http', function ($scope, $http) {
                /* details */
                var $dtDiv = $("#works_content_title div");
                var iSpeed = 0;
                var left = 0;
                var oBg = document.getElementById("title_active");
                for (var i = 0; i < $dtDiv.length - 1; i++) {
                    $dtDiv[i].onclick = function () {
                        startMoveHandler.startMoveEvent(oBg, this.offsetLeft, iSpeed, left);
                        $(".personal_content").hide();
                        $(".update_head").hide();
                        $(".works_content >div:eq(" + ($(this).index() + 1) + ")").show().removeClass('hide');
                    }
                }
                getUserInfoHandler.getInfoEvent();
                uploadPictureHandler.uploadAvatar();
            }]);
        },
        /*
         *  我的收藏标题切换内容
         */
        initMCollectionEvent: function () {
            HHIT_CENTERAPP.controller('mCollectionCtrl', ['$scope', '$http', function ($scope, $http) {
                /* details */
                var $dtDiv = $("#works_content_title div");
                var iSpeed = 0;
                var left = 30;
                var oBg = document.getElementById("title_active");
                for (var i = 0; i < $dtDiv.length - 1; i++) {
                    $dtDiv[i].onclick = function () {
                        startMoveHandler.startMoveEvent(oBg, this.offsetLeft, iSpeed, left);
                        $(".complete_before").hide();
                        $(".check_list_wrap").hide();
                        $(".collection_shop_wrap").hide();
                        $(".works_complete_wrap >div:eq(" + ($(this).index()) + ")").show().removeClass('hide');
                    }
                }
                getShopInfoHandler.shopInfo();//获取店铺收藏列表
            }]);
        },
        /* 我的订单点击小三角事件 */
        initMOrderEvent: function () {
            HHIT_CENTERAPP.controller('mMorderCtrl', ['$scope', '$http', function ($scope, $http) {
                var _arrow = $(".order_title div").eq(6);//全部后面的小三角形
                var _area = $(".order_content .order_box");//哪一份订单
                var _arrowcnt = $(".order_title div").eq(6).find("ul");//全部后面的小三角形里的内容
                $(_arrow).click(function () {
                    $(_arrowcnt).slideDown(500);
                }, function () {
                    if ($(_arrow).hasClass("item_hover_180")) {
                        $(_arrow).removeClass("item_hover_180");
                    }
                    else {
                        $(_arrow).addClass("item_hover_180");
                    }
                    $(_arrowcnt).slideToggle(500);
                });
                $(_area).each(function () {
                    var _arrowsize = $(this).find(".area").children("p");//建筑面积里的小三角形
                    var _sizecnt = $(this).find(".ordercnt_content").children(".order_detail");//建筑面积里的小三角形里的内容
                    $(_arrowsize).click(function () {
                        $(_sizecnt).slideDown(500);
                    }, function () {

                        if ($(this).hasClass("item_hover_180")) {
                            $(this).removeClass("item_hover_180");
                            $(this).css({"border": "0"});
                        }
                        else {
                            $(this).addClass("item_hover_180");
                            $(this).css({"border": "1px solid #EFEFEF", "border-bottom": "1px solid #ffffff"});
                        }
                        $(_sizecnt).slideToggle(500);
                    });
                });
            }]);
        }
    };

    /* div移动撞击事件 */
    startMoveHandler = {
        startMoveEvent: function (obj, iTarget, iSpeed, left) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                iSpeed += (iTarget - obj.offsetLeft) / 10;
                iSpeed *= 0.7;
                left += iSpeed; //防止小数误差问题
                if (Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) { //距离足够近与速度足够小
                    clearInterval(obj.timer);
                    obj.style.left = iTarget + "px";
                } else {
                    obj.style.left = left + "px";
                }
            }, 30);
        }
    };

    /* 获取用户信息 */
    getUserInfoHandler = {
        getInfoEvent: function () {
            $.ajax({
                url: USERDATAURL,
                type: "GET",
                async: true,
                dataType: 'jsonp',
                data: {
                    user_id: $.base64.decode($.cookie("userId"))
                },
                success: function (data) {
                    //console.log(data);
                    if (data != null && data.code == '000') {
                        $('.personal_tel').html(data.data.userinfo_phone); //获取用户的电话号码
                        $('.personal_user_age').val(data.data.userinfo_age); //获取用户的年龄
                        $('.personal_user_nickname').val(data.data.userinfo_nickname); //获取用户的昵称
                        if (data.data.userinfo_sex == 1) { //判断用户的性别
                            $('#man').attr('checked', 'checked');
                        } else {
                            $('#women').attr('checked', 'checked');
                        }
                    }
                },
                error: function (data) {
                }
            });
        }
    };

    /* 获取店铺收藏列表 */
    getShopInfoHandler = {
        shopInfo: function () {
            HHIT_CENTERAPP.controller('collectionController', ['$scope', '$http', function ($scope, $http, currentPage) {
                var total = 0;
                $scope.paginationConf = {
                    currentPage: 1,
                    totalItems: total,
                    itemsPerPage: 4,
                    pagesLength: 9,
                    perPageOptions: [10, 20, 30, 40, 50],
                    onChange: function () {
                        $http({
                            method: "JSONP",
                            url: SHOPCURL,
                            /* 传参 */
                            params: {
                                user_id: $.base64.decode($.cookie("userId")),
                                page: $scope.paginationConf.currentPage,
                                limit: 4
                            }
                        }).success(function (data, status) {
                            /* 如果成功执行 */
                            if (data.code === '000') {
                                //console.log(data.data);
                                $scope.infos = data.data;
                                /* 防止页面一直刷新 */
                                if (total != data.data[0].total) {
                                    $scope.paginationConf.totalItems = data.data[0].total;
                                }
                                total = data.data[0].total;//获取总数据
                            }
                            /* 如果失败执行 */
                            else {
                                alert(data.msg);
                            }
                        }).error(function (data, status) {
                        });
                    }
                };
                /* 删除店铺收藏列表 */
                $scope.delete = function ($index) {
                    $http({
                        method: "JSONP",
                        url: DSHOPURL,
                        /* 传参 */
                        params: {
                            shop_id: $scope.infos[$index].shop_id
                        }
                    }).success(function (data, status) {
                        if (data && data.code == '000') {
                            $scope.paginationConf.totalItems = total;
                        }
                    }).error(function (data, status) {
                    });
                };
            }]);
        }
    };

    /* 上传图片 */
    uploadPictureHandler = {
        uploadAvatar: function () {
            var options = {
                thumbBox: '.thumbBox',
                spinner: '.spinner',
                imgSrc: 'css/img/imgWrap_bg.png'
            };
            var cropper = $('.imageBox').cropbox(options);
            $('#upload-file').on('change', function () {
                var reader = new FileReader();
                reader.onload = function (e) {
                    options.imgSrc = e.target.result;
                    cropper = $('.imageBox').cropbox(options);
                    $('.thumbBox').show().removeClass('hide');
                };
                reader.readAsDataURL(this.files[0]);
                /*this.files = [];*/
            });
            /* 点击剪切触发的事件 */
            $('#btnCrop').on('click', function () {
                var img = cropper.getDataURL();
                var result_100 = $('.cropped .result_100');
                var result_50 = $('.cropped .result_50');
                result_100.html('');
                result_50.html('');
                result_100.append('<img src="' + img + '" align="absmiddle" style="width:100px;height:100px;box-shadow:0 0 12px #7E7E7E;">');
                result_50.append('<img src="' + img + '" align="absmiddle" style="width:50px;height:50px;box-shadow:0 0 12px #7E7E7E;" >');
            });
            /* 点击加号触发的事件 */
            $('#btnZoomIn').on('click', function () {
                cropper.zoomIn();
            });
            /* 点击减号触发的事件 */
            $('#btnZoomOut').on('click', function () {
                cropper.zoomOut();
            });
            /* 鼠标移入图片框框的时候禁用滚轮，离开可以使用滚轮 */
            $('.imgWrap').hover(function () {
                disabledMouseWheel.chromeDepend();
            }, function () {
                window.onmousewheel = document.onmousewheel = true;
                document.removeEventListener('DOMMouseScroll', disabledMouseWheel.firefoxDepend, false);
            });
        }
    };

    /* 禁用滚轮事件 */
    disabledMouseWheel = {
        chromeDepend: function () {
            if (document.addEventListener) {
                document.addEventListener('DOMMouseScroll', disabledMouseWheel.firefoxDepend, false);
            }//W3C
            window.onmousewheel = document.onmousewheel = disabledMouseWheel.firefoxDepend;//IE/Opera/Chrome
        },
        firefoxDepend: function (evt) {
            evt = evt || window.event;
            if (evt.preventDefault) {
                // Firefox
                evt.preventDefault();
                evt.stopPropagation();
            } else {
                // IE
                evt.cancelBubble = true;
                evt.returnValue = false;
            }
            return false;
        }
    };
    //入口方法调用 代码只能从这里执行
    centerWrap.init();
})();