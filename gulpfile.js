var gulp = require('gulp'),
    mincss = require('gulp-mini-css'),//css压缩
    concat = require('gulp-concat'),//文件合并
    uglify = require('gulp-uglify'),//js压缩
    imagemin = require('gulp-imagemin'),//压缩图片
	rename = require('gulp-rename'),
	babel = require("gulp-babel"),
    eslint = require('gulp-eslint'),
    autofx = require('gulp-autoprefixer'),    // css 浏览器前缀补全
    cleanCSS = require('gulp-clean-css'),     // 压缩 css
	changed = require('gulp-changed'),
	webpack = require('webpack'),
    gulpwebpack = require('gulp-webpack'),
	runSequence = require('gulp-sequence'),
	htmlmin = require('gulp-htmlmin'),
  es3ify = require("gulp-es3ify");
	
var path = require('path');	
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var precss = require('precss');
var cssnext = require('cssnext');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
	
var webpackOptions = function(dName){
	return {
	output: {
        filename: dName+'.js'
    },
	module: {
        rules: [
		  {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
			  fallback: "style-loader",
			  use: "css-loader"
			})
		  },
			{
			  test: /\.(png|jp?g|gif)(\?.*)?$/,
			  use: [
				  {
					loader: 'url-loader',
					options: {
						name: '/images/[name].[ext]',
						publicPath:"./",
						limit:2048
					}
				  }
				]
			}
		]
    },
	plugins:[
	new webpack.LoaderOptionsPlugin({
		options: {
			postcss: function() {
				return [autoprefixer, precss, cssnano, cssnext]
			},
		}
	}),
	new ExtractTextPlugin("./css/"+dName+".min.css"),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),
	new HtmlWebpackPlugin({
		filename:"./"+dName+".html",
		template:"./src/html/"+dName+".ejs",
		favicon:"./src/images/256.ico",
		hash:true
		//hash:false
	})
	]}	
}
var h5_src_js = './src/h5',
    h5_dest_js = './dest',
    pc_src_js = './src/pc',
    pc_dest_js = './dest',
	src_css = './webpack/css',
	dest_css = './dest/css';
	
var autofxConfig = {
       browsers: [
          'ie >= 8',
          'ie_mob >= 10',
          'ff >= 30',
          'chrome >= 34',
          'safari >= 7',
          'opera >= 23',
          'ios >= 5',
          'android >= 4.4',
          'bb >= 10'
       ],
       cascade: true,
       remove: true
    };	
var cleanCSSConfig = {
       compatibility: 'ie8',
       keepSpecialComments: '*'
    };	
	
gulp.task('mincss', function () {
    gulp.src(src_css+'/*.css')
		.pipe(changed(dest_css))
		.pipe(autofx(autofxConfig))
		.pipe(cleanCSS(cleanCSSConfig))
        .pipe(mincss())
        .pipe(gulp.dest(dest_css));
});

gulp.task('minimg', function() {
	return gulp
		.src('./webpack/images/*.{png,jpg,gif,ico}')
		.pipe(imagemin())
		.pipe(gulp.dest('./dest/images'));
})

gulp.task('minhtml', function() {
	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src('./webpack/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./dest'));
})
	
gulp.task('minpcjs', function () {
     gulp.src('./webpack/pc.js')
		.pipe(babel({  
            presets: ['es2015']  
        }))
         .pipe(uglify({
			 ie8:true
		 }))
		 
		 .pipe(concat("pc.js"))
         .pipe(gulp.dest(pc_dest_js));
})	
	
gulp.task('minh5js', function () {
     gulp.src('./webpack/h5.js')
		.pipe(babel({  
            presets: ['es2015']  
        }))
         .pipe(uglify({
			 ie8:true
		 }))
		 .pipe(concat("h5.js"))
         .pipe(gulp.dest(h5_dest_js));
})
gulp.task('copyJq', function() {
	return gulp.src(['webpack/jquery-1.7.2.min.js'])
	.pipe(babel({  
            presets: ['es2015']  
	}))
	 .pipe(uglify({
		 ie8:true
	 }))
    .pipe(gulp.dest('./dest'));
});
gulp.task('copySwf', function() {
	return gulp.src(['webpack/audio/*.swf'])
    .pipe(gulp.dest('./dest/audio'));
});
gulp.task('copyImg', function() {
	return gulp.src(['webpack/*.ico'])
    .pipe(gulp.dest('./dest'));
});
gulp.task('webpackpc', function() {
  return gulp.src(['src/js/pc.js'])
    .pipe(gulpwebpack(webpackOptions("pc")))
    .pipe(gulp.dest('./webpack'));
});
gulp.task('webpackcopySwf', function() {
	return gulp.src(['src/js/audiojs/*.swf'])
    .pipe(gulp.dest('./webpack/audio'));
});
gulp.task('webpackh5', function() {
  return gulp.src(['src/js/h5.js'])
    .pipe(gulpwebpack(webpackOptions("h5")))
    .pipe(gulp.dest('./webpack'));
});
gulp.task('webpackSwiper', function() {
  return gulp.src(['src/swiper.js'])
    .pipe(gulpwebpack(webpackOptions("swiper")))
    .pipe(gulp.dest('./webpack'));
});
gulp.task('prod', function(callback) {  
	//runSequence('webpackpc','webpackcopySwf',callback);
	//runSequence('webpackSwiper',callback);
  runSequence('webpackSwiper','webpackpc','webpackh5','webpackcopySwf',['minh5js','minpcjs','mincss','minimg','minhtml','copyJq','copySwf','copyImg'],callback);
});

var websocketOptions = function(){
	return {
	output: {
        filename: 'websocket.js'
    },
	module: {
      rules: [
      ]
    },
	plugins:[

	]}	
}

gulp.task('websocketjs', function () {
    return gulp.src('openfire-websocket/client.js')
		.pipe(gulpwebpack(websocketOptions()))
    .pipe(babel({  
            presets: ['es2015']  
    }))
    .pipe(es3ify())
     .pipe(uglify({
       ie8:true
     }))
    .pipe(gulp.dest(pc_dest_js));
})

gulp.task('default', function(callback) {  
	gulp.run('websocketjs',callback);
});