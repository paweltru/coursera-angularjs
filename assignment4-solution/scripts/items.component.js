(function() {
  'use strict';
  angular.module('MenuApp')
  .component('itemList', {
    templateUrl: 'scripts/templates/itemList.template.html',
    bindings: {
      items: '<'
    }
  });
}());
