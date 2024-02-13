import express, { Express } from "express";
import sequelize from "./config/sequelize-config";
import supplierRoutes from "./routes/supplierRoutes";
import adminRoutes from "./routes/adminRoutes";
import customerRoutes from "./routes/customerRoutes";
import { verifyJWT } from "./middlewere/verifyJWT";

import indexRoutes from "./routes/index";
const app: Express = express();
app.use(express.json());

app.use(indexRoutes);
app.use(adminRoutes);
app.use(customerRoutes);
app.use("/api/v1", verifyJWT, supplierRoutes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database:", error);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
