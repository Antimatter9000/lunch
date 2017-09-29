(function () {
  'use strict';

  angular.module('shipitLunch').controller('BarcodeController', ['NutritionixService', '$scope', function(NutritionixService, $scope) {

  	this.loadNutritionalValues = () => {
  		NutritionixService.searchByUpc(document.querySelector('input.isbn').value).then((data) => {
  			$scope.product = data.data;
  		});
  	}

  }]);

}());
