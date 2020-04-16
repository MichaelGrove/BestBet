exports.up = (knex) => knex.schema.createTable('bet_types', (table) => {
	table.increments('id');
	table.string('name', 255).notNullable();
});

exports.down = (knex) => knex.schema.dropTable('bet_types');
