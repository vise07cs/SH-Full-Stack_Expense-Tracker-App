const sequelize = require("../utils/db");
const User = require("./User");
const Expense = require("./Expense");

// Define relations
User.hasMany(Expense, { foreignKey: "userId" });
Expense.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, Expense };
