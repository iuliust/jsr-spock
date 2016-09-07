import angular from 'angular';
import 'angular-ui-router.statehelper';

angular.module('spockApp')
	.config(configRoutes);

function configRoutes(stateHelperProvider, $urlRouterProvider) {
	'ngInject';

	stateHelperProvider.state({
		name: 'spock',
		url: '/spock',
		template: `<ui-view flex-xs="100" flex-sm="100" flex-md="100" flex-lg="60"></ui-view>`,
		children: [{
			name: 'hotseat',
			url: '/hotseat',
			template: `<hotseat-game></hotseat-game>`
		}, {
			name: 'create',
			url: '/create',
			template: `
				<create-party></create-party>`
		}, {
			name: 'parties',
			url: '/parties',
			template: `
				<parties-list layout-padding></parties-list>
			`
		}, {
			name: 'onlineGame',
			url: '/parties/:gameId',
			template: `
				<online-game game-id="vm.$stateParams.gameId"></online-game>
			`,
			controllerAs: 'vm',
			controller: function($stateParams) {
				'ngInject';

				this.$stateParams = $stateParams;
			}
		}]
	});

	$urlRouterProvider.otherwise('/spock/hotseat');
}
