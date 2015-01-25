var gulp = require('gulp');

var es = require('event-stream');
var serve = require('gulp-serve');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var coffeeify = require('coffeeify');
var source = require('vinyl-source-stream');
var rimraf = require('rimraf');

var mainModuleName = 'unwidgets';

var coffeeSrc = 'src/**/*.coffee';
var coffeeMain = 'src/index.coffee';
var previewSrc = 'preview/**';

var previewDestDir = '.tmp/preview';

function buildCoffee() {
    var b = browserify({ basedir: __dirname });
    b.require('./' + coffeeMain, { expose: mainModuleName });
    b.transform(coffeeify);

    var output = b.bundle();

    output.on('error', function (e) { console.log('browserify error: ' + e); });

    return output
        .pipe(source('bundle.js'))
        .pipe(plumber())
        .pipe(gulp.dest(previewDestDir));

    return output;
}

function buildPreviewStatic() {
    return gulp.src(previewSrc).pipe(gulp.dest(previewDestDir));
}

gulp.task('clean', function(cb) {
    rimraf(previewDestDir, cb);
});

gulp.task('default', ['clean'], function () {
    livereload.listen();
    gulp.watch(coffeeSrc, function () { buildCoffee().pipe(livereload()); });
    gulp.watch(previewSrc, function () { buildPreviewStatic().pipe(livereload()); });

    es.concat(buildCoffee(), buildPreviewStatic()).on('end', function () {
        serve({ root: [__dirname + '/' + previewDestDir] })();
    });
});