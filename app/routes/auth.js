const express = require('express');
const { check } = require('express-validator');
const validate = require('./validate');
const controller = require('../controllers/auth-controller');

const router = express.Router();
router.post('/auth/login', validate([
	check('email', 'Email is required').isString().isEmail(),
	check('password', 'Password is required').not().isEmpty().isString(),
]), controller.login.bind(controller));

module.exports = router;
