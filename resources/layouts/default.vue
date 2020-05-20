<template>
	<div
		class="flex flex-col h-screen bg-gray-900 font-body overflow-y-hidden"
	>
		<router-view></router-view>
	</div>
</template>

<script>
import reject from '../plugins/reject';

export default {
	name: 'default',
	beforeMount() {
		this.$store.dispatch('fetchWallet')
			.catch(reject.bind(this));
	},
};
</script>