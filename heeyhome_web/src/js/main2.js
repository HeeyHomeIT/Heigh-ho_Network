/*入口脚本*/
'use strict';

!function () {
    //config requirejs
    require.config({
        baseUrl: './',
        paths: {
        	'jquery': 'lib/jquery/jquery-2.1.1.min',
            'angular': 'lib/angular/angular.min',
            'angular-route': 'lib/angular/angular-route.min',
            'text': 'lib/requirejs/text',
            'angular-resource': 'lib/angular/angular-resource',
            'angular-ui-router': 'lib/angular/angular-ui-router',
            'angular-async-loader': 'lib/angular/angular-async-loader.min',
            'oclazyLoad': 'lib/ocLazyLoad/ocLazyLoad.min',
            'bootstrap': 'lib/bootstrap/bootstrap',
            'carousel': 'js/j_index/carousel',
            'base64': 'lib/jquery/jquery.base64',
            'cookie': 'lib/jquery/jquery.cookie',
            'app': 'js/app2',
            'index': 'js/index2'

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
            'bootstrap': {
                // angular-route依赖angular
                deps: ['jquery'],
                exports: 'bootstrap'
            },
            'angular-route': {
                deps: ['angular'],
                exports: 'angular-route'
            },
            'angular-ui-router': {
                deps: ['angular'],
                exports: 'ui.router'
            },
            'oclazyLoad': {
                deps: ['angular']
            },
            'base64': {
                deps: ['jquery'],
                exports: 'base64'
            },
            'cookie': {
                deps: ['jquery'],
                exports: 'cookie'
            }
        },
        waitSeconds: 15
    });

	/**
	 * init main
	 * 自动导入app.js,index.js,bootstrap.js模块
	 */
    require(['app', 'index','bootstrap','base64','cookie'], function (app) {
    	// 手动启动angularjs，特别说明此处的bootstrap不是那个ui框架，而是angularjs的一个手动启动框架的函数
        app.init();
    })
}();

