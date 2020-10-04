import $ from 'jquery';

import app from '../helpers/app';
import Popup from './Popup';

export default class PopupHub {
	constructor() {
		this.classNames = {
			BUTTON_OPEN: 'js-popup-open',
		};

		this.attributeNames = {
			TOGGLE: 'name',
		};

		this.state = {
			history: [],
		};
	}

	init() {
		this.listenClickOpen();
		this.listenClickClose();
	}

	listenClickOpen() {
		app.dom.$document.on(
			'click',
			`.${this.classNames.BUTTON_OPEN}`,
			(event) => {
				const $target = $(event.currentTarget);
				const name =
					event.currentTarget.dataset[this.attributeNames.TOGGLE];

				if (Popup.isExist(name) === true) {
					this.open(name);
				}
			}
		);
	}

	listenClickClose() {
		app.dom.$document.on('popup:close', () => {
			this.close();
		});
	}

	open(name) {
		const nextPopup = new Popup(name);

		this.closeLastPopup();
		nextPopup.open();
		this.addToHistory(nextPopup);
	}

	close() {
		this.removeLastFromHistory();
		this.openLastPopup();
	}

	getLastPopup() {
		return this.state.history[this.state.history.length - 1];
	}

	openLastPopup() {
		const $lastPopup = this.getLastPopup();

		if ($lastPopup === undefined) return;

		return $lastPopup.open();
	}

	closeLastPopup() {
		const $lastPopup = this.getLastPopup();

		if ($lastPopup === undefined) return;

		return $lastPopup.close();
	}

	addToHistory(name) {
		return this.setState({ history: [...this.state.history, name] });
	}

	removeLastFromHistory() {
		return this.setState({ history: this.state.history.slice(0, -1) });
	}

	setState(nextState) {
		this.state = { ...this.state, ...nextState };
		app.dom.$document.trigger('popup:change');
	}
}
