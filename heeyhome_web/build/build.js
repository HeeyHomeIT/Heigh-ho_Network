({
    appDir: './',
    baseUrl: './',
    dir: '../tempbuild',
    modules: [
        {
            name: 'js/main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: false,
    paths: {
        'jquery': 'lib/jquery/jquery-2.1.1.min',
            'bootstrap': 'lib/bootstrap/bootstrap.min',
            'angular': 'lib/angular/angular.min',
            'angular-route': 'lib/angular/angular-route.min',
            'angular-resource': 'lib/angular/angular-resource.min',
            'angular-ui-router': 'lib/angular/angular-ui-router',
            'oclazyLoad': 'lib/ocLazyLoad/ocLazyLoad.min',
            'base64': 'lib/jquery/jquery.base64',
            'cookie': 'lib/jquery/jquery.cookie',
            'ChineseDistricts': 'lib/distpicker/ChineseDistricts',
            'distpicker': 'lib/distpicker/distpicker',
            'cropbox': 'lib/cropbox/cropbox',
            'pagination': 'lib/pagination/tm.pagination',
            'paging': 'lib/jquery/jquery.paging',
            'superSlide': 'lib/superslide/jquery.SuperSlide2',
            'dialog': 'lib/dialog/dialog',
            'idCode': 'lib/jquery/jquery.idcode',
            'ymdClass': 'lib/ymdClass/YMDClass',
            'layer': 'lib/layui/lay/modules/layer',
            'app': 'js/app',
            'route': 'js/j_common/route',
            'directive': 'js/j_common/directive',
            'easemob':'//kefu.easemob.com/webim/easemob'
    },
    shim: {
        underscore: {
            exports: '_'
        },
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
            },
            'oclazyLoad': {
                deps: ['angular']
            },
            'base64': {
                deps: ['jquery'],
                exports: 'base64'
            },
            'cookie': {
                deps: ['jquery'],
                exports: 'cookie'
            },
            'ChineseDistricts': {
                deps: ['jquery'],
                exports: 'ChineseDistricts'
            },
            'distpicker': {
                deps: ['jquery'],
                exports: 'distpicker'
            },
            'cropbox': {
                deps: ['jquery'],
                exports: 'cropbox'
            },
            'pagination': {
                deps: ['angular'],
                exports: 'pagination'
            },
            'paging': {
                deps: ['jquery'],
                exports: 'paging'
            },
            'superSlide': {
                deps: ['jquery'],
                exports: 'superSlide'
            },
            'dialog': {
                deps: ['jquery'],
                exports: 'dialog'
            },
            'ymdClass': {
                deps: ['jquery'],
                exports: 'ymdClass'
            },
            'layer': {
                deps: ['jquery'],
                exports: 'layer'
            },
            'idCode': {
            	deps: ['jquery'],
				exports: 'idCode'
			}
    },
    optimize: "uglify2",
    uglify2: {
  		mangle: false //false 不混淆变量名
  	},
  	findNestedDependencies: true,
  	throwWhen: {

	  optimize: true
	
	}
})