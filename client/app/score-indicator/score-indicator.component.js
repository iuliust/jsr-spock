import angular from 'angular';

import templateUrl from './score-indicator.component.html';

class ScoreIndicatorController {
	constructor($timeout) {
		'ngInject'

		this.$timeout = $timeout;
		this.changed = false;
	}

	$onChanges(changes) {
		if (changes.score) {
			if (!changes.score.isFirstChange()) {
				this.changed = true;
				this.$timeout(400)
					.then(() => {
						this.changed = false;
					});
			}
		}
	}
}

angular.module('spockApp')
	.component('scoreIndicator', {
		bindings: {
			score: "<"
		},
		controllerAs: 'vm',
		controller: ScoreIndicatorController,
		templateUrl
	});
