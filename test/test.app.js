'use strict';

var app = angular.module('test', ['tfiwm.distributetransclude']);

app.controller('AppController', function() {
    this.var1 = 'I am the view model of the app controller';
    this.var2 = '';
});

app.directive('testDirective', function() {
    return {
        scope: {
            someScopeVarFromParentWithTwoWay: '=',
            someScopeVarFromParentOneWay: '@'
        },
        restrict: 'E',
        require: 'distributeTransclude',
        controller: function() {

        },
        controllerAs: 'vm',
        bindToController: true,
        templateUrl: 'test.directive.template.html'
    };
});


angular.element(document).ready(function() {
  angular.bootstrap(document.getElementById('app'), ['test']);
});
