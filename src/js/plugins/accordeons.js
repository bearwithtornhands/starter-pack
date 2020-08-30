import Аccordeon from '../classes/Аccordeon';

export default () => {
	const $accordeons = $('.js-accordeon');

	if ($accordeons.length === 0) return;

	$accordeons.each((index, accordeon) => {
		new Аccordeon(accordeon).init();
	});
};
