require('dotenv').config();

module.exports = {
	client: 'mysql',
	connection: {
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_DATABASE,
	},
	migrations: {
		directory: './app/database/migrations',
	},
	seeds: {
		directory: './app/database/seeds',
	},
};
