define(['app', 'jquery'], function (app) {
    app.directive('myHeader', function () {
        return {
            templateUrl: "view/common/_header.html"
        };
    });

    app.directive('myFooter', function () {
        return {
            templateUrl: "view/common/_footer.html"
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
        };
    });

    app.directive('vVirtualReality', function () {
        return {
            templateUrl: "view/v_index/v_virtual_reality.html"
        };
    });

    app.directive('vCalculator', function () {
        return {
            templateUrl: "view/v_index/v_calculator.html"
        };
    });

    app.directive('vAppointment', function () {
        return {
            templateUrl: "view/v_index/v_appointment.html"
        };
    });

    app.directive('myCal', function () {
        return {
            templateUrl: "view/v_calpage/v_cal.html"
        };
    });

    app.directive('myReality', function () {
        return {
            templateUrl: "view/v_reality/virtual_reality.html"
        };
    });

    app.directive('myPagenumber', function () {
        return {
            templateUrl: "view/common/_pagenumber.html"
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
