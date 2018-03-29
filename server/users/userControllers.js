const db = require('../config/dbConfiguration.js');

module.exports = {
	get: function(id) {
		let query = db('users');
		if (id) {
			query.where('id', id).first();
		}

		return query;
	},
	getUserSubs: function(userId) {
		// return list of subs
	},
	insert: function(user) {
		return db('users')
			.insert(user)
			.then(ids => ({ id: ids[0] }));
	},
	update: function(id, user) {
		return db('users')
			.where('id', id)
			.update(user);
	},
	remove: function(id) {
		return db('users')
			.where('id', id)
			.del();
	}
};
