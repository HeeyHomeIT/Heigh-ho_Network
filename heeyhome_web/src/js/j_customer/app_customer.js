/**
 * Created by Administrator on 2016/11/23.
 */
define(['angular', 'angular-resource', 'angular-route', 'ChineseDistricts', 'distpicker', 'pagination'], function (angular) {

    var app = angular.module('customerApp', ['ngResource', 'ngRoute', 'tm.pagination']);

    app.init = function () {
        angular.bootstrap(document, ['customerApp']);
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
    app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
        }]);

    app.config(['$routeProvider', '$controllerProvider', '$httpProvider', function ($routeProvider, $controllerProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'view/v_customer_user/customer_first.html'
            })

            .when('/personal_data', {
                templateUrl: 'view/v_customer_user/personal_data.html',
                controller: 'personal_data',
                // resolve用来在完成路由前处理一些事
                // 这里用来动态加载并注入相应的控制器
                resolve: {
                    // ctrlRegister为我自己写的一个复用的函数，
                    // 用于注入控制器。见第三部分
                    delay: ctrlRegister('personal_data', ['js/j_customer/personal_data'])
                }
            })

            .when('/my_order', {
                templateUrl: 'view/v_customer_user/my_order.html',
                controller: 'my_order',
                resolve: {
                    // ctrlRegister为我自己写的一个复用的函数，
                    // 用于注入控制器。见第三部分
                    delay: ctrlRegister('my_order', ['js/j_customer/my_order'])
                }
            })

            .when('/my_collection', {
                templateUrl: 'view/v_customer_user/my_collection.html',
                controller: 'my_collection',
                // resolve用来在完成路由前处理一些事
                // 这里用来动态加载并注入相应的控制器
                resolve: {
                    // ctrlRegister为我自己写的一个复用的函数，
                    // 用于注入控制器。见第三部分
                    delay: ctrlRegister('my_collection', ['js/j_customer/my_collection'])
                }
            })

            .when('/information_center', {
                templateUrl: 'view/v_customer_user/information_center.html'
            })

            .when('/safe', {
                templateUrl: 'view/v_customer_user/safe.html'
            })

            .when('/shipping_address', {
                templateUrl: 'view/v_customer_user/shipping_address.html'
            })

            .otherwise({
                redirectTo: '/customer_first'
            });

        function ctrlRegister(ctrlName, ctrlModule) {
            return function ($q) {
                var defer = $q.defer();
                // 加载该控制器，并将返回值赋给controller，返回值一般是一个控制器函数
                require(ctrlModule, function (controller) {
                    // 将返回值注册为名称为ctrlName的控制器
                    $controllerProvider.register(ctrlName, controller);

                    defer.resolve();
                });
                // 完成注册
                return defer.promise;
            }
        }

    }]);


    app.run(function () {
        //run some code here ...
    });

    return app;

});