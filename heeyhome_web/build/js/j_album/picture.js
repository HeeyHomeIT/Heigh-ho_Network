/*! Pc.Heigh-ho.Renovation-1.0.0.js 2017-03-29 */
var selectKey="1",picList=[];!function(){var a="/api/public/personal/myshop/technics",b={init:function(){b.initEvent()},initEvent:function(){var a=this;a.initPictureDataEvent()},initPictureDataEvent:function(){var b=this,c=getUrlParamHandler.getUrlParam("ams"),d=getUrlParamHandler.getUrlParam("voe").split("#")[0];$.ajax({url:a,type:"GET",async:!0,dataType:"jsonp",data:{shop_id:c},success:function(a){$(".back").attr("href","view_shop.html#/shopdetails?pos="+c),$.each(a.data,function(a,c){c.technics_id==d&&($("#cname").text(c.technics_text),$(".ctitle").text(c.technics_text+"的图集相册"),$("#zNum").text(c.technics_img.length),$(".gallery_demo_unstyled").append(spliceAlbumContHandler.spliceSmallPicEvent(c)),b.defaultActiveEvent(c,getUrlParamHandler.getUrlParam("voe").split("#")[1]),$.each(c.technics_img,function(a,b){var c={picPos:a+1,pid:b.img_id,bigPic:""+b.technics_img,thumbPic:""+b.technics_img};picList.push(c)}),b.clickEvent(),b.otherEvent())})},error:function(){}})},defaultActiveEvent:function(a,b){var c;c=null!=b&&void 0!=b?b.split("=")[1]:"1",""==c||"1"==c?($(".maxPicBox").append(spliceAlbumContHandler.spliceBigPicEvent(a,c)),$(".gallery_demo_unstyled li:first").addClass("actives")):($(".maxPicBox").append(spliceAlbumContHandler.spliceBigPicEvent(a,c)),$(".gallery_demo_unstyled li").eq(c-1).addClass("actives"))},clickEvent:function(){$(".gallery_demo_unstyled li:first").siblings().hasClass("actives")||$(".gallery_demo_unstyled li:first").addClass("actives"),$(".gallery_demo_unstyled").children("li").each(function(a){$(this).on("click",function(){controlPicture.changePic(1,a+1)})}),$(".maxBtn-l").on("click",function(){controlPicture.changePic(0)}),$(".maxBtn-r").on("click",function(){controlPicture.changePic(1)}),$(".PicBtn-a-l").on("click",function(){controlPicture.changePic(0)}),$(".PicBtn-a-r").on("click",function(){controlPicture.changePic(1)}),$(".indexbody-left").on("click",function(){controlPicture.changePic(0)}),$(".indexbody-right").on("click",function(){controlPicture.changePic(1)}),$("#showOriginal").on("click",function(){showOriginal.picture()}),$(".information").on({mouseover:function(){picInformation.showCnt()},mouseout:function(){picInformation.hideCnt()}}),$(".download").on("click",function(){picDownload.jsEvent()}),$(".pic-head .back").on("click",function(){var a=window.location.search,b=a.split("&")[0].split("=")[0],c=a.split("&")[0].split("=")[1],d=b.replace(b,"?pos=")+c;window.location.href="view_shop.html#/shopdetails"+d})},otherEvent:function(){var a=controlPicture.selectByurl();a&&(selectKey=a),parseInt(selectKey)>1?controlPicture.changePic(1,parseInt(selectKey),1):controlPicture.checkAndLoadImg($("#mainPic").attr("src"),document.getElementById("mainPic")),controlPicture.turnPageOnkeyDown()}};getUrlParamHandler={getUrlParam:function(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),c=window.location.href.split("?")[1].match(b);return null!=c?unescape(c[2]):null}},spliceAlbumContHandler={spliceBigPicEvent:function(a,b){var c='<img id="mainPic" src="'+a.technics_img[b-1].technics_img+'" />';return c},spliceSmallPicEvent:function(a){var b="";return $.each(a.technics_img,function(a,c){b+='<li id="tu_'+(a+1)+'"><span></span><a href="javascript:void(0);"><img src="'+c.technics_img+'" /></a></li>'}),b}},controlPicture={getPage:1,curPic:selectKey,moveTimer:"",loadAllThumb:!1,playTime:1e4,playState:!0,isPlaying:!1,changeList:function(a,b){var c=this.getPage,d=picList.length;if(d>6){var e=111;c=parseInt(c),"undefined"!=typeof b?(c=parseInt(b),1>c&&(c=1),c>d-5&&(c=d-5)):"1"==a?(c+=3,c>d-5&&(c=d-5)):(c-=3,1>c&&(c=1)),this.getPage=c;var f=(c-1)*e;$(".gallery_demo_unstyled").animate({left:-f},{queue:!1}),(this.curPic>5||c>3)&&this.loadThumbPic()}},changePic:function(a,b){var c=this.curPic,d=picList.length;if(picList){if("undefined"!=typeof b)c=parseInt(b),1>c&&(c=1),c>d&&(c=d);else if("1"==a){if(c=parseInt(c)+1,c>d){var e=$("#nextUrl").attr("href");if(""!=e)return void errorRemind.divTips("当前已是最后一张图片")}}else if(c=parseInt(c)-1,1>c){var f=$("#prevUrl").attr("href");if(""!=f)return void errorRemind.divTips("当前已是第一张图片")}this.checkAndLoadImg(picList[c-1].bigPic,document.getElementById("mainPic")),$("#showOriginal").attr("href",picList[c-1].originalPic),$(".gallery_demo_unstyled").children("li").each(function(){$(this).attr("class","")}),$("#tu_"+c).attr("class","actives"),this.curPic=c,this.changeURl(c),this.preLoad(c),this.changeList(1,c-2),$("#viewNum").html(c),this.playTime=6e3}},preLoad:function(a){controlPicture.superPreLoadImage(picList,parseInt(a))},turnPageOnkeyDown:function(){$(document).keydown(function(a){37==a.keyCode&&controlPicture.changePic(0),39==a.keyCode&&controlPicture.changePic(1)})},loadThumbPic:function(){for(var a=parseInt(this.getPage)-1+6,b=parseInt(this.getPage),c=3,d=0;c&&"undefined"!=typeof picList[b+d-1];)if("undefined"!=typeof $("#tu_"+(b+d)).find("img").attr("name")){var e=picList[b+d-1].thumbPic;$("#tu_"+(b+d)).find("img").attr("name")!=$("#tu_"+(b+d)).find("img").attr("src")&&controlPicture.checkAndLoadImg(e,document.getElementById("tu_"+(b+d)).getElementsByTagName("img")[0],1);var f=new Image;f.src=e,d++,f.complete||b+d>a&&c--}else d++},checkAndLoadImg:function(a,b,c){var d=new Image;d.src=a;var e=c?"image/grey1.gif":"image/loading2.gif";return d.complete?($(b).addClass("display"),b.src=a,$(b).fadeIn("normal")):(b.src=e,$(d).load(function(){$(b).addClass("display"),b.src=a,$(b).fadeIn("normal")})),!0},superPreLoadImage:function(a,b){for(var c=2,d=0;c&&"undefined"!=typeof a[b+d];){var e=new Image;e.src=a[b+d].bigPic,e.complete?d++:(d++,c--)}},selectByurl:function(){var a=window.location.href,b=a.split("#");if("undefined"!=typeof b[1]){var c=b[1].split("=");if("undefined"!=typeof c[1]&&c[1])return(c[1]<1||c[1]>picList.length)&&(c[1]=1),c[1]}return 0},changeURl:function(a){a&&(location.hash="#pn="+a)}},showOriginal={picture:function(){var a=$(".maxPicBox img").attr("src");$("#showOriginal").attr("href",a)}},picInformation={showCnt:function(){var a=document.getElementById("mainPic").naturalWidth,b=document.getElementById("mainPic").naturalHeight;$("#show_news .s_width").html(a),$("#show_news .s_height").html(b),$("#show_news").removeClass("display")},hideCnt:function(){$("#show_news").addClass("display")}},errorRemind={divTips:function(a){$(".demo .tips").removeClass("display"),$(".demo .tips span").html(a),setTimeout(function(){$(".demo .tips").addClass("display")},1500)}},picDownload={jsEvent:function(){var a=$(".maxPicBox img").attr("src"),b=$("<a></a>").attr("href",a).attr("download",a).appendTo("body");b[0].click(),b.remove()}},b.init()}();