//////////////////////////////////////////////////////////////////////////////////
//		init the module
//////////////////////////////////////////////////////////////////////////////////
var myModule = angular.module('myModule', []);

//////////////////////////////////////////////////////////////////////////////////
//		init the controller
//////////////////////////////////////////////////////////////////////////////////
myModule.controller('myController', ['$scope', 'i4dsClient', function($scope, i4dsClient) {
	// making some variable accessible to the template
	$scope.i4dsClient = i4dsClient
	$scope.data = i4dsClient.data

	// working around angular - https://coderwall.com/p/ngisma/safe-apply-in-angular-js
	$scope.safeApply = function(fn) {
	  var phase = this.$root.$$phase;
	  if(phase == '$apply' || phase == '$digest') {
	    if(fn && (typeof(fn) === 'function')) {
	      fn();
	    }
	  } else {
	    this.$apply(fn);
	  }
	};
	
	// update the ui with angular
	i4dsClient.signals.updateSelectedUI.add(function(){
		$scope.safeApply()
	})
}]);


//////////////////////////////////////////////////////////////////////////////////
//		Factory for i4dsClient
//////////////////////////////////////////////////////////////////////////////////

myModule.factory('i4dsClient', function() {
	return new i4dsClient()
});

//////////////////////////////////////////////////////////////////////////////////
//		Directives
//////////////////////////////////////////////////////////////////////////////////

// to force ng-model as number
// - from http://stackoverflow.com/questions/15072152/angularjs-input-model-changes-from-integer-to-string-when-changed
myModule.directive('forceNumber', function(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl){
            ctrl.$parsers.unshift(function(viewValue){
                return parseFloat(viewValue, 10);
            });
        }
    };
});
