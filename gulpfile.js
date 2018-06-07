var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var connect = require("gulp-connect");
var sass = require("gulp-sass");

//sass编译
gulp.task("sass",function(){
	gulp.src(["*.scss"])
	.pipe(sass())
	.pipe(gulp.dest("dist\\css"));
});

//定义一个复制文件的任务（命令）
gulp.task("copyfile",function(){
	//gulp.src("index.html").pipe(gulp.dest("dist"));
	gulp.src("*.html").pipe(gulp.dest("dist"));
});

//复制图片文件
gulp.task("images",function(){
	gulp.src("img/*.jpg")
	.pipe(gulp.dest("dist\\img"));
});

//合并文件
// gulp.task("concatjs",function(){
// 	gulp.src(["*.js"])
// 	.pipe(concat("common.js"))
// 	.pipe(gulp.dest("dist"));
// });


// //合并和压缩文件
// gulp.task("concatanduglifyjs",function(){
// 	gulp.src(["js/*.js"])
// 	.pipe(concat("common.js"))
// 	.pipe(uglify())
// 	.pipe(gulp.dest("dist\\js"));
// });



//合并和压缩重命名文件
gulp.task("concatanduglifyandrenamejs",function(){
	gulp.src("*.js")
	.pipe(concat("common.js"))
	.pipe(gulp.dest("dist"))
	.pipe(uglify())
	.pipe(rename("common.min.js"))
	.pipe(gulp.dest("dist\\js"));
});

// //合并和压缩重命名文件
// gulp.task("babel",function(){
// 	gulp.src("js/*.js")
// 	.pipe(babel())
// 	.pipe(gulp.dest("dist\\js"));
// });

//启动监听器
gulp.task("watchall",function(){
	gulp.watch("*.scss",["sass"]);
	gulp.watch("*.html",["copyfile"]);
	gulp.watch("img/*.jpg",["images"]);
	gulp.watch("*.js",["concatanduglifyandrenamejs"]);
});


//简易的web服务器
gulp.task("server",function(){
	connect.server({
		"root":"dist"
	});
});