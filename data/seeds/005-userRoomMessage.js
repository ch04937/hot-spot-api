exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("userRoomChat")
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex("userRoomChat").insert([
				{
					id: 1,
					userId: 1,
					roomId: 1,
					chatId: 1,
				},
				{
					id: 2,
					userId: 1,
					roomId: 2,
					chatId: 2,
				},
				{
					id: 3,
					userId: 2,
					roomId: 3,
					chatId: 3,
				},
			]);
		});
};
