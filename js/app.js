// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
      cordova.plugins.Keyboard.disableScroll(true)

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault()
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


  .state('app.inicio', {
      url: '/inicio',
      views: {
        'menuContent': {
          templateUrl: 'templates/inicio.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

   .state('app.perfil', {
    url: '/perfil',
    views: {
      'menuContent': {
        templateUrl: 'templates/perfil.html',
        controller: 'PlaylistCtrl',
      }
    }
  })

   .state('app.emisora', {
    url: '/emisora',
    views: {
      'menuContent': {
        templateUrl: 'templates/emisora.html',
        controller: 'PlaylistCtrl',
      }
    }
  })

   .state('app.chat', {
    url: '/chat',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat.html',
        controller: 'PlaylistCtrl',
      }
    }
  })

   .state('app.detalleschat', {
    url: '/detalleschat',
    views: {
      'menuContent': {
        templateUrl: 'templates/detalleschat.html',
        controller: 'PlaylistCtrl',
      }
    }
  })

   .state('app.contactos', {
    url: '/contactos',
    views: {
      'menuContent': {
        templateUrl: 'templates/contactos.html',
        controller: 'contacto',
      }
    }
  })

   .state('app.noticias', {
    url: '/noticias',
    views: {
      'menuContent': {
        templateUrl: 'templates/noticias.html',
        controller: 'contacto',
      }
    }
  })

   .state('app.detallesnoticia', {
    url: '/detallesnoticia',
    views: {
      'menuContent': {
        templateUrl: 'templates/detallesnoticia.html',
        controller: 'contacto',
      }
    }
  })

   .state('registro', {
    url: '/registro',
        templateUrl: 'templates/registro.html',
  })

 .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginController',
      })

 .state('acercade', {
      url: '/acercade',
      templateUrl: 'templates/acercade.html',
    })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
