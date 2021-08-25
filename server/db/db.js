const Sequelize = require("sequelize");

// const db = new Sequelize(process.env.DATABASE_URL || "postgres://postgres:127.0.0.1:5432/messenger", {
//   logging: false
// });

const db = new Sequelize('messenger', 'postgres', "password123", {
dialect: 'postgres',
host: "127.0.0.1",
port: 5432,
logging: false,
});

module.exports = db;
