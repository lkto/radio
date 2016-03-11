(function() {
	'use strict';

	angular
		.module('musicband.common')
		.factory('appSettings', appSettings);

	appSettings.$inject = ['ENV', '$injector'];

	/* @ngInject */
	function appSettings(ENV, $injector) {
		switch(ENV.settingsSource) {
			case 'LOCAL':
				return $injector.get('localAppSettings');
			case 'FIREBASE':
				return $injector.get('firebaseAppSettings');
			case 'PARSE':
				return $injector.get('parseAppSettings');
		}
		
		throw new Error('Setting source is not valid');
	}
})();
