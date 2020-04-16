exports.up = (knex) => knex.schema.alterTable('bets', (table) => {
	table.string('team_player', 255).nullable();
});

exports.down = (knex) => knex.schema.alterTable('bets', (table) => {
	table.dropColumn('team_player');
});
