(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope) {

  $scope.lunchList = '';

  $scope.checkLunchItems = function () {

    var itemList = splitString($scope.lunchList);
    if (itemList.length === 0) {
      $scope.message = "Please enter data first";
      return;
    }

    if (itemList.length <= 3) {
      $scope.message = "Enjoy!";
    } else {
      $scope.message = "Too much!";
    }
  };

  function splitString(stringToSplit) {
    return stringToSplit.split(",").filter(removeEmptyItems);
  }

  function removeEmptyItems(value) {
    return value.trim().length > 0;
  }
}
})();
