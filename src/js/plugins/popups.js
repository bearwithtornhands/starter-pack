import Popups from '../classes/popups';

export default () => {
	const $popups = $('.js-popup');

	if ($popups.length === 0) return;

	new Popups().init();
};
