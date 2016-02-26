
angular.module('starter.controllers', [])

.controller("ExampleController", function($scope, $cordovaMedia, $ionicLoading) {
 
    $scope.play = function(src) {
        var media = new Media(src, null, null, mediaStatusCallback);
        $cordovaMedia.play(media);
    }
 
    var mediaStatusCallback = function(status) {
        if(status == 1) {
            $ionicLoading.show({template: 'Cargando...'});
        } else {
            $ionicLoading.hide();
        }
    }
 
})



// Authentication controller
// Put your login, register functions here
.controller('AuthCtrl', function($scope, $location, $ionicHistory, $ionicSideMenuDelegate, $state, $ionicPopup,loginService,$http,$templateCache,$rootScope) {
  // hide back butotn in next view
  $ionicHistory.nextViewOptions({
    disableBack: true
  });



  // disabled swipe menu
 


  $scope.data ={};
 



      /*    loginService.loginUser($scope.data.identificacion, $scope.data.clave).success(function(data) {
          localStorage.setItem("usuario", $scope.data.identificacion);
          localStorage.setItem("clave", $scope.data.clave);

         
            $state.go('inicio');
        }).error(function(data) {
              var alertPopup = $ionicPopup.alert({
                title: 'Acceso Denegado!',
                okType: 'button-assertive',
                template: 'Por favor verifique sus datos!'
            });
        });
    } */

    $scope.login_q = function() {

       window.localStorage.clear();
     

        $ionicHistory.clearCache().then(function() {
    //now you can clear history or goto another state if you need
       $ionicHistory.clearHistory();
       $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
       $state.go('login');
      })
/*
      window.localStorage.clear();

      console.log(localStorage.getItem("usuario"));

      $templateCache.removeAll();


      $ionicHistory.nextViewOptions({
     disableBack: true
      });

      $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    $ionicHistory.goBack()
  

      $state.go('login'); */
     
    }

     //fin

})
// Home controller
.controller('HomeCtrl', function($scope, Posts, $state, $ionicHistory,$templateCache,$http,$ionicPlatform) {

 var self = $ionicPlatform = {


    exitApp: function() {
      self.ready(function() {
        navigator.app && navigator.app.exitApp && navigator.app.exitApp();
      });
    }
    
  };





  $templateCache.removeAll();
  console.log(localStorage.getItem("prueba"));

  $scope.pruebaC = function () {

  $email_p = localStorage.getItem("usuario");
  console.log($email_p);
   var token = "io-gluk@fct%vusb";



 }

  
  $email_d = localStorage.getItem("usuario");
  console.log($email_d);
   var token = "io-gluk@fct%vusb";
   var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/getUser",
            data: {
                    email: $email_d,
                    token:token

                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            request.success(function (response) {

              $scope.user = response;

              console.log(response);

            });

 

  if(localStorage.getItem("usuario"))
    {
       
    }
    else
    {
      $ionicHistory.nextViewOptions({
    disableBack: true
  });


      $state.go('login');
    }

console.log(localStorage.getItem("usuario"));
    
      

  // get list posts froms service
  $scope.posts = Posts.all();

  // toggle like button
  /*
  $scope.toggleLike = function (post) {
    // if user liked
    if(post.liked) {
      post.likeCount--;
    } else {
      post.likeCount++;
    }
    post.liked = !post.liked;
  };*/

  // view post

$scope.viewPost = function(postId) {


  localStorage.setItem("View_id_noticia", postId);
  /*  $state.go('post'); */

    $state.go('post', {postId: postId});
}
   
  // view user



  


   $scope.timeline = [{
    date: "11 Febrero",
    title: "Fabio Garcia",
    author: "13:03 PM",
    profilePicture: "img/adam.jpg",
    text: "Lorem ipsum dolor sit amet",
    type: "text"

  }, {
    date: "11 Febrero",
    title: "Fabio Garcia",
    author:  "13:03 PM",
    profilePicture: "img/adam.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    type: "text"

  }, {
    date: "11 Febrero",
    title: "Fabio Garcia",
    author:  "13:03 PM",
    profilePicture: "img/adam.jpg",
    text: "img/adam.jpg",
    type: "picture"

  }, {
    date: "11 Febrero",
    title: "Fabio Garcia",
    author:  "13:03 PM",
    profilePicture: "img/adam.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    type: "text"  //video... audio
  }]


})

// Chat controller, view list chats and chat detail
.controller('ChatCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();

  // remove a conversation
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  // mute a conversation
  $scope.mute = function(chat) {
    // write your code here
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $ionicScrollDelegate, $ionicActionSheet, $timeout) {
  //$scope.chat = Chats.get($stateParams.chatId);
  $scope.chat = Chats.get(0);

  $scope.sendMessage = function() {
    var message = {
      type: 'sent',
      time: 'Just now',
      text: $scope.input.message
    };

    $scope.input.message = '';

    // push to massages list
    $scope.chat.messages.push(message);

    $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
  };

  $scope.openFileDialog=function() {
            console.log('fire! $scope.openFileDialog()');
            ionic.trigger('click', { target: document.getElementById('file') });
        };

  // hover menu
  $scope.onMessageHold = function(e, itemIndex, message) {
    // show hover menu
    $ionicActionSheet.show({
      buttons: [
        {
          text: 'Copy Text'
        }, {
          text: 'Delete Message'
        }
      ],
      buttonClicked: function(index) {
        switch (index) {
          case 0: // Copy Text
            //cordova.plugins.clipboard.copy(message.text);

            break;
          case 1: // Delete
            // no server side secrets here :~)
            $scope.chat.messages.splice(itemIndex, 1);
            break;
        }

        return true;
      }
    });
  };



})




.controller('PostCtrl', function($scope, Posts, $state,$http) {
  // get list posts froms service

  /*

    var id_noticia = localStorage.getItem("View_id_noticia");
        var token = "io-gluk@fct%vusb";
        console.log(id_noticia);

        var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/viewNoticia",
            data: {
                    id_noticia: id_noticia,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            }); */
            /* Check whether the HTTP Request is Successfull or not. */
           /* request.success(function (response) {

              $scope.post1 = response;

              console.log(response);

             

            }); */
        $scope.post = Posts.get(0);
        //$state.go('post');


  // toggle like button


  // view user function
 
})

// Notifications controller
.controller('NotificationsCtrl', function($scope, Notifications) {
  // get list posts from service
  $scope.notifications = Notifications.all();
})

// ContactsCtrl controller
.controller('ContactsCtrl', function($scope, Contacts, $state,$http,alertify) {
  // get list posts froms service
  //$scope.contacts = Contacts.all();
 // console.log($scope.contacts);
$scope.ccon = function(){

  $usuarioC = localStorage.getItem("usuario");

  var request = $http({
                method: "post",
                url: "http://radio.sigtics.org/movil_funciones/listarUsuario",
                data: {
                    usuario: $usuarioC 
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
          request.success(function (data) {

            
              $scope.contacts = data;
              
              console.log($scope.contacts);
              return $scope.contacts
              
             }); 
}

  
$scope.ccon();






 

  // view contact function

  $scope.ver_contac = function(idusuario){

   // console.log(idusuario);

   $state.go('edit_perfil');
    localStorage.setItem("View_id_contac", idusuario);

    
  }

  $scope.eliminar_contac = function(idusuarioE){

    
    var idE = idusuarioE;
    console.log(idE);
    var token = "io-gluk@fct%vusb";


   var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/eliminarContacto",
            data: {
                    id: idE,
                    token:token

                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            request.success(function (response) {

              alertify.logPosition("top right");
                 alertify.success(response.msg);

                

                  $scope.ccon();
                  
               
              console.log(response);

            }); 

}

})

// UserCtrl controller
.controller('UserCtrl', function($scope, Contacts, Posts, $stateParams, $http,$ionicPopup,$ionicHistory, $state,$timeout,$upload,alertify) {
  // get contact from Contacts service
  // set the userId here
  $ionicHistory.nextViewOptions({
    disableBack: true
  });
  $email_d = localStorage.getItem("usuario");
  var token = "io-gluk@fct%vusb";

  

  $scope.clickUpload = function(){
    document.getElementById("i_file").trigger('click');
}
  
  //console.log($email_d);
    var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/getUser",
            data: {
                    email: $email_d,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (response) {

              $scope.user = response;

              console.log(response);

            });



  //$scope.user = Contacts.get(0);

  // attach post to this contact
 /* angular.extend($scope.user, {
    'followers': 199,
    'following': 48,
    'favorites': 14,
    'posts': Posts.all()
  });*/



   

     $scope.actualizar = function () {

      $nombre = document.getElementById("nombre_u").value;
      $estado = document.getElementById("estado_u").value;
      console.log($nombre);
      console.log($estado);

    var token = "io-gluk@fct%vusb";
    $email_ac = localStorage.getItem("usuario");

            var request = $http({
                method: "post",
                url: "http://radio.sigtics.org/movil_funciones/datos_personales",
                data: {
                    nombre: $nombre,
                    estado: $estado,
                    usuario_id: $email_ac,
                    token: token
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
              
              $men=data.msg;
              if (data.error==true) {
                
              alertify.logPosition("top right");
              alertify.error($men);

              }else
              {
              alertify.logPosition("top right");
              alertify.success($men);
              $state.go('user');
              console.log(data);
              }
             
            });
    }


    $scope.viewFoto = function(viewFoto) {

      localStorage.setItem("email_f", viewFoto);
      //console.log(viewFoto);
      /*  $state.go('post'); */
$ionicHistory.nextViewOptions({
    disableBack: true
  });
      $state.go('viewfoto');

    }

  
    
})

.controller('foto', function($scope,$http,$upload,$timeout,$state, $ionicHistory){
  $ionicHistory.nextViewOptions({
    disableBack: true
  });


  var email = localStorage.getItem("email_f");
  console.log(email);
  var token = "io-gluk@fct%vusb";
  var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/getUser",
            data: {
                    email: email,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });

  request.success(function (data) {
    console.log(data.img);
    $scope.img = data.img

  })

   $scope.uploadResult = [];
   $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
     alertify.logPosition("top right");
      alertify.success("Actualizando foto , Espere un momento");
    for (var i = 0; i < $files.length; i++) {
      var $file = $files[i];
      $upload.upload({
        url: 'http://radio.sigtics.org/movil_funciones/fotoPerfil',
        data: {id: email,
               token: token},
        file: $file,
        progress: function(e){
         
        }
      }).then(function(response) {
        // file is uploaded successfully
           
       $timeout(function() {
         $state.go('user');
          $scope.uploadResult.push(response.data);
          console.log($scope.uploadResult);
        });

      }); 
    }
  }
   $scope.clickUpload = function(){
    console.log("da");
    ionic.trigger('click', { target: document.getElementById('i_file') });
   }


})

 
                
                
              

 
.controller('login', function($scope,$ionicPopup,$http,$state,$location,$templateCache,$ionicHistory,alertify,$rootScope,$ionicPlatform){


   $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        // Función Botón atrás
        $ionicPlatform.registerBackButtonAction(function () {

                ionic.Platform.exitApp();
                console.log("aqui");

        }, 100);


    }); 


$ionicHistory.nextViewOptions({
    disableBack: true
  });



 $ionicHistory.clearHistory();


  

    if(localStorage.getItem("usuario"))
    {
      $ionicHistory.nextViewOptions({
    disableBack: true
  });

       $location.url("/inicio");
      // $state.go('inicio');
    }

    $scope.login = function() {

     
      $email = $scope.usuario_l;
      $clave = $scope.clave_l;
      var token = "io-gluk@fct%vusb";

          var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/login",
            data: {
                    email: $email,
                    pass: $clave,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {

         

              if(data == 1)
              {

                localStorage.setItem("usuario", $email);
                localStorage.setItem("prueba", 0);
                 $templateCache.removeAll();

                 $ionicHistory.nextViewOptions({
    disableBack: true
  });


                $state.go('inicio');
              }
              else
              {

                 alertify.logPosition("top right");
                 alertify.error("Datos Incorrectos");

              }
              
             

            });
           
         


          }

})

.controller('restaurar', function($scope,$ionicPopup,$http,$state,$location,$templateCache,$ionicHistory,alertify){

  $ionicHistory.nextViewOptions({
    disableBack: true
  });


  $scope.restaurar = function() {

    console.log($scope.usuario_res);
    $email_res = $scope.usuario_res
    var token = "io-gluk@fct%vusb";

    var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/restaurar",
            data: {
                    email: $email_res,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {

         

              if(data == 1)
              {
               alertify.logPosition("top right");
               alertify.success("Se envio una informacion a tu correo, para seguir los pasos de restauracion");
              }
              else
              {
                 alertify.logPosition("top right");
                 alertify.error("Datos Incorrectos");
              }
              
             

            });



  }

})


.controller('menu_perfil', function($scope,$ionicPopup,$http,$state,$location,$templateCache,alertify){

  

 

$email_d = localStorage.getItem("usuario");
  console.log($email_d);
   var token = "io-gluk@fct%vusb";
   var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/getUser",
            data: {
                    email: $email_d,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (response) {

              $scope.user = response;

              console.log(response);

            });



           




})

.controller('registrar', function($scope,$ionicPopup,$http,$state,$location,$templateCache,$ionicHistory,alertify){

  $ionicHistory.nextViewOptions({
              disableBack: true
               });
 var token = "io-gluk@fct%vusb";
   $scope.registrar = function () {

            var request = $http({
                method: "post",
                url: "http://radio.sigtics.org/movil_funciones/registrar",
                data: {
                    email: $scope.email_r,
                    pass: $scope.password_r,
                    nombre: $scope.nombre_r,
                    user: $scope.user_r,
                    sexo: $scope.sexo_r,
                    token: token
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
               
              $men = data.msg;
              if (data.error==true) {
                
              alertify.logPosition("top right");
              alertify.error($men);

              }else
              {

              alertify.logPosition("top right");
              alertify.success($men);
              $ionicHistory.nextViewOptions({
              disableBack: true
               });
              $state.go('login');
              }
            


            });
    }



})


.controller('c_clave', function($scope,$ionicPopup,$http,$state,$location,$templateCache,$ionicHistory,alertify){

  $scope.cambiar = function () {

    var token = "io-gluk@fct%vusb";
    $email_c = localStorage.getItem("usuario");
    console.log($email_c);

            var request = $http({
                method: "post",
                url: "http://radio.sigtics.org/movil_funciones/c_clave",
                data: {
                    c_actual: $scope.c_actual,
                    c_nueva: $scope.c_nueva,
                    cc_nueva: $scope.cc_nueva,
                    usuario_id: $email_c,
                    token: token
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {

              $men = data.msg;
              if (data.error==1) {
              alertify.logPosition("top right");
              alertify.error($men);

              }else
              {

              alertify.logPosition("top right");
              alertify.success($men);          

              $ionicHistory.nextViewOptions({
              disableBack: true
               });

              console.log(data.msg);

                }
            });
    }

})

// Agregar Contactos

.controller('agrgarC', function($scope,$ionicPopup,$http,$state,$location,$templateCache,$ionicHistory,alertify){

  $scope.cClave = function () {

    var token = "io-gluk@fct%vusb";
    var usuario = $scope.usuarioA;
    $email_con = localStorage.getItem("usuario");
    var tipoU = $scope.tipoU;
    console.log(tipoU);
    
   
 
            var request = $http({
                method: "post",
                url: "http://radio.sigtics.org/movil_funciones/Ausuario",
                data: {
                    usuario: usuario,
                    usuario_id: $email_con,
                    tipoU: tipoU,
                    token: token
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
            /* Check whether the HTTP Request is Successfull or not. */
           request.success(function (data) {

             if (data.error==true) {
              alertify.logPosition("top right");
              alertify.error(data.msg);

              }else
              {

              alertify.logPosition("top right");
              alertify.success(data.msg); 
              $ionicHistory.nextViewOptions({
              disableBack: true
               });
              console.log(data);
              $state.go('contacts'); 


             }

              

             
            }); 
    }

})



// Solicitudes Enviadas
.controller('Senviadas', function($scope,$http,alertify,$ionicHistory,$state){

  
  $email_en = localStorage.getItem("usuario");
  console.log($email_en);
   var token = "io-gluk@fct%vusb";
   console.log(token);
  var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/S_enviadas",
            data: {
                    email: $email_en,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
        
          request.success(function (response) {

              $scope.soli = response;



              console.log(response);

            }); 


$scope.Csolicitud = function (Csolicitu) {


console.log(Csolicitu);
var usuarioSoli = Csolicitu;
 var token = "io-gluk@fct%vusb";
 $email_can = localStorage.getItem("usuario");

var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/S_cancelar",
            data: {
                    usuarioe: $email_can,
                    usuarios: usuarioSoli,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
          
           request.success(function (response) {



              alertify.logPosition("top right");
              alertify.error(response.msg); 
              $ionicHistory.nextViewOptions({
              disableBack: true
               });
              console.log(response);
              $state.go('solicitudes'); 


            }); 
}


})

// SettingCtrl controller
.controller('Senrecibidas', function($scope,$http,alertify,$ionicHistory,$state){

  $email_rec = localStorage.getItem("usuario");
  console.log($email_rec);
   var token = "io-gluk@fct%vusb";
   console.log(token);
  var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/S_recibidas",
            data: {
                    email: $email_rec,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
        
          request.success(function (response) {

              $scope.reci = response;



              console.log(response);

            }); 

  $scope.Dsolicitud = function (Dsolicitu) {


console.log(Dsolicitu);
var usuarioSoliD = Dsolicitu;
 var token = "io-gluk@fct%vusb";
 $email_den = localStorage.getItem("usuario");

var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/S_cancelar_recibidas",
            data: {
                    usuarioe: $email_den,
                    usuarios: usuarioSoliD,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
          
           request.success(function (response) {



              alertify.logPosition("top right");
              alertify.error(response.msg); 
              $ionicHistory.nextViewOptions({
              disableBack: true
               });
              console.log(response);
              $state.go('solicitudes'); 


            }); 
}

  $scope.Asolicitud = function (Asolicitu) {


console.log(Asolicitu);
var usuarioSoliA = Asolicitu;
 var token = "io-gluk@fct%vusb";
 $email_acep = localStorage.getItem("usuario");

var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/S_aceptar_recibidas",
            data: {
                    usuarioe: $email_acep,
                    usuarios: usuarioSoliA,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
          
           request.success(function (response) {



              alertify.logPosition("top right");
              alertify.success(response.msg); 
              $ionicHistory.nextViewOptions({
              disableBack: true
               });
              console.log(response);
              $state.go('solicitudes'); 


            }); 
}






})

.controller('perfil', function($scope,$http){

  var idC = localStorage.getItem("View_id_contac");
console.log(idC);
   var token = "io-gluk@fct%vusb";


   var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/getUser",
            data: {
                    email: idC,
                    token:token

                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            request.success(function (response) {

              $scope.ver_user = response;

              console.log(response);

            }); 

 


})
 
.controller('StreamController' ,function ($interval, appSettings, streamService){

  var isPlaying = false;
  var stream;
  var timer;


  

 
 

   var audioStream = appSettings.getSettings().audioStream;
    var hasAudioStreamMeta = appSettings.getSettings().hasAudioStreamMeta;
    var vm = angular.extend(this, {
      togglePlay: togglePlay,
      isPlaying: isPlaying,
      info: null
    });

    // ********************************************************************

    function togglePlay() {
      if (vm.isPlaying) {
        pause();
      } else {
        play();
      }

      vm.isPlaying = isPlaying = !isPlaying;
    }

    function play() {
      if (window.Stream) {
        stream = new window.Stream(audioStream);
        // Play audio
        stream.play();
      }

      getStreamInfo();
      timer = $interval(function() {
        getStreamInfo();
      }, 5000);
    }

    function pause() {
      vm.info = null;
      $interval.cancel(timer);

      if (!stream) {
        return;
      }

      stream.stop();
    }

    function getStreamInfo() {
      streamService.getStreamInfo().then(function(info) {
        vm.info = info;
      }, function() {
        vm.info = null;
      });
    }
  
  


})

  

 

// SettingCtrl controller
.controller('SettingCtrl', function($scope){

})

// AcercaCtrl controller
.controller('AcercaCtrl', function($scope){

})
