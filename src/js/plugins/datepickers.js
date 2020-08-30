import $ from 'jquery';

export default () => {
	const $datepickers = $('.js-datepicker');

	if ($datepickers.length === 0) {
		return;
	}

	pickmeup.defaults.locales['ru'] = {
		days: [
			'Воскресенье',
			'Понедельник',
			'Вторник',
			'Среда',
			'Четверг',
			'Пятница',
			'Суббота',
		],
		daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		months: [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		],
		monthsShort: [
			'Янв',
			'Фев',
			'Мар',
			'Апр',
			'Май',
			'Июн',
			'Июл',
			'Авг',
			'Сен',
			'Окт',
			'Ноя',
			'Дек',
		],
	};

	$datepickers
		.each((index, datapicker) => {
			pickmeup(datapicker, {
				default_date: false,
				hide_on_select: true,
				prev: '',
				next: '',
				format: 'd.m.Y',
				locale: 'ru',
				position: function () {
					const { top, left, height } = this.getBoundingClientRect();

					return {
						top: `${top + window.pageYOffset + height}px`,
						left: `${left + window.pageXOffset}px`,
					};
				},
			});
		})
		.on('pickmeup-show', (event) => {
			const $popups = $('.pickmeup');
			const $input = $(event.target);
			const $popup = $($popups[$datepickers.index($input)]);

			$input.addClass('is-active');
			$popup.css({ width: $input.outerWidth() + 'px' });
		})
		.on('pickmeup-hide', (event) => {
			const $input = $(event.target);

			$input.removeClass('is-active').trigger('change');
		});
};
