import express, { Express } from "express";
import sequelize from "./config/sequelize-config";
import supplierRoutes from "./routes/supplierRoutes";
import adminRoutes from "./routes/adminRoutes";
import customerRoutes from "./routes/customerRoutes";
import { verifyJWT } from "./middlewere/verifyJWT";
import { connectToMongoDb, disconnectFromMongoDb } from "./services/mongo";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

import indexRoutes from "./routes/index";
const app: Express = express();
app.use(express.json());

app.use(indexRoutes);
app.use(adminRoutes);
app.use(customerRoutes);
app.use("/api/v1", verifyJWT, supplierRoutes);

connectToMongoDb();

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database:", error);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
