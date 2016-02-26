(function() {
	'use strict';

	angular
		.module('musicband.map')
		.controller('MapController', MapController);

	MapController.$inject = ['$scope', 'mapData'];

	/* @ngInject */
	function MapController($scope, mapData) {
		var vm = angular.extend(this, {
			origin: {
				lat: mapData.origin.latitude,
				lon: mapData.origin.longitude
			},
			zoom: mapData.zoomLevel,
			markers: []
		});

		(function activate() {
			createAnnotations();
		})();
		// ***************************************************************

		function createAnnotations() {
			var markers = [];
			for (var i = 0; i < mapData.annotations.length; i++) {
				var annotation = mapData.annotations[i];
				markers.push({
					name: annotation.title,
					lat: annotation.latitude,
					lon: annotation.longitude
				});
			}
			vm.markers = markers;
		}
	}
})();