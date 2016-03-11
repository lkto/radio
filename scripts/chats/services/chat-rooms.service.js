(function() {
	'use strict';

	angular
		.module('musicband.chats')
		.factory('chatRoomsService', chatRoomsService);

	chatRoomsService.$inject = ['$firebaseArray', 'firebaseDb'];

	/* @ngInject */
	function chatRoomsService($firebaseArray, firebaseDb) {
		var rooms = $firebaseArray(firebaseDb.child('rooms'));

		var service = {
			getAll: getAll,
			get: get
		};
		return service;

		// *******************************************************

		function getAll() {
			return rooms;
		}

		function get(roomId) {
			 return rooms.$getRecord(roomId);
		}
	}
})();