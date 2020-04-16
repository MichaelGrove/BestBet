const betTypes = [
	{ name: 'Head to Head' },
	{ name: 'Winner' },
	{ name: 'Exact score' },
	{ name: 'First scorer' },
	{ name: 'Number of sets' },
];

exports.seed = async (knex) => knex('bet_types').del()
	.then(() => knex('bet_types').insert(betTypes));
