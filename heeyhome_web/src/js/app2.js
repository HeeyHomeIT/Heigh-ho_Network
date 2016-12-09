/**
 * Created by Administrator on 2016/12/2.
 */
define(['angular', 'require', 'angular-resource', 'angular-route', 'angular-ui-router', 'oclazyLoad','pagination'], function (angular, require) {

    var app = angular.module('newApp', ['ngResource', 'ngRoute', 'ui.router', "oc.lazyLoad",'tm.pagination']);

    app.init = function () {
        angular.bootstrap(document, ['newApp']);
    };

    app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
        }]);
    app.config(function ($httpProvider) {

        $httpProvider.defaults.transformRequest = function (obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        };

        $httpProvider.defaults.headers.post = {
            'Content-Type': 'application/x-www-form-urlencoded; charser=UTF-8'
        }

    });
    app.constant('Modules_Config', [
        {
            name: 'treeControl',
            serie: true,
            files: []
        }
    ]);
    app.config(["$ocLazyLoadProvider", "Modules_Config", routeFn]);
    function routeFn($ocLazyLoadProvider, Modules_Config) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: false,
            modules: Modules_Config
        });
    }

    app.config(['$stateProvider', '$urlRouterProvider','$httpProvider',
        function ($stateProvider, $urlRouterProvider,$httpProvider) {
            $stateProvider

                .state("home_page", {
                    url: "/",
                    views: {
                        'content': {
                            templateUrl: 'view/v_wrap/home_page.html'
                        }
                    },
                    controller: "mainCtrl",
                    controllerAs: "home_page",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_index/carousel.js')
                        }]
                    }
                })
                .state('cal_wrap', {
                    url: '/cal_wrap',
                    views: {
                        'content': {
                            templateUrl: 'view/v_wrap/cal_wrap.html'
                        }

                    }
                })
                .state('reality_wrap', {
                    url: '/reality_wrap',
                    views: {
                        'content': {
                            templateUrl: 'view/v_wrap/reality_wrap.html',
                            controller: "vrCtrl",
                            controllerAs: "reality_wrap"
                        }
                    },
                    resolve : {
                    	deps : ['$ocLazyLoad',function ($ocLazyLoad) {
                    		return $ocLazyLoad.load('js/j_reality/vr_detail.js')
                    	}]
                    }
                })
                .state('shop_wrap', {
                    url: '/shop_wrap',
                    views: {
                        'content': {
                            templateUrl: 'view/v_wrap/shop_wrap.html'
                        }

                    }
                })
                .state('bk', {
                    url: '/bk',
                    views: {
                        'content': {
                            templateUrl: 'view/v_pedia/decoration_pedia.html',
                            controller: "myCtrl",
                            controllerAs: "bk"
                        }

                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_pedia/pedia2.js')
                        }]
                    }
                });


            $urlRouterProvider.when('','/');

        }]);

    app.run(function () {
        //run some code here ...

    });

    return app;

});