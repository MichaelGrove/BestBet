import request from '../plugins/api-request';

export default {
	fetchBets(state) {
		return request('/api/bets')
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
		return request('/api/bookmakers')
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
		return request('/api/sports')
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
		return request('/api/bet-types')
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
		return request('/api/bets/create', payload)
			.then((response) => {
				if (response.data.success) {
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
		return request(`/api/bets/win/${payload.id}`)
			.then((response) => {
				if (response.data.success) {
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
		return request(`/api/bets/push/${payload.id}`)
			.then((response) => {
				if (response.data.success) {
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
		return request(`/api/bets/lose/${payload.id}`)
			.then((response) => {
				if (response.data.success) {
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
