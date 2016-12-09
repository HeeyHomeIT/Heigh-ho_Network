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
            'angular-ui-router': 'lib/angular/angular-ui-router',
            'angular-async-loader': 'lib/angular/angular-async-loader.min',
            'oclazyLoad': 'lib/ocLazyLoad/ocLazyLoad.min',
            'bootstrap': 'lib/bootstrap/bootstrap',
            'app': 'js/j_customer/app_customer',
            'index': 'js/j_customer/index',
            'cookie': 'lib/jquery/jquery.cookie',
            'base64': 'lib/jquery/jquery.base64',
            'ChineseDistricts':'lib/distpicker/ChineseDistricts',
            'distpicker':'lib/distpicker/distpicker',
            'cropbox':'lib/cropbox/cropbox',
            'pagination':'lib/pagination/tm.pagination'
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
            'bootstrap': {
                deps: ['jquery'],
                exports: 'bootstrap'
            },
            // 'distpicker-data':{
            //     deps:['jquery'],
            //     exports:'distpicker-data'
            // },
            'ChineseDistricts':{
                deps:['jquery'],
                exports:'ChineseDistricts'
            },
            'distpicker': {
                deps: ['jquery'],
                exports: 'distpicker'
            },
            'cookie': {
                deps: ['jquery'],
                exports: 'cookie'
            },
            'base64': {
                deps: ['jquery'],
                exports: 'base64'
            },
            'cropbox': {
                deps: ['jquery'],
                exports: 'cropbox'
            },
            'pagination': {
                deps: ['angular'],
                exports: 'pagination'
            }
        },
        waitSeconds: 15
    });

    //init main
    require(['app', 'index','bootstrap','ChineseDistricts','distpicker','cookie','base64','cropbox','pagination'], function (app) {
        app.init();
    })
}();
