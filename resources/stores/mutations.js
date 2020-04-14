import constants from './constants';

const { BET_STATES } = constants;

export default {

	// Bets
	initBets(state, payload) {
		state.bets = payload;
	},

	addBet(state, payload) {
		state.bets = [...state.bets, payload];
	},

	winBet(state, payload) {
		state.bets = state.bets.map((bet) => {
			if (bet.id === payload.id) {
				bet.state = BET_STATES.WON;
			}
			return bet;
		});
	},

	loseBet(state, payload) {
		state.bets = state.bets.map((bet) => {
			if (bet.id === payload.id) {
				bet.state = BET_STATES.LOST;
			}
			return bet;
		});
	},

	initBookmakers(state, payload) {
		state.bookmakers = payload;
	},

	initSports(state, payload) {
		state.sports = payload;
	},
};
