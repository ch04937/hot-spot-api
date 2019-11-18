exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("userMessage")
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex("userMessage").insert([
				{
					id: 1,
					userId: 1,
					messageId: 1,
				},
				{
					id: 2,
					userId: 1,
					messageId: 2,
				},
				{
					id: 3,
					userId: 2,
					messageId: 3,
				},
			]);
		});
};
