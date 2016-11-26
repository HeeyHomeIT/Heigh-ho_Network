var heeyhomeCommon = {
	init: function() {
		var self = this;
        self.searchBoxClickEvent();
        self.myHeeyHomeEvent();
    },
    /**
     * 搜索框点击事件
     */
    searchBoxClickEvent: function(){
    	var self = this;
    	$("#c_search_text").on({
    		"focus":function() {
    			var _this = $(this);
    			var _placeholder = _this.attr("attr-placeholder");
    			if(_this.val() == _placeholder) {
        			_this.val("");
        		}
    			$(".c_searchpop").show();
    		},
    		"blur":function() {
    			var _this = $(this);
    			var _placeholder = _this.attr("attr-placeholder");
    			var msgText; // 提示文本信息
    			if(_this.val() == '') {
        			_this.val(_placeholder);
        		}
    			$(".c_searchpop").hide();
    		}
    	});
    },
    myHeeyHomeEvent: function(){
    	$("#c_myhh").hover(function(){
			$(this).children("a").addClass("item_hover_180");
			$(this).children("div").css("height","112px");
			$(this).addClass("open");
    	},function(){
    		$(this).children("a").removeClass("item_hover_180");
    		$(this).children("div").css("height","0px");
    		$(this).removeClass("open");
    	});
    }
}
$(function() {
	heeyhomeCommon.init()	
})