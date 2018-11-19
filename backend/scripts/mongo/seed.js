/* eslint-disable no-undef */
db.createUser({ user: 'fruitUser', pwd: 'fruitPassword', roles: [ 'readWrite', 'dbAdmin' ] })
db.fruits.save({ name: 'Banana' })