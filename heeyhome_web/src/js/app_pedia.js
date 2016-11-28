define(['angular','angular-resource','angular-route'],function(angular){
	var app = angular.module('pediaApp',['ngResource','ngRoute']);
	app.init = function(){
		angular.bootstrap(document,['pediaApp']);
	};
//	app.config(function($controllerProvider,$provide,$compileProvider,$resourceProvider){
//		// 保存旧的引用.
//		app.directive = app.directive;
//		app.directive = function(name,factory){
//			$compileProvider.directive(name,factory);
//			return this;
//		};
//		$resourceProvider.defaults.stripTrailingSlashes = false;
//	});
//	app.run(function(){
//		
//	});
	app.config(['$routeProvider', '$controllerProvider', '$provide', '$compileProvider', '$filterProvider', 
    function ($routeProvider, $controllerProvider, $provide, $compileProvider, $filterProvider) {  
        app.register = {  
            controller: $controllerProvider.register,  
            factory: $provide.factory,  
            service: $provide.service,  
            filter: $filterProvider.register,  
            directive: $compileProvider.directive  
        };  
        $routeProvider  
            .when('/',{  
                redirectTo: '/pedia_right_1'  
            })  
            .when('/pedia_right_1',{  
                templateUrl: 'view/v_pedia/pedia_right_1.html',  
 //               controller: 'DashboardCtrl',  
 //               resolve: resolveController(['standardDashboard', 'd3','radialProgress','highcharts'])  
            })  
            .when('/pedia_right_2',{  
                templateUrl: 'view/v_pedia/pedia_right_2.html', 
 //               controller: 'DashboardCtrl',  
 //               resolve: resolveController(['standardDashboard', 'd3','radialProgress','highcharts'])  
            })  
            .when('/pedia_right_3',{  
                templateUrl: 'view/v_pedia/pedia_right_3.html',  
 //               controller: 'DashboardCtrl',  
 //               resolve: resolveController(['standardDashboard', 'd3','radialProgress','highcharts'])  
            })  
            .when('/pedia_right_4',{  
                templateUrl: 'view/v_pedia/pedia_right_4.html',  
 //               controller: 'DashboardCtrl',  
 //               resolve: resolveController(['standardDashboard', 'd3','radialProgress','highcharts'])  
            })  
           .when('/pedia_right_5',{  
                templateUrl: 'view/v_pedia/pedia_right_5.html',  
 //               controller: 'DashboardCtrl',  
 //               resolve: resolveController(['standardDashboard', 'd3','radialProgress','highcharts'])  
            })   
            .when('/pedia_right_6',{  
                templateUrl: 'view/v_pedia/pedia_right_6.html',  
 //               controller: 'DashboardCtrl',  
 //               resolve: resolveController(['standardDashboard', 'd3','radialProgress','highcharts'])  
            })  
            .when('/pedia_right_7',{  
                templateUrl: 'view/v_pedia/pedia_right_7.html',  
 //               controller: 'DashboardCtrl',  
 //               resolve: resolveController(['standardDashboard', 'd3','radialProgress','highcharts'])  
            })  
            .when('/pedia_right_8',{  
                templateUrl: 'view/v_pedia/pedia_right_8.html',  
 //               controller: 'DashboardCtrl',  
 //               resolve: resolveController(['standardDashboard', 'd3','radialProgress','highcharts'])  
            })  
            .when('/pedia_right_9',{  
                templateUrl: 'view/v_pedia/pedia_right_9.html',  
 //               controller: 'DashboardCtrl',  
 //               resolve: resolveController(['standardDashboard', 'd3','radialProgress','highcharts'])  
            })  
//          .when('/schedule',{  
//              templateUrl: 'schedule.html',  
//              controller: 'ScheduleCtrl',  
//              resolve: resolveController(['standardSchedule'])  
//          })  
//          .when('/channel',{  
//              templateUrl: 'channel.html',  
//              controller: 'ChannelCtrl',  
//              resolve: resolveController(['standardChannel'])  
//          })  
//          .when('/strategy-merge',{  
//              templateUrl: 'strategy-merge.html',  
//              controller: 'StrategyMergeCtrl',  
//              resolve: resolveController(['standardStrategyMerge'])  
//          })  
//          .when('/integrate',{  
//              templateUrl: 'integrate.html',  
//              controller: 'IntegrateCtrl',  
//              resolve: resolveController(['standardIntegrate'])  
//          })  
//          .when('/personalCenter',{  
//              templateUrl: 'personal-center.html',  
//              controller: 'PersonalCenterCtrl',  
//              resolve: resolveController(['standardPersonalCenter'])  
//          })  
            .otherwise({  
                redirectTo: '/pedia_right_1'  
            });  
  			
    }]);  
	return app;
});
