const db = require("../data/db-config");

module.exports = {
	getAll,
	getById,
	addToFavorite,
};

function getById(id) {
	return db("favorite")
		.where({ id })
		.first();
}
function getAll() {
	return db("favorite");
}

function addToFavorite({ yelpId }) {
	return db("favorite")
		.insert({ yelpId }, "id")
		.then(ids => {
			const [id] = ids;
			return getById(id);
		});
}
