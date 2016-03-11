

.factory('streamService', function($http,$q,appSettings){

	/* @ngInject */
	function streamService($http, $q, appSettings) {
		var streamUrl = appSettings.getSettings().audioStream;
		var metadataUrl = streamUrl + '7.html';
		var contentRegex = /<body>(.*)<\/body>/;
		var itunesSearchUrl = 'https://itunes.apple.com/search?term=';
		var resolutionRegex = /100x100/;
		var config = {
			skipSpinner: true
		};

		var service = {
			getStreamInfo: getStreamInfo
		};
		return service;

		// ****************************************************************************

		function getStreamInfo() {
			return $http.get(metadataUrl, config).then(function(response) {
				var title = parseShoutcastResponse(response.data);
				if (!title) {
					return {};
				}

				return getCover(title).then(function(coverUrl) {
					return {
						title: title,
						coverUrl: coverUrl
					};
				});
			});
		}

		function getCover(title) {
			return $http.get(itunesSearchUrl + title, config).then(function(response) {
				var item = response.data.results[0];
				if (!item || !item.artworkUrl100) {
					return null;
				}
				
				return item.artworkUrl100.replace(resolutionRegex, '500x500');
			});
		}

		function parseShoutcastResponse(html) {
			var content = html.match(contentRegex)[1];
			var parts = content.split(',');
			if (parts.length < 7 || !parts[6]) {
				return null;
			}
			return parts[6];
		}
	}
})

