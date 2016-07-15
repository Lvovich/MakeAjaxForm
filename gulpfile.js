var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sequence = require('gulp-sequence'),
    concat = require('gulp-concat');

gulp.task('default', sequence('clean_release', ['build_release']));

gulp.task('dev', ['dev']);

gulp.task('clean_release', function () {
    return gulp.src(['release/*'], {read: false})
        .pipe(clean());
});

gulp.task('build_release', function () {
    gulp.src([
            'source_code/copyright.js',
            'min/maf.min.js'
        ])
        .pipe(concat('maf.min.js'))
        .pipe(gulp.dest('release/'))
});

gulp.task('dev', function () {
    gulp.src([
            'source_code/maf.js',
            'source_code/maf_proto_actions.js',
            'source_code/maf_proto_getCollectedData.js',
            'source_code/maf_proto_onBeforeExchange.js',
            'source_code/maf_proto_getExchangeData.js'
        ])
        .pipe(concat('maf.js'))
        .pipe(gulp.dest('release/'))
});
