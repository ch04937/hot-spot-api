exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("room")
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex("room").insert([
				{
					id: 1,
					name: "Room Name1",
					location: "houston",
					roomNumber: "1",
				},
				{
					id: 2,
					name: "Room Name2",
					location: "houston",
					roomNumber: "2",
				},
				{
					id: 3,
					name: "Room Name3",
					location: "houston",
					roomNumber: "3",
				},
			]);
		});
};
