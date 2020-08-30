import $ from 'jquery';

export default class Аccordeon {
	constructor(containerDOM, classNames = {}) {
		this.defaultClassNames = {
			CONTAINER: 'js-accordeon',
			ITEM: 'js-accordeon-item',
			TOGGLER: 'js-accordeon-toggler',
			OPEN: 'is-open',
			INIT: 'is-init',
		};

		this.defaultSettings = {
			type: 'only',
		};

		this.classNames = { ...this.defaultClassNames, ...classNames };

		const { TOGGLER, ITEM } = this.classNames;

		this.$container = $(containerDOM);
		this.$toggler = $(`.${TOGGLER}`, this.$container);
		this.$item = $(`.${ITEM}`, this.$container);
	}

	init() {
		if (!this.$toggler.length === 0 || this.$item.length === 0) return;

		this.setSettingsFromAttrs();
		this.listenTogglerClick();

		this.$container.addClass(this.classNames.INIT);
	}

	setSettingsFromAttrs() {
		this.settings = { ...this.defaultSettings, ...this.$container.data() };
	}

	listenTogglerClick() {
		const { ITEM, OPEN } = this.classNames;

		this.$toggler.on('click', (event) => {
			const $targetAccordeonItem = $(event.currentTarget).closest(`.${ITEM}`);

			if ($targetAccordeonItem.hasClass(OPEN)) {
				this.close();
			} else {
				this.open();
			}
		});
	}

	open() {
		this.settings.type === 'only' && this.$item.removeClass(OPEN);
		$targetAccordeonItem.addClass(OPEN);
	}

	close() {
		$targetAccordeonItem.removeClass(OPEN);
	}
}
