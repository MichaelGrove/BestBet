<template>
	<section class="p-2 overflow-y-auto">

		<h1 class="text-2xl uppercase text-white font-display">
			Place Bet
		</h1>

		<!-- Breadcrumbs -->
		<div class="flex text-sm">
			<router-link 
				to="/"
				class="text-orange-500"
			>
				Dashboard
			</router-link>
			<p class="text-white mx-2">/</p>
			<p class="text-white">
				Place bet
			</p>
		</div>

		<form class="w-full">
			<div class="my-2">
				<label
					id="sport"
					class="block mb-1 text-white"
				>
					Sport
				</label>
				<select
					id="sport"
					v-model="sport_id"
					class="block w-full bg-gray-800 p-2 text-white"
				>
					<option
						v-for="sport in sports"
						:key="sport.id"
						v-bind:value="sport.id"
					>
						{{sport.name}}
					</option>
				</select>
			</div>

			<div class="my-2">
				<label
					for="bookmaker"
					class="block mb-1 text-white"
				>
					Bookmaker
				</label>
				<select
					id="bookmaker"
					v-model="bookmaker_id"
					class="block w-full bg-gray-800 p-2 text-white"
				>
					<option
						v-for="bookmaker in bookmakers"
						:key="bookmaker.id"
						v-bind:value="bookmaker.id"
					>
						{{bookmaker.name}}
					</option>
				</select>
			</div>

			<div class="my-2">
				<label
					for="game_description"
					class="block mb-1 text-white"
				>
					Game / Description
				</label>
				<input
					id="game_description"
					type="text"
					v-model="game_description"
					class="block w-full bg-gray-800 p-2 text-white"
				>
			</div>

			<div class="my-2">
				<label
					for="coefficient"
					class="block mb-1 text-white"
				>
					Coefficient
				</label>
				<input
					id="coefficient"
					type="number"
					step="0.1"
					v-model="coefficient"
					class="block w-full bg-gray-800 p-2 text-white"
				/>
			</div>

			<div class="my-2">
				<label
					for="coefficient"
					class="block mb-1 text-white"
				>
					Units
				</label>
				<input
					id="coefficient"
					type="number"
					step="0.1"
					v-model="units"
					class="block w-full bg-gray-800 p-2 text-white"
				/>
			</div>

			<div class="flex flex-col">
				<button
					type="submit"
					class="bg-gray-800 block text-center py-6 mt-4 text-orange-500 uppercase"
					@click="(ev) => submit(ev)"
				>
					Place Bet
				</button>
			</div>
		</form>

	</section>
</template>

<script>
import reject from '../plugins/reject';

export default {
	name: 'place-bet',
	data: () => ({
		sport_id: 0,
		bookmaker_id: 0,
		game_description: '',
		coefficient: 0,
		units: 0,
	}),
	computed: {
		bookmakers: function() {
			return this.$store.getters.bookmakers;
		},
		sports: function() {
			return this.$store.getters.sports;
		},
	},
	methods: {
		fetchBookmakers: function() {
			return this.$store.dispatch('fetchBookmakers');
		},
		fetchSports: function() {
			return this.$store.dispatch('fetchSports');
		},
		submit: function(ev) {
			ev.preventDefault();

			const {
				sport_id,
				bookmaker_id,
				game_description,
				coefficient,
				units,
			} = this;

			return this.$store.dispatch('placeBet', {
				sport_id,
				bookmaker_id,
				game_description,
				coefficient,
				units,
			})
			.then(() => {
				return this.$router.push('/my-bets');
			})
			.catch((err) => {
				console.warn(err);
			})
		}
	},
	beforeMount() {
		return this.fetchBookmakers()
			.then(() => this.fetchSports())
			.catch(reject.bind(this));
	},
}
</script>
