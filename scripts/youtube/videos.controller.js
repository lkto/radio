(function() {
	'use strict';

	angular
		.module('musicband.youtube')
		.controller('VideosController', VideosController);

	VideosController.$inject = ['$scope', '$state', '$ionicPopup', 'youtubeService', 'appSettings'];

	/* @ngInject */
	function VideosController($scope, $state, $ionicPopup, youtubeService, appSettings) {
		var youtubeUsername = appSettings.getSettings().youtubeUser;

		var vm = angular.extend(this, {
			videos: [],
			doRefresh: doRefresh,
			navigate: navigate
		});

		(function activate() {
			getVideos();
		})();
		// ********************************************************************

		function getVideos() {
			return youtubeService.getVideos(youtubeUsername)
				.then(function(videos) {
					vm.videos = videos;
				}, function() {
					$ionicPopup.alert({
						title: 'No videos',
						template: 'No videos to display fount'
					});
				});
		}

		function doRefresh() {
			getVideos().then(function(items) {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}

		function navigate(video) {
			$state.go('app.video', {
				videoId: video.id
			});
		}
	}
})();
