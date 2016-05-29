#!/usr/bin/env node
const babel = require('gulp-babel');
const Builder = require('systemjs-builder');
const crisper = require('gulp-crisper');
const gulpif = require('gulp-if');
const htmlprocessor = require('gulp-htmlprocessor');
const rename = require('gulp-rename');
const rimraf = require('rimraf');
const vfs = require('vinyl-fs');

rimraf.sync('build');

const builder = new Builder('public/', 'public/config.js');
builder.buildStatic('main.js', 'build/bundle.js');

vfs.src(['public/**/polymer*.html'])
  .pipe(rename(path => { path.dirname = 'lib';}))  // eslint-disable-line
  .pipe(vfs.dest('build'));

vfs.src(
  [
    'public/*.{txt,ico,json}',
    'public/style*/**/*'])
  .pipe(vfs.dest('build'));

const extractjs = crisper({ scriptInHead: false });
const transpile = babel({ presets: ['es2015'] });
const es5it = gulpif(f => f.extname === '.js', transpile);
vfs.src(['public/*.html', 'public/components*/*.html'])
  .pipe(htmlprocessor())
  .pipe(extractjs)
  .pipe(es5it)
  .pipe(vfs.dest('build'));
