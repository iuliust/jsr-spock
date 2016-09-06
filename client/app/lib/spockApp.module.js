import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import 'angular-ui-router.statehelper';

const name = 'spockApp';

// l'emplacement de ce fichier est absolument stupide, mais c'est
// malheuresement la solution la plus simple pour que ce crétin de
// meteor ne charge pas le module en dernier.

export default angular.module('spockApp', [
	uiRouter,
	angularMeteor,
	'ui.router.stateHelper',
	ngMaterial,
	'accounts.ui'
]);
