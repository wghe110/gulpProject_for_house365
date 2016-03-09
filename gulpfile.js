/**
 * 前端gulp自动化配置文件
 * 命令：gulp server ------  开启本地服务器
 * 命令：gulp  ------------  压缩图片、js、css、清缓存、上传服务器、打开服务器地址
 * 命令：gulp reset  ------  重置开发目录src下文件，并把原来的src文件备份在backup文件下，方便恢复
 * 命令：gulp goBack ------  恢复上一次开发的src目录，该目录保存在backup目录下
 */
var gulp=require("gulp"),
	imagemin=require("gulp-imagemin"),				//图片压缩，及插件
	pngquant=require("imagemin-pngquant"),
	jpegRecompress=require("imagemin-jpeg-recompress"),
	minifyCss = require('gulp-minify-css'),			//压缩css
	clean=require("gulp-clean"),					//clean目录
	browserSync = require('browser-sync'),			//页面自动刷新插件browser-sync
	reload = browserSync.reload,
	rev = require('gulp-rev'),						//对文件加MD5码
	revCollector = require('gulp-rev-collector'),	//路径替换	
	rename = require('gulp-rename'),				//更改名字
	iconv = require('gulp-iconv'),					//更改文件编码
	ftp = require('gulp-ftp'),						//上传到服务器ftp
	open = require('gulp-open'),					//打开页面
	replace = require('gulp-replace'),				//字符替换
	gulpSequence = require('gulp-sequence');		//task执行顺序

var uglify = require('gulp-uglify');				//压缩js
var miniHtml = require('gulp-minify-html');			//压缩html
var concat = require('gulp-concat');				//合并文件
var zip = require('gulp-vinyl-zip');				//压缩解压
var del = require('del');							//删除文件

/*======================= 华丽的分割线(config配置项) ============================*/

//上传地址配置
var addr_upload= {
	host:'',
	path:''
}
//用户名和密码
var userName = '';
var userPwd = '';
//本机ip
var ip_localhost = '';

/*======================= 华丽的分割线(生成dist上线版本) ============================*/

//clean目录
gulp.task("clean-dist",function(){
	return gulp.src("dist/**/*")
	.pipe(clean())
})
gulp.task('clean-rev',function(){
	return gulp.src("rev/**/*")
	.pipe(clean())
})

//image处理(压缩图片)
gulp.task("min-png",function(){
	return gulp.src("src/images/**/*.png")
	.pipe(imagemin({
		progressive:false,
		use:[pngquant()]
	}))
	.pipe(rev())
	.pipe(gulp.dest('dist/images/'))
	.pipe(rev.manifest())
	.pipe(rename('png.json'))
	.pipe(gulp.dest('rev/json/'));
});
gulp.task("min-jpg",function(){
	return gulp.src("src/images/**/*.+(jpg|jpeg)")
	.pipe(imagemin({
		use:[jpegRecompress({loops:6})]
	}))
	.pipe(rev())
	.pipe(gulp.dest('dist/images/'))
	.pipe(rev.manifest())
	.pipe(rename('jpg.json'))
	.pipe(gulp.dest('rev/json/'));
})
gulp.task("copy-gif",function(){
	return gulp.src("src/images/**/*.+(gif|GIF)")
	.pipe(rev())
	.pipe(gulp.dest('dist/images/'))
	.pipe(rev.manifest())
	.pipe(rename('gif.json'))
	.pipe(gulp.dest('rev/json/'));
})
gulp.task("copy-media",function(){
	return gulp.src("src/images/**/*.+(mp3|MP3|mp4|MP4)")
	.pipe(rev())
	.pipe(gulp.dest('dist/images/'))
	.pipe(rev.manifest())
	.pipe(rename('media.json'))
	.pipe(gulp.dest('rev/json/'));
})

//css处理
gulp.task("min-css",function(){
	return gulp.src("src/css/**/*.css")
	.pipe(minifyCss())
	.pipe(rev())
	.pipe(gulp.dest('rev/css/'))
	.pipe(rev.manifest())
	.pipe(rename('css.json'))
	.pipe(gulp.dest('rev/json/'));
})

//js处理
gulp.task("deal-js",function(){
	return gulp.src("src/js/**/*.js")
	.pipe(rev())
	.pipe(gulp.dest('rev/js/'))
	.pipe(rev.manifest())
	.pipe(rename('js.json'))
	.pipe(gulp.dest('rev/json'));
})

// 替换MD5清缓存
gulp.task('revConllector-html',function(){
	return gulp.src(['rev/json/**/*.json','src/html/**/*.html'])
	.pipe(revCollector())
	.pipe(replace('<meta charset="UTF-8">','<meta charset="GBK">'))
	.pipe(iconv({
		decoding: 'utf-8',
		encoding: 'GBK'
	}))
	.pipe(gulp.dest('dist/html/'))
})
gulp.task('revConllector-js',function(){
	return gulp.src(['rev/json/**/*.json','rev/js/**/*.js'])
	.pipe(revCollector())
	.pipe(iconv({
		decoding: 'utf-8',
		encoding: 'GBK'
	}))
	.pipe(gulp.dest('dist/js/'))
})
gulp.task('revConllector-css',function(){
	return gulp.src(['rev/json/**/*.json','rev/css/**/*.css'])
	.pipe(revCollector())
	// .pipe(iconv({
	// 	decoding: 'utf-8',
	// 	encoding: 'GBK'
	// }))
	.pipe(gulp.dest('dist/css/'))
})

//上传到服务器ftp
gulp.task('ftp',function(){
	return gulp.src('dist/**')
	.pipe(ftp({
		host: addr_upload.host,
		remotePath:addr_upload.path,
		user:userName,
		pass:userPwd
	}))
})
//打开目标测试地址
gulp.task('openTestAddr',function(){
	return gulp.src('')
	.pipe(open({uri: 'http://zt.house365.com/'+addr_upload.path+'/html/index.html'}));
})

/*======================= 华丽的分割线(默认任务) ============================*/
gulp.task('default', gulpSequence(
	'del',
	// ['clean-rev','clean-dist'],
	['min-png','min-jpg','copy-gif','copy-media','min-css','deal-js'],
	['revConllector-html','revConllector-js','revConllector-css'],
	'ftp',
	'openTestAddr'
))

/*======================= 华丽的分割线(开启本地服务器，自动刷新) ============================*/
//静态服务器
gulp.task('browser-sync',function(){
	browserSync({
		files:'src/**/*.+(html|css|js)',
		server:''
	});
})
//开启本地服务器，自动刷新
gulp.task("server", ['browser-sync'], function(){
	gulp.src('')
	.pipe(open({uri:'http://' + ip_localhost + ':3000/src/html/index.html'}));
});

/*======================= 华丽的分割线(重置目录结构) ============================*/
//del
gulp.task('del', ['backup'], function(){
	del('src/**/*');
	del('dist/**/*');
	del('rev/**/*');
})
//backup
gulp.task('backup', function(){
	return gulp.src('src/**/*')
	.pipe(zip.dest('backup/src.zip'));
})
//reset
gulp.task('reset', ['del','backup'], function(){
	zip.src('reset/src.zip')
	.pipe(gulp.dest('src/'))
})
//goBack
gulp.task('goBack', function(){
	del('src/**/*')
	zip.src('backup/src.zip')
	.pipe(gulp.dest('src/'))
})

/*======================= 华丽的分割线(单个功能) ============================*/
//压缩js
gulp.task('uglify',function(){
	return gulp.src('uglify/*.js')
	.pipe(concat('inpMusic_logHe_tips-hp.js'))
	.pipe(uglify())
	.pipe(gulp.dest('uglify/concat/'));
})
//压缩html
gulp.task('min-html-php',function(){
	return gulp.src('src/html/**/*.+(html|php)')
	.pipe(miniHtml())
	.pipe(gulp.dest('dist/html/'))
})
//生成css雪碧图
// gulp.task('sprites',function(){
// 	return gulp.src('src/images/*.png')
// 	.pipe(sprite())
// 	.pipe(gulp.dest('dist/images/'))
// })

//压缩解压zip
// gulp.task('zip', function(){
// 	return zip.src('src.zip')
// 	.pipe(gulp.dest('zip/'))
// })