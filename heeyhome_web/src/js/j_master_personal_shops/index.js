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

    app.directive('vMasterUser', function () {
        return {
            templateUrl: "view/v_master_user/v_master_user.html"
//          link: function (scope, element, attrs) {
//              scope.creator.createLayout();
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
    require(['js/j_customer/left_common'], function () {
    })
});
