// 'use strict';

// Require Gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var sassdoc = require('sassdoc');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');

var onError = function(err) {
  notify.onError({
    title:    "Gulp",
    subtitle: "Failure!",
    message:  "Error: <%= error.message %>",
    sound:    "Beep"
  })(err);
  this.emit('end');
};

// Gulp Sass Task
gulp.task('sass', function() {

  return gulp.src('sass/**/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init()) // Initializes sourcemaps
    // // .pipe(sassdoc())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefix('last 2 versions', '> 1%', 'ie 8'))
    .pipe(sourcemaps.write('./')) // Writes sourcemaps into the CSS file
    .pipe(gulp.dest('./css'));
});

gulp.task('imagemin', function () {
  var imgSrc = 'images/src/**/*',
      imgDest = './images';

  return gulp.src(imgSrc)
    .pipe(newer(imgDest))
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(imgDest));
});

gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('images/src/**/*', ['imagemin']);
})

gulp.task('default', ['sass', 'imagemin', 'watch']);
