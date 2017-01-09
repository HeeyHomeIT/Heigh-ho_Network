define(['app', 'angular-ui-router', 'oclazyLoad'], function (app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $stateProvider
                .state("home", { // 首页页面
                    url: "/",
                    views: {
                        'content': {
                            templateUrl: 'view/v_index/index_wrap.html'
                        }
                    }

                })
                .state('cal', { // 成本计算页面
                    url: '/cal',
                    views: {
                        'content': {
                            templateUrl: 'view/v_cal/v_cal.html',
                            controller: "calCtrl",
                            controllerAs: "cal"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_cal/cal.js')
                        }]
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
                            return $ocLazyLoad.load('js/j_center/interactive.js')
                        }]
                    }
                })
                .state("center.mhome", { // 用户个人中心主页
                    url: "/mhome",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/v_mypage.html',
                        }
                    },
                })
                .state("center.mdata", { // 用户个人中心-个人资料
                    url: "/mdata",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/v_mdata.html',
                            controller: "mDataCtrl",
                            controllerAs: "mdata"
                        }
                    }
                })
                .state("center.morder", { // 用户个人中心-我的订单
                    url: "/morder",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/v_morder.html',
                            controller: "mMorderCtrl",
                            controllerAs: "morder"
                        }
                    }
                })
                .state("morder_wrap", { // 用户个人中心-订单详情
                    url: "/morder_wrap",
                    views: {
                        'my_orderdetail': {
                            templateUrl: 'view/v_center/v_morder_wrap.html'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/interactive.js')
                        }]
                    }
                })
                .state("morder_wrap.morder_detail", { // 用户个人中心-查看订单详情
                    url: "/morder_detail",
                    views: {
                        'order_detail': {
                            templateUrl: 'view/v_center/v_morder_detail.html',
                            controller: "order_detailCtrl",
                            controllerAs: "order_detail"
                        }
                    }
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
                            controller: "msgCtrl",
                            controllerAs: "msgcenter"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["css/c_master/reminde.css", "css/c_master/dialog.css", "css/c_master/dialog-theme.css"]);
                        }]
                    }
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
                })
                .state("center.maddress", { // 用户个人中心-收货地址
                    url: "/maddress",
                    views: {
                        'user_right': {
                            templateUrl: 'view/v_center/v_address.html',
                            controller: "mAddressCtrl",
                            controllerAs: "maddress"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_center/maddress.js');
                        }]
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
                .state("shopdetails", { // 工长店铺详情
                    url: "/shopdetails",
                    views: {
                        'shop_content': {
                            templateUrl: 'view/v_shopdetails/v_shopdetail.html',
                            controller: "shopDetailCtrl",
                            controllerAs: "shopdetails"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/j_shopdetail/parabola.js', 'js/j_shopdetail/shopdetail.js']);
                        }]
                    }
                })
                .state('successcase', { // 更多成功案例
                    url: '/successcase',
                    views: {
                        'sc_content': {
                            templateUrl: 'view/v_successcase/v_successcase.html',
                            controller: "successcaseCtrl",
                            controllerAs: "successcase"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/j_successcase/successcase.js']);
                        }]
                    }
                })
                .state("reservation", { // 立即预订
                    url: "/reservation",
                    views: {
                        'reservation_content': {
                            templateUrl: 'view/v_reservation/v_startreservation.html',
                            controller: "reservationCtrl",
                            controllerAs: "reservation"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['lib/laydate/laydate.js', 'js/j_reservation/reservation.js']);
                        }]
                    }
                })
                .state("waitcontact", { // 等待联系和确认
                    url: "/waitcontact",
                    views: {
                        'reservation_content': {
                            templateUrl: 'view/v_reservation/v_waitcontact.html',
                            controller: "waitcontactCtrl",
                            controllerAs: "waitcontact"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/j_reservation/waitcontact.js']);
                        }]
                    }
                })
                .state("advancelist", { // 预支付清单
                    url: "/advancelist",
                    views: {
                        'reservation_content': {
                            templateUrl: 'view/v_reservation/v_advancePaymentList.html',
                            controller: "advancelistCtrl",
                            controllerAs: "advancelist"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/j_reservation/advancePaymentList.js']);
                        }]
                    }
                })
                .state("calresult", { // 计算结果
                    url: "/calresult",
                    views: {
                        'calresult_content': {
                            templateUrl: 'view/v_cal/v_calresult.html',
                            controller: "calresultCtrl",
                            controllerAs: "calresult"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/j_cal/calresult.js']);
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
                            templateUrl: 'view/v_master/my_order.html',
                            controller: "mOrderCtrl",
                            controllerAs: "morder"
                        }
                    }
                })
                .state("order", { // 工长个人中心我的订单进度更新
                    url: "/order",
                    views: {
                        'order_content': {
                            templateUrl: 'view/v_master/order.html'
                        }
                    }
                })
                .state("order.home", { // 工长个人中心我的订单进度更新
                    url: "/home",
                    views: {
                        'my_order': {
                            templateUrl: 'view/v_master/order_home.html',
                            controller: 'order',
                            controllerAs: 'order'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/interactive.js')
                        }]
                    }
                })
                .state("budget_sheet", { // 工长个人中心-预算结算单
                    url: "/budget_sheet",
                    views: {
                        'budget_sheet': {
                            templateUrl: 'view/v_master/budget_sheet.html',
                        }
                    }
                })
                .state("budget_sheet.edit_sheet", { // 工长个人中心-编辑预算结算单
                    url: "/edit_sheet",
                    views: {
                        'edit_sheet': {
                            templateUrl: 'view/v_master/edit_sheet.html',
                            controller: 'edit_sheetCtrl',
                            controllerAs: 'edit_sheet'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/interactive.js')
                        }]
                    }
                })
                .state("material", { // 材料清单
                    url: "/material",
                    views: {
                        'material': {
                            templateUrl: 'view/v_master/material_wrap.html',
                            controller: 'materialCtrl',
                            controllerAs: 'material'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/interactive.js')
                        }]
                    }
                })
                .state("material.list", { // 材料清单-具体内容
                    url: "/list",
                    views: {
                        'material_type': {
                            templateUrl: 'view/v_master/material_list.html',
                            controller: 'listCtrl',
                            controllerAs: 'list'
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
                .state("master.newwork", { // 工长个人中心-添加新作品
                    url: "/mwork/newwork",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/addNewWork.html',
                            controller: "newworkCtrl",
                            controllerAs: "newwork"
                        }
                    }
                })
                .state("success", { // 成功案例
                    url: "/success",
                    views: {
                        'success_content': {
                            templateUrl: 'view/v_master/success_wrap.html'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/interactive.js')
                        }]
                    }
                })
                .state("success.success_case", { // 成功案例
                    url: "/success_case",
                    views: {
                        'success_case': {
                            templateUrl: 'view/v_master/success.html',
                            controller: 'success_caseCtrl',
                            controllerAs: 'success_case'
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
                .state("master.teamDetail", { // 工长个人中心-我的团队具体内容
                    url: "/teamDetail",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/teamDetail.html',
                            controller: "teamDetailCtrl",
                            controllerAs: "teamDetail"
                        }
                    }
                })
                .state("master.teamDetail_list", { // 工长个人中心-我的员工详细
                    url: "/teamDetail_list",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/teamDetail_list.html',
                            controller: "teamDetail_listCtrl",
                            controllerAs: "teamDetail_list"
                        }
                    }
                })
                .state("master.teamDetail_edit", { // 工长个人中心-我的员工编辑
                    url: "/teamDetail_edit",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/teamDetail_edit.html',
                            controller: "teamDetail_editCtrl",
                            controllerAs: "teamDetail_edit"
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
                            templateUrl: 'view/v_master/information_center.html',
                            controller: "msginfoCtrl",
                            controllerAs: "msginfo"

                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["css/c_master/reminde.css", "css/c_master/dialog.css", "css/c_master/dialog-theme.css"]);
                        }]
                    }
                })

                .state("master.mwallet", { // 工长个人中心-我的钱包
                    url: "/mwallet",
                    views: {
                        'master_right': {
                            templateUrl: 'view/v_master/my_wallet.html',
                            controller: 'billCtrl',
                            controllerAs: "mwallet"
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/interactive.js')
                        }]
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
                })
                .state("withdraw", { // 工长个人中心我的钱包提现
                    url: "/withdraw",
                    views: {
                        'withdraw_content': {
                            templateUrl: 'view/v_master/withdraw.html'
                        }
                    }
                })
                .state("withdraw.home", { // 工长个人中心我的钱包提现
                    url: "/home",
                    views: {
                        'my_withdraw': {
                            templateUrl: 'view/v_master/withdraw_home.html',
                            controller: 'withdraw',
                            controllerAs: 'home'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/interactive.js')
                        }]
                    }
                })
                .state("bank", { // 工长个人中心我的钱包我的银行卡
                    url: "/bank",
                    views: {
                        'bank_content': {
                            templateUrl: 'view/v_master/bank.html'
                        }
                    }
                })
                .state("bank.home", { // 工长个人中心我的钱包我的银行卡
                    url: "/home",
                    views: {
                        'my_bank': {
                            templateUrl: 'view/v_master/bank_home.html',
                            controller: 'bank',
                            controllerAs: 'home'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/interactive.js')
                        }]
                    }
                })
                .state("bank.add_process1", { // 工长个人中心我的钱包我的银行卡第一步
                    url: "/add_process1",
                    views: {
                        'my_bank': {
                            templateUrl: 'view/v_master/add_process1.html',
                            controller: 'process1',
                            controllerAs: 'add_process1'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/interactive.js')
                        }]
                    }
                })
                .state("bank.add_process2", { // 工长个人中心我的钱包我的银行卡第二步
                    url: "/add_process2",
                    views: {
                        'my_bank': {
                            templateUrl: 'view/v_master/add_process2.html',
                            controller: 'process2',
                            controllerAs: 'add_process2'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/interactive.js')
                        }]
                    }
                })
                .state("bank.add_process3", { // 工长个人中心我的钱包我的银行卡第三步
                    url: "/add_process3",
                    views: {
                        'my_bank': {
                            templateUrl: 'view/v_master/add_process3.html',
                            controller: 'process3',
                            controllerAs: 'add_process3'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/interactive.js')
                        }]
                    }
                })
                .state("bank.add_process4", { // 工长个人中心我的钱包我的银行卡第四步
                    url: "/add_process4",
                    views: {
                        'my_bank': {
                            templateUrl: 'view/v_master/add_process4.html',
                            controller: 'process4',
                            controllerAs: 'add_process4'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/j_master/interactive.js')
                        }]
                    }
                });

            $urlRouterProvider.when('', '/')
                .when('/center', '/center/mhome')
                .when('/master', '/master/mhome')
                .when('/success', '/success/success_case')
                .when('/withdraw', '/withdraw/home')
                .when('/order', '/order/home')
                .when('/budget_sheet', '/budget_sheet/edit_sheet')
                .when('/bank', '/bank/home')
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