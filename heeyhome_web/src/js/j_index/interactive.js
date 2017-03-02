define(['app'], function (app) {

    var BANNERURL = '/api/public/banner'; // banner显示
    var VRURL = '/api/public/panorama'; // 虚拟现实显示

    (function () {
        /*定义一个类*/
        var indexWrap = {
            /**
             * 入口方法
             */
            init: function () {
                indexWrap.initEvent();
            },
            initEvent: function () {
                var self = this;
                /* 轮播图*/
                self.initCarouselEvent();
                /* 虚拟现实 */
                self.initVrEvent();
            },
            /**
             * 轮播图
             */
            initCarouselEvent: function () {
                $.ajax({ //获得轮播图内容
                    type: "get",
                    url: BANNERURL,
                    async: true,
                    dataType: 'jsonp',
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            var len = data.data.length;
                            var carouselPic = '<ul class="car-inner">';
                            var imgArr = [];
                            $.each(data.data, function (i, n) {
                                if (i == 0) {
                                    carouselPic += '<li class="item active"><a href="' + n.img_path + '" target="_blank"><img src="' + n.img + '"></a></li>';
                                } else {
                                    carouselPic += '<li class="item"><a href="' + n.img_path + '" target="_blank"><img src="' + n.img + '"></a></li>';
                                }
                                imgArr.push(n.img);
                                $('.number_control ul').append('<li>0' + (i + 1) + '</li>');
                            });
                            carouselPic += '</ul>';
                            $("#myCarousel").append(carouselPic);
                            superSlide.slidePic();
                            onchangeNumber.change(len);
                            function preloadimages(arr) {
                                var newimages = [];
                                var arr = (typeof arr != "object") ? [arr] : arr; //确保参数总是数组
                                for (var i = 0; i < arr.length; i++) {
                                    newimages[i] = new Image();
                                    newimages[i].src = arr[i];
                                }
                            }

                            preloadimages(imgArr);
                        }
                    },
                    error: function (data) {
                    }
                });
            },
            /*
             * 虚拟现实
             */
            initVrEvent: function () {
                $.ajax({ //获得虚拟现实内容
                    type: "get",
                    url: VRURL,
                    async: true,
                    dataType: 'jsonp',
                    success: function (data) {
                        if (data != null && data.code == '000') {
                            var panorama = '<div class="vr_picture"><ul>';
                            for (var i = 0; i < 3; i++) {
                                panorama += '<li> <a href="' + data.data[i].panorama_url + '" target="_blank"> <div class="panoramaImg">';
                                panorama += '<img src="' + data.data[i].panorama_img + '"></div>';
                                panorama += '<figcaption>';
                                panorama += '<i class="sprite-image pic_hover"></i>';
                                panorama += ' <b>' + data.data[i].panorama_style + '</b>';
                                panorama += ' <span>' + data.data[i].panorama_area + 'm²</span>';
                                panorama += ' </figcaption></a> </li>';
                            }
                            panorama += '</ul></div>';

                            $(".virtual_content").append(panorama);
                            boxPicture.cssSetting();
                        }
                    },
                    error: function (data) {
                    }
                });
            }
        };
        /*
         * 轮播图控制
         */
        superSlide = {
            slidePic: function () {
                $("#myCarousel").slide({
                    titCell: ".hd ul",
                    mainCell: ".car-inner",
                    autoPage: true,
                    trigger: "click",
                    effect: "left",
                    autoPlay: true,
                    vis: 1
                });
            }
        };
        /*
         * 轮播图右侧数字随之改变
         */
        onchangeNumber = {
            change: function (len) {
                var _focus = $(".hd li");
                var _number = $(".number_control li");
                var i = 0;
                setInterval(function () {
                    for (i = 0; i < len; i++) {
                        if ($(_focus).eq(i).attr("class") == "on") {
                            $(_number).eq(i).addClass("active");
                            $(_number).eq(i).siblings().removeClass("active");
                        }
                    }
                }, 1);
            }
        };
        /*
         * 图片大小调整
         */
        boxPicture = {
            cssSetting: function () {
                $(".box_picture").eq(0).addClass("box_picture_1");
                $(".box_picture").eq(1).addClass("box_picture_2");
                $(".box_picture").eq(2).addClass("box_picture_2");
                $(".box_picture").eq(3).addClass("box_picture_1");
                $(".box_picture").eq(4).addClass("box_picture_1");
                $(".box_picture").eq(5).addClass("box_picture_2");
            }
        };
        //入口方法调用 代码只能从这里执行
        app.indexWrapHandler = function () {
            indexWrap.init();
        }
    })();
});