(function () {
  'use strict';

  const shipitLunch = angular.module('shipitLunch', ['ngRoute', 'nix.api', 'angular-quagga-js']);

  shipitLunch.constant('NUTRITIONIX_API_BASE', 'https://api.nutritionix.com/v1_1/');
  shipitLunch.constant('NUTRITIONIX_APP_ID', 'e84cc355');
  shipitLunch.constant('NUTRITIONIX_API_KEY', '4c936f3d37ae38aca9eb4bbe3b15c753');

  shipitLunch.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

    $httpProvider.defaults.cache = true;

    $routeProvider
      .when('/', {
        templateUrl: 'scan.html'
      })
      .otherwise('/not-found', {
        templateUrl: 'not-found.html'
      });

  }]);

}());
