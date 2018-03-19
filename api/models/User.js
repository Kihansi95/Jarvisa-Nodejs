/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    
    attributes: {
        username: {
            type: 'string',
            unique: true,
            primaryKey: true,
            required: true
        },
        
        password: {
            type: "string",
            minLength: 6,
            required: true
        },
        
        role: {
            model: 'role',
            required: true
        }
    }
};

