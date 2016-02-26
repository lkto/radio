(function() {
	'use strict';

	angular
		.module('musicband.events')
		.factory('eventsService', eventsService);

	eventsService.$inject = ['appSettings'];

	/* @ngInject */
	function eventsService(appSettings) {
		var service = {
			getEvents: getEvents
		};
		return service;

		// *********************************************************

		function getEvents() {
			return appSettings.getEvents();
		}
	}
})();
