/*! Pc.Heigh-ho.Renovation-1.0.0.js 2017-03-21 */
!function(){function a(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),c=window.location.hash.split("?")[1].match(b);return null!=c?unescape(c[2]):null}var b=angular.module("heeyhomeApp"),c="/api/public/personal/foremaninfo",d="/api/public/personal/portrait",e="/api/public/personal/drive_address",f="/api/public/personal/drive_address/add",g="/api/public/costcalculator/result/get",h="/api/public/order/client/produce",i="/api/public/myworkers/workerinfo",j="/api/public/order/shop/list",k=/^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/,l="手机号不能为空",m="请输入有效的手机号码",n="收货人姓名不能为空",o="邮政编码不能为空",p="详细地址不能为空",q="预约时间不能为空",r="最多只能预约两条上门时间",s="onekey",t="choose",u=JSON.parse(sessionStorage.getItem("rt_list")),v=$.cookie("userId");v=null!=v&&""!=v&&void 0!=v?$.base64.decode(v):"";var w=a("type"),x={init:function(){x.initEvent()},initEvent:function(){var a=this;a.initWebDataEvent()},initWebDataEvent:function(){var a=this;a.initReservePersonInfoEvent(),a.initHomeAddressInfoEvent(),a.initCalResultInfoEvent(),a.initHomeTimeInfoEvent(),a.initCalChangeInfoEvent(),a.initAddressBoxEvent(),a.initHomeAddressChangeEvent(),a.initPlaceOrderEvent(),a.initSpriceListEvent()},initReservePersonInfoEvent:function(){var a=spliceReservationContHandler,b="";console.log(u),u.mark==s&&"1"==w?$.ajax({url:d,type:"GET",async:!0,dataType:"jsonp",data:{user_id:u.gz}}).done(function(d){"000"==d.code&&(b=d.data.user_img,$.ajax({url:c,type:"GET",async:!0,dataType:"jsonp",data:{foreman_id:u.gz}}).done(function(c){"000"==c.code&&($(".cards").append(a.splicePersonDataEvent(b,c.data)),$(".explain").html("尊敬的用户，您选择了<span class='col_eec988'>一键预约</span>装修，接下来将有工长全权负责您家房子的装修任务"))}))}):u.mark==t&&"2"==w&&$.each(u.worker,function(b,c){$.ajax({url:i,type:"GET",async:!0,dataType:"jsonp",jsonp:"callback",data:{cate_id:c.ntype,worker_id:c.nid}}).done(function(b){$(".cards").append(a.spliceWorkerDataEvent(c.ntype,b.data)),$(".explain").html("尊敬的用户，您选择了<span class='col_eec988'>自己选工人</span>装修，接下来工长会根据您的需求来负责您家房子的装修任务")})})},initHomeAddressInfoEvent:function(){CRUDInfoHandler.queryInfoEvent()},initAddressBoxEvent:function(){var a=$("#addaddress");$(document).on("click",".user_new_address",function(){$(".address_content").distpicker("reset",!0),a.removeClass("display")}),$(document).on("click",".Jclose",function(){initInputDataHandler.inputDataEvent(),a.addClass("display")}),$(document).on("click",".add_address_wrap input[type='text']",function(){$(this).siblings("label.error").removeClass("whether"),$(this).addClass("border_eec988").removeClass("border_ff5704").closest("div.address_cont_line").siblings().find("input[type='text']").removeClass("border_eec988")}),$(document).on("click",".saveaddBtn",function(){var a={};a.userId=v,a.receiver=$("#receiver").val(),a.province=$("#sr_province").val(),a.city=$("#sr_city").val(),a.district=$("#sr_district").val(),a.street="",a.address=$("#alladdress").val(),a.zipcode=$("#zipcode").val(),a.mobile=$("#mobile").val(),a.is_default=$(".i-chk").is(":checked")?"1":"2",console.log(a),infoVerificationHandler.verificationEvent(a)&&CRUDInfoHandler.insertInfoEvent(a)})},initCalResultInfoEvent:function(){var a=spliceReservationContHandler;$.ajax({url:g,type:"GET",async:!0,dataType:"jsonp",data:{user_id:v},success:function(b){"000"==b.code?($(".Jcal").html(a.spliceCalRresultDataEvent(b.data.calculator_data)),$("#Jarea").prepend(b.data.calculator_data[0].area),$("#Jroom").prepend(b.data.calculator_data[0].room),$("#Jparlour").prepend(b.data.calculator_data[0].parlour),$("#Jtoilet").prepend(b.data.calculator_data[0].toilet),$("#Jbalcony").prepend(b.data.calculator_data[0].balcony),$("#Jzxzj").prepend(parseFloat(b.data.calculator_data[0].zxzj).toFixed(2)),$("#c").val(b.data.calculator_data[0].calculator_results_id)):($(".Jcal").html('<div class="nullpage"><i>&nbsp;</i><span>你还没收藏计算结果哦，快<a target="_blank" href="../#/cal">去看看</a>你家装修需要多少钱吧！~</span></div>'),$("#Jarea").prepend("-"),$("#Jroom").prepend("-"),$("#Jparlour").prepend("-"),$("#Jtoilet").prepend("-"),$("#Jbalcony").prepend("-"),$("#Jzxzj").prepend("-"))},error:function(){}})},initCalChangeInfoEvent:function(){$(document).on("click",".confirm_info_detail",function(){var a=$(this).data("cid");$.ajax({url:g,type:"GET",async:!0,dataType:"jsonp",data:{user_id:v,calculator_results_id:a},success:function(a){$("#Jarea").empty().prepend(a.data.area),$("#Jroom").empty().prepend(a.data.room),$("#Jparlour").empty().prepend(a.data.parlour),$("#Jtoilet").empty().prepend(a.data.toilet),$("#Jbalcony").empty().prepend(a.data.balcony),$("#Jzxzj").empty().prepend(parseFloat(a.data.zxzj).toFixed(2)),$("#c").val(a.data.calculator_results_id)},error:function(){}}),$(this).siblings().find("div.info_detail_triangle").addClass("display"),$(this).siblings().find("div.info_detail_top").removeClass("b_eec988"),$(this).siblings().find("div.info_detail_bottom").removeClass("bg_eec988"),$(this).siblings().find(".area_structure span").removeClass("col_eec988"),$(this).find("div.info_detail_triangle").removeClass("display"),$(this).find("div.info_detail_top").addClass("b_eec988"),$(this).find("div.info_detail_bottom").addClass("bg_eec988"),$(this).find(".area_structure span").addClass("col_eec988")})},initHomeTimeInfoEvent:function(){var a=spliceReservationContHandler;$(document).on("click","#JHomeTime",function(){laydate({elem:"#JHomeTime",min:laydate.now(),format:"YYYY年MM月DD日"})}),$(document).on("click",".addtime",function(){var b=$("#JHomeTime").val(),c=$(".appointment_time_wrap").children("div").length;if(null!=b&&""!=b)if(2>c){var d={};d.year=b.split("年")[0],d.month=b.split("年")[1].split("月")[0],d.day=b.split("年")[1].split("月")[1].split("日")[0],$(".appointment_time_wrap").append(a.spliceHomeTimeDataEvent(d)),$(".Jspan1").text(parseInt(c)+1),$(".Jspan2").text(1-parseInt(c))}else infoVerificationHandler.errorContent(r,$("#JHomeTime"));else infoVerificationHandler.errorContent(q,$("#JHomeTime"))}),$(document).on("click",".laydate-icon ",function(){$(this).siblings("label.error").removeClass("whether"),$(this).removeClass("border_ff5704")}),$(document).on("click",".iconfont",function(){$(this).parent(".appointment_time").remove();var a=$(".appointment_time_wrap").children("div").length;$(".Jspan1").text(parseInt(a)),$(".Jspan2").text(2-parseInt(a))})},initHomeAddressChangeEvent:function(){$(document).on("click",".door_content_detail",function(){$(this).addClass("on").siblings().removeClass("on"),$("#d").val($(this).data("dz"))})},initPlaceOrderEvent:function(){$(document).off("click",".start_submit").on("click",".start_submit",function(){var a=v,b=u.dp,c=$("#d").val(),d=$("#c").val(),e=[],f=[],g={},i={};return $.each($(".appointment_time_wrap .appointment_time"),function(a,b){e.push($(b).data("t"))}),$.each(e,function(a,b){g[a]=b}),u.mark==s&&"1"==w?(f.push(u.gz),$.each(f,function(a,b){i[a]=b})):u.mark==t&&"2"==w&&$.each(u.worker,function(a,b){i[a]=b.nid}),null==c||""==c?void layer.msg("地址不能不选哦~"):null==d||""==d?void layer.msg("计算结果不能不选哦~"):0==e.length?void layer.msg("上门时间不能不选哦~"):void $.ajax({url:j,type:"GET",async:!0,dataType:"jsonp",data:{shop_id:b},success:function(e){var f=!0;e&&"000"==e.code&&(console.log(e.data),$.each(e.data.order_list,function(a,b){c==b.order_address_id&&(layer.msg("该地址已有过订单哦~"),f=!1)})),f&&$.ajax({url:h,type:"GET",async:!0,dataType:"jsonp",data:{user_id:a,shop_id:b,address_id:c,calculator_result_id:d,time:JSON.stringify(g),worker:JSON.stringify(i)},success:function(a){console.log(a);var b={};b=a.data,$.cookie("dd",JSON.stringify(b),{expires:1,path:"/"});var c="reservation.html#/waitcontact";window.location.href=c+"?type=1"},error:function(){}})}})})},initSpriceListEvent:function(){$(document).on("click",".door_address .btndown",function(){$(this).hasClass("pickdowm")?($(this).find("span").text("展开"),$(this).removeClass("pickdowm").siblings(".door_address_content").addClass("autoheight")):($(this).find("span").text("收起"),$(this).addClass("pickdowm").siblings(".door_address_content").removeClass("autoheight"))}),$(document).on("click",".confirm_appointment_info .btndown",function(){$(this).hasClass("pickdowm")?($(this).find("span").text("展开"),$(this).removeClass("pickdowm").siblings(".confirm_info_content ").addClass("autoheight")):($(this).find("span").text("收起"),$(this).addClass("pickdowm").siblings(".confirm_info_content ").removeClass("autoheight"))})}};spliceReservationContHandler={splicePersonDataEvent:function(a,b){var c='<div class="card avatar"><img src="'+a+'"><h1>'+b.foremaninfo_realname+"</h1>";return c+="<span>"+(null!=b.loc_city&&""!=b.loc_city?b.loc_city:"中国")+" | "+b.foremaninfo_phone+" | "+(null!=b.worktime&&""!=b.worktime?b.worktime:"0")+'年</span><div class="corner"><div class="corner_logo"><a><em class="sprite_remain"></em></a></div>',c+='<span class="corner_text">工长</span></div></div>'},spliceWorkerDataEvent:function(a,b){var c='<div class="card avatar"><img src="'+b.portrait_img+'"><h1>'+b.name+"</h1>";switch(c+="<span>"+b.birthplace+" | "+b.phone+" | "+b.worktime+'年</span><div class="corner"><div class="corner_logo"><a><em class="sprite_remain"></em></a></div>',a){case 1:c+='<span class="corner_text">杂工</span></div></div>';break;case 2:c+='<span class="corner_text">水电工</span></div></div>';break;case 3:c+='<span class="corner_text">瓦工</span></div></div>';break;case 4:c+='<span class="corner_text">木工</span></div></div>';break;case 5:c+='<span class="corner_text">油漆工</span></div></div>'}return c},spliceAddressDataEvent:function(a){var b='<div class="door_address_content autoheight clearfix">';return $.each(a,function(a,c){b+='<div class="door_content_detail '+(1==c.is_default?"on":"")+' fl" data-dz="'+c.id+'">',1==c.is_default&&(b+='<div class="defaultTip">默认地址</div>',$("#d").val(c.id)),b+='<div class="door_detail_inner"><div class="inner_top">'+c.address+"</div>",b+='<div class="inner_bottom"><span>'+c.receiver+'</span><a href="javascript:;"><i class="iconfont">&#xe604;</i>'+c.mobile+"</a></div></div></div>"}),b+='</div><div class="btndown pickup"><span>展开</span><i></i></div>'},spliceHomeTimeDataEvent:function(a){var b='<div class="appointment_time" data-t="'+a.year+a.month+a.day+'"><div class="appointment_timetitle"><span>'+a.year+"</span></div>";return b+='<ul class="appointment_timecon"><li>'+a.month.substring(1,0)+"</li><li>"+a.month.substring(2,1)+'</li><li class="lithree">'+a.day.substring(1,0)+"</li><li>"+a.day.substring(2,1)+'</li></ul><i class="iconfont">&#xe616;</i></div>'},spliceCalRresultDataEvent:function(a){var b='<div class="confirm_info_content autoheight clearfix">';return $.each(a,function(a,c){b+='<div class="confirm_info_detail fl" data-cid="'+c.calculator_results_id+'"><div class="info_detail_top '+(0==a?"b_eec988":"")+'"><p class="area_structure"><span class="'+(0==a?"col_eec988":"")+'">&bull;</span>'+c.area+'m<sup>2</sup><span class="'+(0==a?"col_eec988":"")+'">&bull;</span></p>',b+='<p class="area_detail"><span class="room">'+c.room+'</span>室<span class="hall">'+c.parlour+'</span>厅<span class="toilet">'+c.toilet+'</span>卫<span class="balcony">'+c.balcony+"</span>阳台",b+='</p></div><div class="info_detail_bottom '+(0==a?"bg_eec988":"")+'"><span>金额</span><b>'+c.zxzj+"</b></div></div>"}),b+='</div><div class="btndown pickup"><span>展开</span><i></i></div>'}},getUrlParamHandler={getUrlParam:function(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),c=window.location.hash.split("?")[1].match(b);return null!=c?unescape(c[2]):null}},infoVerificationHandler={verificationEvent:function(a){var b=this,c=!0;return null==a.mobile||""==a.mobile?(b.errorContent(l,$("#mobile")),c=!1):11==a.mobile.length&&k.test(a.mobile)||(b.errorContent(m,$("#mobile")),c=!1),(null==a.receiver||""==a.receiver)&&(b.errorContent(n,$("#receiver")),c=!1),(null==a.zipcode||""==a.zipcode)&&(b.errorContent(o,$("#zipcode")),c=!1),(null==a.address||""==a.address)&&(b.errorContent(p,$("#alladdress")),c=!1),c},errorContent:function(a,b){b.addClass("border_ff5704").siblings("label").text(a).addClass("whether")}},initInputDataHandler={inputDataEvent:function(){$(".add_address_wrap input[type='text']").val(""),$(".add_address_wrap input[type='text']").siblings("label.error").removeClass("whether"),$(".add_address_wrap input[type='text']").removeClass("border_eec988 border_ff5704")}},CRUDInfoHandler={queryInfoEvent:function(){var a=spliceReservationContHandler;$.ajax({url:e,type:"GET",async:!0,dataType:"jsonp",data:{user_id:v},success:function(b){console.log("用户收藏的地址"),console.log(b),"000"==b.code?($(".Jaddress").html(a.spliceAddressDataEvent(b.data)),initInputDataHandler.inputDataEvent()):$(".Jaddress").html('<div class="nullpage"><i>&nbsp;</i><span>暂无收货地址哦，点击按钮可进行添加~</span></div>')},error:function(){}})},insertInfoEvent:function(a){var b=this;$.ajax({url:f,type:"GET",async:!0,dataType:"jsonp",data:{user_id:a.userId,receiver:a.receiver,province:a.province,city:a.city,district:a.district,street:a.street,address:a.address,zipcode:a.zipcode,mobile:a.mobile,is_default:a.is_default},success:function(a){console.log(a),null!=a&&"000"==a.code?(layer.alert(a.msg),b.queryInfoEvent(),$("#addaddress").addClass("display")):layer.alert(a.msg)},error:function(){}})}},b.controller("reservationCtrl",["$scope","$http",function(){x.init()}])}();