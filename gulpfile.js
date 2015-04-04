var gulp = require("gulp");
var babel = require("gulp-babel");
var uglify = require('gulp-uglifyjs');

gulp.task('babel', function () {
  gulp.src('src/speed.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('uglify', function() {
  gulp.src('dist/speed.js')
    .pipe(uglify('speed.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('./src/*.js', ['babel']);
  gulp.watch('./dist/*.js', ['uglify']);
});

gulp.task('default', ['watch']);
