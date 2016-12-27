var $ = require('./common/libs/zepto-modules/zepto');
require('./common/libs/zepto-modules/event');
require('./common/libs/zepto-modules/ajax');
require('./common/libs/zepto-modules/touch');
var Swiper = require('./common/libs/swiper/swiper.min.js');
var swiperAni = require('./common/libs/swiper/swiper.animate1.0.2.min.js');
var IScroll = require('./common/libs/iscroll/iscroll.js');

// edit index
$(".swiper-container").show();
$("#mainContainer").hide();

var swiper = new Swiper('.swiper-container',{
	pagination: '.swiper-pagination',
	paginationClickable: true,
  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    swiperAni.swiperAnimateCache(swiper); //隐藏动画元素 
    swiperAni.swiperAnimate(swiper); //初始化完成开始动画
  }, 
  onSlideChangeEnd: function(swiper){ 
    swiperAni.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  } 
});

$("#enter").click(function(){
	$(".swiper-container").hide();
	$("#mainContainer").show();
	

	$.post('http://localhost:8000/skill',function(data){
		var len=data.length,
		str="";	
		str+='<ul>';
		for (var i=0;i<len;i++) {
			str+='<li>'+data[i].name+'</li>';
		}
		str+='</ul>';
		$("#skill_slide").on('click',function () {
			$("#scroller").html($(str));
		})
		
		$("#skill_slide").click();
		var myScroll;
		myScroll = new IScroll('#wrapper', { mouseWheel: true });
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	})
	
	
})
$.post('http://localhost:8000/project',function(data){
		var len=data.length,
		str="";	
		str+='<ul>';
		for (var i=0;i<len;i++) {
			str+='<li><h4>'+data[i].name+'</h4><p><img src="'+data[i].images+'"></p><p>'+data[i].description+'</p><p>'+data[i].detail+'</p></li>';
		}
		str+='</ul>';
		
		
		$("#item_slide").on('click',function () {
			$("#scroller").html($(str));
		})
	});
$.post('http://localhost:8000/skill',function(data){
	//console.log($(".swiper-slide").length);添加技能；
		$(".swiper-slide").each(function () {
			$(this).css('background',data[$(this).index()].src);
		})
		var len=data.length,
		str="";
		for (var i=0;i<len;i++) {
			str+='<p class="ani" swiper-animate-effect="fadeInDown" swiper-animate-delay="'+0.3*i+'s">'+data[i].name+'</p>'
		}
		$("#skill").after($(str));
		//切换：
		
})

$("#exp_slide").on('click',function () {
	var str='<ul><li>2008-2012年郑州轻工业学院 &nbsp;经济学本科</li><li>2012/9-2014/9&nbsp;薛永兴氨纶有限公司</li><li>2015/5-2016/12&nbsp;杭州通景网络有限公司</li></ul>';
	$("#scroller").html($(str));
})
$("#me_slide").on('click',function () {
	var str='<ul><li>电话：15557313260</li><li>qq:137473574</li></ul>';
	$("#scroller").html($(str));
});
$("#footer").find('li').on('click',function () {
	$(this).css('color','mediumvioletred').siblings('li').css('color','');
	$("#title").html($(this).find('span').html());
})
var isPlay=true;
$("#music").on('click',function () {
	var mp3=document.getElementById("mp3");
	if (isPlay) {
		$(this).attr('class','icon-play');
		mp3.pause();
		isPlay=false;
	} else{
		$(this).attr('class','icon-pause');
		mp3.play();
		isPlay=true;
	}
})