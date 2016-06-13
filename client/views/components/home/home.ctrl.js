angular
  .module('savor.home',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'uiGmapgoogle-maps'])
  .controller('homeController', function($scope, $http, uiGmapGoogleMapApi) {

    $scope.profile = JSON.parse(localStorage.getItem('profile'));

    $scope.getAll = function getAll() {
      $http.get('/api/restaurants').then(function(res) {
        $scope.restaurants = res.data;
        $scope.restaurants.forEach(function(it, i){
          it.span  = { row : 1, col : 2 };
          //if (i === 0 || i === 4 || i === 6 || i === 12) it.span.row = it.span.col = 2;
        });
      });
    };

    uiGmapGoogleMapApi.then(function(maps) {
      $scope.getAll();
    });
  });