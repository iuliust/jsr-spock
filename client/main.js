import angular from 'angular';

import { Meteor } from 'meteor/meteor';
import { name as spockAppModule } from './app/lib/spockApp.module';

// import angularMeteor from 'angular-meteor';

if (Meteor.isCordova) {
	angular.element(document).on('deviceready', onReady);
} else {
	angular.element(document).ready(onReady);
}

function onReady() {
	angular.bootstrap(document, [
		spockAppModule
	], {
		strictDi: true
	});
}
