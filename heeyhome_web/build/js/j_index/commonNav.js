/*! Pc.Heigh-ho.Renovation-1.0.0.js 2017-01-22 */
define(["app"],function(a){var b="http://www.heeyhome.com/api/public/personal/userinfo",c=$.cookie("userId");c=null!=c&&""!=c&&void 0!=c?$.base64.decode(c):"",function(){var d={init:function(){d.initEvent()},initEvent:function(){var a=this;a.navigationScorllEvent(),a.initGotoTopEvent(),a.initCustomerServiceEvent()},initGotoTopEvent:function(){$(document).on("click",".top",function(){return $("body,html").stop().animate({scrollTop:0},1e3),!1})},navigationScorllEvent:function(){$(window).scroll(function(){$(window).scrollTop()>100?$(".top").slideDown(1e3):$(".top").slideUp(1e3)})},initCustomerServiceEvent:function(){$(document).on("click",".onlineQA",function(){$.ajax({url:b,type:"GET",async:!0,dataType:"jsonp",data:{user_id:c}}).done(function(a){var b="",c="",d="";0==a.code&&(b=a.data.user_name,c=a.data.userinfo_phone,d=a.data.userinfo_email),window.easemobim=window.easemobim||{},easemobim.bind({tenantId:"22227",hide:!0,visitor:{trueName:b,phone:c,description:"描述信息",email:d},satisfaction:!0,resources:!0})})})}};a.indexNavWrapHandler=function(){d.init()}}()});