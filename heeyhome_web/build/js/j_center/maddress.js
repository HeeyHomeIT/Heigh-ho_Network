/*! Pc.Heigh-ho.Renovation-1.0.0.js 2017-03-21 */
!function(){var a=angular.module("heeyhomeApp"),b="/api/public/personal/drive_address",c="/api/public/personal/drive_address/add",d="/api/public/personal/drive_address/del",e="/api/public/personal/drive_address/change",f="/api/public/personal/drive_address/setdefault",g="添加",h="保存",i=/^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/,j="手机号不能为空",k="请输入有效的手机号码",l="收货人姓名不能为空",m="邮政编码不能为空",n="详细地址不能为空",o=$.cookie("userId");o=null!=o&&""!=o&&void 0!=o?$.base64.decode($.cookie("userId")):"";var p={init:function(){p.initEvent()},initEvent:function(){var a=this;$(".Jcenter").html("收货地址"),$(".left_ul li").eq(6).addClass("left_active").siblings().removeClass("left_active"),a.initAddressInfoEvent(),a.addAddressInfoEvent(),a.clickInputBoxEvent(),a.backBtnClickEvent()},initInputValEvent:function(){$(".add_address_wrap input[type='text']").val(""),$(".add_address_wrap input[type='text']").removeClass("border_eec988 border_ff5704"),$(".add_address_wrap input[type='checkbox']").prop("checked",!1),$(".address_content").distpicker("destroy")},initAddressInfoEvent:function(){CRUDInfoHandler.queryInfoEvent()},addAddressInfoEvent:function(){var a=this;$(".addEvent").on("click",function(){a.initInputValEvent(),$(".address_content").distpicker("reset",!0),$(".saveaddBtn").val(g),$(this).closest("div.address_wrap").addClass("display").siblings().removeClass("display"),a.soeBtnClickEvent(1),$(".not_information").hide(),$(".not_information_text").html()})},backBtnClickEvent:function(){$("#addBack").on("click",function(){$(".add_address_wrap").addClass("display").siblings().removeClass("display"),CRUDInfoHandler.queryInfoEvent()})},deleteBtnClickEvent:function(){$(".address_del").on("click",function(){var a=$(this).closest("div.address_list"),b=a.data("id");CRUDInfoHandler.deleteInfoEvent(a,b)})},editorBtnClickEvent:function(){var a=this;$(".address_editor").on("click",function(){a.initInputValEvent();var b=JSON.parse($(this).closest("div").siblings("input").val());$(".address_content").distpicker({province:b.province,city:b.city,district:b.district}),$(".saveaddBtn").val(h),$("#receiver").val(b.receiver),$("#alladdress").val(b.address),$("#zipcode").val(b.zipcode),$("#mobile").val(b.mobile),"1"==b.is_default?(console.log(1),$(".i-chk").prop("checked",!0)):"2"==b.is_default&&$(".i-chk").prop("checked",!1),$(this).closest("div.address_wrap").addClass("display").siblings().removeClass("display"),a.soeBtnClickEvent(2,b.id)})},setdefaultBtnClickEvent:function(){$(".default_address").on("click",function(){var a=$(this).closest("div.address_list").data("id");CRUDInfoHandler.setdefaultInfoEvent(a)})},soeBtnClickEvent:function(a,b){var c=$(".saveaddBtn");c.off("click").on("click",function(){var d={};d.receiver=$("#receiver").val(),d.province=$("#province3").val(),d.city=$("#city3").val(),d.district=$("#district3").val(),d.street="",d.address=$("#alladdress").val(),d.zipcode=$("#zipcode").val(),d.mobile=$("#mobile").val(),d.is_default=$(".i-chk").is(":checked")?"1":"2",console.log(d),c.val()==g&&1==a?(d.userId=o,infoVerificationHandler.verificationEvent(d)&&CRUDInfoHandler.insertInfoEvent(d)):c.val()==h&&2==a&&(d.addressId=b,infoVerificationHandler.verificationEvent(d)&&CRUDInfoHandler.editorInfoEvent(d))})},clickInputBoxEvent:function(){$(".add_address_wrap input[type='text']").on("click",function(){$(this).siblings("label.error").removeClass("whether"),$(this).addClass("border_eec988").removeClass("border_ff5704").closest("div.address_cont_line").siblings().find("input[type='text']").removeClass("border_eec988")})}};spliceContentHandler={spliceStrEvent:function(a){var b='<div class="address_list" data-id="'+a.id+'" ><div class="address_list_title"><input type="hidden" id="Address'+a.id+'" value='+JSON.stringify(a)+">";return b+='<span class="recipient">收货人</span>',b+='<span class="in_area">所在地区</span>',b+='<span class="detailed_address">详细地址</span>',b+='<span class="address_code">邮编</span>',b+='<span class="address_tel">电话/手机</span>',b+='<div class="editor_del"><a class="address_editor" href="javascript:;" title="编辑">',b+='<em class="sprite_order"></em></a><a class="address_del" href="javascript:;" title="删除">',b+='<em class="sprite_order"></em></a></div></div>',b+='<div class="address_list_content" >',b+='<span class="recipient">'+a.receiver+"</span>",b+='<span class="in_area">'+a.province+a.city+a.district+"</span>",b+='<span class="detailed_address">'+a.address+"</span>",b+='<span class="address_code">'+a.zipcode+"</span>",b+='<span class="address_tel">'+a.mobile+"</span>","1"==a.is_default?b+='<span class="defaulted">默认地址</span>':"2"==a.is_default&&(b+='<a class="default_address" href="javascript:;">设为默认地址</a>'),b+="</div></div>"}},CRUDInfoHandler={queryInfoEvent:function(){$.ajax({url:b,type:"GET",async:!0,dataType:"jsonp",data:{user_id:o},success:function(a){null!=a&&"000"==a.code?(console.log(a.data),$(".addressListWrap").empty(),$.each(a.data,function(a,b){var c=spliceContentHandler.spliceStrEvent(b);$(".addressListWrap").append(c)}),p.deleteBtnClickEvent(),p.editorBtnClickEvent(),p.setdefaultBtnClickEvent()):"117"==a.code?($(".not_information").show().removeClass("hide"),$(".not_information_text").html("亲，暂无收货地址哦，点击按钮可进行添加~")):layer.msg(a.msg)},error:function(){}})},insertInfoEvent:function(a){$.ajax({url:c,type:"GET",async:!0,dataType:"jsonp",data:{user_id:a.userId,receiver:a.receiver,province:a.province,city:a.city,district:a.district,street:a.street,address:a.address,zipcode:a.zipcode,mobile:a.mobile,is_default:a.is_default},success:function(a){console.log(a),null!=a&&"000"==a.code?(layer.msg(a.msg),CRUDInfoHandler.queryInfoEvent(),$(".add_address_wrap").addClass("display").siblings().removeClass("display")):layer.msg(a.msg)},error:function(){}})},deleteInfoEvent:function(a,b){$.ajax({url:d,type:"GET",async:!0,dataType:"jsonp",data:{id:b},success:function(b){null!=b&&"000"==b.code?(layer.msg(b.msg),a.remove(),CRUDInfoHandler.queryInfoEvent()):layer.msg(b.msg)},error:function(){}})},editorInfoEvent:function(a){console.log(a.addressId),$.ajax({url:e,type:"GET",async:!0,dataType:"jsonp",data:{id:a.addressId,receiver:a.receiver,province:a.province,city:a.city,district:a.district,street:a.street,address:a.address,zipcode:a.zipcode,mobile:a.mobile,is_default:a.is_default},success:function(a){console.log(a),null!=a&&"000"==a.code?(layer.msg(a.msg),CRUDInfoHandler.queryInfoEvent(),$(".add_address_wrap").addClass("display").siblings().removeClass("display")):layer.msg(a.msg)},error:function(){}})},setdefaultInfoEvent:function(a){$.ajax({url:f,type:"GET",async:!0,dataType:"jsonp",data:{user_id:o,id:a},success:function(){CRUDInfoHandler.queryInfoEvent()},error:function(){}})}},infoVerificationHandler={verificationEvent:function(a){var b=this,c=!0;return null==a.mobile||""==a.mobile?(b.errorContent(j,$("#mobile")),c=!1):11==a.mobile.length&&i.test(a.mobile)||(b.errorContent(k,$("#mobile")),c=!1),(null==a.receiver||""==a.receiver)&&(b.errorContent(l,$("#receiver")),c=!1),(null==a.zipcode||""==a.zipcode)&&(b.errorContent(m,$("#zipcode")),c=!1),(null==a.address||""==a.address)&&(b.errorContent(n,$("#alladdress")),c=!1),c},errorContent:function(a,b){b.addClass("border_ff5704").siblings("label").text(a).addClass("whether")}},a.controller("mAddressCtrl",["$scope","$http",function(){p.init()}])}();