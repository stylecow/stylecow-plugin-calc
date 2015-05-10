module.exports = function (stylecow) {

	stylecow.addTask({
		filter: {
			type: 'Function',
			name: 'calc'
		},
		fn: function (fn) {
			resolve(fn);
		}
	});

	stylecow.addTask({
		filter: {
			type: 'Expression'
		},
		fn: function (expression) {
			resolve(expression);
		}
	});

	function resolve (element) {
		var mainUnit;
		var units = element.getAll({
			type: 'Unit'
		});

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

		var number = (new stylecow.Number()).setName(eval(element.join(' ')));

		if (mainUnit === undefined) {
			round(number);
			element.replaceWith(number);
		} else {
			var unit = (new stylecow.Unit()).setName(mainUnit);

			if (unit.name === '%') {
				number.name *= 100;
			}
			round(number);
			unit.push(number);
			element.replaceWith(unit);
		}
	}

	function round (number) {
		number.name = parseFloat(number.name.toFixed(2));
	}
};
