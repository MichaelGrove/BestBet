import constants from './constants';

const { BET_STATES } = constants;

export default {
	setUnits(state, payload) {
		state.units = payload;
	},

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

	pushBet(state, payload) {
		state.bets = state.bets.map((bet) => {
			if (bet.id === payload.id) {
				bet.state = BET_STATES.PUSHED;
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

	initBetTypes(state, payload) {
		state.betTypes = payload;
	},
};
