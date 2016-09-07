import angular from 'angular';

import templateUrl from './online-game.component.html';

import { SpockGames } from '../../../imports/api/spockGames';

class OnlineGameController {
	constructor($reactive, $scope, onlineGame) {
		'ngInject';

		var firstTime = true;

		$reactive(this).attach($scope);
		this.subscribe('spockGames', () => [{
			_id: this.gameId
		}]);

		this.onlineGameService = onlineGame;

		this.helpers({
			gameData() {
				if (firstTime) {
					this.game = new this.onlineGameService();
				}
				let g = SpockGames.findOne({_id: this.gameId});
				// console.log('g', g);
				return g;
			}
		});
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
		// SpockGames.findOne(this.gameId, ())
	}
}

angular.module('spockApp')
	.component('onlineGame', {
		templateUrl,
		bindings: {
			gameId: '<'
		},
		controllerAs: 'vm',
		controller: OnlineGameController
	});
