(function() {
	'use strict';

	angular
		.module('musicband.youtube')
		.filter('youtubeEmbedUrl', youtubeEmbedUrl);

	youtubeEmbedUrl.$inject = ['$sce'];

	/* @ngInject */
	function youtubeEmbedUrl($sce) {
		return function(videoId) {
			return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + videoId);
		};
	}
})();
