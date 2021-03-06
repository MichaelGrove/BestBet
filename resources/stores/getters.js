import constants from './constants';

const { BET_STATES } = constants;

export default {
	units(state) {
		return state.units;
	},

	bets(state) {
		return state.bets;
	},

	pendingBets(state) {
		return state.bets.filter((bet) => bet.state === BET_STATES.PENDING);
	},

	resolvedBets(state) {
		return state.bets.filter((bet) => bet.state !== BET_STATES.PENDING);
	},

	bookmakers(state) {
		return state.bookmakers;
	},

	sports(state) {
		return state.sports;
	},

	betTypes(state) {
		return state.betTypes;
	},
};
