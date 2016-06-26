// require('es6-promise').polyfill();
var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('default', ['dev']);

gulp.task('dev', function () {
    gulp.src([
        'source_code/maf.js',
        'source_code/maf_proto_actions.js',
        'source_code/maf_proto_getCollectedData.js',
        'source_code/maf_proto_onBeforeExchange.js',
        'source_code/maf_proto_getExchangeData.js'
    ])
        .pipe(concat('maf.js'))
        .pipe(gulp.dest('min/'))
});
