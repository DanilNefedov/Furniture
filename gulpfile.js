const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const jsmin = require('gulp-jsmin');
//const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const critical = require('critical');
const htmlmin = require('gulp-htmlmin');
const path = require('path');
const replace = require('gulp-replace-path');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify-es').default;

// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./styles/**/*.scss", gulp.series('sass'));
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./styles/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./styles"))
        .pipe(browserSync.stream());
});


function buildStyles(done) {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/styles/'));
    done();
};





gulp.task("uglify", function (done) {
	return gulp.src("scripts/**/*.js")
		//.pipe(rename('*.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest("dist/scripts"));
        done();
});


// gulp.task('js', function (done) {
//     gulp.src('scripts/**/*.js')
//         .pipe(jsmin())
//         .pipe(rename({suffix: '.min'})) // ?
//         .pipe(gulp.dest('dist/scripts'));
//         done();
// });


function images(done){
    gulp.src('img/**/*')
        .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 65, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]))
        .pipe(gulp.dest('dist/img'));
        done();
}

 
gulp.task('webp', () =>
    gulp.src('img/**/*')
        .pipe(webp())
        .pipe(gulp.dest('dist/img/')) // *** dorectory on your choise dist/img/webp/ ***
);

gulp.task('critical', (done) => {
    critical.generate({
        inline: true,
        base: './',
        src: './index.html',
        target: 'prebuild/index.html',
        ignore: {
            atrule: ['@font-face']
        },
    });
    done();
});

 
gulp.task('htmlmin', (done) => {
  return gulp.src('prebuild/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'));
    done();
});

gulp.task('non-critical', (done) => {
    return gulp.src( 'pages/**/*.html', '!./index.html')
            .pipe(gulp.dest('dist/pages'));
            done();
});

gulp.task('favicons', (done) => {
    return gulp.src( './favicons/**/*')
            .pipe(gulp.dest('dist/favicons/'));
            done();
});

gulp.task('fonts', (done) => {
    return gulp.src( './fonts/**/*')
            .pipe(gulp.dest('dist/fonts/'));
            done();
});

gulp.task('seo', (done) => {
    return gulp.src( './seo-files/**/*')
            .pipe(gulp.dest('dist/'));
            done();
});

gulp.task('data', (done) => {
    return gulp.src( './data/**/*')
            .pipe(gulp.dest('dist/data-files'));
            done();
});

gulp.task('models', (done) => {
    return gulp.src( './models/**/*')
            .pipe(gulp.dest('dist/models/'));
            done();
});


gulp.task('clean', function (done) {
    return gulp.src('dist', {read: false})
        .pipe(clean());
        done();
});



exports.buildStyles = buildStyles;
exports.images = images;


exports.build = gulp.series('clean' ,buildStyles, 'fonts', 'critical', 'uglify', 'webp', 'models', 'htmlmin', 'non-critical', 'favicons', 'seo', 'data', images, 'serve','sass');




