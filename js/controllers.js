
angular.module('starter.controllers', [])

.controller('login', function($scope,$ionicPopup,$http,$state,$location,$templateCache,$ionicHistory,alertify,$rootScope,$ionicPlatform, $ionicHistory,$ionicPlatform,$cordovaPush){
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

    var androidConfig = {
 "senderID": "217743739524"
 };

 var idtel = "";


  $cordovaPush.register(androidConfig).then(function(result) {
      // Success
    }, function(err) {
      // Error
    }
    )

  $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {

    //alert(notification.event);
    switch(notification.event) {
      case 'registered':
        if (notification.regid.length > 0 ) {
          //alert('registration ID = ' + notification.regid);
          idtel = notification.regid;
          alert("Id Run " + idtel );
        }
        break;

    }
  });

  
      
   alert(" Id Login " + idtel);


    $scope.login = function() {
      //alert(idtel);
      $email = $scope.usuario_l;
      $clave = $scope.clave_l;
      var token = "io-gluk@fct%vusb";

          var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/login",
            data: {
                    email: $email,
                    pass: $clave,
                    idt: idtel,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {

        

              if(data.entro == 1)
              {
                localStorage.setItem("usuario", $email);
                localStorage.setItem("prueba", 0);
                 $templateCache.removeAll();
                 $ionicHistory.nextViewOptions({
                disableBack: true
              });
              
              localStorage.setItem("nombre_user", data.name);
              localStorage.setItem("imagen_user", data.foto);

              document.getElementById("nombre_usuario").innerHTML =localStorage.getItem("nombre_user");
              document.getElementById("img_usuario").src = localStorage.getItem("imagen_user");

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

.controller('AuthCtrl', function($scope, nom_img, $location, $ionicHistory, $ionicSideMenuDelegate, $state, $ionicPopup,$http,$templateCache,$rootScope) {
  // hide back butotn in next view
  $ionicHistory.nextViewOptions({
    disableBack: true
  });

    document.getElementById("nombre_usuario").innerHTML =localStorage.getItem("nombre_user");
    document.getElementById("img_usuario").src = nom_img;


  $scope.data ={};
 

    $scope.login_q = function() {

       $email_s = localStorage.getItem("usuario");

         var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/salir",
            data: {
                    email: $email_s
                 
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            request.success(function (response) {

              window.localStorage.clear();
              $ionicHistory.clearCache().then(function() {
            //now you can clear history or goto another state if you need
             $ionicHistory.clearHistory();
             $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
             $state.go('login');
                 })

             
                });

              

    }


})

.controller('HomeCtrl', function($scope, nom_img, Posts, $state, $ionicHistory,$templateCache,$http,$ionicPlatform) {

document.getElementById("nombre_usuario").innerHTML =localStorage.getItem("nombre_user");
document.getElementById("img_usuario").src = nom_img;




  $templateCache.removeAll();
 

  $scope.pruebaC = function () {

  $email_p = localStorage.getItem("usuario");
 
   var token = "io-gluk@fct%vusb";



 }

  
  $email_d = localStorage.getItem("usuario");
 
   var token = "io-gluk@fct%vusb";
   var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/getUser",
            data: {
                    email: $email_d,
                    token:token

                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            request.success(function (response) {

              $scope.user = response;


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


    
      

  // get list posts froms service
  $scope.posts = Posts.all();


$scope.viewPost = function(postId) {


  localStorage.setItem("View_id_noticia", postId);
 
  /*  $state.go('post'); */

    $state.go('post', {postId: postId});
}
   
  // view user



})

// Chat controller, view list chats and chat detail
.controller('ChatCtrl', function($scope, Chats,$http,$state,id_serve,nom_img, $ionicHistory) {


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

  
document.getElementById("nombre_usuario").innerHTML =localStorage.getItem("nombre_user");
document.getElementById("img_usuario").src = nom_img;

var cont = 0;
var servicio = id_serve;
var chat1;
$scope.Dchat = function() {

var usuario = localStorage.getItem("usuario");

$http.get('http://adminenri.sigtics.org/chat/ListarChat?usuario='+usuario).
      then(function(response) {
       // $scope.$apply(function() {
         $scope.chats = response.data;
         chat1 = response.data;
      

        for (var i = 0 ; i < chat1.length ; i++) {

            //console.log(i);

        
           
            if (chat1[i].total > 0){



                cont = parseFloat(chat1[i].total) + cont;


               // for (var x = 0 ; x < chat1[i].total ; x++) {

                
                  /*

                  var audio = {};
      
                  audio["walk"] = new Audio();
                  audio["walk"].src = "sounds/t3.mp3";
                  audio["walk"].play();
                  console.log(audio);

                  */
                  /*
                  var src = "sounds/t3.mp3";
                  $scope.audio = ngAudio.load(src); // returns NgAudioObject
                  console.log($scope.audio);
                  $scope.audio.play();*/



                  //mensaje de los push
                 // console.log(chat1[i].push.mensaje);
                  //Usuario
                 // console.log(chat1[i].name);

                 
             //   }



            }


         
        }


     

     if (cont > 0 )
     {
       document.getElementById("chatLey").innerHTML = cont;
       cont = 0;
     }
     else
     {
      document.getElementById("chatLey").innerHTML = "";
     }
    

})



    }

$scope.Dchat();



 var socket = io.connect( 'http://adminenri.sigtics.org:'+servicio);


socket.on( 'new_message', function( data ) {

     $scope.Dchat();
  
  });



 $scope.canal=function() {
            
    $state.go('chat-canal');
  };


  $scope.viewChat = function(chatId) {


  localStorage.setItem("View_id_chat", chatId);
  /*  $state.go('post'); */

  $state.go('chat-detail');
}



  // remove a conversation
  $scope.remove = function(chat) {


      var idf = chat.split("-");

      if(idf[1])
      { 

        var usuario2 = localStorage.getItem("usuario");
     
        var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/chat/SalirGrupo",
                data: {
                    usuario:usuario2,
                    id_chat:idf[1]
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
          request.success(function (data) {

                 $scope.Dchat();
             }); 




      }
      else
      {


        var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/chat/SalirChat",
                data: {
                    id_chat:idf[0]
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
          request.success(function (data) {

                 $scope.Dchat();
             }); 
 
      }



  };

 
})

.controller('ChatDetailCtrl', function($scope,$upload,$ionicHistory, $stateParams, Chats, $ionicScrollDelegate, $ionicActionSheet, $timeout, $http,$state,id_serve,$ionicPopup, $ionicHistory,$rootScope,$cordovaPush) {


$scope.ftoChat = function(foto) {


  var foto1 = foto;
  $scope.cssClass = "cssClass"

  $foto = " <img src='"+foto1+"'   /> ";



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
        url: 'http://adminenri.sigtics.org/chat/FotoChat',
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
       
        });
            var socket = io.connect( 'http://adminenri.sigtics.org:'+servicio);

                 socket.emit('new_message', { 
                 
                 

                });

            

               localStorage.setItem("View_id_chat", response.data.id_chat);
               var id_chat1 = localStorage.getItem("View_id_chat");
             
                $scope.chat1(false);

      }); 
    }
  }




$scope.clickUpload1 = function(){

   ionic.trigger('click', { target: document.getElementById('i_file1') });


   }



$scope.chat1 = function(s) {





  var usuario = localStorage.getItem("usuario");
   var id_chat = localStorage.getItem("View_id_chat");
   var id_user2 = localStorage.getItem("user_id_chat");
   
 
       var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/chat/DetallesChat",
                data: {
                    usuario:usuario,
                    id_chat:id_chat,
                    id_user2:id_user2,
                    socket: s
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
          request.success(function (data) {

            
              $scope.chat = data;
           

               $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
             var socket = io.connect( 'http://adminenri.sigtics.org:'+servicio);

                

             }); 
 }

   

    $scope.chat1();

  


var socket = io.connect( 'http://adminenri.sigtics.org:'+servicio);



    socket.on( 'new_message', function( data ) {


     $scope.chat1(false);
  
  });


  $scope.viwPerfilU = function(idU) {

     

      var idf = idU.split("-");
      if(idf[1])
      {
    
        localStorage.setItem("Chat_G", idf[1]);
        $state.go('info_chat');

      }
      else
      {
      
        localStorage.setItem("View_id_contac", idf[0]);
    
        $state.go('edit_perfil');
      }

   

  }
  
/*
  $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
     alert(notification.event);
    switch(notification.event) {

        case 'message':
          alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
          break;

        case 'error':
          alert('GCM error = ' + notification.msg);
          break;
    }
  });
*/


  $scope.sendMessage = function() {

    var message =  $scope.input.message;
     var id_chat = localStorage.getItem("View_id_chat");
     var usuario = localStorage.getItem("usuario");
       var id_user2 = localStorage.getItem("user_id_chat");


    var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/chat/InsertarChat",
                data: {
                    message:message,
                    id_chat:id_chat,
                    usuario:usuario,
                    id_user2:id_user2
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
          request.success(function (data) {
             

              var message = {
              type: data.tipo,
             time: 'Just now',
             text: data.mensaje
                  };


                  

                  $scope.chat1(false);

             

         var socket = io.connect( 'http://adminenri.sigtics.org:'+servicio );

           

                 socket.emit('new_message', { 
                  mensaje: data.mensaje,
                  id_chat: data.id_chat,
                  tipo: data.tipo

                });

          

               localStorage.setItem("View_id_chat", data.id_chat);
               var id_chat1 = localStorage.getItem("View_id_chat");
           
        
 
              
             }); 



   
   
    $scope.input.message = '';

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
             

               var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/chat/EliminarMensaje",
                data: {
                    mensaje_id:idm

                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             }); 
           
              request.success(function (data) {

            
              //$scope.chat = data;
            
              $scope.chat1();


                  });

             

            break;
        }

        return true;
      }
    });
  };





})




.controller('PostCtrl', function($scope, Posts, $state,$http,nom_img, $ionicHistory) {

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
  

document.getElementById("nombre_usuario").innerHTML =localStorage.getItem("nombre_user");
document.getElementById("img_usuario").src = nom_img;
 
  $scope.post = Posts.get(0);

 
})


.controller('ContactsCtrl', function($scope, Contacts, $state,$http,alertify,nom_img, $ionicHistory) {


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
 
document.getElementById("nombre_usuario").innerHTML =localStorage.getItem("nombre_user");
document.getElementById("img_usuario").src = nom_img;
      

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

$usuarioG = localStorage.getItem("usuario");

  var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/chat/crearGrupo",
                data: {
                    usuario: $usuarioG,
                    contactos: contactos,
                    asunto: asunto
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
                request.success(function (data) {
                $state.go('chats');
            
                
              
             }); 

}

$scope.Agregar_mas = function() {

  if ($scope.cont.length<1) {
  alertify.logPosition("top right");
  alertify.error('Seleccione Almenos un contacto ');
  return;
  };


  var contactos = $scope.cont;

//localStorage.setItem("Chat_G", idf[1]);
var Id_Gr = localStorage.getItem("Chat_G");

alertify.logPosition("top right");
alertify.success('Agregando Usuarios, Espere por favor');


  var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/chat/AgregarUsuarioGrupo",
                data: {
                    id_grupo:  Id_Gr,
                    contactos: contactos
 
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
                request.success(function (data) {
                $state.go('info_chat');
                alertify.logPosition("top right");
alertify.success('Usuarios Agregados');
            
              
              
             }); 






}





$scope.ccon = function(){

  $usuarioC = localStorage.getItem("usuario");

  var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/movil_funciones/listarUsuario",
                data: {
                    usuario: $usuarioC 
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
          request.success(function (data) {

            
              $scope.contacts = data;
              $scope.list = $scope.contacts ;
        
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
 
    var token = "io-gluk@fct%vusb";


   var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/eliminarContacto",
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
                  
               
          

            }); 

}

})



// UserCtrl controller
.controller('UserCtrl', function($scope, Contacts, nom_img, Posts, $stateParams, $http,$ionicPopup,$ionicHistory, $state,$timeout,$upload,alertify) {
  // get contact from Contacts service
  // set the userId here
  $ionicHistory.nextViewOptions({
    disableBack: true
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
  $email_d = localStorage.getItem("usuario");
  var token = "io-gluk@fct%vusb";

document.getElementById("nombre_usuario").innerHTML =localStorage.getItem("nombre_user");
document.getElementById("img_usuario").src = nom_img;
  

  $scope.clickUpload = function(){
    document.getElementById("i_file").trigger('click');
}
  
  //console.log($email_d);
    var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/getUser",
            data: {
                    email: $email_d,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (response) {

              $scope.user = response;

            

            });


   

     $scope.actualizar = function () {

      $nombre = document.getElementById("nombre_u").value;
      $estado = document.getElementById("estado_u").value;
      
      localStorage.setItem("nombre_user", $nombre);

    var token = "io-gluk@fct%vusb";
    $email_ac = localStorage.getItem("usuario");

            var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/movil_funciones/datos_personales",
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
            url: "http://adminenri.sigtics.org/movil_funciones/getUser",
            data: {
                    email: email,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });

  request.success(function (data) {
 
    $scope.img = data.img
    localStorage.setItem("imagen_user", response.data.img);
    document.getElementById("img_usuario").src = localStorage.getItem("imagen_user");

  })

   $scope.uploadResult = [];
   $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
     alertify.logPosition("top right");
      alertify.success("Actualizando foto , Espere un momento");
    for (var i = 0; i < $files.length; i++) {
      var $file = $files[i];
      $upload.upload({
        url: 'http://adminenri.sigtics.org/movil_funciones/fotoPerfil',
        data: {id: email,
               token: token},
        file: $file,
        progress: function(e){
         
        }
      }).then(function(response) {
        // file is uploaded successfully
        localStorage.setItem("imagen_user", response.data.img);
              document.getElementById("img_usuario").src = localStorage.getItem("imagen_user");

       $timeout(function() {

         $state.go('user');
          $scope.uploadResult.push(response.data);
         
          localStorage.setItem("imagen_user", response.data.img);
              document.getElementById("img_usuario").src = localStorage.getItem("imagen_user");
        });

      }); 
    }
  }
   $scope.clickUpload = function(){

    ionic.trigger('click', { target: document.getElementById('i_file') });
   }


})

 
                
                
              

 


.controller('restaurar', function($scope,$ionicPopup,$http,$state,$location,$templateCache,$ionicHistory,alertify){

  $ionicHistory.nextViewOptions({
    disableBack: true
  });


  $scope.restaurar = function() {

  
    $email_res = $scope.usuario_res
    var token = "io-gluk@fct%vusb";

    var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/restaurar",
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


.controller('menu_perfil', function($scope,$ionicPopup,$http,$state,$location,$templateCache,alertify, $ionicHistory){

  

 

$email_d = localStorage.getItem("usuario");
 
   var token = "io-gluk@fct%vusb";
   var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/getUser",
            data: {
                    email: $email_d,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (response) {

              $scope.user = response;

            

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
                url: "http://adminenri.sigtics.org/movil_funciones/registrar",
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
  $scope.cambiar = function () {

    var token = "io-gluk@fct%vusb";
    $email_c = localStorage.getItem("usuario");
    console.log($email_c);

            var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/movil_funciones/c_clave",
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

           

                }
            });
    }

})

// Agregar Contactos

.controller('agrgarC', function($scope,$ionicPopup,$http,$state,$location,$templateCache,$ionicHistory,id_serve,alertify){
var servicio = id_serve;
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
  $scope.cClave = function () {

    var token = "io-gluk@fct%vusb";
    var usuario = $scope.usuarioA;
    $email_con = localStorage.getItem("usuario");
    var tipoU = $scope.tipoU;

    
   
 
            var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/movil_funciones/Ausuario",
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
             
            var socket = io.connect( 'http://adminenri.sigtics.org:'+servicio);
              socket.emit('new_contact', { 
                  usuario: usuario,
                  usuario_id: $email_con,
                  tipoU: tipoU

                });

              $state.go('contacts'); 


             }

              

             
            }); 
    }

})



// Solicitudes Enviadas
.controller('Senviadas', function($scope,$http,alertify,id_serve,$ionicHistory,$state){
  var servicio = id_serve;
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

$scope.solev = function(){

    $email_en = localStorage.getItem("usuario");
   
      var token = "io-gluk@fct%vusb";
     
      var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/S_enviadas",
            data: {
                    email: $email_en,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
        
          request.success(function (response) {

              $scope.soli = response;




            });

          }


$scope.solev();

  var socket = io.connect( 'http://adminenri.sigtics.org:'+servicio);

    socket.on( 'new_contact', function( data ) {

    $scope.solev();
  
  });




$scope.Csolicitud = function (Csolicitu) {



var usuarioSoli = Csolicitu;
 var token = "io-gluk@fct%vusb";
 $email_can = localStorage.getItem("usuario");

var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/S_cancelar",
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
              var socket = io.connect( 'http://adminenri.sigtics.org:'+servicio);
              socket.on( 'new_contact', function( data ) {

                    $scope.solev();
               });
             
              $state.go('solicitudes'); 


            }); 
}


})

// SettingCtrl controller
.controller('Senrecibidas', function($scope,$http,alertify,$ionicHistory,id_serve,$state){
var servicio = id_serve;
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

$scope.solrec = function (){

  $email_rec = localStorage.getItem("usuario");
  
   var token = "io-gluk@fct%vusb";
   
  var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/S_recibidas",
            data: {
                    email: $email_rec,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
        
          request.success(function (response) {

              $scope.reci = response;



            }); 

}


  $scope.solrec();

  var socket = io.connect( 'http://adminenri.sigtics.org:'+servicio);

    socket.on( 'new_contact', function( data ) {


     $scope.solrec();
  
  });

  $scope.Dsolicitud = function (Dsolicitu) {



var usuarioSoliD = Dsolicitu;
 var token = "io-gluk@fct%vusb";
 $email_den = localStorage.getItem("usuario");

var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/S_cancelar_recibidas",
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

               var socket = io.connect( 'http://adminenri.sigtics.org:'+servicio);

              socket.on( 'new_contact', function( data ) {


                $scope.solrec();
  
              });
              $state.go('solicitudes'); 


            }); 
}

  $scope.Asolicitud = function (Asolicitu) {


var usuarioSoliA = Asolicitu;
 var token = "io-gluk@fct%vusb";
 $email_acep = localStorage.getItem("usuario");

var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/S_aceptar_recibidas",
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

               var socket = io.connect( 'http://adminenri.sigtics.org:'+servicio);

              socket.on( 'new_contact', function( data ) {


                $scope.solrec();
  
              });

              $state.go('solicitudes'); 


            }); 
}






})

.controller('perfil', function($scope,$http, $ionicHistory){

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

  var idC = localStorage.getItem("View_id_contac");

  
   var token = "io-gluk@fct%vusb";


   var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/getUser",
            data: {
                    email: idC,
                    token:token

                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            request.success(function (response) {

              $scope.ver_user = response;


            }); 

 


})
 
.controller('StreamController' ,function($scope,$http,$interval, $ionicHistory){

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
  

$scope.songs = [
            {
                id: 'juv',
                title: 'Mario En Tu Radio Juvenil',
                artist: 'Mario',
                url: 'http://5.199.169.190:8221/;stream.mp3',
                play:'play'
            },{
                id: 'sal',
                title: 'Mario En Tu Radio Salsa',
                artist: 'Mario',
                url: 'http://5.199.169.190:8036/;stream.mp3',
                play:'play'
            }
            
        ];





})



.controller('info_chat', function($scope,$http,$state){

  var ChatGrupo = localStorage.getItem("Chat_G");


  var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/chat/DetallesGrupo",
                data: {
                    id_grupo:ChatGrupo
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
          request.success(function (data) {

            
              $scope.D_Grupo = data;
              
                
        

              
             }); 



  $scope.viewFoto1 = function (id_g){


    localStorage.setItem("grupo_id", id_g);
    $state.go('foto_grupo');

  }

  $scope.agregar = function (id_au){


     var usuario = localStorage.getItem("usuario");
     var token = "io-gluk@fct%vusb";
     var id_contac = id_au;
     var tipoU = 1;



            var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/movil_funciones/Ausuario",
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


  var token = "io-gluk@fct%vusb";
  var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/chat/FotoGrupo",
            data: {
                    id: grupo_id,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });

  request.success(function (data) {

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
        url: 'http://adminenri.sigtics.org/chat/UploadFotoGrupo',
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

        });


      }); 
    }
  }
   $scope.clickUpload = function(){

    ionic.trigger('click', { target: document.getElementById('i_file') });
   }


})

.controller('chat-canal', function($scope,$http,$ionicHistory,alertify,$upload, $timeout,$state,$ionicScrollDelegate){

var s = 1;
       var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/chat/DetallesCanal",
                data: {
                    usuario: s
            
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
          request.success(function (data) {

              $scope.canalM = data.messages;
              $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();

                 
             }); 




         $scope.atras = function (){


         $ionicHistory.clearHistory();
       $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
        $state.go('chats');
     }


})


.controller('inicioC', function($scope,$http,$state,$ionicPopup, nom_img, $ionicHistory){
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

document.getElementById("nombre_usuario").innerHTML =localStorage.getItem("nombre_user");
document.getElementById("img_usuario").src = nom_img;


  $http.get('http://adminenri.sigtics.org/movil_funciones/aceptar').
      then(function(response) {
       // $scope.$apply(function() {
           // localStorage.setItem("server", response.data.socket);

            //$server = localStorage.getItem("server");
           $scope.timeline = response.data;

           
      //  })
        
     })


     $scope.ftoini = function(dimg)
     {
     
      var foto2 = dimg;

        $scope.cssClass = "cssClass"

        $foto1 = " <img src='"+foto2+"'   /> ";
  


          var myPopup = $ionicPopup.show({
            template:$foto1,
           buttons: [
            { 
              text: 'Cerrar',
              type: 'button-positive'
           }      
         ]
        })
     }


})
.controller('SettingCtrl', function($scope){

})
// AcercaCtrl controller
.controller('AcercaCtrl', function($scope){

})
