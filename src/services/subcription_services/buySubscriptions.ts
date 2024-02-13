import { registration } from "./../../controllers/authentication/registration";
import { Request, Response } from "express";
import SubscriptionPlans from "../../models/subscription_plans";
import EcSuppliers from "../../models/ec_suppliers";
import transactionTable from "../../models/transactions";
export const buySubscriptions = async (req: Request, res: Response) => {
  try {
    if (
      req.body.user_type !== "supplier" ||
      !req.body.registration_id ||
      !req.body.subscription_id
    ) {
      res
        .status(400)
        .send("All fields are required/Only supplier can buy plans");
      return;
    }
    const subscription = await SubscriptionPlans.findOne({
      where: { id: req.body.subscription_id },
      raw: true,
    });

    if (subscription) {
      const supplier = await EcSuppliers.findOne({
        where: { registration_id: req.body.registration_id },
        raw: true,
      });
      //   res.status(400).send(supplier);
      if (supplier) {
        if (supplier.subsription_plan_id == req.body.subscription_id) {
          return res.status(400).send("Already subscribed to this plan");
        }
        try {
          await EcSuppliers.update(
            {
              subsription_plan_id: req.body.subscription_id,
            },
            {
              where: { registration_id: req.body.registration_id },
            }
          );
          await transactionTable.create({
            supplier_registration_id: req.body.registration_id,
            subscription_plan_id: req.body.subscription_id,
            price: subscription.price,
          });
        } catch (error) {
          console.log(error);
          return res.status(400).send("Error Creating Subscription");
        }
        res.status(200).send("Subscription Purchased");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Creating Subscription");
  }
};
