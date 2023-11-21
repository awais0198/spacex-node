const { Sequelize, DataTypes } = require('sequelize')

const user = require('./user')

const init = () => {
  const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    define: { freezeTableName: true },
    forceSync: false,
  })
  return sequelize
}

const dbClient = init()

const db = {}

db.sequelize = dbClient

const User = user.init(dbClient, DataTypes)

db.User = User

module.exports = db
