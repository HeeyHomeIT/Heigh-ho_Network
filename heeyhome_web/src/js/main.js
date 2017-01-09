/*入口脚本*/
'use strict';

!function () {
    //config requirejs
    require.config({
        baseUrl: './',
        paths: {
            'jquery': 'lib/jquery/jquery-2.1.1.min',
            'bootstrap': 'lib/bootstrap/bootstrap.min',
            'angular': 'lib/angular/angular.min',
            'angular-route': 'lib/angular/angular-route.min',
            'angular-resource': 'lib/angular/angular-resource.min',
            'angular-ui-router': 'lib/angular/angular-ui-router',
            'oclazyLoad': 'lib/ocLazyLoad/ocLazyLoad.min',
            'base64': 'lib/jquery/jquery.base64',
            'cookie': 'lib/jquery/jquery.cookie',
            'ChineseDistricts': 'lib/distpicker/ChineseDistricts',
            'distpicker': 'lib/distpicker/distpicker',
            'cropbox': 'lib/cropbox/cropbox',
            'pagination': 'lib/pagination/tm.pagination',
            'paging': 'lib/jquery/jquery.paging',
            'superSlide': 'lib/superslide/jquery.SuperSlide2',
            'dialog': 'lib/dialog/dialog',
            'ymdClass': 'lib/ymdClass/YMDClass',
            'layer': 'lib/layui/lay/modules/layer',
            'app': 'js/app',
            'route': 'js/j_common/route',
            'directive': 'js/j_common/directive'
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
            },
            'ChineseDistricts': {
                deps: ['jquery'],
                exports: 'ChineseDistricts'
            },
            'distpicker': {
                deps: ['jquery'],
                exports: 'distpicker'
            },
            'cropbox': {
                deps: ['jquery'],
                exports: 'cropbox'
            },
            'pagination': {
                deps: ['angular'],
                exports: 'pagination'
            },
            'paging': {
                deps: ['jquery'],
                exports: 'paging'
            },
            'superSlide': {
                deps: ['jquery'],
                exports: 'superSlide'
            },
            'dialog': {
                deps: ['jquery'],
                exports: 'dialog'
            },
            'ymdClass': {
                deps: ['jquery'],
                exports: 'ymdClass'
            },
            'layer': {
                deps: ['jquery'],
                exports: 'layer'
            }
        },
        waitSeconds: 15
    });

    /**
     * init main
     * 自动导入app.js,index.js模块
     */
    require(['app', 'route', 'directive', 'cropbox', 'pagination', 'paging', 'dialog', 'ymdClass', 'layer'], function (app) {
        // 手动启动angularjs，特别说明此处的bootstrap不是那个ui框架，而是angularjs的一个手动启动框架的函数
        app.init();
    })
}();