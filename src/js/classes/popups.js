import $ from 'jquery';
import app from '../helpers/app';

export default class Popups {
	constructor() {
		this.history = [];
	}

	init = () => {
		this.listenToggleClick();
		this.listenOutsideClick();
		this.listenEscClick();
	};

	changeHistory = name => {
		this.setHistory(name);
		this.setActiveButton();
		this.setActivePopup();
		this.setStunnedHtml();
	};

	setHistory = name => {
		if (this.history[this.history.length - 1] === name) {
			this.history.pop();
		} else {
			this.history.push(name);
		}
	};

	setActiveButton = () => {
		$('[data-toggle]').each((index, button) => {
			const $button = $(button);
			const name = $button.attr('data-toggle');

			const isInactiveAndLast =
				!$button.hasClass('is-active') &&
				this.history[this.history.length - 1] === name;

			if (isInactiveAndLast) {
				$button.addClass('is-active');
			} else {
				$button.removeClass('is-active');
			}
		});
	};

	setActivePopup = () => {
		$('[data-popup]').each((index, popup) => {
			const $popup = $(popup);
			const name = $popup.attr('data-popup');

			const isInactiveAndLast =
				!$popup.hasClass('is-open') &&
				this.history[this.history.length - 1] === name;

			if (isInactiveAndLast) {
				$popup.addClass('is-open');
			} else {
				$popup.removeClass('is-open');
			}
		});
	};

	setStunnedHtml = () => {
		if (this.history.length) {
			const $currentPopup = $(
				'[data-popup=' + this.history[this.history.length - 1] + ']'
			);
			const isEnableStun = $currentPopup.attr('data-stunned');

			if (isEnableStun !== 'false') {
				app.dom.$html.addClass('is-st');
			}
		} else {
			app.dom.$html.removeClass('is-st');
		}
	};

	listenToggleClick = () => {
		app.dom.$document.on('click', '[data-toggle]', function(event) {
			const $this = $(this);
			const name = $this.attr('data-toggle');

			event.stopPropagation();
			this.changeHistory(name);
		});
	};

	listenResize = () => {
		app.dom.$window.on('resize', function() {
			this.history = [];
			this.setActivePopup();
			this.setStunnedHtml();
		});
	};

	listenOutsideClick = () => {
		app.dom.$document.on('click', function(e) {
			const hasPopupOutside = !!$(e.target).closest('.js-popup-outside').length;
			const hasHtmlStun = !!app.dom.$html.hasClass('is-st');

			if (hasPopupOutside || !hasHtmlStun) return;

			this.changeHistory(this.history[this.history.length - 1]);
		});
	};

	listenEscClick = () => {
		app.dom.$document.on('keyup', function(e) {
			if (e.key === 'Escape') {
				this.changeHistory(this.history[this.history.length - 1]);
			}
		});
	};
}
