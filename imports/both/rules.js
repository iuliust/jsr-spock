export class Rules {
	constructor() {}

	static get possibleMoves() {
		return [ 'spock', 'cissors', 'paper', 'rock', 'lizard'];
	}

	static isLegalMove(move) {
		return this.possibleMoves.indexOf(move) !== -1;
	}

	static getMessage(move1, move2) {
		var indexMove1 = this.possibleMoves.indexOf(move1);
		var indexMove2 = this.possibleMoves.indexOf(move2);
		if (indexMove1 == -1 || indexMove2 == -1) {
			throw new Error('One of the players played an illegal move');
		}

		let message = '';
		if (indexMove1 === indexMove2) {
			message = 'Égalité';
		} else if (indexMove1 == (indexMove2 + 4) % 5) {
			switch (move1) {
				case 'rock':
					message = 'la pierre écrase le lézard';
					break;
				case 'paper':
					message = 'la feuille recouvre la pierre';
					break;
				case 'cissors':
					message = 'les ciseaux coupent la feuille';
					break;
				case 'spock':
					message = 'spock casse les ciseaux';
					break;
				case 'lizard':
					message = 'le lézard empoisonne Spock';
					break;
				default:
					throw new Error(`on n'est pas censé atteindre cette partie du switch`);
			}
		} else if (indexMove1 == (indexMove2 + 2) % 5) {
			switch (move1) {
				case 'rock':
					message = 'la pierre émousse les ciseaux';
					break;
				case 'paper':
					message = 'la feuille discrédite Spock';
					break;
				case 'cissors':
					message = 'les ciseaux décapitent le lézard';
					break;
				case 'spock':
					message = 'Spock vaporise la pierre';
					break;
				case 'lizard':
					message = 'le lézard mange la feuille';
					break;
				default:
					throw new Error(`on n'est pas censé atteindre cette partie du switch`);
			}
		} else {
			message = this.getMessage(move2, move1);
		}
		return message;
	}

	static compare(move1, move2) {
		var iMove1 = this.possibleMoves.indexOf(move1);
		var iMove2 = this.possibleMoves.indexOf(move2);
		if (iMove1 == -1 || iMove2 == -1) {
			throw new Error('One of the players played an illegal move');
		}

		// les verbes n'ont pas d'importance dans le gameplay,
		// même s'ils sont amusants. L'important, c'est le
		// résultat.
		switch (iMove1 - iMove2) {
			case 0:
				console.info('draw.');
				return 0;
			case -1:
			case -3:
			case 2:
			case 4:
				console.info(this.getMessage(move1, move2));
				return 1;
			case -2:
			case -4:
			case 1:
			case 3:
				console.info(this.getMessage(move2, move1));
				return -1;
			default:
				throw new Error('Something went wrong during the evaluation of the round');
				break;
		}
	}
};
