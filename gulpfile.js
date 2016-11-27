var gulp = require("gulp");
var bs = require("browser-sync").create();
var jade = require("gulp-jade");
var sass = require("gulp-sass");
var include = require("gulp-include");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var pump = require('pump');

// DIRECTORIOS
var public = "./_public/";
var images = "./images/";

//TAREAS
gulp.task('jade', function () {
  pump([
    gulp.src('views/*.jade'),
    jade(),
    gulp.dest(public),
    bs.stream()
  ])
});

gulp.task('sass', function () {
  pump([
    gulp.src('styles/main.sass'),
    sass({ outputStyle: 'compressed' }),
    autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }),
    gulp.dest(public),
    bs.stream()
  ])
});

gulp.task('javascript', function () {
  pump([
    gulp.src('scripts/main.js'),
    include(),
    uglify(),
    gulp.dest(public),
    bs.stream()
  ])
});

gulp.task('copy-images', function () {
  pump([
    gulp.src(images),
    gulp.dest(`${public}`)
  ])
});

gulp.task('serve', function () {
  bs.init({
    server: public,
    notify: {
      styles: {
        top: 'auto',
        bottom: '0'
      }
    }
  });

  gulp.watch('styles/**/*.sass', ['sass']);
  gulp.watch('views/**/*.jade', ['jade']);
  gulp.watch('scripts/**/*.js', ['javascript']);

});

gulp.task("compile", ['jade', 'sass', 'javascript']);

gulp.task("default", ['compile', 'copy-images', 'serve']);