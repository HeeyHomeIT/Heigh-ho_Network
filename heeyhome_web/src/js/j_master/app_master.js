/**
 * Created by Administrator on 2016/11/23.
 */
define(['angular', 'require', 'angular-resource', 'angular-route'], function (angular, require) {

    var app = angular.module('masterApp', ['ngResource', 'ngRoute']);

    app.init = function () {
        angular.bootstrap(document, ['masterApp']);
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
    app.config(['$routeProvider', '$controllerProvider',
        function ($routeProvider, $controllerProvider) {
            $routeProvider
            /*我的主页*/
                .when('/', {
                    templateUrl: 'view/v_master_user/master_home.html'
                })
                /*个人资料*/
                .when('/personal_information', {
                    templateUrl: 'view/v_master_user/personal_information.html',
                    controller: 'personal_information',
                    // resolve用来在完成路由前处理一些事
                    // 这里用来动态加载并注入相应的控制器
                    resolve: {
                        // ctrlRegister为我自己写的一个复用的函数，
                        // 用于注入控制器。见第三部分
                        delay: ctrlRegister('personal_information', ['js/j_master/personal_information'])
                    }
                })
                /*店铺资料*/
                .when('/my_shop', {
                    templateUrl: 'view/v_master_user/my_shop.html'
                })
                /*我的订单*/
                .when('/my_order', {
                    templateUrl: 'view/v_master_user/my_order.html'
                })
                /*我的作品*/
                .when('/my_works', {
                    templateUrl: 'view/v_master_user/my_works.html',
                    controller: 'my_works',
                    // resolve用来在完成路由前处理一些事
                    // 这里用来动态加载并注入相应的控制器
                    resolve: {
                        // ctrlRegister为我自己写的一个复用的函数，
                        // 用于注入控制器。见第三部分
                        delay: ctrlRegister('my_works', ['js/j_master/my_works'])
                    }
                })
                /*我的团队*/
                .when('/my_team', {
                    templateUrl: 'view/v_master_user/my_team.html',
                    controller: 'my_team',
                    // resolve用来在完成路由前处理一些事
                    // 这里用来动态加载并注入相应的控制器
                    resolve: {
                        // ctrlRegister为我自己写的一个复用的函数，
                        // 用于注入控制器。见第三部分
                        delay: ctrlRegister('my_team', ['js/j_master/my_team'])
                    }
                })
                /*安全设置*/
                .when('/safe_set', {
                    templateUrl: 'view/v_master_user/safe_set.html'
                })
                /*消息中心*/
                .when('/information_center', {
                    templateUrl: 'view/v_master_user/information_center.html'
                })
                /*我的钱包*/
                .when('/my_wallet', {
                    templateUrl: 'view/v_master_user/my_wallet.html'
                })
                .otherwise({
                    redirectTo: '/master_home'
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