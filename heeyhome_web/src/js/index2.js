/**
 * Created by Administrator on 2016/11/30.
 */
/**
 * Created by Administrator on 2016/11/23.
 */
define(['app', 'jquery'], function (app) {
    app.directive('myHeader', function () {
        return {
            templateUrl: "view/common/_header.html"
//          link: function (scope, element, attr) {
//              app.handleToggle();
//              app.handleSlimScroll();
//              app.handlePulsate();
//          }
        };
    });

    app.directive('myFooter', function () {
        return {
            templateUrl: "view/common/_footer.html"
//          link: function (scope, element, attr) {
//              element.addClass("red");
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

    app.directive('myCal', function () {
        return {
            templateUrl: "view/v_calpage/v_cal.html"
//          link: function (scope, element, attrs) {
//              scope.creator.createLayout();
//          }
        };
    });

    app.directive('myReality', function () {
        return {
            templateUrl: "view/v_reality/virtual_reality.html"
//          link: function (scope, element, attrs) {
//              scope.creator.createLayout();
//          }
        };
    });

    app.directive('myPagenumber', function () {
        return {
            templateUrl: "view/common/_pagenumber.html"
//          link: function (scope, element, attrs) {
//              scope.creator.createLayout();
//          }
        };
    });
    app.directive('myFliter', function () {
        return {
            templateUrl: "view/common/_fliter.html"
        };
    });

    app.directive('myForeshop', function () {
        return {
            templateUrl: "view/v_foreman_shop/foreman_shop.html"
        };
    });
    app.directive('myPediatop', function () {
        return {
            templateUrl: "view/v_pedia/pedia_top.html"
        };
    });

    app.directive('myPediacnt', function () {
        return {
            templateUrl: "view/v_pedia/decoration_pedia.html"
        };
    });
    /*require(['js/j_customer/left_common'], function () {
     })*/
});
