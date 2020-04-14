const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();

exports.seed = async (knex) => {
	const password = crypto.randomBytes(15).toString('hex');
	const hash = await bcrypt.hash(password, 12);
	const user = {
		email: process.env.ADMIN_EMAIL,
		password: hash,
		is_admin: true,
	};

	// Deletes ALL existing entries
	return knex('users').del()
		.then(() => knex('users').insert([user]))
		.then(() => {
			// eslint-disable-next-line no-console
			console.log('Admin user created:', { password });
		});
};
