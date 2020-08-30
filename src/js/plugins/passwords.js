import PasswordField from '../classes/PasswordField';

export default () => {
	const $passwords = $('.js-password');

	if ($passwords.length === 0) return;

	$passwords.each((index, passwordField) => {
		new PasswordField(passwordField).init();
	});
};
