import { Request, Response, Router } from "express";
import EcSuppliers from "../models/ec_suppliers";

const router = Router();

router.get("/profile", async (req: Request, res: Response) => {
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

router.patch("/passwordReset", async (req: Request, res: Response) => {
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

export default router;
