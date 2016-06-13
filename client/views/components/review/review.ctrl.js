var app = angular.module('savor.review',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngDialog', 'ngFileUpload'])
.controller('reviewController', function($state, $scope, $http, ngDialog, Upload, $window) {
  // Set restaurant Object
  $scope.restaurant = {
    name: '',
    address: ''
  };
  $scope.restaurants = [];
  $scope.isFetched = false;
  $scope.isSelected = false;
  $scope.selectedOne = {};
  $scope.yelp;

  /**
   * [for the ng-show that displays once a photo has been uploaded]
   * @type {Boolean}
   */
  $scope.photoUploaded = false;

  /**
   * to get the filename of the pic uploaded.
   */
  var pic;
  $scope.picName;

  /**
   * Method to send query API call to Yelp
   */
  $scope.queryYelp = _.debounce(function () {
    if($scope.restaurant.name !== '' && $scope.restaurant.address !== '') {
      // var url = 'https://api.yelp.com/v2/search?term=' + $scope.restaurant.name + '&location=' + $scope.restaurant.address.replace(' ', '+');
      return $http.post('/api/restaurants/yelp', {
        name: $scope.restaurant.name,
        address: $scope.restaurant.address
      }).then(function(data) {
        if(data.data.length !== 0) {
          $scope.isFetched = true
          $scope.restaurants = data.data;
        }
      }).catch(function(err) {
        $scope.isFetched = false;
      });
    }
  },300);

  /**
   * Method to select a restaurant
   */
   $scope.selectOne = function selectOne (item) {
     console.table(item);
     $scope.yelp = item;
     $scope.selectedOne.name = item.name;
     $scope.selectedOne.address = item.location.display_address[0] + ' ' + item.location.display_address[2];
     $scope.isFetched = false;
     $scope.isSelected = true;
   };

  /**
   * [uploads a selected photo]
   */
  $scope.add = function(){
    pic = document.getElementById('file').files[0];
    if(pic) {
      console.log(pic.name);
      $scope.picName = pic.name;
      $scope.photoUploaded = true;
    }
  }
  /**
   * sends information entered on form to database
   * @return {[Object]}
   */
  $scope.sendPost = function () {
    var data = ({
      restaurantName: $scope.selectedOne.name,
      restaurantAddress: $scope.selectedOne.address,
      priceRating: $scope.price,
      serviceRating: $scope.service,
      foodRating: $scope.food,
      ambienceRating: $scope.ambience,
      restaurantReview: $scope.restaurant.review,
      //useremail file is parsed into the windowlocal storage
      userEmail: JSON.parse(window.localStorage.profile).email,
      //saves image in uploads folder using the uploaded photo's file name
      image: "http://52.78.18.121:8080/uploads/"+ pic.name.toString(),
      yelp: $scope.yelp
    });

    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }

    $http({
      method: "POST",
      data: data,
      url: '/api/restaurants'
    });

  //'this' is the scope. So setting 'that' equal to 'this' ensures that 'this' stays bound to the scope
    var that = this;
    that.upload = function(file){
      Upload.upload({
        //webAPI exposed to upload the file
        url: 'http://52.78.18.121:8080/uploads',
        //pass file as data, should be user ng-model
        data:{file:file}
      //upload function returns a promise
      }).then(function (resp){
        if(resp.data.error_code === 0) { //validate success
          console.log('Success ' + that.up.file.name + 'uploaded. Response: ');
        } else {
          console.log('an error occured');
        }
      });
    };

    that.upload(that.up.file);
    //closes the dialog box once the 'submit' is clicked
    ngDialog.close();
    //removes line that confirms a photo has been added
    $scope.photoUploaded = false;
    $state.go($state.current, {}, {reload: true});
    /**
     * The following is two ideas to get the page to automatically append the just submitted data (so that you don't have to refresh the page to see your new entry)
     */
    //using jQuery to append...
      // $("#start").append('<div id="container"><div id="content"><div class="row"><div class="col-md-4"><img id="restphoto" src="{{'data.image'}}" alt=""></div><div class="col-md-8"><h1>{{'data.restaurantName'}}</h1><div class="restinfo"><p>{{'data.restaurantAddress'}}</p><p>{{'data.restaurantReview'}}</p></div><h3>Ratings</h3><div class ="ratinginfo"><ul><li>Food: {{'data.foodRating'}}</li><li>Service: {{'data.serviceRating'}}</li><li>Ambience: {{'data.ambienceRating'}}</li><li>Price per: {{'$' '+ data.priceRating'}}</li></ul></div></div></div></div></div>')

    //using the refresh function found in user.ctrl.js
      // window.refresh();
  };

});
