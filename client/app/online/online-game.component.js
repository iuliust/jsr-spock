import angular from 'angular';

import templateUrl from './online-game.component.html';

class OnlineGameController {
	constructor(onlineGameService, $reactive, $scope) {
		'ngInject';

		$reactive(this).attach($scope);
		this.subscribe('spockGameDetail');
		this.helpers({
			game() {
				return SpockGames.find(this.gameId);
			}
		});
		this.onlineGameService = onlineGameService;
	}

	$onInit() {
		// let GDO = {
		// 	owner: string,
		// 	players: [string, string],
		// 	history: [string, string][],
		// 	curMoves: [string, string],
		// 	scores: [number, number],
		// 	winner: string
		// };
		this.game = new this.onlineGameService();
	}
}

angular.module('spockApp')
	.component('onlineGame', {
		templateUrl,
		bindings: {
			gameId: '>'
		},
		controllerAs: 'vm',
		controller: OnlineGameController
	});
