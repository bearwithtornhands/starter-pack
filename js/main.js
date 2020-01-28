import $ from 'jquery';
import setViewportUnits from './helpers/viewportUnits';
import example from './plugins/example';

$(() => {
	setViewportUnits();
	example();
});
