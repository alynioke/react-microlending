var gulp = require('gulp'),
    source = require('vinyl-source-stream'), // Used to stream bundle for further handling
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    less = require('gulp-less'),
    gulpif = require('gulp-if');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
    'react',
    'react/addons'
];

var browserifyTask = function (options) {

    var tasks = options.src.map(function (srcEntry) {
        // Our app bundler
        var appBundler = browserify({
            entries: [srcEntry], // Only need initial file, browserify finds the rest
            transform: [reactify], // We want to convert JSX to normal javascript
            debug: options.development, // Gives us sourcemapping
            cache: {}, packageCache: {}, fullPaths: options.development // Requirement of watchify
        });

        // We set our dependencies as externals on our app bundler when developing
        (options.development ? dependencies : []).forEach(function (dep) {
            appBundler.external(dep);
        });

        // The rebundle process
        var rebundle = function () {
            var start = Date.now();
            console.log('Building APP bundle');
            appBundler.bundle()
                .on('error', gutil.log)
                .pipe(source(srcEntry))
                // rename them to have "bundle as postfix"
                .pipe(rename({
                    extname: '.bundle.js' //
                }))
                .pipe(gulpif(!options.development, streamify(uglify())))
                .pipe(gulp.dest(options.dest))
                .pipe(notify(function () {
                    console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
                }));
        };

        // Fire up Watchify when developing
        if (options.development) {
            appBundler = watchify(appBundler);
            appBundler.on('update', rebundle);
        }
        rebundle();

        return appBundler;
    });

    // We create a separate bundle for our dependencies as they
    // should not rebundle on file changes. This only happens when
    // we develop. When deploying the dependencies will be included
    // in the application bundle
    if (options.development) {
        var vendorsBundler = browserify({
            debug: true,
            require: dependencies
        });

        // Run the vendor bundle
        var start = new Date();
        console.log('Building VENDORS bundle');
        vendorsBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulp.dest(options.dest + '/js'))
            .pipe(notify(function () {
                console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
            }));
    }
}

var cssTask = function (options) {
    if (options.development) {
        var run = function () {
            var start = new Date();
            console.log('Building CSS bundle');
            gulp.src(options.src)
                .pipe(less())
                .pipe(concat('main.css'))
                .pipe(gulp.dest(options.dest))
                .pipe(notify(function () {
                    console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
                }));
        };
        run();
        gulp.watch(options.src, run);
    } else {
        gulp.src(options.src)
            .pipe(less())
            .pipe(concat('main.css'))
            .pipe(cssmin())
            .pipe(gulp.dest(options.dest));
    }
}

// Starts development workflow
gulp.task('default', function () {
    cssTask({
        development: true,
        src: './css/**/*.less',
        dest: './public/css'
    });
    browserifyTask({
        development: true,
        src: [
            './js/page-main.js',
            './js/page-view.js'
        ],
        dest: './public'
    });
});


gulp.task('deploy', function () {
    cssTask({
        development: false,
        src: './css/**/*.less',
        dest: './public/css'
    });
    browserifyTask({
        development: false,
        src: [
            './js/page-main.js',
            './js/page-view.js'
        ],
        dest: './public'
    });
});