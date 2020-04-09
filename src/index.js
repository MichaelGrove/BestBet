const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

const port = config.port || 8080;

// define a route handler for the default home page
app.get('/', async (req, res) => {
	res.send('Hello, world');
});

app.use((req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: error.message,
		stack: config.mode === 'production' ? '' : error.stack,
	});
});

// start the Express server
app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`server started at ${port}`);
});
