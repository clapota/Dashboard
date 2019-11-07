const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
	const authorization = req.header('Authorization');
	if (authorization === undefined)
		return res.status(401).send({error: 'Not authorized to access this resource'});
	const token = authorization.replace('Bearer ', '');
	const data = jwt.verify(token, process.env.JWT_KEY);
	const user = await User.findOne({_id: data._id, 'tokens.token': token});
	if (!user) {
		return res.status(401).send({error: 'Not authorized to access this resource'});
	}
	req.user = user;
	req.token = token;
	next();
};

module.exports = auth;
