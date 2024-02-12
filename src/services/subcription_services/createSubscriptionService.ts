import { Request, Response } from "express";
import SubscriptionPlans from "../../models/subscription_plans";

export const createSubscriptionService = async (
  req: Request,
  res: Response
) => {
  try {
    const { plan_name, plan_price, plan_description, cumstomerLimit } =
      req.body;
    const subscription = await SubscriptionPlans.create({
      name: plan_name,
      price: plan_price,
      description: plan_description,
      cumstomerLimit,
    });
    res.status(200).json(subscription);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Creating Subscription");
  }
};
