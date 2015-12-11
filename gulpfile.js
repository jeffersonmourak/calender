var gulp = require('gulp');
var jslint = require('gulp-jslint');
var uglify = require('gulp-uglify');

gulp.task('jslint', function () {
	return gulp.src(['calender.js'])
	.pipe(jslint({
        node: true,
        nomen: true,
        global: ['angular'],
        predef: ['angular','location'],
        reporter: 'default',
        errorsOnly: false
    }))
    .on('error', function (error) {
        console.error(String(error));
    });
});

gulp.task('compress', function() {
    return gulp.src('calender.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});