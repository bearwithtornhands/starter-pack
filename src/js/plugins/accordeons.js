import Accordeon from '../classes/Accordeon';

export default () => {
	const $accordeons = $('.js-accordeon');

	if ($accordeons.length === 0) return;

	$accordeons.each((index, accordeon) => {
		new Accordeon(accordeon).init();
	});
};
