import angular from 'angular';

angular.module('spockApp')
	.factory('gameService', gameServiceFactory);

function gameServiceFactory() {

	return class GameService {
		constructor(gameDescriptionObject) {
			angular.extend(this, gameDescriptionObject);
		}

		isSelected(move) {
			return this.curMoves.indexOf(move) !== -1;
		}

		static playDingSound(frequency) {
			var audioContext = window.AudioContext || window.webkitAudioContext;
			var context = new audioContext();

			var osc = context.createOscillator();
			osc.frequency.value = frequency;

			osc.connect(context.destination);
			osc.start(0);
			osc.stop(.2);
		}
	}
}
