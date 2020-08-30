import PredictiveSelect from '../classes/PredictiveSelect';

export default () => {
	const $selects = $('.js-predictive-select');

	if ($selects.length === 0) return;

	$selects.each((index, select) => {
		new PredictiveSelect(select).init();
	});
};
