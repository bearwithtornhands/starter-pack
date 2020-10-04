import $ from 'jquery';

import setViewportUnits from './helpers/viewportUnits';

import inputVisited from './plugins/inputVisited';
import mask from './plugins/mask';
import selects from './plugins/selects';
import predictiveSelects from './plugins/predictive-selects';
import accordeons from './plugins/accordeons';
import tabs from './plugins/tabs';
import popups from './plugins/popups';

$(() => {
	setViewportUnits();

	inputVisited();
	mask();
	selects();
	predictiveSelects();
	accordeons();
	tabs();
	popups();
});
