const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

// Load plugins

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();

// Clean assets
function clear() {
  return src('./assets/*', {
      read: false
  })
  .pipe(clean());
}

// JS function 
function js() {
  const source = ['./node_modules/jquery/dist/jquery.min.js', './node_modules/popper.js/dist/umd/popper.min.js', './node_modules/bootstrap/dist/js/bootstrap.min.js', './node_modules/bootstrap-slider/dist/bootstrap-slider.min.js', './src/js/*.js'];

  return src(source)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(dest('./assets/js/'))
    .pipe(browsersync.stream());
}

// CSS function 
function css() {
  const source = ['./node_modules/bootstrap/dist/css/bootstrap.min.css', './node_modules/bootstrap-slider/dist/css/bootstrap-slider.min.css', './src/scss/*.scss'];

  return src(source)
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(cssnano())
    .pipe(dest('./assets/css/'))
    .pipe(browsersync.stream());
}

// Optimize images

function img() {
  return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./assets/img'));
}

function fonts() {
  return src('./src/fonts/**/*.{ttf,woff,eof,svg,eot}')
  .pipe(dest('./assets/fonts'));
}

// Watch files
function watchFiles() {
  watch('./src/scss/*', css);
  watch('./src/js/*', js);
  watch('./src/img/*', img);
  watch('./src/fonts/*', fonts);
}

// BrowserSync
function browserSync() {
  browsersync.init({
      server: {
          baseDir: './'
      },
      port: 3000
  });
}

// Tasks to define the execution of the functions simultaneously or in series
exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(js, css, img, fonts));