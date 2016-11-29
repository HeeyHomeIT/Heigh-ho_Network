/**
 * Created by Administrator on 2016/11/23.
 */
'use strict';
!function () {
    //config requirejs
    require.config({
        baseUrl: './',
        paths: {
            'angular': 'lib/angular/angular.min',
            'angular-route': 'lib/angular/angular-route.min',
            'jquery': 'lib/jquery/jquery-1.11.3.min',
            'text': 'lib/requirejs/text',
            'angular-resource': 'lib/angular/angular-resource',
            'app': 'js/j_master/app_master',
            'index': 'js/j_master/index'
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
            'angular-route': {
                deps: ['angular'],
                exports: 'angular-route'
            }
        },
        waitSeconds: 15
    });

    //init main
    require(['app', 'index'], function (app) {
        app.init();
    })
}();
