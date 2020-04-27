import request from '../plugins/api-request';

export default {
	fetchWallet(state) {
		return request('auth/user/wallet')
			.then((response) => {
				if (response.data.units) {
					state.commit('setUnits', response.data.units);
					return response.data.units;
				}

				if (response.data.error) {
					return Promise.reject(response.data.error);
				}

				return Promise.reject(new Error('Unexpected error'));
			});
	},

	fetchBets(state) {
		return request('bets')
			.then((response) => {
				if (response.data.results) {
					state.commit('initBets', response.data.results);
					return response.data.results;
				}
				if (response.data.error) {
					return Promise.reject(response.data.error);
				}

				return Promise.reject(new Error('Unexpected error'));
			});
	},

	fetchBookmakers(state) {
		return request('bookmakers')
			.then((response) => {
				if (response.data.results) {
					state.commit('initBookmakers', response.data.results);
					return response.data.results;
				}

				if (response.data.error) {
					return Promise.reject(response.data.error);
				}

				return Promise.reject(new Error('Unexpected error'));
			});
	},

	fetchSports(state) {
		return request('sports')
			.then((response) => {
				if (response.data.results) {
					state.commit('initSports', response.data.results);
					return response.data.results;
				}

				if (response.data.error) {
					return Promise.reject(response.data.error);
				}

				return Promise.reject(new Error('Unexpected error'));
			});
	},

	fetchBetTypes(state) {
		return request('bet-types')
			.then((response) => {
				if (response.data.results) {
					state.commit('initBetTypes', response.data.results);
					return response.data.results;
				}

				if (response.data.error) {
					return Promise.reject(response.data.error);
				}

				return Promise.reject(new Error('Unexpected error'));
			});
	},

	placeBet(state, payload) {
		return request('bets/create', payload)
			.then((response) => {
				if (response.data.success) {
					if (response.data.units) {
						state.commit('setUnits', response.data.units);
					}
					state.commit('addBet', response.data.bet);
					return response.data.bet;
				}

				if (response.data.error) {
					return Promise.reject(response.data.error);
				}

				return Promise.reject(new Error('Unexpected error'));
			});
	},

	winBet(state, payload) {
		return request(`bets/win/${payload.id}`)
			.then((response) => {
				if (response.data.success) {
					if (response.data.units) {
						state.commit('setUnits', response.data.units);
					}
					state.commit('winBet', payload);
					return true;
				}

				if (response.data.error) {
					return Promise.reject(response.data.error);
				}

				return Promise.reject(new Error('Unexpected error'));
			});
	},

	pushBet(state, payload) {
		return request(`bets/push/${payload.id}`)
			.then((response) => {
				if (response.data.success) {
					if (response.data.units) {
						state.commit('setUnits', response.data.units);
					}
					state.commit('pushBet', payload);
					return true;
				}

				if (response.data.error) {
					return Promise.reject(response.data.error);
				}

				return Promise.reject(new Error('Unexpected error'));
			});
	},

	loseBet(state, payload) {
		return request(`bets/lose/${payload.id}`)
			.then((response) => {
				if (response.data.success) {
					if (response.data.units) {
						state.commit('setUnits', response.data.units);
					}
					state.commit('loseBet', payload);
					return true;
				}

				if (response.data.error) {
					return Promise.reject(response.data.error);
				}

				return Promise.reject(new Error('Unexpected error'));
			});
	},
};
