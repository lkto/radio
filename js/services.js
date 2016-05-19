angular.module('starter.services', ['ngCordova'])

.run(function($cordovaPush,$rootScope) {

  ionic.Platform.ready(function() {



 PushNotifications.setGcmSenderId('217743739524');
      PushNotifications
        .ensureRegistration()
        .onMessage(function(message) {
          alert("New push notification", message);
        });


  });

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

    alert(notification.event);
    switch(notification.event) {
      case 'registered':
        if (notification.regid.length > 0 ) {
          alert('registration ID = ' + notification.regid);
          idtel = notification.regid;
        }
        break;

        case 'message':
          alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
          break;

        case 'error':
          alert('GCM error = ' + notification.msg);
          break;
    }


  });



})



.factory('id_serve', function ($http) {

  $http.get('http://adminenri.sigtics.org/chat/aceptar').
      then(function(response) {
       // $scope.$apply(function() {
            localStorage.setItem("server", response.data.socket);

            $server = localStorage.getItem("server");

           console.log($server);
           
      //  })
        
     }) 

$server = localStorage.getItem("server");

return $server;


})

.factory('nom_img', function ($http) {

    $email_d = localStorage.getItem("usuario");
    var token = "io-gluk@fct%vusb";

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

      
              localStorage.setItem("img_user", response.img);
              $img1 = localStorage.getItem("img_user");

            });

            $img1 = localStorage.getItem("img_user");
            return $img1;
      


})




  .factory('Chats', function ($http) {
    // Might use a resource here that returns a JSON array



    /*var chats = [
      {
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/thumb/ben.png',
        messages: [
          {
            type: 'received',
            text: 'Hey, How are you? wanna hang out this friday?',
            image: '',
            time: 'Thursday 05:55 PM'
          },
          {
            type: 'sent',
            text: 'Good, Yes sure why not :D',
            image: '',
            time: 'Thursday 05:56 PM'
          },
          {
            type: 'received',
            text: 'Check out this view from my last trip',
            image: '/img/thumb/canada.jpg',
            time: 'Thursday 05:57 PM'
          },
          {
            type: 'sent',
            text: 'Looks Great is that view in Canada?',
            image: '',
            time: 'Thursday 05:58 PM'
          },
          {
            type: 'received',
            text: 'Yes, it\'s in Canada',
            image: '',
            time: 'Thursday 05:57 PM'
          }
        ]
      },
      {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/thumb/max.png'
      },
      {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/thumb/adam.jpg'
      },
      {

        d: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/thumb/perry.png'
      },
      {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/thumb/mike.png'
      },
      {
        id: 5,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/thumb/ben.png'
      },
      {
        id: 6,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/thumb/max.png'
      }
    ]; */



    

    return {
      all: function () {
       /* var usuario = localStorage.getItem("usuario");
      var request = $http({
                method: "get",
                url: "php/cargar_chat.php",
                data: {
                    usuario: usuario 
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
           
          request.then(function (data) {
              var chats;
            
              chats = data.data;


              return chats;

              console.log(chats);
              
             }); 

*/

     return chats;
        
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {

      

        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  })

  .factory('Posts', function ($http) {
    // Might use a resource here that returns a JSON array
 var posts;
    // Some fake testing data
     $http.get('http://adminenri.sigtics.org/movil_funciones/getNoticias').
      then(function(response) {
       // $scope.$apply(function() {
            posts= response.data;
        
           
      //  })
        
     }) 

    return {
      all: function () {
        return posts;
      },
      remove: function (post) {
        posts.splice(posts.indexOf(post), 1);
      },
      get: function (postId) {

    
   
        //var id_noticia = postId;
       
       /* console.log(id_noticia);
        var token = "io-gluk@fct%vusb";

        var request = $http({
            method: "post",
            url: "http://radio.sigtics.org/movil_funciones/viewNoticia",
            data: {
                    id_noticia: id_noticia,
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
        request.success(function (response) {
              post = response;
              console.log(response);
              return posts;

            }); */

        for (var i = 0; i < posts.length; i++) {
          
       
          var id_post = localStorage.getItem("View_id_noticia");
         


          if (posts[i].id_noticia == parseInt(id_post)) {
            //console.log(posts[i]);
            return posts[i];
          }
        }
        return null;
      }
    };
  })

  
.factory('Contacts', function($http) {
    // Some fake testing data
  /*
    var usuarioC = localStorage.getItem("usuario");
    var contacts;
    var request = $http({
                method: "post",
                url: "http://radio.sigtics.org/movil_funciones/listarUsuario",
                data: {
                    usuario: usuarioC 
              
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }); 
          request.success(function (data) {

            
              contacts = data;
              console.log(contacts);
              
             
              
           })
*/

/*

    var contacts = [
      {
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/thumb/ben.png',
        group: 'Friend'
      },
      {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/thumb/max.png',
        group: 'Family'
      },
      {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/thumb/adam.jpg',
        group: 'Friend'
      },
      {

        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/thumb/perry.png',
        group: 'Friend'
      },
      {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/thumb/mike.png',
        group: 'Family'
      },
      {
        id: 5,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/thumb/ben.png',
        group: 'Friend'
      },
      {
        id: 6,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/thumb/max.png',
        group: 'Family'
      }
    ];

    */

    return {
      all: function() {
        return contacts
      },
      get: function(contactId) {
        for (var i = 0; i < contacts.length; i++) {
          if (contacts[i].id === parseInt(contactId)) {
            return contacts[i];
          }
        }
        return null;
      }
    }
  })


