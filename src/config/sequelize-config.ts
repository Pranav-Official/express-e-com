import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  database: "e_commerce",
  username: "root",
  password: "experion@123",
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
