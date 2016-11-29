define([ 'app','jquery'], function (app) {
	 
    app.directive('myHeader', function () {
        return {
            templateUrl:  "view/common/_header.html"
//          link: function (scope, element, attr) {
////              app.handleToggle();
////              app.handleSlimScroll();
////              app.handlePulsate();
//          }
        };
    });
    
    app.directive('myTelephone', function () {
        return {
            templateUrl:  "view/v_user_center/revise_phone_1.html"
//          link: function (scope, element, attr) {
////              app.handleToggle();
////              app.handleSlimScroll();
////              app.handlePulsate();
//          }
        };
    });
    
  
  
//  
  app.directive('myFooter', function () {
      return {
          templateUrl:  "view/common/_footer.html"
////          link: function (scope, element, attr) {
//////              app.handleToggle();
//////              app.handleSlimScroll();
//////              app.handlePulsate();
////          }
      };
  });
  //require(['js/j_selfman_center/bind_phone'],function(){});

});