import angular from 'angular';

import templateUrl from './game-board.component.html';

class GameBoardController {
	constructor(rulesService) {
		'ngInject';

		this.rulesService = rulesService;
	}

	// vaut mieux faire l'initialisation dans $onInit pour nos tests
	$onInit() {
		this.parameters = {
			size: 500,
			padding: 50,
			radius: 50,
			possibleMoves: this.rulesService.possibleMoves,
			colors: ['grey', 'goldenrod', 'purple', 'forestgreen', 'lightskyblue'],
			labels: ['Spock', 'Ciseaux', 'Feuille', 'Pierre', 'Lézard']
		};

		this.circles = this.calculateCoordinates(
			this.parameters.size,
			this.parameters.padding,
			this.parameters.radius
		);
	}

	calculateCoordinates(size, padding, radius) {
		const numberOfCircles = 5;
		let circles = [0, 1, 2, 3, 4].map(i => {
			return {
				// (on ajoute pi/2 histoire d'avoir un disque en haut, placé esthétiquement)
				x: Math.cos(2 * i * Math.PI / numberOfCircles - Math.PI / 2) * (size / 2 - padding - radius) + (size / 2),
				y: Math.sin(2 * i * Math.PI / numberOfCircles - Math.PI / 2) * (size / 2 - padding - radius) + (size / 2),
				arrows: [],
				color: this.parameters.colors[i],
				move: this.parameters.possibleMoves[i],
				label: this.parameters.labels[i]
			};
		});

		for (let i = 0, j = 1, k = 3; i < numberOfCircles; i++, j = (j + 1) % numberOfCircles, k = (k + 1) % numberOfCircles) {
			circles[i].arrows.push(
				[
					translatePointTowardsTarget(circles[i], circles[j], radius + 10),
					translatePointTowardsTarget(circles[j], circles[i], radius + 20)
				], [
					translatePointTowardsTarget(circles[i], circles[k], radius + 10),
					translatePointTowardsTarget(circles[k], circles[i], radius + 20),
				]
			);
		}

		return circles;

		///////////////

		function translatePointTowardsTarget(point1, point2, distance) {
			let theta = getAngle(point1, point2);

			return {
				x: point1.x + (distance * Math.cos(theta)),
				y: point1.y + (distance * Math.sin(theta))
			}
		}

		function distanceBetween(point1, point2) {
			return ((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2) ** .5;
		}

		function getAngle(point1, point2) {
			const diffX = point2.x - point1.x,
				diffY = point2.y - point1.y;
			return Math.atan2(diffY, diffX);
		}
	}
}

angular.module('spockApp')
	.component('gameBoard', {
		templateUrl,
		transclude: true,
		bindings: {
			onChoose: '&',
			gameState: '='
		},
		controllerAs: 'vm',
		controller: GameBoardController
	});
