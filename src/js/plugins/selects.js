import Select from '../classes/Select';

export default () => {
	const $selects = $('.js-select');

	if ($selects.length === 0) return;

	$selects.each((index, select) => {
		new Select(select).init();
	});
};
