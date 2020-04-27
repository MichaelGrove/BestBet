exports.up = (knex) => knex.schema.alterTable('users', (table) => {
	table.integer('units').defaultTo(0);
});

exports.down = (knex) => knex.schema.alterTable('users', (table) => {
	table.dropColumn('units');
});
