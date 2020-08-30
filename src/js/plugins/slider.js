import Swiper from 'swiper';

export default () => {
	const $slider = $('.js-slider');

	if ($slider.length === 0) return;

	$slider.each((index, slider) => {
		const swiperSlider = new Swiper(slider, {
			slidesPerView: 2,
			spaceBetween: 30,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			breakpoints: {
				768: {
					slidesPerView: 4,
					slidesPerGroup: 4,
					spaceBetween: 28,
				},
			},
		});
	});
};
