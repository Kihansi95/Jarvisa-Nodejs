/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	
	create : async (req, res) => {
		
		try {
			
			let role = await Role.findOrCreate({name: 'user'}, {name: 'user'}); // default role
			let user = await User.create(Object.assign(req.body, {role: role.id})).fetch();
			
			return res.status(200).json({
				user: user,
				token: jwTokenService.issue({id: user.id})
			});
			
		} catch (err) {
			sails.log.error(err);
			return res.status(500).json(err);
		}
		
	},
	
	get: async (req, res) => {
		
		try {
			
			let user = await User.findOne(req.param('id')).populate('role');
			return res.status(200).json(user);
			
		} catch (err) {
			
			sails.log.error(err.raw);
			return res.status(500).json(err);
			
		}
		
	},
	
	getAll: async(req, res) => {
		
		try {
			let users = await User.find().populate('role');
			return res.status(200).json(users);
		} catch (err) {
			
			sails.log.error(err.raw);
			return res.status(500).json(err);
		}
		
	},
	
	destroy: async(req, res) => {
		try {
			await User.destroy({id: req.param('id')}).fetch();
			return res.ok();
		} catch (err) {
			sails.log.error(err.raw);
			return res.status(500).json(err);
		}
		
	
	},
	
	update: async (req, res) => {
		try {
			await User.update({id: req.param('id')}).set(req.body).fetch();
			return res.ok();
		} catch (err) {
			sails.log.error(err.raw);
			return res.status(500).json(err);
		}
		
	},
	
	login: async(req, res) => {
		try {
			let user = await User.findOne({username: req.body.username});
			
			if(!user)
				return res.status(404).json('user '+req.body.username+' not found');
			
			
			
			if(!User.verifyPassword(user, req.body.password))
				return res.status(403).json('password mismatch');
			
			return res.status(200).json({
				user: user,
				token: jwTokenService.issue({id: user.id})
			})
			
		}   catch (err) {
			sails.log.error(err.raw);
			return res.status(500).json(err);
		}
		
	}
};

