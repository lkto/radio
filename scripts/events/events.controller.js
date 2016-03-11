(function() {
	'use strict';

	angular
		.module('musicband.events')
		.controller('EventsController', EventsController);

	EventsController.$inject = ['events'];

	/* @ngInject */
	function EventsController(events) {
		var vm = angular.extend(this, {
			calendarView: 'month',
			calendarDay: new Date(),
			calendarTitle: 'Events',
			onDrillDownClick: onDrillDownClick,
			events: events
		});

		// ********************************************************************

		function onDrillDownClick() {
			return false;
		}
	}
})();