// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'btford.socket-io','starter.controllers', 'starter.services', 'nl2br', 'monospaced.elastic', 'ngCordova', 'ngAlertify','ngAudio','angularFileUpload','ngSanitize','ionic.service.core','ionic.service.push','angularSoundManager'])

.value('_', window._)
.run(function($ionicPlatform,$cordovaPush) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    var androidConfig = {
      "senderID": "217743739524",
    };

    var pushNotification = window.plugin.pushNotification;
    pushNotification.register(successHandler, errorHandler,{"senderID":"217743739524","ecb":"onNotificationGCM"});
    
    function successHandler(result) { 
      alert('Callback Success! Result = '+result) 
    }
    function errorHandler(error) { 
      alert(error); 
    } 

    function onNotificationGCM(e){
      alert("e");
      switch(e.event) 
      { 
        case 'registered': 
              if(e.regid.length>0) 
              { 
                  //console.log("Regid " + e.regid); 
                  //alert('registration id = '+e.regid); 
                  var registro='regId='+encodeURIComponent(e.regid);
                  alert(registro);
              } 
              break; 
        case 'message': 
          // NOTIFICACION!!! 
            //alert('message = '+e.message+' msgcnt = '+e.msgcnt); 
            break; 

        case 'error': 
            //alert('GCM error = '+e.msg); 
            break; 
        default: 
            //alert('An unknown GCM event has occurred'); 
            break; 
      }
    } 
    // $cordovaPush.register(androidConfig).then(function(result) {
    //     // Success
    //     alert(result);
    // }, function(err) {
    //   // Error
    //   alert(err);
    // });

    // $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
    //     switch(notification.event) {
    //       case 'registered':
    //         if (notification.regid.length > 0 ) {
    //           alert('registration ID = ' + notification.regid);
    //         }
    //         break;

    //       case 'message':
    //         // this is the actual push notification. its format depends on the data model from the push server
    //         alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
    //         break;

    //       case 'error':
    //         alert('GCM error = ' + notification.msg);
    //         break;

    //       default:
    //         alert('An unknown GCM event has occurred');
    //         break;
    //     }
    //   });


      // WARNING: dangerous to unregister (results in loss of tokenID)
      // $cordovaPush.unregister(options).then(function(result) {
      //   // Success!
      // }, function(err) {
      //   // Error
      // });

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $ionicConfigProvider.views.maxCache(0);

  $stateProvider

  // login screen
  .state('login', {
    cache: false,
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'login'
  })

  // register screen
  .state('register', {
    cache: false,
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registrar'
  })

  // Home screen
  .state('home', {
    cache: false,
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })

  //Inicio
  .state('inicio', {
    cache: false,
    url: '/inicio',
    templateUrl: 'templates/inicio.html',
    controller: 'inicioC'
  
  })



 // Agregar Contacto
.state('agregar', {
    url: '/agregar',
    templateUrl: 'templates/agregar.html',
    controller: 'agrgarC'
  })

  

  // View post detailj
  .state('post', {
    cache: false,
    url: '/post/:postId',
    templateUrl: 'templates/post.html',
    controller: 'PostCtrl'
  })

  // Chat list
  .state('chats', {
    cache: false,
    url: '/chats',
    templateUrl: 'templates/chats.html',
    controller: 'ChatCtrl'
  })

  .state('chat-detail', {
    cache: false,
    url: '/chats-detail',
    templateUrl: 'templates/chat-detail.html',
    controller: 'ChatDetailCtrl'
  })


  // Contact list
  .state('contacts', {
    cache: false,
    url: '/contacts',
    templateUrl: 'templates/contacts.html',
    controller: 'ContactsCtrl'
  })

  // User profile
  .state('user', {
    cache: false,
    url: '/user/:userId',
    templateUrl: 'templates/user.html',
    controller: 'UserCtrl'
  })

  // Setting page
  .state('setting', {
    url: '/setting',
    templateUrl: 'templates/setting.html',
    controller: 'SettingCtrl'
  })

  .state('acercade', {
    url: '/acercade',
    templateUrl: 'templates/acerca.html',
    controller: 'AcercaCtrl'
  })

  .state('edit_perfil', {
    url: '/edit_perfil',
    templateUrl: 'templates/edit_perfil.html',
    controller: 'perfil'
  })

  .state('cambiar_contrasena', {
    cache: false,
    url: '/cambiar_contrasena',
    templateUrl: 'templates/cambiar_contrasena.html',
    controller: 'c_clave'
  })

  .state('restaurar', {
    url: '/restaurar',
    templateUrl: 'templates/restaurar.html',
    controller: 'restaurar'
  })

  .state('solicitudes', {
    cache: false,
    url: '/solicitudes',
    templateUrl: 'templates/solicitudes.html',
    controller: 'SettingCtrl'
  })

  .state('viewfoto', {
    cache: false,
    url: '/viewfoto',
    templateUrl: 'templates/viewfoto.html',
    controller: 'foto'
  })

  .state('s_recibidas', {
    cache: false,
    url: '/s_recibidas',
    templateUrl: 'templates/s_recibidas.html',
    controller: 'Senrecibidas'
  })

 .state('stream', {
        url: '/stream',
        templateUrl: 'templates/stream.html',
        controller: 'StreamController as vm'          
    })

  .state('s_enviadas', {
    cache: false,
    url: '/s_enviadas',
    templateUrl: 'templates/s_enviadas.html',
    controller: 'Senviadas'
  })

  .state('d_chat', {
    cache: false,
    url: '/d_chat',
    templateUrl: 'templates/d_chat.html',
    controller: 'prueba'
  })

  
  .state('info_chat', {
    cache: false,
    url: '/info_chat',
    templateUrl: 'templates/info_chat.html',
    controller: 'info_chat'
  })

    .state('foto_grupo', {
    cache: false,
    url: '/foto_grupo',
    templateUrl: 'templates/foto_grupo.html',
    controller: 'foto_grupo'
  })

  .state('crear_grupo', {
    cache: false,
    url: '/crear_grupo',
    templateUrl: 'templates/crear_grupo.html',
    controller: 'ContactsCtrl'
  })

  .state('a_p_grupo', {
    cache: false,
    url: '/a_p_grupo',
    templateUrl: 'templates/a_p_grupo.html',
    controller: 'ContactsCtrl'
  })

  .state('chat-canal', {
    cache: false,
    url: '/chat-canal',
    templateUrl: 'templates/chat-canal.html',
    controller: 'chat-canal'
  })

    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
