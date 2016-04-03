angular.module('starter.services', [])

.constant('ENV', {name:'development',youtubeKey:'AIzaSyDael5MmCQa1GKQNKQYypmBeB08GATgSEo',ionicPrivateKey:'a9265eaf15a20cc8516c770e8748aeed4891b28f453ce755',ionicPublicKey:'e30d4d540b8c75d1f167bbf242423c3fb23fe10275d1c016',ionicAppId:'241b6d37',gcmId:'228071472080',instagramAppId:'2998ca20ed924ca3be22907c6ae77363',facebookPermanentAccessToken:'CAANL6xXrSHYBANNHhMUDugVZBHXfVQBMeWG6FmpYROWcOEmC2xze1BNiraZB87NCAZC3w08L7KhCBnhJItZCUzWCgBNzBjt0BkoV6qMoXjIZBjkWRTUGgZBR39OZAiP3DF76jufQ4hJ7xsdQc0l68vFAZAePdZCZAjkjTwaOeEZC22xi8ZAQYBqvNvYRgIfOZBzf4zRURHgrLtNazxzln8ZBkd9FZC7',firebaseUrl:'music-band-ionic.firebaseio.com',parse:{applicationId:'sidmrbO9OqG3pe4iErva408MHFysJZ2zChYPAXlU',key:'e49Rnlja6llKnFW5p0OOF8dkHvJi5o1hrVzFGBnc'},settingsSource:'LOCAL'})



.service('loginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'user' && pw == '1234') {
                deferred.resolve('Bienvenido ' + name + '!');
            } else {
                deferred.reject('Datos Incorrectos.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.factory('id_serve', function ($http) {

  $http.get('http://radio.sigtics.org/chat/aceptar').
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

var usuario = localStorage.getItem("usuario");
 var chats;
$http.get('php/cargar_chat.php?usuario='+usuario).
      then(function(response) {
       // $scope.$apply(function() {
       

          chats = response.data;

           console.log(chats);
           
      //  })
        
     }) 

    

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
     $http.get('http://radio.sigtics.org/movil_funciones/getNoticias').
      then(function(response) {
       // $scope.$apply(function() {
            posts= response.data;
           console.log(response.data);
           
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

    
      console.log(posts);
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
          console.log(id_post);


          if (posts[i].id_noticia == parseInt(id_post)) {
            //console.log(posts[i]);
            return posts[i];
          }
        }
        return null;
      }
    };
  })

  .factory('Notifications', function() {
    // fake data
    var notifications = [
      {
        id: 1,
        type: 'liked',
        user_id: 2,
        name: 'Max Lynx',
        face: 'img/thumb/max.png',
        read: false,
        time: 'Just now'
      },
      {
        id: 2,
        type: 'commented',
        user_id: 2,
        name: 'Adam Bradleyson',
        face: 'img/thumb/adam.jpg',
        read: true,
        time: '3 minutes ago'
      },
      {
        id: 3,
        type: 'friend_request',
        user_id: 2,
        name: 'Perry Governor',
        face: 'img/thumb/perry.png',
        read: true,
        time: '5 minutes ago'
      },
      {
        id: 4,
        type: 'liked',
        user_id: 2,
        name: 'Ben Sparrow',
        face: 'img/thumb/ben.png',
        read: false,
        time: '6 minutes ago'
      },
      {
        id: 5,
        type: 'friend_request',
        user_id: 2,
        name: 'Perry Governor',
        face: 'img/thumb/perry.png',
        read: true,
        time: '5 minutes ago'
      },
      {
        id: 6,
        type: 'liked',
        user_id: 2,
        name: 'Ben Sparrow',
        face: 'img/thumb/ben.png',
        read: false,
        time: '6 minutes ago'
      }
    ];

    return {
      all: function() {
        return notifications
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
.factory('localAppSettings', function($q){

    var settings = {
      welcomeTitle: 'The Music Band',
      welcomeSlogan: 'But suddenly popular music became bigger than it had ever been before',

      youtubeUser: 'TheRollingStones',
      facebookPage: 'therollingstones',
      instagramTag: 'therollingstones',
      newsJSONURI: 'https://skounis.s3.amazonaws.com/mobile-apps/music-band/news.json',
      wordPressURI: 'https://demo.titaniumtemplates.com/wordpress/tag/rollingstones/?json=1',
      website: 'http://www.marioenturadio.com',
      store: 'https://rollingstones.shop.bravadousa.com/store/',
      iTunesURI: 'https://itunes.apple.com/us/artist/the-rolling-stones/id1249595',
      // Live Radio
      audioStream: 'http://198.100.125.242:80/',
      hasAudioStreamMeta: true,
      // audioStream: 'http://stream-dc1.radioparadise.com/mp3-128',
      // hasAudioStreamMeta: false,

      socialMediaAccounts: {
        facebook: 'therollingstones',
        twitter: 'RollingStones',
        instagram: 'therollingstones',
      }
    };

      var events = [{
      title: 'Hartford United States XL Center',
      type: 'info',
      startsAt: new Date(2015, 5, 25, 1),
      endsAt: new Date(2015, 5, 26, 15),
      editable: false,
      deletable: false,
      incrementsBadgeTotal: false
    }, {
      title: 'Trenton Sun National Bank Center',
      type: 'important',
      startsAt: new Date(2015, 5, 6, 12),
      endsAt: new Date(2015, 5, 9, 15),
      editable: false,
      deletable: false,
      incrementsBadgeTotal: false
    }, {
      title: 'Cincinnati US Bank Arena',
      type: 'success',
      startsAt: new Date(2015, 6, 10, 9),
      endsAt: new Date(2015, 6, 12, 21),
      editable: false,
      deletable: false,
      incrementsBadgeTotal: false
    }, {
      title: 'Milwaukee Marcus Amphitheater',
      type: 'special',
      startsAt: new Date(2015, 6, 14, 12),
      endsAt: new Date(2015, 6, 15, 15),
      editable: false,
      deletable: false,
      incrementsBadgeTotal: false
    }];

    var mapData = {
      origin: {
        latitude: 37.407,
        longitude: -122.1
      },
      zoomLevel: 15,
      annotations: [{
        title: 'Hartford United States XL Center.',
        latitude: 37.407,
        longitude: -122.1
      }, {
        title: 'Trenton Sun National Bank Center.',
        latitude: 37.41,
        longitude: -122.1
      }]
    };
return {
      initSettings: function() {
        return $q.when(settings);
      },
      getSettings: function() {
        return settings;
      },
      getMapData: function() {
        return $q.when(mapData);
      },
      getEvents: function() {
        return $q.when(events);
      }
    };


})

.factory('firebaseAppSettings', function(firebaseDb, $firebaseObject, $firebaseArray, $q, _){


    var storedSettings;

    return {
      initSettings: initSettings,
      getSettings: getSettings,
      getMapData: getMapData,
      getEvents: getEvents
    };
    
    function initSettings() {
      var deferred = $q.defer();
      $firebaseObject(firebaseDb.child('appSettings'))
        .$loaded(function(settings) {
          storedSettings = settings;
          deferred.resolve(settings);
        });
      
      return deferred.promise;
    }
    
    function getMapData() {
      var deferred = $q.defer();
      $firebaseObject(firebaseDb.child('mapData'))
        .$loaded(function(mapData) {
          deferred.resolve(mapData);
        });
      
      return deferred.promise;
    }

    function getEvents() {
      var deferred = $q.defer();
      $firebaseArray(firebaseDb.child('events'))
        .$loaded(function(data) {
          var events = [];
          _.each(data, function(event) {
            events.push({
              title: event.title,
              type: event.type,
              startsAt: new Date(event.startsAt),
              endsAt: new Date(event.endsAt),
              editable: event.editable,
              deletable: event.deletable,
              incrementsBadgeTotal: event.incrementsBadgeTotal
            });
          });
          deferred.resolve(events);
        });
      return deferred.promise;
    }
    
    function getSettings() {
      return storedSettings;
    }


})

.factory('parseAppSettings', function(_){

  var storedSettings;

    return {
      initSettings: initSettings,
      getSettings: getSettings,
      getMapData: getMapData,
      getEvents: getEvents
    };

    function initSettings() {
      var query = new Parse.Query('AppSettings');
      return query.find().then(function(result) {
        storedSettings = result[0].attributes;
        return storedSettings;
      });
    }

    function getSettings() {
      return storedSettings;
    }

    function getMapData() {
      var query = new Parse.Query('MapData');
      return query.find().then(function(result) {
        return result[0].attributes;
      });
    }

    function getEvents() {
      var query = new Parse.Query('Event');
      return query.find().then(function(result) {
        var events = [];
        _.each(result, function(item) {
          events.push(item.attributes);
        });
        return events;
      })
    }

})



.factory('appSettings', function(ENV,$injector){

  switch(ENV.settingsSource) {
      case 'LOCAL':
        return $injector.get('localAppSettings');
      case 'FIREBASE':
        return $injector.get('firebaseAppSettings');
      case 'PARSE':
        return $injector.get('parseAppSettings');
    }
    
    throw new Error('Setting source is not valid');


})


.factory('streamService', function($http,$q,appSettings){

  /* @ngInject */


  
   var streamUrl = appSettings.getSettings().audioStream;
  var metadataUrl = streamUrl + '7.html';
  console.log(metadataUrl);
    var contentRegex = /<body>(.*)<\/body>/;
    var itunesSearchUrl = 'https://itunes.apple.com/search?term=';
    var resolutionRegex = /100x100/;
    var config = {
      skipSpinner: true
    };

    var service = {
      getStreamInfo: getStreamInfo
    };
    return service;

    // ****************************************************************************

    function getStreamInfo() {
      return $http.get(metadataUrl, config).then(function(response) {
        var title = parseShoutcastResponse(response.data);
        if (!title) {
          return {};
        }

        return getCover(title).then(function(coverUrl) {
          return {
            title: title,
            coverUrl: coverUrl
          };
        });
      });
    }

    function getCover(title) {
      return $http.get(itunesSearchUrl + title, config).then(function(response) {
        var item = response.data.results[0];
        if (!item || !item.artworkUrl100) {
          return null;
        }
        
        return item.artworkUrl100.replace(resolutionRegex, '500x500');
      });
    }

    function parseShoutcastResponse(html) {
      var content = html.match(contentRegex);
      var parts = content;
     
      return parts;
    }
  
})




