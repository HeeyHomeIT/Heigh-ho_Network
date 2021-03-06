define(['app','bootstrap', 'js/j_common/common', 'js/j_index/interactive', 'js/j_index/indexCal','easemob', 'js/j_index/commonNav','js/j_index/404','js/j_pay/success_pay'], function(app, bootstrap) {
	/**
	 * 头部
	 */
	app.directive('indexHeader', function() {
		return {
			templateUrl: "view/v_common/_header.html",
			link: function(scope, iElement, iAttrs) {
//				if(iElement.context.id == "center_header"){
//					$("#"+iElement.context.id).find("#menuNav").remove();
//					
//				}
				app.headerWrapHandler();
			}
		};
	});

	/**
	 * 首页
	 */
	app.directive('vCarousel', function() {
		return {
			templateUrl: "view/v_index/v_carousel.html",
			link: function(scope, iElement, iAttrs) {
				app.indexWrapHandler();
			}
		};
	});

	app.directive('vFlow', function() {
		return {
			templateUrl: "view/v_index/v_flow.html"
		};
	});

	app.directive('vPanorama', function() {
		return {
			templateUrl: "view/v_index/v_panorama.html"
		};
	});

	app.directive('vCalculator', function() {
		return {
			templateUrl: "view/v_cal/v_cal.html",
			link: function(scope, iElement, iAttrs) {
				app.indexCalWrapHandler();
			}
		};
	});

	app.directive('vAppointment', function() {
		return {
			templateUrl: "view/v_index/v_appointment.html"
		};
	});
	
	/**
	 * 虚拟现实
	 */
	app.directive('vrContent', function() {
		return {
			templateUrl: "view/v_panorama/v_panorama.html"
		};
	});

	app.directive('vrFliter', function() {
		return {
			templateUrl: "view/v_common/_fliter.html"
		};
	});

	app.directive('vrPagewrap', function() {
		return {
			templateUrl: "view/v_common/_pagewrap.html"
		};
	});
	/**
	 * 工长店铺
	 */
	app.directive('shopContent', function() {
		return {
			templateUrl: "view/v_shoplist/v_shoplist.html"
		};
	});
	
	app.directive('shopFliter', function() {
		return {
			templateUrl: "view/v_common/_fliter.html"
		};
	});

	app.directive('shopPagewrap', function() {
		return {
			templateUrl: "view/v_common/_pagewrap.html"
		};
	});
	
	/**
	 * 家装百科
	 */
	app.directive('gonglveTitle', function() {
		return {
			templateUrl: "view/v_gonglve/v_gonglve_title.html"
		};
	});
	
	app.directive('gonglvePagewrap', function() {
		return {
			templateUrl: "view/v_common/_pagewrap.html"
		};
	});
	
	/**
	 * 结尾
	 */
	app.directive('indexFooter', function() {
		return {
			templateUrl: "view/v_common/_footer.html"
		};
	});
	
	/**
	 * 404
	 */
	app.directive('errorContent', function() {
		return {
			templateUrl: "view/v_404/404_detail.html",
			link: function(scope, iElement, iAttrs) {
				app.errorWrapHandler();
			}
		};
	});
	
	/**
	 * 支付成功
	 */
	app.directive('spayContent', function() {
		return {
			templateUrl: "view/v_pay/v_success_pay_end.html",
			link: function(scope, iElement, iAttrs) {
				app.successPayWrapHandler();
			}
		};
	});
	
	/**
	 * 导航
	 */
	app.directive('indexNav', function() {
		return {
			templateUrl: "view/v_common/_nav.html",
			link: function(scope, iElement, iAttrs) {
				app.indexNavWrapHandler();
			}
		};
	});

	/**
	 * 材料导航
	 */
	app.directive('ordermaterialNav', function() {
		return {
			templateUrl: "view/v_center/orderMaterial_nav.html",
			link: function(scope, iElement, iAttrs) {
				app.indexNavWrapHandler();
			}
		};
	});

    /**
     * 工长我的钱包提现repeat执行完成之后的事件
     */
    app.directive('repeatFinish',function(){
        return {
            link: function(scope,element,attr){
                if(scope.$last == true){
                    scope.$eval( attr.repeatFinish )
                }
            }
        }
    })
});