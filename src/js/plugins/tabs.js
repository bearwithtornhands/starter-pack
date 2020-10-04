import Tabs from '../classes/Tabs';

export default () => {
	const $tabs = $('.js-tabs');

	if ($tabs.length === 0) return;

	$tabs.each((index, tabs) => {
		new Tabs(tabs).init();
	});
};
