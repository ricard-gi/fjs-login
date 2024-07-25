const jsonwebtoken = require('jsonwebtoken');
const Config = require('./config');

const { secretKey } = Config;

const checkToken = (req, res, next) => {
	let token = req.headers.authorization || '';

	if (!token) {
		res.status(400).json({ error: 'no token' });
	} 

	jsonwebtoken.verify(token, secretKey, (error, decoded) => {
		if (error) {
			res.status(400).json({ error: 'token invalid' });
		} else {
			const { expiredAt } = decoded;
			if (expiredAt > new Date().getTime()) {
				next();
			} else {
				res.status(400).json({ error: 'token invalid' });
			}
		}
	});
};



//export { autentica, autError };
module.exports =  { checkToken };
