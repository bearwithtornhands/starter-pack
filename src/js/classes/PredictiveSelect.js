import $ from 'jquery';

import Select from './Select';

export default class PredictiveSelect extends Select {
	constructor(containerDOM, classNames = {}) {
		const defaultClassNames = {
			CONTAINER: 'js-predictive-select',
			SEARCH: 'js-select-search',
			HIDE: 'is-hide',
			SHOW: 'is-show',
		};

		super(containerDOM, { ...defaultClassNames, ...classNames });

		const { HEAD, SEARCH } = this.classNames;

		this.$toggler = $(`.${HEAD} label`, this.$container);
		this.$search = $(`.${SEARCH}`, this.$container);
	}

	init() {
		if (this.$search.length === 0) return;

		super.init();

		this.listenSearchChange();
	}

	listenSearchChange() {
		this.$search.on('keyup', (event) => {
			const searchString = event.currentTarget.value;
			const { HIDE, SHOW } = this.classNames;

			this.$buttons.addClass(SHOW).removeClass(HIDE);

			this.$buttons.each((index, button) => {
				const $button = $(button);

				if (
					$button
						.text()
						.toLowerCase()
						.indexOf(searchString.trim().toLowerCase()) === -1
				) {
					$button.addClass(HIDE).removeClass(SHOW);
				}
			});
		});
	}

	close() {
		const { SHOW, HIDE } = this.classNames;

		super.close();

		this.$buttons.removeClass(`${SHOW} ${HIDE}`);
		this.$search.val('');
	}
}
