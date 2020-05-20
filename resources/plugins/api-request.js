import axios from 'axios';

export default (url, params = {}) => {
	const instance = {
		baseURL: '/api/',
		responseType: 'json',
		headers: {},
	};

	// eslint-disable-next-line no-undef
	const token = localStorage.getItem('_token');
	if (token) {
		instance.headers.Authorization = token;
	}

	return axios.post(url, params, instance);
};
