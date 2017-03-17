var roomPlanObj = {};
var Msg1 = "未保存工艺";
var Msg2 = "已保存工艺";
var COUNTURL = '/api/public/costcalculator/count'; // 成本计算器接口
var heeyhomeCal = {
	init: function() {
		var self = this;
		self.houseSelectEvent();
		self.selectRoomTechnologyEvent();
		self.roomConfigureSelectEvent();
		self.lastdivClickEvent();
		self.sumbitCalEvent();
	},
	/**
	 * 户型选择
	 */
	houseSelectEvent: function() {
		var self = this;
		var roomNumber; // 房间数
		var titleStr; // 房间安排DIV标题
		var num; // 数量
		var areaNumber; // 面积数
		var roomLiStr,bathroomLiStr,balconyLiStr;
		$(".housediv div").on("click", function(e) {
			e.stopPropagation();
			areaNumber = $("#c_area").val();
			if(areaNumber == null || areaNumber == undefined || $.trim(areaNumber) == ""){
				layer.msg('请先输入建筑面积');
				return;
			}else {
				if(areaNumber >= 70 && areaNumber < 80){
					roomLiStr = '<li>1</li><li>2</li>'; //卧室
					bathroomLiStr = '<li>1</li>'; //卫
					balconyLiStr = '<li>1</li><li>2</li>'; // 阳台
				}else if(areaNumber >= 80 && areaNumber < 90){
					roomLiStr = '<li>1</li><li>2</li><li>3</li>'; //卧室
					bathroomLiStr = '<li>1</li>'; //卫
					balconyLiStr = '<li>1</li><li>2</li>'; // 阳台
				}else if(areaNumber >= 90 && areaNumber < 120){
					roomLiStr = '<li>1</li><li>2</li><li>3</li>'; //卧室
					bathroomLiStr = '<li>1</li><li>2</li>'; //卫
					balconyLiStr = '<li>1</li><li>2</li><li>3</li>'; // 阳台
				}else if(areaNumber >= 120 && areaNumber < 140){
					roomLiStr = '<li>1</li><li>2</li><li>3</li><li>4</li>'; //卧室
					bathroomLiStr = '<li>1</li><li>2</li>'; //卫
					balconyLiStr = '<li>1</li><li>2</li><li>3</li>'; // 阳台
				}else if(areaNumber >= 140 && areaNumber <= 160){
					roomLiStr = '<li>1</li><li>2</li><li>3</li><li>4</li>'; //卧室
					bathroomLiStr = '<li>1</li><li>2</li><li>3</li>'; //卫
					balconyLiStr = '<li>1</li><li>2</li><li>3</li>'; // 阳台
				}else{
					layer.msg('暂支持70m²~160m²户型，其他户型请咨询客服');
					return;
				}
				$(".room ul").html(roomLiStr);
				$(".bathroom ul").html(bathroomLiStr);
				$(".balcony ul").html(balconyLiStr);
			}
			// 户型选择的选择框旁边小三角切换、选择文本显示和隐藏
			if($(this).hasClass("item_hover_180")) {
				$(this).removeClass("item_hover_180");
			} else {
				$(this).addClass("item_hover_180")
			}
			// 选择文本显示和隐藏
			$(this).find("ul").slideToggle();
			$(this).siblings().removeClass("item_hover_180").find("ul").slideUp();
		});
		// 为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数
		$(".housediv ul").delegate("li", "click", function() {
			num = $(this).text();
			$(this).parent().prev().text(num);
			// 如果当前选择的是房间
			if($(this).parent().parent().hasClass("room")) {
				// 得到房间安排div标题文本显示到页面
				titleStr = self.changeTitleEvent(parseInt(num));
				$(".Jtitle").html(titleStr);
				// 如果只有一间卧室那就是主卧
				if(parseInt(num) != 1) {
					$(".roomsdiv a.add-btn").removeClass("off").addClass("Jcursor");
					// 房间安排计划事件
					self.comboboxInitEvent();
					self.roomPlanEvent(parseInt(num) - 1);
				} else {
					self.comboboxInitEvent();
					// 移除绑定事件click
					$(".roomsdiv a").off("click");
					$(".roomsdiv a").addClass("off").removeClass("Jcursor");

				}
			}
		});
		// 关闭下拉框和三角形置为初始状态事件
		self.closeDropBoxEvent($(".housediv div"), $(".housediv ul"));
	},
	/**
	 * 房间安排计划事件
	 * @param {Object} roomNumber 房间数
	 */
	roomPlanEvent: function(roomNumber) {
		var self = this;
		$(".roomsdiv a").off().on("click", function() {
			var $this = $(this),
				num, sum = 0,
				n = 0;
			if($this.hasClass("sub-btn")) { // 减
				num = parseInt($this.siblings("span").find("input").val()) - 1;
				if(num == -1) {
					return;
				}
				self.roomsPlanStatusEvent($this.parent().attr("id"), num, $this.siblings("span").attr("data-en"), $this.siblings("span").attr("data-nj"), $this.siblings("span").attr("data-tag"));
				$this.siblings("a").removeClass("off");
				$(".add-btn").removeClass("off").addClass("Jcursor");
				$(this).siblings("span").find("input").val(num);
				if(num == 0) {
					$this.addClass("off").removeClass("Jcursor");
					self.initThisObjContentStrEvent($this.parent().attr("id"));
				}
			} else { // 加
				num = parseInt($this.siblings("span").find("input").val()) + 1;
				$.each(roomPlanObj, function(i, v) {
					n += parseInt(v.count);
				});
				if(num == roomNumber + 1 || n == roomNumber) {
					return;
				}
				self.roomsPlanStatusEvent($this.parent().attr("id"), num, $this.siblings("span").attr("data-en"), $this.siblings("span").attr("data-nj"), $this.siblings("span").attr("data-tag"));
				$this.siblings("a").removeClass("off").addClass("Jcursor");
				$(this).siblings("span").find("input").val(num);
				$.each(roomPlanObj, function(i, v) {
					sum += parseInt(v.count);
				});
				if(num == roomNumber || sum == roomNumber) {
					$this.addClass("off").removeClass("Jcursor");
					$(".add-btn").addClass("off").removeClass("Jcursor")
				}
			}
			// 房间工艺选择
			self.roomOperationEvent();
		});
	},
	/**
	 * 房间安排状态
	 * @param {Object} roomId 房间的id名
	 * @param {Object} count 房间数量
	 *  @param {Object} name 英文名字
	 *  @param {Object} cname 中文名字
	 *  @param {Object} tag 图标
	 */
	roomsPlanStatusEvent: function(roomId, count, name, cname, tag) {
		var _roomId = roomId;
		var _count = count;
		var _name = name;
		var _cname = cname;
		var _tag = tag;
		roomPlanObj[_roomId] = {
			count: _count,
			name: _name,
			cname: _cname,
			tag: _tag
		}
	},

	/**
	 * 房间工艺选择功能状态
	 */
	roomOperationEvent: function() {
		var self = this;
		console.log("-------------")
		console.log(roomPlanObj);
		var strLi;
		$.each(roomPlanObj, function(i, v) {
			console.log(v.tag);
			if($(".mainarea_list li").hasClass("house" + v.tag)) { //判断ul里面是不是有存在的房间
				if(parseInt(v.count) == 0) { // 如果有存在的房间，那么在判断当前对象里面此房间数是不是为0
					$(".mainarea_list li.house" + v.tag).remove(); // 如果对象里房间数为0那么删掉
				}
			} else {
				if(parseInt(v.count) != 0) {
					strLi = '<li class="house' + v.tag + ' scd">' +
						'	<label for="' + v.name + 'Radio" id="Checkbox' + v.tag + '" class="Jcursor">' +
						'	<input type="checkbox" class="I' + i + ' J' + v.name + ' sccc display" data-sw="0" data-type="' + v.name + '" data-name="' + v.cname + '"  id="' + v.name + 'Radio">' +
						'	<s class="J' + i + ' scb"></s> ' +
						'	<div class="room' + v.tag + '"> ' +
						'	<em></em> <dl>' + v.cname + '</dl> ' +
						'	</div></label><span class="already_choose none"></span></li> '
					$(".mainarea_list").append(strLi);
				}
			}

		});
		//      $.each(roomPlanObj, function (i, v) {
		//      	$(".mainarea_list li.house"+v.tag).remove();
		//			if(parseInt(v.count) != 0){
		//				strLi = '<li class="house'+v.tag+' scd">'
		//				+ '	<label for="'+v.name+'Radio" id="Checkbox'+v.tag+'" class="Jcursor">'
		//				+ '	<input type="checkbox" class="I'+i+' J'+v.name+' sccc display" data-sw="0" data-type="'+v.name+'" data-name="'+v.cname+'"  id="'+v.name+'Radio">'
		//				+ '	<s class="J'+i+' scb"></s> '
		//				+ '	<div class="room'+v.tag+'"> '
		//				+ '	<em></em> <dl>'+v.cname+'</dl> '
		//				+ '	</div></label><span class="already_choose none"></span></li> '
		//				$(".mainarea_list").append(strLi);
		//			}
		//			
		//      });
		//      $.each(roomPlanObj, function (i, v) {
		//          var $Jid = $(".J" + i), $Iid = $(".I" + i);
		//          if (parseInt(v.count) != 0) {
		//              $Iid.attr("disabled", false);
		//              $Iid.attr("checked", false);
		//              $Iid.parent("label").addClass("Jcursor");
		//              if ($Iid.attr("data-sw") == 0) {
		//                  $Jid.removeClass("can_not_check");
		//              }
		//          } else {
		//              $Iid.attr("checked", false);
		//              $Iid.attr("disabled", "disabled");
		//              $Iid.attr("data-sw", 0);
		//              $Iid.attr("data-option", "");
		//              $Iid.parent("label").removeClass("Jcursor");
		//              $Jid.removeClass("rep_craft_check");
		//              $Iid.closest("li").children("span").addClass("none").empty();
		//              $Jid.addClass("can_not_check");
		//          }
		//      });
	},
	/**
	 * 房间工艺选择
	 */
	selectRoomTechnologyEvent: function() {
		var self = this;
		$(document).on("click", "#zwRadio,#cwRadio,#fmfRadio,#ymjRadio,#etfRadio,#sfRadio,#kctRadio,#ytRadio,#cfRadio", function() {
			var $this = $(this);
			var save, type, name, optionval;
			save = $this.attr("data-sw"); // 是否保存ID 0：未保存 1：保存
			type = $this.data("type");
			name = $this.data("name");
			$.each($(".mainareadiv input[type='checkbox']"), function(i, v) {
				if(parseInt($(v).attr("data-sw")) == 0) {
					$(v).siblings("s").removeClass("rep_craft_check");
					$(v).closest("li").children("span").addClass("none").empty();
				}
			});
			if(parseInt(save) == 0) { // 未保存
				$this.siblings("s").addClass("rep_craft_check");
				$this.closest("li").children("span").removeClass("none").html(Msg1);
			} else if(parseInt(save) == 1) {
				optionval = JSON.parse($this.attr("data-option"));
			}
			self.contentStrEvent(type, name, optionval);
		});
	},
	/**
	 * 初始化
	 */
	comboboxInitEvent: function() {
		var self = this;
		$(".roomsdiv input").val(0);
		$(".roomsdiv a.sub-btn").addClass("off").removeClass("Jcursor");
		$(".scc").removeClass("can_not_check rep_craft_check");
		$(".scb").removeClass("rep_craft_check").addClass("can_not_check");
		$(".mainareadiv li").find("span").addClass("none").removeClass("Jcol").empty();
		$(".mainareadiv li").find("input").attr("data-sw", 0);
		$(".mainareadiv li").find("input").attr("data-option", "");
		$(".mainareadiv li").find("input").attr("checked", false);
		$(".mainareadiv li").find("input.sccc").attr("disabled", "disabled");
		$(".mainareadiv li").find("input.sccc").parent("label").removeClass("Jcursor");
		$(".mainareadiv li.scd").remove();
		self.initcontentStrEvent();
		// 全局变量清空
		roomPlanObj = {};
	},
	/**
	 * 关闭下拉框和三角形置为初始状态
	 * @param {Object} squareElement 三角形元素
	 * @param {Object} listElement 下拉框元素
	 */
	closeDropBoxEvent: function(squareElement, listElement) {
		var _squareElement = squareElement;
		var _listElement = listElement;
		$(document).on("click", function() {
			if(_squareElement.hasClass("item_hover_180")) {
				_squareElement.removeClass("item_hover_180");
			}
			_listElement.slideUp();
		});
	},
	/**
	 * 根据不同的房间数改变安排房间DIV的标题
	 * @param {Object} num 房间数
	 * @return _titleText 标题文本
	 */
	changeTitleEvent: function(num) {
		var _titleText;
		switch(num) {
			case 1:
				_titleText = "您只有一间主卧&nbsp&nbsp请<span style='color:#f60'>跳过第二步继续填写下面的内容</span>";
				break;
			case 2:
				_titleText = "除了主卧以外其余<span style='color:#f60'>一间</span>房间怎么安排";
				break;
			case 3:
				_titleText = "除了主卧以外其余<span style='color:#f60'>两间</span>房间怎么安排";
				break;
			case 4:
				_titleText = "除了主卧以外其余<span style='color:#f60'>三间</span>房间怎么安排";
				break;
		}
		return _titleText;
	},
	/**
	 * 内容文本
	 * @param {Object} type 类型
	 * @param {Object} name 名字
	 * @param {Object} optionval 保存的选项值
	 */
	contentStrEvent: function(type, name, optionval) {
		var self = this;
		var strLi;
		var optionObj;
		if(optionval != null && optionval != undefined) {
			optionObj = optionval[type];
		}
		strLi = '<i class="title">房间类型：<em class="JroomName" data-rn="' + type + '">' + name + '</em></i> ' +
			'<div class="filter_mod"> ' +
			'<div class="filter_item"><label class="item_title" data-name="ground">地面处理方式：</label> ' +
			'<div class="item_mod"><a class="' + (optionObj == null || optionObj == undefined || optionObj["ground"] == 'smdb' ? 'cit' : '') + '" rel="nofollow" data-val="smdb">实木地板</a> ' +
			'<a class="' + (optionObj != null && optionObj != undefined && optionObj["ground"] == 'qhfhdb' ? 'cit' : '') + '" rel="nofollow" data-val="qhfhdb">强化复合地板</a><a class="' + (optionObj != null && optionObj != undefined && optionObj["ground"] == 'cz' ? 'cit' : '') + '" rel="nofollow" data-val="cz">铺设瓷砖</a></div></div> ';
		if(type == "zw" || type == "ymj" || type == "cw" || type == "etf" || type == "fmf") {
			strLi += '<div class="filter_item"><label class="item_title" data-name="wardrobe" >衣柜制作方式：</label> ' +
				'<div class="item_mod"><a class="' + (optionObj == null || optionObj == undefined || optionObj["wardrobe"] == true ? 'cit' : '') + '" rel="nofollow" data-val="true" >木工制作衣柜</a> ' +
				'<a class="' + (optionObj != null && optionObj != undefined && optionObj["wardrobe"] == false ? 'cit' : '') + '" rel="nofollow" data-val="false" >自行购买衣柜</a></div></div> ';
		}
		if(type == "zw" || type == "cw" || type == "etf" || type == "fmf" || type == "ymj" || type == "sf" || type == "kct") {
			strLi += '<div class="filter_item"><label class="item_title" data-name="ceiling" >木工制作吊顶：</label> ' +
				'<div class="item_mod"><a class="' + (optionObj == null || optionObj == undefined || optionObj["ceiling"] == true ? 'cit' : '') + '" rel="nofollow" data-val="true" >需要</a>	 ' +
				'<a class="' + (optionObj != null && optionObj != undefined && optionObj["ceiling"] == false ? 'cit' : '') + '" rel="nofollow" data-val="false" >不需要</a></div></div> ' +
				'<div class="filter_item"><label class="item_title" data-name="wallpaper" >墙面铺贴墙纸：</label> ' +
				'<div class="item_mod"><a class="' + (optionObj == null || optionObj == undefined || optionObj["wallpaper"] == true ? 'cit' : '') + '" rel="nofollow" data-val="true" >需要</a>	 ' +
				'<a class="' + (optionObj != null && optionObj != undefined && optionObj["wallpaper"] == false ? 'cit' : '') + '" rel="nofollow" data-val="false" >不需要</a></div></div> ';
		}
		if(type == "zw" || type == "cw" || type == "etf" || type == "fmf" || type == "ymj" || type == "sf") {
			strLi += '<div class="filter_item"><label class="item_title" data-name="window" >有无飘窗结构：</label> ' +
				'<div class="item_mod"><a class="' + (optionObj == null || optionObj == undefined || optionObj["window"] == true ? 'cit' : '') + '" rel="nofollow" data-val="true" >有飘窗</a> ' +
				'<a class="' + (optionObj != null && optionObj != undefined && optionObj["window"] == false ? 'cit' : '') + '" rel="nofollow" data-val="false" >没有飘窗</a></div></div> ';
		}
		if(type == "etf" || type == "sf") {
			strLi += '<div class="filter_item"><label class="item_title" data-name="tatami" >榻榻米的制作：</label> ' +
				'<div class="item_mod"><a class="' + (optionObj == null || optionObj == undefined || optionObj["tatami"] == true ? 'cit' : '') + '" rel="nofollow" data-val="true" >木工制作榻榻米</a> ' +
				'<a class="' + (optionObj != null && optionObj != undefined && optionObj["tatami"] == false ? 'cit' : '') + '" rel="nofollow" data-val="false" >自行购买榻榻米</a></div></div> ';
		}
		if(type == "sf") {
			strLi += '<div class="filter_item"><label class="item_title" data-name="bookcase" >书桌书柜选择：</label> ' +
				'<div class="item_mod"><a class="' + (optionObj == null || optionObj == undefined || optionObj["bookcase"] == true ? 'cit' : '') + '" rel="nofollow" data-val="true" >木工制作简易书桌书柜</a> ' +
				'<a class="' + (optionObj != null && optionObj != undefined && optionObj["bookcase"] == false ? 'cit' : '') + '" rel="nofollow" data-val="false" >购买成品书桌书柜</a></div></div> ';
		}
		if(type == "etf") {
			strLi += '<div class="filter_item"><label class="item_title" data-name="desk" >书桌书架选择：</label> ' +
				'<div class="item_mod"><a class="' + (optionObj == null || optionObj == undefined || optionObj["desk"] == true ? 'cit' : '') + '" rel="nofollow" data-val="true" >木工制作简易书桌书架</a> ' +
				'<a class="' + (optionObj != null && optionObj != undefined && optionObj["desk"] == false ? 'cit' : '') + '" rel="nofollow" data-val="false" >购买成品书桌书架</a></div></div> ';
		}
		if(type == "kct") {
			strLi += '<div class="filter_item"><label class="item_title" data-name="shoebox" >鞋柜制作方式：</label> ' +
				'<div class="item_mod"><a class="' + (optionObj == null || optionObj == undefined || optionObj["shoebox"] == true ? 'cit' : '') + '" rel="nofollow" data-val="true" >木工制作鞋柜</a> ' +
				'<a class="' + (optionObj != null && optionObj != undefined && optionObj["shoebox"] == false ? 'cit' : '') + '" rel="nofollow" data-val="false" >自行购买鞋柜</a></div></div> ' +
				'<div class="filter_item"><label class="item_title" data-name="wine_cabinet" >酒柜制作方式：</label> ' +
				'<div class="item_mod"><a class="' + (optionObj == null || optionObj == undefined || optionObj["wine_cabinet"] == true ? 'cit' : '') + '" rel="nofollow" data-val="true" >木工制作酒柜</a> ' +
				'<a class="' + (optionObj != null && optionObj != undefined && optionObj["wine_cabinet"] == false ? 'cit' : '') + '" rel="nofollow" data-val="false" >自行购买酒柜</a></div></div> ';
		}
		if(type == "yt") {
			strLi += '<div class="filter_item"><label class="item_title" data-name="hanging_cabinet" >木工制作吊柜：</label> ' +
				'<div class="item_mod"><a class="' + (optionObj == null || optionObj == undefined || optionObj["hanging_cabinet"] == true ? 'cit' : '') + '" rel="nofollow" data-val="true" >需要</a> ' +
				'<a class="' + (optionObj != null && optionObj != undefined && optionObj["hanging_cabinet"] == false ? 'cit' : '') + '" rel="nofollow" data-val="false" >不需要</a></div></div> ';
		}
		if(type == "cf") {
			strLi += '<div class="filter_item"><label class="item_title" data-name="cupboard" >木工制作橱柜：</label> ' +
				'<div class="item_mod"><a class="' + (optionObj == null || optionObj == undefined || optionObj["cupboard"] == true ? 'cit' : '') + '" rel="nofollow" data-val="true" >需要</a> ' +
				'<a class="' + (optionObj != null && optionObj != undefined && optionObj["cupboard"] == false ? 'cit' : '') + '" rel="nofollow" data-val="false" >不需要</a></div></div> ';
		}
		strLi += '</div><div class="savediv"><input type="button" class="saveBtn J_btnR" value="保存工艺"></div> ';
		$(".mainareadiv .filter_nav ").html(strLi);
	},
	/**
	 * 当前对象内容文本初始化
	 * @param {Object} id 当前对象名
	 */
	initThisObjContentStrEvent: function(id) {
		var self = this;
		var strLi;
		var cnid = $(".I" + id).data("type"),
			rnid = $(".JroomName").data("rn");
		if(cnid != null && cnid != undefined && rnid != null && rnid != undefined) {
			if(cnid == rnid) {
				strLi = '<div class="prompt"><i>&nbsp;</i><span>请先选择左边的房间</span></div>';
				$(".mainareadiv .filter_nav ").html(strLi);
			}
		}
	},
	/**
	 * 当前对象内容文本初始化
	 * @param {Object} id 当前对象名
	 */
	initcontentStrEvent: function() {
		var self = this;
		var strLi;
		strLi = '<div class="prompt"><i>&nbsp;</i><span>请先选择左边的房间</span></div>';
		$(".mainareadiv .filter_nav ").html(strLi);
	},
	/**
	 * 房间的相关配置选择
	 */
	roomConfigureSelectEvent: function() {
		var self = this;
		$(document).on("click", ".filter_item a", function() {
			$(this).addClass("cit").siblings().removeClass("cit");
		});
		$(document).off("click", ".J_btnR").on("click", ".J_btnR", function() {
			var $filterNav = $(this).closest("div.filter_nav");
			var dataObj = {},
				resObj = {},
				roomName;
			roomName = $filterNav.find(".JroomName").data("rn");
			$.each($filterNav.find(".filter_item"), function(i, elem) {
				dataObj[$(elem).find("label").data("name")] = $(elem).find("div.item_mod a.cit").data("val");
			});
			resObj[roomName] = dataObj;
			$(".J" + roomName).attr("data-option", JSON.stringify(resObj));
			$(".J" + roomName).attr("data-sw", 1);
			$(".J" + roomName).closest("li").children("span").addClass("Jcol").removeClass("none").html(Msg2);
			//          layer.msg('保存成功', {
			//              time: 800   //1秒关闭(如果不配置,默认是3秒)
			//          });
		});
	},
	lastdivClickEvent: function() {
		$(document).on("click", ".lastdiv input[type='checkbox']", function() {
			var $this = $(this);
			if($this.is(':checked')) { //是否默认地址 1:默认地址 2:非默认地址
				$this.siblings("s").addClass("rep_craft_check");
				$this.attr("data-select", "1");
			} else {
				$this.siblings("s").removeClass("rep_craft_check");
				$this.attr("data-select", "0");
			}
		});
	},
	/**
	 * 提交计算结果
	 */
	sumbitCalEvent: function() {
		var self = this;

		$(document).off("click", ".nowcal").on("click", ".nowcal", function() {
			var calObj = {};
			var room_distribution = {};
			var floorObj = {};
			var jsum = 0;
			var difference = 0;
			var msgStr = '';
			calObj.city = $("#Jcity").text() + '市'; // 城市
			calObj.area = $("#c_area").val(); // 面积
			calObj.room_num = $(".room span").text(); // 房间数
			calObj.parlor_num = $(".parlor span").text(); // 客厅数
			calObj.bathroom_num = $(".bathroom span").text(); // 卫生间数
			calObj.balcony_num = $(".balcony span").text(); // 阳台数
			room_distribution["master"] = 1; //主卧数量
			room_distribution["second"] = $(".Jsecond").val(); //次卧数量
			room_distribution["child"] = $(".Jchild").val(); //儿童房数量
			room_distribution["parent"] = $(".Jparent").val(); //父母房数量
			room_distribution["cloakroom"] = $(".Jcloakroom").val(); //衣帽间数量
			room_distribution["study"] = $(".Jstudy").val(); //书房数量
			calObj.room_distribution = room_distribution;
			calObj.master_distribution = self.initGetCalDataEvent($(".Jzw")); // 主卧参数
			calObj.second_distribution = self.initGetCalDataEvent($(".Jcw")); // 次卧参数
			calObj.child_distribution = self.initGetCalDataEvent($(".Jetf")); // 儿童房参数
			calObj.parent_distribution = self.initGetCalDataEvent($(".Jfmf")); // 父母房参数
			calObj.cloakroom_distribution = self.initGetCalDataEvent($(".Jymj")); // 衣帽间参数
			calObj.study_distribution = self.initGetCalDataEvent($(".Jsf")); // 书房参数
			calObj.parlor_distribution = self.initGetCalDataEvent($(".Jkct")); // 客餐厅参数
			calObj.balcony_distribution = self.initGetCalDataEvent($(".Jyt")); // 阳台参数
			calObj.kitchen_distribution = self.initGetCalDataEvent($(".Jcf")); // 厨房参数
			floorObj = self.initGetFloorDataEvent($(".othersdiv .filter_item")); // 电梯参数
			// 判断是否选择了有电梯
			if(floorObj.isElevator == 0) { // 如果有电梯，那么直接赋值0给后台
				calObj.floor = floorObj.isElevator; // 楼层数参数
			} else if(floorObj.isElevator == -1) { // 如果无电梯
				calObj.floor = floorObj.floor; // 楼层数参数
			}
			calObj.wall = $("#qtccgcRadio").attr("data-select"); // 墙体改造
			calObj.ground_sank = $("#wsjdmxcRadio").attr("data-select"); // 卫生间地面下沉
			console.log(calObj);
			var jSw = $(".Jzw").attr('data-sw'); //主卧
			var kSw = $(".Jkct").attr('data-sw'); //客餐厅
			var ySw = $(".Jyt").attr('data-sw'); //阳台
			var cSw = $(".Jcf").attr('data-sw'); //厨房
			var flag = true;
			console.log(roomPlanObj)
			$.each(roomPlanObj, function(i, v) {
				if(v.count != '0') {
					if($(".I" + i).attr("data-sw") == '0') {
						flag = false;
					}
				}
				jsum += v.count;
			});
			difference = (parseInt($(".room").find("span").text()) - 1) - jsum;
			console.log(jsum)
			console.log(difference)
			if($('#c_area').val() == '') {
				layer.msg('建筑面积还没有填哦~~');
			} else if(difference > 0) {
				layer.msg('您还有' + difference + '间房间没有安排');
			} else if(jSw == '0') {
				layer.msg('主卧还没有保存工艺哦~~');
			} else if(kSw == '0') {
				layer.msg('客餐厅还没有保存工艺哦~~');
			} else if(ySw == '0') {
				layer.msg('阳台还没有保存工艺哦~~');
			} else if(cSw == '0') {
				layer.msg('厨房还没有保存工艺哦~~');
			} else if(flag) {
				$.ajax({
					url: COUNTURL,
					type: "GET",
					async: true,
					dataType: 'jsonp',
					data: {
						calculator_json: JSON.stringify(calObj)
					},
					beforeSend: function() {
						$("#loading").removeClass("display");
					},
					success: function(data) {
						console.log(data);
						if(data.code == '000') {
							var costObj = {};
							costObj.gzrg = data.data.gzrg; // 工长人工费用
							costObj.sdrg = data.data.sdrg; // 水电人工费用
							costObj.wgrg = data.data.wgrg; // 瓦工人工费用
							costObj.mgrg = data.data.mgrg; // 木工人工费用
							costObj.yqgrg = data.data.yqgrg; // 油漆工人工费用
							costObj.zgrg = data.data.zgrg; // 杂工人工费用
							costObj.rgzj = data.data.rgzj; // 人工总价费用
							costObj.zdsdcl = data.data.zdsdcl; // 中端水电材料费用
							costObj.gdsdcl = data.data.gdsdcl; // 高端水电材料费用
							costObj.wgfc = data.data.wgfc; // 瓦工辅材费用
							costObj.mgfc = data.data.mgfc; // 木工辅材费用
							costObj.yqcl = data.data.yqcl; // 油漆材料费用
							costObj.czdd = data.data.czdd; // 瓷砖低端费用
							costObj.czgd = data.data.czgd; // 瓷砖高端费用
							costObj.bc = data.data.bc; // 板材费用
							costObj.dls = data.data.dls; // 大理石费用
							costObj.db = data.data.db; // 地板费用
							costObj.mm = data.data.mm; // 木门费用
							costObj.cfym = data.data.cfym; // 厨房移门费用
							costObj.lyfym = data.data.lyfym; // 淋浴移门费用
							costObj.ygym = data.data.ygym; // 衣柜移门费用
							costObj.jcdd = data.data.jcdd; // 集成吊顶费用
							costObj.cgsys = data.data.cgsys; // 橱柜石英石费用
							costObj.zxzj = data.data.zxzj; // 装修总价
							sessionStorage.payJson = JSON.stringify(costObj);
							var url = "calresult.html#/calresult";
							window.location.href = url + "?cs=" + calObj.city + "&mj=" + calObj.area + "&fj=" + calObj.room_num + "&kt=" + calObj.parlor_num + "&wsj=" + calObj.bathroom_num + "&yt=" + calObj.balcony_num;
						} else if(data.code == 200) {
							layer.alert(data.msg);
						}

					},
					complete: function() {
						$("#loading").addClass("display");
					},
					error: function(data) {}
				});
			} else {
				$.each(roomPlanObj, function(i, v) {
					if(v.count != '0') {
						if($(".I" + i).attr("data-sw") == '0') {
							msgStr += v.cname+",";
						}
					}
				});
				msgStr = msgStr.substring(0, msgStr.lastIndexOf(','));
				layer.msg(msgStr+"还没有保存工艺");
			}

		});
	},
	initGetCalDataEvent: function(element) {
		var dataObj = {};
		var sw = element.attr("data-sw");
		var optionObj;
		var type = element.data("type");
		if(sw != null && sw != undefined) {
			if(parseInt(sw) != 0) {
				optionObj = JSON.parse(element.attr("data-option"));
				dataObj = optionObj[type];
			}
		}

		return dataObj;
	},
	initGetFloorDataEvent: function(element) {
		var dataObj = {};
		$.each(element, function(i, elem) {
			dataObj[$(elem).find("label").data("name")] = $(elem).find("div.item_mod a.cit").data("val");
		});
		return dataObj;
	}
};

$(function() {
	var HHIT_CENTERAPP = angular.module('heeyhomeApp');
	HHIT_CENTERAPP.controller('calCtrl', ['$scope', '$http', function($scope, $http) {
		heeyhomeCal.init()
	}]);
});