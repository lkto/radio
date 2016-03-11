(function() {
	'use strict';

	angular
		.module('musicband.home')
		.factory('homeDataService', homeDataService);

	homeDataService.$inject = [];

	/* @ngInject */
	function homeDataService() {
		return {
			getFollowUsItems: getFollowUsItems
		};

		function getFollowUsItems(settings) {
			return [{
				icon: 'ion-social-facebook',
				title: 'Facebook',
				url: 'https://www.facebook.com/' + settings.socialMediaAccounts.facebook
			}, {
				icon: 'ion-social-twitter',
				title: 'Twitter',
				url: 'https://twitter.com/' + settings.socialMediaAccounts.twitter
			}, {
				icon: 'ion-social-instagram-outline',
				title: 'Instagram',
				url: 'https://instagram.com/' + settings.socialMediaAccounts.instagram
			}, {
				icon: 'ion-ipad',
				title: 'Web site',
				url: settings.website
			}, {
				icon: 'ion-music-note',
				title: 'Music',
				url: settings.iTunesURI
			}, {
				icon: 'ion-briefcase',
				title: 'Store',
				url: settings.store
			}];
		}
	}
})();
