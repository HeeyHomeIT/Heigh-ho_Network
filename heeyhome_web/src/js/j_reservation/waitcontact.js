/**
 * 闭包
 * 开始预订
 * tangj
 */
(function() {

	/**
	 * 需要require的公共方法或组件
	 */
	var HHIT_WAITCONTACTAPP = angular.module('heeyhomeApp');

	var SHOPINFOURL = "http://www.heeyhome.com/api/public/shopinfo"; // 店铺详情信息接口
	var SELSTATUSURL = "http://www.heeyhome.com/api/public/order/client/selstatus"; // 查询订单状态及步骤接口
    
    var oInfoObj =$.cookie("dd"); // 得到预订消息
    if(oInfoObj!=null && oInfoObj !="" && oInfoObj !=undefined){
    	oInfoObj = JSON.parse(oInfoObj);
    }else {
    	oInfoObj = {};
    }
	
	/*定义一个类*/
	var waitcontactWrap = {
		/**
		 * 入口方法
		 */
		init: function() {
			waitcontactWrap.initEvent();
		},
		initEvent: function() {
			var self = this;
			self.initWebDataEvent(); // 页面数据初始化
			self.initOnLoadWebEvent(); //页面进行刷新
			
		},
		/**
		 * 页面数据初始化
		 */
		initWebDataEvent:function(){
			var self = this;
			self.initAppointmentTimeEvent(); // 店铺名字
			self.initWebRefreshEvent(); // 页面刷新判断是否预约完成
		},
		/**
		 * 店铺名字
		 */
		initAppointmentTimeEvent:function(){
			// 填充店铺名字
			$.ajax({
				url: SHOPINFOURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				data: {
					shop_id: oInfoObj.shop_id
				},
				success: function(data) {
					$("#JshopId").prepend(data.data.shop_name);
				},error: function(data) {}
			});
			
		},
		/**
		 * 页面刷新判断是否预约完成 并填充数据
		 */
		initWebRefreshEvent:function(){
			var wc = spliceWaitcontactContHandler;
			$.ajax({
				url: SELSTATUSURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				data: {
					user_id: oInfoObj.user_id,
					order_id:oInfoObj.order_id
				},
				beforeSend:function(){
					$("#Jul").addClass("loagbg");
				},
				success: function(data) {
					$("#JcreateTime").prepend(data.data.order_time);
					$("#Jul").append(wc.spliceorderStatusDataEvent(data.data));
				},complete:function(){
					$("#Jul").removeClass("loagbg");
				},error: function(data) {}
			});
		},
		/**
		 * 页面进行刷新
		 */
		initOnLoadWebEvent:function(){
			var self = this;
			var wc = spliceWaitcontactContHandler;
			$(document).on("click",".change",function(){
				$("#Jul").empty();
				$.ajax({
					url: SELSTATUSURL,
					type: "GET",
					async: true,
					dataType: 'jsonp',
					data: {
						user_id: oInfoObj.user_id,
						order_id:oInfoObj.order_id
					},
					beforeSend:function(){
						$("#Jul").addClass("loagbg");
					},
					success: function(data) {
						$("#Jul").append(wc.spliceorderStatusDataEvent(data.data));
					},complete:function(){
						$("#Jul").removeClass("loagbg");
					},error: function(data) {}
				});
			});
		}
	};
	/**
	 * 拼接内容
	 */
	spliceWaitcontactContHandler = {
		/**
		 * 预约的人员 - 工长
		 * @param {Object} value 对象
		 */
		spliceorderStatusDataEvent: function(value) {
			var vrStr = '';
			var vrStr1 = '';
			var vrStr3 = '';
			var vrStr4 = '';
			var vrStr7 = '';
			var vrStr8 = '';
			console.log(value);
			// 测试数据 start
			// 测试数据 end
			switch(value.order_status_id){
				case "8":
					vrStr8 += '<li class="detail_active"><em></em><p><span id="Jday8" class="date">'+value.order_status_time[8].split(" ")[0]+'</span>';
					vrStr8 += ' <span id="Jtime8" class="time">'+value.order_status_time[8].split(" ")[1]+'</span>';
					vrStr8 += ' <span class="detail_text">店小二已取消本次订单了</span></p>';
					vrStr8 += '<div>快去和店小二沟通一下吧;</div></li> ';
					break;
				case "7":
					vrStr7 += '<li class="detail_active"><em></em><p><span id="Jday7" class="date">'+value.order_status_time[7].split(" ")[0]+'</span>';
					vrStr7 += ' <span id="Jtime7" class="time">'+value.order_status_time[7].split(" ")[1]+'</span>';
					vrStr7 += ' <span class="detail_text">订单已经取消</span></p>';
					vrStr7 += '<div>快去和店小二沟通一下吧;</div></li> ';
                    break;
				case "4":
					vrStr4 += '<li class="detail_active"><em></em><p><span id="Jday5" class="date">'+value.order_status_time[4].split(" ")[0]+'</span>';
					vrStr4 += ' <span id="Jtime5" class="time">'+value.order_status_time[4].split(" ")[1]+'</span>';
					vrStr4 += ' <span class="detail_text">工长已经上传预支付单，请立即支付(<a href="reservation.html#/advancelist?pos='+value.order_id+'">去看看</a>)</span></p>';
					vrStr4 += '</li> ';
                    break;
				case "3":
					vrStr3 += '<li class="'+(value.order_status_id != 3?'detail_active':'')+'"><em></em><p><span id="Jday4" class="date">'+value.order_status_time[3].split(" ")[0]+'</span>';
					vrStr3 += ' <span id="Jtime4" class="time">'+value.order_status_time[3].split(" ")[1]+'</span>';
					vrStr3 += ' <span class="detail_text">店铺接受您的预约需求，预约上门时间为 '+value.reservation_time+'</span></p>';
					vrStr3 += '<div>请等待工长上门量房</div></li> ';
                    break;
				case "1":
					var newTime = getTimeHandler.getTimeEvent(value.order_time,8);
					vrStr1 += '<li class="detail_active"><em></em><p><span id="Jday1" class="date">'+value.order_time.split(" ")[0]+'</span><span id="Jtime1" class="time">'+value.order_time.split(" ")[1]+'</span><span class="detail_text">您的需求已提交给店小二</span>';
					vrStr1 += '</p></li><li class="'+(value.order_status_id != 1?'detail_active':'')+'"><em></em><p><span id="Jday2" class="date">'+value.order_time.split(" ")[0]+'</span><span id="Jtime2" class="time">'+value.order_time.split(" ")[1]+'</span><span class="detail_text">店小二正在确认您的预约需求并会联系您，请您耐心等待</span></p>';
					vrStr1 += '<div><span class="detail_text">预计&nbsp;<i>'+newTime+'</i>&nbsp;前会确定您的预定信息,当前预定信息会在<a href="center.html#/center/morder" target="_blank" >我的订单</a>中呈现;</span>';
					vrStr1 += '你可以去浏览下我们的虚拟现实来为您的新家做些参考;<a href="index.html#/panorama" target="_blank">去看看</a></div></li>';
			}
			if(value.order_status_id == 1){
				vrStr = vrStr1;
			}else if(value.order_status_id == 3){
				vrStr = vrStr1 + vrStr3;
			}else if(value.order_status_id == 4){
				vrStr = vrStr1 + vrStr3 + vrStr4;
				$(".three_process").addClass("contact_active");
			}else if(value.order_status_id == 7){
				vrStr = vrStr1 + vrStr7;
				$(".three_process").addClass("contact_active");
				$(".three_process").find("span").html("接单失败");
			}else if(value.order_status_id == 8){
				vrStr = vrStr1 +vrStr8;
				$(".three_process").addClass("contact_active");
				$(".three_process").find("span").html("接单失败");
			}else{
				window.location.href = "reservation.html#/advancelist?pos="+value.order_id;
			}
			
			return vrStr;
		}
	};
	/**
	 * 日期转化
	 */
	getTimeHandler = {
		/**
		 * 日期加多少小时
		 * @param {Object} time 当前时间
		 * @param {Object} item 需要加的时间
		 */
		getTimeEvent:function(time,item){
			date = time.substring(0,19);    
			date = date.replace(/-/g,'/'); 
			var timestamp = new Date(date).getTime();
			var itemTimestamp = item*60*1000*60;
			var newTime = new Date(parseInt(timestamp+itemTimestamp)).toLocaleString().replace(/\//g, "-");
			return newTime;
		}
	};
	//入口方法调用 代码只能从这里执行
	HHIT_WAITCONTACTAPP.controller('waitcontactCtrl', ['$scope', '$http', function($scope, $http) {
		waitcontactWrap.init();
	}]);
})();
