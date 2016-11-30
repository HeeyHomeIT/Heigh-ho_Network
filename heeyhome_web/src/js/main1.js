!function () {
    //config requirejs
    require.config({
        baseUrl: './',
        paths: {
            'angular': 'lib/angular/angular.min',
            'angular-route': 'lib/angular/angular-route.min',
            'text': 'lib/angular/text',
            'app': 'js/app',
            'index': 'js/index',
            'angular-resource': 'lib/angular/angular-resource',
            'jquery': 'lib/jquery/jquery-2.1.1.min',
            'bootstrap': 'lib/bootstrap/bootstrap',
            'carousel': 'js/j_index/carousel'

        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'angular-resource': {
                // angular-route依赖angular
                deps: ['angular'],
                exports: 'ngResource'
            },
            'bootstrap': {
                // angular-route依赖angular
                deps: ['jquery'],
                exports: 'bootstrap'
            }
        }
    });

//  //init main
//  require(['app','index'],
//      function (app) {
//          app.init();
//      }
//  );


    // 自动导入router.js模块，由于后缀名可以省略，故写作'router',
    // 并将模块返回的结果赋予到router中。
    require(['angular', 'index', 'bootstrap'], function (angular, index, bootstrap) {
        // 手动启动angularjs，特别说明此处的bootstrap不是那个ui框架，
        // 而是angularjs的一个手动启动框架的函数
        angular.bootstrap(document, ['blogApp']);
    });
}();

