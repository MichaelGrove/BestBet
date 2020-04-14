<template>
	<section>
		<h1>Login</h1>
		<form>
			<div>
				<label for="email">
					Email
				</label>
				<input
					id="email"
					type="email"
					v-model="email"
				/>
			</div>

			<div>
				<label for="password">
					Password
				</label>
				<input
					id="password"
					type="password"
					v-model="password"
				/>
			</div>

			<button type="button" @click="login">
				Login
			</button>
		</form>
	</section>
</template>

<script>
import axios from '../plugins/axios';

export default {
	name: 'login',
	data: () => ({
		email: '',
		password: '',
	}),
	methods: {
		login: function() {
			const { email, password } = this;
			return axios.post('auth/login', { email, password })
				.then((response) => {
					if (response.data.token) {
						localStorage.setItem('_token', response.data.token);
						this.$router.push('/');
						return true;
					}

					if (response.data.error) {
						return Promise.reject(response.data.error);
					}
					return Promise.reject(new Error('Unexpected error'));
				})
				.catch((err) => {
					window.alert(err);
				});
		},
	},
};
</script>