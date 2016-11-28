define(['angular', 'angular-resource'],function(angular){
	
	var app = angular.module('vrApp', ['ngResource']);
	
	app.init = function(){
		angular.bootstrap(document,['vrApp']);
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

    app.run(function (){
        //run some code here ...
    });

    return app;
	
});