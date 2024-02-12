import { Request, Response } from "express";
import { createSubscriptionService } from "../../services/subcription_services/createSubscriptionService";

export const createSubscription = async (req: Request, res: Response) => {
  createSubscriptionService(req, res);
};
