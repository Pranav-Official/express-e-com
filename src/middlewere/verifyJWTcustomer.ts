import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import EcSuppliers from "../models/ec_suppliers";
import Customers from "../models/customers";

const verifyJWTcustomer = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.user_type || !req.body.registration_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authHeader =
    req.headers.authorization ?? (req.headers.Authorization as string);
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, "my-secret-key", async (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    if (req.body.registration_id !== decoded.registration_id) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    console.log(req.body);
    if (req.body.user_type === "supplier") {
      const supplier = await EcSuppliers.findOne({
        where: { registration_id: req.body.registration_id },
        raw: true,
      });

      if (!supplier) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } else if (req.body.user_type === "customer") {
      const customer = await Customers.findOne({
        where: { registration_id: req.body.registration_id },
        raw: true,
      });
      console.log(customer);
      if (!customer) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  });
};

export default verifyJWTcustomer;
