import $ from 'jquery';

import app from '../helpers/app';

class CookieNotice {
	constructor(containerDOM, settings = {}, classNames = {}) {
		const defaultSettings = {
			expireIn: 1,
		};

		const defaultClassNames = {
			CONTAINER: 'js-cookie-notice',
			DISMISS: 'js-cookie-dismiss',
			OPEN: 'is-open',
		};

		this.$container = $(containerDOM);
		this.settings = { ...defaultSettings, ...settings };
		this.classNames = { ...defaultClassNames, ...classNames };
	}

	init() {
		if (
			this.$container.length === 0 ||
			!this.testCookie() ||
			this.getNoticeCookie()
		) {
			return;
		}

		console.log('fire');

		this.open();
		this.listenDismissClick();
	}

	open() {
		return this.$container.addClass(this.classNames.OPEN);
	}

	close() {
		return this.$container.removeClass(this.classNames.OPEN);
	}

	listenDismissClick() {
		this.$container.on('click', `.${this.classNames.DISMISS}`, () => {
			this.setDismissNoticeCookie(
				this.settings.expireIn * 60 * 1000 * 60 * 24
			);
			this.close();
		});
	}

	testCookie() {
		document.cookie = 'cookie_test=1';

		return document.cookie.indexOf('cookie_test') !== -1;
	}

	getNoticeCookie() {
		return document.cookie.indexOf('cookie_notice') !== -1;
	}

	setDismissNoticeCookie(expireIn) {
		const now = new Date();
		const cookieExpire = new Date();

		cookieExpire.setTime(now.getTime() + expireIn);
		document.cookie = `cookie_notice=1; expires=${cookieExpire.toUTCString()}; path=/;`;
	}
}

export default CookieNotice;
