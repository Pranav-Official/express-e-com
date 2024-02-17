import { Request, Response, Router } from "express";
import { viewSubscriptions } from "../services/subcription_services/viewSubscriptions";
import verifyJWTcustomer from "../middlewere/verifyJWTcustomer";
import { buySubscriptions } from "../services/subcription_services/buySubscriptions";
const router = Router();
router.get(
  "/viewSubscriptions",
  verifyJWTcustomer,
  async (req: Request, res: Response) => {
    viewSubscriptions(req, res);
  }
);

router.post(
  "/BuySubscriptions",
  verifyJWTcustomer,
  async (req: Request, res: Response) => {
    buySubscriptions(req, res);
  }
);



export default router;
