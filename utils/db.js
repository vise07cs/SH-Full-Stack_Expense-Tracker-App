const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expensetracker", "root", "Admin@123", {
  host: "localhost",
  dialect: "mysql",   // or "postgres", "sqlite", "mssql"
});

module.exports = sequelize;
