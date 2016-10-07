(function() {
  'use strict';
  angular.module('MenuApp')
  .component('categoryList', {
    templateUrl: 'scripts/templates/categorylist.template.html',
    bindings: {
      items: '<'
    }
  });
}());
