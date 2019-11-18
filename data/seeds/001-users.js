exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("users")
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex("users").insert([
				{
					id: 1,
					username: "username1",
					email: "email1",
					password: "password1",
				},
				{
					id: 2,
					username: "username2",
					email: "email2",
					password: "password1",
				},
				{
					id: 3,
					username: "username3",
					email: "email3",
					password: "password1",
				},
			]);
		});
};
