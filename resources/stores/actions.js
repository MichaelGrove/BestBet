import axios from '../plugins/axios';

export default {
	fetchBets(state) {
		return axios.post('/api/bets')
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
		return axios.post('/api/bookmakers')
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
		return axios.post('/api/sports')
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

	placeBet(state, payload) {
		return axios.post('/api/bets/create', payload)
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
};
