import axios from 'axios';

const instance = {
	baseURL: '/',
	responseType: 'json',
	headers: {},
};

// eslint-disable-next-line no-undef
const token = localStorage.getItem('_token');
if (token) {
	instance.headers.Authorization = token;
}

export default axios.create(instance);
