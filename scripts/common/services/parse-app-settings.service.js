(function() {
	'use strict';

	angular
		.module('musicband.common')
		.factory('parseAppSettings', parseAppSettings);

	parseAppSettings.$inject = ['_'];

	/* @ngInject */
	function parseAppSettings(_) {
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
			});
		}
	}
})();