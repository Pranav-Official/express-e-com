const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  database: "e_commerce",
  username: "root",
  password: "experion@123",
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
