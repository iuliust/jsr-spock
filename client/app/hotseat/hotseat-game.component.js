import angular from 'angular';

import templateUrl from './hotseat-game.component.html';

class HotseatGameController {
	constructor(hotseatGameService) {
		'ngInject';

		this.hotseatGameService = hotseatGameService;
	}

	$onInit() {
		this.game = new this.hotseatGameService({
			playerNames: ['player1', 'player2'],
			players: ['51512v', 'snqf541za5f'],
			history: [],
			curMoves: [null, null],
			scores: [0, 0],
			winner: null
		});
	}
}

angular.module('spockApp')
	.component('hotseatGame', {
		templateUrl,
		controllerAs: 'vm',
		controller: HotseatGameController
	});
