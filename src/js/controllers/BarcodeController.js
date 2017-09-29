(function () {
  'use strict';

  window.Quagga.onDetected(function(result) {
  	console.log('Called quagga detected');
  })

  angular.module('shipitLunch').controller('BarcodeController', ['NutritionixService', '$scope', function(NutritionixService, $scope) {

  	this.loadNutritionalValues = () => {
  		NutritionixService.searchByUpc($scope.upc).then((data) => {
  			$scope.product = data.data;
  		});
  	}

  	this.onProcessed = function(result) {
			console.log('yes', result);
    };
    this.onDetected = function(result) {
      console.log('onDet', result);
    };


  }]);

}());
