/**
 * 闭包
 * 开始预订
 * tangj
 */
(function() {

	/**
	 * 需要require的公共方法或组件
	 */
	var HHIT_RESERVATIONAPP = angular.module('heeyhomeApp');

	var FOREMANINFOURL = "http://hyu2387760001.my3w.com/personal/foremaninfo"; // 工长信息接口
	var PORTRAITURL = "http://hyu2387760001.my3w.com/personal/portrait"; // 读取用户头像接口
	var READURL = 'http://hyu2387760001.my3w.com/personal/drive_address'; // 读取收货地址信息接口
	var ADDURL = 'http://hyu2387760001.my3w.com/personal/drive_address/add'; // 添加收货地址接口
	var CALRESULTURL = 'http://hyu2387760001.my3w.com/costcalculator/result/get'; // 获取收藏的成本计算器结果接口
	var PRODUCEURL = 'http://hyu2387760001.my3w.com/order/client/produce'; // 预约订单接口
	var WORKERURL = 'http://hyu2387760001.my3w.com/myworkers/workerinfo'; // 工人详细信息接口
	
    var PHONEREG = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/; // 验证手机号正则表达式
    
	// 错误提示文字
	var MSG1 = "手机号不能为空";
	var MSG2 = "请输入有效的手机号码";
	var MSG3 = "收货人姓名不能为空";
	var MSG4 = "邮政编码不能为空";
	var MSG5 = "详细地址不能为空";
	var MSG6 = "预约时间不能为空";
	var MSG7 = "最多只能预约四条上门时间";
	
	var ONEKEY = "onekey";
	var CHOOSE = "choose";
	
	var rtList = JSON.parse(sessionStorage.getItem("rt_list"));
	var UID = $.cookie("userId"); // 得到userid
    if(UID!=null && UID !="" && UID !=undefined){
    	UID = $.base64.decode(UID);
    }else {
    	UID = "";
    }
    
	var TYPE = getUrlParam('type'); //标志：1：一键预约   2：选工人预约
//	alert(type)
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.hash.split("?")[1].match(reg); //匹配目标参数
		if(r != null) return unescape(r[2]);
		return null; //返回参数值
	}
	
	/*定义一个类*/
	var reservationWrap = {
		/**
		 * 入口方法
		 */
		init: function() {
			reservationWrap.initEvent();
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
			self.initReservePersonInfoEvent(); // 预约人员
			self.initHomeAddressInfoEvent(); // 上门地址
			self.initCalResultInfoEvent(); // 我的计算结果
			self.initHomeTimeInfoEvent(); // 上门事件
			self.initCalChangeInfoEvent(); // 计算结果切换
			self.initAddressBoxEvent(); // 添加地址事件和关闭地址事件
			self.initHomeAddressChangeEvent(); // 上门地址切换
			self.initPlaceOrderEvent(); // 提交订单
			/* 展开工种价格明细*/
            self.initSpriceListEvent();
		},
		/**
		 * 预约人员
		 */
		initReservePersonInfoEvent:function(){
			var rc = spliceReservationContHandler;
			var imgUrl = ""; // 用户头像
			console.log(rtList);
			if(rtList.mark == ONEKEY && TYPE == "1"){
				$.ajax({
					url: PORTRAITURL,
					type: "GET",
					async: true,
					dataType: 'jsonp',
					data: {
						user_id: rtList.gz
					}
				}).done(function(data){
					if(data.code == 000){
						imgUrl = data.data.user_img;
						$.ajax({
							url: FOREMANINFOURL,
							type: "GET",
							async: true,
							dataType: 'jsonp',
							data: {
								foreman_id: rtList.gz
							}
						}).done(function(data){
							if(data.code == 000){
								$(".cards").append(rc.splicePersonDataEvent(imgUrl,data.data));
						 		$(".explain").html("尊敬的用户，您选择了<span class='col_eec988'>一键预约</span>装修，接下来将有工长全权负责您家房子的装修任务");
							}
						});
					}
					
				});
				
			}else if(rtList.mark == CHOOSE && TYPE == "2"){
				$.each(rtList.worker, function(i,v) {
					$.ajax({
						url: WORKERURL,
						type: "GET",
						async: true,
						dataType: 'jsonp',
						jsonp:'callback',
						data: {
							cate_id:v.ntype,
							worker_id:v.nid
						}
					}).done(function(data){
						$(".cards").append(rc.spliceWorkerDataEvent(v.ntype,data.data));
						$(".explain").html("尊敬的用户，您选择了<span class='col_eec988'>自己选工人</span>装修，接下来工长会根据您的需求来负责您家房子的装修任务")
					});
				});
				
			}
			
		},
		/**
		 * 上门地址
		 */
		initHomeAddressInfoEvent:function(){
			CRUDInfoHandler.queryInfoEvent();
		},
		/**
		 * 添加地址框相关事件
		 */
		initAddressBoxEvent:function(){
			var $address = $("#addaddress");
			// 打开添加地址框
			$(document).on("click",".user_new_address",function(){ 
				$('.address_content').distpicker('reset',true); // 城市联动初始化
				$address.removeClass("display");
			});
			// 关闭添加地址框
			$(document).on("click",".Jclose",function(){ 
				initInputDataHandler.inputDataEvent(); // input框初始化
				$address.addClass("display");
			});
			// 添加地址框中input框点击事件
			$(document).on("click",".add_address_wrap input[type='text']",function(){ 
				$(this).siblings("label.error").removeClass("whether");
				$(this).addClass("border_eec988").removeClass("border_ff5704").closest("div.address_cont_line").siblings().find("input[type='text']").removeClass("border_eec988");
			});
			// 添加地址框中保存按钮点击事件
			$(document).on("click",".saveaddBtn",function(){
				var addAddressObj = {}; // 要保存的新地址对象
				addAddressObj.userId = UID; // 用户id
				addAddressObj.receiver = $("#receiver").val(); // 收货人
				addAddressObj.province = $("#sr_province").val(); // 省份
				addAddressObj.city = $("#sr_city").val(); // 城市
				addAddressObj.district = $("#sr_district").val(); // 区
				addAddressObj.street = ""; // 街道 暂时没有所以用空字符串代替
				addAddressObj.address = $("#alladdress").val(); // 详细地址
				addAddressObj.zipcode = $("#zipcode").val(); //邮政编码
				addAddressObj.mobile = $("#mobile").val(); //联系电话
				if($(".i-chk").is(':checked')) { //是否默认地址 1:默认地址 2:非默认地址
					addAddressObj.is_default = "1";
				}else{
					addAddressObj.is_default = "2";
				}
				console.log(addAddressObj);
				//相关验证
				if(infoVerificationHandler.verificationEvent(addAddressObj)){
					CRUDInfoHandler.insertInfoEvent(addAddressObj);
				}
			});
		},
		/**
		 * 计算结果
		 */
		initCalResultInfoEvent:function(){
			var rc = spliceReservationContHandler;
			$.ajax({
				url: CALRESULTURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				data: {
					user_id: UID
				},
				success: function(data) {
					if(data.code == 000){
						$(".Jcal").html(rc.spliceCalRresultDataEvent(data.data.calculator_data));
						$("#Jarea").prepend(data.data.calculator_data[0].area);
					 	$("#Jroom").prepend(data.data.calculator_data[0].room);
					 	$("#Jparlour").prepend(data.data.calculator_data[0].parlour);
					 	$("#Jtoilet").prepend(data.data.calculator_data[0].toilet);
					 	$("#Jbalcony").prepend(data.data.calculator_data[0].balcony);
					 	$("#Jzxzj").prepend(parseFloat(data.data.calculator_data[0].zxzj).toFixed(2));
					 	$("#c").val(data.data.calculator_data[0].calculator_results_id);
					}else{
						$(".Jcal").html('<div class="nullpage"><i>&nbsp;</i><span>你还没收藏计算结果哦，快<a target="_blank" href="index.html#/cal">去看看</a>你家装修需要多少钱吧！~</span></div>');
						$("#Jarea").prepend("-");
					 	$("#Jroom").prepend("-");
					 	$("#Jparlour").prepend("-");
					 	$("#Jtoilet").prepend("-");
					 	$("#Jbalcony").prepend("-");
					 	$("#Jzxzj").prepend("-");
					}
					
				},error: function(data) {}
			});
		},
		/**
		 * 计算结果切换
		 */
		initCalChangeInfoEvent:function(){
			$(document).on("click",".confirm_info_detail",function(){
				var cId = $(this).data("cid");
				$.ajax({
					url: CALRESULTURL,
					type: "GET",
					async: true,
					dataType: 'jsonp',
					data: {
						user_id: UID,
						calculator_results_id:cId
					},
					success: function(data) {
						$("#Jarea").empty().prepend(data.data.area);
					 	$("#Jroom").empty().prepend(data.data.room);
					 	$("#Jparlour").empty().prepend(data.data.parlour);
					 	$("#Jtoilet").empty().prepend(data.data.toilet);
					 	$("#Jbalcony").empty().prepend(data.data.balcony);
					 	$("#Jzxzj").empty().prepend(parseFloat(data.data.zxzj).toFixed(2));
					 	$("#c").val(data.data.calculator_results_id);
					},error: function(data) {}
				});
				$(this).siblings().find("div.info_detail_triangle").addClass("display");
				$(this).siblings().find("div.info_detail_top").removeClass("b_eec988");
				$(this).siblings().find("div.info_detail_bottom").removeClass("bg_eec988");
				$(this).siblings().find(".area_structure span").removeClass("col_eec988");
				$(this).find("div.info_detail_triangle").removeClass("display");
				$(this).find("div.info_detail_top").addClass("b_eec988");
				$(this).find("div.info_detail_bottom").addClass("bg_eec988");
				$(this).find(".area_structure span").addClass("col_eec988");
			});
		},
		/**
		 * 上门时间
		 */
		initHomeTimeInfoEvent:function(){
			var rc = spliceReservationContHandler;
			$(document).on("click","#JHomeTime",function(){
				// 日历控件
				laydate({
				elem: '#JHomeTime',
				min: laydate.now(), //开始日期
				format: 'YYYY年MM月DD日', //日期格式
				});
			});
			
			//点击添加预约时间
			$(document).on("click",".addtime",function(){
				var homeTime = $("#JHomeTime").val();
				var num = $(".appointment_time_wrap").children("div").length;
				if(homeTime!=null&&homeTime!=""){
					if(num<4){
						var time = {};
						time.year = homeTime.split("年")[0]; // 年
						time.month = homeTime.split("年")[1].split("月")[0]; // 月
						time.day = homeTime.split("年")[1].split("月")[1].split("日")[0]; // 日
						$(".appointment_time_wrap").append(rc.spliceHomeTimeDataEvent(time));
						$(".Jspan1").text(parseInt(num)+1);
						$(".Jspan2").text(3-parseInt(num));
					}else{
						infoVerificationHandler.errorContent(MSG7,$("#JHomeTime"));
					}
				}else{ // 如果input框中为空，显示错误信息
					infoVerificationHandler.errorContent(MSG6,$("#JHomeTime"));
				}
				
			});
			// 添加预约时间框中input框点击事件
			$(document).on("click",".laydate-icon ",function(){ 
				$(this).siblings("label.error").removeClass("whether");
				$(this).removeClass("border_ff5704");
			});
			// 点击删除预约时间
			$(document).on("click",".iconfont",function(){ 
				$(this).parent(".appointment_time").remove();
				var num = $(".appointment_time_wrap").children("div").length;
				$(".Jspan1").text(parseInt(num));
				$(".Jspan2").text(4-parseInt(num));
			});
		},
		/**
		 * 上门地址切换
		 */
		initHomeAddressChangeEvent:function(){
			$(document).on("click",".door_content_detail",function(){ 
				$(this).addClass("on").siblings().removeClass("on");
				$("#d").val($(this).data("dz"));
			});
		},
		/**
		 * 提交订单
		 */
		initPlaceOrderEvent:function(){
			$(document).on("click",".start_submit",function(){
				var userId = UID; // 用户ID
				var shopId = rtList.dp; // 店铺ID
				var addressId = $("#d").val(); // 地址ID
				var cId = $("#c").val(); // 计算结果ID
				var tArr = [],wArr = [];
				var tObj = {},wObj = {};
				$.each($(".appointment_time_wrap .appointment_time"),function(i,v){
					tArr.push($(v).data("t"));
				});
				$.each(tArr, function(i,v) {
					tObj[i]=v;
				});
				if(rtList.mark == ONEKEY && TYPE == "1"){
					wArr.push(rtList.gz);
					$.each(wArr, function(i,v) {
						wObj[i]=v;
					});
				}else if(rtList.mark == CHOOSE && TYPE == "2"){
					$.each(rtList.worker, function(i,v) {
						wObj[i]=v.nid;
					});
				}
				if(addressId ==null || addressId ==""){
					layer.msg('地址不能不选哦~');
					return;
				}
				if(cId == null || cId == ""){
					layer.msg('计算结果不能不选哦~');
					return;
				}
				if(tArr.length == 0){
					layer.msg('上门时间不能不选哦~');
					return;
				}
				
				$.ajax({
					url: PRODUCEURL,
					type: "GET",
					async: true,
					dataType: 'jsonp',
					data: {
						user_id: userId,
						shop_id: shopId,
						address_id: addressId,
						calculator_result_id: cId,
						time: JSON.stringify(tObj),
						worker: JSON.stringify(wObj)
					},
					success: function(data) {
						console.log(data);
						var oInfoObj = {};
						oInfoObj = data.data;
						$.cookie("dd", JSON.stringify(oInfoObj), {expires: 1, path: '/'});
						var url = "reservation.html#/waitcontact"; 
						window.location.href = url + "?type=1";
					},error: function(data) {
					}
				});
						
			});
		},
		/**
         * 展开工种价格明细
         */
        initSpriceListEvent: function () {
            $(document).on("click", ".door_address .btndown", function () {
                if ($(this).hasClass("pickdowm")) {
                	$(this).find("span").text("展开");
                    $(this).removeClass("pickdowm").siblings(".door_address_content").addClass("autoheight");
                    
                } else {
                	$(this).find("span").text("收起");
                    $(this).addClass("pickdowm").siblings(".door_address_content").removeClass("autoheight");
                }
            });
            $(document).on("click", ".confirm_appointment_info .btndown", function () {
                if ($(this).hasClass("pickdowm")) {
                	$(this).find("span").text("展开");
                    $(this).removeClass("pickdowm").siblings(".confirm_info_content ").addClass("autoheight");
                    
                } else {
                	$(this).find("span").text("收起");
                    $(this).addClass("pickdowm").siblings(".confirm_info_content ").removeClass("autoheight");
                }
            });
        }
	};
	/**
	 * 拼接内容
	 */
	spliceReservationContHandler = {
		/**
		 * 预约的人员 - 工长
		 * @param {Object} imgurl 用户头像
		 * @param {Object} value 对象
		 */
		splicePersonDataEvent: function(imgurl,value) {
			var vrStr = '<div class="card avatar"><img src="http://hyu2387760001.my3w.com/' + imgurl + '"><h1>'+value.foremaninfo_realname+'</h1>';
				vrStr += '<span>'+((value.loc_city!=null &&value.loc_city!="")?value.loc_city:'中国')+' | '+value.foremaninfo_phone+' | '+((value.worktime!=null &&value.worktime!="")?value.worktime:'0')+'年</span><div class="corner"><div class="corner_logo"><a><img src="css/img/icon-sdg.png"></a></div>';
				vrStr += '<span class="corner_text">工长</span></div></div>';
			return vrStr;
		},
		/**
		 * 预约的人员 - 工人
		 * @param {Object} ntype 工人类型  1：杂工 2：水电工 3：瓦工 4：木工 5：油漆工
		 * @param {Object} value 对象
		 */
		spliceWorkerDataEvent:function(ntype,value){
			var vrStr = '<div class="card avatar"><img src="http://hyu2387760001.my3w.com/' + value.portrait_img + '"><h1>'+value.name+'</h1>';
			vrStr += '<span>'+value.birthplace+' | '+value.phone+' | '+value.worktime+'年</span><div class="corner"><div class="corner_logo"><a><img src="css/img/icon-sdg.png"></a></div>';
			switch(ntype){
				case 1:
				 	vrStr += '<span class="corner_text">杂工</span></div></div>';
				  	break;
				case 2:
					vrStr += '<span class="corner_text">水电工</span></div></div>';
				  	break;
				case 3:
				  	vrStr += '<span class="corner_text">瓦工</span></div></div>';
				 	break;
				case 4:
				  	vrStr += '<span class="corner_text">木工</span></div></div>';
				  	break;
				case 5:
				  	vrStr += '<span class="corner_text">油漆工</span></div></div>';
				  	break;
			}
			return vrStr;
		},
		/**
		 * 选择上门地址
		 * @param {Object} value 对象
		 */
		spliceAddressDataEvent: function(value) {
			var vrStr = '<div class="door_address_content autoheight clearfix">';
			$.each(value, function(i, v) {
				vrStr += '<div class="door_content_detail '+(v.is_default == 1?'on':'')+' fl" data-dz="'+v.id+'">';
				if(v.is_default == 1){
					vrStr += '<div class="defaultTip">默认地址</div>';
					$("#d").val(v.id);
				}
				vrStr += '<div class="door_detail_inner"><div class="inner_top">'+v.address+'</div>';
				vrStr += '<div class="inner_bottom"><span>'+v.receiver+'</span><a href="javascript:;"><i class="iconfont">&#xe604;</i>'+v.mobile+'</a></div></div></div>';
			});
			vrStr += '</div><div class="btndown pickup"><span>展开</span><i></i></div>';
			return vrStr;
		},
		/**
		 * 确认预约时间
		 * @param {Object} value 对象
		 */
		spliceHomeTimeDataEvent:function(value){
            var vrStr = '<div class="appointment_time" data-t="'+value.year+ value.month+value.day+'"><div class="appointment_timetitle"><span>'+value.year+'</span></div>';
            vrStr += '<ul class="appointment_timecon"><li>'+value.month.substring(1,0)+'</li><li>'+value.month.substring(2,1)+'</li><li class="lithree">'+value.day.substring(1,0)+'</li><li>'+value.day.substring(2,1)+'</li></ul><i class="iconfont">&#xe616;</i></div>';
            return vrStr;
		},
		/**
		 * 我的计算结果
		 * @param {Object} value 对象
		 */
		spliceCalRresultDataEvent:function(value){
			var vrStr = '<div class="confirm_info_content autoheight clearfix">';
			$.each(value, function(i, v) {
				vrStr += '<div class="confirm_info_detail fl" data-cid="'+v.calculator_results_id+'"><div class="info_detail_top '+(i==0? "b_eec988":"")+'"><p class="area_structure"><span class="'+(i==0? "col_eec988":"")+'">&bull;</span>'+v.area+'m<sup>2</sup><span class="'+(i==0? "col_eec988":"")+'">&bull;</span></p>';
				vrStr += '<p class="area_detail"><span class="room">'+v.room+'</span>室<span class="hall">'+v.parlour+'</span>厅<span class="toilet">'+v.toilet+'</span>卫<span class="balcony">'+v.balcony+'</span>阳台';
				vrStr += '</p></div><div class="info_detail_bottom '+(i==0? "bg_eec988":"")+'"><span>金额</span><b>'+v.zxzj+'</b></div></div>';
			});
			vrStr += '</div><div class="btndown pickup"><span>展开</span><i></i></div>';
			return vrStr;
			
		}
	}

	getUrlParamHandler = {
		/**
		 * 获取url中的参数
		 * @param {Object} name
		 */
		getUrlParam: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.hash.split("?")[1].match(reg); //匹配目标参数
			if(r != null) return unescape(r[2]);
			return null; //返回参数值
		}
	};
	
	infoVerificationHandler = {
		/**
		 * 相关验证
		 * @param {Object} obj 验证数据对象内容
		 */
		verificationEvent:function(obj){
			var self = this;
			var flag = true; // 判断能不能提交 true：能提交  false： 不能提交
			// 判断手机号
			if(obj.mobile == null || obj.mobile == "") {
				self.errorContent(MSG1,$("#mobile"));
				flag = false;
			}else if(obj.mobile.length != 11 || !PHONEREG.test(obj.mobile)) {
				self.errorContent(MSG2,$("#mobile"));
				flag = false;
			}
			// 判断收货人姓名
			if(obj.receiver == null || obj.receiver == "") {
				self.errorContent(MSG3,$("#receiver"));
				flag = false;
			}
			// 判断邮政编码
			if(obj.zipcode == null || obj.zipcode == "") {
				self.errorContent(MSG4,$("#zipcode"));
				flag = false;
			}
			
			// 判断详细地址
			if(obj.address == null || obj.address == "") {
				self.errorContent(MSG5,$("#alladdress"));
				flag = false;
			}
			return flag;
		},
		/**
		 * 输入错误提示
	 	 * @param {Object} msg 错误提示文字
	 	 * @param {Object} element 错误所在之处
		 */
		errorContent : function(msg,element) {
//			element.siblings("label").text(msg).addClass("whether").parent("div").addClass("itemClickError");
			element.addClass("border_ff5704").siblings("label").text(msg).addClass("whether");
		}
	};
	initInputDataHandler = {
		/**
		 * input框初始化
		 */
		inputDataEvent:function(){
			$(".add_address_wrap input[type='text']").val(""); // 数据清空
			$(".add_address_wrap input[type='text']").siblings("label.error").removeClass("whether");
			$(".add_address_wrap input[type='text']").removeClass("border_eec988 border_ff5704");
		}
	}
	/**
	 * 增删改查
	 */
	CRUDInfoHandler = {
		/**
		 * 查询信息
		 */
		queryInfoEvent:function(){
			var self = this;
			var rc = spliceReservationContHandler;
			$.ajax({
				url: READURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				data: {
					user_id: UID
				},
				success: function(data) {
					console.log("用户收藏的地址");
					console.log(data);
					if(data.code == 000){
						$(".Jaddress").html(rc.spliceAddressDataEvent(data.data));
						initInputDataHandler.inputDataEvent(); // input框初始化
					}else{
						$(".Jaddress").html('<div class="nullpage"><i>&nbsp;</i><span>暂无收货地址哦，点击按钮可进行添加~</span></div>');
					}
					
					
				},error: function(data) {}
			});
		},
		/**
		 * 插入信息
		 */
		insertInfoEvent:function(obj){
			var self = this;
			$.ajax({
				url: ADDURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				data:{
					user_id:obj.userId,
					receiver:obj.receiver,
					province:obj.province,
					city:obj.city,
					district:obj.district,
					street:obj.street,
					address:obj.address,
					zipcode:obj.zipcode,
					mobile:obj.mobile,
					is_default:obj.is_default
				},
				success: function(data) {
					console.log(data)
					if(data != null && data.code == '000') {
						alert(data.msg);
						self.queryInfoEvent();
						$("#addaddress").addClass("display");
					}else{
						alert(data.msg);
					}
				},
				error: function(data) {}
			});
		},
	};

	//入口方法调用 代码只能从这里执行
	HHIT_RESERVATIONAPP.controller('reservationCtrl', ['$scope', '$http', function($scope, $http) {
		reservationWrap.init();
	}]);
})();
