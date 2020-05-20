/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const db = require('../database/db');
const { generateToken } = require('../services/auth-service');

class AuthController {
	async login(req, res) {
		const { email, password } = req.body;

		if (!email) {
			return res.json({ error: 'Email is missing!' });
		}

		if (!password) {
			return res.json({ error: 'Password is missing!' });
		}

		const users = await db
			.from('users')
			.where({ email })
			.select('*')
			.catch((err) => {
				console.log(err);
				return [];
			});

		if (users.length === 0) {
			return res.json({ error: 'Wrong sign in credentials.' });
		}

		const [user] = users;

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.json({ error: 'Wrong sign in credentials.' });
		}

		const token = generateToken({ uid: user.id, email: user.email });
		return res.send({ token, units: user.units });
	}

	async wallet(req, res) {
		const { uid } = req;
		if (!uid) {
			return res.status(500).send({ error: 'Unexpected error' });
		}

		const users = await db
			.from('users')
			.where({ id: uid })
			.select('units')
			.catch((err) => {
				console.log(err);
				return [];
			});

		if (users.length === 0) {
			return res.json({ error: 'Wrong sign in credentials' });
		}

		const [user] = users;
		return res.send({ units: user.units });
	}
}

module.exports = new AuthController();
