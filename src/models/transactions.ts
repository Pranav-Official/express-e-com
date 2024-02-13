import { transactionTable } from "../../types/modelTypes/transactionTableType";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/sequelize-config"; // Import the Sequelize instance

transactionTable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    supplier_registration_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    subscription_plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    modelName: "transactionTable",
    tableName: "transactionTable",
    timestamps: false,
  }
);

export default transactionTable;
