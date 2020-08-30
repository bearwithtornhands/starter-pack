import $ from 'jquery';

export default class Select {
	constructor(containerDOM, classNames = {}) {
		const defaultClassNames = {
			CONTAINER: 'js-select',
			HEAD: 'js-select-head',
			BODY: 'js-select-body',
			OPEN: 'is-open',
			ACTIVE: 'is-active',
			INIT: 'is-init',
		};

		this.classNames = Object.assign({}, defaultClassNames, classNames);

		const { HEAD, BODY } = this.classNames;

		this.$container = $(containerDOM);

		this.$select = $('select', this.$container);
		this.$options = $('option', this.$select);

		this.$toggler = $(`.${HEAD} button`, this.$container);
		this.$buttons = $(`.${BODY} button`, this.$container);

		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	init() {
		if (
			this.$select.length === 0 ||
			this.$toggler.length === 0 ||
			this.$buttons.length === 0
		)
			return;

		this.setHeadText();
		this.setContainerState();
		this.setSelectedOption();

		this.listenSelectChange();
		this.listenTogglerClick();
		this.listenListButtonClick();

		this.$container.addClass(this.classNames.INIT);
	}

	listenSelectChange() {
		this.$select.on('change', () => {
			this.setHeadText();
			this.setContainerState();
			this.setSelectedOption();
		});
	}

	listenTogglerClick() {
		const { HEAD, OPEN } = this.classNames;

		this.$toggler.on('click', () => {
			if (this.$container.hasClass(OPEN)) {
				this.close();
				this.unlistenClickOutside();
			} else {
				this.open();
				this.listenClickOutside();
			}
		});
	}

	listenListButtonClick() {
		const { BODY, OPEN } = this.classNames;

		this.$buttons.on('click', (event) => {
			this.$select.val(event.currentTarget.dataset.value).trigger('change');
			this.close();
			this.unlistenClickOutside();
		});
	}

	listenClickOutside() {
		$(document).on('click', this.handleClickOutside);
	}

	unlistenClickOutside() {
		$(document).off('click', this.handleClickOutside);
	}

	setHeadText() {
		this.$toggler.html(this.getActiveButton().html());
	}

	setSelectedOption() {
		const { BODY } = this.classNames;

		this.$buttons.prop('disabled', false);
		this.getActiveButton().prop('disabled', true);
	}

	setContainerState() {
		const isDefaultValue = $('option:selected', this.$select).index() === 0;

		this.$container.toggleClass(this.classNames.ACTIVE, !isDefaultValue);
	}

	getActiveButton() {
		return $(
			`.${this.classNames.BODY} button[data-value="${this.$select.val()}"]`,
			this.$container
		);
	}

	handleClickOutside = (event) => {
		if ($(event.target).closest(this.$container).length === 0) {
			this.close();
			this.unlistenClickOutside();
		}
	};

	open() {
		this.$container.addClass(this.classNames.OPEN);
	}

	close() {
		this.$container.removeClass(this.classNames.OPEN);
	}
}
