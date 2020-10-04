import app from '../helpers/app';

export default () => {
	app.dom.$document.on('focus', 'input, textarea, select', (event) => {
		const VISITED = 'is-visited';
		const $target = $(event.currentTarget);
		const $container = $target.parent('.inputField');

		// $target.addClass(VISITED);
		$container.length !== 0 && $container.addClass(VISITED);
	});
};
