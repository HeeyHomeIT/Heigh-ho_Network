/**
 * Created by Administrator on 2016/11/23.
 */
define(['angular', 'require', 'angular-resource', 'angular-route','jquery-ui','superslide'], function (angular, require) {

    var app = angular.module('masterApp', ['ngResource', 'ngRoute']);

    app.init = function () {
        angular.bootstrap(document, ['masterApp']);
    };

    app.config(function ($controllerProvider, $provide, $compileProvider, $resourceProvider) {

     // 保存旧的引用.
     app._directive = app.directive;

     app.directive = function (name, factory) {
     $compileProvider.directive(name, factory);
     return (this);

     };

     $resourceProvider.defaults.stripTrailingSlashes = false;


     });

    app.run(function () {
        //run some code here ...

    });

    return app;

});