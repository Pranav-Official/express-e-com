import { Request, Response } from "express";
import SubscriptionPlans from "../../models/subscription_plans";

export const viewSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscription = await SubscriptionPlans.findAll();
    res.status(200).json(subscription);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Creating Subscription");
  }
};
