const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const imgCompress = require('imagemin-jpeg-recompress');


/*Сжатие и перенос css-файлов*/
gulp.task('minify-css', function (done) {
  return gulp.src('./src/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist/css'))
  done();
});

/*Перенос js файлов*/
gulp.task('move-js', function (done) {
  return gulp.src('./src/js/*.js')
    .pipe(gulp.dest('dist/js'))
  done();
});

/*Сжатие html-файла*/
gulp.task('html-min', function (done) {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'));
  done();
});


// Optimize images
gulp.task('img', function() {
  return gulp.src('./src/img/**/*.+(jpg|jpeg|png|svg|gif|ico|JPG|JPEG|PNG|SVG|GIF|ICO)')
  .pipe(imagemin([
    imgCompress({
      loops: 4,
      min: 70,
      max: 80,
      quality: 'high'
    }),
    imagemin.gifsicle(),
    imagemin.optipng(),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('./dist/img'));
});


/*Дефолтный таск*/
gulp.task('run', gulp.parallel('minify-css', 'move-js', 'html-min', 'img', function (done) {
  done();
}));