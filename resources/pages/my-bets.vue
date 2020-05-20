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

		<p class="text-white text-sm text-right block italic">
			My wallet: {{units}} units
		</p>

		<h2 class="text-xl uppercase text-white font-display">
			Pending
		</h2>

		<ul>
			<BetListItem
				v-for="bet in pendingBets"
				:key="bet.id"
				:bet="bet"
			/>
		</ul>

		<h2 class="text-xl uppercase text-white font-display">
			Results
		</h2>

		<ul>
			<BetListItem
				v-for="bet in resolvedBets"
				:key="bet.id"
				:bet="bet"
			/>
		</ul>

	</section>
</template>

<script>
import BetListItem from '../components/BetListItem.vue';
import reject from '../plugins/reject';

export default {
	name: 'my-bets',
	components: { BetListItem },
	computed: {
		units() {
			return this.$store.getters.units || 0;
		},
		pendingBets() {
			return this.$store.getters.pendingBets || [];
		},
		resolvedBets() {
			return this.$store.getters.resolvedBets || [];
		},
	},
	methods: {
		fetchBets() {
			this.$store.dispatch('fetchBets')
				.catch(reject.bind(this));
		},
	},
	mounted() {
		this.fetchBets();
	},
};
</script>