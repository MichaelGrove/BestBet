<template>
	<section class="px-4">
		<h1 class="mt-4 text-white font-display text-3xl block text-center">
			Best Bet
		</h1>
		<form>
			<div class="my-2">
				<label
					for="email"
					class="block mb-1 text-white"
				>
					Email
				</label>
				<input
					id="email"
					type="email"
					v-model="email"
					class="block w-full bg-gray-800 p-2 text-white"
				/>
			</div>

			<div class="my-2">
				<label
					for="password"
					class="block mb-1 text-white"
				>
					Password
				</label>
				<input
					id="password"
					type="password"
					v-model="password"
					class="block w-full bg-gray-800 p-2 text-white"
				/>
			</div>

			<button
				type="button"
				@click="login"
				class="bg-gray-800 block text-center py-6 mt-4 text-orange-500 uppercase font-bold w-full"
			>
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