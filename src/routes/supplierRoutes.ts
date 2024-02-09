import { Request, Response, Router } from "express";
import EcSuppliers from "../models/ec_suppliers";
import { CheckXApi } from "../middlewere/checkXApi";

const router = Router();

router.get("/profile", CheckXApi, async (req: Request, res: Response) => {
  if (!req.body.registration_id || !req.body.user_type) {
    res.status(400).send("All fields are required");
    return;
  }
  if (req.body.user_type === "supplier") {
    try {
      const { registration_id } = req.body;
      const supplier = await EcSuppliers.findOne({
        where: { registration_id },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
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

export default router;
