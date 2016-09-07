import { Rules } from './rules';

export class Partay {
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
		Object.assign(this, partayDefinitionObject);
	}

	isOwner(userId) {
		return userId === this.owner;
	}

	isPlayer(userId) {
		return this.indexUser(userId) !== -1;
	}

	getUserIndex(userId) {
	// indexUser(userId) {
		return this.playerIds.indexOf(userId);
	}

	canPlay() {
		if (!this.userId) {
			throw new Meteor.Error('not connected');
		}

		let userIndex = this.getUserIndex(this.userId);
		if (userIndex === -1) {
			throw new Meteor.Error(`you're not one of the players`);
		}
		if (this.playerIds.length === 1) {
			return false;
		}
		return this.curMoves[userIndex] === null;
	}

	playMove(move) {
		if (! this.canPlay(this.userId)) {
			throw new Meteor.Error(`Please wait for the other player...`);
		}

		if (! Rules.isLegalMove(move)) {
			throw new Meteor.Error(`Your choice must be one of the following : 'spock', 'cissors', 'paper', 'rock' or 'lizard'`);
		}

		if (this.winner) {
			throw new Meteor.Error(`The game is over.`);
		}

		this.curMoves[this.getUserIndex(this.userId)] = move;

		if (this.curMoves.every(m => m !== null)) {
			this.history.push(this.game.curMoves);
			let résultat = Rules.compare(this.curMoves[0], this.curMoves[1]);
			switch (résultat) {
				case 1:
					this.scores[0]++;
					break;
				case -1:
					this.scores[1]++;
					break;
			}
			let max = Math.max(...this.scores);
			if (max >= 10) {
				let indexWinner = this.scores.indexOf(max);
				this.winner = this.playerIds[indexWinner];
			}
			this.curMoves = [null, null];

			SpockGames.update(this._id, {
				$addToSet: {
					history: this.curMoves
				},
				$set: {
					curMoves: [null, null],
					scores: this.scores,
					winner: this.winner
				}
			});
		} else {
			SpockGames.update(this._id, {
				$set: {
					curMoves: this.curMoves
				}
			});
		}

	}
}
