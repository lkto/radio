

.controller('StreamController', function (StreamController,$interval, appSettings, streamService){

	var isPlaying = false;
	var stream;
	var timer;

	/* @ngInject */
	function StreamController($interval, appSettings, streamService) {
		var audioStream = appSettings.getSettings().audioStream;
		var hasAudioStreamMeta = appSettings.getSettings().hasAudioStreamMeta;
		var vm = angular.extend(this, {
			togglePlay: togglePlay,
			isPlaying: isPlaying,
			info: null
		});

		// ********************************************************************

		function togglePlay() {
			if (vm.isPlaying) {
				pause();
			} else {
				play();
			}

			vm.isPlaying = isPlaying = !isPlaying;
		}

		function play() {
			if (window.Stream) {
				stream = new window.Stream(audioStream);
				// Play audio
				stream.play();
				console.log("ff");
			}
			
			getStreamInfo();
			timer = $interval(function() {
				getStreamInfo();
			}, 5000);
		}

		function pause() {
			vm.info = null;
			$interval.cancel(timer);

			if (!stream) {
				return;
			}

			stream.stop();
		}

		function getStreamInfo() {
			streamService.getStreamInfo().then(function(info) {
				vm.info = info;
			}, function() {
				vm.info = null;
			});
		}
	}

}

