
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
.controller('ChatCtrl', function($scope, Chats,$http,$state,id_serve) {
 /* $scope.chats = Chats.all();
  console.log ($scope.chats);*/
/*
  var usuario = localStorage.getItem("usuario");
 var chats;
$http.get('http://radio.sigtics.org/chat/ListarChat?usuario='+usuario).
      then(function(response) {
       // $scope.$apply(function() {
       

         $scope.chats = response.data;
         console.log($scope.chats);


        
           
        }) */


var servicio = id_serve;


$scope.Dchat = function() {

var usuario = localStorage.getItem("usuario");
var chats;
$http.get('http://radio.sigtics.org/chat/ListarChat?usuario='+usuario).
      then(function(response) {
       // $scope.$apply(function() {
         $scope.chats = response.data;
         console.log($scope.chats);

})
    }

$scope.Dchat();

 var socket = io.connect( 'http://sigtics.org:'+servicio);

console.log(io.connect( 'http://sigtics.org:'+servicio));
socket.on( 'new_message', function( data ) {
/*
    console.log(data);

    var message = {
      type: data.tipo,
      time: 'Just now',
      text: data.mensaje
    };
    $scope.input.message = '';
    // push to massages list
    $scope.chat.messages.push(message);
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
*/
    console.log ("detchat");

     $scope.Dchat();
  
  });




 


  $scope.viewChat = function(chatId) {

console.log(chatId);
  localStorage.setItem("View_id_chat", chatId);
  /*  $state.go('post'); */

  $state.go('chat-detail');
}



  // remove a conversation
  $scope.remove = function(chat) {
    console.log(chat);
    //Chats.remove(chat);
  };

  // mute a conversation
  $scope.mute = function(chat) {
    // write your code here
  }
})

.controller('ChatDetailCtrl', function($scope,$upload,$ionicHistory, $stateParams, Chats, $ionicScrollDelegate, $ionicActionSheet, $timeout, $http,$state,id_serve,$ionicPopup) {
  //$scope.chat = Chats.get($stateParams.chatId);
     //$scope.chat = Chats.get(0);
 


   /*var datos = id_chat + '-' + usuario ;

   $http.get('php/detalle_chat.php?datos='+datos).
      success(function(response) {
       // $scope.$apply(function() {
       
         $scope.chats1 = response;
         console.log($scope.chats1);
          return $scope.chats1
           
      //  })
        
     })*/

$scope.ftoChat = function(foto) {

  console.log(foto);
  var foto1 = foto;
  $scope.cssClass = "cssClass"

  $foto = " <img src='"+foto1+"'   /> ";
  console.log($foto);


  var myPopup = $ionicPopup.show({
    template:$foto,
    buttons: [
       { 
        text: 'Cerrar',
        type: 'button-positive'
       }      
    ]
  })





}



var servicio = id_serve;

     $scope.atras = function (){


         $ionicHistory.clearHistory();
       $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
        $state.go('chats');

     }

$scope.uploadResult = [];
   $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
     alertify.logPosition("top right");
      alertify.success("Enviando Archivo");

        var id_chat1 = localStorage.getItem("View_id_chat");
        var usuario1 = localStorage.getItem("usuario");
        var id_user21 = localStorage.getItem("user_id_chat");
        var token = "io-gluk@fct%vusb";
    for (var i = 0; i < $files.length; i++) {
      var $file = $files[i];
      $upload.upload({
        url: 'http://radio.sigtics.org/chat/FotoChat',
        data: {
                    id_chat:id_chat1,
                    usuario:usuario1,
                    id_user2:id_user21,
                    token:token
             },
        file: $file,
        progress: function(e){
         
        }
      }).then(function(response) {
        // file is uploaded successfully
           
       $timeout(function() {
          
          $scope.uploadResult.push(response.data);
          console.log($scope.uploadResult);
        });
            var socket = io.connect( 'http://sigtics.org:'+servicio);

                 socket.emit('new_message', { 
                 
                 

                });

              console.log(response.data);

               localStorage.setItem("View_id_chat", response.data.id_chat);
               var id_chat1 = localStorage.getItem("View_id_chat");
               console.log(id_chat1);

      }); 
    }
  }




$scope.clickUpload1 = function(){

   ionic.trigger('click', { target: document.getElementById('i_file1') });
   console.log("click");

   }



$scope.chat1 = function() {





  var usuario = localStorage.getItem("usuario");
   var id_chat = localStorage.getItem("View_id_chat");
   var id_user2 = localStorage.getItem("user_id_chat");
   
 




       var request = $http({
                method: "post",
                url: "http://radio.sigtics.org/chat/DetallesChat",
                data: {
                    usuario:usuario,
                    id_chat:id_chat,
                    id_user2:id_user2
                    
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
          request.success(function (data) {

            
              $scope.chat = data;
              console.log( $scope.chat);

               $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
             var socket = io.connect( 'http://sigtics.org:'+servicio);

                
           
              console.log($scope.chat);
                 
             }); 
 }

   

    $scope.chat1();

  


var socket = io.connect( 'http://sigtics.org:'+servicio);



    socket.on( 'new_message', function( data ) {
/*
    console.log(data);

    var message = {
      type: data.tipo,
      time: 'Just now',
      text: data.mensaje
    };
    $scope.input.message = '';
    // push to massages list
    $scope.chat.messages.push(message);
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
*/
    console.log ("hvsss");

     $scope.chat1();
  
  });


  $scope.viwPerfilU = function(idU) {

     

      var idf = idU.split("-");
      if(idf[1])
      {
        console.log("Grupo");
        localStorage.setItem("Chat_G", idf[1]);
        $state.go('info_chat');
      }
      else
      {
        console.log("Persona");
        localStorage.setItem("View_id_contac", idf[0]);
        console.log(idf[0]);
        $state.go('edit_perfil');
      }
 


     // localStorage.setItem("View_id_contac", idU);
      //$state.go('edit_perfil');
   

  }





  $scope.sendMessage = function() {

    var message =  $scope.input.message;
     var id_chat = localStorage.getItem("View_id_chat");
     var usuario = localStorage.getItem("usuario");
       var id_user2 = localStorage.getItem("user_id_chat");


    var request = $http({
                method: "post",
                url: "http://radio.sigtics.org/chat/InsertarChat",
                data: {
                    message:message,
                    id_chat:id_chat,
                    usuario:usuario,
                    id_user2:id_user2
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
          request.success(function (data) {
              console.log("devuelve");
            
              //$scope.chat = data;
              console.log(data);

              var message = {
              type: data.tipo,
             time: 'Just now',
             text: data.mensaje
                  };


                  

                  

             

         var socket = io.connect( 'http://sigtics.org:'+servicio );

           

                 socket.emit('new_message', { 
                  mensaje: data.mensaje,
                  id_chat: data.id_chat,
                  tipo: data.tipo

                });

              console.log(data);

               localStorage.setItem("View_id_chat", data.id_chat);
               var id_chat1 = localStorage.getItem("View_id_chat");
               console.log(id_chat1);
        
 
              
             }); 



   
    console.log(message);
    $scope.input.message = '';

    // push to massages list


   // $scope.chat.messages.push(message);

   // $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
  };

  $scope.openFileDialog=function() {
            console.log('fire! $scope.openFileDialog()');
            ionic.trigger('click', { target: document.getElementById('file') });
        };

  // hover menu
  $scope.onMessageHold = function(e, itemIndex, message , id_msg) {
    // show hover menu
    $ionicActionSheet.show({
      buttons: [
       {
          text: 'Eliminar Mensage',
          type: 'button-assertive'
        }
      ],
      buttonClicked: function(index) {
        switch (index) {
          case 0: // ELiminar Mensage
            //cordova.plugins.clipboard.copy(message.text);
             
              var idm = message.id;
              console.log(idm);

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
 
      

$scope.cont=[];

$scope.crearGrupo = function (ej) {

var e = true;
for (var i = 0; i < $scope.cont.length; i++) {
    if ($scope.cont[i]==ej) {
      $scope.cont.splice(i, 1);
      e=false;
    }
}
if (e) {$scope.cont.push(ej);}
}

$scope.InsertarGrupo = function() {
 
var asunto = document.getElementById('asunto').value;
if (asunto==="") {
alertify.logPosition("top right");
alertify.error('Ingrese asunto');
return;

};

if ($scope.cont.length<=1) {
alertify.logPosition("top right");
alertify.error('Seleccione mas de 1 contacto');
return;

};

if ($scope.cont.length>=25) {
alertify.logPosition("top right");
alertify.error('Seleccione menos de 25 contactos para iniciar');
return;
};

var contactos = $scope.cont;
console.log($scope.cont);
$usuarioG = localStorage.getItem("usuario");

  var request = $http({
                method: "post",
                url: "http://radio.sigtics.org/chat/crearGrupo",
                data: {
                    usuario: $usuarioG,
                    contactos: contactos,
                    asunto: asunto
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
                request.success(function (data) {
                $state.go('chats');
            
                console.log(data);
              
             }); 

}



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
              $scope.list = $scope.contacts ;
              
              console.log($scope.contacts);
              console.log($scope.list);
              return $scope.list
              
             }); 
}



  
$scope.ccon();


$scope.viewChat1 = function(ID_cont) {
  localStorage.setItem("View_id_chat", 0);
  localStorage.setItem("user_id_chat", ID_cont);
  console.log(ID_cont);
  /*  $state.go('post'); */
  $state.go('chat-detail');
}







 

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

              console.log($scope.ver_user);

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
.controller('prueba', function($scope,$http){

  var usuario = localStorage.getItem("usuario");
   var id_chat = localStorage.getItem("View_id_chat");

   var request = $http({
                method: "post",
                url: "php/detalle_chat.php",
                data: {
                    usuario:usuario,
                    id_chat:id_chat
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
          request.success(function (data) {

            
              $scope.chat = data;
              
              console.log(data);
        

              
             }); 

})

.controller('info_chat', function($scope,$http,$state){

  var ChatGrupo = localStorage.getItem("Chat_G");
  console.log(ChatGrupo);

  var request = $http({
                method: "post",
                url: "http://radio.sigtics.org/chat/DetallesGrupo",
                data: {
                    id_grupo:ChatGrupo
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
          request.success(function (data) {

            
              $scope.D_Grupo = data;
              
                console.log(data);
        

              
             }); 



  $scope.viewFoto1 = function (id_g){
    console.log(id_g);

    localStorage.setItem("grupo_id", id_g);
    $state.go('foto_grupo');

  }

  $scope.agregar = function (id_au){
     console.log(id_au);

     var usuario = localStorage.getItem("usuario");
     var token = "io-gluk@fct%vusb";
     var id_contac = id_au;
     var tipoU = 1;



            var request = $http({
                method: "post",
                url: "http://radio.sigtics.org/movil_funciones/Ausuario",
                data: {
                    usuario: usuario,
                    usuario_id: id_contac,
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



.controller('foto_grupo', function($scope,$http,$ionicHistory,alertify,$upload, $timeout,$state){


$ionicHistory.nextViewOptions({
    disableBack: true
  });
  var grupo_id = localStorage.getItem("grupo_id");
  console.log(grupo_id);

  var token = "io-gluk@fct%vusb";
  var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/chat/FotoGrupo",
            data: {
                    id: grupo_id,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });

  request.success(function (data) {
    console.log(data);
    $scope.img1 = data;

  })


   $scope.uploadResult = [];
   $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
     alertify.logPosition("top right");
      alertify.success("Actualizando foto , Espere un momento");
    for (var i = 0; i < $files.length; i++) {
      var $file = $files[i];
      $upload.upload({
        url: 'http://radio.sigtics.org/chat/UploadFotoGrupo',
        data: {id: grupo_id,
               token: token},
        file: $file,
        progress: function(e){
         
        }
      }).then(function(response) {
        // file is uploaded successfully
           
       $timeout(function() {
         $state.go('info_chat');
          $scope.uploadResult.push(response.data);
          console.log($scope.uploadResult);
        });

       console.log(response);

      }); 
    }
  }
   $scope.clickUpload = function(){

    ionic.trigger('click', { target: document.getElementById('i_file') });
   }


})

.controller('SettingCtrl', function($scope){

})
// AcercaCtrl controller
.controller('AcercaCtrl', function($scope){

})
