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

	var SHOPINFOURL = "http://hyu2387760001.my3w.com/shopinfo"; // 店铺详情信息接口
	var SELSTATUSURL = "http://hyu2387760001.my3w.com/order/client/selstatus"; // 查询订单状态及步骤接口
    
    var oInfoObj =$.cookie("dd"); // 得到预订消息
    if(oInfoObj!=null && oInfoObj !="" && oInfoObj !=undefined){
    	oInfoObj = JSON.parse(oInfoObj);
    }else {
    	oInfoObj = {};
    }
    console.log("```````````````````");
    console.log(oInfoObj)
	
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
					console.log(data);
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
				success: function(data) {
					console.log("1111")
					console.log(data);
					$("#JcreateTime").prepend(data.data.order_time);
					$("#Jday1").prepend(data.data.order_time.split(" ")[0]);
					$("#Jtime1").prepend(data.data.order_time.split(" ")[1]);
					$("#Jday2").prepend(data.data.order_time.split(" ")[0]);
					$("#Jtime2").prepend(data.data.order_time.split(" ")[1]);
					$("#Jul").append(wc.spliceorderStatusDataEvent(data.data));
				},error: function(data) {}
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
			// 测试数据 start
//			value.order_status_id = "4";
//			value.reservation_time = "2016-12-28 18:40:32";
			value.order_confirmation_time = "2016-12-27 20:40:32";
//			console.log("`````````````11111`````");
			console.log(value)
			// 测试数据 end
			switch(value.order_status_id){
				case "5":
				case "4":
					vrStr4 += '<li><em></em><p><span id="Jday5" class="date">'+value.order_confirmation_time.split(" ")[0]+'</span>';
					vrStr4 += ' <span id="Jtime5" class="time">'+value.order_confirmation_time.split(" ")[1]+'</span>';
					vrStr4 += ' <span class="detail_text">工长已经在'+value.reservation_time+'当天与用户取得沟通并线下上门量房</span></p>';
					vrStr4 += '<div>工长已经上传预支付单，请立即支付(<a href="reservation.html#/advancelist?pos='+value.order_id+'">朕去看看</a>)</div></li> ';
				case "3":
					vrStr3 += '<li><em></em><p><span id="Jday4" class="date">'+value.order_confirmation_time.split(" ")[0]+'</span>';
					vrStr3 += ' <span id="Jtime4" class="time">'+value.order_confirmation_time.split(" ")[1]+'</span>';
					vrStr3 += ' <span class="detail_text">店铺接受您的预约需求，预约上门时间为 '+value.reservation_time+'</span></p>';
					vrStr3 += '<div>请等待工长上门量房</div></li> ';
				case "1":
					var newTime = getTimeHandler.getTimeEvent(value.order_time,8);
					vrStr1 += '<li><em></em><p><span id="Jday3" class="date">'+value.order_time.split(" ")[0]+'</span>';
					vrStr1 += ' <span id="Jtime3" class="time">'+value.order_time.split(" ")[1]+'</span>';
					vrStr1 += ' <span class="detail_text">预计&nbsp;<i>'+newTime+'</i>&nbsp;前会确定您的预定信息,当前预定状态会在您<a>我的订单</a>中呈现</span></p>';
					vrStr1 += '<div>现在你可以去浏览下我们的虚拟现实来为您的新家做些参考;<a>朕去看看</a></div></li>';
			}
			vrStr = vrStr1 + vrStr3 + vrStr4;
			return vrStr;
		},
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
	}
	//入口方法调用 代码只能从这里执行
	HHIT_WAITCONTACTAPP.controller('waitcontactCtrl', ['$scope', '$http', function($scope, $http) {
		waitcontactWrap.init();
	}]);
})();
