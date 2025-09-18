const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Expense = sequelize.define("Expense", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // name of the target model
      key: 'id', // key in the target model that we're referencing
  },
  onDelete: 'CASCADE'
  }




});

module.exports = Expense;
