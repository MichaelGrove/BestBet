exports.up = (knex) => knex.schema.alterTable('bets', (table) => {
	table.integer('type').defaultTo(0);
});

exports.down = (knex) => knex.schema.alterTable('bets', (table) => {
	table.dropColumn('type');
});
