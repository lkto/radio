(function() {
	'use strict';

	angular
		.module('musicband.instagram', [
			'ionic',
			'angularMoment'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.instagram-recent-media', {
					url: '/instagram-recent-media',
					views: {
						'menuContent': {
							templateUrl: 'scripts/instagram/recent-media/instagram-recent-media.html',
							controller: 'InstagramRecentMediaController as vm'
						}
					}
				});
		});
})();