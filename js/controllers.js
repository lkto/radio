angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})



.controller('login', function($scope,$http,$state,$location,$rootScope,$ionicPlatform,alertify){

    if(localStorage.getItem("usuario"))
    {
      console.log("k");
     
       //$location.url("tab.all");


      $state.go('tab.group');
    }

    $scope.login = function() {
      //alert(idtel);
      $email = document.getElementById("user").value;
      $clave = document.getElementById("clave").value;
      console.log($email);
      console.log($clave);


     if ($email == ""  ){
      
        alertify.logPosition("top right");
        alertify.error("Ingresar el email o nombre de usuario");

      }else if ($clave == ""  ){

        alertify.logPosition("top right");
        alertify.error("Ingresar una contraseña");

      }else{


      var token = "io-gluk@fct%vusb";

          var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/login",
            data: {
                    email: $email,
                    pass: $clave,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {

              console.log(data);
            
              if(data.entro == 1)
              {
                localStorage.setItem("usuario", $email);
              

                 $state.go('tab.all');
              }
              else
              {
                console.log("aa");
                

                 alertify.logPosition("top right");
                 alertify.error("Datos Incorrectos"); 

              }
              
             

            });

          }
        }

})


.controller('NoticeCtr', function($scope,$http,$state,$rootScope ) {

  if(localStorage.getItem("usuario"))
    {
       
    }
    else
    {
      $state.go('/login');
    }

    var idtel1 = localStorage.getItem("prueba");
    var us = localStorage.getItem("usuario");

    var request = $http({
                  method: "post",
                    url: "http://adminenri.sigtics.org/movil_funciones/RegidId",
                    data: {
                      idt: idtel1,
                      usuario: us
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });

              request.success(function (data) {

              //alert(data);

               })


     $scope.notici = function(){

        $http.get('http://adminenri.sigtics.org/movil_funciones/getNoticias').
           then(function successCallback(response) {
              // $scope.$apply(function() {
                  $rootScope.posts = response.data;
                  $scope.not_error ="";
             //console.log($scope.posts);
          
     },function errorCallback(response) {

           $scope.not_error = [
                {
                text: 'Error al cargar datos actualizar',
                img: 'background-image:url(img/error3.png);background-repeat: no-repeat;background-position-x: 65px;background-position-y: 20px;'
                }
            
                ]

     }) 

     }
     $scope.notici();

  

  $scope.viewPost = function(postId){
      
      localStorage.setItem("View_id_noticia", postId);
      $state.go('noticias');
  }
  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('Noti-detailCtr', function($scope,$http,$state) {

    var id_post = localStorage.getItem("View_id_noticia");
  //sconsole.log(id_post);

  var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/movil_funciones/GetNotice",
                data: {
                    id_post:id_post,
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
          request.success(function (data) {

            
              $scope.post = data[0];

              //console.log($scope.post);
           

             }); 



  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('ContacCtr', function($scope,$http,$state,alertify) {
  if(localStorage.getItem("usuario"))
    {
       
    }
    else
    {
      $state.go('/login');
    }


    var idtel1 = localStorage.getItem("prueba");
    var us = localStorage.getItem("usuario");

    var request = $http({
                  method: "post",
                    url: "http://adminenri.sigtics.org/movil_funciones/RegidId",
                    data: {
                      idt: idtel1,
                      usuario: us
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });

              request.success(function (data) {

              //alert(data);

               })

    $scope.closemodal_usuario();

$scope.ccon = function(){

  $usuarioC = localStorage.getItem("usuario");
  console.log($usuarioC);

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
             // console.log(data);
              $scope.cont_error="";
              
             });
          request.error(function (data) {

                $scope.cont_error = [
                {
                text: 'Error al cragar datos actualizar',
                img: 'background-image:url(img/error3.png);background-repeat: no-repeat;background-position-x: 65px;background-position-y: 20px;'
                }
            
                ]

             }); 
}

 $scope.ccon();


  $scope.viewChat1 = function(ID_cont) {
  localStorage.setItem("View_id_chat", 0);
  localStorage.setItem("user_id_chat", ID_cont);
  //console.log(ID_cont);
  /*  $state.go('post'); */
  $state.go('chat');
}

  $scope.eliminar_contac = function(idusuarioE){

    
    var idE = idusuarioE;
   // console.log(idE);
 
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
  $scope.cont=[];

$scope.crearGrupo = function (ej) {

var e = true;
for (var i = 0; i < $scope.cont.length; i++) {
    if ($scope.cont[i]==ej) {
      $scope.cont.splice(i, 1);
      console.log( $scope.cont);
      e=false;
    }
}
if (e) {$scope.cont.push(ej);}
}

$scope.InsertarGrupo = function() {
 
var asunto = document.getElementById('asunto').value;
if (asunto=="") {
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
                 $state.go('tab.all');
            
                
              
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
                $state.go('perfil2');
                alertify.logPosition("top right");
                alertify.success('Usuarios Agregados');
            
              
              
             }); 
}

})

.controller('ChatCtr', function($scope,$http,$state,cfpLoadingBar,$rootScope,$cordovaPush,alertify) {

   if(localStorage.getItem("usuario"))
    {
       
    }
    else
    {
      $state.go('/login');
    }

    var idtel1 = localStorage.getItem("prueba");
    var us = localStorage.getItem("usuario");

    var request = $http({
                  method: "post",
                    url: "http://adminenri.sigtics.org/movil_funciones/RegidId",
                    data: {
                      idt: idtel1,
                      usuario: us
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });

              request.success(function (data) {

              //alert(data);

               })


    $scope.viewChat=function(chatId) {
  
    localStorage.setItem("View_id_chat", chatId);
    $state.go('chat');
  
    }

    $scope.canal=function(){

    $state.go("chat-canal");

    }; 

        var idtel1 = localStorage.getItem("prueba");
var us = localStorage.getItem("usuario");

var request = $http({
                  method: "post",
                    url: "http://adminenri.sigtics.org/movil_funciones/RegidId",
                    data: {
                      idt: idtel1,
                      usuario: us
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });

              request.success(function (data) {

              //alert(data);

               })

                 $scope.subreddit = null;
    $scope.subreddits = ['cats', 'pics', 'funny', 'gaming', 'AdviceAnimals', 'aww'];
    var getRandomSubreddit = function() {
      var sub = $scope.subreddits[Math.floor(Math.random() * $scope.subreddits.length)];

      // ensure we get a new subreddit each time.
      if (sub == $scope.subreddit) {
        return getRandomSubreddit();
      }

      return sub;
    };


 
    


$scope.Dchat = function() {

  var usuario = localStorage.getItem("usuario");




     $scope.subreddit = getRandomSubreddit();

      $http.get('http://adminenri.sigtics.org/chat/ListarChat?usuario='+usuario).
      then(function successCallback (response) {

          $scope.chats = response.data; 
         console.log(response.data);  
          $scope.chat_error=""; 

      },function errorCallback(response) {

          $scope.chat_error = [
            {
                text: 'Error al cragar datos actualizar',
                img: 'background-image:url(img/error3.png);background-repeat: no-repeat;background-position-x: 65px;background-position-y: 20px;'
            }
            
        ]  

      })





 

}

  $scope.Dchat();


    




$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {

   // alert(notification.event);
    switch(notification.event) {

        case 'message':

         // alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);

          alertify.logPosition("top right");
          alertify.delay(4000);
          alertify.maxLogItems(1);
          alertify.log(notification.message);

          

          $scope.Dchat();


          break;

    }
  }); 





  $scope.remove = function(chat) {



      var idf = chat.split("-");

     console.log(idf);

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



.controller('mensajecontrol', function($scope,$http,alertify,$upload) {

$scope.sendMessage = function() {
    var message = document.getElementById("mensjaetxt").value;
    var id_chat = localStorage.getItem("View_id_chat");
    var usuario = localStorage.getItem("usuario");
    var id_user2 = localStorage.getItem("user_id_chat");

  if(message == ""){


  }else
  {

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
                   

               localStorage.setItem("View_id_chat", data.id_chat);
               var id_chat1 = localStorage.getItem("View_id_chat");

               $scope.chat1(false);



              
             }); 

          document.getElementById("mensjaetxt").value = "";

  }

    //var message =  $scope.input.message;
   



   
    

  };

  $scope.uploadResult = [];
   $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
     //alertify.logPosition("top right");
     // alertify.success("Enviando Archivo");

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
           


               localStorage.setItem("View_id_chat", response.data.id_chat);
               var id_chat1 = localStorage.getItem("View_id_chat");
             
                $scope.chat1(false);

      }); 
    }
  }



  $scope.clickUpload2 = function(){
    console.log("entro");
   ionic.trigger('click', { target: document.getElementById('i_file1') });
   //console.log("tigged");
   }



})

.controller('ChatDetailCtrl', function($scope,$http,$timeout,$ionicScrollDelegate,$state,$ionicPopup,$ionicActionSheet,$rootScope,$cordovaPush,alertify,$cordovaClipboard) {

$scope.ftoChat = function(foto) {


  var foto1 = foto;
  $scope.cssClass = "cssClass"

  $foto = " <img src='"+foto1+"'   /> ";



  var myPopup = $ionicPopup.show({
    template:$foto,
    buttons: [
       { 
        text: 'X',
        type: 'button-positive'
       }      
    ]
  })


}

  $scope.onMessageHold = function(e, itemIndex, message , id_msg) {
    // show hover menu
    $ionicActionSheet.show({
      buttons: [
       {
          text: 'Eliminar Mensaje',
          type: 'button-assertive'
        },{

          text: 'Copiar mensaje',
          type: 'button-assertive'

        }
      ],
      buttonClicked: function(index) {
        switch (index) {
          case 0: // ELiminar Mensage
            //cordova.plugins.clipboard.copy(message.text);
              var direccion = message.type
              var idm = message.id;
              var usuario = localStorage.getItem("usuario");
              console.log(direccion);
             

               var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/chat/EliminarMensaje",
                data: {
                    mensaje_id:idm,
                    usuario:usuario,
                    direccion: direccion

                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             }); 
           
              request.success(function (data) {

                console.log(data);

               if (data.error === true) {

                 alertify.logPosition("top right");
                 alertify.delay(4000);
                 alertify.maxLogItems(1);
                 alertify.error("Imposible eliminar mensaje");

               }
               else{

                 $scope.chat1();

               }
              //$scope.chat = data;
              


                  });

             

            break;

            case 1: // Copiar Mensage

              console.log(message.text);
/*
              $cordovaClipboard
             .copy(message.text)
             .then(function () {
                // success
                alert("Copio" + message.text);
              }, function () {
                // error
                alert("error");
              });
              
*/

         window.prompt("Copia este texto:", message.text);

          //window.clipboardData.setData("Text", message.text);
              break;
        }

        return true;
      }
    });
  };
  
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
              console.log(data);

         
               $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();  
      
             }); 

 }

    $scope.chat1();

    


  $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
   // alert(notification.event);
    switch(notification.event) {
        case 'message':
         // alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
        
          alertify.logPosition("top right");
          alertify.delay(4000);
          alertify.maxLogItems(1);
          alertify.log(notification.message);
       

          $scope.chat1(false);

          break;  
    }

    
  }); 

  
      $scope.viewPerfil = function(idU) {


      
         
      var idf = idU.split("-");
      if(idf[1])
      {
    
        localStorage.setItem("Chat_G", idf[1]);
      
        //$state.go('info_chat');
        $state.go('perfil2');

      }
      else
      {
      
        localStorage.setItem("View_id_contac", idf[0]);
          $state.go('perfil1');
      }
    

   

  }
  //$scope.chat = Chats.get($stateParams.chatId);
})


.controller('FotoCtr', function($scope, $http,alertify,$upload,$timeout,$state ) {

  $scope.im = function (){


  var email = localStorage.getItem("usuario");
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
    console.log(data.img);

  })

  }

  $scope.im();


    $scope.clickUpload = function(){
     ionic.trigger('click', { target: document.getElementById('i_file') });
   }

   $scope.uploadResult = [];
   $scope.onFileSelect = function($files) {
     var email = localStorage.getItem("usuario");
     var token = "io-gluk@fct%vusb";
    //$files: an array of files selected, each file has name, size, and type.
     //alertify.logPosition("top right");
     // alertify.success("Actualizando foto , Espere un momento");
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

       $timeout(function() {

         $scope.im();

         
       
        });

      }); 
    }
  }

  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('ClaveCtr', function($scope,$http,alertify) {

    $scope.cambiar = function () {

    var token = "io-gluk@fct%vusb";
    $email_c = localStorage.getItem("usuario");
    console.log($email_c);

    var c_actual = document.getElementById('c_actual').value;
    var c_nueva = document.getElementById('c_nueva').value;
    var cc_nueva = document.getElementById('cc_nueva').value;
    console.log(c_actual);
            var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/movil_funciones/c_clave",
                data: {
                    c_actual: c_actual,
                    c_nueva: c_nueva,
                    cc_nueva: cc_nueva,
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
              document.getElementById('c_actual').value = "";
             document.getElementById('c_nueva').value = "";
              document.getElementById('cc_nueva').value = "";         

           

                }
            });
    }
  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('PerfilCtr', function($scope,$http, alertify,$ionicPopup) {


  var idC = localStorage.getItem("usuario");
  var token = "io-gluk@fct%vusb";
    var request = $http({
            method: "post",
            url: "http://adminenri.sigtics.org/movil_funciones/getUser",
            data: {
                    email: idC,
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

             
              }
             
            });
    }



  //$scope.chat = Chats.get($stateParams.chatId);
})


.controller('Sol-reciCrt', function($scope,$http,alertify ) {
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
              console.log(response);



            }); 

}


  $scope.solrec();



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

               $scope.solrec();


            }); 
}

  $scope.Asolicitud = function (Asolicitu) {

console.log(Asolicitu);
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



              $scope.solrec();



            }); 
}
  //$scope.chat = Chats.get($stateParams.chatId);
})



.controller('Sol-envCrt', function($scope,$http) {

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
      
             $scope.solev();



            }); 
}

  //$scope.chat = Chats.get($stateParams.chatId);
})


.controller('perfilCtr', function($scope,$http,$ionicPopup) {


  $scope.ftoChat1 = function(foto) {
  //console.log("ss");

  var foto1 = foto;
  $scope.cssClass = "cssClass"

  $foto = " <img src='"+foto1+"'   /> ";



  var myPopup = $ionicPopup.show({
    template:$foto,
    buttons: [
       { 
        text: 'X',
        type: 'button-positive'
       }      
    ]
  })


}

   var idC = localStorage.getItem("View_id_contac");
   console.log(idC);
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

              $scope.perilUser = response;
              //console.log(response.img);

            }); 

})


.controller('perfilGrCtr', function($scope,$http,$state) {

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
              console.log(data);

             }); 


  $scope.viewFoto1 = function (id_g){


    localStorage.setItem("grupo_id", id_g);
    $state.go('foto_grupo');

  }

 $scope.a_p_grupo = function (id_g){


    localStorage.setItem("grupo_id", id_g);
    $state.go('a_grupo');

  }


})

.controller('foto_grupoCtr', function($scope,$http,$state,$upload){

  $scope.fg = function(){

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

    $scope.img1 = data.img;
    console.log(data.img);

  })

  }

  $scope.fg();

   $scope.uploadResult = [];
   $scope.onFileSelect = function($files) {
    var grupo_id = localStorage.getItem("grupo_id");
    var token = "io-gluk@fct%vusb";
    //$files: an array of files selected, each file has name, size, and type.
    // alertify.logPosition("top right");
   //   alertify.success("Actualizando foto , Espere un momento");
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

            $scope.fg();

      }); 
    }
  }
   $scope.clickUpload = function(){

    ionic.trigger('click', { target: document.getElementById('i_file') });
   }

})

.controller('chat-canalCtr', function($scope,$http,$state,$ionicScrollDelegate,$rootScope){

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
              console.log($scope.canalM);
                 
             }); 



})

.controller('emisoraCtr', function() {

    $scope.songs = [
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
            
        ];

})

.controller('confiCtr', function($scope,$http,$state,$rootScope,$ionicPlatform,$window,$cordovaNetwork) {


  if(localStorage.getItem("usuario"))
    {
       
    }
    else
    {
      $state.go('/login');
    }


    var idtel1 = localStorage.getItem("prueba");
    var us = localStorage.getItem("usuario");

    var request = $http({
                  method: "post",
                    url: "http://adminenri.sigtics.org/movil_funciones/RegidId",
                    data: {
                      idt: idtel1,
                      usuario: us
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });

              request.success(function (data) {

              //alert(data);

               })

var idtel1 = localStorage.getItem("prueba");
var us = localStorage.getItem("usuario");

var request = $http({
                  method: "post",
                    url: "http://adminenri.sigtics.org/movil_funciones/RegidId",
                    data: {
                      idt: idtel1,
                      usuario: us
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });

              request.success(function (data) {

              //alert(data);

               })




      $scope.salir = function() {

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

              localStorage.removeItem("usuario");
             $state.go('login');
               

                });

              

    }
})

.controller('agregarCtr', function($scope,$http,alertify) {

  $scope.closemodal_usuario();

  $scope.Ausuario = function () {

    var token = "io-gluk@fct%vusb";
    var usuario = document.getElementById("usuarioA").value;
    $email_con = localStorage.getItem("usuario");

    //var tipoU = document.getElementById("tipoU").value;

 var tipoU = 1;


   
 
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
              document.getElementById("usuarioA").value = "";
    
             


             }

              

             
            }); 
    }

})

.controller('RegisterCrt', function($scope,$ionicPopup,$http,$state,$location,$templateCache,$ionicHistory,alertify){

 var token = "io-gluk@fct%vusb";





   $scope.registrar = function () {
var email = document.getElementById("mail").value;
 var pass = document.getElementById("clave").value;
 var nombre = document.getElementById("nombre").value;
 var user = document.getElementById("user").value;
 var sexo = 1;

 console.log(email);
 console.log(pass);
 console.log(nombre);
 console.log(user);
 console.log(sexo);

            var request = $http({
                method: "post",
                url: "http://adminenri.sigtics.org/movil_funciones/registrar",
                data: {
                    email: email,
                    pass: pass,
                    nombre: nombre,
                    user: user,
                    sexo: sexo,
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


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
