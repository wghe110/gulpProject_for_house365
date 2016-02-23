require.config({
	urlArgs: 'ver=20151215',
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
	
})