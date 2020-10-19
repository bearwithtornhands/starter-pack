import $ from 'jquery';

import CookieNotice from '../classes/CookieNotice';

export default () => {
	const $cookieNotice = $('.js-cookie-notice');

	if ($cookieNotice.length === 0) {
		return;
	}

	const cookieNotice = new CookieNotice($cookieNotice[0], {
		expireIn: 30,
	});

	cookieNotice.init();
};
