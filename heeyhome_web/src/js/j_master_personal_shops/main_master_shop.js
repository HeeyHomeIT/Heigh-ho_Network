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
            'jquery': 'lib/jquery/jquery-1.7.1',
            'jquery-ui': 'lib/jquery/jquery-ui.min',
            'superslide':'lib/superslide/jquery.SuperSlide2',
            'text': 'lib/requirejs/text',
            'angular-resource': 'lib/angular/angular-resource',
            'app': 'js/j_master_personal_shops/app_master_shops',
            'index': 'js/j_master_personal_shops/index'
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
            },
            'jquery-ui':{
                deps:['jquery']/*,
                exports:'jquery-ui'*/
            },
            'superslide':{
                deps:['jquery']/*,
                exports:'superslide'*/
            }
        },
        waitSeconds: 15
    });

    //init main
    require(['app', 'index'], function (app) {
        app.init();
    })
}();
