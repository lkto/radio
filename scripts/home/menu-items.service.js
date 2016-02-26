(function() {
	'use strict';

	angular
		.module('musicband.home')
		.factory('menuItems', menuItems);

	menuItems.$inject = [];

	/* @ngInject */
	function menuItems() {
		var data = [{
			title: 'News',
			path: 'wordpress-articles',
			icon: 'ion-social-wordpress'
		}, {
			title: 'Videos',
			path: 'videos',
			icon: 'ion-social-youtube'
		}, {
			title: 'TheRollingStones',
			path: 'instagram-recent-media',
			icon: 'ion-social-instagram-outline'
		}, {
			title: 'Fans Chat',
			path: 'chat-rooms',
			icon: 'ion-chatbubbles'
		}];

		return data;
	}
})();
