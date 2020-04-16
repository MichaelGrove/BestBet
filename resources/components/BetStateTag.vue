<template>
	<span 
		:class="[
			'rounded-lg',
			'p-1',
			'text-center',
			'inline-block',
			'text-white',
			color
		].join(' ')"
	>
		{{text}}
	</span>
</template>

<script>
import constants from '../stores/constants';

const { BET_STATES } = constants;

export default {
	name: 'bet-state-tag',
	props: {
		state: String,
	},
	computed: {
		color() {
			switch (this.state) {
			case BET_STATES.WON:
				return 'bg-green-600';
			case BET_STATES.PUSHED:
				return 'bg-yellow-600';
			case BET_STATES.LOST:
				return 'bg-red-600';
			}
			return 'bg-blue-600';
		},
		text() {
			switch (this.state) {
			case BET_STATES.WON:
				return 'WON';
			case BET_STATES.PUSHED:
				return 'PUSHED';
			case BET_STATES.LOST:
				return 'LOST';
			}
			return 'UNKNOWN';
		},
	},
}
</script>