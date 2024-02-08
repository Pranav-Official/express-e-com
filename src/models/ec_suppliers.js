const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/sequelize-config"); // Import the Sequelize instance

const ec_suppliers = sequelize.define("ec_suppliers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  e_mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_pic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  registration_id: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: () => Math.floor(Math.random() * 90000 + 10000).toString(),
  },
  registration_time_stamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

module.exports = ec_suppliers;
