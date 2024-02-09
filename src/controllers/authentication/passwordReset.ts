import { Request, Response } from "express";
import EcSuppliers from "../../models/ec_suppliers";
import bcrypt from "bcrypt";

export const passwordReset = async (req: Request, res: Response) => {
  console.log(req.body);
  if (!req.body.e_mail || !req.body.new_password || !req.body.user_type) {
    res.status(400).send("All fields are required");
    return;
  }
  console.log(req.body);
  if (req.body.user_type === "supplier") {
    try {
      const { e_mail, new_password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(new_password, salt);
      const supplier = await EcSuppliers.update(
        { password: hashedPassword },
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
};
