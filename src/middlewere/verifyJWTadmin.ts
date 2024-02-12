import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const verifyJWTadmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader =
    req.headers.authorization ?? (req.headers.Authorization as string);
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, "my-secret-key", (err: any, decoded: any) => {
    console.log(decoded);
    if (err) return res.status(403).json({ message: "Forbidden" });
    if (decoded.registration_id === "1") {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized1" });
    }
  });
};

export default verifyJWTadmin;
