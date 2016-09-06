import angular from 'angular';

import { Rules } from '../../../imports/both/rules';

angular.module('spockApp')
	.factory('rulesService', rulesServiceFactory);

function rulesServiceFactory() {
	// console.log(Rules.compare('rock', 'cissors'));
	return Rules;
}
