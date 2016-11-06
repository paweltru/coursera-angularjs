(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MenuService','UserService'];
function MyInfoController(MenuService, UserService) {
  var $ctrl = this;
  $ctrl.user = UserService.getUser();
  $ctrl.notSigned = (Object.keys($ctrl.user).length === 0);
  if(!$ctrl.notSigned) {
    MenuService.getMenuItem($ctrl.user.dish).then(function (result) {
      $ctrl.menuItem = result.data;
    });
  }

}


})();
