(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserService'];
function SignUpController(MenuService, UserService) {
  var $ctrl = this;
  $ctrl.user = {};
  $ctrl.menuItemExist = true;
  $ctrl.signUp = function () {
    MenuService.getMenuItem($ctrl.user.dish).then(function (result) {
          if(result.status === 200) {
            UserService.saveUser($ctrl.user);
            $ctrl.msg = 'Your information has been saved.';
            $ctrl.menuItemExist = true;
          } else {
            $ctrl.menuItemExist = false;
          }
        });
  }
}


})();
