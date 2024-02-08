import express, { Express, Request, Response } from "express";
import sequelize from "./config/sequelize-config";
import EcSuppliers from "./models/ec_suppliers";
const app: Express = express();

app.use(express.json());

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database:", error);
  });

app.post("/supplierRegistration", async (req: Request, res: Response) => {
  if (
    !req.body.full_name ||
    !req.body.e_mail ||
    !req.body.password ||
    !req.body.profile_pic
  ) {
    res.status(400).send("All fields are required");
    return;
  }
  try {
    const { full_name, e_mail, password, profile_pic } = req.body;
    const supplier = await EcSuppliers.create(
      {
        full_name,
        e_mail,
        password,
        profile_pic,
      },
      { raw: true }
    );
    res.status(200).json({ registration_id: supplier.registration_id });
  } catch (err: any) {
    console.log(err);
    res.status(400).send("Error");
  }
});

app.post("/login", async (req: Request, res: Response) => {
  if (!req.body.e_mail || !req.body.password || !req.body.user_type) {
    res.status(400).send("All fields are required");
    return;
  }
  if (req.body.user_type === "supplier") {
    try {
      const { e_mail, password } = req.body;
      const supplier = await EcSuppliers.findOne({
        where: { e_mail, password },
        raw: true,
      });
      if (supplier) {
        res.status(200).json({ registration_id: supplier.registration_id });
      } else {
        res.status(400).send("Invalid credentials");
      }
    } catch (err: any) {
      console.log(err);
      res.status(400).send("Error");
    }
  }
});

app.get("/profile", async (req: Request, res: Response) => {
  if (!req.body.registration_id || !req.body.user_type) {
    res.status(400).send("All fields are required");
    return;
  }
  if (req.body.user_type === "supplier") {
    try {
      const { registration_id } = req.body;
      const supplier = await EcSuppliers.findOne({
        where: { registration_id },
        raw: true,
      });
      if (supplier) {
        res.status(200).json(supplier);
      } else {
        res.status(400).send("Invalid credentials");
      }
    } catch (err: any) {
      console.log(err);
      res.status(400).send("Error");
    }
  }
});

app.patch("/passwordReset", async (req: Request, res: Response) => {
  console.log(req.body);
  if (!req.body.e_mail || !req.body.new_password || !req.body.user_type) {
    res.status(400).send("All fields are required");
    return;
  }
  console.log(req.body);
  if (req.body.user_type === "supplier") {
    try {
      const { e_mail, new_password } = req.body;
      const supplier = await EcSuppliers.update(
        { password: new_password },
        { where: { e_mail } }
      );
      if (supplier) {
        res.status(200).send("Password reset successful");
      } else {
        res.status(400).send("Invalid credentials");
      }
    } catch (err: any) {
      console.log(err);
      res.status(400).send("Error");
    }
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
