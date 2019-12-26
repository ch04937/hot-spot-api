const db = require("../data/db-config.js");

module.exports = {
	getAll,
	getByRoomId,
	add,
	findById,
	update,
	remove,
};
function getAll() {
	return db("chat");
}
function getByRoomId(id) {
	return db("userRoomChat as urc")
		.join("room as r", "r.id", "urc.roomId")
		.join("chat as c", "c.id", "urc.chatId")
		.where({ roomId: id });
}
function add(id) {
	return db("chat")
		.insert(user, "id")
		.then(ids => {
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
		.then(count => {
			count > 0 ? this.get(id) : null;
		});
}

function remove(id) {
	return db("message")
		.where("id", id)
		.del();
}
