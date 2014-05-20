'use strict';

angular
  .module('firstTryApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'jqmEvents'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
