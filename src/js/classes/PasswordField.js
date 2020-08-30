import $ from 'jquery';

class PasswordField {
	constructor(container, classNames) {
		const defaultClassNames = {
			OPEN: 'is-open',
		};

		this.classNames = { ...defaultClassNames, ...classNames };

		this.$container = $(container);
		this.$toggler = $('button', this.$container);
		this.$input = $('input', this.$container);
	}

	init() {
		if (this.$toggler.length === 0 || this.$input.length === 0) return;

		this.listenTogglerClick();
	}

	listenTogglerClick() {
		this.$toggler.on('click', (event) => {
			const { OPEN } = this.classNames;

			if (this.$container.hasClass(OPEN)) {
				this.close();
			} else {
				this.open();
			}
		});
	}

	open() {
		this.$container.addClass(OPEN);
		this.$input.attr('type', 'text');
	}

	close() {
		this.$container.removeClass(OPEN);
		this.$input.attr('type', 'password');
	}
}

export default PasswordField;
