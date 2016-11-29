/**
 * Created by Administrator on 2016/11/23.
 */
///*入口脚本*/
//require.config({
//  baseUrl: "js/",
//  paths: {
//  	"jquery": "../lib/jquery/jquery-2.1.1.min",
//  	"text": "../lib/requirejs/text"
//  },
//  waitSeconds: 15
//});
//
//require(["j_index/index"], function(index) {
//  // todo
//});
/*入口脚本*/
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
            'app': 'js/j_customer/app_customer',
            'index': 'js/j_customer/index'
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
