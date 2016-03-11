(function() {
	'use strict';

	angular
		.module('musicband.facebook')
		.factory('facebookService', facebookService);

	facebookService.$inject = ['$http', '$q', '_', 'ENV'];

	/* @ngInject */
	function facebookService($http, $q, _, ENV) {
		var apiUrl = 'https://graph.facebook.com/v2.3/';

		var service = {
			getAlbums: getAlbums,
			getAlbumPhotos: getAlbumPhotos
		};
		return service;

		// ***********************************************************

		function getParams(pageId) {
			return {
				params: {
					'access_token': ENV.facebookPermanentAccessToken,
					format: 'json'
				}
			};
		}

		function getAlbumPhotos(pageId, albumId, url) {
			url = url || apiUrl + albumId + '/photos';
			return $http.get(url, getParams(pageId)).then(function(result) {
				return result.data;
			});
		}

		function getAlbums(pageId) {
			var params = getParams(pageId);

			return $http.get(apiUrl + pageId + '/albums', params).then(function(result) {
				var albums = [];
				_.each(result.data.data, function(album) {
					if (album['cover_photo']) {
						album.cover = apiUrl + album['cover_photo'];
						album.cover = album.cover + '/picture?access_token=' + ENV.facebookPermanentAccessToken;
						albums.push(album);
					}
				});

				return albums;
			});
		}
	}
})();
