(function() {
	'use strict';

	angular
		.module('musicband.chats')
		.controller('ChatRoomController', ChatRoomController);

	ChatRoomController.$inject = ['$state', '$ionicHistory', 'chatMessagesService', 'chatsAuthService'];

	/* @ngInject */
	function ChatRoomController($state, $ionicHistory, chatMessagesService, chatsAuthService) {
		var vm = angular.extend(this, {
			IM: {
				textMessage: ''
			},
			messages: null,
			roomName: null,
			sendMessage: sendMessage,
			remove: remove,
			signOut: signOut
		});

		(function activate() {
			chatMessagesService.selectRoom($state.params.roomId);
			var roomName = chatMessagesService.getSelectedRoomName();

			// Fetching Chat Records only if a Room is Selected
			if (roomName) {
				vm.roomName = ' - ' + roomName;
				vm.messages = chatMessagesService.all();
			}
		})();

		// ********************************************************************

		function sendMessage(msg) {
			chatMessagesService.send(msg);
			vm.IM.textMessage = '';
		}

		function remove(chat) {
			chatMessagesService.remove(chat);
		}

		function signOut() {
			chatsAuthService.signOut();
			// $ionicHistory.goBack(-2);
			$ionicHistory.nextViewOptions({
				disableAnimate: true,
  			disableBack: true
			});
			$state.go('app.chats-login');
		}
	}
})();
