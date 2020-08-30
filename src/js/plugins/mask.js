import Inputmask from 'inputmask';

export default () => {
	const $phone = $('.js-phone');
	const $email = $('.js-email');

	if ($phone.length === 0) return;

	$phone.each((index, phone) => {
		Inputmask('+7 999 999 99 99').mask(phone);
	});

	// $email.each((index, email) => {
	// 	Inputmask({
	// 		mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]',
	// 		greedy: false,
	// 		onBeforePaste: function (pastedValue, opts) {
	// 			pastedValue = pastedValue.toLowerCase();

	// 			return pastedValue.replace('mailto:', '');
	// 		},
	// 		definitions: {
	// 			'*': {
	// 				validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
	// 				casing: 'lower',
	// 			},
	// 		},
	// 	}).mask(email);
	// });
};
