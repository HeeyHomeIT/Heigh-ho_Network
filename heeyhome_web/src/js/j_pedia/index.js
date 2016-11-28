define(['app','jquery'],function(app){
	app.directive('myHeader',function(){
		return{
			templateUrl:"view/common/_header.html"
		};
	});
	app.directive('myPediatop',function(){
		return{
			templateUrl:"view/v_pedia/pedia_top.html"
		};
	});
	app.directive('myPediacnt',function(){
		return{
			templateUrl:"view/v_pedia/decoration_pedia.html"
		};
	});
//	app.directive('rightContent',function(){
//		return{
//			templateUrl:"view/v_pedia/pedia_right_9.html"
//		};
//	});
	app.directive('myPagenumber',function(){
		return{
			templateUrl:"view/common/_pagenumber.html"
		};
	});
	app.directive('myFooter',function(){
		return{
			templateUrl:"view/common/_footer.html"
		};
	});
	require(['js/j_pedia/decoration_pedia'],function(){});
});