import $ from 'jquery';
import app from '../helpers/app';

export default class Аccordeon {
	constructor(containerDOM, settings = {}, state = {}, classNames = {}) {
		this.defaultClassNames = {
			CONTAINER: 'js-accordeon',
			TOGGLER: 'js-accordeon-toggler',
			BODY: 'js-accordeon-body',
			OPEN: 'is-open',
			INIT: 'is-init',
		};

		this.defaultSettings = {
			type: 'single', // 'multy'
		};

		this.defaultState = {
			index: [],
		};

		this.classNames = {
			...this.defaultClassNames,
			...classNames,
		};

		this.settings = {
			...this.defaultSettings,
			...settings,
		};

		this.state = {
			...this.defaultState,
			...state,
		};

		const { TOGGLER, BODY } = this.classNames;

		this.$container = $(containerDOM);
		this.$toggler = $(`.${TOGGLER}`, this.$container);
		this.$body = $(`.${BODY}`, this.$container);
	}

	init() {
		if (this.$toggler.length !== this.$body.length) return;

		this.setSettingsFromAttrs();
		this.listenStateChanged();
		this.listenTogglerClick();

		this.$container.addClass(this.classNames.INIT).trigger('change');
	}

	setSettingsFromAttrs() {
		this.settings = { ...this.settings, ...this.$container.data() };
	}

	listenTogglerClick() {
		this.$toggler.on('click', (event) =>
			this.setState({
				index: this.getNextIndex(
					this.$toggler.index($(event.currentTarget))
				),
			})
		);
	}

	listenStateChanged() {
		this.$container.on('change', () => this.toggle());
	}

	getNextIndex(nextIndex) {
		const { index } = this.state;

		if (index.includes(nextIndex)) {
			return index.filter((index) => index !== nextIndex);
		}

		if (!this.isMulty()) {
			return [nextIndex];
		}

		return [...index, nextIndex];
	}

	toggle() {
		this.toggleHead();
		this.toggleBody();
	}

	toggleHead() {
		const { index: currentIndex } = this.state;
		const { OPEN } = this.classNames;

		this.$toggler.each((index, toggler) => {
			$(toggler).toggleClass(
				this.classNames.OPEN,
				currentIndex.indexOf(index) !== -1
			);
		});
	}

	toggleBody() {
		const { index: currentIndex } = this.state;
		const { OPEN } = this.classNames;

		this.$body.each((index, body) => {
			$(body).toggleClass(OPEN, currentIndex.indexOf(index) !== -1);
		});
	}

	isMulty() {
		return this.settings.type === 'multy';
	}

	setState(nextState) {
		this.state = { ...this.state, ...nextState };
		this.$container.trigger('change');
		app.dom.$document.trigger('sizeChange');
	}
}
