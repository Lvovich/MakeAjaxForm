var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sequence = require('gulp-sequence'),
    closureCompiler = require('google-closure-compiler').gulp(),
    concat = require('gulp-concat');

gulp.task('default', sequence('clean', 'concat', 'google_min', 'add_info'));

gulp.task('dev', sequence('clean', 'concat'));

gulp.task('clean', function () {
    return gulp.src(['release/*'], {read: false})
        .pipe(clean());
});

gulp.task('concat', function () {
    return gulp.src([
        'source_code/_wrapper_begin.js',
        'source_code/maf.js',
        'source_code/maf_*.js',
        'source_code/_wrapper_end.js'
    ])
        .pipe(concat('maf.min.js'))
        .pipe(gulp.dest('release/'));
});

gulp.task('google_min', function () {
    return gulp.src('release/maf.min.js')
        .pipe(closureCompiler({
            compilation_level: 'ADVANCED',
            warning_level: 'VERBOSE',
            language_in: 'ECMASCRIPT5_STRICT',
            language_out: 'ECMASCRIPT5_STRICT',
            output_wrapper: '(function(){%output%})();',
            js_output_file: 'maf.min.js'
        }))
        .pipe(gulp.dest('release/'));
});

gulp.task('add_info', function () {
    return gulp.src([
            'source_code/copyright.js',
            'release/maf.min.js'
        ])
        .pipe(concat('maf.min.js'))
        .pipe(gulp.dest('release/'))
});
