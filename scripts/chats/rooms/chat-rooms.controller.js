(function() {
	'use strict';

	angular
		.module('musicband.chats')
		.controller('ChatRoomsController', ChatRoomsController);

	ChatRoomsController.$inject = ['$state', '$ionicHistory', 'chatRoomsService', 'chatsAuthService'];

	/* @ngInject */
	function ChatRoomsController($state, $ionicHistory, chatRoomsService, chatsAuthService) {
		var vm = angular.extend(this, {
			rooms: chatRoomsService.getAll(),
			openChatRoom: openChatRoom,
			signOut: signOut
		});

		(function activate() {
		})();

		// ********************************************************************

		function signOut() {
			chatsAuthService.signOut();
			// $ionicHistory.goBack();
			$ionicHistory.nextViewOptions({
				disableAnimate: true,
				disableBack: true
			});
			$state.go('app.chats-login');
		}

		function openChatRoom(roomId) {
			$state.go('app.chat-room', {
				roomId: roomId
			});
		}
	}
})();
