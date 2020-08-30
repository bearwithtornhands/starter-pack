import $ from 'jquery';
import setViewportUnits from './helpers/viewportUnits';

import selects from './plugins/selects';
import inputVisited from './plugins/inputVisited';

import example from './plugins/example';

$(() => {
	setViewportUnits();

	inputVisited();
	selects();

	example();
});
