(function() {
	'use strict';

	angular
		.module('musicband.events', [
			'ionic',
			'mwl.calendar'
		])
		.config(function($stateProvider, calendarConfigProvider) {
			window.moment.locale('en', {
				week : {
					dow : 1 // Monday is the first day of the week
				}
			});

			calendarConfigProvider.setDateFormats({
				weekDay: 'EEE'
			});

			$stateProvider
				.state('app.events', {
					url: '/events',
					views: {
						'menuContent': {
							templateUrl: 'scripts/events/events.html',
							controller: 'EventsController as vm'
						}
					},
					resolve: {
						events: function(eventsService) {
							return eventsService.getEvents();
						}
					}
				});
		});
})();