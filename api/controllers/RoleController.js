/**
 * RoleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	
	getAll: async function (req, res) {
		try {
			let roles = await Role.find();
			return res.json(roles);
		} catch (err) {
			
			sails.log.error(err.raw);
			return res.status(500).json(err);
		}
	},
	
	create: async function (req, res) {
		try {
			
			let role = await Role.create(req.body).fetch();
			return res.json(role);
			
		} catch (err) {
			sails.log.error(err.raw);
			return res.status(500).json(err);
		}
	},
	
	destroy: async function (req, res) {
		try {
			await Role.destroy({id: req.param('id')});
			return res.ok();
		} catch (err) {
			sails.log.error(err.raw);
			return res.status(500).json(err);
		}
	},
	
};

