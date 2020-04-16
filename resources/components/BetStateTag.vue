<template>
	<span 
		:class="[
			'rounded-lg',
			'p-2',
			'text-center',
			'inline-block',
			'bg-gray-900',
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
				return 'text-green-500';
			case BET_STATES.PUSHED:
				return 'text-yellow-500';
			case BET_STATES.LOST:
				return 'text-red-500';
			}
			return 'text-blue-500';
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