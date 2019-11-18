exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("message")
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex("message").insert([
				{
					id: 1,
					text: "who'll win?",
				},
				{
					id: 2,
					text: "who'll win?",
				},
				{
					id: 3,
					text: "who'll win?",
				},
			]);
		});
};
