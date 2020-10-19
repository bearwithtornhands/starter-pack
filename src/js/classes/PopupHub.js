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

				if (Popup.isInit(name) === true) {
					this.open(Popup.getContainer(name));
				}
			}
		);
	}

	listenClickClose() {
		app.dom.$document.on('popup:close', () => {
			this.close();
		});
	}

	open($popup) {
		const popup = $popup.data('popup');

		this.closeLastPopup();
		popup.open();
		this.addToHistory(popup.getName());
	}

	close() {
		this.removeLastFromHistory();
		this.openLastPopup();
	}

	getLastPopupName() {
		const { history } = this.state;

		return history[history.length - 1];
	}

	openLastPopup() {
		if (this.state.history.length === 0) {
			return;
		}

		return Popup.getContainer(this.getLastPopupName()).data('popup').open();
	}

	closeLastPopup() {
		if (this.state.history.length === 0) {
			return;
		}

		return Popup.getContainer(this.getLastPopupName())
			.data('popup')
			.close();
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
