import angular from 'angular';

angular.module('spockApp')
	.controller('MainController', MainController);

function MainController($mdSidenav, $state) {
	'ngInject';

	this.openLeftMenu = () => $mdSidenav('left').toggle();
	this.openLeftMenuLink = (sref) => {
		$state.go(sref)
		.then(() => $mdSidenav('left').close())
	};
	this.links = [{
		sref: 'spock.hotseat',
		text: 'Hot seat'
	}, {
		sref: 'spock.create',
		text: 'Nouvelle partie en ligne'
	}, {
		sref: 'spock.parties',
		text: 'Parties en cours'
	}];
}
