var heeyhomeOrderdetail = {
	/*
	 * 初始化
	 */
	init: function() {
		heeyhomeOrderdetail.suspensionMenu();
	},
	/*
	 * 左侧悬浮菜单
	 */
	suspensionMenu: function() {
		var items = $("#time_axis .axis_content>div");
		var _tabs = $("#suspension_menu li ");
		$(_tabs).click(function(e) {
			e.stopPropagation();
			var x = $(this).index();
			var divTop = items.eq(x + 1).offset().top;
			$("html,body").stop().animate({
				scrollTop: divTop
			}, 10);
		});
		$(window).scroll(function() {

			var scrollTop = $(document).scrollTop();
			var oTabUl = $('#suspension_menu');
			var curId = '';
			if(scrollTop > 700) {
				$(oTabUl).css('display', 'block');
			} else {
				$(oTabUl).css('display', 'none');
			}

			items.each(function() {
				var m = $(this); //定义变量，获取当前类
				var itemsTop = m.offset().top; //定义变量，获取当前类的top偏移量
				if(scrollTop > itemsTop - 100) {
					curId = "&" + m.attr("class");
				} else {
					return false;
				}
			});

			//给相应的楼层设置cur,取消其他楼层的cur
			var curLink = oTabUl.find(".current");
			if(curId && curLink.find('a').attr("tab") != curId) {
				oTabUl.find("[tab= '" + curId + "']").parent().addClass("current");
				curLink.removeClass("current");
			}
		});
	}
}
$(function() {
	//	var _items = $("#time_axis .axis_content>div");
	//	var _tab = $("#suspension_menu li");
	//	$(_tab).click(function(e){
	//		e.stopPropagation();
	//	    var x = $(this).index();
	//	    var divTop = items.eq(x + 1).offset().top;
	//	    $("html,body").stop().animate({scrollTop: divTop}, 10);
	//	});
	heeyhomeOrderdetail.suspensionMenu();
});

//var items = $("#time_axis .axis_content>div");
//var _tabs= $("#suspension_menu li ");
//$(_tabs).click(function (e) {
//  e.stopPropagation();
//  var x = $(this).index();
//  var divTop = items.eq(x + 1).offset().top;
//  $("html,body").stop().animate({scrollTop: divTop}, 10);
//});
//
//
//$(document).ready(function () {
//  $(window).scroll(function () {
//
//      var scrollTop = $(document).scrollTop();
//      var oTabUl = $('#suspension_menu');
//      var curId = '';
//      if (scrollTop > 700) {
//          $(oTabUl).css('display', 'block');
//      }else{
//      	 $(oTabUl).css('display', 'none');
//      }
//
//      items.each(function () {
//          var m = $(this);                        //定义变量，获取当前类
//          var itemsTop = m.offset().top;        //定义变量，获取当前类的top偏移量
//          if (scrollTop > itemsTop - 100) {
//              curId = "&" + m.attr("class");
//          } else {
//              return false;
//          }
//      });
//
//
//      //给相应的楼层设置cur,取消其他楼层的cur
//      var curLink = oTabUl.find(".current");
//      if (curId && curLink.find('a').attr("tab") != curId) {
//          oTabUl.find("[tab= '" + curId + "']").parent().addClass("current");
//          curLink.removeClass("current");
//      }
//  });
//});