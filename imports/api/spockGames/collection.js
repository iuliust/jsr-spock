import { Mongo } from 'meteor/mongo';

export const SpockGames = new Mongo.Collection('spockGames');

// type Move =  'rock' | 'paper' | 'cissors' | 'lizard' | 'spock';

SpockGames.allow({
	// insert(userId, spockGame) {
	// 	return userId && spockGame.owner === userId;
	// },
	// update(userId, spockGame, fields, modifier) {
	// 	return userId && spockGame.owner === userId;
	// },
	remove(userId, spockGame) {
		return userId && spockGame.owner === userId;
	}
});
