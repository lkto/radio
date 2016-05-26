angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('login', function($scope,$http,$state,$location,$rootScope,$ionicPlatform){

    if(localStorage.getItem("usuario"))
    {
      console.log("k");
     
       //$location.url("/inicio");
      $state.go('tab.all');
    }




    $scope.login = function() {
      //alert(idtel);
      $email = document.getElementById("user").value;
      $clave = document.getElementById("clave").value;
      console.log($email);
      console.log($clave);


     /* if ($email == ""  ){
      
        alertify.logPosition("top right");
        alertify.error("Ingresar el email o nombre de usuario");*

      }else if ($clave == ""  ){

        alertify.logPosition("top right");
        alertify.error("Ingresar una contraseña");

      }else{*/


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
                localStorage.setItem("prueba", 0);

                $state.go('tab.all');
              }
              else
              {
                console.log("aa");
                /*

                 alertify.logPosition("top right");
                 alertify.error("Datos Incorrectos");

                 */

              }
              
             

            });
           
         


          }
        

})


.controller('NoticeCtr', function($scope,$http,$state ) {

  if(localStorage.getItem("usuario"))
    {
       
    }
    else
    {
      $state.go('/login');
    }


    $scope.notici = function(){

     $http.get('http://adminenri.sigtics.org/movil_funciones/getNoticias').
      then(function(response) {
       // $scope.$apply(function() {
            $scope.posts = response.data;
             //console.log($scope.posts);
          
     }) 
  }

  $scope.notici();

  $scope.viewPost = function(postId){
      
      localStorage.setItem("View_id_noticia", postId);
      $state.go('tab.noticias');
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

.controller('ContacCtr', function($scope,$http,$state) {
  if(localStorage.getItem("usuario"))
    {
       
    }
    else
    {
      $state.go('/login');
    }

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
              console.log(data);
              
             }); 
}

 $scope.ccon();


  $scope.viewChat1 = function(ID_cont) {
  localStorage.setItem("View_id_chat", 0);
  localStorage.setItem("user_id_chat", ID_cont);
  console.log(ID_cont);
  /*  $state.go('post'); */
  $state.go('tab.chat');
}

  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('ChatCtr', function($scope,$http,$state) {

  if(localStorage.getItem("usuario"))
    {
       
    }
    else
    {
      $state.go('/login');
    }

$scope.Dchat = function() {

var usuario = localStorage.getItem("usuario");

$http.get('http://adminenri.sigtics.org/chat/ListarChat?usuario='+usuario).
      then(function(response) {
       // $scope.$apply(function() {
         $scope.chats = response.data; 
         console.log(response.data);     

})



    }

$scope.Dchat();

$scope.viewChat = function(chatId) {
  localStorage.setItem("View_id_chat", chatId);
  //console.log(ID_cont);
  /*  $state.go('post'); */
  $state.go('tab.chat');
}

$scope.canal=function() {
            
    $state.go('tab.chat-canal');
};



  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('ChatDetailCtrl', function($scope,$http,$timeout,$ionicScrollDelegate,$state) {

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

          $timeout(function(){
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();  
          },5)
             }); 

 }

    $scope.chat1();


      $scope.viewPerfil = function(idU) {


      
         
      var idf = idU.split("-");
      if(idf[1])
      {
    
        localStorage.setItem("Chat_G", idf[1]);
      
        //$state.go('info_chat');
        $state.go('tab.perfil2');

      }
      else
      {
      
        localStorage.setItem("View_id_contac", idf[0]);
          $state.go('tab.perfil1');
      }
    

   

  }
  //$scope.chat = Chats.get($stateParams.chatId);
})


.controller('FotoCtr', function($scope, $http ) {

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
  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('ClaveCtr', function($scope) {
  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('PerfilCtr', function($scope,$http) {
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
  //$scope.chat = Chats.get($stateParams.chatId);
})


.controller('Sol-reciCrt', function($scope,$http ) {
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

  //$scope.chat = Chats.get($stateParams.chatId);
})


.controller('perfilCtr', function($scope,$http) {

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
    $state.go('tab.foto_grupo');

  }

})

.controller('foto_grupoCtr', function($scope,$http,$state){


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

/*

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
*/

})

.controller('chat-canalCtr', function($scope,$http,$state,$ionicScrollDelegate){

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

.controller('confiCtr', function($scope,$http,$state) {
  
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

              window.localStorage.clear();
             $state.go('login');
               

                });

              

    }
})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
