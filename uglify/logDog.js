(function(win){
	var he = [
		' ^_______^',
		'│　    ＊ │',
		'│ ❤ ε ❤ │',
		' ┬—○——○—┬ ',
		' ○＿＿＿○'
		];
	var result ='\n';
	for(var i = 0, _len = he.length; i < _len; i++){
		result =result + he[i] + '\n';
	}
	result += '\n前端一枚，博客http://www.cnblogs.com/hege/\nGithub地址：https://github.com/wghe110\n企鹅：397856638';
	if(win.console){
		console.log(result);
	}
})(window)