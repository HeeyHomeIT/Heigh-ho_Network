'use strict';
!function () {
    //config requirejs
    require.config({
        baseUrl: './',
        paths: {
        	'angular': 'lib/angular/angular.min',
            'angular-route': 'lib/angular/angular-route.min',
            'jquery' : 'lib/jquery/jquery-1.11.3.min',
            'text': 'lib/requirejs/text',
            'angular-resource': 'lib/angular/angular-resource',
            'angular-animate' : 'lib/angular/angular-animate',
            'angular-ui-router': 'lib/angular/angular-ui-router',
            'app' : 'js/app_phone',
            'index' : 'js/j_user_center/index'
        },
        shim: {
        	'angular': {
                exports: 'angular'
            },
        	'angular-resource': {
                // angular-route依赖angular
                deps: ['angular'],
                exports: 'ngResource'
          },
          'angular-animate': {
          	deps: ['angular'],
          	exports: 'ngAnimate'
          },
          'angular-ui-router': {
          	deps: ['angular'],
          	exports: 'ui.router'
          }
        },
        waitSeconds: 15
    });
    
	//init main
	require(['app','index'],function(app){
		app.init();
	})
}();