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
  }
])

db.users.save([
  {
    name: 'Admin',
    email: 'admin@email.com',
    password: '$2a$10$F0sxwwaJ85OhHYjWiUJ5LuUhyGIMG3yekt01Jz6sDEHYrzY2R0XoS',
    active: true,
    roles: ['Admin'],
    permissions: ['All']
  },
  {
    name: 'Deactivated User',
    email: 'deactivateduser@email.com',
    password: '$2a$10$ul/EA9xYqanGrjxxzDAF4uKZBwwEHQVR9FRtwbMv6GluYQ40ahkky',
    active: false,
    roles: [],
    permissions: []
  }
])