(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserService'];
function SignUpController(MenuService, UserService) {
  var $ctrl = this;
  $ctrl.user = {};

  $ctrl.signUp = function () {
    MenuService.getMenuItem($ctrl.user.dish).then(function (result) {
          $ctrl.msg = result.status;
          if(result.status === 200) {
            UserService.saveUser($ctrl.user);
            $ctrl.msg = 'Your information has been saved.';
          } else {
            $ctrl.msg = 'No such menu number exists.';
          }
        });
  }
}


})();
