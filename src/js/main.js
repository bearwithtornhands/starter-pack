import $ from 'jquery';
import setViewportUnits from './helpers/viewportUnits';

import example from './plugins/example';
import selects from './plugins/selects';

$(() => {
	setViewportUnits();
	example();
	selects();
});
