/* eslint-disable camelcase */
const db = require('../database/db');
const constants = require('../constants');

class BetController {
	async fetchBets(req, res) {
		const results = await db
			.from('bets')
			.leftJoin('bookmakers', 'bookmakers.id', 'bets.sport_id')
			.leftJoin('sports', 'sports.id', 'bets.bookmaker_id')
			.where({ user_id: req.uid })
			.select('bets.*', 'bookmakers.name as bookmaker', 'sports.name as sport')
			.catch((err) => {
				console.log(err);
				return [];
			});

		return res.send({ results });
	}

	async placeBet(req, res) {
		const { uid } = req;
		if (!uid) {
			return res.status(500).send({ error: 'Unexpected error' });
		}

		const { PENDING } = constants.BET_STATES;
		const {
			sport_id,
			bookmaker_id,
			game_description,
			coefficient,
			units,
		} = req.body;

		const bet = {
			user_id: uid,
			sport_id,
			bookmaker_id,
			game_description,
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

		return res.send({ success: 1, bet });
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
