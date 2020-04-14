const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getPublicKey = () => fs.readFileSync(`${process.cwd()}/public.key`, 'utf-8');
const getPrivateKey = () => fs.readFileSync(`${process.cwd()}/private.key`, 'utf-8');
const generateToken = (data) => {
	try {
		const privateKey = getPrivateKey();
		return jwt.sign(data, privateKey, {
			issuer: process.env.JWT_ISSUER,
			expiresIn: process.env.JWT_EXPIRES_IN,
			algorithm: 'RS256',
		});
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log('Error signing jwt token:', e);
		return null;
	}
};

const verifyToken = (token) => {
	try {
		const publicKey = getPublicKey();
		return jwt.verify(token, publicKey);
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log('Error verifying jwt token:', e);
		return null;
	}
};

module.exports = {
	generateToken,
	verifyToken,
};
