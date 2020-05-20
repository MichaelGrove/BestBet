const cors = require('cors');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes/index');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use('/', express.static('app/public'));

routes.map((route) => app.use(route));

app.get('*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/index.html`));
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
		stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
	});
});

const port = process.env.NODE_PORT || 8080;
app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`server started at ${port}`);
});
