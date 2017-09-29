'use strict';

/**
 * @ngdoc function
 * @name lunchApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the lunchApp
 */
angular.module('lunchApp')
  .controller('ScanCtrl', function ($scope) {
    $scope.totalCreditOfItem = 0;
    $scope.scanSuccess = null;

    $scope.submit = function(){
        $scope.totalCreditOfItem = 10;

        $scope.scanSuccess = true;
    };

    $scope.reset = function(){
        
    };
    
  });
