/**
 * Created by Administrator on 2016/12/2.
 */
!function () {
    //config requirejs
    require.config({
        baseUrl: './',
        paths: {
            'angular': 'lib/angular/angular.min',
            'angular-route': 'lib/angular/angular-route.min',
            'text': 'lib/requirejs/text',
            'angular-resource': 'lib/angular/angular-resource',
            'angular-ui-router': 'lib/angular/angular-ui-router',
            'jquery': 'lib/jquery/jquery-2.1.1.min',
            'bootstrap': 'lib/bootstrap/bootstrap',
            'carousel': 'js/j_index/carousel',
            'app': 'js/app2',
            'index': 'js/index2'

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
            },
            'angular-route': {
                deps: ['angular'],
                exports: 'angular-route'
            },
            'angular-ui-router': {
                deps: ['angular'],
                exports: 'ui.router'
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
    /*require(['angular', 'index', 'bootstrap'], function (angular, index, bootstrap) {
     // 手动启动angularjs，特别说明此处的bootstrap不是那个ui框架，
     // 而是angularjs的一个手动启动框架的函数
     angular.bootstrap(document, ['blogApp']);
     });*/
    require(['app', 'index'], function (app) {
        app.init();
    })
}();

