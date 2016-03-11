(function() {
	'use strict';

	angular
		.module('musicband.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['menuItems', 'homeDataService', 'externalAppsService', 'appSettings'];

	/* @ngInject */
	function HomeController(menuItems, homeDataService, externalAppsService, appSettings) {
		var settings = appSettings.getSettings();
		var vm = angular.extend(this, {
			entries: menuItems,
			followUsItems: homeDataService.getFollowUsItems(settings),
			openLink: openLink,
			welcomeTitle: settings.welcomeTitle,
			welcomeSlogan: settings.welcomeSlogan
		});

		function openLink(url) {
			externalAppsService.openExternalUrl(url);
		}
	}
})();
