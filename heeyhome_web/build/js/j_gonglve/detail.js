/*! Pc.Heigh-ho.Renovation-1.0.0.js 2017-03-21 */
!function(){var a=angular.module("heeyhomeApp"),b=window.location.hash,c=b.substring(12,b.length),d="/api/public/jzbk/info?callback=JSON_CALLBACK",e={init:function(){e.initEvent()},initEvent:function(){var a=this;a.initDetailEvent()},initDetailEvent:function(){a.controller("myDetail",["$scope","$http",function(a,b){var e=sessionStorage.getItem("describe"),f=sessionStorage.getItem("name");console.log(e),b({method:"JSONP",url:d,params:{id:c}}).success(function(a){"000"===a.code?($(".gonglve_detail .now_location .stage").html(f),$(".gonglve_detail .now_location .attention").html(a.data.article_title),$(".gonglve_title").html(a.data.article_title),$(".gonglve_content .daybox_cont .cont-item").html(a.data.article_content)):layer.alert(a.msg)}).error(function(){})}])}};e.init()}();