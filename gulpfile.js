var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var mergeStream = require('merge-stream');

gulp.task('styles', function(){ // va chercher le css materialize
  gulp.src('./node_modules/materialize-css/dist/css/materialize.min.css')
  .pipe(gulp.dest('./dist/css/'));
});

gulp.task('merge', function(){ // va chercher le js jquery et materialize
  var jquerySrc = gulp.src('./node_modules/jquery/dist/jquery.min.js')
  .pipe(gulp.dest('./dist/js/'));
  var materializeSrc = gulp.src('./node_modules/materialize-css/dist/js/materialize.min.js')
  .pipe(gulp.dest('./dist/js/'));
  return mergeStream(jquerySrc, materializeSrc); // multitâches
});

gulp.task('sass', function() { // compile le scss puis le minifie
  return gulp.src('./assets/scss/*.scss')
  .pipe(sass())
  .pipe(cleanCss())
  .pipe(gulp.dest('./dist/css'))
});

gulp.task('uglify', function () { // minifie le main.js
  gulp.src('./assets/js/*.js')
  
  .pipe(gulp.dest('./dist/js/'))
});


gulp.task('browser-sync', function() {
  browserSync.init({
    server: "./"
  });
}); // définit racine serveur browserSync

gulp.task('gulpwatch', ['styles', 'merge', 'sass', 'uglify', 'browser-sync'], function() {
		gulp.watch('./assets/scss/*.scss',['sass']).on('change', browserSync.reload);
		gulp.watch('./assets/js/*.js', ['uglify']).on('change', browserSync.reload);
		gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['gulpwatch']);


// .pipe(uglify())²