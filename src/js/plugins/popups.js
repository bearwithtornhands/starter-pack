import Popup from '../classes/Popup';
import PopupHub from '../classes/PopupHub';

export default () => {
	const $popups = $('.js-popup');

	if ($popups.length === 0) return;

	$popups.each((index, popup) => {
		new Popup(popup).init();
	});

	new PopupHub().init();
};
