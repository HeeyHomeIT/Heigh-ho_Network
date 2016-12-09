define(['app', 'angular-ui-router', 'oclazyLoad'], function(app) {
	app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
		function($stateProvider, $urlRouterProvider, $httpProvider) {
			$stateProvider
				.state("home", { // 首页页面
					url: "/",
					views: {
						'content': {
							templateUrl: 'view/v_index/index_wrap.html',
						}
					}
				})
				.state('cal', { // 成本计算页面
					url: '/cal',
					views: {
						'content': {
							templateUrl: 'view/v_cal/v_cal.html'
						}
					}
				})
				.state('panorama', { // 虚拟现实页面
					url: '/panorama',
					views: {
						'content': {
							templateUrl: 'view/v_panorama/panorama_wrap.html'
						}
					},
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load(['css/c_common/fliter.css', 'css/c_panorama/panorama.css', 'css/c_common/pagewrap.css'])
						}]
					}

				})
				.state('shoplist', { // 工长店铺页面
					url: '/shoplist',
					views: {
						'content': {
							templateUrl: 'view/v_shoplist/shoplist_wrap.html'
						}
					},
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load(['css/c_common/fliter.css', 'css/c_shoplist/shoplist.css', 'css/c_common/pagewrap.css'])
						}]
					}
				})
				.state('gonglve', { // 家装百科页面
					url: '/gonglve',
					views: {
						'content': {
							templateUrl: 'view/v_gonglve/v_gonglve_nav.html',
							controller: "myGonglve",
							controllerAs: "gonglve"
						}

					},
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load(['css/c_common/pagewrap.css', 'css/c_gonglve/gonglve_nav.css', 'css/c_gonglve/gonglve_title.css', 'js/j_gonglve/interactive.js'])
						}]
					}
				})
				.state("center", { // 用户个人中心
					url: "/center",
					views: {
						'center_content': {
							templateUrl: 'view/v_center/v_centernav.html',
							controller: "styleCtrl",
							controllerAs: "center"
						}
					},
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load('js/j_center/interactive.js')
						}]
					}
				})
				.state("center.mhome", {
					url: "/mhome",
					views: {
						'user_right': {
							templateUrl: 'view/v_center/v_mypage.html',
						}
					},
				})
				.state("center.mdata", {
					url: "/mdata",
					views: {
						'user_right': {
							templateUrl: 'view/v_center/v_mdata.html',
							controller: "mDataCtrl",
							controllerAs: "mdata"
						}
					},
				})
				.state("center.morder", {
					url: "/morder",
					views: {
						'user_right': {
							templateUrl: 'view/v_center/v_morder.html',
						}
					},
				})
				.state("center.mcollection", {
					url: "/mcollection",
					views: {
						'user_right': {
							templateUrl: 'view/v_center/v_mcollection.html',
							controller: "mCollectionCtrl",
							controllerAs: "mcollection"
						}
					},
				})
				.state("center.msgcenter", {
					url: "/msgcenter",
					views: {
						'user_right': {
							templateUrl: 'view/v_center/v_msgcenter.html',
						}
					},
				})
				.state("center.setting", {
					url: "/setting",
					views: {
						'user_right': {
							templateUrl: 'view/v_center/v_setting.html',
						}
					},
				})
				.state("center.maddress", {
					url: "/maddress",
					views: {
						'user_right': {
							templateUrl: 'view/v_center/v_address.html',
						}
					},
				});
				
			$urlRouterProvider.when('', '/').when('/center', '/center/mhome');
//			$urlRouterProvider.otherwise("/center");
			//			$urlRouterProvider.when('','/').when('/center','/center/mhome');

		}
	]);
});