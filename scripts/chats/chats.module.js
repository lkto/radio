(function() {
	'use strict';

	angular
		.module('musicband.chats', [
			'ionic',
			'firebase'
		])
		.run(function($ionicPlatform, $rootScope, $state) {
			$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
				// We can catch the error thrown when the $requireAuth promise is rejected
				// and redirect the user back to the home page
				if (error === 'AUTH_REQUIRED') {
					return $state.go('app.chats-login');
				}
			});
		})
		.config(function($stateProvider) {
			$stateProvider
				.state('app.chats-login', {
					url: '/chats-login',
					views: {
						'menuContent': {
							templateUrl: 'scripts/chats/auth/chats-login.html',
							controller: 'ChatsLoginController as vm'
						}
					},
					resolve: {
						'currentAuth': ['chatsAuthService', function(chatsAuthService) {
								return chatsAuthService.auth.$waitForAuth();
							}
						]
					}
				})
				.state('app.chat-rooms', {
					url: '/chat-rooms',
					views: {
						'menuContent': {
							templateUrl: 'scripts/chats/rooms/chat-rooms.html',
							controller: 'ChatRoomsController as vm'
						}
					},
					resolve: {
						'currentAuth': ['chatsAuthService', function(chatsAuthService) {
								return chatsAuthService.auth.$requireAuth();
							}
						]
					}
				})
				.state('app.chat-room', {
					url: '/chat-rooms/:roomId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/chats/room/chat-room.html',
							controller: 'ChatRoomController as vm'
						}
					}
				});
		});
})();