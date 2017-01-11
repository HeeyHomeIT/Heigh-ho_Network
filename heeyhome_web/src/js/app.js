define(['angular', 'require', 'angular-ui-router', 'oclazyLoad', 'ChineseDistricts', 'distpicker', 'pagination', 'paging', 'superSlide', 'dialog', 'ymdClass', 'layer', 'idCode'], function (angular, require) {

    var app = angular.module('heeyhomeApp', ['ui.router', "oc.lazyLoad", 'tm.pagination']);

    app.factory("interceptors", [function () {//数据没出来之前加载loading
        return {
            // if beforeSend is defined call it
            'request': function (request) {

                if (request.beforeSend)
                    request.beforeSend();

                return request;
            },
            // if complete is defined call it
            'response': function (response) {
                if (response.config.complete)
                    response.config.complete(response);
                return response;
            }
        };
    }]);


    app.init = function () {
        angular.bootstrap(document, ['heeyhomeApp']);
    };

    app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
        }
    ]);
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
    app.constant('Modules_Config', [{
        name: 'treeControl',
        serie: true,
        files: []
    }]);
    app.config(["$ocLazyLoadProvider", "Modules_Config", routeFn]);

    function routeFn($ocLazyLoadProvider, Modules_Config) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: false,
            modules: Modules_Config
        });
    }

    app.run(function () {
        //run some code here ...

    });

    return app;

});