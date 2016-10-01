(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  list.isEmptyList = function () {
    return (angular.isDefined(list.found) && list.found.length > 0) ? false : true;
  }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
  var narrowCtrl = this;

  narrowCtrl.searchTerm = '';

  narrowCtrl.search = function () {
    if(narrowCtrl.searchTerm.trim().length > 0) {
      MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm).then(function (result) {
        narrowCtrl.found = result;
      });
    } else {
      narrowCtrl.found = [];
    }

  }

  narrowCtrl.removeItem = function (itemIndex) {
    narrowCtrl.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({method: "GET",
                  url: (ApiBasePath + "/menu_items.json")
                }).then(function (result) {

                    // process result and only keep items that match
                    var foundItems = [];
                    for (var i = 0; i < result.data.menu_items.length; i++) {
                      var desc = result.data.menu_items[i].description;
                      if (desc.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                        foundItems.push(result.data.menu_items[i]);
                      }
                    }

                    return foundItems;
                });
  }
}

})();
