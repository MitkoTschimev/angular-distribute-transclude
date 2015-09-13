module.exports = function(config) {
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
            // the name of the Angular module to create
            moduleName: "my.templates"
        },

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
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
