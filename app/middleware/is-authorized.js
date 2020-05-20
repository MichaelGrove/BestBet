import { verifyToken } from '../services/auth-service';

module.exports = async (req, res, next) => {
	const headers = req.headers || {};
	const authorization = headers.authorization || '';

	req.isAuthorized = false;
	const token = authorization.replace('Bearer', '');
	if (verifyToken(token)) {
		req.isAuthorized = true;
	}

	next();
};
