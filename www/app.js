
angular.module('App',
  [
    'ionic',
    'ngCordova',
    // Views
    'App.home',
    'App.about',
    'App.login',
    'App.logout',
    'App.image.upload',
    'App.user.profile',
    'App.user.user',
    'App.user.users',
    'App.scanner',
    'App.timeline',
    // Factories
    'App.config',
    'App.factory.scanner',


    //Dependencies
    'angularMoment',
    'base64'
  ]
)

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
      if (ionic.Platform.isAndroid()) {
        window.StatusBar.backgroundColorByHexString('#039BE5');
      } else {
        StatusBar.styleLightContent();
      }
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'views/home/home.html',
          controller: 'homeCtrl'
        }
      }
    })

    .state('app.timeline', {
      url: '/timeline',
      views: {
        'menuContent': {
          templateUrl: 'views/timeline/timeline.html',
          controller: 'timelineCtrl'
        }
      }
    })

    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'views/about/about.html',
          controller: 'aboutCtrl'
        }
      }
    })

    .state('app.scanner', {
      url: '/scanner',
      views: {
        'menuContent': {
          templateUrl: 'views/scanner/scanner.html',
          controller: 'scannerCtrl'
        }
      }
    })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'views/login/login.html',
          controller: 'loginCtrl'
        }
      }
    })

    .state('app.logout', {
      url: '/logout',
      views: {
        'menuContent': {
          //templateUrl: 'views/logout/login.html',
          controller: 'logoutCtrl'
        }
      }
    })


    // Image routes

    .state('app.imageUpload', {
      url: '/upload/image',
      views: {
        'menuContent': {
          templateUrl: 'views/imageUpload/imageUpload.html',
          controller: 'imageUploadCtrl'
        }
      }
    })


    // User routes

    .state('app.userProfile', {
      url: '/user/profile',
      views: {
        'menuContent': {
          templateUrl: 'views/user/profile/profile.html',
          controller: 'userProfileCtrl'
        }
      }
    })

    .state('app.userUser', {
      url: '/user/:user',
      views: {
        'menuContent': {
          templateUrl: 'views/user/user/user.html',
          controller: 'userUserCtrl'
        }
      }
    })

    .state('app.userUsers', {
      url: '/users',
      views: {
        'menuContent': {
          templateUrl: 'views/user/users/users.html',
          controller: 'userUsersCtrl'
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})


.controller('AppCtrl', ['$scope', '$rootScope', 'scanner', '$location', function($scope,$rootScope, scanner, $location) {
  $rootScope.loggedIn = window.localStorage.token != undefined;

    if (window.localStorage.auth) {
      $rootScope.auth = JSON.parse(window.localStorage.auth);
    }

    $scope.scan = scanner.scan;


    $scope.goto = function(state) {
      console.log(state);

      $location.path('#/app/user/profile');
    }

}]);
