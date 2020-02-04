import app from '../helpers/app';

export default () => {
	app.dom.$document.on('focus', 'input, textarea, select', event => {
		$(event.currentTarget).addClass('is-visited');
	});
};
