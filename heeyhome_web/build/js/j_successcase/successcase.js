/*! Pc.Heigh-ho.Renovation-1.0.0.js 2017-03-29 */
!function(){var a=angular.module("heeyhomeApp"),b="/api/public/myworkcase",c="/api/public/myworkcase/scan",d={init:function(){d.initEvent()},initEvent:function(){var a=this,b=getUrlParamHandler.getUrlParam("pos"),c=getUrlParamHandler.getUrlCnParam("sn"),d=getUrlParamHandler.getUrlParam("si");$("#Jgz").val(b),$(".sname").html("null"!=c&&""!=c?c:"无"),$(".sname").attr("href","view_shop.html#/shopdetails?pos="+d),a.initSuccessCaseDataEvent()},initSuccessCaseDataEvent:function(){var a=spliceSuccessContHandler,c=$("#Jgz").val();$(".sc_title .titlename"),$.ajax({url:b,type:"GET",async:!0,dataType:"jsonp",data:{foreman_id:c},beforeSend:function(){$(".sc_contents").addClass("loagbg")},complete:function(){$(".sc_contents").removeClass("loagbg")}}).done(function(d){if("000"==d.code){var e=0,f=0,g=document.getElementById("title_active");$(".sc_contents ul").html(a.spliceCgInfoEvent(d.data,[1,2])),$(document).on("click",".sc_title .titlename",function(){if(startMoveHandler.startMoveEvent(g,this.offsetLeft,e,f),0==$(this).index()){var h=a.spliceCgInfoEvent(d.data,[1,2]);$(".sc_contents ul").html(null!=h&&""!=h?h:'<div class="nullpage"><i>&nbsp;</i><span>空空如也~</span></div>')}else $.ajax({url:b,type:"GET",async:!0,dataType:"jsonp",data:{foreman_id:c,type:3},beforeSend:function(){$(".sc_contents").addClass("loagbg")},complete:function(){$(".sc_contents").removeClass("loagbg")}}).done(function(b){$(".sc_contents ul").html("000"==b.code?a.spliceCgInfoEvent(b.data,[3,3]):'<div class="nullpage"><i>&nbsp;</i><span>空空如也~</span></div>')})}),successInfo.caseDetail()}else $(".main_content").html('<div class="nullpage"><i>&nbsp;</i><span>空空如也~</span></div>')})}};getUrlParamHandler={getUrlParam:function(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),c=window.location.hash.split("?")[1].match(b);return null!=c?unescape(c[2]):null},getUrlCnParam:function(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),c=window.location.hash.split("?")[1].match(b);return null!=c?decodeURI(c[2]):null}},successInfo={caseDetail:function(){$(document).on("click",".product-3 .image",function(){var a=$(this).attr("data-type"),b=$(this).attr("data-id");viewPlus.addView(b),1==a?(sessionStorage.setItem("case_id",b),window.location.href="success_case.html#/success/success_case"):(sessionStorage.setItem("orderid",b),window.location.href="order_detail.html#/morder_wrap/morder_detail")})}},viewPlus={addView:function(a){$.ajax({type:"get",url:c,async:!0,dataType:"jsonp",data:{case_id:a},success:function(a){a&&"000"==a.code?$(".scan_num").html(a.data.scan_num++):layer.alert(a.msg)},error:function(){}})}},startMoveHandler={startMoveEvent:function(a,b,c,d){clearInterval(a.timer),a.timer=setInterval(function(){c+=(b-a.offsetLeft)/10,c*=.7,d+=c,Math.abs(c)<1&&Math.abs(d-b)<1?(clearInterval(a.timer),a.style.left=b+"px"):a.style.left=d+"px"},30)}},spliceSuccessContHandler={spliceCgInfoEvent:function(a,b){var c="";return $.each(a,function(a,d){0!=d.img.length&&(d.type==b[0]||d.type==b[1])&&(c+='<li><div class="image" data-type="'+d.type+'" data-id="'+d.case_id+'"><a href="javascript:void(0)"><img src="'+d.img[0].case_img+'"></a>',c+='<div class="image_title"><div class="roomtype">'+d.housetype+'</div><div class="roomicon"><em class="sprite-image sc_icon_love"></em><span>'+d.like_num+"</span></div>",c+='<div class="roomicon"><em class="sprite-image sc_icon_look"></em><span class="scan_num">'+d.scan_num+"</span></div></div></div>",c+='<div class="introduce"><strong>'+d.style+"&nbsp;"+d.area+"m<sup>2</sup></strong>",c+='<div class="introduce-icon"><em class="sprite-image sc_icon_address"></em><span>'+d.address+"</span></div>",c+='<div class="introduce-icon"><em class="sprite-image sc_icon_time"></em><span>'+d.timelong+"</span></div></div></li>")}),c}},a.controller("successcaseCtrl",["$scope","$http",function(){d.init()}])}();