//////////////////////////////////////////////////////////////////////////////////
//		init the module
//////////////////////////////////////////////////////////////////////////////////
var myModule = angular.module('myModule', []);

//////////////////////////////////////////////////////////////////////////////////
//		init the controller
//////////////////////////////////////////////////////////////////////////////////
myModule.controller('myController', ['$scope', 'vifClient', function($scope, vifClient) {
	// making some variable accessible to the template
	$scope.vifClient = vifClient
	$scope.data = vifClient.data

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
	vifClient.signals.updateSelectedUI.add(function(){
		$scope.safeApply()
	})
}]);


//////////////////////////////////////////////////////////////////////////////////
//		Factory for vifClient
//////////////////////////////////////////////////////////////////////////////////

myModule.factory('vifClient', function() {
	return new vifClient()
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
