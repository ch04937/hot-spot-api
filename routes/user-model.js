const db = require("../data/db-config.js");

module.exports = {
	add,
	getAll,
	getRooms,
	getById,
	findBy,
	update,
	remove,
	find,
};
function getAll() {
	return db("users");
}
function getById(id) {
	return db("users")
		.where({ id })
		.first();
}
function getRooms(id) {
	return db("users as u")
		.join("userRoom as ur", "ur.userId", "u.id")
		.join("room as r", "r.id", "ur.roomId")
		.where("ur.userId", id);
}
function findBy(filter) {
	return db("users").where(filter);
}
function add(user) {
	return db("users")
		.insert(user, "id")
		.then(ids => {
			const [id] = ids;
			return getById(id);
		});
}

function update(changes, id) {
	return db("users")
		.where("id", id)
		.update(changes)
		.then(count => {
			count > 0 ? this.get(id) : null;
		});
}

function remove(id) {
	return db("users")
		.where("id", id)
		.del();
}
function find(id) {
	return db("users")
		.where(function() {
			this.where("username", "=", id).orWhere("email", "=", id);
		})
		.first();
}
