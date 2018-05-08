/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');   // for password encryption
var SALT_WORK_FACTOR = 10;

/**
 * Encrypt password using bcryptjs
 * @param password: pure password
 * @param callback: function(err, encryptedPassword)
 */
function hashPassword(password, callback)   {
	bcrypt.hash(password, SALT_WORK_FACTOR, function(err, encryptedPassword) {
		callback(err, encryptedPassword);
	});
}

module.exports = {
	
	attributes: {
		
		//  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
		//  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
		//  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
		username: {
			type: 'string',
			unique: true,
			required: true
		},
		
		password: {
			type: 'string',
			minLength: 6,
			required: true
		},
		
		role: {
			model: 'role',
			required: true
		},
		
		//  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
		//  ║╣ ║║║╠╩╗║╣  ║║╚═╗
		//  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
		// n/a
		
		//  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
		//  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
		//  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
		// n/a
		
	},
	
	customToJSON: function() {
		return _.omit(this, ['password']);
	},
	
	/**
	 * Check password
	 * @param user
	 * @param password to be hashed
	 */
	verifyPassword: function(user, password) {
		return bcrypt.compareSync(password, user.password);
	},
	
	beforeCreate: function(data, next) {
		
		hashPassword(data.password, function(err, encryptedPassword)    {
			if(err)     {
				sails.log.error(err);
				return next(err);
			}
			
			data.password = encryptedPassword;
			
			next();
		});
		
	},
	
	beforeUpdate: function(data, cb)    {
		if (data.password) {
			hashPassword(data.password, (err, encryptedPassword) =>  {
				if(err) return cb(err);
				
				data.password = encryptedPassword;
				return cb();
			});
		} else
			return cb();
	}
	
};

