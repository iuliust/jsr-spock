import angular from 'angular';

import templateUrl from './gauge.component.html';

angular.module('spockApp')
	.component('gauge', {
		bindings: {
			value: '>',
			max: '>'
		},
		controllerAs: 'vm',
		controller: class GaugeController {}
	});
