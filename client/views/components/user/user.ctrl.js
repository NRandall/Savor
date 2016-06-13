angular
  .module('savor.user',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'uiGmapgoogle-maps'])
  .controller('userController', function($scope, $http, uiGmapGoogleMapApi) {

    $scope.profile = JSON.parse(localStorage.getItem('profile'));

    function getAll() {
      var user = JSON.parse(window.localStorage.profile).email;
      $http.get('/api/restaurants').then(function(res) {
        $scope.restaurants = res.data.filter(function(restaurant) {
          //filter restaurants such that the email associated with the restaurant is the same as the email of the user currently logged in
          if(restaurant.userEmail === user) {
            return true;
          } else {
            return false;
          }
        });
      });
    }
    uiGmapGoogleMapApi.then(function(maps) {
      getAll();
    });
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
  });
