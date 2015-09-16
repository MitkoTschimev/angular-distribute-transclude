'use strict';

var app = angular.module('test', ['tfiwm.distributetransclude']);

app.controller('AppController', function() {

});

app.directive('testDirective', function() {
  return {
    scope: {
      v1: '=',
      v2: '@',
    },
    restrict: 'E',
    require: 'distributeTransclude',
    controller: function() {

    },

    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'test.directive.template.html',
  };
});

angular.element(document).ready(function() {
  angular.bootstrap(document.getElementById('app'), ['test']);
});
