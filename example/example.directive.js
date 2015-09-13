app.directive('exampleDirective', function() {
    return {
        scope: {
            someScopeVarFromParentWithTwoWay: '=',
            someScopeVarFromParentOneWay: '@'
        },
        restrict: 'E',
        require: 'distributeTransclude',
        controller: function($interval) {
            var _this = this;
            $interval(function() {
                _this.someScopeVarFromParentWithTwoWay = 'someScopeVarFromParentWithTwoWay changed inside the directive' + Date.now();
            }, 200);
        },
        controllerAs: 'vm',
        bindToController: true,
        templateUrl: 'example.directive.template.html'
    };
});
