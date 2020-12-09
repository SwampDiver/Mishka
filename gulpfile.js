const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const minify = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
// const posthtml = require("gulp-posthtml");
// const include = require("posthtml-include");
const sync = require("browser-sync").create();

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});


// Imagesmin

gulp.task("images", function() {
  return gulp.src("source/img/**/*/.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("source/img"));
})

// Webp


gulp.task("webp", function() {
  return gulp.src("source/img/**/*/.{png,jpg}")
  .pipe(gulp.dest("source/img"));
});

//Sprite
gulp.task("sprite", function() {
  return gulp.src("source/img/icon-*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("source/img"))
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
.pipe(posthtml([
  include()
]))
  .pipe(gulp.dest("source"));
});




// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);
