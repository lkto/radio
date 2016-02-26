(function() {
	'use strict';

	angular
		.module('musicband.menu', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app', {
					url: '/app',
					abstract: true,
					templateUrl: 'scripts/menu/menu.html',
					controller: 'MenuController as vm',
					resolve: {
						settings: function(appSettings) {
							return appSettings.initSettings();
						}
					}
				});
		});
})();