import { Meteor } from 'meteor/meteor';

import { SpockGames } from './collection';

if (Meteor.isServer) {
	Meteor.publish('spockGames', function(options) {
		return SpockGames.find(options, {});
	});

	// Meteor.publish('spockGameDetail', function(options) {
	// 	return SpockGames.findOne({_id: gameId});
	// });
}
