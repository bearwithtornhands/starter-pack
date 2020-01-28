const setViewportUnits = () => {
	document.documentElement.style.setProperty(
		'--vh',
		`${window.innerHeight * 0.01}px`
	);
};

export default () => {
	setViewportUnits();
	window.addEventListener('resize', setViewportUnits);
};
