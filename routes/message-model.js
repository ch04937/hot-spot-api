const db = require("../data/db-config.js");

module.exports = {
	add,
	find,
	findById,
	findBy,
	update,
	remove,
};
function find() {
	return db("message").select("id", "message");
}
function findBy(filter) {
	return db("message").where(filter);
}
function add(user) {
	return db("message")
		.insert(user, "id")
		.then((ids) => {
			const [id] = ids;
			return findById(id);
		});
}
function findById(id) {
	return db("message")
		.where({ id })
		.first();
}

function update(changes, id) {
	return db("message")
		.where("id", id)
		.update(changes)
		.then((count) => {
			count > 0 ? this.get(id) : null;
		});
}

function remove(id) {
	return db("message")
		.where("id", id)
		.del();
}
