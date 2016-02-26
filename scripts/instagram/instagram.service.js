(function() {
	'use strict';

	angular
		.module('musicband.instagram')
		.factory('instagramService', instagramService);

	instagramService.$inject = ['$http', 'ENV', 'appSettings'];

	/* @ngInject */
	function instagramService($http, ENV, appSettings) {
		var instagramTag = appSettings.getSettings().instagramTag;
		var nextPageUrl = null;

		var service = {
			getRecentMedia: getRecentMedia,
			getMoreRecentMedia: getMoreRecentMedia
		};
		return service;

		// ***********************************************************

		function getRecentMedia(url) {
			url = url || buildUrl();

			return $http.get(url).then(function(result) {
				nextPageUrl = result.data.pagination['next_url'];

				return {
					items: result.data.data,
					canLoadMore: !!nextPageUrl
				};
			});
		}

		function getMoreRecentMedia() {
			return getRecentMedia(nextPageUrl);
		}

		function buildUrl() {
			var url = 'https://api.instagram.com/v1/tags/' + instagramTag + '/media/recent';
			return url + '?client_id=' + ENV.instagramAppId;
		}
	}
})();
