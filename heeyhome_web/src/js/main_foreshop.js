'use strict';
!function(){
	//config requirejs
    require.config({
        baseUrl: './',
        paths: {
        	'angular': 'lib/angular/angular.min',
            'angular-route': 'lib/angular/angular-route.min',
            'jquery' : 'lib/jquery/jquery-1.11.3.min',
            'text': 'lib/requirejs/text',
            'angular-resource': 'lib/angular/angular-resource',
            'app' : 'js/app_foreshop',
            'index' : 'js/j_foreshop/index'
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
        },
        waitSeconds: 15
    });
    require(['app','index'],function(app){
    	app.init();
    });
}();
