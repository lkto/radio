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
.controller('AuthCtrl', function($scope, $location, $ionicHistory, $ionicSideMenuDelegate, $state, $ionicPopup,loginService,$http,$templateCache) {
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

      console.log(localStorage.getItem("usuario"));

      $templateCache.removeAll();


      $ionicHistory.nextViewOptions({
     disableBack: true
      });



    
      $state.go('login');
     
    }


    



     



     //fin

})
// Home controller
.controller('HomeCtrl', function($scope, Posts, $state, $ionicHistory,$templateCache,$http) {

$ionicHistory.nextViewOptions({
    disableBack: true
  });

  $templateCache.removeAll();
  console.log(localStorage.getItem("prueba"));

  
  $email_d = localStorage.getItem("usuario");
  console.log($email_d);

   var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/getUser",
            data: {
                    email: $email_d,
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            /* Check whether the HTTP Request is Successfull or not. */
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
  $scope.toggleLike = function (post) {
    // if user liked
    if(post.liked) {
      post.likeCount--;
    } else {
      post.likeCount++;
    }
    post.liked = !post.liked;
  };

  // view post
  $scope.viewPost = function(postId) {
    $state.go('post', {postId: postId});
  }

  // view user



  $scope.viewContact = function(contactId) {
    $state.go('user', {userId: contactId});
  }
  


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




.controller('PostCtrl', function($scope, Posts, $state) {
  // get list posts froms service
  $scope.post = Posts.get(0);

  // toggle like button
  $scope.toggleLike = function (post) {
    // if user liked
    if(post.liked) {
      post.likeCount--;
    } else {
      post.likeCount++;
    }
    post.liked = !post.liked;
  };

  // view user function
 
})

// Notifications controller
.controller('NotificationsCtrl', function($scope, Notifications) {
  // get list posts from service
  $scope.notifications = Notifications.all();
})

// ContactsCtrl controller
.controller('ContactsCtrl', function($scope, Contacts, $state) {
  // get list posts froms service
  $scope.contacts = Contacts.all();

  // view contact function
  
})

// UserCtrl controller
.controller('UserCtrl', function($scope, Contacts, Posts, $stateParams, $http) {
  // get contact from Contacts service
  // set the userId here

  $email_d = localStorage.getItem("usuario");
  console.log($email_d);

   var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/getUser",
            data: {
                    email: $email_d,
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

  
    
})

 
                
                
              

 
.controller('login', function($scope,$ionicPopup,$http,$state,$location,$templateCache,$ionicHistory){

$ionicHistory.nextViewOptions({
    disableBack: true
  });

  

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

          var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/login",
            data: {
                    email: $email,
                    pass: $clave
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

                 var alertPopup = $ionicPopup.alert({
                title: 'Login',
                okType: 'button-assertive',
                template: 'Datos Incorrectos'
              });

              }
              
             

            });
           
         


          }

})

.controller('restaurar', function($scope,$ionicPopup,$http,$state,$location,$templateCache,$ionicHistory){

  $ionicHistory.nextViewOptions({
    disableBack: true
  });


  $scope.restaurar = function() {

    console.log($scope.usuario_res);
    $email_res = $scope.usuario_res

    var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/restaurar",
            data: {
                    email: $email_res,
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {

         

              if(data == 1)
              {

                 var alertPopup = $ionicPopup.alert({
                title: 'Restaurar',
                okType: 'button-assertive',
                template: 'Su nueva contraseña a sido enviada a la direccion de correo electronico registrado en el sistema'
                });

              }
              else
              {

                 var alertPopup = $ionicPopup.alert({
                title: 'Registrar',
                okType: 'button-assertive',
                template: 'Datos Incorrectos'
              });

              }
              
             

            });



  }

})


.controller('menu_perfil', function($scope,$ionicPopup,$http,$state,$location,$templateCache){

  

 

$email_d = localStorage.getItem("usuario");
  console.log($email_d);

   var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/getUser",
            data: {
                    email: $email_d,
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (response) {

              $scope.user = response;

              console.log(response);

            });



           




})

.controller('registrar', function($scope,$ionicPopup,$http,$state,$location,$templateCache,$ionicHistory){

$ionicHistory.nextViewOptions({
              disableBack: true
               });
   $scope.registrar = function () {

            var request = $http({
                method: "post",
                url: "http://radio.sigtics.org/movil_funciones/registrar",
                data: {
                    email: $scope.email_r,
                    pass: $scope.password_r,
                    nombre: $scope.nombre_r,
                    user: $scope.user_r
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
              var alertPopup = $ionicPopup.alert({
                title: 'Registro',
                okType: 'button-assertive',
                template: 'Usuario Registrado Con exito'
              });


                 $ionicHistory.nextViewOptions({
              disableBack: true
               });


                $state.go('login');

              console.log(data);

                $scope.message = "From PHP file : "+data;
            });
    }



})

// SettingCtrl controller
.controller('SettingCtrl', function($scope){

})

// AcercaCtrl controller
.controller('AcercaCtrl', function($scope){

})
