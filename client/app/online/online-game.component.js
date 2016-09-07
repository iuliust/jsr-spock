import angular from 'angular';
import { Meteor } from 'meteor/meteor';

import templateUrl from './online-game.component.html';

import { SpockGames } from '../../../imports/api/spockGames';

class OnlineGameController {
	constructor($reactive, $scope, onlineGame) {
		'ngInject';

		$reactive(this).attach($scope);
		this.subscribe('spockGames', () => [{
			_id: this.gameId
		}]);

		this.onlineGameService = onlineGame;

		this.autorun(() => {
			this.user = Meteor.user();
		});

		this.helpers({
			gameData() {
				let g = SpockGames.findOne({_id: this.gameId});
				return new this.onlineGameService(g);
			}
		});
	}

	$onInit() { }

	declareMove(move) {
		Meteor.call('declareMove', this.gameId, move, (err, gameId) => {
		});
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
