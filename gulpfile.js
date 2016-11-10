var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sequence = require('gulp-sequence'),
    closureCompiler = require('google-closure-compiler').gulp(),
    concat = require('gulp-concat');

gulp.task('default', sequence('clean_release', 'concat', 'google_min', 'build_release'));

gulp.task('dev', ['dev']);

gulp.task('clean_release', function () {
    return gulp.src(['release/*'], {read: false})
        .pipe(clean());
});

gulp.task('concat', function () {
    return gulp.src([
        'source_code/maf.js',
        'source_code/maf_proto_actions.js',
        'source_code/maf_proto_getCollectedData.js',
        'source_code/maf_proto_onBeforeExchange.js',
        'source_code/maf_proto_getExchangeData.js'
    ])
        .pipe(concat('maf.min.js'))
        .pipe(gulp.dest('min/'));
});

gulp.task('google_min', function () {
    return gulp.src('min/maf.min.js')
        .pipe(closureCompiler({
            compilation_level: 'ADVANCED',
            warning_level: 'VERBOSE',
            language_in: 'ECMASCRIPT5_STRICT',
            language_out: 'ECMASCRIPT5_STRICT',
            output_wrapper: '%output%',
            js_output_file: 'maf.min.js'
        }))
        .pipe(gulp.dest('min/'));
});

gulp.task('build_release', function () {
    return gulp.src([
            'source_code/copyright.js',
            'min/maf.min.js'
        ])
        .pipe(concat('maf.min.js'))
        .pipe(gulp.dest('release/'))
});

gulp.task('dev', function () {
    return gulp.src([
            'source_code/maf.js',
            'source_code/maf_proto_actions.js',
            'source_code/maf_proto_getCollectedData.js',
            'source_code/maf_proto_onBeforeExchange.js',
            'source_code/maf_proto_getExchangeData.js'
        ])
        .pipe(concat('maf.min.js'))
        .pipe(gulp.dest('release/'))
});
