const express = require('express');
const { check } = require('express-validator');
const validate = require('./validate');
const controller = require('../controllers/api-controller');
const requireAuth = require('../middleware/require-authorization');

const betValidations = [
	check('sport_id', "'Sport' is required").isInt(),
	check('bookmaker_id', "'Bookmaker' is required").isInt(),
	check('game_description', "'Game / Description' is required")
		.isString()
		.trim()
		.escape()
		.not()
		.isEmpty(),
	check('coefficient', "'Coefficientr' is required").isFloat(),
	check('units', "'Units' is required").isFloat(),
];

const router = express.Router();
router.post('/api/bets', requireAuth, controller.fetchBets.bind(controller));
router.post('/api/bets/create', [requireAuth, validate(betValidations)], controller.placeBet.bind(controller));
router.post('/api/bookmakers', requireAuth, controller.fetchBookmakers.bind(controller));
router.post('/api/sports', requireAuth, controller.fetchSports.bind(controller));

module.exports = router;
