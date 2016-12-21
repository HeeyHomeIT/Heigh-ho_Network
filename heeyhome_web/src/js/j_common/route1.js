/**
 * Created by Administrator on 2016/12/14.
 */
define(['app', 'angular-ui-router', 'oclazyLoad'], function (app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {
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
                            templateUrl: 'view/v_panorama/panorama_wrap.html',
                            controller: "panoramaCtrl",
                            controllerAs: "panorama"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['css/c_common/fliter.css', 'css/c_panorama/panorama.css', 'css/c_common/pagewrap.css', 'js/j_panorama/interactive.js'])
                        }]
                    }

                })
                .state('shoplist', { // 工长店铺页面
                    url: '/shoplist',
                    views: {
                        'content': {
                            templateUrl: 'view/v_shoplist/shoplist_wrap.html',
                            controller: "myShoplist",
                            controllerAs: "shoplist"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['css/c_common/fliter.css', 'css/c_shoplist/shoplist.css', 'css/c_common/pagewrap.css', 'js/j_shoplist/interactive.js'])
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
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['css/c_common/pagewrap.css', 'css/c_gonglve/gonglve_nav.css', 'css/c_gonglve/gonglve_title.css', 'js/j_gonglve/interactive.js'])
                        }]
                    }
                })
                .state('detail', { // 家装百科详情页面
                    url: '/detail',
                    views: {
                        'detail_content': {
                            templateUrl: 'view/v_gonglve/v_gonglve_detail.html',
                            controller: "myDetail",
                            controllerAs: "detail"
                        }

                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/j_gonglve/interactive.js'])
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
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/interactive1.js')
                        }]
                    }
                })
                .state("center.mhome", { // 用户个人中心主页
                    url: "/mhome",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/v_mypage.html',
                            controller: "homeCtrl",
                            controllerAs: "mhome"
                        }
                    }
                })
                .state("center.mdata", { // 用户个人中心-个人资料
                    url: "/mdata",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/v_mdata.html',
                            controller: "mDataCtrl",
                            controllerAs: "mdata"
                        }
                    },
                })
                .state("center.morder", { // 用户个人中心-我的订单
                    url: "/morder",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/v_morder.html',
                            controller: "mMorderCtrl",
                            controllerAs: "morder"
                        }
                    },
                })
                .state("center.mcollection", { // 用户个人中心-我的收藏
                    url: "/mcollection",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/v_mcollection.html',
                            controller: "mCollectionCtrl",
                            controllerAs: "mcollection"
                        }
                    },
                })
                .state("center.msgcenter", { // 用户个人中心-消息中心
                    url: "/msgcenter",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/v_msgcenter.html',
                        }
                    },
                })
                .state("center.setting", { // 用户个人中心-安全设置
                    url: "/setting",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/v_setting.html',
                            controller: "mSettingCtrl",
                            controllerAs: "setting"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.maddress", { // 用户个人中心-收货地址
                    url: "/maddress",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/v_address.html'
                        }
                    }
                })
                .state("center.authentication", { // 用户个人中心-身份验证
                    url: "/setting/authentication",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/authentication.html'
                        }
                    }
                })
                .state("center.authentication.authentication_1", { // 用户个人中心-身份验证
                    url: "/authentication_1",
                    views: {
                        'authentication': {
                            templateUrl: 'view/v_center/authentication_1.html',
                            controller: 'auth1',
                            controllerAs: "authentication_1"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.reset", { // 用户个人中心-修改密码
                    url: "/setting/reset",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/reset.html'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.reset.reset_1", { // 用户个人中心-修改密码
                    url: "/reset_1",
                    views: {
                        'reset': {
                            templateUrl: 'view/v_center/reset_1.html',
                            controller: 'reset1',
                            controllerAs: 'reset_1'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.reset.reset_2", { // 用户个人中心-修改密码
                    url: "/reset_2",
                    views: {
                        'reset': {
                            templateUrl: 'view/v_center/reset_2.html',
                            controller: 'reset2',
                            controllerAs: 'reset_2'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.reset.reset_3", { // 用户个人中心-修改密码
                    url: "/reset_3",
                    views: {
                        'reset': {
                            templateUrl: 'view/v_center/reset_3.html',
                            controller: 'reset3',
                            controllerAs: 'reset_3'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.reset.reset_4", { // 用户个人中心-修改密码
                    url: "/reset_4",
                    views: {
                        'reset': {
                            templateUrl: 'view/v_center/reset_4.html',
                            controller: 'reset4',
                            controllerAs: 'reset_4'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.reset.reset_5", { // 用户个人中心-修改密码
                    url: "/reset_5",
                    views: {
                        'reset': {
                            templateUrl: 'view/v_center/reset_5.html',
                            controller: 'reset5',
                            controllerAs: 'reset_5'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.reset.reset_6", { // 用户个人中心-修改密码
                    url: "/reset_6",
                    views: {
                        'reset': {
                            templateUrl: 'view/v_center/reset_6.html',
                            controller: 'reset6',
                            controllerAs: 'reset_6'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.bind", { // 用户个人中心-绑定手机
                    url: "/setting/bind",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/bind.html'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.bind.bind_phone_1", { // 用户个人中心-绑定手机
                    url: "/bind_phone_1",
                    views: {
                        'bind_phone': {
                            templateUrl: 'view/v_center/bind_phone_1.html',
                            controller: 'bind_phone1',
                            controllerAs: 'bind_phone_1'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.bind.bind_phone_2", { // 用户个人中心-绑定手机
                    url: "/bind_phone_2",
                    views: {
                        'bind_phone': {
                            templateUrl: 'view/v_center/bind_phone_2.html',
                            controller: 'bind_phone2',
                            controllerAs: 'bind_phone_2'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.bind.bind_phone_3", { // 用户个人中心-绑定手机
                    url: "/bind_phone_3",
                    views: {
                        'bind_phone': {
                            templateUrl: 'view/v_center/bind_phone_3.html',
                            controller: 'bind_phone3',
                            controllerAs: 'bind_phone_3'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.email", { // 用户个人中心-绑定邮箱
                    url: "/setting/email",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/email.html'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.email.email_1", { // 用户个人中心-绑定邮箱
                    url: "/email_1",
                    views: {
                        'email': {
                            templateUrl: 'view/v_center/email_1.html',
                            controller: 'emailOne',
                            controllerAs: 'email_1'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.email.email_2", { // 用户个人中心-绑定邮箱
                    url: "/email_2",
                    views: {
                        'email': {
                            templateUrl: 'view/v_center/email_2.html',
                            controller: 'emailTwo',
                            controllerAs: 'email_2'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                .state("center.email.email_3", { // 用户个人中心-绑定邮箱
                    url: "/email_3",
                    views: {
                        'email': {
                            templateUrl: 'view/v_center/email_3.html',
                            controller: 'emailThree',
                            controllerAs: 'email_3'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/safe.js')
                        }]
                    }
                })
                /* 工长个人中心 */
                .state("master", { // 工长个人中心
                    url: "/master",
                    views: {
                        'master_content': {
                            templateUrl: 'view/v_master/v_masterNav.html',
                            controller: "leftCtrl",
                            controllerAs: "master"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/interactive.js')
                        }]
                    }
                })
                .state("master.mhome", { // 工长个人中心主页
                    url: "/mhome",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/master_home.html',
                            controller: "mhomeCtrl",
                            controllerAs: "mhome"
                        }
                    }
                })
                .state("master.mdata", { // 工长个人中心-个人资料
                    url: "/mdata",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/personal_information.html',
                            controller: "mDataCtrl",
                            controllerAs: "mdata"
                        }
                    }
                })
                .state("master.mshop", { // 工长个人中心-店铺资料
                    url: "/mshop",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/my_shop.html',
                            controller: "mShopCtrl",
                            controllerAs: "mshop"
                        }
                    }
                })
                .state("master.morder", { // 工长个人中心-我的订单
                    url: "/morder",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/my_order.html'
                        }
                    }
                })
                .state("master.mwork", { // 工长个人中心-我的作品
                    url: "/mwork",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/my_works.html',
                            controller: "mWorkCtrl",
                            controllerAs: "mwork"
                        }
                    }
                })
                .state("master.mteam", { // 工长个人中心-我的团队
                    url: "/mteam",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/my_team.html',
                            controller: "mTeamCtrl",
                            controllerAs: "mteam"
                        }
                    }
                })
                .state("master.setting", { // 工长个人中心-安全设置
                    url: "/setting",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/safe_set.html',
                            controller: "SettingCtrl",
                            controllerAs: "setting"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.msginfo", { // 工长个人中心-消息中心
                    url: "/msginfo",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/information_center.html'
                        }
                    }
                })
                .state("master.mwallet", { // 工长个人中心-我的钱包
                    url: "/mwallet",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/my_wallet.html'
                        }
                    }
                })
                .state("master.authentication", { // 工长个人中心-身份验证
                    url: "/setting/authentication",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/authentication.html'
                        }
                    }
                })
                .state("master.authentication.authentication_1", { // 工长个人中心-身份验证
                    url: "/authentication_1",
                    views: {
                        'authentication': {
                            templateUrl: 'view/v_master/authentication_1.html',
                            controller: 'auth1',
                            controllerAs: "authentication_1"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.reset", { // 工长个人中心-修改密码
                    url: "/setting/reset",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/reset.html'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.reset.reset_1", { // 工长个人中心-修改密码
                    url: "/reset_1",
                    views: {
                        'reset': {
                            templateUrl: 'view/v_master/reset_1.html',
                            controller: 'reset1',
                            controllerAs: 'reset_1'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.reset.reset_2", { // 工长个人中心-修改密码
                    url: "/reset_2",
                    views: {
                        'reset': {
                            templateUrl: 'view/v_master/reset_2.html',
                            controller: 'reset2',
                            controllerAs: 'reset_2'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.reset.reset_3", { // 工长个人中心-修改密码
                    url: "/reset_3",
                    views: {
                        'reset': {
                            templateUrl: 'view/v_master/reset_3.html',
                            controller: 'reset3',
                            controllerAs: 'reset_3'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.reset.reset_4", { // 工长个人中心-修改密码
                    url: "/reset_4",
                    views: {
                        'reset': {
                            templateUrl: 'view/v_master/reset_4.html',
                            controller: 'reset4',
                            controllerAs: 'reset_4'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.reset.reset_5", { // 工长个人中心-修改密码
                    url: "/reset_5",
                    views: {
                        'reset': {
                            templateUrl: 'view/v_master/reset_5.html',
                            controller: 'reset5',
                            controllerAs: 'reset_5'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.reset.reset_6", { // 工长个人中心-修改密码
                    url: "/reset_6",
                    views: {
                        'reset': {
                            templateUrl: 'view/v_master/reset_6.html',
                            controller: 'reset6',
                            controllerAs: 'reset_6'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.bind", { // 工长个人中心-绑定手机
                    url: "/setting/bind",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/bind.html'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.bind.bind_phone_1", { // 工长个人中心-绑定手机
                    url: "/bind_phone_1",
                    views: {
                        'bind_phone': {
                            templateUrl: 'view/v_master/bind_phone_1.html',
                            controller: 'bind_phone1',
                            controllerAs: 'bind_phone_1'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.bind.bind_phone_2", { // 工长个人中心-绑定手机
                    url: "/bind_phone_2",
                    views: {
                        'bind_phone': {
                            templateUrl: 'view/v_master/bind_phone_2.html',
                            controller: 'bind_phone2',
                            controllerAs: 'bind_phone_2'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.bind.bind_phone_3", { // 工长个人中心-绑定手机
                    url: "/bind_phone_3",
                    views: {
                        'bind_phone': {
                            templateUrl: 'view/v_master/bind_phone_3.html',
                            controller: 'bind_phone3',
                            controllerAs: 'bind_phone_3'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.email", { // 工长个人中心-绑定邮箱
                    url: "/setting/email",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/email.html'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.email.email_1", { // 工长个人中心-绑定邮箱
                    url: "/email_1",
                    views: {
                        'email': {
                            templateUrl: 'view/v_master/email_1.html',
                            controller: 'emailOne',
                            controllerAs: 'email_1'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.email.email_2", { // 工长个人中心-绑定邮箱
                    url: "/email_2",
                    views: {
                        'email': {
                            templateUrl: 'view/v_master/email_2.html',
                            controller: 'emailTwo',
                            controllerAs: 'email_2'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                })
                .state("master.email.email_3", { // 工长个人中心-绑定邮箱
                    url: "/email_3",
                    views: {
                        'email': {
                            templateUrl: 'view/v_master/email_3.html',
                            controller: 'emailThree',
                            controllerAs: 'email_3'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/safe.js')
                        }]
                    }
                });

            $urlRouterProvider.when('', '/')
                .when('/center', '/center/mhome')
                .when('/master', '/master/mhome')
                /* 用户 */
                .when('/center/setting/bind', '/center/setting/bind/bind_phone_1')//绑定手机
                .when('/center/setting/email', '/center/setting/email/email_1')//绑定邮箱
                .when('/center/setting/authentication', '/center/setting/authentication/authentication_1')//身份验证
                .when('/center/setting/reset', '/center/setting/reset/reset_1')//修改密码
                /* 工长 */
                .when('/master/setting/bind', '/master/setting/bind/bind_phone_1')//绑定手机
                .when('/master/setting/email', '/master/setting/email/email_1')//绑定邮箱
                .when('/master/setting/authentication', '/master/setting/authentication/authentication_1')//身份验证
                .when('/master/setting/reset', '/master/setting/reset/reset_1');//修改密码


        }
    ]);
});