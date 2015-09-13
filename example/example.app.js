var app = angular.module('example', ['tfiwm.distributetransclude']);

app.controller('AppController', function($interval) {
    this.applicationControllerVar = 'I am the view model of the app controller';
    this.twoWayBindingTest = '';

    $interval(function() {
        this.applicationControllerVar = 'I am the view model of the app controller ' + Date.now();
    }.bind(this), 50);
});

angular.element(document).ready(function() {
  angular.bootstrap(document.getElementById('app'), ['example']);
});
