const {
  src,
  dest,
  watch,
  parallel,
  series
} = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const htmlmin = require('gulp-htmlmin');


function html() {
  return src('app/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
}

function sprite() {
  return src('app/img/icon-*.svg')
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(concat('sprite.svg'))
  .pipe(dest('app/img'))
}

function webpConvert() {
  return src('app/img/content/*.{png,jpg}')
  .pipe(webp())
  .pipe(dest('app/img/webp'))
}


function cleanDist() {
  return del('dist')
}

function images() {
  return src('app/img/**/*')
  .pipe(imagemin(
    [
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 90, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
  ]
  ))
  .pipe(dest('dist/img'))
}

function scripts() {
  return src([
    // 'node_modules/jquery/dist/jquery.js',
    'app/js/main.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({
      outputStyle: 'compressed'
    }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js'
  ], {base: 'app'})
  .pipe(dest('dist'))
}


function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/main.js','!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.sprite = sprite;
exports.webpConvert = webpConvert;


exports.build = series(cleanDist, build, html, images)
exports.default = parallel(styles, scripts, browsersync, watching);
