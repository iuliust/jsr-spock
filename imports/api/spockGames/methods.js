// import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { SpockGames } from './collection';
import { Rules } from '../../both/rules';


function getContactEmail(user) {
	if (user.emails && user.emails.length)
		return user.emails[0].address;

	return null;
}

export function createGame(game) {
	if (!this.userId) {
		throw new Meteor.Error(403, 'You must be logged in to create a partaaaay.');
	}

	SpockGames.insert({
		title: game.title,
		owner: this.userId,
		players: [this.userId],
		history: [],
		curMoves: []
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

	if (game.players.length > 1) {
		throw new Meteor.Error(403, `Already two players in there :-/ Please join another game.`);
	}

	SpockGames.update(gameId, {
		$addToSet: {players: this.userId}
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

	const game = SpockGames.findOne({_id: gameId});

	if (!game) {
		throw new Meteor.Error(400, `Partaaaay not found. :'-(`);
	}

	
}


Meteor.methods({
	createGame,
	declareMove,
	joinGame
});
