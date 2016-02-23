require.config({
	urlArgs: 'ver=20160218',
	paths: {
		zepto: 'http://zt.house365.com/project/nj/2016/01/19/commentJs/zepto.min'
	},
	shim: {
		'zepto':{
			exports: '$'
		}
	}
});
require(['zepto'],function($){

	function checkGift(){
		var _index = 0;
		if(num_lantern == 0 ){
			return;
		}else if(num_lantern >= limit_gift[2]){
			_index = 2;
		}else if(num_lantern >= limit_gift[1] && num_lantern < limit_gift[2]){
			_index = 1;
		}
		var _gift = $('.js-lantern-pro__item').eq(_index).text();
		$('#js-gift--get').html(_gift);
		$('.js-lantern-pro__item').eq(_index).addClass('lantern-pro__item--light').siblings().removeClass('lantern-pro__item--light');
	}
	
	var isLoadFinish = false;
	function preLoad(aImg){
		var _index = 0;
		for(var i=0,len=aImg.length; i<len; i++){
			var newImg = new Image();
			newImg.src = aImg[i];
			newImg.onload = function(){
				_index++;
				if(_index >= len){
					//loadFinish
					isLoadFinish = true;
				}
			}
		}
	}
	preLoad(aLoadImg);
	//init
	$(document).on('touchmove', function(e){e.preventDefault();})
	$('#js-num--lantern').html(num_lantern);
	$('#js-gift--get').html(gift_get);
	checkGift();
	var win_h = $(window).height();
	$('body').css('height',win_h + 'px');
	$('.pressBtn').on('touchstart', function(){
		$(this).addClass('pressScale');
	})
	$('.pressBtn').on('touchend', function(){
		$(this).removeClass('pressScale');
	})
	//home
	$('.js-btn--start').on('tap',function(){
		if(isLoadFinish){
			$('.js-section--game').show();
		}else{
			$('.js-section--pop, .js-pop-loading').show();
			var _timer = setInterval(function(){
				if(isLoadFinish){
					clearInterval(_timer);
					$('.js-section--pop, .js-pop-loading').hide();
					$('.js-section--game').show();
				}
			},300)
		}
	})
	//game
	$('.js-btn--progress').on('tap', function(){
		if($(this).hasClass('noClick')) return;
		$('.js-section--progress').show();
	})
	$('.js-btn--light').on('tap', function(){
		if($(this).hasClass('noClick')) return;
		$(this).addClass('noClick');
		$('.js-btn--progress').addClass('noClick');
		if(num_canLight <= 0){
			$('.js-section--pop, .js-pop-timeUp').show();
			return;
		}
		num_canLight--;
		num_lantern++;
		$('#js-num--lantern').html(num_lantern);
		$('.js-lantern').addClass('lantern--light');
		$('.js-points-light').addClass('points-light--show');
		setTimeout(function(){
			checkGift();
		}, 800);
		setTimeout(function(){
			$('.js-section--pop, .js-pop-inp').show();
		}, 2200);
	})
	$('.js-btn--submit').on('tap', function(){
		if($(this).hasClass('noClick')) return;
		$(this).addClass('noClick');
		//验证表单(未验证)
		$('.js-section--pop, .js-pop-inp').hide();
		$('.js-section--info').show();
	})
	//progress
	$('.js-section--progress .js-btn--goBack').on('tap', function(){
		$('.js-section--progress').hide();
	})
	//info
	$('.js-section--info .js-btn--goBack').on('tap', function(){
		$('.js-section--info').hide();
		$('.js-btn--progress').removeClass('noClick');
		$('.js-btn--light').removeClass('noClick');
	})
	//pop
	$('.js-pop-timeUp .js-btn--sure').on('tap', function(){
		$('.js-section--pop, .js-pop-timeUp').hide();
		$('.js-btn--progress').removeClass('noClick');
		$('.js-btn--light').removeClass('noClick');
	})

	require(['logDog','tips-hp']);
})