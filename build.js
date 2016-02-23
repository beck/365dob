#!/usr/bin/env node
'use strict';

var Builder = require('systemjs-builder');
var htmlprocessor = require('gulp-htmlprocessor');
var rimraf = require('rimraf');
var vfs = require('vinyl-fs');
var rename = require('gulp-rename');

var builder = new Builder('public/', 'public/config.js');

rimraf.sync('build');

builder.buildStatic('main.js', 'build/bundle.js');

vfs.src([
    'public/**/polymer*.html'])
  .pipe(rename(function(path){
    path.dirname = 'lib';}))
  .pipe(vfs.dest('build'));

vfs.src([
    'public/*.{txt,ico,json}',
    'public/style*/**/*'])
  .pipe(vfs.dest('build'));

vfs.src('public/*.html')
  .pipe(htmlprocessor())
  .pipe(vfs.dest('build'));
