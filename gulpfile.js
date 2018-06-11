var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sortCSSmq = require('sort-css-media-queries'),
    fileinclude = require('gulp-file-include'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    svgstore = require('gulp-svgstore'),
    mqpacker = require("css-mqpacker"),
    postcss = require('gulp-postcss'),
    plumber = require('gulp-plumber'),
    svgmin = require('gulp-svgmin'),
    rename = require("gulp-rename"),
    run = require('run-sequence'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    image = require('gulp-image'),
    path = require('path');

var paths = {
    dev: {
        css: {
            src: './src/css/style.scss',
            dist: './src/css/'
        },
        js: {
            src: './src/js/main.js',
            dist: './src/js/'
        },
        html: {
            clean: './src/*.html',
            src: './src/html/*.html',
            dist: './src/'
        },
        svg: {
            src: './src/images/svg/*.svg',
            dist: './src/images/ui/'
        }
    },

    build: {
        dist: './dist/',
        clean: './dist/*',
        css: './dist/css/',
        svg: './dist/images/ui/',
        js: {
            src: './src/js/*.js',
            dist: './dist/js/'
        },
        images: {
            src: ['./src/images/**/*', '!./src/images/svg', '!./src/images/svg/**'],
            dist: './dist/images/'
        },
        fonts: {
            src: './src/fonts/*',
            dist: './dist/fonts/'
        },
        modals: {
            src: './src/modals/*',
            dist: './dist/modals/'
        }
    },

    watch: {
        css: './src/css/**/*.scss',
        js: ['./src/js/**/*.js', '!./src/js/main.js'],
        jsMain: './src/js/main.js',
        html: './src/html/**/*.html',
        htmlModals: './src/modals/**/*.html',
        svg: './src/images/svg/*.svg',
        images: './src/images/*'
    }
};

// ________________DEVELOPMENT______________

// Static Server + Watching on SCSS, HTML, JS, IMAGES
gulp.task('serve', function (fn) {
    run('sass', 'svg', 'html', fn);
    browserSync.init({
        server: "./src/",
        notify: false
    });

    gulp.watch('./src/js/plugin.js').on('change', browserSync.reload);
    
    gulp.watch(paths.watch.css, ['sass']).on('change', browserSync.reload);
    gulp.watch(paths.watch.jsMain).on('change', browserSync.reload);
    gulp.watch(paths.watch.html, ['html']).on('change', browserSync.reload);
    gulp.watch(paths.watch.htmlModals, ['html']).on('change', browserSync.reload);
    gulp.watch(paths.watch.svg, ['svg']).on('change', browserSync.reload);
    gulp.watch(paths.watch.images).on('change', browserSync.reload);
});

// SVG
gulp.task('svg', function () {
    return gulp
        .src(paths.dev.svg.src, {base: 'src/svg'})
        .pipe(rename({prefix: 'icon-'}))
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(rename('ui-icons.svg'))
        .pipe(gulp.dest(paths.dev.svg.dist));
});

// SASS
gulp.task('sass', function () {
    return gulp.src(paths.dev.css.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([
            mqpacker({
                sort: sortCSSmq.desktopFirst
            })
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dev.css.dist));
});

// HTML
gulp.task('html-clean', function () {
    return gulp.src(paths.dev.html.clean, {read: false})
        .pipe(clean());
});

gulp.task('html-dev', function () {
    return gulp.src(paths.dev.html.src)
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(paths.dev.html.dist));
});

gulp.task('html', function (fn) {
    run('html-clean', 'html-dev', fn);
});

// __________________BUILD___________________
// Build task
gulp.task('build', function (fn) {
    run('clean',
        'copy-fonts',
        'sass-build',
        'scripts-build',
        'html-build',
        'images-build',
        'svg-build', fn);
});

// Clean Dist folder
gulp.task('clean', function () {
    return gulp.src(paths.build.clean, {read: false})
        .pipe(clean());
});

// SASS
gulp.task('sass-build', function () {
    return gulp.src(paths.dev.css.src)
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 version'],
                grid: true
            }),
            mqpacker({
                sort: sortCSSmq.desktopFirst
            })
        ]))
        .pipe(gulp.dest(paths.build.css));
});

// JS
gulp.task('scripts-build', function () {
    return gulp.src(paths.build.js.src).pipe(gulp.dest(paths.build.js.dist));
});

// HTML
gulp.task('html-build', function () {
    return gulp.src(paths.dev.html.src)
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(paths.build.dist));
});

// SVG
gulp.task('svg-build', function () {
    return gulp
        .src(paths.dev.svg.src, {base: 'src/svg'})
        .pipe(rename({prefix: 'icon-'}))
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(rename('ui-icons.svg'))
        .pipe(gulp.dest(paths.build.svg));
});

// Images
gulp.task('images-build', function () {
    return gulp.src(paths.build.images.src)
        .pipe(image({
            zopflipng: false
        }))
        .pipe(gulp.dest(paths.build.images.dist))
});

// Fonts
gulp.task('copy-fonts', function () {
    return gulp.src(paths.build.fonts.src).pipe(gulp.dest(paths.build.fonts.dist));
});

// Default
gulp.task('default', ['build']);