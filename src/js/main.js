import $ from 'jquery';
import setViewportUnits from './helpers/viewportUnits';

import example from './plugins/example';
import selects from './plugins/selects';
import inputVisited from './plugins/inputVisited';

$(() => {
	setViewportUnits();
	example();
	inputVisited();
	selects();
});
