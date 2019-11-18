const db = require("../data/db-config.js");

module.exports = {
	add,
	getAll,
	getRoom,
	findById,
	findBy,
	update,
	remove,
};
function getAll() {
	return db("users").select("id", "username", "password", "email");
}
function getRoom(id) {
	return db("users as u")
		.join("userRoom as ur", "ur.userId", "u.id")
		.join("room as r", "r.id", "ur.roomId")
		.select("ur.id", "u.username", "r.name", "r.location", "r.roomNumber")
		.where("ur.userId", id);
}
function findBy(filter) {
	return db("users").where(filter);
}
function add(user) {
	return db("users")
		.insert(user, "id")
		.then((ids) => {
			const [id] = ids;
			return findById(id);
		});
}
function findById(id) {
	return db("users")
		.where({ id })
		.first();
}

function update(changes, id) {
	return db("users")
		.where("id", id)
		.update(changes)
		.then((count) => {
			count > 0 ? this.get(id) : null;
		});
}

function remove(id) {
	return db("users")
		.where("id", id)
		.del();
}
