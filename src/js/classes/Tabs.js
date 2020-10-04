import $ from 'jquery';

import Accordeon from './Accordeon';

export default class Tabs extends Accordeon {
	constructor(containerDOM, classNames = {}) {
		const defaultClassNames = {
			CONTAINER: 'js-tabs',
			TOGGLER: 'js-tab-toggler',
			BODY: 'js-tab-body',
		};

		super(
			containerDOM,
			{},
			{
				index: [],
			},
			{ ...defaultClassNames, ...classNames }
		);

		this.setState({ index: this.$body[0].dataset.name });
	}

	listenTogglerClick() {
		this.$toggler.on('click', (event) => {
			this.open(
				this.getNextIndex($(event.currentTarget).attr('data-name'))
			);
		});
	}

	toggleHead() {
		const { index: currentIndex } = this.state;
		const { OPEN } = this.classNames;

		this.$toggler.each((index, toggler) => {
			const $toggler = $(toggler);
			const name = $toggler.attr('data-name');

			if (currentIndex.indexOf(name) !== -1) {
				$toggler.addClass(OPEN).prop('disabled', true);
			} else {
				$toggler.removeClass(OPEN).prop('disabled', false);
			}
		});
	}

	toggleBody() {
		const { index: currentIndex } = this.state;
		const { OPEN } = this.classNames;

		this.$body.each((index, body) => {
			const $body = $(body);
			const name = $body.attr('data-name');

			$body.toggleClass(OPEN, currentIndex.indexOf(name) !== -1);
		});
	}

	open(name) {
		this.setState({ index: name });
	}
}
