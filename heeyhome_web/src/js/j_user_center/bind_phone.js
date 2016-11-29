var heeyhomeBind = {
	/*
	 * 初始化
	 */
	init : function(){
		heeyhomeBind.bindPhone();
	},
	/*
	 * 点击下一步的切换效果
	 */
	bindPhone: function(){
		var _tab = $(".revise_process a");
		var _process_1 = $(".phone_content .next_section");
		var _process_2 = $(".phone_content .sure");
		$(_process_1).on({
			click : function(){
				$(_tab).eq(0).removeClass("active");
				$(_tab).eq(1).addClass("active");
			}
		});
		$(_process_2).on({
			click : function(){
				alert(1)
				$(_tab).eq(1).removeClass("active");
				$(_tab).eq(2).addClass("active");
			}
		});
	}
}
$(function(){
	heeyhomeBind.init();
});
