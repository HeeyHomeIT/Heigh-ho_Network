var heeyhomeCal = {
    init: function() {
        heeyhomeCal.areaInputEvent();
//      heeyhomeCal.houseSelectEvent();
//      heeyhomeCal.roomSelectEvent();
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
        		$(".areadiv").find("label").removeClass("whether").parent("div.areadiv").removeClass("itemClickError");
        	},
    		"blur":function(){
    			var _this = $(this);
    			var _val = $(this).val();
    			var _placeholder = _this.attr("attr-placeholder"); 
    			var _housediv = $(".housediv"); //户型模块
    			var _cal2 = $(".cal2"); //卧室选择模块
    			var _cal3 = $(".cal3");//主要位置的选择
    			var messageText; //提示文本信息
    			var num;//房间数
    			var roomtitletext;
        		if(_val == ''){
        			_this.val(_placeholder);
        		}
				messageText = heeyhomeCal.errorEvent(_val);
				if(messageText != "ok"){
					//显示错误信息
					$(".areadiv").find("label").text(messageText).addClass("whether").parent("div.areadiv").addClass("itemClickError");
				}else{
					_housediv.addClass("col_eec988").find("div").addClass("border_eec988").addClass("after_eec988 ").css("cursor","pointer");
					console.log(_val);
//      			_cal2.addClass("col_eec988").find("div.roomsdiv>div").addClass("border_eec988").addClass("after_eec988 ");
        			num = parseInt($(".room span").text());
        			roomtitletext = heeyhomeCal.textChangeEvent(num);
        			_cal2.find("p").addClass("col_eec988").html(roomtitletext);
        			_cal3.addClass("col_eec988").find("dl").addClass("col_eec988").addClass("after_eec988 ");
        			$(".mainarea_list").css("cursor","pointer");
        			_housediv.find("div").unbind("click"); //移除click
        			heeyhomeCal.houseSelectEvent();
        			heeyhomeCal.roommainlyEvent();
				}
    		}
        });
    },
    /**
     * 户型选择
     */
    houseSelectEvent: function() {
    	var _houseSpan = $(".housediv div");
    	var _houseList = $(".housediv ul");
    	var _roomdiv = $(".roomsdiv div");
    	var _roomul = $(".roomsdiv ul");
    	var _cal2 = $(".cal2"); //卧室选择模块
    	var _cal4 = $(".cal4");
    	var roomtitletext;
    	var num;
    	_houseSpan.on("click",function(e){
    		e.stopPropagation();
    		// 户型选择的选择框旁边小三角切换
    		if($(this).hasClass("item_hover_180")){
    			$(this).removeClass("item_hover_180");
    		}else{
    			$(this).addClass("item_hover_180")
    		}
    		_cal4.addClass("col_eec988").find("dl").addClass("col_eec988").addClass("after_eec988 ");
    		$(".otherroom_list").css("cursor","pointer");
    		$(".otherroom_list li a").unbind("click"); //移除click事件
    		heeyhomeCal.otherSelectEvent();
    		//选择文本显示和隐藏
			$(this).find("ul").slideToggle('300');
			$(this).siblings().removeClass("item_hover_180").find("ul").slideUp('300');
    	});
    	//为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数
    	_houseList.delegate("li","click",function(){
    		num = $(this).text();
    		$(this).parent().prev().text(num);
    		if($(this).parent().parent().hasClass("room")){
    			roomtitletext = heeyhomeCal.textChangeEvent(parseInt(num));
    			_cal2.find("p").html(roomtitletext);
    			//如果只有一间卧室那就是主卧
    			if(parseInt(num)==1){
    				//次卧，儿童房，父母房衣帽间，书房置灰
    				_cal2.removeClass("col_eec988").find("div.roomsdiv>div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ").css("cursor","not-allowed");
    				//清空卧室选择模块下拉列表
    				_roomul.slideUp('300');
    				_roomul.addClass("clearli").find("li").remove();
    				//还原下拉箭头和选中衣帽间和选中书房
    				if(_roomdiv.hasClass("item_hover_180")||_roomdiv.hasClass("clickselect")){
		    			_roomdiv.removeClass("item_hover_180");
		    			_roomdiv.removeClass("clickselect");
		    		}
    				//次卧，儿童房，父母房置为0间
    				_roomdiv.find("em").text(0);
    				$(".s4").attr("data-flag",0);
    				$(".s5").attr("data-flag",0);
    				_roomdiv.unbind("click"); //移除click事件
    				$(".roomsdiv ul").undelegate(); //移除 delegate绑定
    			}else{ //如果有多间房间
    				//次卧，儿童房，父母房衣帽间，书房置亮
    				_cal2.addClass("col_eec988").find("div.roomsdiv>div").addClass("border_eec988").addClass("after_eec988 ").css("cursor","pointer");
    				$(".s4,.s5").removeClass("clickselect");
					$(".s4,.s5").attr("data-flag",0);
					_roomdiv.find("em").text(0);
    				//添加卧室选择模块下拉列表外框
    				_roomul.removeClass("clearli");
    				_roomdiv.unbind("click"); //移除click事件
    				$(".roomsdiv ul").undelegate(); //移除 delegate绑定
    				heeyhomeCal.roomSelectEvent(parseInt(num)-1);
    				
    			}
    		}
    	});
    	
    	$(document).on("click",function(){
    		if(_houseSpan.hasClass("item_hover_180")){
    			_houseSpan.removeClass("item_hover_180");
    		}
        	_houseList.slideUp('300');
    	});
    },
    appendStrEvent :function(num){
    	var str="";
    	var cw = $(".s1 span").find("em").text();
		var et = $(".s2 span").find("em").text();
		var fm = $(".s3 span").find("em").text();
		console.log("次卧："+cw + " 儿童："+ et +" 父母："+fm)
    	for(var i = 0 ;i <= num ;i++){
    		str += "<li>"+i+"</li>"
    	}
    	return str;
    },
    /**
     * 卧室选择
     */
	roomSelectEvent: function(totalNum){
		var _roomsSpan = $(".roomsdiv div");
		var _roomsList = $(".roomsdiv ul");
		console.log("totalNum:"+totalNum)
		var liStr = heeyhomeCal.appendStrEvent(totalNum);
		_roomsSpan.find("li").remove();
		_roomsSpan.find("ul").append(liStr);
		var tNum = totalNum;
		var ymj = 0;
		var sf = 0;
		var cw = 0;//次卧
		var et = 0;//儿童房
		var fm = 0;//父母房
		
		
		_roomsSpan.stop(true,true).on("click",function(e){

    		e.stopPropagation();
			//当除了主卧以外只有一间房间
			if(totalNum == 1){
				if($(this).hasClass("s4") || $(this).hasClass("s5")){
					
					if($(this).hasClass("clickselect")){
						$(this).removeClass("clickselect");
						$(this).attr("data-flag",0);
						ymj = $(".s4").attr("data-flag"); //衣帽间
						sf = $(".s5").attr("data-flag"); //书房	
						if(parseInt(ymj)+parseInt(sf) == 0){
							$(".cal2").addClass("col_eec988").find("div.roomsdiv>div").addClass("border_eec988").addClass("after_eec988 ");
						}
					}else{
						$(this).addClass("clickselect").siblings().removeClass("clickselect");
						_roomsSpan.find("em").text(0);
						$(".cal2").removeClass("col_eec988").find("div.roomsdiv>div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ");
						if($(this).hasClass("s4")){
							$(this).attr("data-flag",1)
							$(".s5").attr("data-flag",0)
						}else{
							$(this).attr("data-flag",1)
							$(".s4").attr("data-flag",0)
						}
					}
				}
			}else if(totalNum == 2) { //除了主卧以外其余两间房间怎么安排
				
	    		//衣帽间和书房选择 0:没有选择，默认为0 1：代表选择
					if($(this).hasClass("s4") || $(this).hasClass("s5")){
						if($(this).hasClass("clickselect")){
							$(this).removeClass("clickselect");
							$(this).attr("data-flag",0);
						}else{
							$(this).addClass("clickselect");
							$(this).attr("data-flag",1);
						}
					}
					ymj = $(".s4").attr("data-flag"); //衣帽间
					sf = $(".s5").attr("data-flag"); //书房	
					cw = $(".s1 span").find("em").text();//次卧
					et = $(".s2 span").find("em").text();//儿童房
					fm = $(".s3 span").find("em").text();//父母房
					if(parseInt(cw)+parseInt(et)+parseInt(fm) == 0){
						if(parseInt(ymj)+parseInt(sf) == 0){
							$(".cal2").addClass("col_eec988").find("div.roomsdiv>div").addClass("border_eec988").addClass("after_eec988 ");
						}else if(parseInt(ymj)+parseInt(sf) == 1){
							$(".cal2").addClass("col_eec988").find("div.roomsdiv>div").addClass("border_eec988").addClass("after_eec988 ");
						}else if(parseInt(ymj)+parseInt(sf) == 2){
							$(".cal2").removeClass("col_eec988").find("div.roomsdiv>div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ");
						}
					}else if(parseInt(cw)+parseInt(et)+parseInt(fm) == 1){
						ymj = $(".s4").attr("data-flag"); //衣帽间
						sf = $(".s5").attr("data-flag"); //书房	
						if(parseInt(ymj)+parseInt(sf)==2){
							if($(this).hasClass("s4") || $(this).hasClass("s5")){
								$(this).removeClass("clickselect");
								$(this).attr("data-flag",0);
								console.log("您最多只能安排两个房间");
							}
						}else if(parseInt(ymj)+parseInt(sf)==1){
							$(".cal2").removeClass("col_eec988").find("div.roomsdiv>div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ");
							cw = $(".s1 span").find("em").text();//次卧
							et = $(".s2 span").find("em").text();//儿童房
							fm = $(".s3 span").find("em").text();//父母房
							if(cw!=0){
								$(".s1").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
							}
							if(et!=0){
								$(".s2").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
							}
							if(fm!=0){
								$(".s3").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
							}
						}else if(parseInt(ymj)+parseInt(sf)==0){
							$(".cal2").addClass("col_eec988").find("div.roomsdiv>div").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
						}
						
					}else if(parseInt(cw)+parseInt(et)+parseInt(fm) == 2){
						ymj = $(".s4").attr("data-flag"); //衣帽间
						sf = $(".s5").attr("data-flag"); //书房	
						if(parseInt(ymj)+parseInt(sf)==1){
							if($(this).hasClass("s4") || $(this).hasClass("s5")){
								$(this).removeClass("clickselect");
								$(this).attr("data-flag",0);
								console.log("您最多只能安排两个房间");
							}
						}
					}
				
			}else if(totalNum == 3) { //除了主卧以外其余三间房间怎么安排
				if($(this).hasClass("s4") || $(this).hasClass("s5")){
					if($(this).hasClass("clickselect")){
						$(this).removeClass("clickselect");
						$(this).attr("data-flag",0);
					}else{
						$(this).addClass("clickselect");
						$(this).attr("data-flag",1);
					}
				}
				ymj = $(".s4").attr("data-flag"); //衣帽间
				sf = $(".s5").attr("data-flag"); //书房	
				cw = $(".s1 span").find("em").text();//次卧
				et = $(".s2 span").find("em").text();//儿童房
				fm = $(".s3 span").find("em").text();//父母房
				if(parseInt(cw)+parseInt(et)+parseInt(fm) == 0){
					$(".cal2").addClass("col_eec988").find("div.roomsdiv>div").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
				}else if(parseInt(cw)+parseInt(et)+parseInt(fm) == 1){
					if(parseInt(ymj)+parseInt(sf)==2){
						$(".cal2").removeClass("col_eec988").find("div.roomsdiv>div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ");
						if(cw!=0){
								$(".s1").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
						}
						if(et!=0){
							$(".s2").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
						}
						if(fm!=0){
							$(".s3").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
						}
					}else if(parseInt(ymj)+parseInt(sf)==1){
						$(".cal2").addClass("col_eec988").find("div.roomsdiv>div").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
					}else if(parseInt(ymj)+parseInt(sf)==0){
						$(".cal2").addClass("col_eec988").find("div.roomsdiv>div").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
					}
				}else if(parseInt(cw)+parseInt(et)+parseInt(fm) == 2){
					console.log(1);
					if(parseInt(ymj)+parseInt(sf)==2){
						if($(this).hasClass("s4") || $(this).hasClass("s5")){
							$(this).removeClass("clickselect");
							$(this).attr("data-flag",0);
							console.log("您最多只能安排san个房间");
						}
					}if(parseInt(ymj)+parseInt(sf)==1){
						$(".cal2").removeClass("col_eec988").find("div.roomsdiv>div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ");
						if(cw!=0){
							$(".s1").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
						}
						if(et!=0){
							$(".s2").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
						}
						if(fm!=0){
							$(".s3").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
						}
					}else if(parseInt(ymj)+parseInt(sf)==0){
						$(".cal2").addClass("col_eec988").find("div.roomsdiv>div").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
					}
				}else if(parseInt(cw)+parseInt(et)+parseInt(fm) == 3){
					$(".cal2").removeClass("col_eec988").find("div.roomsdiv>div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ");
					if(cw!=0){
						$(".s1").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
					}
					if(et!=0){
						$(".s2").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
					}
					if(fm!=0){
						$(".s3").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
					}
					if($(this).hasClass("s4") || $(this).hasClass("s5")){
						$(this).removeClass("clickselect");
						$(this).attr("data-flag",0);
						console.log("您最多只能安排三个房间");
					}
				}
			}
//			var textStr = $(this).find("em").text();
//			alert(textStr)
//			if(parseInt(textStr) != 0 ){
//				console.log($(this).find("span").text())
//			}
			if($(this).hasClass("s4") || $(this).hasClass("s5")){
				var _strLi,_thisSpan;
				_thisSpan = $(this).find("span").data("nj");
				if($(this).attr("data-flag") == 1 && $(this).hasClass("clickselect")){
					if(_thisSpan == "衣帽间"){
						_strLi = heeyhomeCal.contentEvent(_thisSpan,5,"");
					}else if(_thisSpan == "书房"){
						_strLi = heeyhomeCal.contentEvent(_thisSpan,4,"after_bookroom");
					}
				}else {
					if(_thisSpan == "衣帽间"){
						$(".mainarea_list li.room5").remove();
					}else if(_thisSpan == "书房"){
						$(".mainarea_list li.room4").remove();
					}
				}
				if(_strLi !=null && _strLi!="" && _strLi!=undefined ){
					$(".mainarea_list").append(_strLi);
					$(".mainarea_list li a").unbind("click"); //移除click事件
					heeyhomeCal.roommainlyEvent()
				}
			}else {
				_thisSpan = $(this).find("span").data("nj");
				if($(this).find("em").text()!=0){
					if(_thisSpan == "次卧"){
						_strLi = heeyhomeCal.contentEvent(_thisSpan,1,"");
					}else if(_thisSpan == "儿童房"){
						_strLi = heeyhomeCal.contentEvent(_thisSpan,3,"after_childrenroom");
					}else if(_thisSpan == "父母房"){
						_strLi = heeyhomeCal.contentEvent(_thisSpan,2,"");
					}
				}else if($(this).find("em").text() == 0){
					if(_thisSpan == "次卧"){
						$(".mainarea_list li.room1").remove();
					}else if(_thisSpan == "儿童房"){
						$(".mainarea_list li.room3").remove();
					}else if(_thisSpan == "父母房"){
						$(".mainarea_list li.room2").remove();
					}
				}
				if(_strLi !=null && _strLi!="" && _strLi!=undefined ){
					$(".mainarea_list").append(_strLi);
					$(".mainarea_list li a").unbind("click"); //移除click事件
					heeyhomeCal.roommainlyEvent()
				}
			}
    		// 户型选择的选择框旁边小三角切换
    		if($(this).hasClass("item_hover_180")){
    			$(this).removeClass("item_hover_180");
    		}else{
    			$(this).addClass("item_hover_180")
    		}
    		//选择文本显示和隐藏
			$(this).find("ul").slideToggle('300');
			$(this).siblings().removeClass("item_hover_180").find("ul").slideUp('300');  

    	});
    	//为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数
    	_roomsList.delegate("li","click",function(){
    		num = $(this).text();
    		$(this).parent().siblings().find("em").text(num);
    		
			if(totalNum == 1){
				if(num!=0){
					$(".cal2").removeClass("col_eec988").find("div.roomsdiv>div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ");
					$(".s4,.s5").removeClass("clickselect");
					$(".s4,.s5").attr("data-flag",0)
					$(this).parent().parent().addClass("col_eec988").addClass("border_eec988").addClass("after_eec988");
					$(this).parent().parent().siblings().find("em").text(0)
				}else{
					if($(".s4").hasClass("clickselect") || $(".s5").hasClass("clickselect")){
	    				$(".cal2").removeClass("col_eec988").find("div.roomsdiv>div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ");
	    			}else{
	    				cw = $(".s1 span").find("em").text();//次卧
						et = $(".s2 span").find("em").text();//儿童房
						fm = $(".s3 span").find("em").text();//父母房
	    				if(parseInt(cw)+parseInt(et)+parseInt(fm) == 0){
	    					$(".cal2").addClass("col_eec988").find("div.roomsdiv>div").addClass("border_eec988").addClass("after_eec988 ");
	    				}else{
	    					$(this).parent().parent().removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988");
	    				}
	    			}
				}
			}else if(totalNum == 2){
				ymj = $(".s4").attr("data-flag"); //衣帽间
				sf = $(".s5").attr("data-flag"); //书房	
				//衣帽间和书房都选择了
				if(parseInt(ymj)+parseInt(sf) == 2){
					console.log("最多只能安排两个房间");
					$(this).parent().siblings().find("em").text(0);
				}else if(parseInt(ymj)+parseInt(sf) == 1) { //衣帽间和书房选择了一个
					//如果选择0
					if(num == 0){
						cw = $(".s1 span").find("em").text();//次卧
						et = $(".s2 span").find("em").text();//儿童房
						fm = $(".s3 span").find("em").text();//父母房
						if(parseInt(cw)+parseInt(et)+parseInt(fm) == 0){
							$(".cal2").addClass("col_eec988").find("div.roomsdiv>div").addClass("border_eec988").addClass("after_eec988 ");
						}
					}else if(num == 1){//如果选择1
						$(".cal2").removeClass("col_eec988").find("div.roomsdiv>div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ");
						$(this).parent().parent().addClass("col_eec988").addClass("border_eec988").addClass("after_eec988");
						$(this).parent().parent().siblings().find("em").text(0);
					}else if(num == 2){//如果选择2
						console.log("最多只能安排两个房间,你已经安排了两个房间了");
						$(this).parent().siblings().find("em").text(0);
						cw = $(".s1 span").find("em").text();//次卧
						et = $(".s2 span").find("em").text();//儿童房
						fm = $(".s3 span").find("em").text();//父母房
						if(parseInt(cw)+parseInt(et)+parseInt(fm) == 0){
							$(".cal2").addClass("col_eec988").find("div.roomsdiv>div").addClass("border_eec988").addClass("after_eec988 ");
						}
					}
				}else if(parseInt(ymj)+parseInt(sf) == 0) {//衣帽间和书房都没选择
					cw = $(".s1 span").find("em").text();//次卧
					et = $(".s2 span").find("em").text();//儿童房
					fm = $(".s3 span").find("em").text();//父母房
					if(parseInt(cw)+parseInt(et)+parseInt(fm) == 0){
					
					}else if(parseInt(cw)+parseInt(et)+parseInt(fm) == 1){
//						$(".cal2").removeClass("col_eec988").find("div.roomsdiv>div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ");
					}else if(parseInt(cw)+parseInt(et)+parseInt(fm) == 2){
//						$(this).parent().parent().siblings().find("em").text(0);
						$(".cal2").removeClass("col_eec988").find("div.roomsdiv>div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ");
						cw = $(".s1 span").find("em").text();//次卧
						et = $(".s2 span").find("em").text();//儿童房
						fm = $(".s3 span").find("em").text();//父母房
						if(parseInt(cw)!=0){
							$(".s1").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
						}
						if(parseInt(et)!=0){
							$(".s2").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
						}
						if(parseInt(fm)!=0){
							$(".s3").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
						}
					}else if(parseInt(cw)+parseInt(et)+parseInt(fm) > 2){
						$(this).parent().parent().find("em").text(0);
						console.log("最多只能安排两个房间,你已经安排了两个房间了```");
					}
				}
			}else if(totalNum == 3){
				ymj = $(".s4").attr("data-flag"); //衣帽间
				sf = $(".s5").attr("data-flag"); //书房	
				//衣帽间和书房都选择了
				if(parseInt(ymj)+parseInt(sf) == 2){
					//如果选择0
					if(num == 0){
						
					}else if(num == 1){
						$(".cal2").removeClass("col_eec988").find("div.roomsdiv>div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ");
						$(this).parent().parent().addClass("col_eec988").addClass("border_eec988").addClass("after_eec988");
						$(this).parent().parent().siblings().find("em").text(0);
					}else if(num > 1){
						console.log("最多只能安排三个房间```");
						$(this).parent().parent().find("em").text(0);
						$(".cal2").addClass("col_eec988").find("div.roomsdiv>div").addClass("border_eec988").addClass("after_eec988 ");
						
					}
				}else if(parseInt(ymj)+parseInt(sf) == 1){
					cw = $(".s1 span").find("em").text();//次卧
					et = $(".s2 span").find("em").text();//儿童房
					fm = $(".s3 span").find("em").text();//父母房
					if(parseInt(cw)+parseInt(et)+parseInt(fm) >2){
						$(this).parent().parent().find("em").text(0);
						console.log("最多只能安排三个房间```");
					}
				}else if(parseInt(ymj)+parseInt(sf) == 0){
					cw = $(".s1 span").find("em").text();//次卧
					et = $(".s2 span").find("em").text();//儿童房
					fm = $(".s3 span").find("em").text();//父母房
					if(parseInt(cw)+parseInt(et)+parseInt(fm) >3){
						$(this).parent().parent().find("em").text(0);
						$(".cal2").addClass("col_eec988").find("div.roomsdiv>div").addClass("border_eec988").addClass("after_eec988 ");
						console.log("最多只能安排三个房间```");
					}
				}
			}
    	});
    	
	},
	
	/**
	 * 主要的位置选择
	 */
	roommainlyEvent:function(){
		var _mainlist = $(".mainarea_list li a");
		_mainlist.on("click",function(e){
    		e.stopPropagation();
    		// 户型选择的选择框旁边小三角切换
    		var _this = $(this).find("dl");
    		if(_this.hasClass("item_hover_180")){
    			_this.removeClass("item_hover_180");
    		}else{
    			_this.addClass("item_hover_180")
    		}
    		//选择文本显示和隐藏
			$(this).parent().children("div").toggle();
//			$(this).siblings().removeClass("item_hover_180").find("div").slideUp('300');
			$(this).parent().siblings().find("dl").removeClass("item_hover_180");
			$(this).parent().siblings().find("div.filter_nav").hide()
    	});
    	
    	$(".filter_item a").on("click",function(){
			$(this).addClass("cit").siblings().removeClass("cit");
    	});
    	
    	$(".filter_nav i").on("click", function() {
            $(this).parents(".filter_nav").hide();
            var _em = $(this).parents(".filter_nav").siblings().find("dl");
            if(_em.hasClass("item_hover_180")){
            	_em.removeClass("item_hover_180");
            }
       	});
	},
	otherSelectEvent: function(){
		var _otherroomList = $(".otherroom_list li a");
		_otherroomList.on("click",function(e){
    		e.stopPropagation();
    		// 户型选择的选择框旁边小三角切换
    		var _this = $(this).find("dl");
    		if(_this.hasClass("item_hover_180")){
    			_this.removeClass("item_hover_180");
    		}else{
    			_this.addClass("item_hover_180")
    		}
    		$(".cal5").addClass("col_eec988").find("dl").addClass("col_eec988").addClass("after_eec988 ");
    		$(".other_list").css("cursor","pointer");
    		$(".other_list li a").unbind("click");
    		heeyhomeCal.houseCharacteristicEvent();
    		//选择文本显示和隐藏
			$(this).parent().children("div").toggle();
			$(this).parent().siblings().find("dl").removeClass("item_hover_180");
			$(this).parent().siblings().find("div.filter_nav").hide();
    	});
    	
    	$(".filter_item a").on("click",function(){
			$(this).addClass("cit").siblings().removeClass("cit");
    	});
    	
    	$(".filter_nav i").on("click", function() {
            $(this).parents(".filter_nav").hide();
            var _em = $(this).parents(".filter_nav").siblings().find("dl");
            if(_em.hasClass("item_hover_180")){
            	_em.removeClass("item_hover_180");
            }
       	});
	},
	houseCharacteristicEvent: function(){
		var otherlist = $(".other_list li a");
		otherlist.on("click",function(e){
    		e.stopPropagation();
    		// 户型选择的选择框旁边小三角切换
    		var _this = $(this).find("dl");
    		if(_this.hasClass("item_hover_180")){
    			_this.removeClass("item_hover_180");
    		}else{
    			_this.addClass("item_hover_180")
    		}
    		if($(this).hasClass("otherclick")){
    			if($(this).hasClass("clickselect")){
    				$(this).removeClass("clickselect")
    			}else{
    				$(this).addClass("clickselect")
    			}
    		}
    		$(".cal5").addClass("col_eec988").find("dl").addClass("col_eec988").addClass("after_eec988 ");
    		$(".cal6 input").addClass("col_eec988").addClass("border_eec988").css("cursor","pointer");
    		//选择文本显示和隐藏
			$(this).parent().children("div").toggle();
			$(this).parent().siblings().find("dl").removeClass("item_hover_180");
			$(this).parent().siblings().find("div.filter_nav").hide();
    	});
    	
    	$(".filter_item a").on("click",function(){
			$(this).addClass("cit").siblings().removeClass("cit");
    	});
    	
    	$(".filter_nav i").on("click", function() {
            $(this).parents(".filter_nav").hide();
            var _em = $(this).parents(".filter_nav").siblings().find("dl");
            if(_em.hasClass("item_hover_180")){
            	_em.removeClass("item_hover_180");
            }
       	});
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
	},
	textChangeEvent: function(num) {
    	var _text; 
    	switch (num){
            case 1:
                _text = "您只有一间主卧&nbsp&nbsp请继续往下填写";
                break;
            case 2:
                _text = "除了主卧以外其余一间房间怎么安排";
                break;
            case 3:
                _text = "除了主卧以外其余两间房间怎么安排";
                break;
            case 4:
                _text = "除了主卧以外其余三间房间怎么安排";
                break;
        }
    	return _text;
    },
    contentEvent: function(name,i,cn){
    	var strLi;
    	var _cname = "room"+i;
    	var _mainarea_list = $(".mainarea_list li");
		var flag = true;
//		console.log(_mainarea_list.hasClass())
		_mainarea_list.each(function(index,obj){
			if(obj.className == _cname){
            	flag = false;
            	return;
        	}
		})
		console.log("----------------: " + flag);
		if(flag){
			strLi = '<li class="room'+i+'">'
			+ '		<a class="item'+i+'"> '
			+ '			<em></em> '
			+ '			<dl class="item_hover_0 col_eec988 after_eec988">'+name+'</dl> '
			+ '		</a> '
			+ '		<div class="filter_nav '+cn+' display"> '
			+ '			<i></i> '
			+ '			<div class="filter_mod"> '
			+ '				<div class="filter_item"> '
			+ '					<label class="item_title">地面处理方式：</label> '
			+ '					<div class="item_mod"> '
			+ '						<a class="cit" rel="nofollow">实木地板</a> '
			+ '						<a rel="nofollow">强化复合地板</a> '
			+ '						<a rel="nofollow">铺设瓷砖</a> '
			+ '					</div> '
			+'				</div> ';
			if(name == "衣帽间" || name == "次卧" || name == "儿童房" || name == "父母房"){
				strLi += '	<div class="filter_item"> '
					+'			<label class="item_title">衣柜制作方式：</label> '
					+'			<div class="item_mod"> '
					+'				<a class="cit" rel="nofollow">木工制作衣柜</a> '
					+'				<a rel="nofollow">自行购买衣柜</a> '
					+'			</div> '
					+'		</div> ';
			}
			strLi +='		<div class="filter_item"> '
				+'				<label class="item_title">木工制作吊顶：</label> '
				+'				<div class="item_mod"> '
				+'					<a class="cit" rel="nofollow">需要</a> '
				+'					<a rel="nofollow">不需要</a> '
				+'				</div>	'
				+'			</div> '
				+'			<div class="filter_item"> '
				+'				<label class="item_title">墙面铺贴墙纸：</label> '
				+'				<div class="item_mod"> '
				+'					<a class="cit" rel="nofollow">需要</a> '
				+'					<a rel="nofollow">不需要</a> '
				+'				</div>	'
				+'			</div> '
				+'			<div class="filter_item"> '
				+'				<label class="item_title">有无飘窗结构：</label> '
				+'				<div class="item_mod"> '
				+'					<a class="cit" rel="nofollow">有飘窗</a> '
				+'					<a rel="nofollow">没有飘窗</a> '
				+'				</div>	'
				+'			</div> ';
			if(name == "书房" || name == "儿童房"){
				strLi += '	<div class="filter_item"> '
					+'			<label class="item_title">榻榻米的制作：</label> '
					+'			<div class="item_mod"> '
					+'				<a class="cit" rel="nofollow">木工制作榻榻米</a> '
					+'				<a rel="nofollow">自行购买榻榻米</a> '
					+'			</div> '
					+'		</div> ';
			}
			if(name == "书房"){
				strLi += '	<div class="filter_item"> '
					+'			<label class="item_title">书桌书柜选择：</label> '
					+'			<div class="item_mod"> '
					+'				<a class="cit" rel="nofollow">木工制作简易书桌书柜</a> '
					+'				<a rel="nofollow">购买成品书桌书柜</a> '
					+'			</div> '
					+'		</div> ';
			}
			if(name == "儿童房"){
				strLi += '	<div class="filter_item"> '
					+'			<label class="item_title">书桌书架选择：</label> '
					+'			<div class="item_mod"> '
					+'				<a class="cit" rel="nofollow">木工制作简易书桌书架</a> '
					+'				<a rel="nofollow">购买成品书桌书架</a> '
					+'			</div> '
					+'		</div> ';
			}
			strLi += '	</div> '
				+'	</div> '
				+'</li> ';
		}
		return strLi;
    }

};

$(function(){
	heeyhomeCal.init()	
})


