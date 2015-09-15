'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sh = require('shelljs');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var umd = require('gulp-umd');
var karmaServer = require('karma').Server;

var paths = {
  build_dir: './dist',
  libFiles: './lib/**.*js',
};

gulp.task('default', ['build']);
gulp.task('build', ['jshint', 'umd', 'uglify', 'test']);
gulp.task('prepare-release', ['jshint-all', 'build']);

gulp.task('test', function(done) {
  new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
      }, done).start();
});

gulp.task('test-dev', function(done) {
  new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false,
        autoWatch: true,
      }, done).start();
});

gulp.task('jshint-all', function() {
  return gulp.src([paths.libFiles, './example/*.js', 'test/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint', function() {
  return gulp.src(paths.libFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('uglify', function() {
  return gulp.src(paths.build_dir + '/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(paths.build_dir));
});

gulp.task('umd', function() {
  return gulp.src(paths.libFiles)
    .pipe(umd())
    .pipe(gulp.dest(paths.build_dir));
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
        '  ' + gutil.colors.red('Git is not installed.'),
        '\n  Git, the version control system, is required to download Ionic.',
        '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
        '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }

  done();
});
