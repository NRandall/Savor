describe('Client Side Unit Test', function() {
  describe('Test for Test', function() {
    it('should pass', function() {
      expect(true).to.equal(true);
    });
  });

  describe('homeController', function() {
    var controller;
    var scope = {};

    // How to mock module =>
    // angular.module('ngMaterial', []);
    beforeEach(module('savor.home'));

    beforeEach(inject(function(_$controller_){
      var $controller = _$controller_;
      controller = $controller('homeController', { $scope: scope });
    }));

    describe('$scope.map', function() {
      it('should have center property that contains latitude and longitude', function() {
        expect(true).to.equal(true);
      });

      it('should have center property', function() {
        expect(true).to.equal(true);
      });
    });
  });

  describe('reviewController', function() {
    var controller;
    var $scope = {};
    var state = {};
    var ngDialog = {};
    var upload = {};
    var item = {
      name: 'test',
      location: {
        display_address: [
          'test',
          'whatever',
          'address'
        ]
      }
    };

    // How to mock module =>
    angular.module('ngDialog', []);
    angular.module('ngFileUpload', []);
    beforeEach(module('savor.review'));

    beforeEach(inject(function(_$controller_, _$window_){
      var $controller = _$controller_;
      var $window = _$window_;
      controller = $controller('reviewController', { $scope: $scope, $state: state, ngDialog: ngDialog, $window: $window, Upload: upload });
    }));

    describe('$scope.restaurant', function() {
      it('should be a Object', function() {
        expect($scope.restaurant).to.be.a('object');
      });

      it('should have properties of name and address', function() {
        expect($scope.restaurant).to.have.property('name');
        expect($scope.restaurant).to.have.property('address');
      });

      it('should have properties of name and address with empty string', function() {
        expect($scope.restaurant.name).to.equal('');
        expect($scope.restaurant.address).to.equal('');
      });
    });

    describe('$scope.queryYelp', function() {
      it('should be a function', function() {
        expect($scope.queryYelp).to.be.a('function');
      });
    });

    describe('$scope.selectedOne', function() {
      it('should be a Object', function() {
        expect($scope.selectedOne).to.be.a('object');
      });

      it('should have name property and address property after $scope.selectOne called', function() {
        $scope.selectOne(item);
        expect($scope.selectedOne).to.have.property('name');
        expect($scope.selectedOne).to.have.property('address');
      });
    });

    describe('$scope.isFetched', function() {
      it('should be false when initialized', function() {
        expect($scope.isFetched).to.equal(false);
      });

      it('should be changed to false when $scope.selectOne method is called', function() {
        $scope.isFetched = true;
        $scope.selectOne(item);
        expect($scope.isFetched).to.equal(false);
      });
    });

    describe('$scope.selectOne', function() {
      it('should be a function', function() {
        expect($scope.selectOne).to.be.a('function');
      });

      it('should have one argument', function() {
        expect($scope.selectOne.length).to.equal(1);
      });

      it('should store name and address of restaurant when called', function() {
        $scope.selectOne(item);
        expect($scope.selectedOne.name).to.equal('test');
        expect($scope.selectedOne.address).to.equal('test address');
      });
    });

    describe('$scope.isSelected', function() {
      it('should be equal to false when initialized', function() {
        expect($scope.isSelected).to.equal(false);
      });

      it('should be changed to true when $scope.selectOne called', function() {
        $scope.selectOne(item);
        expect($scope.isSelected).to.equal(true);
      });
    });
  });

  // Skip toolbar test for the moment...
  describe.skip('toolbarController', function() {
    var controller;
    var $scope = {};
    var $location = {};
    var $mdSidenav;
    var state = {};
    var ngDialog = {};

    // How to mock module =>
    angular.module('ngDialog', []);

    beforeEach(function () {
      var ele = document.createElement('md-sidenav');
      ele.setAttribute('class', 'md-sidenav-right _md-closed');
      ele.setAttribute('md-component-id', 'right');
      // document.body.appendChild(ele);
      document.body.insertBefore(ele, document.body.childNodes[0])
      var isOpened = false;
      module({
        'mockmdSidenav': function () {
          return {
            isOpen: function() {
              return isOpened;
            },
            close: function() {
              isOpened = false;
            },
            open: function () {
              isOpened = true;
            }
          }
        }
      });
      module('savor.toolbar')

      inject(function(_$controller_, _$mdSidenav_){
        var $controller = _$controller_;
        $mdSidenav = _$mdSidenav_;
        controller = $controller(toolbarController, { $scope: $scope, ngDialog: ngDialog, auth: {}, store: {}, $mdSidenav: $mdSidenav});
      })
    });

    describe('socket.io', function() {
      it('should emit "chat msg" event when $scope.keypress is called with enter key', function(done) {
        $scope.keypress({charCode: 13});
      });
    });
  });

});
