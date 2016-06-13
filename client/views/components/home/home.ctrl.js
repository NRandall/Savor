//necessary to use underscore
var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  //Underscore must already be loaded on the page
  return window._;
});

angular
.module('savor.home',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'underscore', 'uiGmapgoogle-maps'])
.controller('homeController', function($scope, $http, _, uiGmapGoogleMapApi) {

    //refresh function that was an attempt to get just added restaurant to render on page without a refresh
    /*window.refresh = function() {
      $http.get('/api/restaurants').then(function (response) {
        console.log('hello');
        $scope.restaurants = response.data;
      })
    };*/

    // mock data of google map
    $scope.map = {
      center: {
        latitude: 45,
        longitude: -73
      },
      zoom: 8
    };

    $scope.profile = JSON.parse(localStorage.getItem('profile'));

    function getAll() {
      $http.get('/api/restaurants').then(function(res) {
        $scope.restaurants = res.data;
        $scope.restaurants.forEach(function(it, i){
          it.span  = { row : 1, col : 2 };
          //if (i === 0 || i === 4 || i === 6 || i === 12) it.span.row = it.span.col = 2;
        });
      });
    }
    // Make sure to wait till Google Maps SDK is fully ready
    uiGmapGoogleMapApi.then(function(maps) {
      getAll();
    });



    $scope.tiles = buildGridModel({
      icon : "avatar:svg-",
      title: "Svg-",
      background: ""
    });

    function buildGridModel(tileTmpl){
      var it, results = [];

      for (var j=0; j < 22; j++) {

        it = angular.extend({},tileTmpl);
        it.icon  = it.icon + (j+1);
        it.title = it.title + (j+1);
        it.span  = { row : 1, col : 1 };
        it.background = "gray";

        switch(j+1) {
          case 1:
          it.background = "red";
          it.span.row = it.span.col = 2;
          break;

          case 2: it.background = "green";         break;
          case 3: it.background = "darkBlue";      break;
          case 4:
          it.background = "blue";
          it.span.col = 2;
          break;

          case 5:
          it.background = "yellow";
          it.span.row = it.span.col = 2;
          break;

          case 6: it.background = "pink";          break;
          case 7: it.background = "darkBlue";      break;
          case 8: it.background = "purple";        break;
          case 9: it.background = "deepBlue";      break;
          case 10: it.background = "lightPurple";  break;
          case 11: it.background = "yellow";       break;
        }

        results.push(it);
      }
      return results;
    }
  });
