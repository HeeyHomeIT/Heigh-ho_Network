/**
 * Created by Administrator on 2016/11/18.
 */
/**
 * Created by liuhuisheng on 2015/2/28.
 */
define(['angular', 'require', 'angular-resource', 'jquery'], function (angular, require) {

    var app = angular.module('blogApp', ['ngResource']);


    app.directive('myHeader', function () {
        return {
            templateUrl: "view/common/_header.html"
//          link: function (scope, element, attr) {
////              app.handleToggle();
////              app.handleSlimScroll();
////              app.handlePulsate();
//          }
        };
    });
    app.directive('myFooter', function () {
        return {
            templateUrl: "view/common/_footer.html"
//          link: function (scope, element, attr) {
////              app.handleToggle();
////              app.handleSlimScroll();
////              app.handlePulsate();
//          }
        };
    });
    app.directive('vCarousel', function () {
        return {
            templateUrl: "view/v_index/v_carousel.html"
        };
    });
    app.directive('vImprovementProcess', function () {
        return {
            templateUrl: "view/v_index/v_improvement_process.html"
//          link: function (scope, element, attr) {
////              app.handleToggle();
////              app.handleSlimScroll();
////              app.handlePulsate();
//          }
        };
    });
    app.directive('vVirtualReality', function () {
        return {
            templateUrl: "view/v_index/v_virtual_reality.html"
//          link: function (scope, element, attr) {
////              app.handleToggle();
////              app.handleSlimScroll();
////              app.handlePulsate();
//          }
        };
    });
    app.directive('vCalculator', function () {
        return {
            templateUrl: "view/v_index/v_calculator.html"
//          link: function (scope, element, attr) {
////              app.handleToggle();
////              app.handleSlimScroll();
////              app.handlePulsate();
//          }
        };
    });
    app.directive('vAppointment', function () {
        return {
            templateUrl: "view/v_index/v_appointment.html"
//          link: function (scope, element, attr) {
////              app.handleToggle();
////              app.handleSlimScroll();
////              app.handlePulsate();
//          }
        };
    });

    require(['carousel'], function () {
    });


    return app;
});



