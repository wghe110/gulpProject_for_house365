define(function() {
	(function(win) {
		var he = [
			' ^_______^',
			'����    �� ��',
			'�� ? �� ? ��',
			' �С��𡪡��𡪩� ',
			' ��ߣߣߡ�'
		];
		var result = '\n';
		for (var i = 0, _len = he.length; i < _len; i++) {
			result = result + he[i] + '\n';
		}
		result += '\nǰ��һö������http://www.cnblogs.com/hege/\nGithub��ַ��https://github.com/wghe110\n��죺397856638';
		if (win.console) {
			console.log(result);
		}
	})(window)
})