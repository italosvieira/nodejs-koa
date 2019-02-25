/* eslint-disable no-undef */
db.createUser({ user: 'fruitUser', pwd: 'fruitPassword', roles: [ 'readWrite', 'dbAdmin' ] })

db.fruits.save([
	{
		name: 'Banana',
		taste: 'Sweet',
		active: true
	},
	{
		name: 'Apple',
		taste: 'Sweet',
		active: true
	},
	{
		name: 'Kiwi',
		taste: 'Sweet',
		active: true
	},
	{
		name: 'Avocado',
		taste: 'Like avocado?',
		active: false
	},
	{
		name: 'Pineapple',
		taste: 'Acid',
		active: true
	},
])