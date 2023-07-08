const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("notes", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
