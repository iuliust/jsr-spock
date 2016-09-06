import angular from 'angular';

angular.module('spockApp')
	.factory('hotseatGameService', hotseatGameServiceFactory);

function hotseatGameServiceFactory($timeout, rulesService, gameService, $mdToast) {
	'ngInject';

	return class HotseatGameService extends gameService{
		constructor(gameDescriptionObject) {
			super(gameDescriptionObject);
			this.displayMoves = false;
			this.canPlay = true;
			this.curPlayerIndex = 0;
		}

		get curPlayer() {
			return this.players[this.curPlayerIndex];
		}

		isCurPlayer(playerId) {
			return this.curPlayer === playerId;
		}

		declareChoice(move) {
			// if (! this.canPlay) {
			// 	throw new Error("Can't play right now.");
			// }
			this.curMoves[this.curPlayerIndex] = move;
			// this.displayMoves = true;

			// si (tous les joueurs ont joué lors de ce round)
			if (this.curMoves.every(m => m !== null)) {
				let result = rulesService.compare(this.curMoves[0], this.curMoves[1]);
				$mdToast.show($mdToast.simple().textContent(rulesService.getMessage(this.curMoves[0], this.curMoves[1])));
				
				switch (result) {
					case 1:
						this.scores[0]++;
						break;
					case -1:
						this.scores[1]++;
						break;
				}
				this.history.push(this.curMoves);
				this.curMoves = [null, null];

			} else {
				// si c'est le joueur 1
			}
			this.switchPlayer();
			this.displayMoves = false;
		}

		switchPlayer() {
			this.curPlayerIndex = (this.curPlayerIndex + 1 ) % 2;
		}
	}
}
