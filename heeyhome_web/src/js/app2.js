/**
 * Created by Administrator on 2016/12/2.
 */
/**
 * Created by Administrator on 2016/11/30.
 */
/**
 * Created by Administrator on 2016/11/23.
 */
define(['angular', 'require', 'angular-resource', 'angular-route', 'angular-ui-router'], function (angular, require) {

    var app = angular.module('newApp', ['ngResource', 'ngRoute', 'ui.router']);

    app.init = function () {
        angular.bootstrap(document, ['newApp']);
    };

    /*app.config(function ($controllerProvider, $provide, $compileProvider, $resourceProvider) {

     // 保存旧的引用.
     app._directive = app.directive;

     app.directive = function (name, factory) {
     $compileProvider.directive(name, factory);
     return (this);

     };

     $resourceProvider.defaults.stripTrailingSlashes = false;


     });*/
    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state("home_page", {
                    url: "/",
                    views: {
                        'content': {
                            templateUrl: 'view/v_wrap/home_page.html'
                        }
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
                            templateUrl: 'view/v_wrap/reality_wrap.html'
                        }

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
                            templateUrl: 'view/v_pedia/decoration_pedia.html'
                        }

                    }
                })
                .state('bk.pedia_right_1', {
                    url: '/pedia_right_1',
                    views: {
                        'pedia': {
                            templateUrl: 'view/v_pedia/pedia_right_1.html'
                        }

                    }
                })
                .state('bk.pedia_right_2', {
                    url: '/pedia_right_2',
                    views: {
                        'pedia': {
                            templateUrl: 'view/v_pedia/pedia_right_2.html'
                        }

                    }
                })
                .state('bk.pedia_right_3', {
                    url: '/pedia_right_3',
                    views: {
                        'pedia': {
                            templateUrl: 'view/v_pedia/pedia_right_3.html'
                        }

                    }
                })
                .state('bk.pedia_right_4', {
                    url: '/pedia_right_4',
                    views: {
                        'pedia': {
                            templateUrl: 'view/v_pedia/pedia_right_4.html'
                        }

                    }
                })
                .state('bk.pedia_right_5', {
                    url: '/pedia_right_5',
                    views: {
                        'pedia': {
                            templateUrl: 'view/v_pedia/pedia_right_5.html'
                        }

                    }
                })
                .state('bk.pedia_right_6', {
                    url: '/pedia_right_6',
                    views: {
                        'pedia': {
                            templateUrl: 'view/v_pedia/pedia_right_6.html'
                        }

                    }
                })
                .state('bk.pedia_right_7', {
                    url: '/pedia_right_7',
                    views: {
                        'pedia': {
                            templateUrl: 'view/v_pedia/pedia_right_7.html'
                        }

                    }
                })
                .state('bk.pedia_right_8', {
                    url: '/pedia_right_8',
                    views: {
                        'pedia': {
                            templateUrl: 'view/v_pedia/pedia_right_8.html'
                        }

                    }
                })
                .state('bk.pedia_right_9', {
                    url: '/pedia_right_9',
                    views: {
                        'pedia': {
                            templateUrl: 'view/v_pedia/pedia_right_9.html'
                        }

                    }
                });


            /*$urlRouterProvider.otherwise("/");*/
            // $urlRouterProvider.when('/decoration_pedia',{
            //     redirectTo: '/pedia_right_1'
            // }).otherwise('/');

            $urlRouterProvider.when('/bk','/bk/pedia_right_1').otherwise("/");

        }]);

    app.run(function () {
        //run some code here ...

    });

    return app;

});