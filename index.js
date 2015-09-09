"use strict";

module.exports = function (tasks) {

	tasks.addTask({
		filter: {
			type: 'Function',
			name: 'calc'
		},
		fn: function (fn) {
			resolve(fn);
		}
	});

	tasks.addTask({
		filter: 'Expression',
		fn: function (expression) {
			resolve(expression);
		}
	});

	function resolve (element) {
		var mainUnit, units = element.getAll('Unit');

		//Check the unit used in this function
		units.forEach(function (unit) {
			if (mainUnit === false) {
				return;
			}

			if (mainUnit === undefined) {
				mainUnit = unit.name;
			} else if (mainUnit !== unit.name) {
				mainUnit = false;
			}
		});

		//There are more than one unit
		if (mainUnit === false) {
			return;
		}

		//Replace all units by its numbers
		units.forEach(function (unit) {
			var number = unit.get('Number');

			if (unit.name === '%') {
				number.name *= 0.01;
			}

			unit.replaceWith(unit.get('Number'));
		});

		var number = eval(element.join(' '));

		if (mainUnit === undefined) {
			element.replaceWithCode(number.toFixed(2), 'Number');
		} else if (mainUnit === '%') {
			element.replaceWithCode((number *= 100).toFixed(2) + '%', 'Unit');
		} else {
			element.replaceWithCode(number.toFixed(2) + mainUnit, 'Unit');
		}
	}
};
