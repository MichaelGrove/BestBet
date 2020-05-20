exports.up = (knex) => knex.schema.createTable('bets', (table) => {
	table.increments('id');
	table.integer('user_id');
	table.integer('sport_id');
	table.integer('bookmaker_id');
	table.string('game_description', 255).notNullable();
	table.decimal('coefficient', 10, 2).notNullable();
	table.decimal('units', 10, 2).notNullable();
	table.string('state', 255).notNullable();
	table.datetime('createdAt').defaultTo(knex.fn.now());
	table.datetime('updatedAt').defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTable('bets');
