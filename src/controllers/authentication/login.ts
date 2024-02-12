import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import EcSuppliers from "../../models/ec_suppliers";
import Customers from "../../models/customers";

export const login = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, { message: string }>> | undefined> => {
  if (!req.body.e_mail || !req.body.password || !req.body.user_type) {
    return res.status(400).send("All fields are required");
  }
  if (req.body.user_type === "supplier") {
    try {
      const { e_mail, password } = req.body;
      const supplier = await EcSuppliers.findOne({
        where: { e_mail },
        raw: true,
      });
      if (supplier && bcrypt.compareSync(password, supplier.password)) {
        const token = jwt.sign(
          {
            registration_id: supplier.registration_id,
            user_type: req.body.user_type,
          },
          "my-secret-key",
          {
            expiresIn: "24h",
          }
        );
        return res.status(200).json({
          token,
          registration_id: supplier.registration_id,
        });
      } else {
        return res.status(400).send("Invalid credentials");
      }
    } catch (err: any) {
      console.log(err);
      return res.status(400).send("Error");
    }
  }
  if (req.body.user_type === "customer") {
    try {
      const { e_mail, password } = req.body;
      const customers = await Customers.findOne({
        where: { e_mail },
        raw: true,
      });
      if (customers && bcrypt.compareSync(password, customers.password)) {
        const token = jwt.sign(
          {
            registration_id: customers.registration_id,
            user_type: req.body.user_type,
          },
          "my-secret-key",
          {
            expiresIn: "24h",
          }
        );
        return res.status(200).json({
          token,
          registration_id: customers.registration_id,
        });
      } else {
        return res.status(400).send("Invalid credentials");
      }
    } catch (err: any) {
      console.log(err);
      return res.status(400).send("Error");
    }
  }
};
