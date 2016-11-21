///*入口脚本*/
//require.config({
//  baseUrl: "js/",
//  paths: {
//  	"jquery": "../lib/jquery/jquery-2.1.1.min",
//  	"text": "../lib/requirejs/text"
//  },
//  waitSeconds: 15
//});
//
//require(["j_index/index"], function(index) {
//  // todo
//});
/*入口脚本*/
'use strict';

//(function (win) {
//  require.config({
//      baseUrl: './',
//      // 依赖相对路径
//      paths: {               
//          'angular': 'lib/angular/angular.min',
//          'angular-route': 'lib/angular/angular-route.min'
//      },
//      // 引入没有使用requirejs模块写法的类库
//      shim: {
//          'angular': {
//              exports: 'angular'
//          },
//          'angular-route': {
//              // angular-route依赖angular
//              deps: ['angular'],
//              exports: 'ngRoute'
//          }
//      },
//      waitSeconds: 15
//  });
//  
//  // 自动导入router.js模块，由于后缀名可以省略，故写作'router',
//  // 并将模块返回的结果赋予到router中。
//  require(['angular','router'], function(angular,router){
//      // 手动启动angularjs，特别说明此处的bootstrap不是那个ui框架，
//      // 而是angularjs的一个手动启动框架的函数
//      angular.bootstrap(document, ['blogApp']);
//  });
//})(window);

!function () {
    //config requirejs
    require.config({
        baseUrl: './',
        paths: {
        	'angular': 'lib/angular/angular.min',
            'angular-route': 'lib/angular/angular-route.min',
            'jquery' : 'lib/jquery/jquery-1.11.3.min',
            'text': 'lib/requirejs/text',
            'angular-resource': 'lib/angular/angular-resource',
            'app' : 'js/app',
            'index' : 'js/j_cal/index'
        },
        shim: {
        	'angular': {
                exports: 'angular'
            },
        	'angular-resource': {
                // angular-route依赖angular
                deps: ['angular'],
                exports: 'ngResource'
           }
        },
        waitSeconds: 15
    });
    
	//init main
	require(['app','index'],function(app){
		app.init();
	})
}();
