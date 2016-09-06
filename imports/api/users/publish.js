import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
	Meteor.publish('users', () => {
		return Meteor.users.find({}, {
			fields: {
				emails: 1,
				profile: 1
			}
		});
	});
}
