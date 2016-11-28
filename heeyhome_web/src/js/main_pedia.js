"use strict"
!function(){
	require.config({
		baseUrl: "./",
		paths: {
			'angular': 'lib/angular/angular.min',
            'angular-route': 'lib/angular/angular-route.min',
            'jquery' : 'lib/jquery/jquery-1.11.3.min',
            'text': 'lib/requirejs/text',
            'angular-resource': 'lib/angular/angular-resource',
            'app' : 'js/app_pedia',
            'index' : 'js/j_pedia/index'
		},
		shim: {
			'angular': {
                exports: 'angular'
            },
        	'angular-resource': {
                // angular-route依赖angular
                deps: ['angular'],
                exports: 'ngResource'
           }
        	,'angular-route': {
                // angular-route依赖angular
                deps: ['angular'],
                exports: 'ngRoute'
            }
		},
		waitSeconds: 15
	});
	require(['app','index'],function(app){
		app.init();
	})
}();
