import $ from 'jquery';

export default () => {
	const $container = $('.js-sticky');
	const $bar = $('.js-sticky-target');
	const FIXED = 'is-fixed';
	const delta = 50;

	if ($container.length === 0 && $bar.length === 0) return;

	let { height } = $container[0].getBoundingClientRect();

	$(document).on('click', () => {
		height = $container[0].getBoundingClientRect().height;
	});

	$(window).on('scroll', (event) => {
		if ($container[0].getBoundingClientRect().top + height + delta < 0) {
			$container.height(height);
			$bar.addClass(FIXED);
		} else {
			$container.height('auto');
			$bar.removeClass(FIXED);
		}
	});
};
