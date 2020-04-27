const express = require('express');
const { check } = require('express-validator');
const validate = require('./validate');
const controller = require('../controllers/auth-controller');
const requireAuth = require('../middleware/require-authorization');

const router = express.Router();
router.post('/api/auth/login', validate([
	check('email', 'Email is required').isString().isEmail(),
	check('password', 'Password is required').not().isEmpty().isString(),
]), controller.login.bind(controller));
router.post('/api/auth/user/wallet', requireAuth, controller.wallet.bind(controller));

module.exports = router;
