exports.up = function(knex) {
	return knex.schema
		.createTable("users", tbl => {
			tbl.increments("id").primary();
			tbl.string("username", 255)
				.notNullable()
				.unique();
			tbl.string("firstName", 255).notNullable();
			tbl.string("lastName", 255).notNullable();
			tbl.string("email").notNullable();
			tbl.string("password", 255).notNullable();
			tbl.string("city", 255).notNullable();
			tbl.string("state", 255).notNullable();
			tbl.string("country", 255).notNullable();
		})
		.createTable("chat", tbl => {
			tbl.increments();
			tbl.string("text", 255).notNullable();
		})
		.createTable("room", tbl => {
			tbl.increments();
			tbl.string("name", 255).notNullable();
			tbl.string("location", 255).notNullable();
			tbl.string("roomNumber", 255).notNullable();
		})
		.createTable("userRoom", tbl => {
			tbl.increments();
			tbl.integer("userId")
				.unsigned()
				.references("id")
				.inTable("users")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			tbl.integer("roomId")
				.unsigned()
				.references("id")
				.inTable("room")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
		})
		.createTable("userRoomChat", tbl => {
			tbl.increments();
			tbl.integer("userId")
				.unsigned()
				.references("id")
				.inTable("users")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			tbl.integer("roomId")
				.unsigned()
				.references("id")
				.inTable("room")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			tbl.integer("chatId")
				.unsigned()
				.references("id")
				.inTable("chat")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
		});
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists("userRoomChat")
		.dropTableIfExists("userRoom")
		.dropTableIfExists("room")
		.dropTableIfExists("chat")
		.dropTableIfExists("users");
};
