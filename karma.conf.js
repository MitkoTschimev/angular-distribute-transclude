module.exports = function(config) {
  'use strict';

  config.set({
    preprocessors: {
      'test/**/*.html': ['ng-html2js'],
    },

    basePath: './',

    files: [
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'lib/**/*.js',
        'test/**/*.js',
        'test/**/*.html',
    ],

    ngHtml2JsPreprocessor: {
      stripPrefix: 'test/',
      moduleName: 'my.templates',
    },

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    //  Custom launcher for Travis-CI
    customLaunchers: {
         chromeTravisCI: {
           base: 'Chrome',
           flags: ['--no-sandbox'],
         },
       },

    plugins: [
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-junit-reporter',
        'karma-ng-html2js-preprocessor',
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit',
    },
  });

  // Custom configuration for Travis-CI
  if (process.env.TRAVIS) {
    config.browsers = ['chromeTravisCI'];
  }
};
