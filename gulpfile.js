/**
 * 前端gulp自动化配置文件
 * 命令：gulp server ------  开启本地服务器
 * 命令：gulp clean  ------  清空dist、rev目录下的文件
 * 命令：gulp min    ------  压缩资源(图片、css、js)、移动音频、视频
 * 命令：gulp rev    ------  根据文件MD5码生成版本号(格式?v=xxxxxx)
 * 命令：gulp upload ------  上传到服务器，并打开目标地址
 * 命令：gulp reset  ------  重置目录结构
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
var imageisux = require('gulp-imageisux');			//腾讯智图压缩

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

/*======================= 华丽的分割线(清空目录) ============================*/

gulp.task("clean", function(){
	del('dist/**/*');
	del('rev/**/*');
})

/*======================= 华丽的分割线(生成压缩版本) ============================*/

gulp.task('min', function(){
	//png
	gulp.src("src/images/**/*.png")
	.pipe(imagemin({
		progressive:false,
		use:[pngquant()]
	}))
	.pipe(rev())
	.pipe(gulp.dest('dist/images/'))
	.pipe(rev.manifest())
	.pipe(rename('png.json'))
	.pipe(gulp.dest('rev/json/'));
	//jpg
	gulp.src("src/images/**/*.+(jpg|jpeg)")
	.pipe(imagemin({
		use:[jpegRecompress({loops:6})]
	}))
	.pipe(rev())
	.pipe(gulp.dest('dist/images/'))
	.pipe(rev.manifest())
	.pipe(rename('jpg.json'))
	.pipe(gulp.dest('rev/json/'));
	//gif
	gulp.src("src/images/**/*.+(gif|GIF)")
	.pipe(rev())
	.pipe(gulp.dest('dist/images/'))
	.pipe(rev.manifest())
	.pipe(rename('gif.json'))
	.pipe(gulp.dest('rev/json/'));
	//media
	gulp.src("src/images/**/*.+(mp3|MP3|mp4|MP4)")
	.pipe(rev())
	.pipe(gulp.dest('dist/images/'))
	.pipe(rev.manifest())
	.pipe(rename('media.json'))
	.pipe(gulp.dest('rev/json/'));
	//css
	gulp.src("src/css/**/*.css")
	.pipe(minifyCss())
	.pipe(rev())
	.pipe(gulp.dest('rev/css/'))
	.pipe(rev.manifest())
	.pipe(rename('css.json'))
	.pipe(gulp.dest('rev/json/'));
	//js
	gulp.src("src/js/**/*.js")
	.pipe(rev())
	.pipe(gulp.dest('rev/js/'))
	.pipe(rev.manifest())
	.pipe(rename('js.json'))
	.pipe(gulp.dest('rev/json'));
})

/*======================= 华丽的分割线(生成版本号) ============================*/

gulp.task('rev', function(){
	//html
	gulp.src(['rev/json/**/*.json','src/html/**/*.html'])
	.pipe(revCollector())
	.pipe(replace('<meta charset="UTF-8">','<meta charset="GBK">'))
	.pipe(iconv({
		decoding: 'utf-8',
		encoding: 'GBK'
	}))
	.pipe(gulp.dest('dist/html/'))
	//js
	gulp.src(['rev/json/**/*.json','rev/js/**/*.js'])
	.pipe(revCollector())
	.pipe(iconv({
		decoding: 'utf-8',
		encoding: 'GBK'
	}))
	.pipe(gulp.dest('dist/js/'))
	//css
	gulp.src(['rev/json/**/*.json','rev/css/**/*.css'])
	.pipe(revCollector())
	.pipe(gulp.dest('dist/css/'))
})

/*======================= 华丽的分割线(上传到服务器) ============================*/

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
gulp.task('upload', ['ftp'], function(){
	return gulp.src('')
	.pipe(open({uri: 'http://zt.house365.com/'+addr_upload.path+'/html/index.html'}));
})

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

gulp.task('reset', function(){
	gulp.src('src/**/*')
	.pipe(zip.dest('backup/src.zip'));
	setTimeout(function(){
		del('src/**/*');
		del('dist/**/*');
		del('rev/**/*');
	}, 3000);
	setTimeout(function(){
		zip.src('reset/src.zip')
		.pipe(gulp.dest('src/'));
	}, 6000);
})