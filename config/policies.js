/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
	
	/***************************************************************************
	 *                                                                          *
	 * Default policy for all controllers and actions, unless overridden.       *
	 * (`true` allows public access)                                            *
	 *                                                                          *
	 ***************************************************************************/
	
	// '*': true,
	UserController : {
		'*': 'login',
		'login': true,
		'create': true    // for dev context, everyone can add their user
	},
	
};
