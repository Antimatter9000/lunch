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
    $scope.totalKMC = 0;

    $scope.submit = function(){
        $scope.totalCreditOfItem = 10;
        $scope.scanSuccess = true;
    };

    $scope.reset = function(){ 
        
    };

    var getRandomNumber = function(){
        return Math.floor(Math.random() * 100);
    };

    $scope.item = {
        name: "7 up",
        nutrition:[
            { nutrition: "Calories", amount: getRandomNumber(), KMC: getRandomNumber() },        
            { nutrition: "Carbohydrate", amount: getRandomNumber(), KMC: getRandomNumber() },
            { nutrition: "Fat", amount: getRandomNumber(), KMC: getRandomNumber() },
            { nutrition: "Sodium", amount: getRandomNumber(), KMC:getRandomNumber() },        
            { nutrition: "Protein", amount: getRandomNumber(), KMC: getRandomNumber() },
            { nutrition: "Vitamin C", amount: getRandomNumber(), KMC: getRandomNumber() },
            { nutrition: "Vitamin B", amount: getRandomNumber(), KMC: getRandomNumber() }        
        ]
    };

    $scope.getTotalKMC = function(){
        angular.forEach($scope.item.nutrition, function(object) {
            $scope.totalKMC += object.KMC;
          });

        return $scope.totalKMC;
    };

  });
