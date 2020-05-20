<template>
	<section>
		<h1 class="my-4 text-white font-display text-3xl block text-center">
			Best Bet
		</h1>

		<router-link
			to="/place-bet"
			class="bg-gray-800 block text-center py-6 m-2 text-orange-500 uppercase font-bold"
		>
			Place Bet
		</router-link>

		<router-link
			to="/my-bets"
			class="bg-gray-800 block text-center py-6 m-2 text-orange-500 uppercase font-bold"
		>
			My Bets
		</router-link>
	</section>
</template>

<script>
export default {
	name: 'frontpage',
}
</script>