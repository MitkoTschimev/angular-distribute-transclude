'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var bump = require('gulp-bump');
var git = require('gulp-git');
var clean = require('gulp-clean');
var sh = require('shelljs');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var umd = require('gulp-umd');
var karmaServer = require('karma').Server;

var paths = {
    build_dir: './dist',
    libFiles: './lib/**.*js',
};

gulp.task('karma', function(done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
    }, done).start();
});

gulp.task('karma-dev', function(done) {
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
        .pipe(umd({
            exports: function() {
                return 'tfiwmModule';
            },
            namespace: function() {
                return 'tfiwmModule';
            }
        }))
        .pipe(gulp.dest(paths.build_dir));
});

gulp.task('clean', function() {
    return gulp.src(paths.build_dir, {
            read: false
        })
        .pipe(clean());
});

gulp.task('bump', ['build'], function() {
    return gulp.src('./package.json')
        .pipe(umd({
            exports: function() {
                return 'tfiwmModule';
            },
            namespace: function() {
                return 'tfiwmModule';
            }
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('build', ['clean'], function() {
    return gulp.src(paths.libFiles)
        .pipe(umd({
            exports: function() {
                return 'tfiwmModule';
            },
            namespace: function() {
                return 'tfiwmModule';
            }
        }))
        .pipe(gulp.dest(paths.build_dir))
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.build_dir));
});

gulp.task('tag', ['bump'], function() {
    var pkg = require('./package.json');
    var v = 'v' + pkg.version;
    var message = 'Release ' + v;

    return gulp.src('./')
        .pipe(git.add())
        .pipe(git.commit(message))
        .pipe(git.tag(v, message))
        .pipe(git.push('origin', 'master', '--tags'))
        .pipe(gulp.dest('./'));
});

gulp.task('npm', ['tag'], function(done) {
    require('child_process').spawn('npm', ['publish'], {
            stdio: 'inherit'
        })
        .on('close', done);
});

gulp.task('default', ['test', 'build']);
gulp.task('test', ['jshint', 'karma']);
gulp.task('ci', ['test', 'build']);
gulp.task('release', ['npm']);

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
