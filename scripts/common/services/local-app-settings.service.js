(function () {
	'use strict';

	angular
		.module('musicband.common')
		.factory('localAppSettings', localAppSettings);

	localAppSettings.$inject = ['$q'];

	/* @ngInject */
	function localAppSettings($q) {
		var settings = {
			welcomeTitle: 'The Music Band',
			welcomeSlogan: 'But suddenly popular music became bigger than it had ever been before',

			youtubeUser: 'TheRollingStones',
			facebookPage: 'therollingstones',
			instagramTag: 'therollingstones',
			newsJSONURI: 'https://skounis.s3.amazonaws.com/mobile-apps/music-band/news.json',
			wordPressURI: 'https://demo.titaniumtemplates.com/wordpress/tag/rollingstones/?json=1',
			website: 'http://www.rollingstones.com/',
			store: 'https://rollingstones.shop.bravadousa.com/store/',
			iTunesURI: 'https://itunes.apple.com/us/artist/the-rolling-stones/id1249595',
			// Live Radio
			audioStream: 'http://198.100.125.242:80/',
			hasAudioStreamMeta: true,
			// audioStream: 'http://stream-dc1.radioparadise.com/mp3-128',
			// hasAudioStreamMeta: false,

			socialMediaAccounts: {
				facebook: 'therollingstones',
				twitter: 'RollingStones',
				instagram: 'therollingstones',
			}
		};

		// Events
		var events = [{
			title: 'Hartford United States XL Center',
			type: 'info',
			startsAt: new Date(2015, 5, 25, 1),
			endsAt: new Date(2015, 5, 26, 15),
			editable: false,
			deletable: false,
			incrementsBadgeTotal: false
		}, {
			title: 'Trenton Sun National Bank Center',
			type: 'important',
			startsAt: new Date(2015, 5, 6, 12),
			endsAt: new Date(2015, 5, 9, 15),
			editable: false,
			deletable: false,
			incrementsBadgeTotal: false
		}, {
			title: 'Cincinnati US Bank Arena',
			type: 'success',
			startsAt: new Date(2015, 6, 10, 9),
			endsAt: new Date(2015, 6, 12, 21),
			editable: false,
			deletable: false,
			incrementsBadgeTotal: false
		}, {
			title: 'Milwaukee Marcus Amphitheater',
			type: 'special',
			startsAt: new Date(2015, 6, 14, 12),
			endsAt: new Date(2015, 6, 15, 15),
			editable: false,
			deletable: false,
			incrementsBadgeTotal: false
		}];

		// Events Map
		var mapData = {
			origin: {
				latitude: 37.407,
				longitude: -122.1
			},
			zoomLevel: 15,
			annotations: [{
				title: 'Hartford United States XL Center.',
				latitude: 37.407,
				longitude: -122.1
			}, {
				title: 'Trenton Sun National Bank Center.',
				latitude: 37.41,
				longitude: -122.1
			}]
		};

		return {
			initSettings: function() {
				return $q.when(settings);
			},
			getSettings: function() {
				return settings;
			},
			getMapData: function() {
				return $q.when(mapData);
			},
			getEvents: function() {
				return $q.when(events);
			}
		};
	}
})();
