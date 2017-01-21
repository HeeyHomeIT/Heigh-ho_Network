/**
 * 闭包
 * 店铺详情
 * tangj
 */
(function() {

	/**
	 * 需要require的公共方法或组件
	 */
	var HHIT_SUCCESSCASEAPP = angular.module('heeyhomeApp');

	var SUCCESSURL = "http://www.heeyhome.com/api/public/myworkcase"; // 显示工长添加的案例列表信息接口

	/*定义一个类*/
	var successCaseWrap = {
		/**
		 * 入口方法
		 */
		init: function() {
			successCaseWrap.initEvent();
		},
		initEvent: function() {
			var self = this;
			var gzId = getUrlParamHandler.getUrlParam('pos');
			var gzName = getUrlParamHandler.getUrlCnParam('sn');
			var gzshoperId = getUrlParamHandler.getUrlParam('si');
			$("#Jgz").val(gzId);
			$(".sname").html(gzName);
			$(".sname").attr("href","view_shop.html#/shopdetails?pos="+gzshoperId)
			
			/* 页面工人初始化数据*/
			self.initSuccessCaseDataEvent();

		},
		/**
		 * 页面成功案例初始化数据
		 */
		initSuccessCaseDataEvent: function() {
			var sc = spliceSuccessContHandler;
			var shopperId = $("#Jgz").val();
			var $dtDiv = $(".sc_title .titlename");
			$.ajax({
				url: SUCCESSURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				data: {
					foreman_id: shopperId
				},
				beforeSend: function() {
					$(".sc_contents").addClass("loagbg");
				},
				complete: function() {
					$(".sc_contents").removeClass("loagbg");
				}
			}).done(function(data) {
				if(data.code == 000) {
					var iSpeed = 0;
					var left = 0;
					var oBg = document.getElementById("title_active");
					$(".sc_contents ul").html(sc.spliceCgInfoEvent(data.data, [1, 2]));
					$(document).on("click", ".sc_title .titlename", function() {
						startMoveHandler.startMoveEvent(oBg, this.offsetLeft, iSpeed, left);
						if($(this).index() == 0) {
							var str = sc.spliceCgInfoEvent(data.data, [1, 2]);
							if(str != null && str != "") {
								$(".sc_contents ul").html(str);
							} else {
								$(".sc_contents ul").html('<div class="nullpage"><i>&nbsp;</i><span>空空如也~</span></div>');
							}
						} else {
							var str = sc.spliceCgInfoEvent(data.data, [3, 3]);
							if(str != null && str != "") {
								$(".sc_contents ul").html(str);
							} else {
								$(".sc_contents ul").html('<div class="nullpage"><i>&nbsp;</i><span>空空如也~</span></div>');
							}
						}
					});
					successInfo.caseDetail();
				} else {
					$(".main_content").html('<div class="nullpage"><i>&nbsp;</i><span>空空如也~</span></div>');
				}

			});
		}

	};

	getUrlParamHandler = {
		/**
		 * 获取url中的参数
		 * @param {Object} name
		 */
		getUrlParam: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.hash.split("?")[1].match(reg); //匹配目标参数
			console.log(r[2])
			if(r != null) return unescape(r[2]);
			return null; //返回参数值
		},
		/**
		 * 获取url中的中文参数
		 * @param {Object} name
		 */
		getUrlCnParam: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.hash.split("?")[1].match(reg); //匹配目标参数
			console.log(r[2])
			if(r != null) return decodeURI(r[2]);
			return null; //返回参数值
		}
	};
	/* 进入成功案例详情页 */
	successInfo = {
		caseDetail: function() {
			$(document).on("click", ".product-3 .image", function() {
				var type = $(this).attr("data-type");
				var id = $(this).attr("data-id");
				if(type == 1) {
					sessionStorage.setItem("case_id", id);
					window.location.href = "success_case.html#/success/success_case";
				} else {
					sessionStorage.setItem("orderid", id);
					window.location.href = "order_detail.html#/morder_wrap/morder_detail";
				}
			});
		}
	};
	/* div移动撞击事件 */
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
	/**
	 * 拼接内容
	 */
	spliceSuccessContHandler = {
		/**
		 * 成功案例
		 * @param {Object} value 对象
		 * @param {Object} arr 数组 1:入驻之前的作品 2：已完成的订单作品 3:未完成的订单作品
		 */
		spliceCgInfoEvent: function(value, arr) {
			var vrStr = '';
			console.log(value)
			$.each(value, function(i, v) {
				if(v.img.length != 0) {
					if(v.type == arr[0] || v.type == arr[1]) {
						vrStr += '<li><div class="image" data-type="' + v.type + '" data-id="' + v.case_id + '"><a href="javascript:void(0)"><img src="http://www.heeyhome.com/' + v.img[0].case_img + '"></a>';
						vrStr += '<div class="image_title"><div class="roomtype">' + v.housetype + '</div><div class="roomicon"><em class="sprite-image sc_icon_love"></em><span>' + v.like_num + '</span></div>';
						vrStr += '<div class="roomicon"><em class="sprite-image sc_icon_look"></em><span>' + v.scan_num + '</span></div></div></div>';
						vrStr += '<div class="introduce"><strong>' + v.style + '&nbsp;' + v.area + 'm<sup>2</sup></strong>';
						vrStr += '<div class="introduce-icon"><em class="sprite-image sc_icon_address"></em><span>' + v.address + '</span></div>';
						vrStr += '<div class="introduce-icon"><em class="sprite-image sc_icon_time"></em><span>' + v.timelong + '</span></div></div></li>';
					}

				}
			});
			return vrStr;
		},
	};


	//入口方法调用 代码只能从这里执行
	HHIT_SUCCESSCASEAPP.controller('successcaseCtrl', ['$scope', '$http', function($scope, $http) {
		successCaseWrap.init();
	}]);
})();