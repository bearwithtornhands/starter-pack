import $ from 'jquery';

export default class Select {
	constructor($container, classNames = {}) {
		const defaultClassNames = {
			CONTAINER: 'js-select',
			HEAD: 'js-select-head',
			OPEN_MOD: 'is-open',
			ACTIVE_MOD: 'is-active',
			INIT_MOD: 'is-init'
		};

		this.classNames = Object.assign({}, defaultClassNames, classNames);

		const { HEAD } = this.classNames;

		this.$container = $container;
		this.$select = $('select', this.$container);
		this.$options = $('option', this.$select);
		this.$head = $(`.${HEAD}`, this.$container);
	}

	init = () => {
		const { INIT_MOD } = this.classNames;

		this.setHeadText();
		this.setContainerState();

		this.listenSelectChange();

		this.$container.addClass(this.classNames.INIT_MOD);
	};

	listenSelectChange = () => {
		this.$select.on('change', () => {
			this.setHeadText();
			this.setContainerState();
		});
	};

	getSelectedText = () => {
		return $('option:selected', this.$select).text();
	};

	setHeadText = () => {
		this.$head.text(this.getSelectedText());
	};

	setContainerState = () => {
		const isDefaultValue = $('option:selected', this.$select).index() === 0;

		this.$container.toggleClass(this.classNames.ACTIVE_MOD, !isDefaultValue);
	};
}
