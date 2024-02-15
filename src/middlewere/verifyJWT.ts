import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import EcSuppliers from "../models/ec_suppliers";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.user_type || !req.body.registration_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authHeader =
    req.headers.authorization ?? (req.headers.Authorization as string);
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, "my-secret-key", (err: any, decoded: any) => {
    if (err) return res.status(403).json({ err });
    if (req.body.registration_id !== decoded.registration_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.body.user_type === "supplier") {
      const supplier = EcSuppliers.findOne({
        where: { registration_id: req.body.registration_id },
        raw: true,
      });
      if (!supplier) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
    next();
  });
};
