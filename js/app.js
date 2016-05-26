// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope,$ionicHistory,$rootScope,$ionicModal) {
	
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
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

	.state('login', {
		url: '/login',
			templateUrl: 'templates/login.html',
      controller: 'login'
	  })
	.state('register', {
		url: '/register',
			templateUrl: 'templates/register.html'
	  })


  // Each tab has its own nav history stack:

  .state('tab.all', {
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
      url: '/active',
      views: {
        'tab-active': {
          templateUrl: 'templates/tab-active.html',
          controller: 'NoticeCtr'
        }
      }
    })

  .state('tab.noticias', {
      url: '/noticias',
      views: {
        'tab-active': {
          templateUrl: 'templates/post.html',
          controller: 'Noti-detailCtr'
        }
      }
    })

  

  //configuracion
	 .state('tab.group', {
      url: '/group',
      views: {
        'tab-group': {
          templateUrl: 'templates/tab-group.html',
          controller: 'confiCtr'
        }
      }
    })

   .state('tab.imagen', {
      url: '/imagen',
      views: {
        'tab-group': {
          templateUrl: 'templates/viewfoto.html',
           controller: 'FotoCtr'
        }
      }
    })

   .state('tab.cclave', {
      url: '/cclave',
      views: {
        'tab-group': {
          templateUrl: 'templates/cambiar_contrasena.html',
           controller: 'ClaveCtr'
        }
      }
    })

   .state('tab.perfil', {
      url: '/perfil',
      views: {
        'tab-group': {
          templateUrl: 'templates/profile.html',
           controller: 'PerfilCtr'
        }
      }
    })

   .state('tab.sol-recibidas', {
      url: '/sol-recibidas',
      views: {
        'tab-group': {
          templateUrl: 'templates/s_recibidas.html',
           controller: 'Sol-reciCrt'
        }
      }
    })

   .state('tab.sol-enviadas', {
      url: '/sol-enviadas',
      views: {
        'tab-group': {
          templateUrl: 'templates/s_enviadas.html',
           controller: 'Sol-envCrt'
        }
      }
    })
   .state('tab.acercade', {
      url: '/acercade',
      views: {
        'tab-group': {
          templateUrl: 'templates/acerca.html'
        
        }
      }
    })


	.state('tab.chat', {
    cache: false,
    url: '/chat',
    views: {
      'tab-all': {
        templateUrl: 'templates/chat.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-all': {
        templateUrl: 'templates/profile.html'
      }
    }
  })

  .state('tab.perfil1', {
    cache: false,
    url: '/perfil1',
    views: {
      'tab-all': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtr'
      }
    }
  })

  .state('tab.perfil2', {
    url: '/perfil2',
    views: {
      'tab-all': {
        templateUrl: 'templates/perfil1.html',
        controller: 'perfilGrCtr'
      }
    }
  })
  .state('tab.foto_grupo', {
    url: '/foto_grupo',
    views: {
      'tab-all': {
        templateUrl: 'templates/foto_grupo.html',
        controller: 'foto_grupoCtr'
      }
    }
  })

  .state('tab.chat-canal', {
    url: '/chat-canal',
    views: {
      'tab-all': {
        templateUrl: 'templates/chat-canal.html',
        controller: 'chat-canalCtr'
      }
    }
  })
   

  .state('tab.recent', {
    url: '/recent',
    views: {
      'tab-recent': {
        templateUrl: 'templates/tab-recent.html',
        controller: 'ContacCtr'
      }
    }
  })
  
  .state('tab.agregar', {
    url: '/agregar',
    views: {
      'tab-recent': {
        templateUrl: 'templates/agregar.html',
        controller: 'ContacCtr'
      }
    }
  })
  .state('tab.grupo', {
    url: '/grupo',
    views: {
      'tab-recent': {
        templateUrl: 'templates/crear_grupo.html',
        controller: 'ContacCtr'
      }
    }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
