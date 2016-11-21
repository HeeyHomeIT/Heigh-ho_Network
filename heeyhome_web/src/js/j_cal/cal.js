var heeyhomeCal = {
    init: function() {
        heeyhomeCal.areaInputEvent();
        heeyhomeCal.houseSelectEvent();
        heeyhomeCal.roomSelectEvent();
    },
    /**
     * 请输入您的户型面积input事件
     */
    areaInputEvent: function() {
        $(".c_area").on({
        	"focus":function(){
        		var _this = $(this);
        		var _val = _this.val();
        		var _placeholder = _this.attr("attr-placeholder");
        		if(_val == _placeholder){
        			_this.val("");
        		}
        	},
    		"blur":function(){
    			var _this = $(this);
    			var _val = $(this).val();
    			var _placeholder = _this.attr("attr-placeholder");
        		if(_val == ''){
        			_this.val(_placeholder);
        		}
//      		else{
//      			$(".cal2").addClass("col_eec988");
//      			$(".roomsdiv div").addClass("border_eec988").addClass("after_eec988 ");
//      		}
				var x = heeyhomeCal.errorEvent(_val);
				console.log(x);
				if(x!="ok"){
					$(".areadiv").find("label").text(x).addClass("whether").parent("div.areadiv").addClass("itemClickError");
				}
				
    		}
        });
    },
    /**
     * 户型选择
     */
    houseSelectEvent: function(){
    	var _houseSpan = $(".housediv div");
    	var _houseList = $(".housediv ul")
    	_houseSpan.on("click",function(e){
    		e.stopPropagation();
    		// 户型选择的选择框旁边小三角切换
    		if($(this).hasClass("item_hover_180")){
    			$(this).removeClass("item_hover_180");
    		}else{
    			$(this).addClass("item_hover_180")
    		}
    		//选择文本显示和隐藏
			$(this).find("ul").slideToggle('300');
    	});
    	//为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数
    	_houseList.delegate("li","click",function(){
    		$(this).parent().prev().text($(this).text());
    	});
    	
    	$(document).on("click",function(){
    		if(_houseSpan.hasClass("item_hover_180")){
    			_houseSpan.removeClass("item_hover_180");
    		}
        	_houseList.slideUp('300');
    	});
    },
    
    /**
     * 卧室选择
     */
	roomSelectEvent: function(){
		
	},
	/**
	 * 错误文本
	 * @param {Object} val 户型面积
	 */
	errorEvent:function(val){
		var NUM_70 = 70, NUM_160 = 160;
		var message = "";
		
		if (val < NUM_70 || val > NUM_160) {
            message = "小于70㎡或大于160㎡请咨询客服";
        }else{
        	message = "ok";
        }
		
		return message;
	}

};

$(function(){
	heeyhomeCal.init()	
})


