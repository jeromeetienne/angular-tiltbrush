'use strict';

// basic routing
angularModule.config(function ($routeProvider){
    $routeProvider.when('/', {
        templateUrl: '/v3/partials/chrome.html'
    }).otherwise({
        redirectTo: '/'
    });
})
