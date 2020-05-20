const { verifyToken } = require('../services/auth-service');

module.exports = async (req, res, next) => {
	const headers = req.headers || {};
	const authorization = headers.authorization || '';
	if (!authorization) {
		return res.status(403).json({ error: 'Unauthorized!' });
	}

	const token = authorization.replace('Beader ', '');
	if (!token) {
		return res.status(403).json({ error: 'Unauthorized!' });
	}
	const data = verifyToken(token);
	if (data) {
		req.uid = data.uid;
		console.log(req.uid);
		return next();
	}

	return res.status(403).json({ error: 'Unauthorized!' });
};
