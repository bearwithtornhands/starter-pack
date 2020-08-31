import $ from 'jquery';
import setViewportUnits from './helpers/viewportUnits';

import inputVisited from './plugins/inputVisited';
import selects from './plugins/selects';
import predictiveSelects from './plugins/predictive-selects';

import example from './plugins/example';

$(() => {
	setViewportUnits();

	inputVisited();
	selects();
	predictiveSelects();

	example();
});
