<template>
	<section class="p-2 overflow-y-auto">

		<h1 class="text-3xl uppercase text-white font-display">
			My Bets
		</h1>

		<!-- Breadcrumbs -->
		<div class="flex text-sm mb-4">
			<router-link
				to="/"
				class="text-orange-500"
			>
				Dashboard
			</router-link>
			<p class="text-white mx-2">/</p>
			<p class="text-white">
				My bets
			</p>
		</div>

		<h2 class="text-xl uppercase text-white font-display">
			Pending
		</h2>

		<ul>
			<li
				v-for="bet in pendingBets"
				:key="bet.id"
				class="my-2"
			>
				<div
					class="bg-gray-800 text-white p-2"
				>
					<div class="flex text-sm pb-2">
						<p class="mr-auto w-1/2 font-bold">
							{{bet.sport}}, {{bet.team_player}}
						</p>
						<p class="w-1/2 flex">
							<span class="mr-auto">
								{{bet.bookmaker}}
							</span>
							<span class="text-right">
								{{toFixed(bet.coefficient)}}
							</span>							
						</p>
					</div>

					<p>
						{{bet.bet_type}}
					</p>

					<p>
						{{bet.game_description}}
					</p>

					<div class="flex bg-gray-900 p-2">

						<div class="w-1/2">
							<button
								type="button"
								class="p-2 mx-2 text-green-500"
								@click="(ev) => winBet(ev, bet)"
							>
								WIN
							</button>
							<button
								type="button"
								class="p-2 mx-2 text-yellow-500"
								@click="(ev) => pushBet(ev, bet)"
							>
								PUSH
							</button>
							<button
								type="button"
								class="p-2 mx-2 text-red-500"
								@click="(ev) => loseBet(ev, bet)"
							>
								LOSE
							</button>
						</div>

						<p class="w-1/2 text-sm">
							Units: {{toFixed(bet.units)}}
						</p>

					</div>
				</div>
			</li>
		</ul>

		<h2 class="text-xl uppercase text-white font-display">
			Results
		</h2>

		<ul>
			<li
				v-for="bet in resolvedBets"
				:key="bet.id"
				class="my-2"
			>
				<div
					class="bg-gray-800 text-white p-2"
				>
					<div class="flex text-sm pb-2">
						<p class="mr-auto w-1/2 font-bold">
							{{bet.sport}}, {{bet.team_player}}
						</p>
						<p class="w-1/2 flex">
							<span class="mr-auto">
								{{bet.bookmaker}}
							</span>
							<span class="text-right">
								{{toFixed(bet.coefficient)}}
							</span>							
						</p>
					</div>

					<p>
						{{bet.bet_type}}
					</p>
					<p>
						{{bet.game_description}}
					</p>

					<div class="flex bg-gray-900 p-2">
						<div class="w-1/2">
							<BetStateTag :state='bet.state' />
						</div>

						<p class="w-1/2 text-sm">
							Units: {{toFixed(bet.units)}}
						</p>

					</div>
				</div>
			</li>
		</ul>

	</section>
</template>

<script>
import BetStateTag from '../components/BetStateTag.vue';
import reject from '../plugins/reject';

export default {
	name: 'my-bets',
	components: { BetStateTag },
	computed: {
		pendingBets: function() {
			return this.$store.getters.pendingBets || [];
		},
		resolvedBets: function() {
			return this.$store.getters.resolvedBets || [];
		},
	},
	methods: {
		fetchBets: function() {
			this.$store.dispatch('fetchBets')
				.catch(reject.bind(this));
		},
		winBet: function(ev, bet) {
			this.$store.dispatch('winBet', bet)
				.catch(reject.bind(this));
		},
		pushBet: function(ev, bet) {
			this.$store.dispatch('pushBet', bet)
				.catch(reject.bind(this));
		},
		loseBet: function(ev, bet) {
			this.$store.dispatch('loseBet', bet)
				.catch(reject.bind(this));
		},
		toFixed: function(value) {
			if (typeof value === "string") {
				return value;
			}
			return value.toFixed(2);
		}
	},
	mounted() {
		this.fetchBets();
	},
};
</script>