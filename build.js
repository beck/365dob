#!/usr/bin/env node
'use strict';

var vfs = require('vinyl-fs');
var rimraf = require('rimraf');
var Builder = require('systemjs-builder');
var htmlprocessor = require('gulp-htmlprocessor');

var builder = new Builder('public/', 'public/config.js');

rimraf.sync('build');

builder.buildStatic('main.js', 'build/bundle.js');

vfs.src([
    'public/*.txt',
    'public/style*/**/*',
    'public/components*/*'])
  .pipe(vfs.dest('build'));

vfs.src('public/*.html')
  .pipe(htmlprocessor())
  .pipe(vfs.dest('build'));
