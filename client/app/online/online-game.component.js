import angular from 'angular';

import templateUrl from './online-game.component.html';

class OnlineGameController {
	constructor($reactive, $scope, onlineGame) {
		'ngInject';

		$reactive(this).attach($scope);
		this.subscribe('spockGameDetail');
		this.helpers({
			spockGameDetail() {
				console.info(this.gameId);
				return SpockGames.findOne(this.gameId);
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
