import angular from 'angular';

import { Partay } from '../../../imports/both/partay';

angular.module('spockApp')
	.factory('onlineGame', onlineGameServiceFactory)

function onlineGameServiceFactory() {
	'ngInject';

	return Partay;
	// return class OnlineGameService extends gameService {
	// 	constructor(gameDescriptionObject) {
	// 		// let [player1, player2] = [gameDescriptionObject.players[0], gameDescriptionObject.players[1]];
	// 		super('player1Name', 'player2Name');
	// 		this.roomId = roomId;
	// 	}
	//
	// 	canPlay() {
	// 		const indexPlayer = this.game.players.indexOf(this.userId);
	// 		return this.game.curMoves[indexPlayer] !== null;
	// 	}
	// }
}
