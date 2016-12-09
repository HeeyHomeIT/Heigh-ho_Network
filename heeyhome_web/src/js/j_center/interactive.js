/**
 * 闭包
 * tangj
 */
(function() {

	/**
	 * 需要require的公共方法或组件
	 */
	var HHIT_CENTERAPP = angular.module('heeyhomeApp');

	var USERDATAURL = 'http://hyu2387760001.my3w.com/personal/userinfo'; // 用户个人资料

	/*定义一个类*/
	var centerWrap = {
		/**
		 * 入口方法
		 */
		init: function() {
			centerWrap.initEvent();
		},
		initEvent: function() {
			var self = this;
			/* 获取右侧百科标题*/
			self.initStyleChangeEvent();
			self.initMDataEvent();
			self.initMCollectionEvent();
		},
		/**
		 * 个人中心样式改变事件
		 */
		initStyleChangeEvent: function() {

			HHIT_CENTERAPP.controller('styleCtrl', ['$scope', '$http', function($scope, $http) {
				$('.left_ul li').click(function() {
					$(this).addClass('left_active').siblings().removeClass('left_active');
				});
			}]);
		},
		/*
		 *  个人资料标题切换内容
		 */
		initMDataEvent: function() {
			HHIT_CENTERAPP.controller('mDataCtrl', ['$scope', '$http', function($scope, $http) {
				/* details */
				var $dtDiv = $("#works_content_title div");
				var iSpeed = 0;
				var left = 0;
				var oBg = document.getElementById("title_active");
				for(var i = 0; i < $dtDiv.length - 1; i++) {
					$dtDiv[i].onclick = function() {
						startMoveHandler.startMoveEvent(oBg, this.offsetLeft, iSpeed, left)
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
		initMCollectionEvent: function() {
			HHIT_CENTERAPP.controller('mCollectionCtrl', ['$scope', '$http', function($scope, $http) {
				/* details */
				var $dtDiv = $("#works_content_title div");
				var iSpeed = 0;
				var left = 30;
				var oBg = document.getElementById("title_active");
				for(var i = 0; i < $dtDiv.length - 1; i++) {
					$dtDiv[i].onclick = function() {
						startMoveHandler.startMoveEvent(oBg, this.offsetLeft, iSpeed, left)
						$(".complete_before").hide();
						$(".check_list_wrap").hide();
						$(".collection_shop_wrap").hide();
						$(".works_complete_wrap >div:eq(" + ($(this).index()) + ")").show().removeClass('hide');
					}
				}
			}]);
		}
	};
	startMoveHandler = {
		startMoveEvent: function(obj, iTarget, iSpeed, left) {
			clearInterval(obj.timer);
			obj.timer = setInterval(function() {
				iSpeed += (iTarget - obj.offsetLeft) / 10;
				iSpeed *= 0.7;
				left += iSpeed; //防止小数误差问题
				if(Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) { //距离足够近与速度足够小
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
		getInfoEvent: function() {
			$.ajax({
				url: USERDATAURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				data: {
					user_id: $.base64.decode($.cookie("userId"))
				},
				success: function(data) {
					//console.log(data);
					if(data != null && data.code == '000') {
						$('.personal_tel').html(data.data.userinfo_phone); //获取用户的电话号码
						$('.personal_user_age').val(data.data.userinfo_age); //获取用户的年龄
						$('.personal_user_nickname').val(data.data.userinfo_nickname); //获取用户的昵称
						if(data.data.userinfo_sex == 1) { //判断用户的性别
							$('#man').attr('checked', 'checked');
						} else {
							$('#women').attr('checked', 'checked');
						}
					}
				},
				error: function(data) {}
			});
		}
	};
	/* 上传图片 */
	uploadPictureHandler = {
		uploadAvatar: function() {
			var options = {
				thumbBox: '.thumbBox',
				spinner: '.spinner',
				imgSrc: 'css/img/imgWrap_bg.png'
			};
			var cropper = $('.imageBox').cropbox(options);
			$('#upload-file').on('change', function() {
				var reader = new FileReader();
				reader.onload = function(e) {
					options.imgSrc = e.target.result;
					cropper = $('.imageBox').cropbox(options);
					$('.thumbBox').show().removeClass('hide');
				};
				reader.readAsDataURL(this.files[0]);
				/*this.files = [];*/
			});
			$('#btnCrop').on('click', function() {
				var img = cropper.getDataURL();
				var result_100 = $('.cropped .result_100');
				var result_50 = $('.cropped .result_50');
				result_100.html('');
				result_50.html('');
				result_100.append('<img src="' + img + '" align="absmiddle" style="width:100px;height:100px;margin-top:4px;box-shadow:0 0 12px #7E7E7E;">');
				result_50.append('<img src="' + img + '" align="absmiddle" style="width:50px;height:50px;margin-top:4px;box-shadow:0 0 12px #7E7E7E;" >');
			});
			$('#btnZoomIn').on('click', function() {
				cropper.zoomIn();
			});
			$('#btnZoomOut').on('click', function() {
				cropper.zoomOut();
			});
			$('.imgWrap').hover(function() {
				disabledMouseWheel.append();
			}, function() {
				window.onmousewheel = document.onmousewheel = true;
				document.removeEventListener('DOMMouseScroll', disabledMouseWheel.append1, false);
			});
		}
	};
	/* 禁用滚轮事件 */
var disabledMouseWheel = {
    append: function () {
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', disabledMouseWheel.append1, false);
        }//W3C
        window.onmousewheel = document.onmousewheel = disabledMouseWheel.append1;//IE/Opera/Chrome
    },
    append1: function (evt) {
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