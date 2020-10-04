import $ from 'jquery';

import app from '../helpers/app';

export default class Select {
	constructor(containerDOM, classNames = {}) {
		const defaultClassNames = {
			CONTAINER: 'js-select',
			HEAD: 'js-select-head',
			BODY: 'js-select-body',
			OPEN: 'is-open',
			INIT: 'is-init',
		};

		this.classNames = { ...defaultClassNames, ...classNames };

		const { HEAD, BODY } = this.classNames;

		this.$container = $(containerDOM);

		this.$select = $('select', this.$container);
		this.$options = $('option', this.$select);

		this.$toggler = $(`.${HEAD} button`, this.$container);
		this.$buttons = $(`.${BODY} button`, this.$container);

		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	init() {
		if (this.$select.length === 0 || this.$toggler.length === 0) {
			return;
		}

		this.setHeadText();
		this.setSelectedButton();

		this.listenSelectChange();
		this.listenTogglerClick();
		this.listenListButtonClick();

		this.$container.addClass(this.classNames.INIT);
	}

	listenSelectChange() {
		this.$select.on('change', () => {
			this.setHeadText();
			this.setSelectedButton();
		});
	}

	listenTogglerClick() {
		const { HEAD, OPEN } = this.classNames;

		this.$toggler.on('click', () => {
			if (this.$container.hasClass(OPEN)) {
				this.close();
			} else {
				this.open();
			}
		});
	}

	listenListButtonClick() {
		const { BODY, OPEN } = this.classNames;

		this.$buttons.on('click', (event) => {
			this.$select
				.val(event.currentTarget.dataset.value)
				.trigger('change');
			this.close();
		});
	}

	listenClickOutside() {
		app.dom.$document.on('click', this.handleClickOutside);
	}

	unlistenClickOutside() {
		app.dom.$document.off('click', this.handleClickOutside);
	}

	setHeadText() {
		this.$toggler.html(this.getSelectedOption().text());
	}

	setSelectedButton() {
		if (this.$buttons.length !== 0) {
			this.$buttons
				.filter((index, button) => $(button).attr('data-value') !== '')
				.prop('disabled', false);
			this.getActiveButton().prop('disabled', true);
		}
	}

	getActiveButton() {
		return $(
			`.${this.classNames.BODY} button[data-value="${
				this.$select.val() || ''
			}"]`,
			this.$container
		);
	}

	getSelectedOption() {
		return $(':selected', this.$select);
	}

	handleClickOutside = (event) => {
		if ($(event.target).closest(this.$container).length === 0) {
			this.close();
		}
	};

	open() {
		this.$container.addClass(this.classNames.OPEN);
		this.listenClickOutside();
	}

	close() {
		this.$container.removeClass(this.classNames.OPEN);
		this.unlistenClickOutside();
	}
}
