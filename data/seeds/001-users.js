const bcrypt = require("bcryptjs");
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
					firstName: "name1",
					lastName: "last1",
					email: "email1",
					password: bcrypt.hashSync(
						process.env.SEED_PASSWORD || "password1",
						10
					),
					city: "houston",
					state: "tx",
					country: "usa",
					zipcode: 77042,
				},
				{
					id: 2,
					firstName: "name2",
					lastName: "last2",
					username: "username2",
					email: "email2",
					city: "houston",
					state: "tx",
					country: "usa",
					password: "password1",
					zipcode: 77040,
				},
				{
					id: 3,
					firstName: "name3",
					lastName: "last3",
					username: "username3",
					email: "email3",
					city: "austin",
					state: "tx",
					country: "usa",
					password: "password1",
					zipcode: 77099,
				},
			]);
		});
};
