<template>
	<section>
		<!-- Breadcrumbs -->
		<div>
			<router-link to="/">
				Dashboard
			</router-link>
			<p>/</p>
			<p>
				My bets
			</p>
		</div>

		<ul>
			<li
				v-for="bet in pendingBets"
				:key="bet.id"
			>
				<div
					class="bg-gray-200"
				>
					<div class="flex">
						<p>
							{{bet.game_description}}
						</p>
						<p>
							{{bet.bookmaker}}
						</p>
						<p>
							{{bet.coefficient}}
						</p>
					</div>

					<div class="flex">

						<div>
							<button
								type="button"
								class=""
								@click="winGame"
							>
								WIN
							</button>
							<button
								type="button"
								class=""
								@click="loseGame"
							>
								LOSE
							</button>
						</div>

						<p>
							{{bet.units}}
						</p>

					</div>
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
import reject from '../plugins/reject';

export default {
	name: 'my-bets',
	computed: {
		pendingBets: function() {
			return this.$store.getters.pendingBets || [];
		},
	},
	methods: {
		fetchBets: function() {
			this.$store.dispatch('fetchBets')
				.catch(reject.bind(this));
		},
		winGame: function(ev) {

		},
		loseGame: function(ev) {

		},
	},
	mounted() {
		this.fetchBets();
	},
};
</script>