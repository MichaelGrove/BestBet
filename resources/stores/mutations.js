export default {

	// Bets
	initBets(state, payload) {
		state.bets = payload;
	},

	addBet(state, payload) {
		state.bets = [...state.bets, payload];
	},

	initBookmakers(state, payload) {
		state.bookmakers = payload;
	},

	initSports(state, payload) {
		state.sports = payload;
	},
};
