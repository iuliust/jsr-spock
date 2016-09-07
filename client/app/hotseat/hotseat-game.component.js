import angular from 'angular';

import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import templateUrl from './hotseat-game.component.html';

class HotseatGameController {
	constructor($timeout, hotseatGame, $reactive, $scope) {
		'ngInject';

		$reactive(this).attach($scope);
		// this.user = this.subscribe('users')
		// $timeout(300).then(this.user = this.getUserEmailAddress());

		this.hotseatGame = hotseatGame;

		this.autorun(() => {
			this.user = Meteor.user();
			this.start();
		});

	}

	getUserEmailAddress() {
		if (this.user) {
			return this.user.emails[0].address;
		}
	}

	start() {
		this.game = new this.hotseatGame({
			playerNames: ['hôte', 'invité'],
			playerIds: ['51512v', 'snqf541za5f'],
			history: [],
			curMoves: [null, null],
			scores: [0, 0],
			winner: null
		});
	}

	$onInit() {
	}
}

angular.module('spockApp')
	.component('hotseatGame', {
		templateUrl,
		controllerAs: 'vm',
		controller: HotseatGameController
	});
