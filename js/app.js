// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','angularSoundManager','chieffancypants.loadingBar','ngAnimate','ngAlertify','angularFileUpload','ngCordova'])

.run(function($ionicPlatform, $rootScope,$ionicHistory,$rootScope,$ionicModal,$cordovaPush) {

	

  //$rootScope.recent=[{id:"1",img:"img/003.png",name:"Nicolas Kage",type:"Hello John where are u?",date:"16 April",number:true,color:"#fbb116"},{id:"2",img:"img/002.png",name:"Tom Cruze",msg:"Please call me later",date:"29 August",color:"#ff0000"},{id:"3",img:"img/001.png",name:"Mark Antony",msg:"I will call you tomorrow",date:"4 October",color:"#27b600"},{id:"4",img:"img/def.png",name:"Robert D-Niro",type:"Web",msg:"Typing ....",date:"16 April",color:"#fbb116"}]	
  //$rootScope.list=[{id:"1",img:"img/001.png",name:"Mark Antony",type:"Web",msg:"Typing....",status:"Avaliable",color:"#27b600"},{id:"2",img:"img/002.png",name:"Tom Cruze",type:"Mobile",msg:" Last message ( 5 minute ago )",status:"Busy",color:"#ff0000"},{id:"3",img:"img/003.png",name:"Nicolas Kage",type:"Web",msg:" Last message ( 5 minute ago )",status:"Away",number:true,color:"#fbb116"},{id:"4",img:"img/def.png",name:"Robert D-Niro",type:"Mobile",msg:" Last message ( 5 minute ago )",status:"Invisible",block:"Block"},{id:"5",img:"img/def.png",name:"Steve MQween",type:"Mobile",msg:"Typing....",status:"Offline",color:"#ccc"},{id:"6",img:"img/def.png",name:"Brayan Adams",type:"Web",msg:" Last message ( 5 minute ago )",status:"Away",color:"#fbb116"}]	
  //$rootScope.chat=[{id:"1"},{id:"2",type:"1"},{id:"3"}]

  $rootScope.songs = [
            {
                id: 'juv',
                title: 'Mario En Tu Radio Juvenil',
                artist: 'Mario',
                url: 'http://5.199.169.190:8221/;stream.mp3',
                play:'play',
                img:'img/juvenil.png'
            },{
                id: 'sal',
                title: 'Mario En Tu Radio Salsa',
                artist: 'Mario',
                url: 'http://5.199.169.190:8036/;stream.mp3',
                play:'play',
                img:'img/salsa.png'
            }
            
        ]
  $rootScope.person={status:0};
  $rootScope.myGoBack = function() {$ionicHistory.goBack();};




  $ionicPlatform.ready(function() {



    var idtel = "";
    var us = localStorage.getItem("usuario");

    var androidConfig = {
      "senderID": "217743739524"
     };



    $cordovaPush.register(androidConfig).then(function(result) {
      // Success
     // alert(result);
    }, function(err) {
      // Error
     // alert(err);
    }
    )


    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
    //alert(notification.event);
    switch(notification.event) {
      case 'registered':
        if (notification.regid.length > 0 ) {
          
          alert('registration ID = ' + notification.regid);
          idtel = notification.regid;
          localStorage.setItem("prueba", idtel);

    
        }
        
        break;  
    }

    
  }); 

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });



  /*************************************search_modal.html******************/
	$ionicModal.fromTemplateUrl('templates/search_modal.html',function(modal){
	$rootScope.search_modal=modal;
	}, {
		scope: $rootScope,
		animation: 'slide-in-up'
	});

  $ionicModal.fromTemplateUrl('templates/modal_emisora.html',function(modal){
  $rootScope.modal_emisora1 = modal;
  }, {
    scope: $rootScope,
    animation: 'slide-in-up'
  });

  $rootScope.modal_emisora= function(){
    $rootScope.modal_emisora1.show();
  };
  
  $rootScope.closemodal_emisora= function() {  
    $rootScope.modal_emisora1.hide();
  };

    $ionicModal.fromTemplateUrl('templates/modal-usuarios.html',function(modal){
  $rootScope.modal_usuario1 = modal;
  }, {
    scope: $rootScope,
    animation: 'slide-in-up'
  });

  $rootScope.modal_usuario= function(){
    $rootScope.modal_usuario1.show();
  };
  
  $rootScope.closemodal_usuario= function() {  
    $rootScope.modal_usuario1.hide();
  };
	
  
	$rootScope.opensearch_modal= function(){
		$rootScope.search_modal.show();
	};
	
	$rootScope.closesearch_modal= function() {	
		$rootScope.search_modal.hide();
	};

	$rootScope.$on('$destroy', function() {
		$rootScope.search_modal.remove();
    $rootScope.modal_emisora1.remove();
    $rootScope.modal_usuario1.remove();
    
	});
	$rootScope.$on('modal.hidden', function() {
    // Execute action
  });



 
 /*************************************search_modal.html******************/


  
})



.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
	
	$ionicConfigProvider.tabs.position('bottom');
	
    $ionicConfigProvider.backButton.text('').previousTitleText('')  ;

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",

    templateUrl: "templates/tabs.html"
  })

	.state('login', {
    cache: false,
		url: '/login',
			templateUrl: 'templates/login.html',
      controller: 'login'
	  })
	.state('register', {
    cache: false,
		url: '/register',
			templateUrl: 'templates/register.html'
	  })


  // Each tab has its own nav history stack:

  .state('tab.all', {
    cache: false,
    url: '/all',
    views: {
      'tab-all': {
        templateUrl: 'templates/tab-all.html',
        controller: 'ChatCtr'
      }
    }
  })

//Tab de noticias
  .state('tab.active', {
    cache: false,
      url: '/active',
      views: {
        'tab-active': {
          templateUrl: 'templates/tab-active.html',
          controller: 'NoticeCtr'
        }
      }
    })

  .state('noticias', {
    cache: false,
      url: '/noticias',
          templateUrl: 'templates/post.html',
          controller: 'Noti-detailCtr'
    })

  

  //configuracion
	 .state('tab.group', {
    cache: false,
      url: '/group',
      views: {
        'tab-group': {
          templateUrl: 'templates/tab-group.html',
          controller: 'confiCtr'
        }
      }
    })

   .state('imagen', {
    cache: false,
      url: '/imagen',

          templateUrl: 'templates/viewfoto.html',
           controller: 'FotoCtr'
    })

   .state('cclave', {
    cache: false,
      url: '/cclave',
  
          templateUrl: 'templates/cambiar_contrasena.html',
           controller: 'ClaveCtr'
 
    })

   .state('perfil', {
    cache: false,
      url: '/perfil',
   
          templateUrl: 'templates/profile.html',
           controller: 'PerfilCtr'

    })

   .state('sol-recibidas', {
    cache: false,
      url: '/sol-recibidas',
     
          templateUrl: 'templates/s_recibidas.html',
           controller: 'Sol-reciCrt'
 
    })

   .state('sol-enviadas', {
    cache: false,
      url: '/sol-enviadas',

          templateUrl: 'templates/s_enviadas.html',
           controller: 'Sol-envCrt'

    })
   .state('acercade', {
    cache: false,
      url: '/acercade',
  
          templateUrl: 'templates/acerca.html'
 
    })


	.state('chat', {
    cache: false,
    url: '/chat',
        templateUrl: 'templates/chat.html',
        controller: 'ChatDetailCtrl'
  })

  .state('tab.profile', {
    cache: false,
    url: '/profile',
    views: {
      'tab-all': {
        templateUrl: 'templates/profile.html'
      }
    }
  })

  .state('perfil1', {

    cache: false,
    url: '/perfil1',
   
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtr'

  })

  .state('perfil2', {
    cache: false,
    url: '/perfil2',

        templateUrl: 'templates/perfil1.html',
        controller: 'perfilGrCtr'

  })
  .state('foto_grupo', {
    cache: false,
    url: '/foto_grupo',

        templateUrl: 'templates/foto_grupo.html',
        controller: 'foto_grupoCtr'

  })

  .state('chat-canal', {
    cache: false,

        templateUrl: 'templates/chat-canal.html',
        controller: 'chat-canalCtr'

  })
   

  .state('tab.recent', {
    cache: false,
    url: '/recent',
    views: {
      'tab-recent': {
        templateUrl: 'templates/tab-recent.html',
        controller: 'ContacCtr'
      }
    }
  })
 
  .state('a_grupo', {

    cache: false,
    url: '/a_grupo',
 
        templateUrl: 'templates/a_p_grupo.html',
        controller: 'ContacCtr'

  })

    .state('agregar', {
    cache: false,
    url: '/agregar',
 
        templateUrl: 'templates/agregar.html',
        controller: 'agregarCtr'

  })

  .state('grupo', {
    cache: false,
    url: '/grupo',
  
        templateUrl: 'templates/crear_grupo.html',
        controller: 'ContacCtr'

  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
