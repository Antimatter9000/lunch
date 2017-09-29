(function () {
  'use strict';

  angular.module('shipitLunch').service('NutritionixService', ['$http', 'NUTRITIONIX_API_BASE', 'NUTRITIONIX_APP_ID', 'NUTRITIONIX_API_KEY', function($http, NUTRITIONIX_API_BASE, NUTRITIONIX_APP_ID, NUTRITIONIX_API_KEY) {

    this.searchByUpc = (upc) => {
    	return $http.get(`${NUTRITIONIX_API_BASE}item?upc=${upc}&appId=${NUTRITIONIX_APP_ID}&appKey=${NUTRITIONIX_API_KEY}`);
    }


  }]);

}());
