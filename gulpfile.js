var gulp = require('gulp');
var concat = require('gulp-concat');
var tinyJS = require('gulp-uglify');
var tinyStyles = require('gulp-minify-css');

gulp.task('miniCSS', function(){
    console.log('CSS Gulpin`');

    gulp.src('./css/src/**/*.css')
        .pipe( concat('mini.css') )
        .pipe( tinyStyles() )
        .pipe( gulp.dest('./css/dist') )

});

gulp.task('miniJS', function(){
    console.log('JS Gulpin`');

    gulp.src('./js/src/**/*.js')
        .pipe( concat('mini.js') )
        .pipe( tinyJS() )
        .pipe( gulp.dest('./js/dist') )

});

gulp.task('default', function(){
    console.log('GULP!');
    gulp.watch('./css/src/**/*.css', ['miniCSS']);
    gulp.watch('./js/src/**/*.js', ['miniJS'])
});