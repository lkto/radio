(function() {
	'use strict';

	angular
		.module('musicband.common')
		.factory('firebaseAppSettings', firebaseAppSettings);

	firebaseAppSettings.$inject = ['firebaseDb', '$firebaseObject', '$firebaseArray', '$q', '_'];

	/* @ngInject */
	function firebaseAppSettings(firebaseDb, $firebaseObject, $firebaseArray, $q, _) {
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
	}
})();
