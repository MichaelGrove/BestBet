export default (next) => {
	// eslint-disable-next-line no-undef
	if (localStorage.getItem('_token')) {
		return next('/');
	}

	return next();
};
