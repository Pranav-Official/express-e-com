import { Response, Request, Router } from "express";
import { createSubscription } from "../controllers/subcription_plans/create_subscriptions";
import verifyJWTadmin from "../middlewere/verifyJWTadmin";
const router = Router();

router.post(
  "/Admin/CreateSubscriptions",
  verifyJWTadmin,
  async (req: Request, res: Response) => {
    createSubscription(req, res);
  }
);

export default router;
