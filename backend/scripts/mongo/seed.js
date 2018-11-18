db.fruitsDb.createUser(
  {
    user: "rootFruit",
    pwd: "root",
    roles: [ "readWrite", "dbAdmin" ]
  }
)

db.fruitsDb.save({ name: 'Banana' })