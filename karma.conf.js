module.exports = function(config) {
    'use strict';

    config.set({
        preprocessors: {
            'test/**/*.html': ['ng-html2js']
        },

        basePath: './',

        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'lib/**/*.js',
            'test/**/*.js',
            'test/**/*.html'
        ],

        ngHtml2JsPreprocessor: {
            stripPrefix: 'test/',
            moduleName: 'my.templates'
        },

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Firefox'],

        plugins: [
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
