define(['angular', 'angular-resource','angular-animate','angular-ui-router'],function(angular){
	
	var app = angular.module('telephoneApp', ['ngResource','ngAnimate','ui.router']);
	
	app.init = function(){
		angular.bootstrap(document,['telephoneApp']);
	};
	
//	app.config(function ($controllerProvider, $provide, $compileProvider, $resourceProvider) {
//
//      // 保存旧的引用.
//      app._directive = app.directive;
//      
//      app.directive = function (name, factory) {
//          $compileProvider.directive(name, factory);
//          return (this);
//
//      };
// 
//      $resourceProvider.defaults.stripTrailingSlashes = false;
//  });
//
//  app.run(function (){
//      //run some code here ...
//  });
	
	app.config(function($stateProvider,$urlRouterProvider){
		$stateProvider.state("bind",{
			url: "/bind",
			templateUrl: "view/v_user_center/bind.html"
		})
		.state("bind.phone_1",{
			url : "/phone_1",
			templateUrl : "view/v_user_center/bind-phone_1.html"
		})
		.state("bind.phone_2",{
			url : "/phone_2",
			templateUrl : "view/v_user_center/bind-phone_2.html"
		})
		.state("bind.phone_3",{
			url : "/phone_3",
			templateUrl : "view/v_user_center/bind-phone_3.html"
		})
		$urlRouterProvider.otherwise("/bind/phone_1");
	});

    return app;
	
});