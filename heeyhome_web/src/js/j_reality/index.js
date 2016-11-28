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
    
    app.directive('myReality', function () {
        return {
        	templateUrl: "view/v_reality/virtual_reality.html",
//          link: function (scope, element, attrs) {
//              scope.creator.createLayout();
//          }
        };
    });
    
    app.directive('myFliter', function () {
        return {
        	templateUrl: "view/common/_fliter.html",
//          link: function (scope, element, attrs) {
//              scope.creator.createLayout();
//          }
        };
    });
    
    app.directive('myPagenumber', function () {
        return {
        	templateUrl: "view/common/_pagenumber.html",
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
    require(['js/j_reality/vr_detail'],function(){
	})
});