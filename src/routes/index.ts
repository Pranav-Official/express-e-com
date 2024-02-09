import { Request, Response, Router } from "express";
import EcSuppliers from "../models/ec_suppliers";
import { login } from "../controllers/authentication/login";
import { registration } from "../controllers/authentication/registration";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  login(req, res);
});

router.post("/Registration", async (req: Request, res: Response) => {
  registration(req, res);
});

export default router;
