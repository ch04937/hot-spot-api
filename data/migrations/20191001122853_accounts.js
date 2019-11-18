exports.up = function(knex) {
	return knex.schema
		.createTable("users", (tbl) => {
			tbl.increments();
			tbl.string("username", 255)
				.notNullable()
				.unique();
			tbl.string("email").notNullable();
			tbl.string("password", 255).notNullable();
		})
		.createTable("message", (tbl) => {
			tbl.increments();
			tbl.string("text", 255).notNullable();
		})
		.createTable("userMessage", (tbl) => {
			tbl.increments();
			tbl.integer("userId")
				.unsigned()
				.reference("id")
				.inTable("users")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			tbl.integer("messageId")
				.unsigned()
				.reference("id")
				.inTable("messade")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
		});
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists("userMessage")
		.dropTableIfExists("message")
		.dropTableIfExists("users");
};
