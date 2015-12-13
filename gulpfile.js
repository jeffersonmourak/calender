var gulp = require('gulp');
var jslint = require('gulp-jslint');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('jslint', function () {
	return gulp.src(['calender.js'])
	.pipe(jslint({
        node: true,
        nomen: true,
        global: ['window', 'document', 'continue', 'CustomEvent'],
        predef: ['window', 'document', 'continue', 'CustomEvent'],
        reporter: 'default',
        errorsOnly: false
    }))
    .on('error', function (error) {
        console.error(String(error));
    });
});

gulp.task('lint', function() {
  return gulp.src('calender.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('compress', function() {
    return gulp.src('calender.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});