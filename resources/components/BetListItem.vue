<template>
	<li class="my-2 text-sm">
		<div class="bg-gray-800 text-white p-2">
			<div class="flex pb-2 font-bold">
				<p class="mr-auto w-1/2">
					{{bet.sport}}, {{bet.team_player}}
				</p>
				<p class="w-1/2 text-right">
					{{toFixed(bet.coefficient)}}
				</p>
			</div>

			<p class="flex">
				<span class="w-1/3">Units:</span>
				<span>{{toFixed(bet.units)}}</span>
			</p>

			<p class="flex">
				<span class="w-1/3">Bookmaker:</span>
				<span>{{bet.bookmaker}}</span>
			</p>

			<p class="flex">
				<span class="w-1/3">Type:</span>
				<span>{{bet.bet_type}}</span>
			</p>

			<p class="block my-2">
				{{bet.game_description}}
			</p>



			<div class="flex w-full" v-if="bet.state === BET_STATES.PENDING">
				<button
					type="button"
					class="py-2 flex-1 text-green-500 bg-gray-900 rounded-l-lg border-r-2 border-gray-800"
					@click="(ev) => winBet(ev, bet)"
				>
					WIN
				</button>
				<button
					type="button"
					class="py-2 flex-1 text-yellow-500 bg-gray-900"
					@click="(ev) => pushBet(ev, bet)"
				>
					PUSH
				</button>
				<button
					type="button"
					class="py-2 flex-1 text-red-500 bg-gray-900 rounded-r-lg border-l-2 border-gray-800"
					@click="(ev) => loseBet(ev, bet)"
				>
					LOSE
				</button>
			</div>
			<BetStateTag :state='bet.state' v-else />
		</div>
	</li>
</template>

<script>
import BetStateTag from './BetStateTag.vue';
import constants from '../stores/constants';
import reject from '../plugins/reject';

export default {
	name: 'bet-list-item',
	data: () => ({
		BET_STATES: constants.BET_STATES,
	}),
	props: {
		bet: Object,
	},
	components: { BetStateTag },
	methods: {
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
		},
	},
};
</script>