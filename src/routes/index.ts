import { Request, Response, Router } from "express";
import EcSuppliers from "../models/ec_suppliers";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
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

router.post("/Registration", async (req: Request, res: Response) => {
  if (
    !req.body.full_name ||
    !req.body.e_mail ||
    !req.body.password ||
    !req.body.profile_pic ||
    !req.body.user_type
  ) {
    res.status(400).send("All fields are required");
    return;
  }
  if (req.body.user_type === "supplier") {
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
  }
});

export default router;
