/**
 * DataController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	
	create : async (req, res) => {
		
		try {
			
			let data = await Data.create(req.body).fetch();
			
			return res.json(data);
			
		} catch (err) {
			sails.log.error(err);
			return res.status(500).json(err);
		}
		
	},
	
	get: async (req, res) => {
		
		try {
			
			let data = await Data.findOne(req.param('id'));
			return res.status(200).json(data);
			
		} catch (err) {
			
			sails.log.error(err.raw);
			return res.status(500).json(err);
			
		}
		
	},
	
	destroy: async(req, res) => {
		try {
			await Data.destroy({id: req.param('id')});
			return res.ok();
		} catch (err) {
			sails.log.error(err.raw);
			return res.status(500).json(err);
		}
		
		
	},
	
	getAll: async(req, res) => {
		
		try {
			let datas = await Data.find();
			return res.status(200).json(datas);
		} catch (err) {
			
			sails.log.error(err.raw);
			return res.status(500).json(err);
		}
		
	},
	
	dashboard: async(req, res) => {
		return res.view('data/dashboard',{
			layout: 'layouts/jarvinsa-layout'
		})
	},
	
	subscribe: async(req, res) => {
		if(!req.isSocket) {
			return res.badRequest();
		}
		
		sails.sockets.join(req.socket, 'data', (err) => {
			if(err) {
				return res.serverError(err);
			}
		});
		
		return res.ok();
	}
};
