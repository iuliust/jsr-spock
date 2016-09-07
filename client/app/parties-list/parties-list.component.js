import angular from 'angular';
import { Meteor } from 'meteor/meteor';

import templateUrl from './parties-list.component.html';
import { SpockGames } from '../../../imports/api/spockGames';

class PartiesListController {
	constructor($scope, $reactive, $log, $state) {
		'ngInject';

		$reactive(this).attach($scope);

		this.$log = $log;
		this.$state = $state;

		this.subscribe('spockGames', () => [{}]);

		this.helpers({
			spockGames() {
				return SpockGames.find({}, {});
			}
		});
	}

	joinGame(gameId) {
		Meteor.call('joinGame', gameId, (err, result) => {
			if (err) {
				$log.error(err);
			} else {
				this.$state.go('spock.onlineGame', {gameId});
			}
		});
	}

	removeGame(gameId) {
		SpockGames.remove(gameId);
	}
}

angular.module('spockApp')
	.component('partiesList', {
		templateUrl,
		controllerAs: 'vm',
		controller: PartiesListController
	});
