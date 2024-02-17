import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/sequelize-config";
import Invites from "../../types/modelTypes/invites";

Invites.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ec_supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "invites",
    tableName: "invites",
    timestamps: false,
  }
);

export default Invites;
