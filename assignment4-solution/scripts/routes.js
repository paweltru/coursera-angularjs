(function() {
  'use strict';
  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
      url: '/',
      templateUrl: 'scripts/templates/home.template.html'
    })
    // Category list page
    .state('categories', {
      url: '/categories',
      templateUrl: 'scripts/templates/categories.template.html',
      controller: 'CategoryListController as categoryList',
      resolve: {
        items: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
    // Category menu items list
    .state('items', {
      url: '/items/{categoryShortName}',
      templateUrl: 'scripts/templates/items.template.html',
      controller: 'ItemListController as itemList',
      resolve: {
        items: ['$stateParams','MenuDataService', function ($stateParams, MenuDataService) {
                return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
              }]
      }
    });
  }
}());
