
/*此处不可以添加代码*/

/**
 * 闭包
 * 此处加一些备注说明
 */
(function(){

    /*所有代码写在这里，闭包外部不允许出现代码*/


    /**
     * 需要require的公共方法或组件
     */
    var TCGNY = require('');
    /*外部引用的对象 或 bridge相关的代码 可以放在此处 */

    /*定义一个类*/
    var detail = {
        /*所有“全局”变量定义在该对象下，在方法的上方，全部通过detail.变量名 访问 */
        lineId: $("#lineId").val(), //需要使用的变量及函数统一定义在detail对象里
        proType: $("#proType").val(), //产品类型 
        /**
         * 必须有一个入口方法
         */
        init:function(){
            /**
             * 公共业务代码
             */
            detail.initEvent();
        },
        /**
         * 所有事件的绑定根据功能模块统一写在同一个方法里，根据业务调用*
         */
        initEvent: function(){
        	var self = this;
        	$(document).on(click,li,function(){
        		self.initTrainEvent()
        	})
        	.on(click,li,function(){//
        		self.initTrainEvent()
        	})
        	.on(click,li,function(){
        		self.initTrainEvent()
        	})
        	.on(click,li,function(){
        		self.initTrainEvent()
        	})
        	.on(click,li,function(){
        		self.initTrainEvent()
        	})
        	.on(click,li,function(){
        		self.initTrainEvent()
        	})

            /*公共业务事件绑定*/
        },
        
        /**
         * 相关功能事件绑定
         */
        initTrainEvent: function(){
        	detailHendler.append1()
        	detailHendler.append2()
            //找到相关功能的容器 缓存起来
            var train_order = $(".J_trainOrder");
            /**
             * 通过该功能模块父容器 代理委托 绑定具体的事件
             * 给某一个父容器下面的 按钮绑定事件
             */
            train_order.on("click", ".J_other_train .J_btn1", function(){
                alert("btn1");
            });

            /**
             * 按钮2事件绑定
             */
            train_order.on("click", ".J_other_train .J_btn2", function(){
                alert("btn2");
            });
            this.append();
        },
       
    };

    detailHendler = {
    	append1: function(){
        	//kkkkkkkkkk
        },
        append2: function(){
        	//kkkkkkkkkk
        },
        append: function(){
        	//kkkkkkkkkk
        }, append: function(){
        	//kkkkkkkkkk
        }

    }
    //入口方法调用 代码只能从这里执行
    detail.init();

})();

/*此处不可以添加代码*/