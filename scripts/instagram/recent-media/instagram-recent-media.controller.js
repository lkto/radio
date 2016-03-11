(function() {
	'use strict';

	angular
		.module('musicband.instagram')
		.controller('InstagramRecentMediaController', InstagramRecentMediaController);

	InstagramRecentMediaController.$inject = ['$scope', 'instagramService', '$http', 'appSettings'];

	/* @ngInject */
	function InstagramRecentMediaController($scope, instagramService, $http, appSettings) {
		var vm = angular.extend(this, {
			mediaList: [],
			doRefresh: doRefresh,
			loadMore: loadMore,
			canLoadMore: false,
			windowTitle: '#' + appSettings.getSettings().instagramTag
		});

		(function activate() {
			getRecentMedia();
		})();

		// ********************************************************************

		function getRecentMedia() {
			return instagramService.getRecentMedia().then(function(data) {
				vm.canLoadMore = data.canLoadMore;
				vm.mediaList = data.items;
			});
		}

		function loadMore() {
			return instagramService.getMoreRecentMedia().then(function(data) {
				vm.canLoadMore = data.canLoadMore;
				vm.mediaList = vm.mediaList.concat(data.items);
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}

		function doRefresh() {
			getRecentMedia().then(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
	}
})();
