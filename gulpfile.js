'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sh = require('shelljs');
var karmaServer = require('karma').Server;

gulp.task('test', function(done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
      }, done).start();
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
