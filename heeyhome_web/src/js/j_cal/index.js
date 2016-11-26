define(['app','jquery'], function (app) {
    app.directive('myHeader', function () {
        return {
            templateUrl: "view/common/_header.html",
//          link: function (scope, element, attr) {
//              app.handleToggle();
//              app.handleSlimScroll();
//              app.handlePulsate();
//          }
        };
    });
    
    app.directive('myCal', function () {
        return {
        	templateUrl: "view/v_calpage/v_cal.html",
//          link: function (scope, element, attrs) {
//              scope.creator.createLayout();
//          }
        };
    });

    app.directive('myFooter', function () {
        return {
            templateUrl: "view/common/_footer.html",
//          link: function (scope, element, attr) {
//              element.addClass("red");
//          }
        };
    });
    require(['js/j_common/common','js/j_cal/cal'],function(){
	})
});