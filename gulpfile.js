const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browsersync = require('browser-sync').create();

function scssTask() {
  return src('scss/style.scss')
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist', { sourcemaps: '.' }));
}

function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}

function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

function watchTask() {
  watch('*.html', browserSyncReload);
  watch(['scss/**/*.scss'], series(scssTask, browserSyncReload));
}

exports.default = series(scssTask, browserSyncServe, watchTask);
