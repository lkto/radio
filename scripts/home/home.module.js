(function() {
	'use strict';

	angular
		.module('musicband.home', [
			'ionic',
			'ngCordova',
			'musicband.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.home', {
					url: '/home',
					views: {
						'menuContent': {
							templateUrl: 'scripts/home/home.html',
							controller: 'HomeController as vm'
						}
					}
				});
		});
})();