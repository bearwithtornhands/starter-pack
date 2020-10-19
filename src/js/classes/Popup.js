import $ from 'jquery';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import app from '../helpers/app';

export default class Popup {
	constructor(containerDOM, classNames) {
		this.classNames = {
			CONTAINER: 'js-popup',
			BODY: 'js-popup-body',
			CLOSE: 'js-popup-close',
			...classNames,
		};

		this.attributeNames = {
			NAME: 'name',
		};

		this.stateClassNames = {
			OPEN: 'is-open',
		};

		this.$container = $(containerDOM);
		this.$body = $(`.${this.classNames.BODY}`, this.$container);
	}

	init() {
		if (this.$container.length === 0) return;

		this.$container.data('popup', this);
	}

	listenClickClose() {
		app.dom.$document.on(
			'click',
			`.${this.classNames.CLOSE}`,
			this.handleClickClose
		);
	}

	unlistenClickClose() {
		app.dom.$document.off(
			'click',
			`.${this.classNames.CLOSE}`,
			this.handleClickClose
		);
	}

	listenClickOutside() {
		app.dom.$document.on('click', this.handleClickOutside);
	}

	unlistenClickOutside() {
		app.dom.$document.off('click', this.handleClickOutside);
	}

	listenPressEsc() {
		app.dom.$document.on('keyup', this.handlePressEsc);
	}

	unlistenPressEsc() {
		app.dom.$document.off('keyup', this.handlePressEsc);
	}

	handleClickClose = () => {
		this.close();
		app.dom.$document.trigger('popup:close');
	};

	handleClickOutside = (event) => {
		if ($(event.target).closest(`.${this.classNames.BODY}`).length === 0) {
			this.close();
			app.dom.$document.trigger('popup:close');
		}
	};

	handlePressEsc = (event) => {
		if (event.key === 'Escape') {
			this.close();
			app.dom.$document.trigger('popup:close');
		}
	};

	open() {
		disableBodyScroll(this.$container[0]);
		this.$container.addClass(this.stateClassNames.OPEN);
		this.listenClickClose();
		this.listenClickOutside();
		this.listenPressEsc();
		// app.dom.$document.trigger('popup:open');
	}

	close() {
		enableBodyScroll(this.$container[0]);
		this.$container.removeClass(this.stateClassNames.OPEN);
		this.unlistenClickClose();
		this.unlistenClickOutside();
		this.unlistenPressEsc();
		// app.dom.$document.trigger('popup:close');
	}

	getName() {
		return this.$container.data(`${this.attributeNames.NAME}`);
	}

	static getContainer(name) {
		return $(`.js-popup[data-name="${name}"]`);
	}

	static isInit(name) {
		return $(`.js-popup[data-name="${name}"]`).data('popup') !== undefined;
	}
}
