const dotenv = require('dotenv');

dotenv.config({ path: `${process.cwd()}/.env` });

module.exports = {
	mode: process.env.NODE_ENV,
	port: process.env.NODE_PORT,
	database: {
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_DATABASE,
	},
};
