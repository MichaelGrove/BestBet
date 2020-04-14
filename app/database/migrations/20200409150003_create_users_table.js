exports.up = (knex) => knex.schema.createTable('users', (table) => {
	table.increments('id');
	table.string('email', 255).notNullable();
	table.string('password', 255).notNullable();
	table.boolean('is_admin', 255).defaultTo(false);
});

exports.down = (knex) => knex.schema.dropTable('users');
