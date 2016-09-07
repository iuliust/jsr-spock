import { Meteor } from 'meteor/meteor';

import { SpockGames } from './collection';

if (Meteor.isServer) {
	Meteor.publish('spockGames', () => {
		return SpockGames.find({}, {});
	});

	Meteor.publish('spockGameDetail', (gameId) => {
		return SpockGames.findOne(gameId);
	});
}
