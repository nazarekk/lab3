//Подключаем модуль Gulp
const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const fs = require('fs');
const path = require('path');
const merge = require('merge-stream');
const spritesmith = require('gulp.spritesmith');
const gulpStylus = require('gulp-stylus');

//Порядок подключения css файлов
const cssFiles = [
	'./css/bootstrap.min.css',
	'./css/jquery.fancybox.min.css'];

//Порядок подключения css файлов
const jsFiles = [
	'./js/jquery-3.6.0.min.js',
	'./js/popper.min.js'];



//Таск для стилей CSS 
function styles() {
	//Шаблон для поиска файлов CSS
	return gulp.src('./css/*.css')
	//Объединение файлов в один
	.pipe(concat('style.css'))
	//Минификация CSS
	.pipe(cleanCSS({
		level: 2
	}))
	//Выходная папка для стилей
	.pipe(gulp.dest('./build/css'))
}

//Таск для скриптов JavaScript 
function scripts() {
	//Шаблон для поиска файлов JavaScript
	const path1 = gulp.src('./js/*.js', { sourcemaps: true });

	const path2 = gulp.src('./dist/*.js', { sourcemaps: true });

    return merge(path1, path2)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('script-gulp.js'))
        //Минификация JavaScript
        .pipe(uglify())
        //Выходная папка для стилей
        .pipe(gulp.dest('./build/js'));
}


function sprite() {
    const spriteData = 
        gulp.src('img/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite-gulp.png',
                cssName: 'sprite-gulp.css',
                imgPath: './build/img/sprite-gulp.png'
            }));

    spriteData.css.pipe(gulp.dest('./build/styles/')); // путь, куда сохраняем стили
    return spriteData.img.pipe(gulp.dest('./build/img/')); // путь, куда сохраняем картинку

    
}


//Вызов функций
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('sprites', sprite);
