angular
    .module('savor.toolbar', ['ngMaterial'])
    .controller('toolbarController', ['toolbarFactory', 'ngDialog', '$scope', '$mdSidenav']);

// CHANGED (not really)
// they forgot to inject rootScope?
function toolbarController(auth, store, $location, ngDialog, $scope, $mdSidenav, $rootScope) {
  var vm = this;
  vm.login = login;
  vm.logout = logout;
  vm.auth = auth;

  function login() {
    // The auth service has a signin method that
    // makes use of Auth0Lock. If authentication
    // is successful, the user's profile and token
    // are saved in local storage with the store service
    auth.signin({}, function(profile, token) {
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/user');
      if (!$rootScope.$$phase) $rootScope.$apply();
    }, function(error) {
      console.log(error);
    });
  }

  function logout() {
    // The signout method on the auth service
    // sets isAuthenticated to false but we
    // also need to remove the profile and
    // token from local storage
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/');
    if (!$rootScope.$$phase) $rootScope.$apply();
  }

  function goHome() {
    $location.path('/');
  }

  /*
   * function that launches review dialog box on pencil icon click in toolbar
   */
  $scope.openReview = function() {
    ngDialog.open({
      template: '/views/components/review/review.tpl.html',
      controller: 'reviewController',
      scope: $scope,
      className: 'ngdialog-theme-default dialogwidth800'
    })
  };

  $scope.chatLog = [];
  $scope.chatMsg = '';

  socket.on('chat msg', function (msg) {
    $scope.$applyAsync(function () {
      $scope.chatLog.push(msg);
    });
  });

  $scope.keypress = function keypress (e) {
    if(e.charCode === 13) {

      // username should be set!!!
      var profile = JSON.parse(localStorage.getItem('profile')) || {};
      var username = profile.nickname || 'Unknown';
      socket.emit('chat msg', {username: username, msg: $scope.chatMsg});
      $scope.chatMsg = '';
      console.log($scope.chatLog);
    }
  };

  $scope.openChat = function openChat () {
    $mdSidenav('right')
      .open()
      .then(function () {
        console.debug("toggle is done");
      });
  };

  $scope.closeChat = function closeChat () {
    $mdSidenav('right')
      .close()
      .then(function () {
        console.debug("toggle is done");
      });
  };
}
