// import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { SpockGames } from './collection';
import { Rules } from '../../both/rules';
import { Partay } from '../../both/partay';


function getContactEmail(user) {
	if (user.emails && user.emails.length)
		return user.emails[0].address;

	return null;
}

export function createGame(game) {
	if (!this.userId) {
		throw new Meteor.Error(403, 'You must be logged in to create a partaaaay.');
	}

	return SpockGames.insert({
		title: game.title,
		owner: this.userId,
		playerIds: [this.userId],
		playerNames: [Meteor.user().emails[0].address],
		history: [],
		curMoves: [null, null],
		scores: [0, 0],
		winner: null
	});
}

export function joinGame(gameId) {
	check(gameId, String);

	if (!this.userId) {
		throw new Meteor.Error(403, 'You must be logged in to join a partaaaay.');
	}

	const game = SpockGames.findOne({ _id: gameId });

	if (!game) {
		throw new Meteor.Error(404, `Partaaaay not found. :'-(`);
	}

	if (game.playerIds.length > 1 && !game.playerIds.some(p => p === this.userId)) {
		throw new Meteor.Error(403, `Already two players in there :-/ Please join another game.`);
	}

	SpockGames.update({_id: gameId}, {
		$addToSet: {
			playerIds: this.userId,
			playerNames: getContactEmail(Meteor.user())
		}
	}, (err) => {
		if (err) {
			throw new Meteor.Error(500, `Couldn't change the database : ${err}`);
		}
	});
}

export function declareMove(gameId, move) {
	check(gameId, String);
	check(move, String);

	if (!this.userId) {
		throw new Meteor.Error(403, 'You must be logged in to RSVP');
	}

	if ([ 'rock', 'paper', 'cissors', 'lizard', 'spock'].indexOf(move) === -1) {
		throw new Meteor.Error(400, `Illegal move. Expected 'rock' | 'paper' | 'cissors' | 'lizard' | 'spock', got ${move}.`);
	}

	const gameData = SpockGames.findOne({_id: gameId});

	if (!gameData) {
		throw new Meteor.Error(400, `Partaaaay not found. :'-(`);
	}

	const game = new Partay(gameData);

	game.playMove(move);
}


Meteor.methods({
	createGame,
	declareMove,
	joinGame
});
