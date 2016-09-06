import { Rules } from './rules';

class Partay {
	/*
{
	_id: string,
	owner: string,
	players: [string, string],
	history: [string, string][],
	curMoves: [string, string],
	scores: [number, number],
	winner: string
}
	*/
	constructor(partayDefinitionObject) {
		this.game = partayDefinitionObject;
	}

	isOwner(userId) {
		return userId === this.game.owner;
	}

	isPlayer(userId) {
		return this.indexUser(userId) !== -1;
	}

	indexUser(userId) {
		return this.game.players.indexOf(userId);
	}

	canPlay(userId) {
		if (!this.userId) {
			throw new Meteor.Error('not connected');
		}

		let indexUser = this.indexUser(userId);
		if (indexUser === -1) {
			throw new Meteor.Error(`you're not one of the players`);
		}
		return this.game.curMoves[indexUser] === null;
	}

	playMove(move) {
		if (! this.canPlay(this.userId)) {
			throw new Meteor.Error(`Please wait for the other player...`);
		}

		if (! Rules.isLegalMove(move)) {
			throw new Meteor.Error(`Your choice must be one of the following : 'spock', 'cissors', 'paper', 'rock' or 'lizard'`);
		}

		if (this.game.winner) {
			throw new Meteor.Error(`The game is over.`);
		}

		this.game.curMoves[this.indexUser] = move;

		if (this.game.curMoves.every(m => m !== null)) {
			this.history.push(this.game.curMoves);
			let résultat = Rules.compare(this.game.curMoves[0], this.game.curMoves[1]);
			switch (résultat) {
				case 1:
					this.game.scores[0] += 1;
					break;
				case -1:
					this.game.scores[1] += 1;
					break;
			}
			let max = Math.max(...this.game.scores);
			if (max >= 10) {
				let indexWinner = this.game.scores.indexOf(max);
				this.game.winner = this.game.players[indexWinner];
			}
			this.game.curMoves = [null, null];

			SpockGames.update(this.game._id, {
				$addToSet: {
					history: this.game.curMoves
				},
				$set: {
					curMoves: [null, null],
					scores: this.game.scores,
					winner: this.game.winner
				}
			});
		} else {
			SpockGames.update(this.game._id, {
				$set: {
					curMoves: this.game.curMoves
				}
			});
		}

	}
}
