define(['angular','angular-resource'],function(angular){
	var app = angular.module('foreshopApp',['ngResource']);
	app.init = function(){
		angular.bootstrap(document,['foreshopApp']);
	};
	app.config(function($controllerProvider, $provide, $compileProvider, $resourceProvider){
		app._directive = app.directive;
		 app.directive = function (name, factory) {
            $compileProvider.directive(name, factory);
            return (this);

        };
 
        $resourceProvider.defaults.stripTrailingSlashes = false;
	});
	app.run(function(){
		
	});
	return app;
})
