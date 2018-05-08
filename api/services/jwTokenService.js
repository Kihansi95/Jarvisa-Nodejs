/**
 * jwTokenService
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var
	jwt = require('jsonwebtoken'),
	tokenSecret = "secretissecet";

module.exports = {
	
	/**
	 * Generate the token from payload
	 * @param payload
	 * @returns jwt
	 */
	issue : function(payload) {
		return jwt.sign(
			payload,
			tokenSecret, // Token Secret that we sign it with
			{ expiresIn: '1m'}
		);
	},
	
	/**
	 * Verify the token in the request
	 * @param token
	 * @param callback
	 * @returns {*}
	 */
	verify : function(token, callback) {
		return jwt.verify(
			token,          // The token to be verified
			tokenSecret,    // Same token we used to sign
			{},             // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
			callback        //Pass errors or decoded token to callback
		);
	}
};
