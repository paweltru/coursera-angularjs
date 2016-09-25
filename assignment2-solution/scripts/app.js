(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController (ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

  toBuy.boughtItem = function (itemIndex) {
      ShoppingListCheckOffService.boughtItem(itemIndex);
  }
}
AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController (ShoppingListCheckOffService) {
  var alreadyBought = this;
  alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();

}

function ShoppingListCheckOffService() {
  var service = this;
  var boughtItems =[];
  var itemsToBuy = [
    { name: "cookies", quantity: 10 },
    { name: "chips", quantity: 5 },
    { name: "sparkling water", quantity: 6 },
    { name: "chocolate", quantity: 3 },
    { name: "popcorn", quantity: 4 },
  ];

  service.boughtItem = function (itemIndex) {
    boughtItems.push(itemsToBuy[itemIndex]);
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };
  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
