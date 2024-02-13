import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/sequelize-config"; // Import the Sequelize instance
import { EcSuppliers } from "../../types/modelTypes/ec_suppliers";
import bcrypt from "bcrypt";

EcSuppliers.init(
  {
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
    subsription_plan_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    registration_id: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: () =>
        Math.floor(Math.random() * 900000 + 100000).toString(),
    },
    registration_time_stamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 10000, // Set the initial value to 10000
      get() {
        // Custom getter to convert registration_id to string
        const rawValue = this.getDataValue("registration_id");
        return rawValue < 10000 ? "" : String(rawValue); // Ensuring no IDs below 10000
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    modelName: "ec_suppliers",
    tableName: "ec_suppliers",
    timestamps: false,
    hooks: {
      beforeCreate: async (supplier: EcSuppliers) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(supplier.password, salt);
        supplier.password = hashedPassword;
      },
    },
  }
);

export default EcSuppliers;
