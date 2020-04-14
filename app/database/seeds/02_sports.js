const sports = [
	{ name: 'Soccer' },
	{ name: 'Tennis' },
	{ name: 'Basketball' },
	{ name: 'Hockey' },
	{ name: 'Handball' },
	{ name: 'Baseball' },
	{ name: 'American Football' },
	{ name: 'Rugby Union' },
	{ name: 'Rugby League' },
	{ name: 'Volleyball' },
	{ name: 'Floorball' },
	{ name: 'Futsal' },
	{ name: 'Cricket' },
	{ name: 'Snooker' },
	{ name: 'Darts' },
	{ name: 'Boxing' },
	{ name: 'Beach Volleyball' },
	{ name: 'Aussie Rules' },
	{ name: 'Badminton' },
	{ name: 'Water Polo' },
	{ name: 'Esports' },
	{ name: 'MMA' },
];

exports.seed = async (knex) => knex('sports').del()
	.then(() => knex('sports').insert(sports));
