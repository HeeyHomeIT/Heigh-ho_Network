
/*�˴���������Ӵ���*/

/**
 * �հ�
 * �˴���һЩ��ע˵��
 */
(function(){

    /*���д���д������հ��ⲿ��������ִ���*/


    /**
     * ��Ҫrequire�Ĺ������������
     */
    var TCGNY = require('');
    /*�ⲿ���õĶ��� �� bridge��صĴ��� ���Է��ڴ˴� */

    /*����һ����*/
    var detail = {
        /*���С�ȫ�֡����������ڸö����£��ڷ������Ϸ���ȫ��ͨ��detail.������ ���� */
        lineId: $("#lineId").val(), //��Ҫʹ�õı���������ͳһ������detail������
        proType: $("#proType").val(), //��Ʒ���� 
        /**
         * ������һ����ڷ���
         */
        init:function(){
            /**
             * ����ҵ�����
             */
            detail.initEvent();
        },
        /**
         * �����¼��İ󶨸��ݹ���ģ��ͳһд��ͬһ�����������ҵ�����*
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

            /*����ҵ���¼���*/
        },
        
        /**
         * ��ع����¼���
         */
        initTrainEvent: function(){
        	detailHendler.append1()
        	detailHendler.append2()
            //�ҵ���ع��ܵ����� ��������
            var train_order = $(".J_trainOrder");
            /**
             * ͨ���ù���ģ�鸸���� ����ί�� �󶨾�����¼�
             * ��ĳһ������������� ��ť���¼�
             */
            train_order.on("click", ".J_other_train .J_btn1", function(){
                alert("btn1");
            });

            /**
             * ��ť2�¼���
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
    //��ڷ������� ����ֻ�ܴ�����ִ��
    detail.init();

})();

/*�˴���������Ӵ���*/