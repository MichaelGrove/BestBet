/* eslint-disable camelcase */
const db = require('../database/db');
const constants = require('../constants');

class BetController {
	async fetchBets(req, res) {
		const results = await db
			.from('bets')
			.leftJoin('bookmakers', 'bookmakers.id', 'bets.bookmaker_id')
			.leftJoin('sports', 'sports.id', 'bets.sport_id')
			.leftJoin('bet_types', 'bet_types.id', 'bets.type')
			.where({ user_id: req.uid })
			.select(
				'bets.*',
				'bookmakers.name as bookmaker',
				'sports.name as sport',
				'bet_types.name as bet_type',
			)
			.catch((err) => {
				console.log(err);
				return [];
			});

		return res.send({ results });
	}

	/**
	 * Creates a bet and removes the number of units from your wallet.
	 * @param {*} req
	 * @param {*} res
	 */
	async placeBet(req, res) {
		const { uid } = req;
		if (!uid) {
			return res.status(500).send({ error: 'Unexpected error' });
		}

		const { PENDING } = constants.BET_STATES;
		const {
			sport_id,
			bookmaker_id,
			type,
			game_description,
			team_player,
			coefficient,
			units,
		} = req.body;

		const bet = {
			user_id: uid,
			sport_id,
			bookmaker_id,
			type,
			game_description,
			team_player,
			coefficient,
			units,
			state: PENDING,
		};

		const bookmaker = await this.findBookmakerById(bet.bookmaker_id);
		const sport = await this.findSportById(bet.sport_id);

		if (!bookmaker) {
			return res.send({ error: 'Bookmaker was not found' });
		}

		if (!sport) {
			return res.send({ error: 'Sport was not found' });
		}

		const results = await db.insert(bet).into('bets');
		const id = results && results.length > 0 ? results[0] : 0;
		if (id > 0) {
			bet.id = id;
		}

		await this.updateWallet(uid, -units)
			.catch((err) => {
				console.log(err);
				return res.status(500).send({ error: 'Unexpected error' });
			});

		const walletBalance = await this.getWalletBalance(uid);
		return res.send({ success: 1, bet, units: walletBalance });
	}

	/**
	 * Sets bet state to won and returns units to wallet with profits.
	 * @param {*} req
	 * @param {*} res
	 */
	async winBet(req, res) {
		const { uid } = req;
		if (!uid) {
			return res.status(500).send({ error: 'Unexpected error' });
		}

		const { id } = req.params;
		const { WON } = constants.BET_STATES;
		const bet = await this.findBetById(id, uid);
		if (!bet) {
			return res.status(500).send({ error: 'Bet not found' });
		}

		const { units, coefficient } = bet;
		const winnings = units * coefficient;
		await this.updateBetState(id, uid, WON);
		await this.updateWallet(uid, winnings);
		const walletBalance = await this.getWalletBalance(uid);
		return res.send({ success: 1, units: walletBalance });
	}

	/**
	 * Sets bet state to pushed and returns units to wallet.
	 * @param {*} req
	 * @param {*} res
	 */
	async pushBet(req, res) {
		const { uid } = req;
		if (!uid) {
			return res.status(500).send({ error: 'Unexpected error' });
		}

		const { id } = req.params;
		const { PUSHED } = constants.BET_STATES;
		const bet = await this.findBetById(id, uid);
		if (!bet) {
			return res.status(500).send({ error: 'Bet not found' });
		}

		await this.updateBetState(id, uid, PUSHED);
		await this.updateWallet(uid, bet.units);
		const walletBalance = await this.getWalletBalance(uid);
		return res.send({ success: 1, units: walletBalance });
	}

	/**
	 * Sets bet state to lost.
	 * @param {*} req
	 * @param {*} res
	 */
	async loseBet(req, res) {
		const { uid } = req;
		if (!uid) {
			return res.status(500).send({ error: 'Unexpected error' });
		}

		const { id } = req.params;
		const { LOST } = constants.BET_STATES;
		const bet = await this.findBetById(id, uid);
		if (!bet) {
			return res.status(500).send({ error: 'Bet not found' });
		}

		await this.updateBetState(id, uid, LOST);
		const walletBalance = await this.getWalletBalance(uid);
		return res.send({ success: 1, units: walletBalance });
	}

	async updateBetState(id, uid, state) {
		return db('bets')
			.update({ state })
			.where('id', '=', id)
			.andWhere('user_id', '=', uid)
			.catch((err) => {
				console.log(err);
			});
	}

	/**
	 * Returns the amount of units on user
	 * @param {number} uid User ID
	 * @returns {number}
	 */
	async getWalletBalance(uid) {
		const user = await this.getUserById(uid);
		if (!user) {
			throw new Error('User not found');
		}
		return user.units;
	}

	/**
	 * @param {*} uid User ID
	 * @returns {object|null} User
	 */
	async getUserById(uid) {
		const user = await db('users')
			.where('id', '=', uid)
			.catch((err) => {
				console.log(err);
			});
		return user && user.length > 0 ? user[0] : null;
	}

	/**
	 * @param {*} uid
	 * @param {*} units
	 */
	async updateWallet(uid, units) {
		let balance = await this.getWalletBalance(uid);
		balance += units;
		return db('users')
			.update({ units: balance })
			.where('id', '=', uid)
			.catch((err) => {
				console.log(err);
			});
	}

	async fetchBookmakers(req, res) {
		const results = await db
			.from('bookmakers')
			.select('*')
			.catch((err) => {
				console.log(err);
				return [];
			});

		return res.send({ results });
	}

	async fetchSports(req, res) {
		const results = await db
			.from('sports')
			.select('*')
			.catch((err) => {
				console.log(err);
				return [];
			});

		return res.send({ results });
	}

	async fetchBetTypes(req, res) {
		const results = await db
			.from('bet_types')
			.select('*')
			.catch((err) => {
				console.log(err);
				return [];
			});

		return res.send({ results });
	}

	async findBetById(id, uid) {
		const bets = await db
			.from('bets')
			.where('id', '=', id)
			.andWhere('user_id', '=', uid)
			.catch((err) => {
				console.log(err);
				return [];
			});
		return bets && bets.length > 0 ? bets[0] : null;
	}

	async findBookmakerById(id) {
		const results = await db
			.from('bookmakers')
			.select('*')
			.where({ id })
			.catch((err) => {
				console.log(err);
				return null;
			});

		return results && results.length > 0 ? results[0] : null;
	}

	async findSportById(id) {
		const results = await db
			.from('sports')
			.select('*')
			.where({ id })
			.catch((err) => {
				console.log(err);
				return null;
			});

		return results && results.length > 0 ? results[0] : null;
	}
}

module.exports = new BetController();
