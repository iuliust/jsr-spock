import angular from 'angular';
import { Meteor } from 'meteor/meteor';

import templateUrl from './create-party.component.html';
import { SpockGames } from '../../../imports/api/spockGames';

class CreatePartyController {
	constructor($state, $log) {
		'ngInject';

		this.$state = $state;
		this.$log = $log;
	}

	$onInit() {
		this.reset();
	}

	submit() {
		this.newGame.owner = Meteor.user()._id;

		Meteor.call('createGame', this.newGame, (err, gameId) => {
			// console.log(`gameId: ${gameId}`);
			this.$state.go('spock.onlineGame', {gameId: gameId});
		});

		this.reset();
	}

	reset() {
		this.newGame = {};
	}
}

angular.module('spockApp')
	.component('createParty', {
		templateUrl,
		controllerAs: 'vm',
		controller: CreatePartyController
	});
