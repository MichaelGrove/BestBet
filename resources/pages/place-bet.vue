<template>
	<section>

		<!-- Breadcrumbs -->
		<div>
			<router-link to="/">
				Dashboard
			</router-link>
			<p>/</p>
			<p>
				Place bet
			</p>
		</div>

		<form>
			<div>
				<label id="sport">
					Sport
				</label>
				<select
					id="sport"
					v-model="sport_id"
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

			<div>
				<label for="bookmaker">
					Bookmaker
				</label>
				<select
					id="bookmaker"
					v-model="bookmaker_id"
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

			<div>
				<label>
					Game / Description
				</label>
				<input
					type="text"
					v-model="game_description"
				>
			</div>

			<div>
				<label>
					Coefficient
				</label>
				<input
					type="number"
					step="0.1"
					v-model="coefficient"
				/>
			</div>

			<div>
				<label>
					Units
				</label>
				<input
					type="number"
					step="0.1"
					v-model="units"
				/>
			</div>

			<button
				type="submit"
				@click="(ev) => submit(ev)"
			>
				Place Bet
			</button>
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
