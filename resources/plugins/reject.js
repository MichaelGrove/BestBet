export default function (err) {
	if (err && err.response && err.response.status === 403) {
		// eslint-disable-next-line no-undef
		localStorage.removeItem('_token');
		this.$router.push('/login');
	}
}
