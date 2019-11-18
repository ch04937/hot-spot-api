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
		.createTable("room", (tbl) => {
			tbl.increments();
			tbl.string("name", 255).notNullable();
			tbl.string("location", 255).notNullable();
			tbl.string("roomNumber", 255).notNullable();
		})
		.createTable("userRoom", (tbl) => {
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
		.createTable("userRoomMessage", (tbl) => {
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
			tbl.integer("messageId")
				.unsigned()
				.references("id")
				.inTable("message")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
		});
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists("userRoomMessage")
		.dropTableIfExists("userRoom")
		.dropTableIfExists("message")
		.dropTableIfExists("users");
};
