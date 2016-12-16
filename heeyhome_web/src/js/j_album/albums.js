/**
 * 图集相册
 */
/**
 * 闭包
 * ckk
 */
(function(){
	
	
	
	/* 定义一个类  */
	var foremanAlbum = {
		/*
		 * 入口方法
		 */
		init : function() {
			foremanAlbum.initEvent();
		},
		initEvent : function() {
			var self = this;
			self.clickEvent(); //各种点击事件
			self.otherEvent(); //其他一些事件
		},
		/*
		 * 点击切换图片
		 */
		clickEvent : function() {
			if(!$(".gallery_demo_unstyled li:first").siblings().hasClass("actives")) { //默认标签active
				$(".gallery_demo_unstyled li:first").addClass("actives");
			};
			$(".gallery_demo_unstyled").children("li").each(function(a) { //标签active切换
		        $(this).on("click",function() {
		            controlPicture.changePic(1, (a + 1));
		        });
		    });
		    $(".maxBtn-l").on("click",function() { //点击左箭头切换图片
		        controlPicture.changePic(0);
		    });
		    $(".maxBtn-r").on("click",function() { //点击右箭头切换图片
		        controlPicture.changePic(1);
		    });
		    $(".PicBtn-left").on("click",function() { //向左标签切换图片
		        controlPicture.changePic(0);
		    });
		    $(".PicBtn-right").on("click",function() { //向右标签切换图片
		        controlPicture.changePic(1);
		    });
		    $(".indexbody-left").on("click",function() { //点击左半部分切换图片
		        controlPicture.changePic(0);
		    });
		    $(".indexbody-right").on("click",function() { //点击右半部分切换图片
		        controlPicture.changePic(1);
		    });
		    $("#showOriginal").on("click",function() { //查看原图的点击事件
		    	showOriginal.picture();
		    });
		    $(".information").on({
		    	mouseover : function() { //信息出现
		    		picInformation.showCnt();
		    	},
		    	mouseout : function() { //信息消失
		    		picInformation.hideCnt();
		    	}
		    });
		    $(".download").on("click",function() { //下载的点击事件
		    	picDownload.jsEvent();
		    });
		},
		/*
		 * 其他事件
		 */
		otherEvent : function() {
			var curPicPos = controlPicture.selectByurl();
			if (curPicPos) {
			    selectKey = curPicPos;
			}
			if (parseInt(selectKey) > 1) {
			    controlPicture.changePic(1, parseInt(selectKey), 1);
			} else {
				controlPicture.checkAndLoadImg($("#mainPic").attr("src"), document.getElementById("mainPic"));
			}
			controlPicture.turnPageOnkeyDown(); //键盘切换图片
		}
	};
	/*
	 * 控制图片
	 */
	controlPicture = {
		getPage: 1,
	    curPic: selectKey,
	    moveTimer: "",
	    loadAllThumb: false,
	    playTime: 10000,
	    playState: true,
	    isPlaying: false,
	    changeList: function(f, c) {
	        var b = this.getPage;
	        var d = picList.length;
	        if (d > 6) {
	            var e = 111;
	            b = parseInt(b);
	            if (typeof(c) != "undefined") {
	                b = parseInt(c);
	                if (b < 1) {
	                    b = 1;
	                }
	                if (b > d - 5) {
	                    b = d - 5;
	                }
	            } else {
	                if ("1" == f) {
	                    b = b + 3;
	                    if (b > (d - 5)) {
	                        b = d - 5;
	                    }
	                } else {
	                    b = b - 3;
	                    if (b < 1) {
	                        b = 1;
	                    }
	                }
	            }
	            this.getPage = b;
	            var a = (b - 1) * e;
	            $(".gallery_demo_unstyled").animate({
	                left: -a
	            },
	            {
	                queue: false
	            });
	            if (this.curPic > 5 || b > 3) {
	                this.loadThumbPic();
	            }
	        }
	    },
	    changePic: function(f, a, c) { //切换图片
	        var h = this.curPic;
	        var e = picList.length;
	        if (picList) {
	            if (typeof(a) != "undefined") {
	                h = parseInt(a);
	                if (h < 1) {
	                    h = 1;
	                }
	                if (h > e) {
	                    h = e;
	                }
	            } 
	            else {
	                if ("1" == f) {
	                    h = parseInt(h) + 1;
	                    if (h > e) {
	                        var b = $("#nextUrl").attr("href");
	                        if ("" != b) {
	                            errorRemind.divTips("当前已是最后一张图片");
	                            return;
	                        }
//							else{
//									alert("�Ѿ�û���ˣ�");
//									return false;
//								}
	                    }
	                } else {
	                    h = parseInt(h) - 1;
	                    if (h < 1) {
	                        var g = $("#prevUrl").attr("href");
	                        if ("" != g) {
	                            errorRemind.divTips("当前已是第一张图片");
	                            return;
	                        }
//							else{
//									alert("�Ѿ�û���ˣ�");
//									return false;
//								}
	                    }
	                }
	            }
	            this.checkAndLoadImg(picList[h - 1].bigPic, document.getElementById("mainPic"));
	            $("#showOriginal").attr("href", picList[h - 1].originalPic);
	            $(".gallery_demo_unstyled").children("li").each(function() {
	                $(this).attr("class", "");
	            });
	            $("#tu_" + h).attr("class", "actives");
	            this.curPic = h;
	            this.changeURl(h);
	            this.preLoad(h);
	            this.changeList(1, h - 2);
	            $("#viewNum").html(h);
	            this.playTime = 6000;
	        }
	    },
	    preLoad: function(a) {
	        controlPicture.superPreLoadImage(picList, parseInt(a));
	    },
	    turnPageOnkeyDown: function() {
	        $(document).keydown(function(a) {
	            if (a.keyCode == 37) {
	                controlPicture.changePic(0);
	            }
	            if (a.keyCode == 39) {
	                controlPicture.changePic(1);
	            }
	        })
	    },
	    loadThumbPic: function() {
	        var e = parseInt(this.getPage) - 1 + 6;
	        var b = parseInt(this.getPage);
	        var f = 3;
	        var a = 0;
	        while (f && typeof picList[b + a - 1] != "undefined") {
	            if (typeof($("#tu_" + (b + a)).find("img").attr("name")) != "undefined") {
	                var d = picList[b + a - 1].thumbPic;
	                if ($("#tu_" + (b + a)).find("img").attr("name") != $("#tu_" + (b + a)).find("img").attr("src")) {
	                    controlPicture.checkAndLoadImg(d, document.getElementById("tu_" + (b + a)).getElementsByTagName("img")[0], 1)
	                }
	                var c = new Image();
	                c.src = d;
	                a++;
	                if (!c.complete) {
	                    if (b + a > e) {
	                        f--;
	                    }
	                }
	            } else {
	                a++;
	            }
	        }
	    },
	    checkAndLoadImg: function(e, d, c, a) {
	        var b = new Image();
	        b.src = e;
	        var f = c ? "image/grey1.gif": "image/loading2.gif";
	        if (b.complete) {
	            $(d).addClass("display");
	            d.src = e;
	            $(d).fadeIn("normal");
	            if (!c) {
	                
	            }
	        } else {
	            d.src = f;
	            $(b).load(function() {
	                $(d).addClass("display");
	                d.src = e;
	                $(d).fadeIn("normal");
	                if (!c) {
	                   
	                }
	            })
	        }
	        return true
	    },
	    superPreLoadImage: function(d, c) {
	        var e = 2;
	        var a = 0;
	        while (e && typeof d[c + a] != "undefined") {
	            var b = new Image();
	            b.src = d[c + a].bigPic;
	            if (b.complete) {
	                a++
	            } else {
	                a++;
	                e--;
	            }
	        }
	    },
	    selectByurl: function() {
	        var b = window.location.href;
	        var a = b.split("#");
	        if (typeof(a[1]) != "undefined") {
	            var c = a[1].split("=");
	            if (typeof(c[1]) != "undefined") {
	                if (c[1]) {
	                    if (c[1] < 1 || c[1] > picList.length) {
	                        c[1] = 1;
	                    }
	                    return c[1];
	                }
	            }
	        }
	        return 0
	    },
	    changeURl: function(a) {
	        if (a) {
	            location.hash = "#pn=" + a;
	        }
	    }
	};
	/*
	 * 查看原图
	*/
	showOriginal = {
		picture : function() {
			var href = $(".maxPicBox img").attr("src");
			$("#showOriginal").attr("href",href);
		}
	};
	/*
	 * 信息的hover效果
	*/
	picInformation = {
		showCnt : function() {
			var wid = $(".maxPicBox img").width();
			var hgt = $(".maxPicBox img").height();
			$("#show_news .s_width").html(wid);
			$("#show_news .s_height").html(hgt);
			$("#show_news").removeClass("display");
		},
		hideCnt : function() {
			$("#show_news").addClass("display");
		}
	};
	/*
	 * @param {Object} msg 错误提示文字
	 * 无法切换图片的提示框
	*/
	errorRemind = {
		divTips : function(msg) {
			$(".demo .tips").removeClass("display");
			$(".demo .tips span").html(msg);
			var appear = setTimeout(function() {
				$(".demo .tips").addClass("display");
			},1500);
		}
	};
	/*
	 * 下载当前图片
	*/
	picDownload = {
		jsEvent : function () {
			var href = $(".maxPicBox img").attr("src");
			var src = window.location.href;
			var a = $("<a></a>").attr("href", src).attr("download", href).appendTo("body");
			a[0].click();
    		a.remove();
		}
	}
	/* 入口方法调用 */
	foremanAlbum.init();
})();
