exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("userRoomMessage")
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex("userRoomMessage").insert([
				{
					id: 1,
					userId: 1,
					roomId: 1,
					messageId: 1,
				},
				{
					id: 2,
					userId: 1,
					roomId: 2,
					messageId: 2,
				},
				{
					id: 3,
					userId: 2,
					roomId: 3,
					messageId: 3,
				},
			]);
		});
};
