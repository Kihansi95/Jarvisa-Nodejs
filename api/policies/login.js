/**
 * login
 *
 * @module      :: Policy
 * @description :: Policy allow authentificated user to obtains their token
 * @docs        :: https://gist.githubusercontent.com/thesabbir/597be0ddd16e86e92f68/raw/7c3fd5e057e07335d2f9ac4500838910444948b6/isAuthorized.js
 *
 */
module.exports = function(req, res, next) {
	var token;
	
	if (req.headers && req.headers.authorization) {
		var parts = req.headers.authorization.split(' ');
		if (parts.length == 2) {
			var scheme = parts[0],
				credentials = parts[1];
			
			if (/^Bearer$/i.test(scheme)) {
				token = credentials;
			}
		} else {
			return res.status(401).json('Format is Authorization: Bearer [token]');
		}
	} else if (req.param('token')) {
		token = req.param('token');
		// We delete the token from param to not mess with blueprints
		delete req.query.token;
	} else {
		return res.status(401).json('No Authorization header was found');
	}
	
	jwTokenService.verify(token, function (err, token) {
		if (err) return res.status(401).json('Invalid Token!');
		req.token = token; // This is the decrypted token or the payload you provided
		return next();
	});
};
