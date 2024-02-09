import { Request, Response } from "express";
import EcSuppliers from "../../models/ec_suppliers";

export const registration = async (req: Request, res: Response) => {
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
};
