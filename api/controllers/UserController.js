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
			return res.json(user);
			
		} catch (err) {
			sails.log.error(err);
			return res.status(500).json(err);
		}
		
	},
	
	get: async (req, res) => {
		
		try {
			
			let user = await User.findOne(req.param('id')).populate('role');
			return res.json(user);
			
		} catch (err) {
			
			sails.log.error(err.raw);
			return res.status(500).json(err);
			
		}
		
	},
	
	getAll: async(req, res) => {
		
		try {
			let users = await User.find().populate('role');
			return res.json(users);
		} catch (err) {
			
			sails.log.error(err.raw);
			return res.status(500).json(err);
		}
		
	},
	
	destroy: async(req, res) => {
		try {
			await User.destroy({id: req.param('id')});
			return res.ok();
		} catch (err) {
			sails.log.error(err.raw);
			return res.status(500).json(err);
		}
		
	
	},
	
	update: async (req, res) => {
		try {
			await User.update({id: req.param('id')}).set(req.body);
			return res.ok();
		} catch (err) {
			sails.log.error(err.raw);
			return res.status(500).json(err);
		}
		
	}
};

